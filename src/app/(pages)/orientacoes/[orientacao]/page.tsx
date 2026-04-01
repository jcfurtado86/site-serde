"use client"
import { use } from "react"
import { useProjects } from "@/app/context/ProjectsContext"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { FileProps } from "@/app/context/ProjectsContext"
import { GraduationCap, BookOpen, Award, BadgeCheck, CheckCircle, SquareUser as User, ExternalLink, LoaderIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/app/i18n/context"
import type { StudentProps } from "@/app/context/types"

type OrientacaoPageProps = {
  params: Promise<{
    orientacao: string
  }>
}

function fuzzyMatchMember<T extends { name: string }>(name: string, members: T[]): T | undefined {
  const lower = name.toLowerCase()
  // Exact match first
  const exact = members.find((m) => m.name.toLowerCase() === lower)
  if (exact) return exact

  const parts = lower.split(" ")
  if (parts.length < 2) return undefined
  const first = parts[0]
  const last = parts[parts.length - 1]
  const allParts = new Set(parts)

  return members.find((m) => {
    const mParts = m.name.toLowerCase().split(" ")
    if (mParts.length < 2) return false
    // First name must match
    if (mParts[0] !== first) return false
    // Option 1: last name matches + shared middle part
    if (mParts[mParts.length - 1] === last) {
      if (allParts.size <= 2 || mParts.length <= 2) return true
      return mParts.slice(1, -1).some((p) => allParts.has(p))
    }
    // Option 2: truncated name — all TCC name parts appear in member name
    if (mParts.length > parts.length) {
      return parts.every((p) => mParts.includes(p))
    }
    // Option 3: name cut mid-word — member name starts with the TCC name string
    if (m.name.toLowerCase().startsWith(lower)) return true
    return false
  })
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

  const getDocType = (type: string) => {
    switch (type) {
      case "article":
        return t("guidance_detail.doc_article")
      case "video":
        return t("guidance_detail.doc_video")
      default:
        return t("guidance_detail.doc_document")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <div className="p-4 sm:p-8 md:p-12">
        <header>
          <p className="text-teal-600 font-semibold tracking-wide uppercase">{t("guidance_detail.title")}</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {l(tcc.title, tcc.title_en)}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
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
          </div>
        </header>

        <hr className="my-8 border-gray-200" />

        <section className="flex flex-col gap-4">
          {tcc.year && (
            <p className="text-gray-700 leading-relaxed text-base">
              <strong>{t("guidance_detail.completion_year")}</strong> {tcc.year}
            </p>
          )}
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
                        className="rounded-full object-cover w-10 h-10"
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
          {tcc.description && (
            <p className="text-gray-700 leading-relaxed text-base">
              <strong>{t("guidance_detail.summary")}</strong> {l(tcc.description, tcc.description_en)}
            </p>
          )}
          {tcc.keywords && (
            <p className="text-gray-700 leading-relaxed text-base">
              <strong>{t("guidance_detail.keywords")}</strong> {tcc.keywords}
            </p>
          )}
        </section>

        <hr className="my-8 border-gray-200" />

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("guidance_detail.advisor")}</h2>
          {(() => {
            const advisor = fuzzyMatchMember(tcc.advisor, allTeachers)
            return (
              <div className="flex items-center gap-3 text-gray-700">
                {advisor?.imageUrl ? (
                  <Image
                    src={advisor.imageUrl}
                    alt={tcc.advisor}
                    width={32}
                    height={32}
                    className="rounded-full object-cover w-10 h-10"
                    unoptimized
                  />
                ) : (
                  <User size={24} className="text-teal-500" />
                )}
                <span className="text-gray-700">{tcc.advisor}</span>
              </div>
            )
          })()}
        </section>

        {tcc.documentation && tcc.documentation.length > 0 && (
          <>
            <hr className="my-8 border-gray-200" />
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("guidance_detail.materials")}</h2>
              <div className="flex items-center gap-3 text-gray-700">
                {tcc.documentation.map((doc: FileProps, index: number) => (
                  <Link
                    target="_blank"
                    href={doc.link || "#"}
                    key={index}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink size={24} className="text-teal-500" />
                    {doc.name}
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
