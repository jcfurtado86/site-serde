import { readFileSync, writeFileSync, existsSync } from "fs"
import { resolve } from "path"
import * as cheerio from "cheerio"
import { parseLattes } from "./lattes-html-parser"
import { generatePublicationsFile, generateProjectsFile, generateTccsFile } from "./ts-generator"
import type { PublicationProps, PatentProps, Project, TCCProps } from "../src/app/context/types"

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

// --- Merge utilities ---

function pubKey(p: PublicationProps | PatentProps): string {
  const year = typeof p.year === "number" ? p.year : parseInt(String(p.year), 10)
  return normalizeForComparison(p.title) + "|" + year
}

function projectKey(p: Project): string {
  return normalizeForComparison(p.title)
}

function tccKey(t: TCCProps): string {
  return normalizeForComparison(t.title)
}

async function loadLocalData() {
  try {
    const pubs = await import("../src/app/context/data/publications")
    const projs = await import("../src/app/context/data/projects")
    const tccsModule = await import("../src/app/context/data/tccs")
    return {
      publications: pubs.publications as PublicationProps[],
      patents: pubs.patents as PatentProps[],
      projects: projs.projectsData as Project[],
      tccs: tccsModule.tccs as TCCProps[],
    }
  } catch {
    console.log("⚠ Dados locais não encontrados, criando do zero")
    return { publications: [], patents: [], projects: [], tccs: [] }
  }
}

function mergePublications(imported: PublicationProps[], local: PublicationProps[]): PublicationProps[] {
  const localMap = new Map<string, PublicationProps>()
  for (const p of local) localMap.set(pubKey(p), p)

  const matched = new Set<string>()
  const merged: PublicationProps[] = []

  for (const imp of imported) {
    const key = pubKey(imp)
    const loc = localMap.get(key)
    if (loc) {
      matched.add(key)
      merged.push({
        ...imp,
        // Preservar do local se existir
        link: (loc.link && loc.link !== "#") ? loc.link : imp.link,
        importance: loc.importance ?? imp.importance,
        scieloCitations: loc.scieloCitations ?? imp.scieloCitations,
        jcrImpact: loc.jcrImpact ?? imp.jcrImpact,
      })
    } else {
      merged.push(imp)
    }
  }

  // Manter publicações que só existem no local
  let localOnly = 0
  for (const [key, loc] of localMap) {
    if (!matched.has(key)) {
      merged.push(loc)
      localOnly++
      console.log(`  ⚠ Local-only: ${loc.title.slice(0, 60)}...`)
    }
  }

  console.log(`  Publicações: ${matched.size} matched, ${imported.length - matched.size} new, ${localOnly} local-only`)
  return merged
}

function mergePatents(imported: PatentProps[], local: PatentProps[]): PatentProps[] {
  const localMap = new Map<string, PatentProps>()
  for (const p of local) localMap.set(pubKey(p), p)

  const matched = new Set<string>()
  const merged: PatentProps[] = []

  for (const imp of imported) {
    const key = pubKey(imp)
    const loc = localMap.get(key)
    if (loc) {
      matched.add(key)
      merged.push({ ...imp, link: (loc.link && loc.link !== "#") ? loc.link : imp.link })
    } else {
      merged.push(imp)
    }
  }

  for (const [key, loc] of localMap) {
    if (!matched.has(key)) merged.push(loc)
  }

  console.log(`  Patentes: ${matched.size} matched, ${imported.length - matched.size} new, ${localMap.size - matched.size} local-only`)
  return merged
}

function mergeProjects(imported: Project[], local: Project[]): Project[] {
  const localMap = new Map<string, Project>()
  for (const p of local) localMap.set(projectKey(p), p)

  const matched = new Set<string>()
  const merged: Project[] = []

  for (const imp of imported) {
    const key = projectKey(imp)
    const loc = localMap.get(key)
    if (loc) {
      matched.add(key)
      merged.push({
        ...imp,
        documentation: loc.documentation || [],
        link: loc.link || imp.link,
        title_en: loc.title_en,
        description_en: loc.description_en,
      })
    } else {
      merged.push(imp)
    }
  }

  let localOnly = 0
  for (const [key, loc] of localMap) {
    if (!matched.has(key)) {
      merged.push(loc)
      localOnly++
      console.log(`  ⚠ Projeto local-only: ${loc.title.slice(0, 60)}`)
    }
  }

  console.log(`  Projetos: ${matched.size} matched, ${imported.length - matched.size} new, ${localOnly} local-only`)
  return merged
}

function mergeTccs(imported: TCCProps[], local: TCCProps[]): TCCProps[] {
  const localMap = new Map<string, TCCProps>()
  for (const t of local) localMap.set(tccKey(t), t)

  const matched = new Set<string>()
  const merged: TCCProps[] = []

  for (const imp of imported) {
    const key = tccKey(imp)
    const loc = localMap.get(key)
    if (loc) {
      matched.add(key)
      merged.push({
        ...imp,
        documentation: loc.documentation,
        title_en: loc.title_en,
        description_en: loc.description_en,
        link: (loc.link && loc.link !== imp.link) ? loc.link : imp.link,
      })
    } else {
      merged.push(imp)
    }
  }

  let localOnly = 0
  for (const [key, loc] of localMap) {
    if (!matched.has(key)) {
      merged.push(loc)
      localOnly++
      console.log(`  ⚠ TCC local-only: ${loc.title.slice(0, 60)}`)
    }
  }

  console.log(`  TCCs: ${matched.size} matched, ${imported.length - matched.size} new, ${localOnly} local-only`)
  return merged
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

  // Load local data for merge
  console.log("\n📂 Carregando dados locais para merge...")
  const localData = await loadLocalData()

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

  // Transfer local links to imported publications before searching
  const localPubMap = new Map<string, PublicationProps>()
  for (const p of localData.publications) localPubMap.set(pubKey(p), p)

  let linksFromLocal = 0
  for (const pub of publications) {
    if (!pub.link || pub.link === "#") {
      const local = localPubMap.get(pubKey(pub))
      if (local?.link && local.link !== "#") {
        pub.link = local.link
        linksFromLocal++
      }
    }
  }
  if (linksFromLocal > 0) {
    console.log(`\n🔗 ${linksFromLocal} links preservados do local`)
  }

  // Search Google for publications without links (local or imported)
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

  // Merge with local data and write
  console.log("\n🔀 Merging com dados locais...")
  const mergedPubs = mergePublications(publications, localData.publications)
  const mergedPatents = mergePatents(patents, localData.patents)
  const mergedProjects = mergeProjects(projects, localData.projects)
  const mergedTccs = mergeTccs(orientations, localData.tccs)

  writeFileSync(PUBLICATIONS_PATH, generatePublicationsFile(mergedPubs, mergedPatents), "utf-8")
  console.log(`\n✅ ${PUBLICATIONS_PATH}`)

  writeFileSync(PROJECTS_PATH, generateProjectsFile(mergedProjects), "utf-8")
  console.log(`✅ ${PROJECTS_PATH}`)

  writeFileSync(TCCS_PATH, generateTccsFile(mergedTccs), "utf-8")
  console.log(`✅ ${TCCS_PATH}`)
}

main().catch((err) => {
  console.error("Error:", err)
  process.exit(1)
})
