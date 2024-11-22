interface BookProps {
    title: string
    link: string
    authors: string[]
    publisher: string
    year: string
  }
  
  function Book({ title, link, authors, publisher, year }: BookProps) {
    return (
      <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-8">
        <h2 className="text-2xl text-gray-800 font-bold mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
          {title}
        </h2>
        <p className="text-base text-gray-600 mb-2">{authors.join(", ")}</p>
        <p className="text-base text-gray-600 mb-6">{publisher}, {year}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 w-fit">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          Ver livro
        </a>
      </div>
    )
  }
  
  export function Books() {
    const books: BookProps[] = [{
        title: "Nome do Livro 1",
        link: "#",
        authors: ["Autor 1", "Autor 2"],
        publisher: "Editora",
        year: "2024"
    }]
  
    return (
      <main className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 text-center mb-16">
            Livros
          </h2>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <Book key={index} {...book} />
              ))}
            </div>
          ) : (
            <p className="text-xl text-gray-600 text-center">Desculpe, nenhuma publicação.</p>
          )}
        </div>
      </main>
    )
  }