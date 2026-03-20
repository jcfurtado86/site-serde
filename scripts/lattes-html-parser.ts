import * as cheerio from "cheerio"
import type { PublicationProps, PatentProps } from "../src/app/context/types"

type CheerioAPI = ReturnType<typeof cheerio.load>

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .trim()
}

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
    .map((a) => a.trim())
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
      title,
      authors,
      publisher,
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
        title: bookMatch[1].trim(),
        authors,
        edition: bookMatch[2].trim(),
        publisher: bookMatch[4].trim(),
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
        title,
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
        title: chapterMatch[1].trim(),
        authors,
        publisher: chapterMatch[3].trim(),
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
        title,
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
          title: m[1].trim(),
          authors,
          year: year.toString(),
          event: m[2].trim(),
          location: m[4].trim(),
          proceedings: m[5].trim(),
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
          const eventMatch = inPart.match(/(.+?),\s*\d{4},\s*(.+?)\./)
          if (eventMatch) {
            event = eventMatch[1].trim()
            location = eventMatch[2].trim()
          }
          const procMatch = inPart.match(/\.\s*(.+?),\s*\d{4}/)
          if (procMatch) proceedings = procMatch[1].trim()
        }

        papers.push({
          type: section.type,
          title,
          authors,
          year: year.toString(),
          ...(event && { event }),
          ...(location && { location }),
          ...(proceedings && { proceedings }),
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
      title,
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

export function parseLattes(html: string, minYear: number) {
  const $ = cheerio.load(html)

  const articles = parseArticles($, minYear)
  const books = parseBooks($, minYear)
  const chapters = parseChapters($, minYear)
  const congressPapers = parseCongressPapers($, minYear)
  const patents = parsePatents($)

  const publications: PublicationProps[] = [...books, ...chapters, ...articles, ...congressPapers]

  return { publications, patents }
}
