"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed w-full z-50">
      <div className="relative bg-gray-100 ">
        <div className="absolute inset-0  opacity-20"></div>

        <div className="relative container mx-auto px-6 py-3">
          <div className="flex justify-between items-center mb-1">
            <Image src="/image/serde-semfundo.png" alt="Logo" width={150} height={150} className="w-auto h-12 hidden md:block md:h-auto" />
            <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`text-gray-600 hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-blue-500 after:transition-transform after:duration-300 ${pathname === '/' ? 'after:scale-x-100 text-blue-600' : ''}`}
            >Início</Link>
                <Link 
                href="/projetos-pesquisa" 
                className={`text-gray-600 hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-blue-500 after:transition-transform after:duration-300 ${pathname === '/#solucoes' ? 'after:scale-x-100 text-blue-600' : ''}`}
                >Projetos de Pesquisa</Link>
                <Link 
                href="/recursos-humanos" 
                className={`text-gray-600 hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-blue-500 after:transition-transform after:duration-300 ${pathname === '/recursos-humanos' ? 'after:scale-x-100 text-blue-600' : ''}`}
                >Recursos Humanos</Link>
                <Link 
                href="/publicacoes" 
                className={`text-gray-600 hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-blue-500 after:transition-transform after:duration-300 ${pathname === '/publicações' ? 'after:scale-x-100 text-white' : ''}`}
                >Publicações</Link>
                <Link 
                href="/blog" 
                className={`text-gray-600 hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-blue-500 after:transition-transform after:duration-300 ${pathname === '/#precos' ? 'after:scale-x-100 text-white' : ''}`}
                >Blog</Link>
                <Link 
                href="/pages/QuemSomos" 
                className={`text-gray-600 hover:text-blue-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-blue-500 after:transition-transform after:duration-300 ${pathname === '/pages/QuemSomos' ? 'after:scale-x-100 text-white' : ''}`}
                >GitHub</Link>
                            </div>

            <button onClick={toggleMobileMenu} className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className={`fixed inset-0 z-50 bg-[#0A192F] transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center gap-2">
                  <div className="">
                    <Image
                      src="/image/serde-semfundo.png"
                      alt="Logo Judbr"
                      width={150}
                      height={150}
                      className="w-full h-auto brightness-0 invert"
                    />
                  </div>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-2">
                  <Link
                    href="/"
                    className="block text-white py-3 border-b border-white/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Início
                  </Link>
                  <Link
                    href="/projetos-pesquisa"
                    className="block text-white py-3 border-b border-white/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Projetos de Pesquisa
                  </Link>
                  <Link
                    href="/recursos-humanos"
                    className="block text-white py-3 border-b border-white/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Recursos Humanos
                  </Link>

                  <Link
                    href="/publicacoes"
                    className="block text-white py-3 border-b border-white/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Publicações
                  </Link>

                  <Link
                    href="/blog"
                    className="block text-white py-3 border-b border-white/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>

                  <Link
                    href="/pages/QuemSomos"
                    className="block text-white py-3 border-b border-white/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}