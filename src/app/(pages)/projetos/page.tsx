"use client"

import { ResearchLineList } from "./components/ResearchLine/ReaserchLine"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { AllProjectsList } from "./components/AllProjects/AllProjects"
import { useProjects } from "@/app/context/ProjectsContext"

export default function ProjetosPesquisa() {
  const { projects } = useProjects()
  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: "Projetos de Pesquisa", href: "/projetos-pesquisa" }]} />
      <ResearchLineList className="bg-gradient-to-b from-gray-50 to-white" />

      <AllProjectsList
        title="Projetos de Pesquisa"
        link="em-andamento"
        projects={projects.filter((project) => project.type === "pesquisa")}
      />
      <AllProjectsList
        title="Projetos de Extensão"
        link="finalizados"
        projects={projects.filter((project) => project.type === "extensao")}
      />
    </main>
  )
}
