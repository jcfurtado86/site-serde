"use client"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { Publications } from "./components/Publications/Publications"
import { Patents } from "./components/Patent/Patents"
import { useLanguage } from "@/app/i18n/context"

export default function ProjetosPesquisa() {
  const { t } = useLanguage()
  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: t("breadcrumb.publications"), href: "/publicacoes" }]} />
      <Publications />
      <Patents />
    </main>
  )
}
