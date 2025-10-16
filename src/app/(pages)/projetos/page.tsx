"use client"

import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { AllProjectsList } from "./components/AllProjects/AllProjects"
import { useProjects } from "@/app/context/ProjectsContext"

export interface Project {
  title: string
  description: string
  professor: string
  status: string
  type: string
  link: string
}

export default function ProjetosPesquisa() {
  const { projects, tccs } = useProjects()

  const transformedTCCs: Project[] = tccs.map((tcc) => {
    // Constrói uma descrição a partir dos dados do TCC
    const description = `TCC desenvolvido por ${tcc.students.join(", ")} no ano de ${tcc.year}.`

    return {
      // Mapeamentos diretos
      title: tcc.title,
      link: tcc.link,

      // Mapeamento adaptado: 'advisor' vira 'professor'
      professor: tcc.advisor,

      // Campos gerados com valores padrão ou construídos
      description: description,
      status: tcc.status, // Assumimos que TCCs listados estão concluídos
      type: "TCC", // Definimos o tipo como 'TCC' para fácil identificação
    }
  })

  // 2. Combina o array de projetos original com os TCCs transformados
  const mergedArray = [...projects, ...transformedTCCs]

  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: "Projetos", href: "/projetos" }]} />
      <AllProjectsList
        title="Projetos"
        link="em-andamento"
        projects={mergedArray.sort((a, b) => a.status.localeCompare(b.status))}
      />
    </main>
  )
}
