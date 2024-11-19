import { ResearchLineList } from "./components/ResearchLine/ReaserchLine"
import { CurrentProjectsList } from "./components/CurrentProjects/CurrentProjects"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { CompletedProjectsList } from "./components/CompletedProjects/CompletedProjects"

export default function ProjetosPesquisa() {
    return (
        <main className="pt-20 bg-gray-50">
                <Breadcrumb 
                items={[
            { label: 'Projetos de Pesquisa', href: '/projetos-pesquisa' },
            ]} 
                />
            <ResearchLineList />
            <CurrentProjectsList />
            <CompletedProjectsList />
        </main>
    )
}