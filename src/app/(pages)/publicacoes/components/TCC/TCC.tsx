interface TCCProps {
    title: string
    link: string
    student: string
    advisor: string
    year: string
  }
  
  function TCC({ title, link, student, advisor, year }: TCCProps) {
    return (
      <div className="bg-white rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 p-6">
        <h2 className="text-xl text-gray-800 font-semibold mb-4 line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-2">Aluno: {student}</p>
        <p className="text-sm text-gray-600 mb-4">Orientador: {advisor} - {year}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
          Ver TCC
        </a>
      </div>
    )
  }
  
  export function TCCs() {
    const tccs: TCCProps[] = [{
        title: "Nome do TCC 1",
        link: "#",
        student: "Nome do Aluno",
        advisor: "Nome do Orientador",
        year: "2024"
    }]
  
    return (
      <main className={`pt-10 bg-gray-50 mx-auto pb-10 ${tccs.length > 0 ? 'min-h-[50vh]' : 'min-h-[40vh]'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-4xl md:text-5xl mb-20 lg:text-6xl font-bold text-blue-900 mb-8 text-center">
            Trabalhos de Conclusão de Curso
          </h2>
          {tccs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tccs.map((tcc, index) => (
                <TCC key={index} {...tcc} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Desculpe, nenhuma publicação.</p>
          )}
        </div>
      </main>
    )
  }