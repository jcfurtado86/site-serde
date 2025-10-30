"use client"
import Link from "next/link"
interface Project {
  title: string
  professor: string
  status: string
  type: string
  link: string
}

interface CurrentProjectsProps {
  title?: string
  projects: Project[]
  className?: string
  link: string
}
const typeColors = [
  { type: "Extensão", color: "text-teal-600 bg-teal-100 group-hover:bg-teal-200" },
  { type: "Pesquisa", color: "text-purple-600 bg-purple-100 group-hover:bg-purple-200" },
  { type: "TCC", color: "text-orange-600 bg-orange-100 group-hover:bg-orange-200" },
]
export function AllProjectsList({ title, projects, className, link }: CurrentProjectsProps) {
  return (
    <div id={link} className={`bg-gradient-to-b from-gray-50 to-white py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center mb-16">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            return (
              <Link
                href={"/projetos/" + project.link || ""}
                key={index}
                className="group bg-white p-8 rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col min-h-[15rem]"
              >
                <div className="flex justify-start mb-6 gap-2">
                  <span
                    className={`${project.status == "Finalizado" ? `text-green-600 bg-green-100 group-hover:bg-green-200` : `text-yellow-600 bg-yellow-100 group-hover:bg-yellow-200`}  text-sm font-medium px-4 py-2 rounded-full  transition-colors duration-300}`}
                  >
                    {project.status}
                  </span>
                  <span
                    className={`${typeColors.find((type) => type.type === project.type)?.color || typeColors[0].color}  text-sm font-medium px-4 py-2 rounded-full  transition-colors duration-300`}
                  >
                    {project.type}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 group-hover:text-gray-900 group-hover:brightness-125 transition-all duration-300">
                  {project.title}
                </h3>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
