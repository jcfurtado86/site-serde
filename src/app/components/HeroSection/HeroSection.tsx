import Image from 'next/image'
import Link from 'next/link'
import { Settings } from "lucide-react"

export default function HeroSection() {
    return (
      <div className="relative bg-blue-950 min-h-screen flex items-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[900px] h-[900px] border border-blue-400/15 rounded-full"></div>
        <div className="absolute top-20 right-20 w-[700px] h-[700px] border-2 border-blue-400/15 rounded-full"></div>
        <div className="absolute top-40 right-40 w-[500px] h-[500px] border border-dashed border-blue-400/20 rounded-full"></div>
        <div className="absolute top-60 right-60 w-[300px] h-[300px] border-2 border-blue-400/15 rounded-full"></div>
        
        <div className="absolute -bottom-[500px] -left-[200px] w-[1200px] h-[1200px] border border-blue-400/15 rounded-full"></div>
        <div className="absolute -bottom-[300px] -left-[100px] w-[900px] h-[900px] border-2 border-blue-400/15 rounded-full"></div>
        <div className="absolute -bottom-[100px] left-0 w-[600px] h-[600px] border border-dashed border-blue-400/20 rounded-full"></div>
        
        <svg className="absolute inset-0 w-[300%] sm:w-[200%] h-[300%] sm:h-[200%] -translate-x-[33%] sm:-translate-x-[25%] -translate-y-[33%] sm:-translate-y-[25%] opacity-10 sm:opacity-20" viewBox="0 0 1000 1000">
          <path className="animate-drawLineInfinite" 
            d="M0 500 Q 250 500, 250 250 T 500 250 T 750 250 T 1000 250" 
            fill="none" 
            stroke="#60A5FA" 
            strokeWidth="1.5"
          />
          <path className="animate-drawLineInfinite delay-700" 
            d="M0 750 Q 250 750, 250 500 T 500 500 T 750 500 T 1000 500" 
            fill="none" 
            stroke="#93C5FD" 
            strokeWidth="1.5"
          />
          <path className="animate-drawLineInfinite delay-[1400ms]" 
            d="M250 0 L 250 1000" 
            fill="none" 
            stroke="#60A5FA" 
            strokeWidth="1.5"
          />
          <path className="animate-drawLineInfinite delay-[2100ms]" 
            d="M500 0 L 500 1000" 
            fill="none" 
            stroke="#93C5FD" 
            strokeWidth="1.5"
          />
          <path className="animate-drawLineInfinite delay-[2800ms]" 
            d="M750 0 L 750 1000" 
            fill="none" 
            stroke="#60A5FA" 
            strokeWidth="1.5"
          />
        </svg>

        <div className="absolute top-20 left-20 w-48 h-48 border border-blue-400/20 rounded-full"></div>
        <div className="absolute bottom-40 right-40 w-64 h-64 border-2 border-blue-400/20 rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 border border-blue-400/15 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 border-2 border-dashed border-blue-400/20 rounded-full"></div>
        <div className="absolute top-2/3 left-1/3 w-24 h-24 border border-blue-400/15 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 border-2 border-blue-400/15 rounded-full"></div>

        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl relative z-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-none tracking-tight">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-20 sm:h-20">
                  <Settings className="w-10 h-10 sm:w-20 sm:h-20 text-[#81CA6E] animate-spin-slow" />
                </div>
                <span className="text-white/90 text-4xl sm:text-6xl font-thin">|</span>
                <span>Projeto <span className="border-b-2 border-white">SERDE</span></span>
              </div>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-6 sm:mb-14 mt-4 sm:mt-10 leading-relaxed font-light max-w-3xl">
              Software Engineering: Research, Development and Education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link href="#sobre" className="inline-block px-6 sm:px-14 py-3 sm:py-5 bg-blue-100/10 backdrop-blur-sm border-2 border-blue-200/50 text-blue-50 text-sm sm:text-xl font-medium rounded-xl hover:bg-blue-100/20 hover:border-blue-300 hover:text-white hover:tracking-wider transition-all duration-300 ease-in-out text-center transform hover:scale-102 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95">
                Saiba Mais
              </Link>
            </div>
          </div>
          
          
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full filter blur-3xl opacity-10 -z-10"></div>
        </div>
      </div>
    )
  }