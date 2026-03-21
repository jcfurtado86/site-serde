"use client"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { useProjects } from "@/app/context/ProjectsContext"
import { Parceria } from "@/app/(pages)/parcerias/components/Parceria"
import { useLanguage } from "@/app/i18n/context"
export default function ProjetosPesquisa() {
  const { parcerias } = useProjects()
  const { t } = useLanguage()
  return (
    <main className="pt-20 bg-gray-50 min-h-[calc(100vh-89px)]">
      <Breadcrumb items={[{ label: t("breadcrumb.partnerships"), href: "/parcerias" }]} />
      <section className="bg-gradient-to-b from-gray-50 to-white py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black text-center mb-6 sm:mb-16">
            {t("partnerships.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {parcerias.map((parceria, index) => (
              <Parceria key={index} parceria={parceria} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
