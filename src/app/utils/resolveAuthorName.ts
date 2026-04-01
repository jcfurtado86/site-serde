export const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

const SMALL_WORDS = new Set(["de", "da", "do", "dos", "das", "e"])

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
  const match = findMember(author, members)
  return match?.name || author
}

/**
 * Fuzzy match a name (possibly truncated or without accents) against a list of members.
 * Handles Lattes-style names (uppercase, no accents, sometimes truncated).
 */
export function fuzzyMatchMember<T extends { name: string }>(name: string, members: T[]): T | undefined {
  const lower = norm(name)
  const exact = members.find((m) => norm(m.name) === lower)
  if (exact) return exact

  const parts = lower.split(" ")
  if (parts.length < 2) return undefined
  const first = parts[0]
  const last = parts[parts.length - 1]
  const allParts = new Set(parts)

  return members.find((m) => {
    const mParts = norm(m.name).split(" ")
    if (mParts.length < 2) return false
    if (mParts[0] !== first) return false
    if (mParts[mParts.length - 1] === last) {
      if (allParts.size <= 2 || mParts.length <= 2) return true
      return mParts.slice(1, -1).some((p) => allParts.has(p))
    }
    if (mParts.length > parts.length) {
      return parts.every((p) => mParts.includes(p))
    }
    if (norm(m.name).startsWith(lower)) return true
    return false
  })
}

export function findMember<T extends { name: string }>(
  author: string,
  members: T[]
): T | undefined {
  const commaIdx = author.indexOf(",")
  if (commaIdx === -1) return undefined

  const surnamePart = norm(author.slice(0, commaIdx).trim())
  const givenPart = norm(author.slice(commaIdx + 1).trim())

  if (!surnamePart || !givenPart) return undefined

  const surnameParts = surnamePart.split(/\s+/)
  const givenParts = givenPart.split(/\s+/).filter(Boolean)
  const givenSignificant = givenParts.filter((p) => p.includes(".") || !SMALL_WORDS.has(p))

  if (givenSignificant.length === 0) return undefined

  // Exact match: flip "Surname, Given" to "Given Surname" and compare
  const flippedNorm = `${givenPart} ${surnamePart}`
  const exact = members.find((m) => norm(m.name) === flippedNorm)
  if (exact) return exact

  return members.find((m) => {
    const mNorm = norm(m.name)
    const mParts = mNorm.split(/\s+/)

    // Find where the surname starts in the member name
    let surnameStartIdx = -1
    if (surnameParts.length === 1) {
      surnameStartIdx = mParts.findIndex(
        (p) => p === surnameParts[0] && !SMALL_WORDS.has(p)
      )
    } else {
      for (let i = 0; i <= mParts.length - surnameParts.length; i++) {
        const slice = mParts.slice(i, i + surnameParts.length)
        if (slice.every((p, j) => p === surnameParts[j])) {
          surnameStartIdx = i
          break
        }
      }
    }

    if (surnameStartIdx === -1) return false

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

    if (givenSignificant.length === 1) return true

    const remainingAuthor = givenSignificant.slice(1)
    const remainingMember = mGivenParts.slice(1)

    return remainingAuthor.every((ap) =>
      remainingMember.some(
        (mp) => initialMatches(ap, mp) || initialMatches(mp, ap) || ap === mp
      )
    )
  })
}
