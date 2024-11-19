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
    <div className="bg-white rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={250}
          className="w-full h-[250px] object-cover"
        />
      ) : (
        <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center">
          <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
      <div className="p-6">
        <h2 className="text-xl text-gray-800 font-semibold mb-2 line-clamp-2">{name}</h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{institution} - {campus}</p>
        <div className="flex gap-4">
          <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-800 text-sm">Email</a>
          <a href={curriculumLink} className="text-blue-600 hover:text-blue-800 text-sm">Currículo Lattes</a>
        </div>
      </div>
    </div>
  )
}

export function ExStudents() {
  const students: ExStudentProps[] = [
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
    <main className="pt-10 bg-gray-50 mx-auto min-h-[60vh] mt-10 pb-10">
    <div className="max-w-7xl mx-auto px-4 py-8">
       <h2 className="text-4xl md:text-5xl mb-20 lg:text-6xl font-bold text-blue-900 mb-8 text-center">
          Egressos
        </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.map((student, index) => (
          <ExStudent key={index} {...student} />
        ))}
      </div>
    </div>
    </main>
  )
}