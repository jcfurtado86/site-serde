/*
Transformar essa pagina e uma listao,
usar tooltip para sinalizar o que é artigo
livro, ou outra coisa.


Mudar as cores da Hero, pedir pro julio enviar o png



*/


'use client'
import { useState, useMemo } from "react"
import { Search } from "@/app/components/SearcBar/Search"

interface ArticleProps {
  number: number
  title: string
  link: string
  participants: string[]
  year: number
  webCitations?: number
  scopusCitations?: number
  scieloCitations?: number
  jcrImpact?: number
  importance?: number
}

function Article({ number, title, link, participants }: ArticleProps) {
  return (
    <div className="border-b border-gray-200 py-4 sm:py-5 bg-gray-50/50 hover:bg-gray-100/80 transition-all duration-200 px-4 sm:px-6 -mx-4 sm:-mx-6 relative">
      <span className="absolute left-4 top-4 text-gray-500 font-medium">{number}.</span>
      <div className="pl-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl text-gray-800 font-medium hover:text-blue-700 transition-colors duration-200">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600">{participants.join(", ")}</p>
          
          <div className="flex justify-end mt-3">
            {link && link !== "#" ? (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-base sm:text-lg text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
              >
                <span className="group-hover:underline">Ver artigo</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ) : (
              <span className="text-base sm:text-lg text-gray-500">
                Link não disponível
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Articles() {
  const [sortBy, setSortBy] = useState("chronological")
  const [searchTerm, setSearchTerm] = useState("")
  const articles: ArticleProps[] = [
    {
      number: 6,
      title: "A evasão dos estudantes em cursos de computação: um estudo sobre a Universidade Federal do Amapá. CADERNO PEDAGÓGICO (LAJEADO. ONLINE), v. 21, p. e7820, 2024",
      link: "https://ojs.studiespublicacoes.com.br/ojs/index.php/cadped/article/view/7820",
      participants: ["SILVA, MATEUS BEZERRA DA", "FURTADO, STEPHANY DANTAS DE FREITAS", "FURTADO, Julio Cezar Costa"],
      year: 2024,
      importance: 1
    },
    {
      number: 10,
      title: "Desafios enfrentados por profissionais e empresas da área de t.i. durante a pandemia de covid-19 no Brasil. CADERNO PEDAGÓGICO (LAJEADO. ONLINE), v. 21, p. e3944, 2024",
      link: "#",
      participants: ["CIUFFI, E.", "FURTADO, S. D. F.", "FURTADO, Julio C."],
      year: 2024,
      importance: 2
    },
    {
      number: 5,
      title: "PROJ-O-POLY: um jogo de banco imobiliário de apoio ao ensino da gerência de projetos. CADERNO PEDAGÓGICO (LAJEADO. ONLINE), v. 21, p. e6306, 2024",
      link: "https://ojs.studiespublicacoes.com.br/ojs/index.php/cadped/article/view/6306",
      participants: ["SANTOS, CARLOS EDUARDO BRITO DA SILVA DOS", "FURTADO, STEPHANY DANTAS DE FREITAS", "GUERRA, ANDERSON DOS SANTOS", "FURTADO, Julio Cezar Costa"],
      year: 2024,
      importance: 3
    },
    {
      number: 15,
      title: "SPIDER: Uma Proposta de Solução Sistêmica de um SUITE de Ferramentas de Software Livre de Apoio à Implementação do Modelo MPS.BR. Revista do Programa Brasileiro da Qualidade e Produtividade em Software, v. 2, p. 103-107, 2011",
      link: "#",
      participants: ["OLIVEIRA, S. R. B.", "YOSHIDOME, E.", "LIRA, W.", "FURTADO, Julio C. C.", "NEIVA, J.", "TELES, M. P.", "BARROS, R. S.", "SOUZA, M.", "Mezzomo, L. P.", "ESTACIO, B. J. S.", "ALHO, F. M."],
      year: 2011,
      importance: 4
    },
    {
      number: 13,
      title: "Projeto SPIDER ? Software Process Improvement: DEvelopment and Research. Revista do Programa Brasileiro da Qualidade e Produtividade em Software, v. 3, p. 98-103, 2012",
      link: "#",
      participants: ["OLIVEIRA, S. R. B.", "PORTELA, C. S.", "YOSHIDOME, E.", "LIRA, W.", "FURTADO, Julio C. C.", "SOUZA, M.", "ALHO, F. M."],
      year: 2012,
      importance: 5
    },
    {
      number: 2,
      title: "Um estudo sobre as principais dificuldades na empregabilidade de um engenheiro de software. CONTRIBUCIONES A LAS CIENCIAS SOCIALES, v. 17, p. 1-21, 2024",
      link: "https://ojs.revistacontribuciones.com/ojs/index.php/clcs/article/view/5988",
      participants: ["MONTEIRO NETO, E.", "FURTADO, S. D. F.", "FURTADO, Julio C."],
      year: 2024,
      importance: 6
    },
    {
      number: 8,
      title: "An electrogram-guided transvenous temporary pacemaker implant simulator. PACE-PACING AND CLINICAL ELECTROPHYSIOLOGY, p. 1-9, 2023",
      link: "https://onlinelibrary.wiley.com/doi/10.1111/pace.14886",
      participants: ["KLEMZ, F. K.", "AMARAL, S. A. G.", "SANTOS, M. V. A.", "PINHEIRO, H. H. C.", "PEREIRA JUNIOR, A.", "FURTADO, Julio C.", "CALDAS, I. F. R.", "CHAVES, R. O."],
      year: 2023,
      importance: 7
    },
    {
      number: 1,
      title: "Uma abordagem focada no aluno para o ensino de engenharia de requisitos. CUADERNOS DE EDUCACIÓN Y DESARROLLO, v. 16, p. 264-282, 2024",
      link: "https://ojs.cuadernoseducacion.com/ojs/index.php/ced/article/view/2571",
      participants: ["GUERRA, ANDERSON DOS SANTOS", "FURTADO, Julio Cezar Costa"],
      year: 2024,
      importance: 8
    },
    {
      number: 7,
      title: "Apoio ao Ensino da Construção de Produto de Software a partir do uso de um RPG: o Jogo ConES. REVISTA EDUCAONLINE, v. 17, p. 100-115, 2023",
      link: "",
      participants: ["GUERRA, A.", "OLIVEIRA, Sandro Ronaldo Bezerra", "FURTADO, Julio C."],
      year: 2023,
      importance: 9
    },
    {
      number: 9,
      title: "An Experimental Evaluation of a Teaching Approach for Statistical Process Control in Computer Courses. INTERNATIONAL JOURNAL OF INFORMATION AND COMMUNICATION TECHNOLOGY EDUCATION, v. 17, p. 154-171, 2021",
      link: "https://www.igi-global.com/gateway/article/267730",
      participants: ["FURTADO, Julio C.", "OLIVEIRA, S. R. B.", "CHAVES, R. O.", "TELES, A.", "COLARES, A."],
      year: 2021,
      webCitations: 2,
      scopusCitations: 3,
      importance: 10
    },
    {
      number: 16,
      title: "WISE: Uma Abordagem Sistêmica Para Uso Na Avaliação MPS.BR. Traços (UNAMA), v. 11, p. 93-108, 2009",
      link: "",
      participants: ["FURTADO, Julio C.", "OLIVEIRA, Sandro Ronaldo Bezerra", "ALBUQUERQUE, Carlos Alberto C."],
      year: 2009,
      importance: 11
    },
    {
      number: 14,
      title: "Uma Proposta de Processo para Aquisição de Software e Serviços Correlatos Baseada no CMMI- ACQ e no Guia de Implementação do MPS.BR. Revista do Programa Brasileiro da Qualidade e Produtividade em Software, v. 3, p. 109-114, 2012",
      link: "",
      participants: ["FURTADO, Julio C.", "OLIVEIRA, Sandro Ronaldo Bezerra"],
      year: 2012,
      importance: 12
    },
    {
      number: 12,
      title: "A Process Framework for the Software and Related Services Acquisition Based on the CMMI-ACQ and the MPS.BR Acquisition Guide. Revista IEEE América Latina, v. 10, p. 2256-2262, 2012",
      link: "https://ieeexplore.ieee.org/document/6418130",
      participants: ["FURTADO, Julio C.", "OLIVEIRA, Sandro Ronaldo Bezerra"],
      year: 2012,
      importance: 13
    },
    {
      number: 3,
      title: "Um curriculum para ensino de melhoria do processo de software em cursos de computação. CADERNO PEDAGÓGICO (LAJEADO. ONLINE), v. 21, p. e3722, 2024",
      link: "https://ojs.studiespublicacoes.com.br/ojs/index.php/cadped/article/view/3722",
      participants: ["COLARES, ADOLFO FRANCESCO DE OLIVEIRA", "OLIVEIRA, Sandro Ronaldo Bezerra", "FURTADO, Julio Cezar Costa"],
      year: 2024,
      importance: 14
    },
    {
      number: 4,
      title: "Desafios enfrentados por profissionais e empresas da área de t.i. durante a pandemia de covid-19 no Brasil. CADERNO PEDAGÓGICO (LAJEADO. ONLINE), v. 21, p. e3944, 2024",
      link: "https://ojs.studiespublicacoes.com.br/ojs/index.php/cadped/article/view/3944",
      participants: ["CIUFFI, E.", "FURTADO, S. D. F.", "FURTADO, Julio C."],
      year: 2024,
      importance: 15
    },
    {
      number: 11,
      title: "Experimental Evaluation of a Serious Game for Teaching Software Process Modeling. IEEE Transactions on Education, p. 1-8, 2015",
      link: "https://ieeexplore.ieee.org/document/7072571",
      participants: ["CHAVES, R. O.", "GRESSE VON WANGENHEIM, C.", "FURTADO, Julio C.", "OLIVEIRA, Sandro Ronaldo Bezerra", "SANTOS, A.", "FAVERO, E. L."],
      year: 2015,
      webCitations: 30,
      scopusCitations: 35,
      importance: 16
    }
  ]

  const sortedArticles = useMemo(() => {
    switch (sortBy) {
      case "webCitations":
        return [...articles].sort((a, b) => (b.webCitations || 0) - (a.webCitations || 0));
      case "scopusCitations":
        return [...articles].sort((a, b) => (b.scopusCitations || 0) - (a.scopusCitations || 0));
      case "scieloCitations":
        return [...articles].sort((a, b) => (b.scieloCitations || 0) - (a.scieloCitations || 0));
      case "firstAuthor":
        return [...articles].sort((a, b) => a.participants[0].localeCompare(b.participants[0]));
      case "jcrImpact":
        return [...articles].sort((a, b) => (b.jcrImpact || 0) - (a.jcrImpact || 0));
      case "importance":
        return [...articles].sort((a, b) => (b.importance || 0) - (a.importance || 0));
      case "chronological":
      default:
        return [...articles].sort((a, b) => {
          if (b.year === a.year) {
            return a.number - b.number;
          }
          return b.year - a.year;
        });
    }
  }, [articles, sortBy]);

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 text-center mb-16">
          Artigos em Conferências
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="w-full sm:w-auto">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full sm:w-auto px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium hover:border-gray-400 transition-colors duration-200 [-webkit-appearance:none] [appearance:none]"
            >
              <option value="chronological">Ordem Cronológica</option>
              <option value="webCitations">Número de citações Web of science</option>
              <option value="scopusCitations">Número de citações Scopus</option>
              <option value="scieloCitations">Número de citações Scielo</option>
              <option value="firstAuthor">Primeiro autor</option>
              <option value="jcrImpact">Impacto JCR</option>
              <option value="importance">Ordem de Importância</option>
            </select>
          </div>

          <Search
            onSearch={setSearchTerm}
            placeholder="Buscar artigos..."
            className="w-full sm:w-72"
            inputClassName="bg-white"
          />
        </div>

        <div className="divide-y divide-gray-200">
          {sortedArticles
            .filter(article => 
              article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              article.participants.some(participant => 
                participant.toLowerCase().includes(searchTerm.toLowerCase())
              )
            )
            .map((article, index) => (
              <div
                key={index}
                className="transform transition-all duration-300 ease-in-out opacity-100 scale-100 translate-y-0"
              >
                <Article {...article} />
              </div>
            ))}
        </div>

        {sortedArticles.filter(article => 
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.participants.some(participant => 
            participant.toLowerCase().includes(searchTerm.toLowerCase())
          )
        ).length === 0 && (
          <div className="text-center py-10 animate-fade-in">
            <p className="text-gray-500 text-lg">
              Nenhum artigo encontrado para "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </main>
  )
}