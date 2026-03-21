import * as cheerio from "cheerio"
import * as fs from "fs"
import * as path from "path"
import { generateMembersFile } from "./ts-generator"
import { fixCasing } from "./fix-casing"
import type { StudentProps, TeacherProps } from "../src/app/context/types"
import { tccs } from "../src/app/context/data/tccs"

const CNPq_URL = "http://dgp.cnpq.br/dgp/espelhogrupo/225177"
const OUTPUT_PATH = path.join(__dirname, "..", "src", "app", "context", "data", "members.ts")
const CACHE_PATH = path.join(__dirname, "..", "src", "app", "context", "data", "members copy.ts")

function mapDegree(titulacao: string): string | undefined {
  const lower = titulacao.toLowerCase()
  if (lower.includes("mestrado")) return "Master"
  if (lower.includes("especialização") || lower.includes("especializacao")) return "Master"
  return undefined
}

function buildCurriculumLink(lattesNumericId: string): string {
  return `http://lattes.cnpq.br/${lattesNumericId}`
}

function buildImageUrl(lattesShortId: string): string {
  return `http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=${lattesShortId}`
}

// --- JSF session management ---

interface JsfSession {
  cookies: string
  viewState: string
}

async function initSession(): Promise<JsfSession> {
  console.log(`Fetching ${CNPq_URL}...`)
  const res = await fetch(CNPq_URL)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const cookies = res.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ")
  const html = await res.text()
  console.log(`Fetched ${html.length} bytes`)

  const viewStateMatch = html.match(/name="javax\.faces\.ViewState"[^/]*value="([^"]*)"/)
  if (!viewStateMatch) throw new Error("ViewState not found")

  return { cookies, viewState: viewStateMatch[1] }
}

async function fetchLattesId(session: JsfSession, tableId: string, index: number): Promise<string | null> {
  const buttonId = `idFormVisualizarGrupoPesquisa:${tableId}:${index}:btnAcessoLattes2`

  const body = new URLSearchParams({
    "idFormVisualizarGrupoPesquisa": "idFormVisualizarGrupoPesquisa",
    [buttonId]: buttonId,
    "javax.faces.ViewState": session.viewState,
  })

  const res = await fetch(CNPq_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": session.cookies,
    },
    body: body.toString(),
    redirect: "manual",
  })

  const location = res.headers.get("location")
  if (!location || !location.includes("lattes.cnpq.br/")) return null

  const numericId = location.split("/").pop() || null
  return numericId
}

async function fetchLattesShortId(numericId: string): Promise<string | null> {
  const res = await fetch(`http://lattes.cnpq.br/${numericId}`)
  if (!res.ok) return null
  const html = await res.text()
  const match = html.match(/<input[^>]*name="id"[^>]*value="([^"]*)"/)
  return match ? match[1] : null
}

// --- Parsing ---

interface ParsedMember {
  name: string
  titulacao: string
}

interface ParsedEgresso {
  name: string
  period: string
}

function parseTable($: cheerio.CheerioAPI, containerIdPart: string): ParsedMember[] {
  const members: ParsedMember[] = []
  $(`div[id*="${containerIdPart}"] tbody tr`).each((_, el) => {
    const cells = $(el).find('td[role="gridcell"]')
    if (cells.length < 3) return
    const name = cells.eq(0).text().trim()
    const titulacao = cells.eq(1).text().trim()
    if (name && name !== "Nome") {
      members.push({ name, titulacao })
    }
  })
  return members
}

function parseEgressosTable($: cheerio.CheerioAPI, containerIdPart: string): ParsedEgresso[] {
  const egressos: ParsedEgresso[] = []
  $(`div[id*="${containerIdPart}"] tbody tr`).each((_, el) => {
    const cells = $(el).find('td[role="gridcell"]')
    if (cells.length < 2) return
    const nameCell = cells.eq(0)
    const name = nameCell.find("div").text().trim() || nameCell.text().trim()
    const period = cells.eq(1).text().trim()
    if (name && name !== "Nome") {
      egressos.push({ name, period })
    }
  })
  return egressos
}

// --- Main ---

async function main() {
  const session = await initSession()
  const $ = cheerio.load(await (await fetch(CNPq_URL)).text())

  // Re-init session for POST requests (fresh ViewState)
  const postSession = await initSession()

  const pesquisadores = parseTable($, "j_idt271")
  const estudantes = parseTable($, "j_idt288")
  const egressosEstudantes = parseEgressosTable($, "j_idt354")

  console.log(`\nParsed from CNPq:`)
  console.log(`  Pesquisadores: ${pesquisadores.length}`)
  console.log(`  Estudantes: ${estudantes.length}`)
  console.log(`  Egressos estudantes: ${egressosEstudantes.length}`)

  // Resolve Lattes IDs for active members via JSF POSTs
  console.log(`\nResolving Lattes IDs...`)

  const teachers: TeacherProps[] = []
  for (let i = 0; i < pesquisadores.length; i++) {
    const p = pesquisadores[i]
    const numericId = await fetchLattesId(postSession, "j_idt271", i)
    let shortId: string | null = null
    if (numericId) {
      shortId = await fetchLattesShortId(numericId)
    }
    console.log(`  [P] ${p.name} → ${numericId || "?"} / ${shortId || "?"}`)
    teachers.push({
      name: fixCasing(p.name),
      institution: "Unifap",
      campus: "Campus Unifap",
      ...(numericId ? { curriculumLink: buildCurriculumLink(numericId) } : {}),
      ...(shortId ? { imageUrl: buildImageUrl(shortId) } : {}),
    })
  }

  // Build degree lookup from in-progress orientations
  const orientationDegree = new Map<string, string>()
  for (const tcc of tccs) {
    if (tcc.status === "Em andamento" && tcc.degree) {
      const degree = tcc.degree === "Mestrado" || tcc.degree === "Doutorado" || tcc.degree === "Especialização"
        ? "Master" : undefined
      for (const student of tcc.students) {
        orientationDegree.set(student.toLowerCase(), degree ?? "")
      }
    }
  }

  const students: StudentProps[] = []
  for (let i = 0; i < estudantes.length; i++) {
    const s = estudantes[i]
    const numericId = await fetchLattesId(postSession, "j_idt288", i)
    let shortId: string | null = null
    if (numericId) {
      shortId = await fetchLattesShortId(numericId)
    }
    const name = fixCasing(s.name)
    const degree = orientationDegree.get(name.toLowerCase()) ?? mapDegree(s.titulacao)
    console.log(`  [S] ${s.name} → ${numericId || "?"} / ${shortId || "?"} (${degree || "Graduação"})`)
    students.push({
      name,
      institution: "Unifap",
      campus: "Campus Unifap",
      type: "Student",
      ...(degree ? { degree } : {}),
      ...(numericId ? { curriculumLink: buildCurriculumLink(numericId) } : {}),
      ...(shortId ? { imageUrl: buildImageUrl(shortId) } : {}),
    })
  }

  // Build lookup from resolved active members (students + teachers)
  const resolvedMembers = new Map<string, { curriculumLink?: string; imageUrl?: string }>()
  for (const s of students) {
    resolvedMembers.set(s.name.toLowerCase(), { curriculumLink: s.curriculumLink, imageUrl: s.imageUrl })
  }
  for (const t of teachers) {
    resolvedMembers.set(t.name.toLowerCase(), { curriculumLink: t.curriculumLink, imageUrl: t.imageUrl })
  }

  // Load cache from members copy (original file with manually populated egresso data)
  if (fs.existsSync(CACHE_PATH)) {
    const cacheContent = fs.readFileSync(CACHE_PATH, "utf-8")
    const blocks = cacheContent.split(/\n  \{/)
    for (const block of blocks) {
      const nameMatch = block.match(/name:\s*"([^"]+)"/)
      if (!nameMatch) continue
      const clMatch = block.match(/curriculumLink:\s*"([^"]*)"/)
      const imgMatch = block.match(/imageUrl:\s*\n?\s*"([^"]*)"/)
      if (clMatch || imgMatch) {
        const key = nameMatch[1].toLowerCase()
        if (!resolvedMembers.has(key)) {
          resolvedMembers.set(key, { curriculumLink: clMatch?.[1], imageUrl: imgMatch?.[1] })
        }
      }
    }
    console.log(`\nCache loaded: ${resolvedMembers.size} total members with Lattes data`)
  }

  // Only include egressos who completed an orientation (from tccs.ts)
  const completedStudents = new Set<string>()
  for (const tcc of tccs) {
    if (tcc.status === "Finalizado") {
      for (const student of tcc.students) {
        completedStudents.add(student.toLowerCase())
      }
    }
  }

  function hasCompletedOrientation(name: string): boolean {
    const lower = name.toLowerCase()
    // Exact match
    if (completedStudents.has(lower)) return true
    // Approximate: first name + last name must match, and at least one middle part must overlap
    const parts = lower.split(" ")
    if (parts.length < 2) return false
    const first = parts[0]
    const last = parts[parts.length - 1]
    const middleParts = new Set(parts.slice(1, -1))
    for (const completed of completedStudents) {
      const cParts = completed.split(" ")
      if (cParts.length < 2) continue
      if (cParts[0] !== first || cParts[cParts.length - 1] !== last) continue
      // If both have no middle parts, first+last is enough
      if (middleParts.size === 0 || cParts.length <= 2) {
        console.log(`    ⚠ approximate match: "${name}" ≈ "${completed}"`)
        return true
      }
      // Require at least one shared middle part
      const hasSharedMiddle = cParts.slice(1, -1).some((p) => middleParts.has(p))
      if (hasSharedMiddle) {
        console.log(`    ⚠ approximate match: "${name}" ≈ "${completed}"`)
        return true
      }
    }
    return false
  }

  // Egressos: filter to completed orientations, then cross-reference with cache
  console.log(`\nResolving egressos...`)
  const missingEgressos: string[] = []
  const exStudents: StudentProps[] = []
  for (const e of egressosEstudantes) {
    const name = fixCasing(e.name)
    if (!hasCompletedOrientation(name)) {
      console.log(`  [E] ${e.name} → skipped (no completed orientation)`)
      continue
    }

    const resolved = resolvedMembers.get(name.toLowerCase())
    if (resolved?.curriculumLink || resolved?.imageUrl) {
      console.log(`  [E] ${e.name} → found`)
      exStudents.push({
        name, institution: "Unifap", campus: "Campus Unifap", type: "ExStudent",
        ...(resolved.curriculumLink ? { curriculumLink: resolved.curriculumLink } : {}),
        ...(resolved.imageUrl ? { imageUrl: resolved.imageUrl } : {}),
      })
    } else {
      console.log(`  [E] ${e.name} → no Lattes data`)
      missingEgressos.push(e.name)
      exStudents.push({ name, institution: "Unifap", campus: "Campus Unifap", type: "ExStudent" })
    }
  }

  // Remove students who are now egressos with completed orientation
  const egressoNames = new Set(exStudents.map((s) => s.name.toLowerCase()))
  const activeStudents = students.filter((s) => !egressoNames.has(s.name.toLowerCase()))

  const allStudents = [...activeStudents, ...exStudents]

  const content = generateMembersFile(allStudents, teachers)
  fs.writeFileSync(OUTPUT_PATH, content, "utf-8")
  console.log(`\nGenerated ${OUTPUT_PATH}`)
  console.log(`  Teachers: ${teachers.length}`)
  console.log(`  Students: ${students.length}`)
  console.log(`  Ex-students: ${exStudents.length} (${exStudents.length - missingEgressos.length} with Lattes)`)

  if (missingEgressos.length > 0) {
    console.log(`\n⚠ Egressos without Lattes data (no active member match):`)
    for (const name of missingEgressos) {
      console.log(`  - ${name}`)
    }
  }
}

main().catch((err) => {
  console.error("Error:", err)
  process.exit(1)
})
