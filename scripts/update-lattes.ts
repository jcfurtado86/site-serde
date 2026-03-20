import { readFileSync, writeFileSync, existsSync } from "fs"
import { resolve } from "path"
import { parseLattes } from "./lattes-html-parser"
import { generatePublicationsFile, generateProjectsFile, generateTccsFile } from "./ts-generator"

const MIN_YEAR = 2016
const DATA_DIR = resolve(__dirname, "../src/app/context/data")
const PUBLICATIONS_PATH = resolve(DATA_DIR, "publications.ts")
const PROJECTS_PATH = resolve(DATA_DIR, "projects.ts")
const TCCS_PATH = resolve(DATA_DIR, "tccs.ts")

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

// Generate and write all files
writeFileSync(PUBLICATIONS_PATH, generatePublicationsFile(publications, patents), "utf-8")
console.log(`\n✅ ${PUBLICATIONS_PATH}`)

writeFileSync(PROJECTS_PATH, generateProjectsFile(projects), "utf-8")
console.log(`✅ ${PROJECTS_PATH}`)

writeFileSync(TCCS_PATH, generateTccsFile(orientations), "utf-8")
console.log(`✅ ${TCCS_PATH}`)
