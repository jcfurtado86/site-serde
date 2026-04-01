"use client"
import { use } from "react"
import { useProjects } from "@/app/context/ProjectsContext"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { FileProps } from "@/app/context/ProjectsContext"
import { GraduationCap, BookOpen, Award, BadgeCheck, CheckCircle, SquareUser as User, ExternalLink, Download, LoaderIcon, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/app/i18n/context"
import type { StudentProps } from "@/app/context/types"
import { fuzzyMatchMember } from "@/app/utils/resolveAuthorName"

type OrientacaoPageProps = {
  params: Promise<{
    orientacao: string
  }>
}


function OrientacaoDetails({ tcc, allStudents, allTeachers }: { tcc: any; allStudents: StudentProps[]; allTeachers: { name: string; imageUrl?: string }[] }) {
  const { t, locale } = useLanguage()
  const l = (pt: string, en?: string) => locale === "en" && en ? en : pt
  const statusDisplayText: Record<string, string> = {
    "Finalizado": t("guidance.status_done"),
    "Em andamento": t("guidance.status_in_progress"),
  }
  const degreeDisplayText: Record<string, string> = {
    "Graduação": t("guidance.degree_undergraduate"),
    "Mestrado": t("guidance.degree_master"),
    "Doutorado": t("guidance.degree_doctorate"),
    "Especialização": t("guidance.degree_specialization"),
  }
  const degreeConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    "Graduação": { color: "bg-orange-100 text-orange-600", icon: <GraduationCap size={16} /> },
    "Mestrado": { color: "bg-blue-100 text-blue-600", icon: <BookOpen size={16} /> },
    "Doutorado": { color: "bg-red-100 text-red-600", icon: <Award size={16} /> },
    "Especialização": { color: "bg-pink-100 text-pink-600", icon: <BadgeCheck size={16} /> },
  }
  const degree = degreeConfig[tcc.degree || "Graduação"] || degreeConfig["Graduação"]

  const getStatusClasses = () => {
    switch (tcc.status.toLowerCase()) {
      case "finalizado":
        return "bg-green-100 text-green-600"
      case "em andamento":
        return "bg-yellow-100 text-yellow-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6 sm:py-10">
        <header>
          <p className="text-teal-600 font-semibold tracking-wide uppercase">{t("guidance_detail.title")}</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {l(tcc.title, tcc.title_en)}
          </h1>
          {tcc.course && (
            <p className="mt-2 text-gray-600 text-lg font-medium">{l(tcc.course, tcc.course_en)}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${degree.color}`}>
              {degree.icon}
              {degreeDisplayText[tcc.degree || "Graduação"] || tcc.degree}
            </span>
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses()}`}
            >
              {tcc.status === "Finalizado" ? <CheckCircle size={16} /> : <LoaderIcon size={16} />}
              {statusDisplayText[tcc.status] || tcc.status}
            </span>
            {tcc.year && tcc.status === "Finalizado" && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                <Calendar size={16} />
                {tcc.year}
              </span>
            )}
          </div>
        </header>

        <hr className="my-8 border-gray-200" />

        <section className="flex flex-col gap-6">
          <div>
            <strong className="text-gray-700">{t("guidance_detail.students")}</strong>
            <div className="flex flex-wrap gap-3 mt-2">
              {tcc.students?.map((name: string, i: number) => {
                const member = fuzzyMatchMember(name, allStudents)
                return (
                  <div key={i} className="flex items-center gap-3">
                    {member?.imageUrl ? (
                      <Image
                        src={member.imageUrl}
                        alt={name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-10 h-10 bg-white"
                        unoptimized
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={16} className="text-gray-400" />
                      </div>
                    )}
                    <span className="text-gray-700">{member?.name || name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <strong className="text-gray-700">{t("guidance_detail.advisor")}</strong>
            {(() => {
              const advisor = fuzzyMatchMember(tcc.advisor, allTeachers)
              return (
                <div className="flex items-center gap-3 mt-2">
                  {advisor?.imageUrl ? (
                    <Image
                      src={advisor.imageUrl}
                      alt={tcc.advisor}
                      width={40}
                      height={40}
                      className="rounded-full object-cover w-10 h-10 bg-white"
                      unoptimized
                    />
                  ) : (
                    <User size={24} className="text-teal-500" />
                  )}
                  <span className="text-gray-700">{tcc.advisor}</span>
                </div>
              )
            })()}
          </div>

          {tcc.description && (
            <div>
              <strong className="text-gray-700">{t("guidance_detail.summary")}</strong>
              <p className="mt-2 text-gray-700 leading-relaxed text-base">
                {l(tcc.description, tcc.description_en)}
              </p>
            </div>
          )}

          {tcc.keywords && (
            <div>
              <strong className="text-gray-700">{t("guidance_detail.keywords")}</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {l(tcc.keywords, tcc.keywords_en).split(",").map((kw: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {kw.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {tcc.documentation && tcc.documentation.length > 0 && (
          <>
            <hr className="my-8 border-gray-200" />
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("guidance_detail.materials")}</h2>
              <div className="flex flex-wrap gap-3">
                {tcc.documentation.map((doc: FileProps, index: number) => (
                  <Link
                    target="_blank"
                    href={doc.link || "#"}
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    {doc.link.startsWith("/tccs/") ? <Download size={18} /> : <ExternalLink size={18} />}
                    {doc.link.startsWith("/tccs/") ? t("guidance_detail.doc_full_text") : doc.link.includes("repositorio.unifap") ? t("guidance_detail.doc_repository") : doc.name}
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

export default function OrientacaoPage({ params }: OrientacaoPageProps) {
  const { tccs, students, teachers } = useProjects()
  const { t, locale } = useLanguage()

  const resolvedParams = use(params)
  const orientacaoLink = resolvedParams.orientacao
  const tcc = tccs.find((t) => t.link === orientacaoLink) || null

  return (
    <main className="pt-20 pb-16 min-h-[calc(100vh-5.6rem)] bg-gray-50">
      <Breadcrumb
        items={[
          { label: t("breadcrumb.guidance"), href: "/orientacoes" },
          {
            label: tcc ? (locale === "en" && tcc.title_en ? tcc.title_en : tcc.title) : t("guidance_detail.not_found"),
            href: "/orientacoes/" + orientacaoLink,
          },
        ]}
      />
      {tcc && <OrientacaoDetails tcc={tcc} allStudents={students} allTeachers={teachers} />}
    </main>
  )
}
