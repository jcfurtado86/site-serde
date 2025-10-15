"use client"
import { useState, useMemo } from "react"
import { Search } from "@/app/components/SearcBar/Search" // Assumindo que o SearchBar é um componente genérico
import { useProjects } from "@/app/context/ProjectsContext" // Assumindo que o contexto agora também provê 'patents'

// 1. Interface específica para Patentes
interface PatentProps {
  number?: number
  title: string
  authors: string[]
  year: number | string
  link?: string
  patentNumber?: string
  registrationDate?: string
  registrationInstitution?: string
  patentType?: string
}

// 2. Componente de item individual, agora focado em Patente
function PatentComponent({
  title,
  authors,
  year,
  patentNumber,
  registrationDate,
  registrationInstitution,
  number,
}: PatentProps) {
  return (
    <div className="border-b border-gray-200 py-6 bg-white hover:bg-gray-50/80 transition-all duration-200 px-6 relative group">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <span className="text-gray-500 font-medium min-w-[24px]">{number}.</span>

          <h2 className="flex-1 text-xl text-gray-800 font-medium group-hover:text-gray-900">
            {title}
          </h2>
        </div>

        <p className="text-base text-gray-600 pl-[calc(24px+0.75rem)]">{authors.join("; ")}</p>

        {/* Seção de detalhes da patente, agora exibida diretamente */}
        <div className="text-base text-gray-600 pl-[calc(24px+0.75rem)] flex flex-col gap-1 pt-2">
          <p>
            <strong>Ano do Depósito:</strong> {year}
          </p>
          <p>
            {registrationInstitution && (
              <>
                <strong>Instituição de Registro:</strong> {registrationInstitution}
              </>
            )}
          </p>
          <p>
            {patentNumber && (
              <>
                <strong>Número do Registro:</strong> {patentNumber}
              </>
            )}
            {registrationDate && (
              <span className="ml-2 text-gray-500">(Data do Registro: {registrationDate})</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

// 3. Componente principal da página, agora chamado 'Patents'
export function Patents() {
  const [sortBy, setSortBy] = useState("year")
  const [searchTerm, setSearchTerm] = useState("")
  // O contexto agora deve fornecer um array de 'patents'
  const { patents } = useProjects()

  const sortedPatents = useMemo(() => {
    // A lógica de filtro por tipo foi removida
    let filtered = patents.filter(
      (patent) =>
        patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patent.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    // A ordenação por ano é mantida
    if (sortBy === "year") {
      return [...filtered].sort((a, b) => Number(b.year) - Number(a.year))
    }

    return filtered
  }, [patents, sortBy, searchTerm])

  return (
    <main className="bg-gradient-to-b from-white to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center mb-16">
          Patentes e Registros
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* O filtro por tipo foi removido */}
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
              {/* Outras opções de ordenação podem ser adicionadas aqui se necessário */}
            </select>
          </div>

          <Search
            onSearch={setSearchTerm}
            placeholder="Buscar patentes..."
            className="w-full sm:w-72"
            inputClassName="bg-white"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {sortedPatents.map((patent, index) => (
            // Passa os dados para o componente de item de patente
            <PatentComponent key={index} {...patent} number={index + 1} />
          ))}

          {sortedPatents.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Nenhuma patente encontrada</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
