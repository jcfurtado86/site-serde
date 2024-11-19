export default function HeroSection() {
    return (
      <div className="relative bg-blue-950 min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-20"></div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-none tracking-tight">
              Projeto <span className="border-b-2 border-white">SERDE</span>
            </h1>
            <p className="text-2xl text-blue-100 mb-14 mt-10 leading-relaxed font-light max-w-3xl">
              Software Engineering: Research, Development and Education
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#sobre" className="inline-block px-10 py-5 border-2 border-blue-200 text-blue-100 text-lg font-semibold rounded-xl hover:bg-blue-100 hover:text-blue-900 transition-all duration-300 ease-in-out text-center transform hover:scale-105">
                Saiba Mais
              </a>
            </div>
          </div>
          <div className="absolute -bottom-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        </div>
      </div>
    )
  }