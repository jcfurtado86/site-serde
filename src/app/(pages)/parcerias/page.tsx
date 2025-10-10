"use client"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { useProjects } from "@/app/context/ProjectsContext"
import { Parceria } from "@/app/(pages)/parcerias/components/Parceria"
export default function ProjetosPesquisa() {
  const { parcerias } = useProjects()
  return (
    <main className="pt-20 bg-gray-50">
      <Breadcrumb items={[{ label: "Parcerias", href: "/parcerias" }]} />
      <section className="bg-gradient-to-b from-gray-50 to-white py-3 sm:py-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black text-center mb-3 sm:mb-10">
            Parcerias
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-3">
            {parcerias.map((parceria, index) => (
              <Parceria key={index} parceria={parceria} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
