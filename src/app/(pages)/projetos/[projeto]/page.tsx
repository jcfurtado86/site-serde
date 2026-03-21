"use client"
import { use } from "react"
import { useProjects } from "@/app/context/ProjectsContext"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { FileProps } from "@/app/context/ProjectsContext"
import { Lightbulb, CheckCircle, SquareUser as User, ExternalLink, LoaderIcon } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/app/i18n/context"

type ProjectPageProps = {
  params: Promise<{
    projeto: string
  }>
}

function ProjectDetails({ project }: { project: any }) {
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
    <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
      <div className="p-8 md:p-12">
        <header>
          <p className="text-teal-600 font-semibold tracking-wide uppercase">{t("project_detail.title")}</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {l(project.title, project.title_en)}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Lightbulb />
              {typeDisplayText[project.type] || project.type}
            </span>
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses()}`}
            >
              {project.status === "Finalizado" ? <CheckCircle /> : <LoaderIcon />}
              {statusDisplayText[project.status] || project.status}
            </span>
          </div>
        </header>

        <hr className="my-8 border-gray-200" />

        <section className="flex flex-col gap-4">
          {project.period && (
            <p className="text-gray-700 leading-relaxed text-base">
              <strong>{t("project_detail.period")}</strong> {translatePeriod(project.period)}
            </p>
          )}
          <p className="text-gray-700 leading-relaxed text-base">
            <strong>{t("project_detail.summary")}</strong> {l(project.description, project.description_en)}
          </p>
          {project.team && project.team.length > 0 && (
            <p className="text-gray-700 leading-relaxed text-base">
              <strong>{t("project_detail.team")}</strong> {project.team.join(", ")}
            </p>
          )}
          {project.funding && (
            <p className="text-gray-700 leading-relaxed text-base">
              <strong>{t("project_detail.funding")}</strong> {project.funding}
            </p>
          )}
        </section>

        <hr className="my-8 border-gray-200" />

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("project_detail.responsible_professor")}</h2>
          <div className="flex items-center gap-3 text-gray-700">
            <User size={24} className="text-teal-500" />
            <span className="text-lg">{project.professor}</span>
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
  const { projects } = useProjects()
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
      {projeto && <ProjectDetails project={projeto} />}
    </main>
  )
}
