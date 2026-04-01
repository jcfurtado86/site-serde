import { writeFileSync } from "fs"
import { resolve } from "path"
import * as cheerio from "cheerio"
import { generatePublicationsFile } from "./ts-generator"
import type { PublicationProps, PatentProps } from "../src/app/context/types"

const DATA_DIR = resolve(__dirname, "../src/app/context/data")
const PUBLICATIONS_PATH = resolve(DATA_DIR, "publications.ts")

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function normalizeForComparison(s: string): string {
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function validateResult(pageHtml: string, pub: PublicationProps): boolean {
  const normalized = normalizeForComparison(pageHtml)
  const titleWords = normalizeForComparison(pub.title).split(" ").filter((w) => w.length > 3)

  // Check title: at least 60% of significant words must appear
  const titleMatches = titleWords.filter((w) => normalized.includes(w)).length
  if (titleMatches / titleWords.length < 0.6) return false

  // Check authors: at least one author's last name must appear
  const authorLastNames = pub.authors.map((a) => {
    const parts = a.replace(/,.*/, "").trim().split(" ")
    return normalizeForComparison(parts[parts.length - 1] || parts[0])
  }).filter((n) => n.length > 2)
  const hasAuthor = authorLastNames.some((name) => normalized.includes(name))
  if (!hasAuthor) return false

  // Check event/journal: at least 40% of significant words (including year/edition)
  const venue = pub.event || pub.publisher || pub.proceedings || ""
  if (venue) {
    const venueWords = normalizeForComparison(venue).split(" ").filter((w) => w.length > 2)
    if (venueWords.length > 0) {
      const venueMatches = venueWords.filter((w) => normalized.includes(w)).length
      if (venueMatches / venueWords.length < 0.4) return false
    }
  }

  return true
}

async function searchScholar(pub: PublicationProps): Promise<string[]> {
  const venue = pub.event || pub.publisher || pub.proceedings || ""
  const firstAuthorLastName = pub.authors[0]?.replace(/,.*/, "").trim() || ""
  const query = encodeURIComponent(`"${pub.title}" ${venue} ${firstAuthorLastName}`)
  const url = `https://scholar.google.com/scholar?q=${query}`

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
    },
  })

  if (!res.ok) return []

  const html = await res.text()
  const $ = cheerio.load(html)

  const links: string[] = []
  $("h3.gs_rt a[href]").each((_, el) => {
    const href = $(el).attr("href")
    if (href && href.startsWith("http")) {
      links.push(href)
    }
  })
  return links
}

function extractSOLLinks(html: string): string[] {
  const links: string[] = []
  const regex = /href="(https:\/\/sol\.sbc\.org\.br\/index\.php\/[a-z_]+\/article\/view\/\d+)"/g
  let match
  while ((match = regex.exec(html)) !== null) {
    if (!links.includes(match[1])) links.push(match[1])
  }
  return links
}

async function searchSOL(pub: PublicationProps): Promise<string[]> {
  const venue = pub.event || pub.publisher || pub.proceedings || ""
  const firstAuthorLastName = pub.authors[0]?.replace(/,.*/, "").trim() || ""

  try {
    const fullQuery = encodeURIComponent(`${pub.title} ${venue} ${firstAuthorLastName}`)
    const res1 = await fetch(
      `https://sol.sbc.org.br/busca/index.php/integrada/results?query=${fullQuery}`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    )
    if (res1.ok) {
      const links = extractSOLLinks(await res1.text())
      if (links.length > 0) return links
    }

    await sleep(1000)
    const titleQuery = encodeURIComponent(pub.title)
    const res2 = await fetch(
      `https://sol.sbc.org.br/busca/index.php/integrada/results?query=${titleQuery}`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    )
    if (res2.ok) {
      const links = extractSOLLinks(await res2.text())
      if (links.length > 0) return links
    }
  } catch { /* network error, skip */ }
  return []
}

async function searchPublicationLink(pub: PublicationProps): Promise<string | undefined> {
  const scholarLinks = await searchScholar(pub)
  for (const link of scholarLinks) {
    try {
      const res = await fetch(link, {
        headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" },
        redirect: "follow",
      })
      if (res.ok) {
        const html = await res.text()
        if (validateResult(html, pub)) return link
      }
    } catch { /* skip unreachable */ }
    await sleep(500)
  }

  await sleep(1000)
  const solLinks = await searchSOL(pub)
  for (const link of solLinks) {
    try {
      const res = await fetch(link, {
        headers: { "User-Agent": "Mozilla/5.0" },
        redirect: "follow",
      })
      if (res.ok) {
        const html = await res.text()
        if (validateResult(html, pub)) return link
      }
    } catch { /* skip unreachable */ }
    await sleep(500)
  }

  return undefined
}

// --- Main ---

const REFRESH_LINKS = process.argv.includes("--refresh-links")

async function main() {
  console.log("📂 Carregando publicações...")
  const pubs = await import("../src/app/context/data/publications")
  const publications = pubs.publications as PublicationProps[]
  const patents = pubs.patents as PatentProps[]

  const withoutLink = REFRESH_LINKS
    ? publications.filter((p) => !p.link || p.link === "#")
    : publications.filter((p) => !p.link || p.link === "#")

  if (withoutLink.length === 0) {
    console.log("✅ Todas as publicações já têm links!")
    return
  }

  console.log(`\n🔗 Buscando links para ${withoutLink.length} publicações...`)

  let found = 0
  const usedLinks = new Set<string>()
  for (const p of publications) {
    if (p.link && p.link !== "#") usedLinks.add(p.link)
  }

  for (const pub of withoutLink) {
    const link = await searchPublicationLink(pub)
    if (link && !usedLinks.has(link)) {
      pub.link = link
      usedLinks.add(link)
      found++
      console.log(`  ✓ ${pub.title.slice(0, 60)}...`)
      console.log(`    → ${link}`)
    } else if (link && usedLinks.has(link)) {
      console.log(`  ✗ ${pub.title.slice(0, 60)}... (link duplicado, ignorado)`)
    } else {
      console.log(`  ✗ ${pub.title.slice(0, 60)}...`)
    }
    await sleep(3000)
  }
  console.log(`\n   Links encontrados: ${found}/${withoutLink.length}`)

  if (found > 0) {
    writeFileSync(PUBLICATIONS_PATH, generatePublicationsFile(publications, patents), "utf-8")
    console.log(`\n✅ ${PUBLICATIONS_PATH} atualizado com ${found} novos links`)
  } else {
    console.log("\n⚠ Nenhum link novo encontrado")
  }
}

main().catch((err) => {
  console.error("Error:", err)
  process.exit(1)
})
