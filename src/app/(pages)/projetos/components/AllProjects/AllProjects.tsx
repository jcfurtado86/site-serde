"use client"
import Link from "next/link"
interface Project {
  title: string
  professor: string
  status: string
  type: string
  link: string
}

interface CurrentProjectsProps {
  title?: string
  projects: Project[]
  className?: string
  link: string
}
const typeColors = [
  { type: "Extensão", color: "text-teal-600 bg-teal-100 group-hover:bg-teal-200" },
  { type: "Pesquisa", color: "text-purple-600 bg-purple-100 group-hover:bg-purple-200" },
  { type: "TCC", color: "text-orange-600 bg-orange-100 group-hover:bg-orange-200" },
]
export function AllProjectsList({ title, projects, className, link }: CurrentProjectsProps) {
  return (
    <div id={link} className={`bg-gradient-to-b from-gray-50 to-white py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center mb-16">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            return (
              <Link
                href={"/projetos/" + project.link || ""}
                key={index}
                className="group bg-white p-8 rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col min-h-[15rem]"
              >
                <div className="flex justify-start mb-6 gap-2">
                  <span
                    className={`${project.status == "Finalizado" ? `text-green-600 bg-green-100 group-hover:bg-green-200` : `text-blue-600 bg-blue-100 group-hover:bg-blue-200`}  text-sm font-medium px-4 py-2 rounded-full  transition-colors duration-300}`}
                  >
                    {project.status}
                  </span>
                  <span
                    className={`${typeColors.find((type) => type.type === project.type)?.color || typeColors[0].color}  text-sm font-medium px-4 py-2 rounded-full  transition-colors duration-300`}
                  >
                    {project.type}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 group-hover:text-gray-900 group-hover:brightness-125 transition-all duration-300">
                  {project.title}
                </h3>
              </Link>
            )
            // else return <div></div>
          })}
        </div>
      </div>
    </div>
  )
}

// Trabalho de conclusão de curso de graduação

// 1.
// Alexsandro Nascimento Callins;Davi Alberto Correa do Carmo. UMA ANÁLISE DA APLICAÇÃO DE JOGOS PARA ENSINO DE PROGRAMAÇÃO BÁSICA A PARTIR DE UM MAPEAMENTO SISTEMÁTICO DA LITERATURA. 2025. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 2.
// Eduardo Rodrigues Nogueira. EDUGAMES: UM CATÁLOGO ONLINE DE JOGOS DIGITAIS EDUCATIVOS PARA O ENSINO DE COMPUTAÇÃO. 2025. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 3.
// Marco Antonio da Silva Neves Filho. MAPEAMENTO SISTEMÁTICO DE TÉCNICAS EMERGENTES DE PRÉ- PROCESSAMENTO PARA MITIGAÇÃO DE VIÉS EM DADOS DE TREINAMENTO. 2025. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 4.
// Luís César Martins Amaral. CLASSUP: UMA PLATAFORMA GAMIFICADA PARA AUXÍLIO DO APRENDIZADO UTILIZANDO QUIZZES. 2024. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 5.
// Eduardo Luigi Tavares da Silva Ciuffi. Desafios enfrentados por Profissionais e Empresas da Área de T.I. durante a pandemia de Covid-19 no Brasil. 2023. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 6.
// Felipe Monteiro Farias. Papel ou IDE: Uma análise sobre as formas de avaliação em turmas iniciantes de programação. 2023. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 7.
// Mateus Bezerra da Silva. A evasão em cursos de computação: Um estudo de caso na Universidade Federal do Amapá. 2023. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 8.
// Aíla Maciel. Um catálogo de práticas de IHC para aplicativos móveis. 2022. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 9.
// Gabriel Melo da Silveira. Uma Proposta de Identificação de Componentes Reutilizáveis Baseada em Interações de Classes. 2021. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 10.
// Matheus Costa Silva. Uma Ferramenta para Identificação Automática de Bad Smells. 2021. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 11.
// Juliana Leal Alves. Uma Análise Sobre Hard e Soft Skills na Engenharia de Software. 2021. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 12.
// Erick da Cunha Sampaio. Uma Abordagem para Ajustar o Controle de Versão à Natureza das Aplicações Web. 2021. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 13.
// Carlos Eduardo Brito. Proj-o-poly: Um Jogo para o Ensino de Gerenciamento de Projetos em Disciplinas de Engenharia de Software. 2020. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 14.
// Edson Monteiro Neto. Um Estudo sobre as Principais Dificuldades na Empregabilidade de um Engenheiros de Software. 2020. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.

// 15.
// Anderson Guerra. Uma Abordagem para o Ensino de Engenharia de Requisitos Focada no Aluno. 2019. Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Amapá. Orientador: Julio Cezar Costa Furtado.
