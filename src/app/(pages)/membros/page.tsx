"use client"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { useProjects } from "@/app/context/ProjectsContext"
import { Members } from "./components/Members/Members"
import { useLanguage } from "@/app/i18n/context"

export default function ProjetosPesquisa() {
  const { students, teachers } = useProjects()
  const { t } = useLanguage()
  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: t("breadcrumb.members"), href: "/membros" }]} />
      <Members members={teachers} title={t("members.researchers")} />
      <Members members={students.filter((student) => student.type === "Student").sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }))} title={t("members.students")} />
      <Members
        members={students.filter((student) => student.type === "ExStudent").sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }))}
        title={t("members.alumni")}
      />
    </main>
  )
}
