import type {
  PublicationProps,
  PatentProps,
  Project,
  TCCProps,
  StudentProps,
  TeacherProps,
} from "../src/app/context/types"

function escapeString(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")
}

function formatStringArray(arr: string[], indent: string): string {
  if (arr.length <= 2) {
    return `[${arr.map((s) => `"${escapeString(s)}"`).join(", ")}]`
  }
  const items = arr.map((s) => `${indent}  "${escapeString(s)}",`).join("\n")
  return `[\n${items}\n${indent}]`
}

function formatPatent(p: PatentProps): string {
  const lines: string[] = []
  lines.push("  {")
  lines.push(`    authors: ${formatStringArray(p.authors, "    ")},`)
  lines.push(`    title: "${escapeString(p.title)}",`)
  lines.push(`    year: ${typeof p.year === "number" ? p.year : `"${p.year}"`},`)
  if (p.patentNumber) lines.push(`    patentNumber: "${escapeString(p.patentNumber)}",`)
  if (p.registrationDate) lines.push(`    registrationDate: "${escapeString(p.registrationDate)}",`)
  if (p.registrationInstitution)
    lines.push(`    registrationInstitution: "${escapeString(p.registrationInstitution)}",`)
  if (p.patentType) lines.push(`    patentType: "${escapeString(p.patentType)}",`)
  lines.push("  },")
  return lines.join("\n")
}

function formatPublication(p: PublicationProps): string {
  const lines: string[] = []
  lines.push("  {")
  lines.push(`    type: "${p.type}",`)
  lines.push(`    title:\n      "${escapeString(p.title)}",`)
  lines.push(`    authors: ${formatStringArray(p.authors, "    ")},`)
  lines.push(`    year: "${typeof p.year === "number" ? p.year : p.year}",`)
  if (p.publisher) lines.push(`    publisher: "${escapeString(p.publisher)}",`)
  if (p.edition) lines.push(`    edition: "${escapeString(p.edition)}",`)
  if (p.pages) lines.push(`    pages: "${escapeString(p.pages)}",`)
  if (p.event) lines.push(`    event: "${escapeString(p.event)}",`)
  if (p.location) lines.push(`    location: "${escapeString(p.location)}",`)
  if (p.proceedings) lines.push(`    proceedings: "${escapeString(p.proceedings)}",`)
  if (p.link) lines.push(`    link: "${escapeString(p.link)}",`)
  if (p.webCitations !== undefined) lines.push(`    webCitations: ${p.webCitations},`)
  if (p.scopusCitations !== undefined) lines.push(`    scopusCitations: ${p.scopusCitations},`)
  if (p.scieloCitations !== undefined) lines.push(`    scieloCitations: ${p.scieloCitations},`)
  if (p.jcrImpact !== undefined) lines.push(`    jcrImpact: ${p.jcrImpact},`)
  if (p.importance !== undefined) lines.push(`    importance: ${p.importance},`)
  lines.push("  },")
  return lines.join("\n")
}

export function generatePublicationsFile(
  publications: PublicationProps[],
  patents: PatentProps[]
): string {
  const lines: string[] = []

  lines.push('import type { PublicationProps, PatentProps } from "../types"')
  lines.push("")

  // Patents
  lines.push("export const patents: PatentProps[] = [")
  for (const p of patents) {
    lines.push(formatPatent(p))
  }
  lines.push("]")
  lines.push("")

  // Group publications by type
  const typeOrder: PublicationProps["type"][] = [
    "book",
    "chapter",
    "article",
    "congress",
    "conferenceAbstract",
  ]
  const typeLabels: Record<string, string> = {
    book: "Livros",
    chapter: "Capítulos",
    article: "Artigos",
    congress: "Completos em evento",
    conferenceAbstract: "Resumos em evento",
  }

  lines.push("export const publications: PublicationProps[] = [")

  for (const type of typeOrder) {
    const pubs = publications.filter((p) => p.type === type)
    if (pubs.length === 0) continue

    // Sort by year descending
    pubs.sort((a, b) => {
      const yearA = typeof a.year === "number" ? a.year : parseInt(a.year, 10)
      const yearB = typeof b.year === "number" ? b.year : parseInt(b.year, 10)
      return yearB - yearA
    })

    lines.push(`  // ${typeLabels[type] || type}`)
    for (const p of pubs) {
      lines.push(formatPublication(p))
    }
  }

  lines.push("]")
  lines.push("")

  return lines.join("\n")
}

function formatProject(p: Project): string {
  const lines: string[] = []
  lines.push("  {")
  lines.push(`    title:\n      "${escapeString(p.title)}",`)
  lines.push(`    description:\n      "${escapeString(p.description)}",`)
  lines.push(`    professor: "${escapeString(p.professor)}",`)
  lines.push(`    status: "${escapeString(p.status)}",`)
  lines.push(`    type: "${escapeString(p.type)}",`)
  lines.push(`    link: "${escapeString(p.link)}",`)
  if (p.documentation && p.documentation.length > 0) {
    lines.push("    documentation: [")
    for (const doc of p.documentation) {
      lines.push(`      { name: "${escapeString(doc.name)}", type: "${doc.type}", link: "${escapeString(doc.link)}" },`)
    }
    lines.push("    ],")
  } else {
    lines.push("    documentation: [],")
  }
  if (p.period) lines.push(`    period: "${escapeString(p.period)}",`)
  if (p.team && p.team.length > 0) lines.push(`    team: ${formatStringArray(p.team, "    ")},`)
  if (p.funding) lines.push(`    funding: "${escapeString(p.funding)}",`)
  if (p.title_en) lines.push(`    title_en: "${escapeString(p.title_en)}",`)
  if (p.description_en) lines.push(`    description_en: "${escapeString(p.description_en)}",`)
  lines.push("  },")
  return lines.join("\n")
}

export function generateProjectsFile(projects: Project[]): string {
  const lines: string[] = []
  lines.push('import type { Project } from "../types"')
  lines.push("")
  lines.push("export const projectsData: Project[] = [")
  for (const p of projects) {
    lines.push(formatProject(p))
  }
  lines.push("]")
  lines.push("")
  return lines.join("\n")
}

function formatTCC(t: TCCProps): string {
  const lines: string[] = []
  lines.push("  {")
  lines.push(`    title:\n      "${escapeString(t.title)}",`)
  lines.push(`    description: "${escapeString(t.description || "")}",`)
  lines.push(`    link: "${escapeString(t.link)}",`)
  lines.push(`    status: "${escapeString(t.status)}",`)
  lines.push(`    students: ${formatStringArray(t.students, "    ")},`)
  lines.push(`    advisor: "${escapeString(t.advisor)}",`)
  lines.push(`    year: "${escapeString(t.year)}",`)
  lines.push(`    keywords: "${escapeString(t.keywords || "")}",`)
  if (t.degree) lines.push(`    degree: "${escapeString(t.degree)}",`)
  if (t.documentation && t.documentation.length > 0) {
    lines.push("    documentation: [")
    for (const doc of t.documentation) {
      lines.push(`      { name: "${escapeString(doc.name)}", type: "${doc.type}", link: "${escapeString(doc.link)}" },`)
    }
    lines.push("    ],")
  }
  if (t.title_en) lines.push(`    title_en: "${escapeString(t.title_en)}",`)
  if (t.description_en) lines.push(`    description_en: "${escapeString(t.description_en)}",`)
  lines.push("  },")
  return lines.join("\n")
}

export function generateTccsFile(tccs: TCCProps[]): string {
  const lines: string[] = []
  lines.push('import type { TCCProps } from "../types"')
  lines.push("")
  lines.push("export const tccs: TCCProps[] = [")

  // Sort by year descending
  const sorted = [...tccs].sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10))
  for (const t of sorted) {
    lines.push(formatTCC(t))
  }

  lines.push("]")
  lines.push("")
  return lines.join("\n")
}

function formatStudent(s: StudentProps): string {
  const lines: string[] = []
  lines.push("  {")
  lines.push(`    name: "${escapeString(s.name)}",`)
  lines.push(`    institution: "${escapeString(s.institution)}",`)
  lines.push(`    campus: "${escapeString(s.campus)}",`)
  if (s.email) lines.push(`    email: "${escapeString(s.email)}",`)
  if (s.curriculumLink) lines.push(`    curriculumLink: "${escapeString(s.curriculumLink)}",`)
  if (s.imageUrl) lines.push(`    imageUrl:\n      "${escapeString(s.imageUrl)}",`)
  lines.push(`    type: "${escapeString(s.type)}",`)
  if (s.degree) lines.push(`    degree: "${escapeString(s.degree)}",`)
  if (s.imagePosition) lines.push(`    imagePosition: "${s.imagePosition}",`)
  lines.push("  },")
  return lines.join("\n")
}

function formatTeacher(t: TeacherProps): string {
  const lines: string[] = []
  lines.push("  {")
  lines.push(`    name: "${escapeString(t.name)}",`)
  lines.push(`    institution: "${escapeString(t.institution)}",`)
  lines.push(`    campus: "${escapeString(t.campus)}",`)
  if (t.email) lines.push(`    email: "${escapeString(t.email)}",`)
  if (t.curriculumLink) lines.push(`    curriculumLink: "${escapeString(t.curriculumLink)}",`)
  if (t.imageUrl) lines.push(`    imageUrl:\n      "${escapeString(t.imageUrl)}",`)
  if (t.imagePosition) lines.push(`    imagePosition: "${t.imagePosition}",`)
  lines.push("  },")
  return lines.join("\n")
}

export function generateMembersFile(students: StudentProps[], teachers: TeacherProps[]): string {
  const lines: string[] = []
  lines.push('import type { StudentProps, TeacherProps } from "../types"')
  lines.push("")

  lines.push("export const students: StudentProps[] = [")
  const active = students.filter((s) => s.type === "Student").sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
  const ex = students.filter((s) => s.type === "ExStudent").sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
  for (const s of active) {
    lines.push(formatStudent(s))
  }
  if (ex.length > 0) {
    lines.push("  // Ex-alunos")
    for (const s of ex) {
      lines.push(formatStudent(s))
    }
  }
  lines.push("]")
  lines.push("")

  lines.push("export const teachers: TeacherProps[] = [")
  const coordinator = teachers.filter((t) => t.name === "Julio Cezar Costa Furtado")
  const others = teachers.filter((t) => t.name !== "Julio Cezar Costa Furtado").sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
  for (const t of [...coordinator, ...others]) {
    lines.push(formatTeacher(t))
  }
  lines.push("]")
  lines.push("")

  return lines.join("\n")
}
