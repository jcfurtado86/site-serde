"use client"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { useProjects } from "@/app/context/ProjectsContext"
import { Members } from "./components/Members/Members"

export default function ProjetosPesquisa() {
  const { students, exStudents, teachers } = useProjects()
  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: "Equipe", href: "/equipe" }]} />
      <Members members={teachers} title="Docentes" />
      <Members members={students} title="Acadêmicos" />
      <Members members={exStudents} title="Egressos" />
    </main>
  )
}
