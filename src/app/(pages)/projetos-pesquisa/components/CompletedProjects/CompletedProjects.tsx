interface Project {
  title: string
  professor: string
  status: string
}

interface CompletedProjectsProps {
  title: string
  projects: Project[]
}

function CompletedProjects({ title, projects }: CompletedProjectsProps) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 text-center mb-16">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col min-h-[240px]">
              <div className="flex justify-start mb-6">
                  <span className={`${ project.status == 'Finalizado' ? `text-green-600 bg-green-100 group-hover:bg-green-200` : `text-blue-600 bg-blue-100 group-hover:bg-blue-200`   }  text-sm font-medium px-4 py-2 rounded-full  transition-colors duration-300}`}>
                  {project.status}
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 group-hover:text-blue-700 transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CompletedProjectsList() {
  const projects: Project[] = [
    {
      title: "Laboratório de Desenvolvimento de Software Aplicado ao Judiciário",
      professor: "Julio",
      status: "Em andamento"
    },
  ]

  return <CompletedProjects title="Projetos Extensão" projects={projects} />
}
