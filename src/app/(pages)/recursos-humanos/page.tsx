import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { Docentes } from "./components/Docentes/Docentes"
import { Students } from "./components/Academicos/Academicos"
import { ExStudents } from "./components/Egressos/Egressos"
export default function ProjetosPesquisa() {
    return (
        <main className="pt-20 bg-gray-50">
                <Breadcrumb 
                items={[
            { label: 'Recursos Humanos', href: '/recursos-humanos' },
            ]} 
                />
                <Docentes />
                <Students />
                <ExStudents />
        </main>
    )
}