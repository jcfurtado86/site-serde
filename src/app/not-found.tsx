import Image from 'next/image'
import Link from 'next/link'
import { Settings } from "lucide-react"

export default function NotFound() {
    return (
      <div className="relative bg-white min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background leaves */}
        <div className="absolute inset-0 -z-10">
          {/* Green leaves */}
          <div className="absolute top-10 left-10 w-16 h-16 animate-float">
            <Image src="/image/folha-verde.png" alt="Folha verde" width={100} height={100} className="rotate-45 opacity-60" />
          </div>
          <div className="absolute bottom-20 right-32 w-20 h-20 animate-float-delay-2">
            <Image src="/image/folha-verde.png" alt="Folha verde" width={100} height={100} className="-rotate-12 opacity-70" />
          </div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 animate-float-delay-1">
            <Image src="/image/folha-verde.png" alt="Folha verde" width={100} height={100} className="rotate-90 opacity-50" />
          </div>
          
          {/* Blue leaves */}
          <div className="absolute top-32 right-20 w-14 h-14 animate-float-delay-3">
            <Image src="/image/folha-azul.png" alt="Folha azul" width={100} height={100} className="-rotate-45 opacity-60" />
          </div>
          <div className="absolute bottom-40 left-24 w-16 h-16 animate-float">
            <Image src="/image/folha-azul.png" alt="Folha azul" width={100} height={100} className="rotate-180 opacity-70" />
          </div>
          <div className="absolute top-1/3 right-1/3 w-10 h-10 animate-float-delay-2">
            <Image src="/image/folha-azul.png" alt="Folha azul" width={100} height={100} className="rotate-30 opacity-50" />
          </div>
          
          {/* Orange leaves */}
          <div className="absolute top-20 right-1/3 w-12 h-12 animate-float-delay-1">
            <Image src="/image/folha-laranja.png" alt="Folha laranja" width={100} height={100} className="rotate-15 opacity-60" />
          </div>
          <div className="absolute bottom-1/4 left-40 w-16 h-16 animate-float-delay-3">
            <Image src="/image/folha-laranja.png" alt="Folha laranja" width={100} height={100} className="-rotate-90 opacity-70" />
          </div>
          <div className="absolute top-3/4 right-1/4 w-14 h-14 animate-float">
            <Image src="/image/folha-laranja.png" alt="Folha laranja" width={100} height={100} className="rotate-60 opacity-50" />
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="text-center space-y-6 z-10">
        
          
          <p className="text-xl text-blue-950/70">
            Página não encontrada
          </p>

          <div className="mt-8">
            <Link 
              href="/" 
              className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-950/10 backdrop-blur-sm border-2 border-blue-950/30 text-blue-950 text-lg font-medium rounded-xl hover:bg-blue-950/20 hover:border-blue-950/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 rotate-180 group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span>Voltar para página principal</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }