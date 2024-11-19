import Link from "next/link"

interface ResearchLineProps {
  title: string
  items: string[]
}

function ResearchLine({ title, items }: ResearchLineProps) {
  return (
    <div className="mx-auto min-h-[50vh] bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl mb-20 lg:text-6xl font-bold text-blue-900 mb-8 text-center">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <Link href="#" key={index} className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 flex flex-col min-h-[200px]">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <svg className="w-12 h-12 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-center text-gray-600 mt-auto">
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