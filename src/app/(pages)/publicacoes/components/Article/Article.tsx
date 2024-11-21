import Image from "next/image"

interface ArticleProps {
  title: string
  link: string
  participants: string[]
}

function Article({ title, link, participants }: ArticleProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 p-6">
      <h2 className="text-xl text-gray-800 font-semibold mb-4 line-clamp-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{participants.join(", ")}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
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
    <main className={`pt-10 bg-gray-50 mx-auto pb-10 ${articles.length > 0 ? 'min-h-[40vh]' : 'min-h-[20vh]'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-4xl md:text-5xl mb-20 lg:text-6xl font-bold text-blue-900 mb-8 text-center">
          Artigos em Conferências
        </h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Article key={index} {...article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Desculpe, nenhuma publicação.</p>
        )}
      </div>
    </main>
  )
}