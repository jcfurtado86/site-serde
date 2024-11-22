import Image from "next/image"

interface StudentProps {
  name: string
  institution: string
  campus: string
  email: string
  curriculumLink: string
  imageUrl: string
}

function Student({ name, institution, campus, email, curriculumLink, imageUrl }: StudentProps) {
  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={300}
          className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
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
        <p className="text-base text-gray-600 mb-6 line-clamp-2">{institution} - {campus}</p>
        <div className="flex gap-6">
          <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Email
          </a>
          <a href={curriculumLink} className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
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

export function Students() {
  const students: StudentProps[] = [
    {
      name: "Julio",
      institution: "Unifap",
      campus: "Campus Unifap",
      email: "julio@unifap.br",
      curriculumLink: "#",
      imageUrl: ""
    },
    {
        name: "Julio",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "#",
        imageUrl: ""
    },
    {
        name: "Julio",
        institution: "Unifap",
        campus: "Campus Unifap",
        email: "julio@unifap.br",
        curriculumLink: "#",
        imageUrl: ""
    }
  ]

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 text-center mb-16">
          Acadêmicos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((student, index) => (
            <Student key={index} {...student} />
          ))}
        </div>
      </div>
    </main>
  )
}