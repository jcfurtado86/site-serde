import { readFileSync, writeFileSync, existsSync } from "fs"
import { resolve } from "path"
import * as cheerio from "cheerio"
import { parseLattes } from "./lattes-html-parser"
import { generatePublicationsFile, generateProjectsFile, generateTccsFile } from "./ts-generator"
import type { PublicationProps } from "../src/app/context/types"

const MIN_YEAR = 2016
const DATA_DIR = resolve(__dirname, "../src/app/context/data")
const PUBLICATIONS_PATH = resolve(DATA_DIR, "publications.ts")
const PROJECTS_PATH = resolve(DATA_DIR, "projects.ts")
const TCCS_PATH = resolve(DATA_DIR, "tccs.ts")

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

  return true
}

async function searchScholar(title: string): Promise<string[]> {
  const query = encodeURIComponent(`"${title}"`)
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
  // Try 1: search by title keywords
  const words = pub.title
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[-:;,.()\[\]]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 8)
  const titleQuery = encodeURIComponent(words.join(" "))
  const res1 = await fetch(
    `https://sol.sbc.org.br/busca/index.php/integrada/results?query=${titleQuery}`,
    { headers: { "User-Agent": "Mozilla/5.0" } },
  )
  if (res1.ok) {
    const links = extractSOLLinks(await res1.text())
    if (links.length > 0) return links
  }

  // Try 2: search by author last names
  await sleep(1000)
  const lastNames = pub.authors
    .map((a) => a.replace(/,.*/, "").trim())
    .filter((n) => n.length > 2)
    .slice(0, 3)
  if (lastNames.length === 0) return []
  const authorQuery = encodeURIComponent(lastNames.join(" "))
  const res2 = await fetch(
    `https://sol.sbc.org.br/busca/index.php/integrada/results?query=${authorQuery}`,
    { headers: { "User-Agent": "Mozilla/5.0" } },
  )
  if (res2.ok) {
    return extractSOLLinks(await res2.text())
  }
  return []
}

async function searchPublicationLink(pub: PublicationProps): Promise<string | undefined> {
  // Try Google Scholar first
  const scholarLinks = await searchScholar(pub.title)
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

  // Fallback: SOL (SBC)
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

async function main() {
  // Look for lattes.html in project root or scripts/data/
  const candidates = [
    resolve(__dirname, "../lattes.html"),
    resolve(__dirname, "data/lattes.html"),
  ]

  const htmlPath = candidates.find((p) => existsSync(p))

  if (!htmlPath) {
    console.error("❌ lattes.html não encontrado!")
    console.error("   Salve o HTML do Lattes em uma das seguintes localizações:")
    candidates.forEach((p) => console.error(`   - ${p}`))
    process.exit(1)
  }

  console.log(`📄 Lendo ${htmlPath}...`)

  // Read as latin1 (handles windows-1252 encoding)
  const html = readFileSync(htmlPath, "latin1")

  console.log("🔍 Parseando dados do Lattes...")
  const { publications, patents, projects, orientations } = parseLattes(html, MIN_YEAR)

  // Summary - Publications
  const byType: Record<string, number> = {}
  for (const p of publications) {
    byType[p.type] = (byType[p.type] || 0) + 1
  }

  console.log("\n📊 Resumo:")
  console.log("   --- Publicações ---")
  console.log(`   Patentes: ${patents.length}`)
  for (const [type, count] of Object.entries(byType)) {
    console.log(`   ${type}: ${count}`)
  }
  console.log(`   Total publicações: ${publications.length}`)

  // Summary - Projects
  console.log(`\n   --- Projetos ---`)
  console.log(`   Total: ${projects.length}`)
  const byProjectType: Record<string, number> = {}
  for (const p of projects) {
    byProjectType[p.type] = (byProjectType[p.type] || 0) + 1
  }
  for (const [type, count] of Object.entries(byProjectType)) {
    console.log(`   ${type}: ${count}`)
  }

  // Summary - Orientations
  console.log(`\n   --- Orientações ---`)
  console.log(`   Total: ${orientations.length}`)
  const byDegree: Record<string, number> = {}
  for (const o of orientations) {
    const key = o.degree || "Graduação"
    byDegree[key] = (byDegree[key] || 0) + 1
  }
  for (const [degree, count] of Object.entries(byDegree)) {
    console.log(`   ${degree}: ${count}`)
  }

  // Search Google for publications without links
  const withoutLink = publications.filter((p) => !p.link || p.link === "#")
  console.log(`\n🔗 Buscando links para ${withoutLink.length} publicações...`)

  let found = 0
  for (const pub of withoutLink) {
    const link = await searchPublicationLink(pub)
    if (link) {
      pub.link = link
      found++
      console.log(`  ✓ ${pub.title.slice(0, 60)}...`)
      console.log(`    → ${link}`)
    } else {
      console.log(`  ✗ ${pub.title.slice(0, 60)}...`)
    }
    await sleep(3000)
  }
  console.log(`\n   Links encontrados: ${found}/${withoutLink.length}`)

  // Generate and write all files
  writeFileSync(PUBLICATIONS_PATH, generatePublicationsFile(publications, patents), "utf-8")
  console.log(`\n✅ ${PUBLICATIONS_PATH}`)

  writeFileSync(PROJECTS_PATH, generateProjectsFile(projects), "utf-8")
  console.log(`✅ ${PROJECTS_PATH}`)

  writeFileSync(TCCS_PATH, generateTccsFile(orientations), "utf-8")
  console.log(`✅ ${TCCS_PATH}`)
}

main().catch((err) => {
  console.error("Error:", err)
  process.exit(1)
})
