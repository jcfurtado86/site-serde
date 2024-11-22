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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Link href="#" key={index} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col min-h-[240px]">
              <div className="flex justify-center mb-8">
                <div className="bg-blue-100 p-5 rounded-2xl group-hover:bg-blue-200 transition-colors duration-300">
                  <svg className="w-14 h-14 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mt-auto group-hover:text-blue-700 transition-colors duration-300">
                {item}
              </h3>
            </Link>
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