const smallWords = new Set(["de", "da", "do", "dos", "das", "e", "em", "a", "o", "ao", "na", "no", "nas", "nos", "para", "com", "por", "um", "uma", "of", "the", "and", "in", "on", "at", "to", "for", "with", "an", "is", "or", "by", "as", "from"])
const acronyms = new Set(["erp", "api", "web", "ihc", "ti", "ia", "iot", "sql", "css", "html", "js", "pdf", "url", "uml", "bpm", "tcc", "ap", "serde", "unifap", "ufpa", "covid"])

export function fixCasing(s: string): string {
  if (!s.trim()) return s

  const words = s.split(" ")
  return words
    .map((word, i) => {
      if (!word) return word
      if (/^\(.*\)$/.test(word)) return word

      const lower = word.toLowerCase()
      const afterColon = i > 0 && words[i - 1]?.endsWith(":")
      if (i > 0 && !afterColon && smallWords.has(lower)) return lower
      if (acronyms.has(lower)) return word.toUpperCase()
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join(" ")
}
