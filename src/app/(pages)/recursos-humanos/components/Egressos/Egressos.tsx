import Image from "next/image"

interface ExStudentProps {
  name: string
  institution: string
  campus: string
  email: string
  curriculumLink: string
  imageUrl: string
}

function ExStudent({ name, institution, campus, email, curriculumLink, imageUrl }: ExStudentProps) {
  return (
    <div className="group bg-white rounded-xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
      {imageUrl ? (
        <div className="relative w-full h-[200px] sm:h-[260px] overflow-hidden">
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
        <div className="relative w-full h-[160px] sm:h-[260px] bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      )}
      <div className="p-3 sm:p-6 flex flex-col flex-grow">
        <h2 className="text-base sm:text-xl text-gray-800 font-bold mb-1 sm:mb-2 line-clamp-2 group-hover:text-gray-900 group-hover:brightness-125 transition-all duration-300">
          {name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">
          {institution} - {campus}
        </p>
        <div className="mt-auto">
          <a 
            href={curriculumLink} 
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg hover:bg-blue-50 transition-all duration-300 w-fit text-xs sm:text-base" 
            target="_blank"
          >
            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span className="whitespace-nowrap">Lattes</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export function ExStudents() {
  const students: ExStudentProps[] = [
    {
      name: "Aíla Taynara Santos Moreira Maciel",
      institution: "Unifap",
      campus: "Campus Unifap",
      email: "julio@unifap.br",
      curriculumLink: "http://lattes.cnpq.br/0285174097186394",
      imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2100157A0"
    },
    {
        name: "Carlos Eduardo Brito da Silva dos Santos",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "http://lattes.cnpq.br/7238237839067724",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8804965Z9"
    },
    {
        name: "Edson Monteiro Neto",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "http://lattes.cnpq.br/1270283553777603",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8151323E4"
    },
    {
        name: "Eduardo Luigi Tavares da Silva Ciuffi",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: " http://lattes.cnpq.br/8996710321421005",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2701533T0"
    },
    {
        name: "Erick da Cunha Sampaio",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "http://lattes.cnpq.br/3394751225824953",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8169200T6"
    },
    {
        name: "Gabriel Melo da Silveira",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "http://lattes.cnpq.br/1810258668918861",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8151934Y3"
    },
    {
        name: "Edson Monteiro Neto",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "http://lattes.cnpq.br/1270283553777603",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8151323E4"
    },
    {
        name: "Juliana Leal Alves",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "http://lattes.cnpq.br/4617405056839703",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8913815D6"
    },
    {
        name: "Luís César Martins Amaral",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "http://lattes.cnpq.br/8829459581349801",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2109801U5"
    },
    {
        name: "Mateus Bezerra da Silva",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "http://lattes.cnpq.br/0650268746194141",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8846994Y0"
    },
    {
        name: "Matheus Costa Silva",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "http://lattes.cnpq.br/9735600071757777",
        imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8972040P1"
    }, 
   
  ]

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white py-4 sm:py-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center mb-4 sm:mb-16">
          Egressos
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-8">
          {students.map((student, index) => (
            <ExStudent key={index} {...student} />
          ))}
        </div>
      </div>
    </main>
  )
}