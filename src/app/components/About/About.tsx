"use client"

import Link from "next/link"
import { ResearchLineList } from "@/app/(pages)/projetos/components/ResearchLine/ReaserchLine"
import { useProjects } from "@/app/context/ProjectsContext"
import { useLanguage } from "@/app/i18n/context"
export default function About() {
  const { t } = useLanguage()
  const { projects, tccs, publications, students, teachers } = useProjects()
  const equipe = [...students.filter((s) => s.type === "Student"), ...teachers]

  return (
    <div
      className="w-full bg-gradient-to-b from-gray-50 to-white flex flex-col items-center p-4 pb-2 pt-2 sm:p-6 sm:pb-4 sm:pt-4 lg:p-8 lg:pb-6 lg:pt-6"
      id="sobre"
    >
      <div className="max-w-[1240px] mx-auto pt-8 md:pt-6 pb-4 md:pb-2">
        <div className="text-center mb-8 md:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 md:mb-4">
            {t("about.title")}
          </h1>
          <p className="pt-5 text-gray-600 text-left text-sm sm:text-base lg:text-lg max-w-7xl mx-auto leading-relaxed pb-10">
            {t("about.description")}
          </p>
        </div>
        {/*resultados de pesquisa*/}
        {/*<ResearchResults researchItems={researchItems} />*/}
        {/*linhas de pesquisa*/}
        <ResearchLineList className="pt-2 bg-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <Link
            href="/projetos"
            className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-blue-100 transition-colors">
                <svg
                  className="w-12 h-12 text-[#1565C0] group-hover:text-[#1565C0] transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-center text-black">
              {projects.length}
            </h3>
            <h3 className="text-xl lg:text-2xl font-bold text-center mb-4 text-black">{t("about.projects_card")}</h3>
            <p className="text-gray-600 text-center">
              {t("about.projects_description")}
            </p>
          </Link>

          <Link
            href="/publicacoes"
            className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-orange-50 p-4 rounded-xl group-hover:bg-orange-100 transition-colors">
                <svg
                  className="w-12 h-12 text-[#EF6C00] group-hover:text-[#EF6C00] transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-center text-black">
              {publications.length}
            </h3>
            <h3 className="text-xl lg:text-2xl font-bold text-center mb-4 text-black">
              {t("about.publications_card")}
            </h3>
            <p className="text-gray-600 text-center">
              {t("about.publications_description")}
            </p>
          </Link>

          <Link
            href="/orientacoes"
            className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-blue-100 transition-colors">
                <svg
                  className="w-12 h-12 text-[#1565C0] group-hover:text-[#1565C0] transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-center text-black">
              {tccs.filter((t) => t.status === "Finalizado").length}
            </h3>
            <h3 className="text-xl lg:text-2xl font-bold text-center mb-4 text-black">
              {t("about.completed_guidance_card")}
            </h3>
            <p className="text-gray-600 text-center">
              {t("about.guidance_description")}
            </p>
          </Link>
          <Link
            href="/membros"
            className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-50 p-4 rounded-xl group-hover:bg-green-100 transition-colors">
                <svg
                  className="w-12 h-12 text-[#2E7D32] group-hover:text-[#2E7D32] transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-center text-black">
              {equipe.length}
            </h3>
            <h3 className="text-xl lg:text-2xl font-bold text-center mb-4 text-black">{t("about.members_card")}</h3>
            <p className="text-gray-600 text-center">
              {t("about.members_description")}
            </p>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="http://dgp.cnpq.br/dgp/espelhogrupo/1940170946115840"
            target="_blank"
            className="text-[#1565C0] hover:text-white inline-flex items-center gap-2 transition-all duration-300 border-2 border-[#1565C0] hover:bg-[#1565C0] rounded-lg px-6 py-3 mt-6 font-medium"
          >
            {t("about.cnpq_directory")}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
