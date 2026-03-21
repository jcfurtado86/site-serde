import * as cheerio from "cheerio"
import * as fs from "fs"
import * as path from "path"
import { generateMembersFile } from "./ts-generator"
import { fixCasing } from "./fix-casing"
import type { StudentProps, TeacherProps } from "../src/app/context/types"

const CNPq_URL = "http://dgp.cnpq.br/dgp/espelhogrupo/225177"
const OUTPUT_PATH = path.join(__dirname, "..", "src", "app", "context", "data", "members.ts")

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

  const students: StudentProps[] = []
  for (let i = 0; i < estudantes.length; i++) {
    const s = estudantes[i]
    const numericId = await fetchLattesId(postSession, "j_idt288", i)
    let shortId: string | null = null
    if (numericId) {
      shortId = await fetchLattesShortId(numericId)
    }
    console.log(`  [S] ${s.name} → ${numericId || "?"} / ${shortId || "?"}`)
    students.push({
      name: fixCasing(s.name),
      institution: "Unifap",
      campus: "Campus Unifap",
      type: "Student",
      ...(mapDegree(s.titulacao) ? { degree: mapDegree(s.titulacao) } : {}),
      ...(numericId ? { curriculumLink: buildCurriculumLink(numericId) } : {}),
      ...(shortId ? { imageUrl: buildImageUrl(shortId) } : {}),
    })
  }

  // Egressos don't have Lattes buttons on DGP
  const exStudents: StudentProps[] = egressosEstudantes.map((e) => ({
    name: fixCasing(e.name),
    institution: "Unifap",
    campus: "Campus Unifap",
    type: "ExStudent",
  }))

  const allStudents = [...students, ...exStudents]

  const content = generateMembersFile(allStudents, teachers)
  fs.writeFileSync(OUTPUT_PATH, content, "utf-8")
  console.log(`\nGenerated ${OUTPUT_PATH}`)
  console.log(`  Teachers: ${teachers.length}`)
  console.log(`  Students: ${students.length}`)
  console.log(`  Ex-students: ${exStudents.length}`)
}

main().catch((err) => {
  console.error("Error:", err)
  process.exit(1)
})
