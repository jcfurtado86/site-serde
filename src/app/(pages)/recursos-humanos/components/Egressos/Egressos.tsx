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
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          width={200}
          height={200}
          loading="lazy"
          className="w-full h-[300px] object-cover group-hover:scale-150 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <svg className="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
      <div className="p-8">
        <h2 className="text-2xl text-gray-800 font-bold mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">{name}</h2>
        <div className="flex gap-6">
           
          <a href={curriculumLink} className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2" target="_blank">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Currículo Lattes
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
    <main className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 text-center mb-16">
          Egressos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {students.map((student, index) => (
            <ExStudent key={index} {...student} />
          ))}
        </div>
      </div>
    </main>
  )
}