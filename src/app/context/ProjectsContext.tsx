// app/context/ProjectsContext.js
'use client'; // Contextos que mantêm estado (useState) precisam ser Client Components.

import { createContext, useContext } from 'react';

// 1. Defina a interface (type) para seus projetos aqui, para manter tudo organizado.
export interface Project {
  title: string;
  professor: string;
  status: string;
  type: string;
}

// 2. Defina os dados que serão compartilhados.
const projectsData: Project[] = [
  {
    title:
      "Projeto SERDE - Software Engineering: Research, Development and Education",
    professor: "Julio",
    status: "Em andamento",
    type: "pesquisa",
  },
  {
    title:
      "Uma Metodologia Ágil para Gestão da Aquisição de Software e Serviços Correlatos",
    professor: "Julio",
    status: "Finalizado",
    type: "pesquisa",
  },
  {
    title: "Laboratório de Desenvolvimento de Software Aplicado ao Judiciário",
    professor: "Julio",
    status: "Em andamento",
    type: "extensao",
  },
];

// 3. Crie o Contexto
// O valor inicial aqui não é tão importante, pois o Provider irá sobrescrevê-lo.
const ProjectsContext = createContext<{ projects: Project[] }>({ projects: [] });

// 4. Crie o Componente Provider
// Este componente irá armazenar os dados e fornecer para a árvore de componentes.
export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  // Neste caso, os dados são estáticos, então não precisamos de um `useState`.
  // Se os projetos pudessem ser alterados (adicionados, removidos), usaríamos useState aqui.
  const value = { projects: projectsData };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

// 5. Crie um Hook customizado para facilitar o uso do contexto
// Isso evita ter que importar `useContext` e `ProjectsContext` em todos os componentes.
export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects deve ser usado dentro de um ProjectsProvider');
  }
  return context;
}
