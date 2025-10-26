"use client"
import { use } from "react"
import { useProjects } from "@/app/context/ProjectsContext"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { Project, TCCProps } from "@/app/context/ProjectsContext"
import { Lightbulb, CheckCircle, SquareUser as User, ExternalLink } from "lucide-react"
/**
 * Define o tipo das props que a página receberá.
 * O Next.js passa um objeto `params` contendo os segmentos dinâmicos da URL.
 * O nome da propriedade (`slug`) deve ser o mesmo do nome da pasta dinâmica (`[slug]`).
 */

type ProjectPageProps = {
  params: Promise<{
    projeto: string
  }>
}

interface ProjectProps {
  title: string
  link: string
  status: string
  type: string
  students: string[]
  professor: string
  year: string
  keywords: string[]
  description: string
}

function ProjectDetails({ project }: { project: ProjectProps }) {
  // Função auxiliar para determinar a cor do badge de status
  const getStatusClasses = () => {
    if (project.status.toLowerCase() === "finalizado") {
      return "bg-green-100 text-green-800"
    }
    if (project.status.toLowerCase() === "em andamento") {
      return "bg-yellow-100 text-yellow-800"
    }
    // Cor padrão para outros status
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
      <div className="p-8 md:p-12">
        {/* Seção do Título e Metadados */}
        <header>
          <p className="text-teal-600 font-semibold tracking-wide uppercase">Detalhes do Projeto</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {project.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            {/* Badge para o Tipo do Projeto */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Lightbulb />
              {project.type}
            </span>
            {/* Badge para o Status do Projeto */}
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses()}`}
            >
              <CheckCircle />
              {project.status}
            </span>
          </div>
        </header>

        <hr className="my-8 border-gray-200" />

        {/* Seção Sobre o TCC / Projeto*/}
        {project.type === "TCC" ? (
          <section className="flex flex-col gap-4">
            <p className="text-gray-700 leading-relaxed text-base">
              <strong>Alunos:</strong> {project?.students?.join(", ")}
            </p>

            <p className="text-gray-700 leading-relaxed text-base">
              <strong>Resumo:</strong> {project.description}
            </p>

            <p className="text-gray-700 leading-relaxed text-base">
              <strong>Palavras-chave:</strong> {project?.keywords}
            </p>
          </section>
        ) : (
          <section className="flex flex-col gap-4">
            <p className="text-gray-700 leading-relaxed text-base">
              <strong>Resumo:</strong> {project.description}
            </p>
          </section>
        )}
        <hr className="my-8 border-gray-200" />

        {/* Seção do orientador */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {project.type === "TCC" ? "Orientador" : "Professor Responsável"}
          </h2>
          <div className="flex items-center gap-3 text-gray-700">
            <User size={24} className="text-teal-500" />
            <span className="text-lg">{project.professor}</span>
          </div>
        </section>
        {/* Seção Sobre o Projeto */}

        <hr className="my-8 border-gray-200" />
      </div>
    </div>
  )
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { projects, tccs } = useProjects()

  const transformedTCCs: Project[] = tccs.map((tcc) => {
    // Constrói uma descrição a partir dos dados do TCC

    return {
      // Mapeamentos diretos
      title: tcc.title,
      link: tcc.link,
      // Mapeamento adaptado: 'advisor' vira 'professor'
      professor: tcc.advisor,
      students: tcc.students || [],
      keywords: tcc.keywords || [],
      description: tcc.description || "fake description",
      status: tcc.status, // Assumimos que TCCs listados estão concluídos
      type: "TCC", // Definimos o tipo como 'TCC' para fácil identificação
    }
  })

  // 2. Combina o array de projetos original com os TCCs transformados
  const mergedArray = [...projects, ...transformedTCCs]

  const resolvedParams = use(params)
  const projetoLink = resolvedParams.projeto
  const projeto: any | null = mergedArray.find((projeto) => projeto.link === projetoLink) || null

  return (
    <main className="pt-20 pb-16 min-h-[calc(100vh-5.6rem)]  bg-gray-50">
      <Breadcrumb
        items={[
          { label: "Projetos", href: "/projetos" },
          {
            label: projeto ? projeto.title : "Projeto não encontrado",
            href: "/projetos/" + projetoLink,
          },
        ]}
      />
      {projeto && <ProjectDetails project={projeto} />}
    </main>
  )
}
