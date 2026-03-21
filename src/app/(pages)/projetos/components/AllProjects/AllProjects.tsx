"use client"
import Link from "next/link"
import { useLanguage } from "@/app/i18n/context"
interface Project {
  title: string
  title_en?: string
  professor: string
  status: string
  type: string
  link: string
  period?: string
}

interface CurrentProjectsProps {
  title?: string
  projects: Project[]
  className?: string
  link: string
}
const typeColors = [
  { type: "Extensão", color: "text-teal-600 bg-teal-100 group-hover:bg-teal-200" },
  { type: "Pesquisa", color: "text-purple-600 bg-purple-100 group-hover:bg-purple-200" },
  { type: "Desenvolvimento", color: "text-indigo-600 bg-indigo-100 group-hover:bg-indigo-200" },
]
export function AllProjectsList({ title, projects, className, link }: CurrentProjectsProps) {
  const { t, locale } = useLanguage()
  const typeDisplayText: Record<string, string> = {
    "Extensão": t("projects.type_extension"),
    "Pesquisa": t("projects.type_research"),
    "Desenvolvimento": t("projects.type_development"),
  }
  const statusDisplayText: Record<string, string> = {
    "Finalizado": t("projects.status_done"),
    "Em andamento": t("projects.status_in_progress"),
  }
  const translatePeriod = (period: string) =>
    period.replace("Atual", t("common.current"))
  return (
    <div id={link} className={`bg-gradient-to-b from-gray-50 to-white py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center mb-16">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            return (
              <Link
                href={"/projetos/" + project.link || ""}
                key={index}
                className="group bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col min-h-[12rem] sm:min-h-[15rem]"
              >
                <div className="flex flex-wrap justify-start mb-4 sm:mb-6 gap-2">
                  <span
                    className={`${project.status == "Finalizado" ? `text-green-600 bg-green-100 group-hover:bg-green-200` : `text-yellow-600 bg-yellow-100 group-hover:bg-yellow-200`}  text-sm font-medium px-4 py-2 rounded-full  transition-colors duration-300}`}
                  >
                    {statusDisplayText[project.status] || project.status}
                  </span>
                  <span
                    className={`${typeColors.find((type) => type.type === project.type)?.color || "text-gray-600 bg-gray-100 group-hover:bg-gray-200"}  text-sm font-medium px-4 py-2 rounded-full  transition-colors duration-300`}
                  >
                    {typeDisplayText[project.type] || project.type}
                  </span>
                  {project.period && (
                    <span className="text-gray-500 bg-gray-100 text-sm font-medium px-4 py-2 rounded-full">
                      {translatePeriod(project.period)}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 group-hover:text-gray-900 group-hover:brightness-125 transition-all duration-300">
                  {locale === "en" && project.title_en ? project.title_en : project.title}
                </h3>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
