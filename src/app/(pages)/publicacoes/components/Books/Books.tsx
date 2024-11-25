interface BookProps {
    type: 'book' | 'chapter'
    title: string
    authors: string[]
    publisher: string
    year: string
    pages?: string
    edition?: string
    organizers?: string
    link?: string
  }
  
  function Book({ type, title, authors, publisher, year, pages, edition, organizers, link }: BookProps) {
    return (
      <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-8 flex flex-col min-h-[320px]">
        <div className="flex-1">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
            {type === 'book' ? 'Livro' : 'Capítulo'}
          </span>
          
          <h2 className="text-2xl text-gray-800 font-bold mb-4 line-clamp-3 group-hover:text-blue-700 transition-colors duration-300">
            {title}
          </h2>
          
          <p className="text-base text-gray-600 mb-2">{authors.join(", ")}</p>
          
          {organizers && (
            <p className="text-base text-gray-600 mb-2">
              In: {organizers}
            </p>
          )}
          
          <p className="text-base text-gray-600">
            {publisher}
            {edition && `, ${edition}`}
            {`, ${year}`}
            {pages && `, ${pages}`}
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
  
  export function Books() {
    const books: BookProps[] = [
      {
        type: 'book',
        title: "Abordagens para Apoio à Implementação da Melhoria do Processo de Software",
        authors: ["OLIVEIRA, S. R. B.", "VASCONCELOS, A. M. L.", "FURTADO, Julio C."],
        publisher: "Editora UFPE",
        edition: "1. ed",
        year: "2016",
        pages: "562p",
        link: "#"
      },
      {
        type: 'chapter',
        title: "PROJ-O-POLY: UM JOGO DE BANCO IMOBILIÁRIO DE APOIO AO ENSINO DA GERÊNCIA DE PROJETOS",
        authors: ["BRITO, C. E.", "FURTADO, S. D. F.", "GUERRA, A.", "FURTADO, Julio C."],
        organizers: "Anderson Catapan. (Org.)",
        publisher: "Current practices and strategies",
        edition: "1ed",
        year: "2024",
        pages: "p. 25-",
        link: "#"
      }
    ]
  
    return (
      <main className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 text-center mb-16">
            Livros e Capítulos
          </h2>
          
          {books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <Book key={index} {...book} />
              ))}
            </div>
          ) : (
            <p className="text-xl text-gray-600 text-center">Nenhuma publicação encontrada.</p>
          )}
        </div>
      </main>
    )
  }