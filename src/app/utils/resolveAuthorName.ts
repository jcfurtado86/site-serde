const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

const SMALL_WORDS = new Set(["de", "da", "do", "dos", "das", "e"])

function isInitial(s: string): boolean {
  const clean = s.replace(/\./g, "")
  return clean.length <= 2
}

function initialMatches(initial: string, full: string): boolean {
  const clean = initial.replace(/\./g, "")
  if (!clean) return false
  return full.startsWith(clean)
}

/**
 * Given an author name in "Sobrenome, Nome" publication format,
 * tries to find a matching member and returns their full name.
 * Falls back to the original author string if no match is found.
 */
export function resolveAuthorName(
  author: string,
  members: { name: string }[]
): string {
  const commaIdx = author.indexOf(",")
  if (commaIdx === -1) return author

  // Split into surname part and given-names part
  const surnamePart = norm(author.slice(0, commaIdx).trim())
  const givenPart = norm(author.slice(commaIdx + 1).trim())

  if (!surnamePart || !givenPart) return author

  const surnameParts = surnamePart.split(/\s+/)
  const givenParts = givenPart.split(/\s+/).filter(Boolean)
  const givenSignificant = givenParts.filter((p) => p.includes(".") || !SMALL_WORDS.has(p))

  if (givenSignificant.length === 0) return author

  // Build the full normalized name for exact match: "given surname"
  const flippedNorm = `${givenPart} ${surnamePart}`
  const exact = members.find((m) => norm(m.name) === flippedNorm)
  if (exact) return exact.name

  const match = members.find((m) => {
    const mNorm = norm(m.name)
    const mParts = mNorm.split(/\s+/)

    // The surname from the publication must appear in the member's name.
    // It could be the last name, or a compound surname (e.g. "Monteiro Neto").
    // Find where the surname starts in the member name.
    let surnameStartIdx = -1
    if (surnameParts.length === 1) {
      // Single surname: can match any non-small-word part of member name
      surnameStartIdx = mParts.findIndex(
        (p, i) => p === surnameParts[0] && !SMALL_WORDS.has(p)
      )
    } else {
      // Compound surname (e.g. "monteiro neto"): find consecutive match
      for (let i = 0; i <= mParts.length - surnameParts.length; i++) {
        const slice = mParts.slice(i, i + surnameParts.length)
        if (slice.every((p, j) => p === surnameParts[j])) {
          surnameStartIdx = i
          break
        }
      }
    }

    if (surnameStartIdx === -1) return false

    // The member's given-name parts are everything except the surname and small words around it
    const mGivenParts = [
      ...mParts.slice(0, surnameStartIdx),
      ...mParts.slice(surnameStartIdx + surnameParts.length),
    ].filter((p) => !SMALL_WORDS.has(p))

    if (mGivenParts.length === 0) return false

    // First given name/initial must match
    if (
      !initialMatches(givenSignificant[0], mGivenParts[0]) &&
      !initialMatches(mGivenParts[0], givenSignificant[0])
    ) {
      return false
    }

    // If only one given part, that's enough with the surname
    if (givenSignificant.length === 1) return true

    // Each additional author part should match some member part
    const remainingAuthor = givenSignificant.slice(1)
    const remainingMember = mGivenParts.slice(1)

    return remainingAuthor.every((ap) =>
      remainingMember.some(
        (mp) => initialMatches(ap, mp) || initialMatches(mp, ap) || ap === mp
      )
    )
  })

  return match?.name || author
}

export function findMember<T extends { name: string }>(
  author: string,
  members: T[]
): T | undefined {
  const resolved = resolveAuthorName(author, members)
  if (resolved === author) return undefined
  return members.find((m) => m.name === resolved)
}
