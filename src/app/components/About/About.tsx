"use client"

import Link from "next/link"
import { ResearchLineList } from "@/app/(pages)/projetos/components/ResearchLine/ReaserchLine"
import { AllProjectsList } from "@/app/(pages)/projetos/components/AllProjects/AllProjects"
import { useProjects } from "@/app/context/ProjectsContext"

export default function About() {
  const { projects } = useProjects()
  return (
    <div
      className="w-full bg-gradient-to-b from-gray-50 to-white flex flex-col items-center p-4 pb-2 pt-2 sm:p-6 sm:pb-4 sm:pt-4 lg:p-8 lg:pb-6 lg:pt-6"
      id="sobre"
    >
      <div className="max-w-[1240px] mx-auto pt-8 md:pt-6 pb-4 md:pb-2">
        <div className="text-center mb-8 md:mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 md:mb-4">
            Sobre o Grupo
          </h1>
          <p className="pt-5 text-gray-600 text-left text-sm sm:text-base lg:text-lg max-w-7xl mx-auto leading-relaxed pb-10">
            De acordo com a ACM / IEEE, a Engenharia de Software (ES) é uma disciplina interessada
            na aplicação de teoria, conhecimento e prática para o desenvolvimento eficaz e eficiente
            de sistemas de software que atendam aos requisitos dos usuários. Apesar da importância
            destes conhecimentos relativos às atividades da ES, pesquisam já verificaram que os
            profissionais aprendem mais sobre estas atividades durante o seu trabalho do que durante
            a sua formação e em geral, a indústria de software sofre com a falta de profissionais
            qualificados para trabalhar em atividades que envolvem o processo de desenvolvimento de
            software. Esta dificuldade em encontrar profissionais de Ciência da Computação com
            domínio dos tópicos da Engenharia de Software pode estar relacionada ao tipo de formação
            que estes receberam durante os anos de graduação. Assim, neste contexto, este projeto
            tem como objetivo desenvolver metodologias e ferramentas que auxiliem na aplicação e no
            ensino dos conteúdos da Engenharia de Software, seja no âmbito acadêmico ou na indústria
            de software.
          </p>
        </div>
        {/*linhas de pesquisa*/}
        <ResearchLineList className="pt-2 bg-none" />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center mb-10">
          Projetos
        </h2>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 text-center my-5">
          Finalizados
        </h2>
        <AllProjectsList
          projects={projects.filter((project) => project.status === "Finalizado")}
          className="!py-2 bg-none"
        />
        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 text-center my-5">
          Em andamento
        </h2>
        <AllProjectsList
          projects={projects.filter((project) => project.status === "Em andamento")}
          className="!py-2 bg-none mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <Link
            href="/projetos"
            className="group bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-blue-100 transition-colors">
                <svg
                  className="w-12 h-12 text-[#1565C0] group-hover:text-[#1565C0] transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-center mb-4 text-black">Projetos</h3>
            <p className="text-gray-600 text-center">
              Acesse aqui as linhas de pesquisa do grupo e os projetos de pesquisa em andamento e já
              encerrados
            </p>
          </Link>

          <Link
            href="/publicacoes"
            className="group bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-orange-50 p-4 rounded-xl group-hover:bg-orange-100 transition-colors">
                <svg
                  className="w-12 h-12 text-[#EF6C00] group-hover:text-[#EF6C00] transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-center mb-4 text-black">
              Publicações
            </h3>
            <p className="text-gray-600 text-center">
              Visualize as publicações geradas pelos integrantes do grupo de pesquisa, sejam elas
              artigos, livros, trabalhos de conclusão, dissertações e teses
            </p>
          </Link>

          <Link
            href="/publicacoes#tcc"
            className="group bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-blue-100 transition-colors">
                <svg
                  className="w-12 h-12 text-[#1565C0] group-hover:text-[#1565C0] transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-center mb-4 text-black">
              Orientações
            </h3>
            <p className="text-gray-600 text-center">
              Conheça os trabalhos de orientação em andamento e concluídos pelos docentes do grupo
              de pesquisa
            </p>
          </Link>
          <Link
            href="/equipe"
            className="group bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-50 p-4 rounded-xl group-hover:bg-green-100 transition-colors">
                <svg
                  className="w-12 h-12 text-[#2E7D32] group-hover:text-[#2E7D32] transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-center mb-4 text-black">Equipe</h3>
            <p className="text-gray-600 text-center">
              Esta página contém a lista de docentes e discentes que fazem parte do grupo, bem como
              a atuação de cada um nas pesquisas desenvolvidas
            </p>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="http://dgp.cnpq.br/dgp/espelhogrupo/0123456789"
            target="_blank"
            className="text-[#1565C0] hover:text-white inline-flex items-center gap-2 transition-all duration-300 border-2 border-[#1565C0] hover:bg-[#1565C0] rounded-lg px-6 py-3 mt-6 font-medium"
          >
            Diretório do Grupo no CNPq
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
