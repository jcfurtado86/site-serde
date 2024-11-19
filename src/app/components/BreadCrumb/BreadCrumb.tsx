import Link from 'next/link'

interface BreadcrumbProps {
  items: {
    label: string
    href: string
  }[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="w-full">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm md:text-base rounded-2xl border-2 border-gray-200 px-8 py-4">
          <li>
            <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
              </svg>
              <h1 className="text-blue-600  ml-2">Inicio</h1>
            </Link>
          </li>

          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
              <Link 
                href={item.href}
                className={`${
                  index === items.length - 1
                    ? 'text-gray-600 cursor-default'
                    : 'text-blue-600 hover:text-blue-800'
                } ml-1`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}