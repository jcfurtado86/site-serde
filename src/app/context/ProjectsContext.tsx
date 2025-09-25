// app/context/ProjectsContext.js
"use client" // Contextos que mantêm estado (useState) precisam ser Client Components.

import { createContext, useContext } from "react"

interface TCCProps {
  title: string
  link: string
  status: string
  students: string[]
  advisor: string
  year: string
}

// 2. Defina os dados que serão compartilhados.

// 1. Defina a interface (type) para seus projetos aqui, para manter tudo organizado.
export interface Project {
  title: string
  description: string
  professor: string
  status: string
  type: string
  link: string
}

// 2. Defina os dados que serão compartilhados.
const tccs: TCCProps[] = [
  {
    title:
      "UMA ANÁLISE DA APLICAÇÃO DE JOGOS PARA ENSINO DE PROGRAMAÇÃO BÁSICA A PARTIR DE UM MAPEAMENTO SISTEMÁTICO DA LITERATURA",
    link: "#",
    status: "Finalizado",
    students: ["Alexsandro Nascimento Callins", "Davi Alberto Correa do Carmo"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2025",
  },
  {
    title: "EDUGAMES: UM CATÁLOGO ONLINE DE JOGOS DIGITAIS EDUCATIVOS PARA O ENSINO DE COMPUTAÇÃO",
    link: "#",
    status: "Finalizado",
    students: ["Eduardo Rodrigues Nogueira"],
    advisor: "Nome do Orientador",
    year: "2024",
  },

  {
    title:
      "MAPEAMENTO SISTEMÁTICO DE TÉCNICAS EMERGENTES DE PRÉ- PROCESSAMENTO PARA MITIGAÇÃO DE VIÉS EM DADOS DE TREINAMENTO",
    link: "#",
    status: "Em andamento",
    students: ["Marco Antonio da Silva Neves Filho"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2024",
  },
  {
    title: "CLASSUP: UMA PLATAFORMA GAMIFICADA PARA AUXÍLIO DO APRENDIZADO UTILIZANDO QUIZZES",
    link: "#",
    status: "Em andamento",
    students: ["Luís César Martins Amaral"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2024",
  },
  {
    title:
      "Desafios enfrentados por Profissionais e Empresas da Área de T.I. durante a pandemia de Covid-19 no Brasil",
    link: "#",
    status: "Em andamento",
    students: ["Eduardo Luigi Tavares da Silva Ciuffi"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2023",
  },
  {
    title:
      "Papel ou IDE: Uma análise sobre as formas de avaliação em turmas iniciantes de programação",
    link: "#",
    status: "Em andamento",
    students: [" Felipe Monteiro Farias"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2024",
  },
  {
    title: " A evasão em cursos de computação: Um estudo de caso na Universidade Federal do Amapá",
    link: "#",
    status: "Finalizado",
    students: ["Mateus Bezerra da Silva"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2023",
  },
  {
    title:
      "Um catálogo de práticas de IHC para aplicativos móveis. 2022. Trabalho de Conclusão de Curso",
    link: "#",
    status: "Finalizado",
    students: ["Aíla Maciel"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2023",
  },
  {
    title:
      "Uma Proposta de Identificação de Componentes Reutilizáveis Baseada em Interações de Classes",
    link: "#",
    status: "Finalizado",
    students: ["Gabriel Melo da Silveira"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2021",
  },
  {
    title: "Uma Ferramenta para Identificação Automática de Bad Smells",
    link: "#",
    status: "Finalizado",
    students: ["Matheus Costa Silva"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2021",
  },
  {
    title: "Uma Análise Sobre Hard e Soft Skills na Engenharia de Software",
    link: "#",
    status: "Finalizado",
    students: ["Juliana Leal Alves"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2023",
  },
  {
    title: "Uma Abordagem para Ajustar o Controle de Versão à Natureza das Aplicações Web",
    link: "#",
    status: "Finalizado",
    students: ["Erick da Cunha Sampaio"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2021",
  },
  {
    title:
      "Proj-o-poly: Um Jogo para o Ensino de Gerenciamento de Projetos em Disciplinas de Engenharia de Software",
    link: "#",
    status: "Finalizado",
    students: ["Carlos Eduardo Brito"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2020",
  },
  {
    title:
      "Um Estudo sobre as Principais Dificuldades na Empregabilidade de um Engenheiros de Software",
    link: "#",
    status: "Finalizado",
    students: ["Edson Monteiro Neto"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2020",
  },
  {
    title: "Uma Abordagem para o Ensino de Engenharia de Requisitos Focada no Aluno",
    link: "#",
    status: "Finalizado",
    students: ["Anderson Guerra"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2019",
  },
]
const projectsData: Project[] = [
  {
    title: "Projeto SERDE - Software Engineering: Research, Development and Education",
    description: "Descrição do projeto SERDE",
    professor: "Julio",
    status: "Em andamento",
    type: "pesquisa",
    link: "/projeto-serde",
  },
  {
    title: "Uma Metodologia Ágil para Gestão da Aquisição de Software e Serviços Correlatos",
    description: "Descrição da metodologia",
    professor: "Julio",
    status: "Finalizado",
    type: "pesquisa",
    link: "",
  },
  {
    title: "Laboratório de Desenvolvimento de Software Aplicado ao Judiciário",
    description: "Descrição do laboratório",
    professor: "Julio",
    status: "Em andamento",
    type: "extensao",
    link: "",
  },
]

// 3. Crie o Contexto
// O valor inicial aqui não é tão importante, pois o Provider irá sobrescrevê-lo.
const ProjectsContext = createContext<{ projects: Project[]; tccs: TCCProps[] }>({
  projects: [],
  tccs: [],
})

// 4. Crie o Componente Provider
// Este componente irá armazenar os dados e fornecer para a árvore de componentes.
export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  // Neste caso, os dados são estáticos, então não precisamos de um `useState`.
  // Se os projetos pudessem ser alterados (adicionados, removidos), usaríamos useState aqui.
  const value = { projects: projectsData, tccs: tccs }

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}

// 5. Crie um Hook customizado para facilitar o uso do contexto
// Isso evita ter que importar `useContext` e `ProjectsContext` em todos os componentes.
export function useProjects() {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error("useProjects deve ser usado dentro de um ProjectsProvider")
  }
  return context
}
