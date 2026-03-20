import { readFileSync, writeFileSync, existsSync } from "fs"
import { resolve } from "path"
import { parseLattes } from "./lattes-html-parser"
import { generatePublicationsFile } from "./ts-generator"

const MIN_YEAR = 2016
const OUTPUT_PATH = resolve(__dirname, "../src/app/context/data/publications.ts")

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
const { publications, patents } = parseLattes(html, MIN_YEAR)

// Summary
const byType: Record<string, number> = {}
for (const p of publications) {
  byType[p.type] = (byType[p.type] || 0) + 1
}

console.log("\n📊 Resumo:")
console.log(`   Patentes: ${patents.length}`)
for (const [type, count] of Object.entries(byType)) {
  console.log(`   ${type}: ${count}`)
}
console.log(`   Total publicações: ${publications.length}`)

// Generate and write
const output = generatePublicationsFile(publications, patents)
writeFileSync(OUTPUT_PATH, output, "utf-8")

console.log(`\n✅ Arquivo gerado: ${OUTPUT_PATH}`)
