"use client"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { useProjects } from "@/app/context/ProjectsContext"
import { Members } from "./components/Members/Members"
import { useLanguage } from "@/app/i18n/context"

export default function ProjetosPesquisa() {
  const { students, teachers } = useProjects()
  const { t } = useLanguage()
  const activeStudents = students.filter((s) => s.type === "Student").sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }))
  const alumni = students.filter((s) => s.type === "ExStudent").sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }))
  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: t("breadcrumb.members"), href: "/membros" }]} />
      <Members members={teachers} title={`${t("members.researchers")} (${teachers.length})`} />
      <Members members={activeStudents} title={`${t("members.students")} (${activeStudents.length})`} className="bg-white" />
      <Members
        members={alumni}
        title={`${t("members.alumni")} (${alumni.length})`}
        className="bg-gray-50"
      />
    </main>
  )
}
