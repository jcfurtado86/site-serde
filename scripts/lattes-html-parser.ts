import * as cheerio from "cheerio"
import type { PublicationProps, PatentProps, Project, TCCProps } from "../src/app/context/types"

type CheerioAPI = ReturnType<typeof cheerio.load>

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .trim()
}

/**
 * If a string is fully uppercase, convert to title case.
 * Preserves small words (de, da, do, dos, das, e, em, a, o) in lowercase.
 * Keeps acronyms in parens untouched, e.g. "(IHC)" stays "(IHC)".
 */
import { fixCasing } from "./fix-casing"

/**
 * Find the ". " that separates title from publisher, ignoring dots inside parentheses.
 * Scans backwards from end: skips past balanced parens, then finds the last ". ".
 */
function findTitlePublisherSplit(text: string): number {
  let i = text.length - 1
  let parenDepth = 0

  // Walk backwards, tracking parentheses
  while (i >= 0) {
    if (text[i] === ")") parenDepth++
    else if (text[i] === "(") parenDepth--

    // Only consider ". " at paren depth 0
    if (parenDepth === 0 && text[i] === "." && i + 1 < text.length && text[i + 1] === " ") {
      // Check it's not an abbreviation (single letter before dot like "t.i.")
      const charBefore = i > 0 ? text[i - 1] : ""
      const twoCharsBefore = i > 1 ? text[i - 2] : ""
      // If preceded by a single letter and a dot/space, it's likely an abbreviation
      if (charBefore.match(/[a-zA-Z]/) && (twoCharsBefore === "." || twoCharsBefore === " " || twoCharsBefore === "")) {
        i--
        continue
      }
      return i
    }
    i--
  }
  return -1
}

function parseAuthors(rawText: string): string[] {
  // Text before the first " . " separator is the authors block
  const dotSep = rawText.indexOf(" . ")
  if (dotSep === -1) return []
  const authorsBlock = rawText.substring(0, dotSep)
  return authorsBlock
    .split(/\s*;\s*/)
    .map((a) => fixCasing(a.trim()))
    .filter(Boolean)
}

function extractTextContent($el: cheerio.Cheerio<any>): string {
  // Clone and remove hidden metadata spans and citation spans
  const clone = $el.clone()
  clone.find("span.informacao-artigo").remove()
  clone.find("span.citado").remove()
  clone.find("a.icone-producao").remove()
  clone.find("img").remove()
  clone.find("sup").remove()
  return cleanText(clone.text())
}

export function parseArticles($: CheerioAPI, minYear: number): PublicationProps[] {
  const articles: PublicationProps[] = []

  $("div.artigo-completo").each((_, el) => {
    const $el = $(el)
    const $content = $el.find("span.transform")

    // Year from metadata
    const yearText = $content.find("span[data-tipo-ordenacao='ano']").text().trim()
    const year = parseInt(yearText, 10)
    if (isNaN(year) || year < minYear) return

    // DOI link
    const doiEl = $content.find("a.icone-doi")
    const link = doiEl.attr("href") || undefined

    // Citations
    const webCitText = $content.find("span.numero-citacao[data-tipo-ordenacao='1']").text().trim()
    const scopusCitText = $content.find("span.numero-citacao[data-tipo-ordenacao='3']").text().trim()
    const webCitations = webCitText ? parseInt(webCitText, 10) : undefined
    const scopusCitations = scopusCitText ? parseInt(scopusCitText, 10) : undefined

    // Parse text content
    const text = extractTextContent($content)
    const authors = parseAuthors(text)

    // After authors: " . TITLE. PUBLISHER, v. EDITION, p. PAGES, YEAR."
    const dotSep = text.indexOf(" . ")
    if (dotSep === -1) return
    const afterAuthors = text.substring(dotSep + 3)

    // Strategy: match the ending pattern ", v. EDITION, p. PAGES, YEAR." or ", p. PAGES, YEAR."
    // Then find the publisher by looking backwards from that match to the last ". " boundary
    let title: string
    let publisher: string
    let edition: string | undefined
    let pages: string | undefined

    // Match ending: , v. EDITION, p. PAGES, YEAR.
    const endWithVol = afterAuthors.match(/,\s*v\.\s*(\S+)\s*,\s*p\.\s*(.+?)\s*,\s*(\d{4})\.\s*$/)
    // Match ending: , p. PAGES, YEAR.
    const endNoVol = endWithVol ? null : afterAuthors.match(/,\s*p\.\s*(.+?)\s*,\s*(\d{4})\.\s*$/)

    if (endWithVol || endNoVol) {
      const matchObj = (endWithVol ?? endNoVol)!
      const beforeEnd = afterAuthors.substring(0, matchObj.index!)

      if (endWithVol) {
        edition = endWithVol[1].trim()
        pages = endWithVol[2].trim()
      } else if (endNoVol) {
        pages = endNoVol[1].trim()
      }

      // beforeEnd = "TITLE. PUBLISHER(may contain parens with dots)"
      // Find the ". " separator skipping dots inside parentheses
      const splitIdx = findTitlePublisherSplit(beforeEnd)
      if (splitIdx > 0) {
        title = beforeEnd.substring(0, splitIdx).trim()
        publisher = beforeEnd.substring(splitIdx + 2).trim()
      } else {
        title = beforeEnd.trim()
        publisher = ""
      }
    } else {
      // Fallback: split on last ". " before end
      const lastDot = afterAuthors.lastIndexOf(". ")
      title = lastDot > 0 ? afterAuthors.substring(0, lastDot).trim() : afterAuthors.trim()
      publisher = lastDot > 0 ? afterAuthors.substring(lastDot + 2).trim() : ""
    }

    const pub: PublicationProps = {
      type: "article",
      title: fixCasing(title),
      authors,
      publisher: fixCasing(publisher),
      year: year.toString(),
      ...(edition && { edition }),
      ...(pages && { pages }),
      ...(link && { link }),
      ...(webCitations !== undefined && { webCitations }),
      ...(scopusCitations !== undefined && { scopusCitations }),
    }
    articles.push(pub)
  })

  return articles
}

function parseSectionEntries(
  $: CheerioAPI,
  sectionHeaderText: string,
  anchorName?: string
): cheerio.Cheerio<any>[] {
  const entries: cheerio.Cheerio<any>[] = []

  // Find the header that contains the exact text
  $("div.cita-artigos b").each((_, headerEl) => {
    const $header = $(headerEl)
    const headerText = cleanText($header.text())

    if (!headerText.includes(sectionHeaderText)) return

    // If anchorName specified, check the anchor
    if (anchorName) {
      const anchor = $header.find(`a[name="${anchorName}"]`)
      if (anchor.length === 0) return
    }

    // Collect all layout-cell-11 siblings after this header until next cita-artigos or title-wrapper
    let $next = $header.parent().next() // skip the <br class="clear">
    while ($next.length > 0) {
      if ($next.hasClass("cita-artigos") || $next.hasClass("title-wrapper")) break

      if ($next.hasClass("layout-cell") && $next.hasClass("layout-cell-11")) {
        entries.push($next)
      }
      $next = $next.next()
    }
  })

  return entries
}

export function parseBooks($: CheerioAPI, minYear: number): PublicationProps[] {
  const books: PublicationProps[] = []
  const entries = parseSectionEntries($, "Livros publicados/organizados", "LivrosCapitulos")

  for (const $entry of entries) {
    const text = cleanText($entry.find("span.transform").text())
    const authors = parseAuthors(text)
    const dotSep = text.indexOf(" . ")
    if (dotSep === -1) continue
    const afterAuthors = text.substring(dotSep + 3)

    // Format: TITLE. EDITION. CITY: PUBLISHER, YEAR. PAGESp .
    // Or: TITLE. EDITION. PUBLISHER, YEAR. PAGESp .
    const bookMatch = afterAuthors.match(
      /^(.+?)\.\s*(\d+\.\s*ed\.?)\s*(?:(.+?):\s*)?(.+?),\s*(\d{4})\.\s*(\d+p)\s*\./
    )

    if (bookMatch) {
      const year = parseInt(bookMatch[5], 10)
      if (year < minYear) continue
      books.push({
        type: "book",
        title: fixCasing(bookMatch[1].trim()),
        authors,
        edition: bookMatch[2].trim(),
        publisher: fixCasing(bookMatch[4].trim()),
        year: year.toString(),
        pages: bookMatch[6].trim(),
        link: "#",
      })
    } else {
      // Fallback: try to at least get title and year
      const yearMatch = afterAuthors.match(/(\d{4})/)
      if (!yearMatch) continue
      const year = parseInt(yearMatch[1], 10)
      if (year < minYear) continue
      const firstDot = afterAuthors.indexOf(". ")
      const title = firstDot > 0 ? afterAuthors.substring(0, firstDot).trim() : afterAuthors.trim()
      books.push({
        type: "book",
        title: fixCasing(title),
        authors,
        year: year.toString(),
        link: "#",
      })
    }
  }

  return books
}

export function parseChapters($: CheerioAPI, minYear: number): PublicationProps[] {
  const chapters: PublicationProps[] = []
  const entries = parseSectionEntries($, "Cap\u00EDtulos de livros publicados", "LivrosCapitulos")

  // Also try with windows-1252 variant
  const entries2 = entries.length === 0
    ? parseSectionEntries($, "tulos de livros publicados", "LivrosCapitulos")
    : entries

  for (const $entry of entries2) {
    const text = cleanText($entry.find("span.transform").text())
    const authors = parseAuthors(text)
    const dotSep = text.indexOf(" . ")
    if (dotSep === -1) continue
    const afterAuthors = text.substring(dotSep + 3)

    // Format: TITLE. In: EDITOR. (Org.). BOOK_TITLE. EDITION: PUBLISHER, YEAR, v. V, p. PAGES.
    const chapterMatch = afterAuthors.match(
      /^(.+?)\.\s*In:\s*(.+?)\.\s*\(Org\.\)\.\s*(.+?)\.\s*(\d+ed\.?):\s*(.+?)?,\s*(\d{4}),\s*v\.\s*(.+?)?,\s*p\.\s*(.+?)\./
    )

    if (chapterMatch) {
      const year = parseInt(chapterMatch[6], 10)
      if (year < minYear) continue
      chapters.push({
        type: "chapter",
        title: fixCasing(chapterMatch[1].trim()),
        authors,
        publisher: fixCasing(chapterMatch[3].trim()),
        edition: chapterMatch[4].trim(),
        year: year.toString(),
        pages: `p. ${chapterMatch[8].trim()}`,
        link: "#",
      })
    } else {
      // Simpler fallback
      const yearMatch = afterAuthors.match(/(\d{4})/)
      if (!yearMatch) continue
      const year = parseInt(yearMatch[1], 10)
      if (year < minYear) continue
      // Title is before "In:" or first period
      const inIdx = afterAuthors.indexOf(". In:")
      const firstDot = afterAuthors.indexOf(". ")
      const titleEnd = inIdx > 0 ? inIdx : firstDot > 0 ? firstDot : afterAuthors.length
      const title = afterAuthors.substring(0, titleEnd).trim()

      // Try to extract publisher from "In: ... (Org.). PUBLISHER."
      let publisher = ""
      const orgMatch = afterAuthors.match(/\(Org\.\)\.\s*(.+?)\.\s*\d+ed/)
      if (orgMatch) publisher = orgMatch[1].trim()

      // Try to extract pages
      const pagesMatch = afterAuthors.match(/p\.\s*(.+?)\.?\s*$/)
      const pages = pagesMatch ? `p. ${pagesMatch[1].trim()}` : undefined

      // Try to extract edition
      const edMatch = afterAuthors.match(/(\d+ed\.?)/)
      const edition = edMatch ? edMatch[1] : undefined

      chapters.push({
        type: "chapter",
        title: fixCasing(title),
        authors,
        year: year.toString(),
        ...(publisher && { publisher }),
        ...(edition && { edition }),
        ...(pages && { pages }),
        link: "#",
      })
    }
  }

  return chapters
}

export function parseCongressPapers($: CheerioAPI, minYear: number): PublicationProps[] {
  const papers: PublicationProps[] = []

  const sections: { header: string; type: "congress" | "conferenceAbstract" }[] = [
    { header: "Trabalhos completos publicados em anais de congressos", type: "congress" },
    { header: "Resumos expandidos publicados em anais de congressos", type: "conferenceAbstract" },
    { header: "Resumos publicados em anais de congressos", type: "conferenceAbstract" },
  ]

  for (const section of sections) {
    const entries = parseSectionEntries($, section.header, "TrabalhosPublicadosAnaisCongresso")

    for (const $entry of entries) {
      const $transform = $entry.find("span.transform")
      const doiEl = $transform.find("a.icone-doi")
      const link = doiEl.attr("href") || undefined

      // Remove DOI icon before extracting text
      const clone = $transform.clone()
      clone.find("a.icone-producao").remove()
      clone.find("sup").remove()
      const text = cleanText(clone.text())

      const authors = parseAuthors(text)
      const dotSep = text.indexOf(" . ")
      if (dotSep === -1) continue
      const afterAuthors = text.substring(dotSep + 3)

      // Format: TITLE. In: EVENT, YEAR, CITY. PROCEEDINGS, YEAR.
      // Or: TITLE. In: EVENT, YEAR, CITY. PROCEEDINGS, YEAR. p. PAGES.
      const congressMatch = afterAuthors.match(
        /^(.+?)\.\s*In:\s*(.+?),\s*(\d{4}),\s*(.+?)\.\s*(.+?),\s*\d{4}\.\s*(?:p\.\s*(.+?)\.)?\s*$/
      )

      // Some entries have DOI and different format
      const simpleMatch = congressMatch
        ? null
        : afterAuthors.match(
            /^(.+?)\.\s*In:\s*(.+?),\s*(\d{4}),\s*(.+?)\.\s*(.+?),\s*\d{4}\./
          )

      if (congressMatch || simpleMatch) {
        const m = (congressMatch ?? simpleMatch)!
        const year = parseInt(m[3], 10)
        if (year < minYear) continue

        const pub: PublicationProps = {
          type: section.type,
          title: fixCasing(m[1].trim()),
          authors,
          year: year.toString(),
          event: fixCasing(m[2].trim()),
          location: fixCasing(m[4].trim()),
          proceedings: fixCasing(m[5].trim()),
          ...(link && { link }),
          ...(congressMatch && m[6] && { pages: m[6].trim() }),
        }
        papers.push(pub)
      } else {
        // Fallback: try to get year from text
        const yearMatch = afterAuthors.match(/(\d{4})/)
        if (!yearMatch) continue
        const year = parseInt(yearMatch[1], 10)
        if (year < minYear) continue

        // Title before "In:" or first period
        const inIdx = afterAuthors.indexOf(". In:")
        const titleEnd = inIdx > 0 ? inIdx : afterAuthors.indexOf(". ")
        const title =
          titleEnd > 0 ? afterAuthors.substring(0, titleEnd).trim() : afterAuthors.trim()

        // Try to extract event
        let event: string | undefined
        let location: string | undefined
        let proceedings: string | undefined
        if (inIdx > 0) {
          const inPart = afterAuthors.substring(inIdx + 5)
          // Try event with location: "Event Name, YYYY, Location."
          const eventWithLoc = inPart.match(/(.+?),\s*\d{4},\s*(.+?)\./)
          if (eventWithLoc) {
            event = eventWithLoc[1].trim()
            location = eventWithLoc[2].trim()
          } else {
            // Event without location: "Event Name, YYYY."
            const eventOnly = inPart.match(/(.+?),\s*\d{4}\./)
            if (eventOnly) {
              event = eventOnly[1].trim()
            }
          }
          const procMatch = inPart.match(/\.\s*(.+?),\s*\d{4}/)
          if (procMatch) proceedings = procMatch[1].trim()
        }

        papers.push({
          type: section.type,
          title: fixCasing(title),
          authors,
          year: year.toString(),
          ...(event && { event: fixCasing(event) }),
          ...(location && { location: fixCasing(location) }),
          ...(proceedings && { proceedings: fixCasing(proceedings) }),
          ...(link && { link }),
        })
      }
    }
  }

  return papers
}

export function parsePatents($: CheerioAPI): PatentProps[] {
  const patents: PatentProps[] = []

  // Find the ProgramaComputador anchor
  const anchor = $("a[name='ProgramaComputador']")
  if (anchor.length === 0) return patents

  // Get the parent container and find all layout-cell-11 within it
  const container = anchor.closest("div.layout-cell-12")
  if (container.length === 0) return patents

  container.find("div.layout-cell-11").each((_, el) => {
    const $el = $(el)
    const fullText = cleanText($el.find("span.transform").text())

    // Parse authors and title
    const authors = parseAuthors(fullText)
    const dotSep = fullText.indexOf(" . ")
    if (dotSep === -1) return
    const afterAuthors = fullText.substring(dotSep + 3)

    // Title. YEAR. Patente: Programa de Computador. Número do registro: ...
    const titleMatch = afterAuthors.match(/^(.+?)\.\s*(\d{4})\.\s*Patente:/)
    if (!titleMatch) return

    const title = titleMatch[1].trim()
    const year = parseInt(titleMatch[2], 10)

    // Extract registration number
    const regMatch = fullText.match(/mero do registro:\s*(\S+),/)
    const patentNumber = regMatch ? regMatch[1].trim() : undefined

    // Extract registration date
    const dateMatch = fullText.match(/data de registro:\s*(\d{2}\/\d{2}\/\d{4})/)
    const registrationDate = dateMatch ? dateMatch[1] : undefined

    // Extract registration institution
    const instMatch = fullText.match(/(?:Institui..o|Instituição) de registro:\s*(.+?)\.?\s*$/)
    const registrationInstitution = instMatch ? instMatch[1].trim().replace(/\.\s*$/, "") : undefined

    patents.push({
      title: fixCasing(title),
      authors,
      year,
      ...(patentNumber && { patentNumber }),
      ...(registrationDate && { registrationDate }),
      ...(registrationInstitution && { registrationInstitution }),
      patentType: "Programa de Computador",
    })
  })

  return patents
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60)
}

export function parseProjects($: CheerioAPI, minYear: number): Project[] {
  const projects: Project[] = []

  const sections: { anchor: string; type: string }[] = [
    { anchor: "ProjetosPesquisa", type: "Pesquisa" },
    { anchor: "ProjetosExtensao", type: "Extensão" },
    { anchor: "ProjetosDesenvolvimento", type: "Desenvolvimento" },
  ]

  for (const section of sections) {
    const anchor = $(`a[name="${section.anchor}"]`)
    if (anchor.length === 0) continue

    const container = anchor.closest("div.title-wrapper").find("div.layout-cell-12")
    if (container.length === 0) continue

    // Each project starts with an <a name="PP_..."> anchor
    container.find('a[name^="PP_"]').each((_, anchorEl) => {
      const $anchor = $(anchorEl)

      // Period: next layout-cell-3
      const $periodCell = $anchor.nextAll("div.layout-cell-3").first()
      const periodText = cleanText($periodCell.text())
      const periodMatch = periodText.match(/(\d{4})\s*-\s*(\d{4}|Atual)/)
      if (!periodMatch) return

      const startYear = parseInt(periodMatch[1], 10)
      if (startYear < minYear) return

      // Title: next layout-cell-9
      const $titleCell = $periodCell.nextAll("div.layout-cell-9").first()
      const title = cleanText($titleCell.text())
      if (!title) return

      // Details: skip one more layout-cell-3 (empty), then next layout-cell-9
      const $emptyCell = $titleCell.nextAll("div.layout-cell-3").first()
      const $detailsCell = $emptyCell.nextAll("div.layout-cell-9").first()
      const detailsText = cleanText($detailsCell.text())

      // Parse description
      const descMatch = detailsText.match(/Descri..o:\s*(.+?)(?=Situa..o:|$)/)
      const description = descMatch ? descMatch[1].trim().replace(/\.\.\s*$/, ".").replace(/\.\s*$/, "") : ""

      // Parse status
      const statusMatch = detailsText.match(/Situa..o:\s*(.+?);/)
      let status = statusMatch ? statusMatch[1].trim() : "Em andamento"
      if (status.includes("Conclu")) status = "Finalizado"

      // Parse natureza (type) - use section type as default
      const natMatch = detailsText.match(/Natureza:\s*(.+?)\./)
      const type = natMatch ? natMatch[1].trim() : section.type

      // Parse coordinator and team from integrantes
      const intMatch = detailsText.match(/Integrantes:\s*(.+?)(?=Financiador|$)/)
      let professor = "Julio Cezar Costa Furtado"
      const team: string[] = []
      if (intMatch) {
        const members = intMatch[1].split("/")
        for (const member of members) {
          const nameRole = member.trim().replace(/\.\s*$/, "")
          if (!nameRole) continue
          if (nameRole.includes("Coordenador")) {
            const nameMatch = nameRole.match(/(.+?)\s*-\s*Coordenador/)
            if (nameMatch) professor = nameMatch[1].trim()
          }
          // Extract just the name (before " - Role")
          const justName = nameRole.replace(/\s*-\s*(Coordenador|Integrante).*$/, "").trim()
          if (justName) team.push(justName)
        }
      }

      // Parse funding
      const fundMatch = detailsText.match(/Financiador\(es\):\s*(.+?)\./)
      const funding = fundMatch ? fundMatch[1].trim() : undefined

      const period = periodMatch[0].trim()

      // Only include projects where we are the coordinator
      if (professor !== "Julio Cezar Costa Furtado") return

      projects.push({
        title,
        description,
        professor,
        status,
        type,
        link: slugify(title),
        documentation: [],
        period,
        ...(team.length > 0 && { team }),
        ...(funding && { funding }),
      })
    })
  }

  return projects
}

export function parseOrientations($: CheerioAPI, minYear: number): TCCProps[] {
  const orientations: TCCProps[] = []

  // Map section headers to degree types (skip IC)
  const degreeMap: Record<string, string> = {
    "mestrado": "Mestrado",
    "doutorado": "Doutorado",
    "gradua": "Graduação",
    "aperfei": "Especialização",
  }
  const skipHeaders = ["cient"] // skip Iniciação Científica

  function getDegree(headerText: string): string | null {
    const lower = headerText.toLowerCase()
    // Skip Iniciação Científica
    for (const skip of skipHeaders) {
      if (lower.includes(skip)) return null
    }
    for (const [key, value] of Object.entries(degreeMap)) {
      if (lower.includes(key)) return value
    }
    return "Graduação"
  }

  // Parse both in-progress and completed sections
  const sectionAnchors = [
    { name: "Orientacaoemandamento", status: "Em andamento" },
    { name: "Orientacoesconcluidas", status: "Finalizado" },
  ]

  for (const section of sectionAnchors) {
    const anchor = $(`a[name="${section.name}"]`)
    if (anchor.length === 0) continue

    // Find all subsection headers and their entries
    let currentDegree = "Graduação"

    // Walk through all siblings after the anchor
    let $el = anchor.next()
    while ($el.length > 0) {
      // Stop at next major section
      if ($el.hasClass("title-wrapper")) break
      // Stop if we hit another named anchor (next section)
      if ($el.is("a[name]") && $el.attr("name") !== section.name) break

      // Check for subsection header
      if ($el.hasClass("cita-artigos")) {
        const headerText = cleanText($el.text())
        const degree = getDegree(headerText)
        if (degree === null) {
          // Skip this entire subsection (e.g. Iniciação Científica)
          currentDegree = "__skip__"
        } else {
          currentDegree = degree
        }
        $el = $el.next()
        continue
      }

      // Check for inst_back header (used in the "Orientações e supervisões" headers)
      if ($el.hasClass("inst_back")) {
        $el = $el.next()
        continue
      }

      // Parse entry: layout-cell-11 contains the orientation text
      if ($el.hasClass("layout-cell") && $el.hasClass("layout-cell-11")) {
        // Skip entries from excluded subsections
        if (currentDegree === "__skip__") { $el = $el.next(); continue }

        const text = cleanText($el.find("span.transform").text())
        if (!text) { $el = $el.next(); continue }

        // Extract year
        let year: string | undefined
        if (section.status === "Em andamento") {
          const yearMatch = text.match(/In.cio:\s*(\d{4})/)
          year = yearMatch ? yearMatch[1] : undefined
        } else {
          // Completed: year is standalone after title
          const yearMatch = text.match(/\.\s*(\d{4})\.\s/)
          year = yearMatch ? yearMatch[1] : undefined
        }

        if (!year || parseInt(year, 10) < minYear) {
          $el = $el.next()
          continue
        }

        // Extract student name(s) and title
        // Format: "STUDENT. TITLE. [Início:|YEAR.]..."
        // Students come before the first ". " followed by an uppercase letter (title start)
        let students: string[] = []
        let title = ""

        // Find the title boundary - it ends before "Início:" or before "YEAR.\n"
        if (section.status === "Em andamento") {
          // Format: "STUDENT. TITLE. Início: YEAR..."
          const match = text.match(/^(.+?)\.\s*In.cio:\s*\d{4}/)
          if (match) {
            const beforeYear = match[1].trim()
            // Last ". " separates student from title... but student name has "." too
            // Actually the format is: "Student Name. Title Text"
            // We need a smarter split - find where student ends and title begins
            const firstDot = beforeYear.indexOf(". ")
            if (firstDot > 0) {
              const studentPart = beforeYear.substring(0, firstDot).trim()
              title = beforeYear.substring(firstDot + 2).trim()
              students = splitStudents(studentPart)
            } else {
              title = beforeYear
            }
          }
        } else {
          // Completed format: "Student Name. Title. YEAR. Type..."
          // Find the year position
          const yearIdx = text.indexOf(`. ${year}.`)
          if (yearIdx > 0) {
            const beforeYear = text.substring(0, yearIdx).trim()
            const firstDot = beforeYear.indexOf(". ")
            if (firstDot > 0) {
              const studentPart = beforeYear.substring(0, firstDot).trim()
              title = beforeYear.substring(firstDot + 2).trim()
              students = splitStudents(studentPart)
            } else {
              title = beforeYear
            }
          }
        }

        if (!title) { $el = $el.next(); continue }

        // Remove trailing period from title
        title = title.replace(/\.\s*$/, "")

        // Skip entries where we are co-advisor (not main advisor)
        const coAdvisorMatch = text.match(/Coorientador:\s*(.+?)\./)
        if (coAdvisorMatch && coAdvisorMatch[1].includes("Julio Cezar")) {
          $el = $el.next()
          continue
        }

        // Extract advisor name
        let advisor = "Julio Cezar Costa Furtado"
        const advisorMatch = text.match(/Orientador:\s*(.+?)\./)
        if (advisorMatch) advisor = advisorMatch[1].trim()

        orientations.push({
          title: fixCasing(title),
          description: "",
          link: slugify(title),
          status: section.status,
          students: students.map(fixCasing),
          advisor,
          year,
          keywords: "",
          degree: currentDegree,
        })
      }

      $el = $el.next()
    }
  }

  return orientations
}

function splitStudents(text: string): string[] {
  // Students separated by ";" or " e " (when it's clearly between two names)
  // e.g. "João;Maria" or "João e Maria" or "Eduardo Teixeira Flexa e Patrick Mirando dos Santos"
  if (text.includes(";")) {
    return text.split(";").map((s) => s.trim()).filter(Boolean)
  }
  // Check for " e " as separator between two student names
  // Heuristic: if " e " appears and both sides look like names, split
  const eParts = text.split(" e ")
  if (eParts.length === 2 && eParts[0].trim().length > 3 && eParts[1].trim().length > 3) {
    return eParts.map((s) => s.trim())
  }
  return [text.trim()]
}

export function parseLattes(html: string, minYear: number) {
  const $ = cheerio.load(html)

  const articles = parseArticles($, minYear)
  const books = parseBooks($, minYear)
  const chapters = parseChapters($, minYear)
  const congressPapers = parseCongressPapers($, minYear)
  const patents = parsePatents($)
  const projects = parseProjects($, minYear)
  const orientations = parseOrientations($, minYear)

  const publications: PublicationProps[] = [...books, ...chapters, ...articles, ...congressPapers]

  return { publications, patents, projects, orientations }
}
