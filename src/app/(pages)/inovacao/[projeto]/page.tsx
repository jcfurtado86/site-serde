"use client"

import { use } from "react"
import Image from "next/image"
import { useProjects } from "@/app/context/ProjectsContext"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { useLanguage } from "@/app/i18n/context"
import { Lightbulb, Users, Target, BookOpen, Award, Calendar, Tag } from "lucide-react"

type PageProps = {
  params: Promise<{ projeto: string }>
}

export default function InnovationDetailPage({ params }: PageProps) {
  const { innovationProjects } = useProjects()
  const { t } = useLanguage()

  const resolvedParams = use(params)
  const project = innovationProjects.find((p) => p.link === resolvedParams.projeto) || null

  return (
    <main className="pt-20 pb-16 min-h-[calc(100vh-5.6rem)] bg-gray-50">
      <Breadcrumb
        items={[
          { label: t("breadcrumb.innovation"), href: "/inovacao" },
          {
            label: project ? project.title : t("innovation.not_found"),
            href: "/inovacao/" + resolvedParams.projeto,
          },
        ]}
      />
      {project && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="p-4 sm:p-8 md:p-12">
            <header>
              <p className="text-teal-600 font-semibold tracking-wide uppercase">
                {t("innovation.detail_title")}
              </p>
              <div className="flex items-center gap-4 mt-2">
                {project.logoUrl && (
                  <Image
                    src={project.logoUrl}
                    alt={project.title}
                    width={64}
                    height={64}
                    className="rounded-lg object-contain"
                  />
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {project.title}
                </h1>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <Lightbulb size={16} />
                  {project.program}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                  <Calendar size={16} />
                  {project.year}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                  <Tag size={16} />
                  {project.thematicAxis}
                </span>
              </div>
            </header>

            <hr className="my-8 border-gray-200" />

            <section className="flex flex-col gap-8">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-3">
                  <Target size={20} className="text-teal-500" />
                  {t("innovation.problem")}
                </h2>
                <p className="text-gray-700 leading-relaxed">{project.problemAndOpportunity}</p>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-3">
                  <BookOpen size={20} className="text-teal-500" />
                  {t("innovation.context")}
                </h2>
                <p className="text-gray-700 leading-relaxed">{project.originContext}</p>
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-3">
                  <Lightbulb size={20} className="text-teal-500" />
                  {t("innovation.solution")}
                </h2>
                <p className="text-gray-700 leading-relaxed">{project.proposedSolution}</p>
              </div>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
                <Users size={20} className="text-teal-500" />
                {t("innovation.team")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.team.map((member, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {member}
                  </span>
                ))}
              </div>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-3">
                <Award size={20} className="text-teal-500" />
                {t("innovation.result")}
              </h2>
              <p className="text-gray-700 leading-relaxed">{project.resultAndRecognition}</p>
            </section>

            <hr className="my-8 border-gray-200" />
          </div>
        </div>
      )}
    </main>
  )
}
