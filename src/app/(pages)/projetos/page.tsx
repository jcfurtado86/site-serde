"use client"

import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { AllProjectsList } from "./components/AllProjects/AllProjects"
import { useProjects } from "@/app/context/ProjectsContext"

export default function ProjetosPesquisa() {
  const { projects } = useProjects()

  const sorted = [...projects].sort((a, b) => a.status.localeCompare(b.status))

  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: "Projetos", href: "/projetos" }]} />
      <AllProjectsList title="Projetos" link="em-andamento" projects={sorted} />
    </main>
  )
}
