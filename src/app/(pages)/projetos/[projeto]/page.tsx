"use client"
import { use } from "react"
import { useProjects } from "@/app/context/ProjectsContext"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { Project } from "@/app/context/ProjectsContext"
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

/**
 * Este é o componente da página do projeto.
 * Ele recebe as props e extrai o `slug` de `params`.
 * @param {ProjectPageProps} props - As propriedades passadas pelo Next.js.
 * @returns JSX.Element
 */

// 2. O componente que renderiza os detalhes do projeto
//    Ele recebe o objeto 'project' como uma propriedade (prop).
function ProjectDetails({ project }: { project: Project }) {
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
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg my-12">
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

        {/* Seção Sobre o Projeto */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sobre o Projeto</h2>
          <p className="text-gray-700 leading-relaxed text-base">{project.description}</p>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Seção do Professor Responsável */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Professor Responsável</h2>
          <div className="flex items-center gap-3 text-gray-700">
            <User size={24} className="text-teal-500" />
            <span className="text-lg">{project.professor}</span>
          </div>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Seção do Link Externo / Chamada para Ação */}
        <footer>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-transform transform hover:scale-105 duration-300 shadow-md"
          >
            Acessar Página do Projeto
            <ExternalLink />
          </a>
        </footer>
      </div>
    </div>
  )
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { projects, tccs } = useProjects()

  const transformedTCCs: Project[] = tccs.map((tcc) => {
    // Constrói uma descrição a partir dos dados do TCC
    const description = `TCC desenvolvido por ${tcc.students.join(", ")} no ano de ${tcc.year}.`

    return {
      // Mapeamentos diretos
      title: tcc.title,
      link: tcc.link,

      // Mapeamento adaptado: 'advisor' vira 'professor'
      professor: tcc.advisor,

      // Campos gerados com valores padrão ou construídos
      description: description,
      status: tcc.status, // Assumimos que TCCs listados estão concluídos
      type: "TCC", // Definimos o tipo como 'TCC' para fácil identificação
    }
  })

  // 2. Combina o array de projetos original com os TCCs transformados
  const mergedArray = [...projects, ...transformedTCCs]

  const resolvedParams = use(params)
  const projetoLink = resolvedParams.projeto
  const projeto: Project | null =
    mergedArray.find((projeto) => projeto.link === projetoLink) || null

  return (
    <main className="pt-20 pb-px bg-gray-50">
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
