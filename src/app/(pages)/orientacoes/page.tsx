"use client"

import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { useProjects } from "@/app/context/ProjectsContext"
import Link from "next/link"
import { useLanguage } from "@/app/i18n/context"

const degreeColors: Record<string, string> = {
  Graduação: "text-orange-600 bg-orange-100 group-hover:bg-orange-200",
  Mestrado: "text-blue-600 bg-blue-100 group-hover:bg-blue-200",
  Doutorado: "text-red-600 bg-red-100 group-hover:bg-red-200",
  Especialização: "text-pink-600 bg-pink-100 group-hover:bg-pink-200",
}

export default function Orientacoes() {
  const { tccs } = useProjects()
  const { t, locale } = useLanguage()

  const degreeDisplayText: Record<string, string> = {
    "Graduação": t("guidance.degree_undergraduate"),
    "Mestrado": t("guidance.degree_master"),
    "Doutorado": t("guidance.degree_doctorate"),
    "Especialização": t("guidance.degree_specialization"),
  }
  const statusDisplayText: Record<string, string> = {
    "Finalizado": t("guidance.status_done"),
    "Em andamento": t("guidance.status_in_progress"),
  }

  const sorted = [...tccs].sort((a, b) => {
    const statusOrder = a.status.localeCompare(b.status)
    if (statusOrder !== 0) return statusOrder
    return parseInt(b.year, 10) - parseInt(a.year, 10)
  })

  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: t("breadcrumb.guidance"), href: "/orientacoes" }]} />
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center mb-16">
            {t("guidance.title")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sorted.map((tcc, index) => (
              <Link
                href={"/orientacoes/" + tcc.link}
                key={index}
                className="group bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col min-h-[12rem] sm:min-h-[15rem]"
              >
                <div className="flex flex-wrap justify-start mb-4 sm:mb-6 gap-2">
                  <span
                    className={`${tcc.status === "Finalizado" ? "text-green-600 bg-green-100 group-hover:bg-green-200" : "text-yellow-600 bg-yellow-100 group-hover:bg-yellow-200"} text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300`}
                  >
                    {statusDisplayText[tcc.status] || tcc.status}
                  </span>
                  <span
                    className={`${degreeColors[tcc.degree || "Graduação"] || "text-gray-600 bg-gray-100 group-hover:bg-gray-200"} text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300`}
                  >
                    {degreeDisplayText[tcc.degree || "Graduação"] || tcc.degree || t("guidance.degree_undergraduate")}
                  </span>
                  {tcc.status === "Finalizado" && (
                    <span className="text-gray-500 bg-gray-100 text-sm font-medium px-4 py-2 rounded-full">
                      {tcc.year}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 group-hover:brightness-125 transition-all duration-300">
                  {locale === "en" && tcc.title_en ? tcc.title_en : tcc.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base mt-auto">
                  {tcc.students.join(", ")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
