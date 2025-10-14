"use client"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { useProjects } from "@/app/context/ProjectsContext"
import { Members } from "./components/Members/Members"

export default function ProjetosPesquisa() {
  const { students, teachers } = useProjects()
  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: "Membros", href: "/membros" }]} />
      <Members members={teachers} title="Pesquisadores" />
      <Members members={students.filter((student) => student.type === "Student")} title="Alunos" />
      <Members
        members={students.filter((student) => student.type === "ExStudent")}
        title="Egressos"
      />
    </main>
  )
}
