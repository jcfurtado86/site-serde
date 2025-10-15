"use client"
import { useState, useMemo } from "react"
import { Search } from "@/app/components/SearcBar/Search"
import { Tooltip } from "@/app/(pages)/publicacoes/components/Tooltip/Tooltip"
import { useProjects } from "@/app/context/ProjectsContext"
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
  const getTypeLabel = () => {
    switch (type) {
      case "article":
        return "Periódico"
      case "book":
        return "Livro"
      case "chapter":
        return "Capítulo de Livro"
      case "congress":
        return "Congresso"
      case "conferenceAbstract":
        return "Resumo em Congresso"
      case "patent":
        return "Patente"
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
    <div className="border-b border-gray-200 py-6 bg-white hover:bg-gray-50/80 transition-all duration-200 px-6 relative group">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <span className="text-gray-500 font-medium min-w-[24px]">{number}.</span>
          <span
            className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${getTypeColor()} shadow-sm`}
          >
            {getTypeLabel()}
          </span>
          <h2 className="flex-1 text-xl text-gray-800 font-medium group-hover:text-gray-900">
            {title}
          </h2>
        </div>
        <p className="text-base text-gray-600 pl-[calc(24px+0.75rem)]">{authors.join("; ")}</p>
        {(publisher || event) && (
          <p className="text-base text-gray-600 pl-[calc(24px+0.75rem)]">
            {publisher && `${publisher}${edition ? `, ${edition}` : ""}`}
            {event && `${event}, ${location}`}
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
              <span className="group-hover:underline">Ver publicação</span>
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
            <span className="text-gray-500">Link não disponível</span>
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
          Publicações
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div>
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por tipo:
              </label>
              <select
                id="filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="block w-full sm:w-auto px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 font-medium hover:border-gray-400 transition-colors duration-200"
              >
                <option value="all">Todos</option>
                <option value="article">Artigos</option>
                <option value="book">Livros</option>
                <option value="chapter">Capítulos</option>
                <option value="congress">Congressos</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full sm:w-auto px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 font-medium hover:border-gray-400 transition-colors duration-200"
              >
                <option value="year">Ano</option>
                <option value="webCitations">Citações</option>
              </select>
            </div>
          </div>

          <Search
            onSearch={setSearchTerm}
            placeholder="Buscar publicações..."
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
              <p className="text-gray-500 text-lg">Nenhuma publicação encontrada</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
