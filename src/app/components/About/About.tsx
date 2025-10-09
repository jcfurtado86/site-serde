"use client"

import Link from "next/link"
import { ResearchLineList } from "@/app/(pages)/projetos/components/ResearchLine/ReaserchLine"
import { AllProjectsList } from "@/app/(pages)/projetos/components/AllProjects/AllProjects"
import { useProjects } from "@/app/context/ProjectsContext"

// Um componente simples para os itens da lista, para evitar repetição
const ResultItem = ({ href, label }) => (
  <div className="text-center md:text-left">
    <span className="text-yellow-400 font-mono text-xl">...</span>
    <Link
      href={href}
      className="block mt-2 text-lg font-semibold text-white hover:text-yellow-300 transition-colors duration-300"
    >
      {label}
    </Link>
  </div>
)

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
            {/* antiga descricao */}
            {/*De acordo com a ACM / IEEE, a Engenharia de Software (ES) é uma disciplina interessada
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
            de software.*/}
            O Software Engineering: Research, Development, and Education (SERDE) é um grupo de
            pesquisa criado em 2016 na Universidade Federal do Amapá (UNIFAP), a partir da evolução
            de um projeto de pesquisa homônimo. O grupo nasceu do reconhecimento de que a formação
            acadêmica em Ciência da Computação, muitas vezes, não contempla de maneira suficiente a
            prática da Engenharia de Software, fazendo com que os profissionais aprendam suas
            principais atividades apenas no mercado de trabalho. Esse descompasso contribui para a
            falta de especialistas qualificados e para a dificuldade da indústria em encontrar
            profissionais preparados para atuar em processos de desenvolvimento de software. O SERDE
            tem como objetivo produzir conhecimento científico na área de Engenharia de Software, ao
            mesmo tempo em que desenvolve metodologias, ferramentas e práticas que aproximam a
            teoria da prática, favorecendo tanto o ensino quanto a aplicação profissional. O grupo
            também busca fortalecer a formação acadêmica, promovendo experiências que conectem
            estudantes a desafios reais, além de estimular a inovação tecnológica como motor de
            desenvolvimento regional e social. Um de seus diferenciais é ter surgido enraizado na
            realidade amazônica, com a convicção de que a qualidade de software e a transformação
            digital podem ser instrumentos para o desenvolvimento sustentável. Mais do que criar
            soluções tecnológicas, o SERDE se dedica a avaliar o impacto efetivo de seu uso,
            garantindo que a inovação produza resultados concretos para a sociedade e contribua para
            a construção de um ecossistema de conhecimento e inovação sólido na região.
          </p>
        </div>
        <section className={`bg-gray-800 text-white`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Coluna de Texto */}
              <div className="md:pr-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-12 text-center md:text-left">
                  RESULTADOS DE PESQUISAS
                </h2>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-10">
                  <ResultItem href="/publicacoes" label="Artigos Publicados" />
                  <ResultItem href="/publicacoes#tcc" label="TCCs Defendidos" />
                  <ResultItem href="/projetos" label="Projetos" />
                </div>
              </div>

              {/* Coluna da Imagem */}
              <div className="flex justify-center">
                <div className="p-3 bg-orange-500 rounded-lg shadow-2xl transform md:rotate-3 transition-transform duration-300 hover:rotate-0">
                  {/* URL aleatória como solicitado. Você pode substituir por uma imagem estática ou dinâmica */}
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                    alt="Equipe de pesquisa colaborando em um projeto"
                    className="rounded-md w-full h-full object-cover max-w-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*linhas de pesquisa*/}
        <ResearchLineList className="pt-2 bg-none" />

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
            href="http://dgp.cnpq.br/dgp/espelhogrupo/1940170946115840"
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
