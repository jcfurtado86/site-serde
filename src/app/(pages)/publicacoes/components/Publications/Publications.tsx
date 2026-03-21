"use client"
import { useState, useMemo } from "react"
import { Search } from "@/app/components/SearcBar/Search"
import { Tooltip } from "@/app/(pages)/publicacoes/components/Tooltip/Tooltip"
import { useProjects } from "@/app/context/ProjectsContext"
import { useLanguage } from "@/app/i18n/context"
interface PublicationProps {
  type: "article" | "book" | "chapter" | "congress" | "conferenceAbstract" | "patent"
  number?: number
  title: string
  authors: string[]
  year: number | string
  link?: string
  publisher?: string
  edition?: string
  pages?: string
  event?: string
  location?: string
  proceedings?: string
  webCitations?: number
  scopusCitations?: number
  scieloCitations?: number
  jcrImpact?: number
  importance?: number
  // --- Campos Opcionais para Patentes ---
  patentNumber?: string // Ex: "BR512021001576-2"
  registrationDate?: string // Ex: "30/10/2020"
  registrationInstitution?: string // Ex: "INPI - Instituto Nacional da Propriedade Industrial"
  patentType?: string
}

function Publication({
  type,
  title,
  authors,
  year,
  link,
  publisher,
  edition,
  pages,
  event,
  location,
  proceedings,
  number,
  patentNumber,
  registrationDate,
  registrationInstitution,
  patentType,
}: PublicationProps) {
  const { t } = useLanguage()
  const getTypeLabel = () => {
    switch (type) {
      case "article":
        return t("publications.type_journal")
      case "book":
        return t("publications.type_book")
      case "chapter":
        return t("publications.type_chapter")
      case "congress":
        return t("publications.type_conference")
      case "conferenceAbstract":
        return t("publications.type_abstract")
      case "patent":
        return t("publications.type_patent")
      default:
        return ""
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "article":
        return "bg-blue-100 text-blue-800 border border-blue-200"
      case "book":
        return "bg-green-100 text-green-800 border border-green-200"
      case "chapter":
        return "bg-orange-100 text-orange-800 border border-orange-200"
      case "congress":
        return "bg-teal-100 text-teal-800 border border-teal-200"
      case "conferenceAbstract":
        return "bg-purple-100 text-purple-800 border border-purple-200"
      case "patent":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200"
      default:
        return ""
    }
  }

  return (
    <div className="border-b border-gray-200 py-4 sm:py-6 bg-white hover:bg-gray-50/80 transition-all duration-200 px-3 sm:px-6 relative group">
      <div className="flex flex-col gap-2 sm:gap-3">
        <div className="flex flex-wrap items-start gap-2 sm:gap-4">
          <span className="text-gray-500 font-medium min-w-[20px] sm:min-w-[24px] text-sm sm:text-base">{number}.</span>
          <span
            className={`inline-flex items-center px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${getTypeColor()} shadow-sm`}
          >
            {getTypeLabel()}
          </span>
          <h2 className="basis-full sm:basis-0 sm:flex-1 text-base sm:text-xl text-gray-800 font-medium group-hover:text-gray-900">
            {title}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-gray-600 pl-0 sm:pl-[calc(24px+0.75rem)]">{authors.join("; ")}</p>
        {(publisher || event) && (
          <p className="text-sm sm:text-base text-gray-600 pl-0 sm:pl-[calc(24px+0.75rem)]">
            {publisher && `${publisher}${edition ? `, ${edition}` : ""}`}
            {event && `${event}${location ? `, ${location}` : ""}`}
            {proceedings && `, ${proceedings}`}
            {`, ${year}`}
            {pages && `, ${pages}`}
          </p>
        )}

        <div className="flex justify-end mt-2">
          {link && link !== "#" ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
            >
              <span className="group-hover:underline">{t("publications.view")}</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ) : (
            <span className="text-gray-500">{t("publications.no_link")}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export function Publications() {
  const [sortBy, setSortBy] = useState("year")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const { publications } = useProjects()
  const { t } = useLanguage()

  const sortedPublications = useMemo(() => {
    let filtered = publications

    if (filterType !== "all") {
      filtered = publications.filter((pub) => pub.type === filterType)
    }

    filtered = filtered.filter(
      (pub) =>
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    switch (sortBy) {
      case "webCitations":
        return [...filtered].sort((a, b) => (b.webCitations || 0) - (a.webCitations || 0))
      case "year":
        return [...filtered].sort((a, b) => Number(b.year) - Number(a.year))
      default:
        return filtered
    }
  }, [publications, sortBy, searchTerm, filterType])

  return (
    <main className="bg-gradient-to-b from-white to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center mb-16">
          {t("publications.title")}
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div>
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
                {t("publications.filter_label")}
              </label>
              <select
                id="filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="block w-full sm:w-auto px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 font-medium hover:border-gray-400 transition-colors duration-200"
              >
                <option value="all">{t("publications.filter_all")}</option>
                <option value="article">{t("publications.filter_articles")}</option>
                <option value="book">{t("publications.filter_books")}</option>
                <option value="chapter">{t("publications.filter_chapters")}</option>
                <option value="congress">{t("publications.filter_conference")}</option>
                <option value="conferenceAbstract">{t("publications.filter_abstract")}</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                {t("publications.sort_label")}
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full sm:w-auto px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 font-medium hover:border-gray-400 transition-colors duration-200"
              >
                <option value="year">{t("publications.sort_year")}</option>
                <option value="webCitations">{t("publications.sort_citations")}</option>
              </select>
            </div>
          </div>

          <Search
            onSearch={setSearchTerm}
            placeholder={t("publications.search_placeholder")}
            className="w-full sm:w-72"
            inputClassName="bg-white"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {sortedPublications.map((publication, index) => (
            <Publication key={index} {...publication} number={index + 1} />
          ))}

          {sortedPublications.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">{t("publications.no_results")}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
