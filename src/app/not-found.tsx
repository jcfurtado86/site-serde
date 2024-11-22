import Image from 'next/image'
import Link from 'next/link'
import { Settings } from "lucide-react"

export default function HeroSection() {
    return (
      <div className="relative bg-white min-h-screen flex items-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[900px] h-[900px] border border-gray-400/15 rounded-full"></div>
        <div className="absolute top-20 right-20 w-[700px] h-[700px] border-2 border-gray-400/15 rounded-full"></div>
        <div className="absolute top-40 right-40 w-[500px] h-[500px] border border-dashed border-gray-400/20 rounded-full"></div>
        <div className="absolute top-60 right-60 w-[300px] h-[300px] border-2 border-gray-400/15 rounded-full"></div>
        
        <svg className="absolute inset-0 w-[200%] h-[200%] -translate-x-[25%] -translate-y-[25%] opacity-20" viewBox="0 0 1000 1000">
          <path className="animate-drawLineInfinite" 
            d="M0 500 Q 250 500, 250 250 T 500 250 T 750 250 T 1000 250" 
            fill="none" 
            stroke="#9CA3AF" 
            strokeWidth="2"
          />
          <path className="animate-drawLineInfinite delay-1000" 
            d="M0 750 Q 250 750, 250 500 T 500 500 T 750 500 T 1000 500" 
            fill="none" 
            stroke="#D1D5DB" 
            strokeWidth="2"
          />
          <path className="animate-drawLineInfinite delay-[2000ms]" 
            d="M250 0 L 250 1000" 
            fill="none" 
            stroke="#9CA3AF" 
            strokeWidth="2"
          />
          <path className="animate-drawLineInfinite delay-[3000ms]" 
            d="M500 0 L 500 1000" 
            fill="none" 
            stroke="#D1D5DB" 
            strokeWidth="2"
          />
          <path className="animate-drawLineInfinite delay-[4000ms]" 
            d="M750 0 L 750 1000" 
            fill="none" 
            stroke="#9CA3AF" 
            strokeWidth="2"
          />
        </svg>

        <div className="absolute -bottom-[500px] -left-[200px] w-[1200px] h-[1200px] border border-gray-400/15 rounded-full"></div>
        <div className="absolute -bottom-[300px] -left-[100px] w-[900px] h-[900px] border-2 border-gray-400/15 rounded-full"></div>
        <div className="absolute -bottom-[100px] left-0 w-[600px] h-[600px] border border-dashed border-gray-400/20 rounded-full"></div>

        <div className="absolute top-20 left-20 w-48 h-48 border border-gray-400/20 rounded-full"></div>
        <div className="absolute bottom-40 right-40 w-64 h-64 border-2 border-gray-400/20 rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 border border-gray-400/15 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 border-2 border-dashed border-gray-400/20 rounded-full"></div>
        <div className="absolute top-2/3 left-1/3 w-24 h-24 border border-gray-400/15 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 border-2 border-gray-400/15 rounded-full"></div>

        <div className="relative container mx-auto px-4 sm:px-6 flex items-center justify-center">
          <div className="max-w-5xl relative z-10 text-center">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-blue-950 mb-4 sm:mb-6 leading-none tracking-tight">
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-20 sm:h-20">
                  <Settings className="w-10 h-10 sm:w-20 sm:h-20 text-blue-950 animate-spin-slow" />
                </div>
                <span className="text-blue-950/90 text-4xl sm:text-6xl font-thin">|</span>
                <span>404</span>
              </div>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-950 mb-6 sm:mb-14 mt-4 sm:mt-10 leading-relaxed font-light">
              Não encontramos a página que você está procurando
            </p>
            <div className="flex justify-center">
              <Link href="/" className="group inline-flex items-center gap-2 px-8 sm:px-14 py-4 sm:py-5 bg-blue-950/10 backdrop-blur-sm border-2 border-blue-950/30 text-blue-950 text-sm sm:text-xl font-medium rounded-xl hover:bg-blue-950/20 hover:border-blue-950/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span>Voltar para página principal</span>
              </Link>
            </div>
          </div>
          
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-gray-500 to-gray-600 rounded-full filter blur-3xl opacity-10 -z-10"></div>
        </div>
      </div>
    )
  }