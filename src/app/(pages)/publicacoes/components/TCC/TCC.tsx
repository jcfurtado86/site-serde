interface TCCProps {
  title: string
  link: string
  student: string
  advisor: string
  year: string
}

function TCC({ title, link, student, advisor, year }: TCCProps) {
  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-8">
      <h2 className="text-2xl text-gray-800 font-bold mb-4 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300">
        {title}
      </h2>
      <p className="text-base text-gray-600 mb-2">Aluno: {student}</p>
      <p className="text-base text-gray-600 mb-6">
        Orientador: {advisor} - {year}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 w-fit"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Ver TCC
      </a>
    </div>
  )
}

export function TCCs() {
  const tccs: TCCProps[] = [
    {
      title: "Nome do TCC 1",
      link: "#",
      student: "Nome do Aluno",
      advisor: "Nome do Orientador",
      year: "2024",
    },
  ]

  return (
    <main id="tcc" className="bg-gradient-to-b from-white to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center mb-16">
          Trabalhos de Conclusão de Curso
        </h2>
        {tccs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tccs.map((tcc, index) => (
              <TCC key={index} {...tcc} />
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-600 text-center">Desculpe, nenhuma publicação.</p>
        )}
      </div>
    </main>
  )
}
