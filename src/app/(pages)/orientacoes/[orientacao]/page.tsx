"use client"
import { use } from "react"
import { useProjects } from "@/app/context/ProjectsContext"
import { Breadcrumb } from "@/app/components/BreadCrumb/BreadCrumb"
import { FileProps } from "@/app/context/ProjectsContext"
import { Lightbulb, CheckCircle, SquareUser as User, ExternalLink, LoaderIcon } from "lucide-react"
import Link from "next/link"

type OrientacaoPageProps = {
  params: Promise<{
    orientacao: string
  }>
}

function OrientacaoDetails({ tcc }: { tcc: any }) {
  const getStatusClasses = () => {
    switch (tcc.status.toLowerCase()) {
      case "finalizado":
        return "bg-green-100 text-green-600"
      case "em andamento":
        return "bg-yellow-100 text-yellow-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getDocType = (type: string) => {
    switch (type) {
      case "article":
        return "Artigo"
      case "video":
        return "Vídeo"
      default:
        return "Documento"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
      <div className="p-8 md:p-12">
        <header>
          <p className="text-teal-600 font-semibold tracking-wide uppercase">Detalhes da Orientação</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {tcc.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Lightbulb />
              {tcc.degree || "TCC"}
            </span>
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses()}`}
            >
              {tcc.status === "Finalizado" ? <CheckCircle /> : <LoaderIcon />}
              {tcc.status}
            </span>
          </div>
        </header>

        <hr className="my-8 border-gray-200" />

        <section className="flex flex-col gap-4">
          {tcc.year && (
            <p className="text-gray-700 leading-relaxed text-base">
              <strong>Ano de conclusão:</strong> {tcc.year}
            </p>
          )}
          <p className="text-gray-700 leading-relaxed text-base">
            <strong>Alunos:</strong> {tcc.students?.join(", ")}
          </p>
          {tcc.description && (
            <p className="text-gray-700 leading-relaxed text-base">
              <strong>Resumo:</strong> {tcc.description}
            </p>
          )}
          {tcc.keywords && (
            <p className="text-gray-700 leading-relaxed text-base">
              <strong>Palavras-chave:</strong> {tcc.keywords}
            </p>
          )}
        </section>

        <hr className="my-8 border-gray-200" />

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orientador</h2>
          <div className="flex items-center gap-3 text-gray-700">
            <User size={24} className="text-teal-500" />
            <span className="text-lg">{tcc.advisor}</span>
          </div>
        </section>

        {tcc.documentation && tcc.documentation.length > 0 && (
          <>
            <hr className="my-8 border-gray-200" />
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Materiais</h2>
              <div className="flex items-center gap-3 text-gray-700">
                {tcc.documentation.map((doc: FileProps, index: number) => (
                  <Link
                    target="_blank"
                    href={doc.link || "#"}
                    key={index}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink size={24} className="text-teal-500" />
                    {doc.name} ({getDocType(doc.type)})
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
        <hr className="my-8 border-gray-200" />
      </div>
    </div>
  )
}

export default function OrientacaoPage({ params }: OrientacaoPageProps) {
  const { tccs } = useProjects()

  const resolvedParams = use(params)
  const orientacaoLink = resolvedParams.orientacao
  const tcc = tccs.find((t) => t.link === orientacaoLink) || null

  return (
    <main className="pt-20 pb-16 min-h-[calc(100vh-5.6rem)] bg-gray-50">
      <Breadcrumb
        items={[
          { label: "Orientações", href: "/orientacoes" },
          {
            label: tcc ? tcc.title : "Orientação não encontrada",
            href: "/orientacoes/" + orientacaoLink,
          },
        ]}
      />
      {tcc && <OrientacaoDetails tcc={tcc} />}
    </main>
  )
}
