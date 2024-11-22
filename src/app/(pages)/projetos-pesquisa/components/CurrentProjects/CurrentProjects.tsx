interface Project {
    title: string
    professor: string
  }
  
  interface CurrentProjectsProps {
    title: string
    projects: Project[]
  }
  
  function CurrentProjects({ title, projects }: CurrentProjectsProps) {
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
                  <span className="bg-blue-100 text-blue-600 text-sm font-medium px-4 py-2 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                    Em Andamento
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 group-hover:text-blue-700 transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="mt-auto flex items-center space-x-3">
                  <span className="text-base text-gray-600 font-semibold">Docente Responsável:</span>
                  <span className="text-blue-600 font-bold">{project.professor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  export function CurrentProjectsList() {
    const projects: Project[] = [
      {
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        professor: "Julio"
      },
      {
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        professor: "Julio"
      },
      {
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        professor: "Julio"
      }
    ]
  
    return <CurrentProjects title="Projetos em Andamento" projects={projects} />
  }