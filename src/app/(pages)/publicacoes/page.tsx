import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { Articles } from "./components/Article/Article"
import { Books } from "./components/Books/Books"
import { TCCs } from "./components/TCC/TCC"
import { SumPublished } from "./components/SumPublished/SumPublished"
import { Publications } from "./components/Publications/Publications"

export default function ProjetosPesquisa() {
    return (
        <main className="pt-20 bg-gray-50">
                <Breadcrumb 
                items={[
            { label: 'Publicações', href: '/publicacoes' },
            ]} 
                />
                <Articles />
                <Publications />
                <TCCs />
        </main>
    )
}