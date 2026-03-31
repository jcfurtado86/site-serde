"use client"

import Link from "next/link"
import Image from "next/image"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { useProjects } from "@/app/context/ProjectsContext"
import { useLanguage } from "@/app/i18n/context"

export default function InovacaoPage() {
  const { innovationProjects } = useProjects()
  const { t } = useLanguage()

  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: t("breadcrumb.innovation"), href: "/inovacao" }]} />

      <div className="bg-gradient-to-b from-gray-50 to-white py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-8">
            {t("innovation.title")}
          </h2>

          <div className="w-full mb-16">
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {t("innovation.intro")}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("innovation.intro2")}
            </p>
          </div>

          {innovationProjects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {innovationProjects.map((project, index) => (
                <Link
                  href={"/inovacao/" + project.link}
                  key={index}
                  className="group bg-white p-4 sm:p-8 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col min-h-[12rem] sm:min-h-[15rem]"
                >
                  <div className="flex flex-wrap justify-start mb-4 sm:mb-6 gap-2">
                    <span className="text-indigo-600 bg-indigo-100 group-hover:bg-indigo-200 text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300">
                      {project.program}
                    </span>
                    <span className="text-gray-500 bg-gray-100 text-sm font-medium px-4 py-2 rounded-full">
                      {project.year}
                    </span>
                    <span className="text-teal-600 bg-teal-100 group-hover:bg-teal-200 text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300">
                      {project.thematicAxis}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {project.logoUrl && (
                      <Image
                        src={project.logoUrl}
                        alt={project.title}
                        width={48}
                        height={48}
                        className="rounded-lg object-contain"
                      />
                    )}
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800 group-hover:text-gray-900 group-hover:brightness-125 transition-all duration-300">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center text-lg">Em breve.</p>
          )}
        </div>
      </div>
    </main>
  )
}
