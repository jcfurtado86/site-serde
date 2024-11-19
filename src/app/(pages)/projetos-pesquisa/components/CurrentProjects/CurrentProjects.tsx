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
      <div className="mx-auto min-h-[60vh] mt-10 bg-gray-50 border-2 border-gray-200 flex flex-col items-center p-4 pb-16 sm:pb-24 md:pb-32 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl mt-10 mb-20 lg:text-6xl font-bold text-blue-900 mb-8 text-center">
            {title}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 flex flex-col min-h-[200px]">
                <div className="flex justify-start mb-4">
                  <span className="bg-blue-50 text-blue-500 text-sm px-3 py-1 rounded-full">
                    Em Andamento
                  </span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-600 mb-4">
                  {project.title}
                </h3>
                <div className="mt-auto flex items-center space-x-2">
                  <span className="text-sm text-gray-600 font-bold">Docente Responsável: </span>
                  <span className="text-blue-700 font-bold">{project.professor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div></div>
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