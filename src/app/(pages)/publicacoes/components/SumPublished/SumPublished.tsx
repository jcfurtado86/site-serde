interface CongressProps {
  title: string
  authors: string[]
  event: string
  location: string
  proceedings: string
  year: string
  link?: string
}

function Congress({ title, authors, event, location, proceedings, year, link }: CongressProps) {
  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-8 flex flex-col min-h-[320px]">
      <div className="flex-1">
        <h2 className="text-2xl text-gray-800 font-bold mb-4 line-clamp-3 group-hover:text-blue-700 transition-colors duration-300">
          {title}
        </h2>
        
        <p className="text-base text-gray-600 mb-4">{authors.join("; ")}</p>
        
        <p className="text-base text-gray-600 mb-2">
          In: {event}, {year}, {location}.
        </p>
        
        <p className="text-base text-gray-600">
          {proceedings}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        {link && link !== "#" ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
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
          <span className="text-gray-500">
            Link não disponível
          </span>
        )}
      </div>
    </div>
  )
}

export function SumPublished() {
  const congresses: CongressProps[] = [
    {
      title: "A Methodology to Teaching Statistical Process Control for Software Engineers: An Overview",
      authors: ["FURTADO, Julio C.", "OLIVEIRA, S. R. B."],
      event: "40th International Conference on Software Engineering",
      location: "Gothenburg, Sweden",
      proceedings: "Proceedings of 40th ICSE",
      year: "2018",
      link: "#"
    },
    {
      title: "Spider-ACQ: Uma Ferramenta de Apoio à Gerência de Projetos de Aquisição",
      authors: ["FURTADO, Julio C.", "OLIVEIRA, Sandro Ronaldo Bezerra"],
      event: "WAMPS 2011 - Ferramentas",
      location: "Campinas - SP",
      proceedings: "Anais do WAMPS 2011",
      year: "2011",
      link: "#"
    },
    {
      title: "SPIDER - Um Suite de Ferramentas de Software Livre de Apoio à Implementação do Modelo MPS.BR",
      authors: [
        "OLIVEIRA, S. R. B.",
        "YOSHIDOME, E.",
        "LIRA, W.",
        "FURTADO, Julio C.",
        "NEIVA, J.",
        "ALHO, F. M.",
        "TELES, M. P.",
        "SOUZA, M.",
        "Mezzomo, L. P.",
        "ESTACIO, B. J. S.",
        "VALENTE, K.",
        "BALDEZ, G.",
        "OLIVEIRA, S.",
        "AFONSO, P."
      ],
      event: "VIII Encontro Anual de Computação",
      location: "Catalão - GO",
      proceedings: "Anais do VIII ENACOMP",
      year: "2010",
      link: "#"
    }
  ]

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 text-center mb-16">
          Resumos em Anais de Congressos
        </h2>
        
        {congresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {congresses.map((congress, index) => (
              <Congress key={index} {...congress} />
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-600 text-center">Nenhuma publicação encontrada.</p>
        )}
      </div>
    </main>
  )
}
