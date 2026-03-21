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

async function fetchPage(): Promise<string> {
  console.log(`Fetching ${CNPq_URL}...`)
  const res = await fetch(CNPq_URL)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  const html = await res.text()
  console.log(`Fetched ${html.length} bytes`)
  return html
}

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

function buildTeacher(name: string): TeacherProps {
  return {
    name: fixCasing(name),
    institution: "Unifap",
    campus: "Campus Unifap",
  }
}

function buildStudent(name: string, type: "Student" | "ExStudent", degree?: string): StudentProps {
  return {
    name: fixCasing(name),
    institution: "Unifap",
    campus: "Campus Unifap",
    type,
    ...(degree ? { degree } : {}),
  }
}

async function main() {
  const html = await fetchPage()
  const $ = cheerio.load(html)

  const pesquisadores = parseTable($, "j_idt271")
  const estudantes = parseTable($, "j_idt288")
  const egressosEstudantes = parseEgressosTable($, "j_idt354")

  console.log(`\nParsed from CNPq:`)
  console.log(`  Pesquisadores: ${pesquisadores.length}`)
  console.log(`  Estudantes: ${estudantes.length}`)
  console.log(`  Egressos estudantes: ${egressosEstudantes.length}`)

  const teachers: TeacherProps[] = pesquisadores.map((p) => buildTeacher(p.name))

  const students: StudentProps[] = estudantes.map((s) =>
    buildStudent(s.name, "Student", mapDegree(s.titulacao))
  )

  const exStudents: StudentProps[] = egressosEstudantes.map((e) =>
    buildStudent(e.name, "ExStudent")
  )

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
