import { ParceiroProps } from "@/app/context/ProjectsContext"
import Image from "next/image"
import Link from "next/link"

// Ícone para indicar link externo, uma boa prática de UX.
const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
)

export const Parceria = ({ parceria }: { parceria: ParceiroProps }) => {
  return (
    <Link
      href={parceria.websiteURL}
      target="_blank"
      rel="noopener noreferrer"
      // [ESTILO] Classes base do card para consistência com o resto do site.
      // 'group' é a chave para a mágica do hover no ícone.
      className="group relative flex h-64 flex-col rounded-xl border border-gray-200 bg-white py-6 px-6 lg:px-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* [INTERATIVIDADE] Ícone de link externo que aparece no hover do card */}
      <div className="absolute right-5 top-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ExternalLinkIcon />
      </div>

      {/* Logo do Parceiro */}
      <div className="flex h-4/5 items-center justify-center">
        <Image
          width={96}
          height={96}
          src={parceria.logoURL}
          alt={`Logo de ${parceria.title}`}
          // object-contain garante que o logo não seja distorcido.
          className="h-full sm:h-24 md:h-28 lg:h-36 w-full object-contain"
        />
      </div>

      {/* Conteúdo de Texto */}
      <div className="flex flex-grow flex-col text-center">
        <h3 className="mt-4 text-lg md:text-xl font-bold text-gray-800">{parceria.title}</h3>
        {/* flex-grow faz a descrição ocupar o espaço disponível, alinhando o conteúdo em cards de alturas diferentes */}
        {/*<p className="flex-grow text-sm text-gray-600">{parceria.description}</p>*/}
      </div>
    </Link>
  )
}
