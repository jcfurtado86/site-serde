import type { PublicationProps, PatentProps } from "../src/app/context/types"

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
    congress: "Congressos",
    conferenceAbstract: "Resumos em congressos",
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
