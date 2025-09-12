"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Nunito } from "next/font/google";
import { useProjects } from "@/app/context/ProjectsContext";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { projects } = useProjects();
  const defaultLinkStyle =
    "text-gray-600 hover:text-[#295984] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-[#4B5563] after:transition-transform after:duration-300";
  // 2. Referência para o link do tabmenu "Projetos de Pesquisa"
  const researchProjectsLinkRef = useRef<HTMLAnchorElement>(null);
  // 3. Estado para armazenar a largura do link
  const [dropdownWidth, setDropdownWidth] = useState("auto");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const researchProjects = useMemo(() => {
    const ongoing = projects.filter(
      (p) => p.type === "pesquisa" && p.status === "Em andamento",
    );
    const finished = projects.filter(
      (p) => p.type === "pesquisa" && p.status === "Finalizado",
    );
    return { ongoing, finished };
  }, [projects]);

  useEffect(() => {
    if (pathname === "/recursos-humanos") {
      const imageToPreload =
        "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K9052777Y7";
      const img = new window.Image();
      img.src = imageToPreload;
    }
    // 4. Calcular a largura do link ao montar o componente ou quando o pathname muda
    if (researchProjectsLinkRef.current) {
      setDropdownWidth(`${researchProjectsLinkRef.current.offsetWidth}px`);
    }
    // Opcional: Recalcular a largura se a janela for redimensionada
    const handleResize = () => {
      if (researchProjectsLinkRef.current) {
        setDropdownWidth(`${researchProjectsLinkRef.current.offsetWidth}px`);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  const createSlug = (title: string) => {
    return encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"));
  };

  return (
    <nav className="fixed w-full z-50">
      <div className="relative bg-gray-100 ">
        <div className="absolute inset-0  opacity-20"></div>

        <div className="relative container mx-auto px-6 py-3">
          <div className="flex justify-between items-center mb-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/image/serde-planta.png"
                alt="Logo"
                width={150}
                height={150}
                className="w-auto h-8 md:h-12"
              />
              <h1 className={`text-4xl mt-1 font-[Questrial] `}>
                <span style={{ color: "#000000" }}>s</span>
                <span style={{ color: "#000000" }}>e</span>
                <span style={{ color: "#1565C0" }}>r</span>
                <span style={{ color: "#2E7D32" }}>d</span>
                <span style={{ color: "#EF6C00" }}>e</span>
              </h1>
            </Link>

            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className={`${defaultLinkStyle} ${pathname === "/" ? "after:scale-x-100 text-[#295984]" : ""}`}
              >
                Início
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link
                  ref={researchProjectsLinkRef}
                  href="/projetos-pesquisa"
                  className={`${defaultLinkStyle} ${pathname === "/projetos-pesquisa" ? "after:scale-x-100 text-[#295984]" : ""}`}
                >
                  Projetos de Pesquisa
                </Link>
                {/* 6. Estrutura do Dropdown com efeitos e largura dinâmica */}
                <div
                  className={`
                                absolute top-full left-1/2 -translate-x-1/2 mt-2
                                bg-white rounded-md shadow-lg py-2 z-10 border border-gray-200
                                transition-all duration-300 ease-in-out origin-top
                                ${isDropdownOpen ? "max-h-screen opacity-100 pointer-events-auto scale-y-100" : "max-h-0 opacity-0 pointer-events-none scale-y-0"}
                              `}
                  style={{ width: dropdownWidth }} // 7. Aplicar a largura dinâmica aqui
                >
                  <div className="px-4 py-2">
                    <h3 className="font-bold text-sm text-gray-800 border-b pb-2 mb-2">
                      Em andamento
                    </h3>
                    {researchProjects.ongoing.length > 0 ? (
                      researchProjects.ongoing.map((project) => (
                        <Link
                          key={project.title}
                          href={`/projetos/${createSlug(project.title)}`}
                          className="block text-sm text-gray-600 hover:text-white hover:bg-[#295984] rounded-md px-3 py-2 transition-colors duration-200 "
                          title={project.title}
                          onClick={() => setIsDropdownOpen(false)} // Fecha ao clicar
                        >
                          {project.title}
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 px-3 py-1">
                        Nenhum projeto.
                      </p>
                    )}
                  </div>
                  <div className="px-4 py-2">
                    <h3 className="font-bold text-sm text-gray-800 border-b pb-2 mb-2">
                      Finalizados
                    </h3>
                    {researchProjects.finished.length > 0 ? (
                      researchProjects.finished.map((project) => (
                        <Link
                          key={project.title}
                          href={`/projetos/${createSlug(project.title)}`}
                          className="block text-sm text-gray-600 hover:text-white hover:bg-[#295984] rounded-md px-3 py-2 transition-colors duration-200"
                          title={project.title}
                          onClick={() => setIsDropdownOpen(false)} // Fecha ao clicar
                        >
                          {project.title}
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 px-3 py-1">
                        Nenhum projeto.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <Link
                href="/recursos-humanos"
                className={`${defaultLinkStyle} ${pathname === "/recursos-humanos" ? "after:scale-x-100 text-[#295984]" : ""}`}
              >
                Recursos Humanos
              </Link>
              <Link
                href="/publicacoes"
                className={`${defaultLinkStyle} ${pathname === "/publicacoes" ? "after:scale-x-100 text-[#295984]" : ""}`}
              >
                Publicações
              </Link>
              {/* <Link
                href="/blog"
                className={`text-gray-600 hover:text-[#295984] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-[#295984] after:transition-transform after:duration-300 ${pathname === '/blog' ? 'after:scale-x-100 text-[#295984]' : ''}`}
                >Blog</Link> */}
              <Link
                href="https://github.com/jcfurtado86/"
                target="_blank"
                className={`${defaultLinkStyle} ${pathname === "/pages/QuemSomos" ? "after:scale-x-100 text-[#295984]" : ""}`}
              >
                GitHub
              </Link>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
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
            } transition-transform duration-300 ease-in-out md:hidden`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center pl-2">
                  <Image
                    src="/image/serde-planta.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-auto h-8"
                  />
                  <h1 className={`text-4xl font-[Questrial] ml-2`}>
                    <span style={{ color: "#000000" }}>s</span>
                    <span style={{ color: "#000000" }}>e</span>
                    <span style={{ color: "#1565C0" }}>r</span>
                    <span style={{ color: "#2E7D32" }}>d</span>
                    <span style={{ color: "#EF6C00" }}>e</span>
                  </h1>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
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
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Início
                  </Link>
                  <Link
                    href="/projetos-pesquisa"
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Projetos de Pesquisa
                  </Link>
                  <Link
                    href="/recursos-humanos"
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Recursos Humanos
                  </Link>
                  <Link
                    href="/publicacoes"
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Publicações
                  </Link>
                  <Link
                    href="https://github.com/jcfurtado86/"
                    target="_blank"
                    className="block text-gray-600 hover:text-[#295984] py-3 px-2 transition-all duration-200 border-b border-gray-200"
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
