import Link from "next/link"

interface ResearchLineProps {
  title: string
  items: string[]
}

function ResearchLine({ title, items }: ResearchLineProps) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 text-center mb-16">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 group">
              <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ResearchLineList() {
  const items: string[] = [
    'Engenharia de Software',
    'Engenharia de Software',
    'Engenharia de Software',
    'Engenharia de Software',
    'Engenharia de Software'
  ]

  return <ResearchLine title="Linhas de Pesquisa" items={items} />
}