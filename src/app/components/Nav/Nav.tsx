"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Nunito } from "next/font/google"
import { useLanguage } from "@/app/i18n/context"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function Nav() {
  const { t, toggle, locale } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const defaultLinkStyle =
    "text-gray-700 hover:text-[#295984] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-[#4B5563] after:transition-transform after:duration-300"
  // 2. Referência para o link do tabmenu "Projetos de Pesquisa"
  const researchProjectsLinkRef = useRef<HTMLAnchorElement>(null)
  // 3. Estado para armazenar a largura do link
  const [dropdownWidth, setDropdownWidth] = useState("auto")

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    // Calcular a largura do link ao montar o componente ou quando o pathname muda
    if (researchProjectsLinkRef.current) {
      setDropdownWidth(`${researchProjectsLinkRef.current.offsetWidth}px`)
    }
    // Opcional: Recalcular a largura se a janela for redimensionada
    const handleResize = () => {
      if (researchProjectsLinkRef.current) {
        setDropdownWidth(`${researchProjectsLinkRef.current.offsetWidth}px`)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [pathname])

  const createSlug = (title: string) => {
    return encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))
  }

  return (
    <nav className="fixed w-full z-50">
      <div className="relative bg-gray-100 ">
        <div className="absolute inset-0  opacity-20"></div>

        <div className="relative w-full mx-auto px-4 lg:px-6 py-3">
          <div className="flex justify-between items-center mb-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/image/serde-final-horizontal.png"
                alt="Logo"
                width={150}
                height={150}
                className="w-auto h-8 lg:h-12"
              />
            </Link>

            <div className="hidden lg:flex space-x-4 xl:space-x-8">
              <Link
                href="/"
                className={`${defaultLinkStyle} ${pathname === "/" ? "after:scale-x-100 text-[#295984]" : ""}`}
              >
                {t("nav.presentation")}
              </Link>
              <Link
                href="/projetos"
                className={`${defaultLinkStyle} ${pathname === "/projetos" || pathname?.startsWith("/projetos/") ? "after:scale-x-100 text-[#295984]" : ""}`}
              >
                {t("nav.projects")}
              </Link>

              <Link
                href="/orientacoes"
                className={`${defaultLinkStyle} ${pathname === "/orientacoes" || pathname?.startsWith("/orientacoes/") ? "after:scale-x-100 text-[#295984]" : ""}`}
              >
                {t("nav.guidance")}
              </Link>
              <Link
                href="/publicacoes"
                className={`${defaultLinkStyle} ${pathname === "/publicacoes" ? "after:scale-x-100 text-[#295984]" : ""}`}
              >
                {t("nav.publications_patents")}
              </Link>
              <Link
                href="/inovacao"
                className={`${defaultLinkStyle} ${pathname === "/inovacao" || pathname?.startsWith("/inovacao/") ? "after:scale-x-100 text-[#295984]" : ""}`}
              >
                {t("nav.innovation")}
              </Link>
              <Link
                href="/membros"
                className={`${defaultLinkStyle} ${pathname === "/membros" ? "after:scale-x-100 text-[#295984]" : ""}`}
              >
                {t("nav.members")}
              </Link>
              <Link
                href="/parcerias"
                className={`${defaultLinkStyle} ${pathname === "/parcerias" ? "after:scale-x-100 text-[#295984]" : ""}`}
              >
                {t("nav.partnerships")}
              </Link>
              {/* <Link
                href="/blog"
                className={`text-gray-600 hover:text-[#295984] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-[#295984] after:transition-transform after:duration-300 ${pathname === '/blog' ? 'after:scale-x-100 text-[#295984]' : ''}`}
                >Blog</Link> */}
              <Link
                href="https://github.com/jcfurtado86/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${defaultLinkStyle}`}
              >
                GitHub
              </Link>
              <button onClick={toggle} className="hover:scale-110 transition-transform" title={locale === "pt" ? "Switch to English" : "Mudar para Português"}>
                {locale === "pt" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 42" className="w-6 h-4 rounded-sm shadow-sm">
                    <rect width="60" height="42" fill="#009c3b"/>
                    <polygon points="30,4 56,21 30,38 4,21" fill="#ffdf00"/>
                    <circle cx="30" cy="21" r="9" fill="#002776"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-6 h-4 rounded-sm shadow-sm">
                    <clipPath id="us"><rect width="60" height="30"/></clipPath>
                    <g clipPath="url(#us)">
                      <rect width="60" height="30" fill="#B22234"/>
                      {[0,1,2,3,4,5,6].map(i => <rect key={i} y={i*4.6+2.3} width="60" height="2.3" fill="#fff"/>)}
                      <rect width="24" height="16" fill="#3C3B6E"/>
                    </g>
                  </svg>
                )}
              </button>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
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

          <div
            className={`fixed inset-0 z-50 bg-white transform ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out lg:hidden`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center pl-2">
                  <Image
                    src="/image/serde-final-horizontal.png"
                    alt="Logo"
                    width={150}
                    height={150}
                    className="w-auto h-8 lg:h-12"
                  />
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.home")}
                  </Link>
                  <Link
                    href="/projetos"
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.research_projects")}
                  </Link>
                  <Link
                    href="/orientacoes"
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.guidance")}
                  </Link>
                  <Link
                    href="/membros"
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.team")}
                  </Link>
                  <Link
                    href="/publicacoes"
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.publications_patents")}
                  </Link>
                  <Link
                    href="/inovacao"
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.innovation")}
                  </Link>
                  <Link
                    href="/parcerias"
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.partnerships")}
                  </Link>
                  <Link
                    href="https://github.com/jcfurtado86/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    GitHub
                  </Link>
                  <button onClick={toggle} className="w-full flex items-center gap-2 hover:scale-105 transition-transform py-3 px-2 border-b border-gray-200 text-gray-600" title={locale === "pt" ? "Switch to English" : "Mudar para Português"}>
                    {locale === "pt" ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 42" className="w-6 h-4 rounded-sm shadow-sm">
                          <rect width="60" height="42" fill="#009c3b"/>
                          <polygon points="30,4 56,21 30,38 4,21" fill="#ffdf00"/>
                          <circle cx="30" cy="21" r="9" fill="#002776"/>
                        </svg>
                        <span className="text-sm">Português</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-6 h-4 rounded-sm shadow-sm">
                          <clipPath id="us-m"><rect width="60" height="30"/></clipPath>
                          <g clipPath="url(#us-m)">
                            <rect width="60" height="30" fill="#B22234"/>
                            {[0,1,2,3,4,5,6].map(i => <rect key={i} y={i*4.6+2.3} width="60" height="2.3" fill="#fff"/>)}
                            <rect width="24" height="16" fill="#3C3B6E"/>
                          </g>
                        </svg>
                        <span className="text-sm">English</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
