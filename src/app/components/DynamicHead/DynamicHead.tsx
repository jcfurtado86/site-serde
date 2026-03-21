"use client"

import { useEffect } from "react"
import { useLanguage } from "@/app/i18n/context"

export default function DynamicHead() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t("meta.title")
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", t("meta.description"))
    }
  }, [t])

  return null
}
