import * as cheerio from "cheerio"
import * as fs from "fs"
import * as path from "path"
import { generateMembersFile } from "./ts-generator"
import { fixCasing } from "./fix-casing"
import type { StudentProps, TeacherProps } from "../src/app/context/types"
import { tccs } from "../src/app/context/data/tccs"

const CNPq_URL = "http://dgp.cnpq.br/dgp/espelhogrupo/225177"
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 2000

async function fetchWithRetry(url: string, options?: RequestInit): Promise<Response> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fetch(url, options)
    } catch (err: any) {
      if (attempt === MAX_RETRIES) throw err
      console.log(`    ⚠ ${err.code || err.message} on attempt ${attempt}/${MAX_RETRIES}, retrying in ${RETRY_DELAY_MS * attempt}ms...`)
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt))
    }
  }
  throw new Error("unreachable")
}
const OUTPUT_PATH = path.join(__dirname, "..", "src", "app", "context", "data", "members.ts")
const CACHE_PATH = path.join(__dirname, "..", "src", "app", "context", "data", "members copy.ts")
const PHOTOS_DIR = path.join(__dirname, "..", "public", "members")

function buildLocalImagePath(shortId: string): string {
  return `/members/${shortId}.jpg`
}

async function downloadPhoto(shortId: string): Promise<boolean> {
  const url = `https://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=${shortId}`
  try {
    const res = await fetchWithRetry(url)
    if (!res.ok) return false
    const buffer = Buffer.from(await res.arrayBuffer())
    // Skip if empty/tiny response (no photo available)
    if (buffer.length < 1000) return false
    if (!fs.existsSync(PHOTOS_DIR)) fs.mkdirSync(PHOTOS_DIR, { recursive: true })
    fs.writeFileSync(path.join(PHOTOS_DIR, `${shortId}.jpg`), buffer)
    return true
  } catch {
    return false
  }
}

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
  return `https://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=${lattesShortId}`
}

// --- JSF session management ---

interface JsfSession {
  cookies: string
  viewState: string
}

async function initSession(): Promise<JsfSession> {
  console.log(`Fetching ${CNPq_URL}...`)
  const res = await fetchWithRetry(CNPq_URL)
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

  const res = await fetchWithRetry(CNPq_URL, {
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
  let res: Response
  try {
    res = await fetchWithRetry(`http://lattes.cnpq.br/${numericId}`)
  } catch {
    console.log(`    ⚠ failed to fetch Lattes short ID for ${numericId} after ${MAX_RETRIES} attempts`)
    return null
  }
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

// Find all tables by header text (order matches DOM order)
function findTablesByHeader($: cheerio.CheerioAPI, headerText: string): cheerio.Cheerio<any>[] {
  const results: cheerio.Cheerio<any>[] = []
  $("div.ui-datatable").each((_, el) => {
    const th = $(el).find("th span").first().text().trim()
    if (th === headerText) results.push($(el))
  })
  return results
}

function extractTableId(table: cheerio.Cheerio<any>): string {
  return (table.attr("id") || "").replace("idFormVisualizarGrupoPesquisa:", "")
}

function parseMemberTable(table: cheerio.Cheerio<any>, $: cheerio.CheerioAPI): ParsedMember[] {
  const members: ParsedMember[] = []
  table.find("tbody tr").each((_, el) => {
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

function parseEgressosFromTable(table: cheerio.Cheerio<any>, $: cheerio.CheerioAPI): ParsedEgresso[] {
  const egressos: ParsedEgresso[] = []
  table.find("tbody tr").each((_, el) => {
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

async function loadLocalMembers(): Promise<{ students: StudentProps[]; teachers: TeacherProps[] }> {
  try {
    const mod = await import("../src/app/context/data/members")
    return { students: mod.students as StudentProps[], teachers: mod.teachers as TeacherProps[] }
  } catch {
    console.log("⚠ Dados locais de membros não encontrados, criando do zero")
    return { students: [], teachers: [] }
  }
}

async function main() {
  // Load local data for merge
  console.log("📂 Carregando dados locais de membros...")
  const localData = await loadLocalMembers()
  const localTeacherMap = new Map<string, TeacherProps>()
  for (const t of localData.teachers) localTeacherMap.set(t.name.toLowerCase(), t)
  const localStudentMap = new Map<string, StudentProps>()
  for (const s of localData.students) localStudentMap.set(s.name.toLowerCase(), s)

  const session = await initSession()
  const $ = cheerio.load(await (await fetchWithRetry(CNPq_URL)).text())

  // Re-init session for POST requests (fresh ViewState)
  const postSession = await initSession()

  // Find tables by header text - first match is active, second is egressos
  const pesqTables = findTablesByHeader($, "Pesquisadores")
  const studTables = findTablesByHeader($, "Estudantes")

  const pesqTable = pesqTables[0]  // Active researchers
  const studTable = studTables[0]  // Active students
  const egressosStudTable = studTables[1]  // Egresso students

  const pesqTableId = pesqTable ? extractTableId(pesqTable) : ""
  const studTableId = studTable ? extractTableId(studTable) : ""
  const egressosTableId = egressosStudTable ? extractTableId(egressosStudTable) : ""

  const pesquisadores = pesqTable ? parseMemberTable(pesqTable, $) : []
  const estudantes = studTable ? parseMemberTable(studTable, $) : []
  const egressosEstudantes = egressosStudTable ? parseEgressosFromTable(egressosStudTable, $) : []

  console.log(`\nParsed from CNPq:`)
  console.log(`  Pesquisadores: ${pesquisadores.length} (table: ${pesqTableId})`)
  console.log(`  Estudantes: ${estudantes.length} (table: ${studTableId})`)
  console.log(`  Egressos estudantes: ${egressosEstudantes.length} (table: ${egressosTableId})`)

  // Resolve Lattes IDs for active members via JSF POSTs
  console.log(`\nResolving Lattes IDs...`)

  const teachers: TeacherProps[] = []
  for (let i = 0; i < pesquisadores.length; i++) {
    const p = pesquisadores[i]
    const name = fixCasing(p.name)
    const localTeacher = localTeacherMap.get(name.toLowerCase())

    // Skip fetch if local already has both curriculumLink and imageUrl
    if (localTeacher?.curriculumLink && localTeacher?.imageUrl) {
      console.log(`  [P] ${p.name} → local (skip fetch)`)
      teachers.push({
        ...localTeacher,
        name,
        institution: "Unifap",
        campus: "Campus Unifap",
      })
      continue
    }

    const numericId = await fetchLattesId(postSession, pesqTableId, i)
    let shortId: string | null = null
    if (numericId) {
      shortId = await fetchLattesShortId(numericId)
    }
    console.log(`  [P] ${p.name} → ${numericId || "?"} / ${shortId || "?"}`)
    teachers.push({
      name,
      institution: "Unifap",
      campus: "Campus Unifap",
      // Preserve manual local fields
      ...(localTeacher?.email ? { email: localTeacher.email } : {}),
      ...(localTeacher?.imagePosition ? { imagePosition: localTeacher.imagePosition } : {}),
      ...(numericId ? { curriculumLink: buildCurriculumLink(numericId) } : localTeacher?.curriculumLink ? { curriculumLink: localTeacher.curriculumLink } : {}),
      ...(shortId ? { imageUrl: buildImageUrl(shortId) } : localTeacher?.imageUrl ? { imageUrl: localTeacher.imageUrl } : {}),
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
    const name = fixCasing(s.name)
    const localStudent = localStudentMap.get(name.toLowerCase())

    // Skip fetch if local already has both curriculumLink and imageUrl
    if (localStudent?.curriculumLink && localStudent?.imageUrl) {
      const degree = orientationDegree.get(name.toLowerCase()) ?? mapDegree(s.titulacao) ?? localStudent.degree
      console.log(`  [S] ${s.name} → local (skip fetch) (${degree || "Graduação"})`)
      students.push({
        ...localStudent,
        name,
        institution: "Unifap",
        campus: "Campus Unifap",
        type: "Student",
        ...(degree ? { degree } : {}),
      })
      continue
    }

    const numericId = await fetchLattesId(postSession, studTableId, i)
    let shortId: string | null = null
    if (numericId) {
      shortId = await fetchLattesShortId(numericId)
    }
    const degree = orientationDegree.get(name.toLowerCase()) ?? mapDegree(s.titulacao) ?? localStudent?.degree
    console.log(`  [S] ${s.name} → ${numericId || "?"} / ${shortId || "?"} (${degree || "Graduação"})`)
    students.push({
      name,
      institution: "Unifap",
      campus: "Campus Unifap",
      type: "Student",
      ...(degree ? { degree } : {}),
      // Preserve manual local fields
      ...(localStudent?.email ? { email: localStudent.email } : {}),
      ...(localStudent?.imagePosition ? { imagePosition: localStudent.imagePosition } : {}),
      ...(numericId ? { curriculumLink: buildCurriculumLink(numericId) } : localStudent?.curriculumLink ? { curriculumLink: localStudent.curriculumLink } : {}),
      ...(shortId ? { imageUrl: buildImageUrl(shortId) } : localStudent?.imageUrl ? { imageUrl: localStudent.imageUrl } : {}),
    })
  }

  // Build lookup from resolved active members (students + teachers) + local data
  const resolvedMembers = new Map<string, { curriculumLink?: string; imageUrl?: string }>()
  for (const s of students) {
    resolvedMembers.set(s.name.toLowerCase(), { curriculumLink: s.curriculumLink, imageUrl: s.imageUrl })
  }
  for (const t of teachers) {
    resolvedMembers.set(t.name.toLowerCase(), { curriculumLink: t.curriculumLink, imageUrl: t.imageUrl })
  }
  // Also include local ex-students data (replaces the old cache file mechanism)
  for (const s of localData.students.filter(s => s.type === "ExStudent")) {
    const key = s.name.toLowerCase()
    if (!resolvedMembers.has(key)) {
      resolvedMembers.set(key, { curriculumLink: s.curriculumLink, imageUrl: s.imageUrl })
    }
  }

  // Load cache from members copy (fallback for data not yet in members.ts)
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

  // Egressos: filter to completed orientations, then cross-reference with cache/local
  console.log(`\nResolving egressos...`)
  const missingEgressos: string[] = []
  const exStudents: StudentProps[] = []
  for (const e of egressosEstudantes) {
    const name = fixCasing(e.name)
    if (!hasCompletedOrientation(name)) {
      console.log(`  [E] ${e.name} → skipped (no completed orientation)`)
      continue
    }

    const localEx = localStudentMap.get(name.toLowerCase())
    const resolved = resolvedMembers.get(name.toLowerCase())
    if (resolved?.curriculumLink || resolved?.imageUrl) {
      console.log(`  [E] ${e.name} → found`)
      exStudents.push({
        name, institution: "Unifap", campus: "Campus Unifap", type: "ExStudent",
        ...(resolved.curriculumLink ? { curriculumLink: resolved.curriculumLink } : {}),
        ...(resolved.imageUrl ? { imageUrl: resolved.imageUrl } : {}),
        // Preserve manual local fields from ex-student
        ...(localEx?.email ? { email: localEx.email } : {}),
        ...(localEx?.imagePosition ? { imagePosition: localEx.imagePosition } : {}),
      })
    } else {
      console.log(`  [E] ${e.name} → no Lattes data`)
      missingEgressos.push(e.name)
      exStudents.push({
        name, institution: "Unifap", campus: "Campus Unifap", type: "ExStudent",
        // Preserve manual local fields even without Lattes data
        ...(localEx?.email ? { email: localEx.email } : {}),
        ...(localEx?.imagePosition ? { imagePosition: localEx.imagePosition } : {}),
      })
    }
  }

  // Remove students who are now egressos with completed orientation
  const egressoNames = new Set(exStudents.map((s) => s.name.toLowerCase()))
  const activeStudents = students.filter((s) => !egressoNames.has(s.name.toLowerCase()))

  const allStudents = [...activeStudents, ...exStudents]

  // Safety check: don't overwrite with empty data if CNPq returned nothing
  if (teachers.length === 0 && students.length === 0 && localData.teachers.length > 0) {
    console.error("\n❌ CNPq retornou dados vazios! Abortando para não apagar a base local.")
    console.error("   O site do CNPq pode estar fora do ar ou os IDs dos elementos HTML mudaram.")
    process.exit(1)
  }

  // Download photos for all members
  console.log(`\n📷 Baixando fotos dos membros...`)
  const allMembers = [...allStudents, ...teachers] as (StudentProps | TeacherProps)[]
  let photosDownloaded = 0
  let photosSkipped = 0
  let photosFailed = 0

  for (const member of allMembers) {
    // Extract shortId from remote URL or local path
    const remoteUrlMatch = member.imageUrl?.match(/[?&]id=([A-Z0-9]+)/i)
    const localPathMatch = member.imageUrl?.match(/\/members\/([A-Z0-9]+)\.jpg/i)
    const shortId = remoteUrlMatch?.[1] || localPathMatch?.[1]

    if (!shortId) {
      photosSkipped++
      continue
    }

    const ok = await downloadPhoto(shortId)
    if (ok) {
      member.imageUrl = buildLocalImagePath(shortId)
      photosDownloaded++
    } else {
      // Keep whatever URL was there (remote or local)
      photosFailed++
      console.log(`    ⚠ Falha ao baixar foto: ${member.name}`)
    }
  }
  console.log(`  Baixadas: ${photosDownloaded}, Falhas: ${photosFailed}, Sem foto: ${photosSkipped}`)

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
