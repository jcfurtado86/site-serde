import Image from 'next/image'
import Link from 'next/link'

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
        
        <svg className="absolute inset-0 w-[200%] h-[200%] -translate-x-[25%] -translate-y-[25%] opacity-20" viewBox="0 0 1000 1000">
          <path className="animate-drawLineInfinite" 
            d="M0 500 Q 250 500, 250 250 T 500 250 T 750 250 T 1000 250" 
            fill="none" 
            stroke="#60A5FA" 
            strokeWidth="2"
          />
          <path className="animate-drawLineInfinite delay-1000" 
            d="M0 750 Q 250 750, 250 500 T 500 500 T 750 500 T 1000 500" 
            fill="none" 
            stroke="#93C5FD" 
            strokeWidth="2"
          />
          <path className="animate-drawLineInfinite delay-[2000ms]" 
            d="M250 0 L 250 1000" 
            fill="none" 
            stroke="#60A5FA" 
            strokeWidth="2"
          />
          <path className="animate-drawLineInfinite delay-[3000ms]" 
            d="M500 0 L 500 1000" 
            fill="none" 
            stroke="#93C5FD" 
            strokeWidth="2"
          />
          <path className="animate-drawLineInfinite delay-[4000ms]" 
            d="M750 0 L 750 1000" 
            fill="none" 
            stroke="#60A5FA" 
            strokeWidth="2"
          />
          
          <circle className="animate-pulseConstant" cx="250" cy="250" r="4" fill="#93C5FD"/>
          <circle className="animate-pulseConstant delay-700" cx="500" cy="250" r="4" fill="#60A5FA"/>
          <circle className="animate-pulseConstant delay-500" cx="750" cy="250" r="4" fill="#93C5FD"/>
          <circle className="animate-pulseConstant delay-300" cx="250" cy="500" r="4" fill="#60A5FA"/>
          <circle className="animate-pulseConstant delay-1000" cx="500" cy="500" r="4" fill="#93C5FD"/>
          <circle className="animate-pulseConstant delay-200" cx="750" cy="500" r="4" fill="#60A5FA"/>
          <circle className="animate-pulseConstant delay-400" cx="250" cy="750" r="4" fill="#93C5FD"/>
          <circle className="animate-pulseConstant delay-600" cx="500" cy="750" r="4" fill="#60A5FA"/>
          <circle className="animate-pulseConstant delay-800" cx="750" cy="750" r="4" fill="#93C5FD"/>
        </svg>

        <div className="absolute top-20 left-20 w-48 h-48 border border-blue-400/20 rounded-full"></div>
        <div className="absolute bottom-40 right-40 w-64 h-64 border-2 border-blue-400/20 rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 border border-blue-400/15 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 border-2 border-dashed border-blue-400/20 rounded-full"></div>
        <div className="absolute top-2/3 left-1/3 w-24 h-24 border border-blue-400/15 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 border-2 border-blue-400/15 rounded-full"></div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl relative z-10">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-none tracking-tight">
              Projeto <span className="border-b-2 border-white">SERDE</span>
            </h1>
            <p className="text-2xl text-blue-100 mb-14 mt-10 leading-relaxed font-light max-w-3xl">
              Software Engineering: Research, Development and Education
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="#sobre" className="inline-block px-10 py-5 border-2 border-blue-200 text-blue-100 text-lg font-semibold rounded-xl hover:bg-blue-100 hover:text-blue-900 transition-all duration-300 ease-in-out text-center transform hover:scale-105">
                Saiba Mais
              </Link>
            </div>
          </div>
          
          
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full filter blur-3xl opacity-10 -z-10"></div>
        </div>
      </div>
    )
  }