"use client"

import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { AllProjectsList } from "./components/AllProjects/AllProjects"
import { useProjects } from "@/app/context/ProjectsContext"
import { useLanguage } from "@/app/i18n/context"

export default function ProjetosPesquisa() {
  const { projects } = useProjects()
  const { t } = useLanguage()

  const sorted = [...projects].sort((a, b) => a.status.localeCompare(b.status))

  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: t("breadcrumb.projects"), href: "/projetos" }]} />
      <AllProjectsList title={t("nav.projects")} link="em-andamento" projects={sorted} />
    </main>
  )
}
