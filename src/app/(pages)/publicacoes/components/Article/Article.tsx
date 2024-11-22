import Image from "next/image"

interface ArticleProps {
  title: string
  link: string
  participants: string[]
}

function Article({ title, link, participants }: ArticleProps) {
  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-8">
      <h2 className="text-2xl text-gray-800 font-bold mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
        {title}
      </h2>
      <p className="text-base text-gray-600 mb-6">{participants.join(", ")}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 w-fit">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        Ver artigo
      </a>
    </div>
  )
}

export function Articles() {
  const articles: ArticleProps[] = [/**{
    title: "Nome do Artigo 1",
    link: "#",
    participants: ["Autor 1", "Autor 2", "Autor 3"]
  }*/]

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 text-center mb-16">
          Artigos em Conferências
        </h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Article key={index} {...article} />
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-600 text-center">Desculpe, nenhuma publicação.</p>
        )}
      </div>
    </main>
  )
}