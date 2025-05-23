import Image from "next/image"

interface TeacherProps {
  name: string
  institution: string
  campus: string
  email: string
  curriculumLink: string
  imageUrl: string
}

function Teacher({ name, institution, campus, email, curriculumLink, imageUrl }: TeacherProps) {
  return (
    <div className="group bg-white rounded-xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
      {imageUrl ? (
        <div className="relative w-full h-[200px] sm:h-[280px] overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            width={400}
            height={400}
            loading="lazy"
            className="w-full h-full object-cover object-[center_35%] sm:object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ) : (
        <div className="relative w-full h-[200px] sm:h-[280px] bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      )}
      <div className="p-2 sm:p-6 flex flex-col flex-grow">
        <h2 className="text-sm sm:text-xl lg:text-2xl text-gray-800 font-bold mb-0.5 sm:mb-2 line-clamp-2 group-hover:text-gray-900 group-hover:brightness-125 transition-all duration-300">
          {name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">
          {institution} - {campus}
        </p>
        <div className="flex items-center justify-start gap-1 sm:gap-4 mt-auto">
          <a 
            href={`mailto:${email}`} 
            className="flex-1 text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1 sm:gap-2 py-1 sm:py-2 px-1.5 sm:px-3 rounded-lg hover:bg-blue-50 transition-all duration-300 text-xs sm:text-base"
          >
            <svg className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span className="whitespace-nowrap">Email</span>
          </a>
          <a 
            href={curriculumLink} 
            className="flex-1 text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1 sm:gap-2 py-1 sm:py-2 px-1.5 sm:px-3 rounded-lg hover:bg-blue-50 transition-all duration-300 text-xs sm:text-base" 
            target="_blank"
          >
            <svg className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span className="whitespace-nowrap">Lattes</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export function Docentes() {
  const teachers: TeacherProps[] = [
    {
      name: "Julio Cezar Costa Furtado",
      institution: "Unifap",
      campus: "Campus Unifap",
      email: "julio@unifap.br",
      curriculumLink: "http://lattes.cnpq.br/9175382702970383",
      imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4258925P6"
    },
    {
        name: "Rafael Pontes Lima",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "http://lattes.cnpq.br/3248608898278519",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4133837P0"
    },
    {
        name: "Adolfo Francesco de Oliveira Colares",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "http://lattes.cnpq.br/7694692886453388",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4202733D9"
    },
    {
        name: "Anderson dos Santos Guerra",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "http://lattes.cnpq.br/7801947090551930",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8583463P7"
    }
  ]

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white py-3 sm:py-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black text-center mb-3 sm:mb-16">
          Docentes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-8">
          {teachers.map((teacher, index) => (
            <Teacher key={index} {...teacher} />
          ))}
        </div>
      </div>
    </main>
  )
}