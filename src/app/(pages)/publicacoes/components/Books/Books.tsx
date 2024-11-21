interface BookProps {
    title: string
    link: string
    authors: string[]
    publisher: string
    year: string
  }
  
  function Book({ title, link, authors, publisher, year }: BookProps) {
    return (
      <div className="bg-white rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 p-6">
        <h2 className="text-xl text-gray-800 font-semibold mb-4 line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-2">{authors.join(", ")}</p>
        <p className="text-sm text-gray-600 mb-4">{publisher}, {year}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
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
      <main className={`border-2 border-gray-200 pt-10 bg-gray-50 mx-auto pb-10 ${books.length > 0 ? 'min-h-[50vh]' : 'min-h-[20vh]'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-4xl md:text-5xl mb-20 lg:text-6xl font-bold text-blue-900 mb-8 text-center">
            Livros
          </h2>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <Book key={index} {...book} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Desculpe, nenhuma publicação.</p>
          )}
        </div>
      </main>
    )
  }