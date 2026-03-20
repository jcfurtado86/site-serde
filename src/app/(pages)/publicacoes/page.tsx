import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { Publications } from "./components/Publications/Publications"
import { Patents } from "./components/Patent/Patents"

export default function ProjetosPesquisa() {
  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: "Publicações", href: "/publicacoes" }]} />
      <Publications />
      <Patents />
    </main>
  )
}
