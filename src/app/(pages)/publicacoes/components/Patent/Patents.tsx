"use client"
import { useState, useMemo } from "react"
import { Search } from "@/app/components/SearcBar/Search"
import { useProjects } from "@/app/context/ProjectsContext"
import { useLanguage } from "@/app/i18n/context"
import { resolveAuthorName } from "@/app/utils/resolveAuthorName"
import { AuthorAvatars } from "@/app/(pages)/publicacoes/components/AuthorAvatars/AuthorAvatars"

interface PatentDisplayProps {
  number?: number
  title: string
  authors: string[]
  link?: string
  patentNumber?: string
  registrationDate?: string
  grantDate?: string
  registrationInstitution?: string
  fundingInstitution?: string
  patentType?: string
  originalAuthors?: string[]
  members?: { name: string; imageUrl?: string }[]
}

function PatentComponent({
  title,
  authors,
  patentNumber,
  registrationDate,
  grantDate,
  registrationInstitution,
  fundingInstitution,
  number,
  originalAuthors = [],
  members = [],
}: PatentDisplayProps) {
  const { t } = useLanguage()
  return (
    <div className="border-b border-gray-200 py-6 bg-white hover:bg-gray-50/80 transition-all duration-200 px-6 relative group">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <span className="text-gray-500 font-medium min-w-[24px]">{number}.</span>

          <h2 className="flex-1 text-xl text-gray-800 font-medium group-hover:text-gray-900">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2 pl-[calc(24px+0.75rem)]">
          <AuthorAvatars authors={originalAuthors} members={members} />
          <p className="text-base text-gray-600">{authors.join("; ")}</p>
        </div>

        <div className="text-base text-gray-600 pl-[calc(24px+0.75rem)] flex flex-col gap-1 pt-2">
          {patentNumber && (
            <p>
              <strong>{t("patents.number")}</strong> {patentNumber}
            </p>
          )}
          {registrationDate && (
            <p>
              <strong>{t("patents.registration_date")}</strong> {registrationDate}
            </p>
          )}
          {grantDate && (
            <p>
              <strong>{t("patents.grant_date")}</strong> {grantDate}
            </p>
          )}
          {registrationInstitution && (
            <p>
              <strong>{t("patents.institution")}</strong> {registrationInstitution}
            </p>
          )}
          {fundingInstitution && (
            <p>
              <strong>{t("patents.funding_institution")}</strong> {fundingInstitution}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export function Patents() {
  const [sortBy, setSortBy] = useState("date")
  const [searchTerm, setSearchTerm] = useState("")
  const { patents, students, teachers } = useProjects()
  const { t } = useLanguage()
  const allMembers = useMemo(() => [...students, ...teachers], [students, teachers])

  const sortedPatents = useMemo(() => {
    let filtered = patents.filter(
      (patent) =>
        patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patent.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const parseDate = (d?: string) => {
      if (!d) return 0
      const [day, month, year] = d.split("/").map(Number)
      return year * 10000 + month * 100 + day
    }

    if (sortBy === "date") {
      return [...filtered].sort((a, b) => parseDate(b.registrationDate) - parseDate(a.registrationDate))
    }

    return filtered
  }, [patents, sortBy, searchTerm])

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-16">
          {t("patents.title")}
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              {t("patents.sort_label")}
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full sm:w-auto px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 font-medium hover:border-gray-400 transition-colors duration-200"
            >
              <option value="date">{t("patents.sort_date")}</option>
            </select>
          </div>

          <Search
            onSearch={setSearchTerm}
            placeholder={t("patents.search_placeholder")}
            className="w-full sm:w-72"
            inputClassName="bg-white"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {sortedPatents.map((patent, index) => (
            <PatentComponent
              key={index}
              {...patent}
              authors={patent.authors.map((a) => resolveAuthorName(a, allMembers))}
              originalAuthors={patent.authors}
              members={allMembers}
              number={index + 1}
            />
          ))}

          {sortedPatents.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">{t("patents.no_results")}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
