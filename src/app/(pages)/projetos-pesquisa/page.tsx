'use client'

import { ResearchLineList } from './components/ResearchLine/ReaserchLine'
import { CurrentProjectsList } from './components/CurrentProjects/CurrentProjects'
import { Breadcrumb } from '@/app/components/BreadCrumb/BreadCrumb'
import { CompletedProjectsList } from './components/CompletedProjects/CompletedProjects'
import { AllProjectsList } from './components/AllProjects/AllProjects'
import { useProjects } from '@/app/context/ProjectsContext'

export default function ProjetosPesquisa() {
  const { projects } = useProjects()
  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: 'Projetos de Pesquisa', href: '/projetos-pesquisa' }]} />
      <ResearchLineList className="bg-gradient-to-b from-gray-50 to-white" />
      {/*<CurrentProjectsList />
      <CompletedProjectsList />*/}
      <AllProjectsList
        title="Projetos de Pesquisa"
        projects={projects.filter((project) => project.type === 'pesquisa')}
      />
      <AllProjectsList
        title="Projetos de Extensão"
        projects={projects.filter((project) => project.type === 'extensao')}
      />
    </main>
  )
}
