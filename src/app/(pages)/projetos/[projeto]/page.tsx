"use client"
import { use } from "react"
import { useProjects } from "@/app/context/ProjectsContext"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { FileProps } from "@/app/context/ProjectsContext"
import { Search, Handshake, Code, CheckCircle, SquareUser as User, ExternalLink, LoaderIcon, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/app/i18n/context"
import { fuzzyMatchMember } from "@/app/utils/resolveAuthorName"

type ProjectPageProps = {
  params: Promise<{
    projeto: string
  }>
}

function ProjectDetails({ project, teachers, allMembers }: { project: any; teachers: { name: string; imageUrl?: string }[]; allMembers: { name: string; imageUrl?: string }[] }) {
  const { t, locale } = useLanguage()
  const l = (pt: string, en?: string) => locale === "en" && en ? en : pt
  const statusDisplayText: Record<string, string> = {
    "Finalizado": t("projects.status_done"),
    "Em andamento": t("projects.status_in_progress"),
  }
  const typeDisplayText: Record<string, string> = {
    "Extensão": t("projects.type_extension"),
    "Pesquisa": t("projects.type_research"),
    "Desenvolvimento": t("projects.type_development"),
  }
  const translatePeriod = (period: string) =>
    period.replace("Atual", t("common.current"))
  const getStatusClasses = () => {
    switch (project.status.toLowerCase()) {
      case "finalizado":
        return "bg-green-100 text-green-600"
      case "em andamento":
        return "bg-yellow-100 text-yellow-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getDocType = (type: string) => {
    switch (type) {
      case "article":
        return t("project_detail.doc_article")
      case "video":
        return t("project_detail.doc_video")
      default:
        return t("project_detail.doc_document")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6 sm:py-10">
        <header>
          <p className="text-teal-600 font-semibold tracking-wide uppercase">{t("project_detail.title")}</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {l(project.title, project.title_en)}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {(() => {
              const typeConfig: Record<string, { color: string; icon: React.ReactNode }> = {
                "Pesquisa": { color: "bg-purple-100 text-purple-700", icon: <Search size={16} /> },
                "Extensão": { color: "bg-teal-100 text-teal-700", icon: <Handshake size={16} /> },
                "Desenvolvimento": { color: "bg-indigo-100 text-indigo-700", icon: <Code size={16} /> },
              }
              const tc = typeConfig[project.type] || { color: "bg-blue-100 text-blue-800", icon: <Code size={16} /> }
              return (
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${tc.color}`}>
                  {tc.icon}
                  {typeDisplayText[project.type] || project.type}
                </span>
              )
            })()}
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses()}`}
            >
              {project.status === "Finalizado" ? <CheckCircle size={16} /> : <LoaderIcon size={16} />}
              {statusDisplayText[project.status] || project.status}
            </span>
            {project.period && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                <Calendar size={16} />
                {translatePeriod(project.period)}
              </span>
            )}
          </div>
        </header>

        <hr className="my-8 border-gray-200" />

        <section className="flex flex-col gap-6">
          <p className="text-gray-700 leading-relaxed text-base">
            <strong>{t("project_detail.summary")}</strong> {l(project.description, project.description_en)}
          </p>
          {project.team && project.team.length > 0 && (
            <div>
              <strong className="text-gray-700">{t("project_detail.team")}</strong>
              <div className="flex flex-wrap gap-y-1 mt-2 pl-2">
                {project.team.map((name: string, i: number) => {
                  const member = fuzzyMatchMember(name, allMembers)
                  return (
                    <div key={i} className="relative group/tip -ml-2">
                      {member?.imageUrl ? (
                        <Image
                          src={member.imageUrl}
                          alt={name}
                          width={36}
                          height={36}
                          className="rounded-full object-cover w-9 h-9 border-2 border-white bg-white"
                          unoptimized
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                          <span className="text-gray-400 text-xs">{name[0]}</span>
                        </div>
                      )}
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-10">
                        {name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {project.funding && (
            <p className="text-gray-700 leading-relaxed text-base">
              <strong>{t("project_detail.funding")}</strong> {project.funding}
            </p>
          )}
        </section>

        <hr className="my-8 border-gray-200" />

        <section className="flex flex-col gap-6">
          <div>
            <strong className="text-gray-700">{t("project_detail.responsible_professor")}</strong>
            {(() => {
              const teacher = fuzzyMatchMember(project.professor, teachers)
              return (
                <div className="flex items-center gap-3 mt-2">
                  {teacher?.imageUrl ? (
                    <Image
                      src={teacher.imageUrl}
                      alt={project.professor}
                      width={40}
                      height={40}
                      className="rounded-full object-cover w-10 h-10 bg-white"
                      unoptimized
                    />
                  ) : (
                    <User size={24} className="text-teal-500" />
                  )}
                  <span className="text-gray-700">{project.professor}</span>
                </div>
              )
            })()}
          </div>
        </section>

        {project.documentation && project.documentation.length > 0 && (
          <>
            <hr className="my-8 border-gray-200" />
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("project_detail.materials")}</h2>
              <div className="flex items-center gap-3 text-gray-700">
                {project.documentation.map((doc: FileProps, index: number) => (
                  <Link
                    target="_blank"
                    href={doc.link || "#"}
                    key={index}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink size={24} className="text-teal-500" />
                    {doc.name} ({getDocType(doc.type)})
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
        <hr className="my-8 border-gray-200" />
      </div>
    </div>
  )
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { projects, teachers, students } = useProjects()
  const allMembers = [...students, ...teachers]
  const { t, locale } = useLanguage()

  const resolvedParams = use(params)
  const projetoLink = resolvedParams.projeto
  const projeto = projects.find((p) => p.link === projetoLink) || null

  return (
    <main className="pt-20 pb-16 min-h-[calc(100vh-5.6rem)] bg-gray-50">
      <Breadcrumb
        items={[
          { label: t("breadcrumb.projects"), href: "/projetos" },
          {
            label: projeto ? (locale === "en" && projeto.title_en ? projeto.title_en : projeto.title) : t("project_detail.not_found"),
            href: "/projetos/" + projetoLink,
          },
        ]}
      />
      {projeto && <ProjectDetails project={projeto} teachers={teachers} allMembers={allMembers} />}
    </main>
  )
}
