import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-white py-8">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">

        {/* Logos */}
        <div className="flex items-center gap-6 sm:gap-12 md:gap-20 py-8">
          <a
            href="https://www.unifap.br/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Site da UNIFAP"
            className="h-[50px] sm:h-[80px]"
          >
            <img
              src="/image/unifap-h-b.png"
              alt="Logo Unifap"
              className="h-full w-auto object-contain"
            />
          </a>

          <a
            href="https://www2.unifap.br/ccomputacao/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Site do curso de Ciência da Computação da UNIFAP"
            className="h-[40px] sm:h-[60px]"
          >
            <img
              src="/image/ccc-unifap-b.png"
              alt="Logo CCC"
              className="h-full w-auto object-contain"
            />
          </a>
        </div>


        {/* Texto */}
        <p className="text-gray-700">
          ©{new Date().getFullYear()} - SERDE/CCC/UNIFAP
        </p>

      </div>
    </footer>
  )
}

