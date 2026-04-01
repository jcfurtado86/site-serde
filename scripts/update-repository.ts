import { writeFileSync } from "fs"
import { resolve } from "path"
import { generateTccsFile } from "./ts-generator"
import type { TCCProps } from "../src/app/context/types"

const API_BASE = "https://repositorio.unifap.br/srv-unifap-s01/api"
const COMMUNITY_SCOPE = "c8257ebd-6135-4efa-a362-7bc035cba236"
const TCCS_PATH = resolve(__dirname, "../src/app/context/data/tccs.ts")

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function normalizeForComparison(s: string): string {
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

interface DSpaceItem {
  uuid: string
  metadata: Record<string, { value: string }[]>
}

async function searchRepository(title: string): Promise<DSpaceItem | null> {
  // Remove special chars that break DSpace search (hyphens, colons, etc.)
  const cleanTitle = title.replace(/[:\-–—]/g, " ").replace(/\s+/g, " ").trim()
  const query = encodeURIComponent(cleanTitle)
  const url = `${API_BASE}/discover/search/objects?query=${query}&dsoType=ITEM&scope=${COMMUNITY_SCOPE}&size=5`

  try {
    const res = await fetch(url, {
      headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0" },
    })
    if (!res.ok) return null

    const data = await res.json()
    const objects = data?._embedded?.searchResult?._embedded?.objects
    if (!objects || objects.length === 0) return null

    // Return all items for validation
    for (const obj of objects) {
      const item = obj?._embedded?.indexableObject as DSpaceItem
      if (item) return item
    }
  } catch { /* network error */ }
  return null
}

function getMetaValue(item: DSpaceItem, key: string): string | undefined {
  return item.metadata[key]?.[0]?.value
}

function getMetaValues(item: DSpaceItem, key: string): string[] {
  return (item.metadata[key] || []).map((v) => v.value)
}

function validateMatch(tcc: TCCProps, item: DSpaceItem): boolean {
  // Check title similarity (>80% of significant words)
  const tccWords = normalizeForComparison(tcc.title).split(" ").filter((w) => w.length > 3)
  const repoTitle = normalizeForComparison(getMetaValue(item, "dc.title") || "")
  const titleMatches = tccWords.filter((w) => repoTitle.includes(w)).length
  if (tccWords.length === 0 || titleMatches / tccWords.length < 0.8) return false

  // Check at least 1 student last name matches a creator
  const creators = getMetaValues(item, "dc.creator").map((c) => normalizeForComparison(c))
  const hasStudentMatch = tcc.students.some((student) => {
    const parts = normalizeForComparison(student).split(" ")
    const lastName = parts[parts.length - 1]
    return lastName.length > 2 && creators.some((c) => c.includes(lastName))
  })
  if (!hasStudentMatch) return false

  return true
}

async function main() {
  const { tccs } = await import("../src/app/context/data/tccs")
  const allTccs = [...tccs] as TCCProps[]

  // Process all finalized TCCs — update repository link + fill empty description/keywords
  const toProcess = allTccs.filter((t) => t.status === "Finalizado")

  console.log(`📚 Repositório UNIFAP — buscando dados para ${toProcess.length} orientações concluídas...`)

  let found = 0
  let notFound = 0

  for (const tcc of toProcess) {
    const item = await searchRepository(tcc.title)

    if (item && validateMatch(tcc, item)) {
      const resumo = getMetaValue(item, "dc.description.resumo")
      const subjects = getMetaValues(item, "dc.subject")
      const uri = getMetaValue(item, "dc.identifier.uri")

      // Update TCC in allTccs array (same reference)
      const idx = allTccs.findIndex((t) => t.title === tcc.title && t.status === tcc.status)
      if (idx === -1) continue

      if (resumo && (!allTccs[idx].description || allTccs[idx].description.trim() === "")) {
        // Remove line breaks and normalize whitespace (only fill if empty — local is fallback)
        allTccs[idx].description = resumo.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim()
      }
      if (subjects.length > 0 && (!allTccs[idx].keywords || allTccs[idx].keywords.trim() === "")) {
        allTccs[idx].keywords = subjects.join(", ")
      }
      if (uri) {
        // Normalize URI: remove /jspui and port from old DSpace URLs
        const normalizedUri = uri.replace(/:80/, "").replace("/jspui/handle/", "/handle/")
        const docs = allTccs[idx].documentation || []
        // Replace local PDF link with repository link, or add if none exists
        const localPdfIdx = docs.findIndex((d) => d.link.startsWith("/tccs/"))
        if (localPdfIdx !== -1) {
          docs[localPdfIdx] = { name: "Repositório UNIFAP", type: "article", link: normalizedUri }
        } else {
          const alreadyHasRepo = docs.some((d) => d.link.includes("repositorio.unifap.br"))
          if (!alreadyHasRepo) {
            docs.push({ name: "Repositório UNIFAP", type: "article", link: normalizedUri })
          }
        }
        allTccs[idx].documentation = docs
      }

      found++
      console.log(`  ✓ ${tcc.title.slice(0, 60)}...`)
    } else {
      notFound++
      console.log(`  ✗ ${tcc.title.slice(0, 60)}...`)
    }

    await sleep(1000)
  }

  console.log(`\n   Encontrados: ${found}/${toProcess.length}`)
  if (notFound > 0) {
    console.log(`   Não encontrados: ${notFound}`)
  }

  // Write updated tccs
  writeFileSync(TCCS_PATH, generateTccsFile(allTccs), "utf-8")
  console.log(`\n✅ ${TCCS_PATH}`)
}

main().catch((err) => {
  console.error("Error:", err)
  process.exit(1)
})
