"use client"

import Link from "next/link"
import { useLanguage } from "@/app/i18n/context"

export default function Footer() {
  const { t } = useLanguage()

  const links = [
    { label: t("nav.projects"), href: "/projetos" },
    { label: t("nav.guidance"), href: "/orientacoes" },
    { label: t("nav.publications_patents"), href: "/publicacoes" },
    { label: t("nav.members"), href: "/membros" },
    { label: t("nav.partnerships"), href: "/parcerias" },
  ]

  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-10">
        {/* Desktop: row com logos à esquerda, links e contato à direita */}
        {/* Mobile: logos centralizados em cima, links e contato lado a lado embaixo */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 mb-8">
          {/* Logos */}
          <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="flex items-center gap-8">
              <a
                href="https://www.unifap.br/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Site da UNIFAP"
                className="h-[60px] sm:h-[80px]"
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
                className="h-[50px] sm:h-[70px]"
              >
                <img
                  src="/image/ccc-unifap-b.png"
                  alt="Logo CCC"
                  className="h-full w-auto object-contain"
                />
              </a>
            </div>
          </div>

          {/* Links e Contato - lado a lado no mobile, mantém posição no desktop */}
          <div className="grid grid-cols-2 sm:contents gap-8 px-4 sm:px-0">
            {/* Quick Links */}
            <div className="flex flex-col sm:ml-auto sm:mr-0">
              <h3 className="font-semibold text-gray-800 mb-3">{t("footer.quick_links")}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#1565C0] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact / External */}
            <div className="flex flex-col sm:items-start">
              <h3 className="font-semibold text-gray-800 mb-3">{t("footer.contact")}</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:furtado@unifap.br"
                    className="text-sm text-gray-600 hover:text-[#1565C0] transition-colors"
                  >
                    furtado@unifap.br
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/jcfurtado86/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-[#1565C0] transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="http://dgp.cnpq.br/dgp/espelhogrupo/1940170946115840"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-[#1565C0] transition-colors"
                  >
                    {t("about.cnpq_directory")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy;{new Date().getFullYear()} - SERDE/CCC/UNIFAP
          </p>
        </div>
      </div>
    </footer>
  )
}
