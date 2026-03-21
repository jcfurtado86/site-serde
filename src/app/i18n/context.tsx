"use client"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import pt from "./pt.json"
import en from "./en.json"

type Locale = "pt" | "en"
type Dictionary = typeof pt

interface LanguageContextType {
  locale: Locale
  t: (key: string) => string
  toggle: () => void
}

const dictionaries: Record<Locale, Dictionary> = { pt, en }

const LanguageContext = createContext<LanguageContextType>({
  locale: "pt",
  t: (key: string) => key,
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt")

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null
    if (saved === "en" || saved === "pt") setLocale(saved)
  }, [])

  const toggle = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "pt" ? "en" : "pt"
      localStorage.setItem("locale", next)
      return next
    })
  }, [])

  const t = useCallback(
    (key: string): string => {
      const parts = key.split(".")
      let value: unknown = dictionaries[locale]
      for (const part of parts) {
        if (value && typeof value === "object" && part in value) {
          value = (value as Record<string, unknown>)[part]
        } else {
          return key
        }
      }
      return typeof value === "string" ? value : key
    },
    [locale],
  )

  return (
    <LanguageContext.Provider value={{ locale, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
