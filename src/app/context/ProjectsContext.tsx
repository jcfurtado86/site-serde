// app/context/ProjectsContext.js
"use client" // Contextos que mantêm estado (useState) precisam ser Client Components.
import { createContext, useContext } from "react"

interface PublicationProps {
  type: "article" | "book" | "chapter" | "congress" | "conferenceAbstract" | "patent"
  number?: number
  title: string
  authors: string[]
  year: number | string
  link?: string
  publisher?: string
  edition?: string
  pages?: string
  event?: string
  location?: string
  proceedings?: string
  webCitations?: number
  scopusCitations?: number
  scieloCitations?: number
  jcrImpact?: number
  importance?: number

  // --- Campos Opcionais para Patentes ---
  patentNumber?: string // Ex: "BR512021001576-2"
  registrationDate?: string // Ex: "30/10/2020"
  registrationInstitution?: string // Ex: "INPI - Instituto Nacional da Propriedade Industrial"
  patentType?: string
}

interface PatentProps {
  number?: number
  title: string
  authors: string[]
  year: number | string
  link?: string
  patentNumber?: string // Ex: "BR512021001576-2"
  registrationDate?: string // Ex: "30/10/2020"
  registrationInstitution?: string // Ex: "INPI - Instituto Nacional da Propriedade Industrial"
  patentType?: string
}

interface StudentProps {
  name: string
  institution: string
  campus: string
  email: string
  curriculumLink: string
  imageUrl: string
  type: string
}

interface TeacherProps {
  name: string
  institution: string
  campus: string
  email: string
  curriculumLink: string
  imageUrl: string
}

interface TCCProps {
  title: string
  link: string
  status: string
  students: string[]
  advisor: string
  year: string
}

export interface Project {
  title: string
  description: string
  professor: string
  status: string
  type: string
  link: string
}

export interface ParceiroProps {
  title: string
  description: string
  logoURL: string
  websiteURL: string
}

const patents: PatentProps[] = [
  {
    authors: ["COSTA, E. S.", "LIMA, R. P.", "FURTADO, Julio C. C."],
    title: "Plataforma do Quintal",
    year: "2020",
    patentNumber: "BR512021001576-2",
    registrationDate: "30/10/2020",
    registrationInstitution: "INPI - Instituto Nacional da Propriedade Industrial",
    patentType: "Programa de Computador",
  },
  {
    authors: ["LIMA, R. P.", "SILVA, N. G.", "FURTADO, Julio C.", "MELO, A. M. S.", "SILVA, J. G."],
    title: "Plataforma WEB AGROWIK",
    year: 2021,
    patentNumber: "BR512021001558-4",
    registrationDate: "05/06/2021",
    registrationInstitution: "INPI - Instituto Nacional da Propriedade Industrial",
    patentType: "Programa de Computador",
  },
  {
    authors: ["FURTADO, Julio C.", "GUERRA, A.", "MARTINS, L."],
    title: "ClassUp: Uma Plataforma Gamificada Para Auxílio Do Aprendizado Utilizando Quizzes",
    year: 2025,
    patentNumber: "BR512025001279-9",
    registrationDate: "08/04/2025",
    registrationInstitution: "INPI - Instituto Nacional da Propriedade Industrial",
    patentType: "Programa de Computador",
  },
  {
    authors: ["FURTADO, Julio C.", "SILVA, M. C."],
    title: "JSniffer - Uma Ferramenta Para Identificação Automática De Bad Smells",
    year: 2025,
    patentNumber: "BR512025001280-2",
    registrationDate: "08/04/2025",
    registrationInstitution: "INPI - Instituto Nacional da Propriedade Industrial",
    patentType: "Programa de Computador",
  },
  {
    authors: ["FURTADO, Julio C.", "GUERRA, A."],
    title: "Plataforma de Gestão de Concursos e Processos Seletivos do DEPSEC/UNIFAP",
    year: 2025,
    patentNumber: "BR512025001281-0",
    registrationDate: "08/04/2025",
    registrationInstitution: "INPI - Instituto Nacional da Propriedade Industrial",
    patentType: "Programa de Computador",
  },
  {
    authors: ["NOGUEIRA, E. R.", "FURTADO, Julio C."],
    title: "EduGames",
    year: 2025,
    patentNumber: "BR512025003392-3",
    registrationDate: "22/04/2025",
    registrationInstitution: "INPI - Instituto Nacional da Propriedade Industrial",
    patentType: "Programa de Computador",
  },
]

const publications: PublicationProps[] = [
  // Livros
  {
    type: "book",
    title: "Abordagens para Apoio à Implementação da Melhoria do Processo de Software",
    authors: ["OLIVEIRA, S. R. B.", "VASCONCELOS, A. M. L.", "FURTADO, Julio C."],
    publisher: "Editora UFPE",
    edition: "1. ed",
    year: "2016",
    pages: "562p",
    link: "#",
  },
  {
    type: "chapter",
    title: "PROJ-O-POLY: UM JOGO DE BANCO IMOBILIÁRIO DE APOIO AO ENSINO DA GERÊNCIA DE PROJETOS",
    authors: ["BRITO, C. E.", "FURTADO, S. D. F.", "GUERRA, A.", "FURTADO, Julio C."],
    publisher: "Current practices and strategies",
    edition: "1ed",
    year: "2024",
    pages: "p. 25-",
    link: "#",
  },
  //articles
  {
    authors: ["CALLINS, A. M. N.", "CARMO, D. A. C.", "FURTADO, Julio C."],
    title:
      "UMA ANÁLISE DA APLICAÇÃO DE JOGOS PARA ENSINO DE PROGRAMAÇÃO BÁSICA A PARTIR DE UM MAPEAMENTO SISTEMÁTICO DA LITERATURA",
    publisher: "ARACÊ - DIREITOS HUMANOS EM REVISTA",
    edition: "7", // Alterado de 'volume'
    pages: "2872-2894",
    year: "2025",
    link: "http://dx.doi.org/10.56238/arev7n1-176",
    type: "article",
  },
  {
    authors: ["GUERRA, ANDERSON DOS SANTOS", "FURTADO, Julio Cezar Costa"],
    title: "Uma abordagem focada no aluno para o ensino de engenharia de requisitos",
    publisher: "CUADERNOS DE EDUCACIÓN Y DESARROLLO",
    edition: "16", // Alterado de 'volume'
    pages: "264-282",
    year: "2024",
    link: "http://dx.doi.org/10.55905/cuadv16n1-015",
    type: "article",
  },
  {
    authors: ["MONTEIRO NETO, E.", "FURTADO, S. D. F.", "FURTADO, Julio C."],
    title:
      "Um estudo sobre as principais dificuldades na empregabilidade de um engenheiro de software",
    publisher: "CONTRIBUCIONES A LAS CIENCIAS SOCIALES",
    edition: "17", // Alterado de 'volume'
    pages: "1-21",
    year: "2024",
    link: "http://dx.doi.org/10.55905/revconv.17n.3-298",
    type: "article",
  },
  {
    authors: [
      "COLARES, ADOLFO FRANCESCO DE OLIVEIRA",
      "OLIVEIRA, Sandro Ronaldo Bezerra",
      "FURTADO, Julio Cezar Costa",
    ],
    title: "Um curriculum para ensino de melhoria do processo de software em cursos de computação",
    publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
    edition: "21", // Alterado de 'volume'
    pages: "e3722",
    year: "2024",
    link: "http://dx.doi.org/10.54033/cadpedv21n4-077",
    type: "article",
  },
  {
    authors: ["CIUFFI, E.", "FURTADO, S. D. F.", "FURTADO, Julio C."],
    title:
      "Desafios enfrentados por profissionais e empresas da área de t.i. durante a pandemia de covid-19 no Brasil",
    publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
    edition: "21", // Alterado de 'volume'
    pages: "e3944",
    year: "2024",
    link: "http://dx.doi.org/10.54033/cadpedv21n4-158",
    type: "article",
  },
  {
    authors: [
      "SANTOS, CARLOS EDUARDO BRITO DA SILVA DOS",
      "FURTADO, STEPHANY DANTAS DE FREITAS",
      "GUERRA, ANDERSON DOS SANTOS",
      "FURTADO, Julio Cezar Costa",
    ],
    title: "PROJ-O-POLY: um jogo de banco imobiliário de apoio ao ensino da gerência de projetos",
    publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
    edition: "21", // Alterado de 'volume'
    pages: "e6306",
    year: "2024",
    link: "http://dx.doi.org/10.54033/cadpedv21n8-012",
    type: "article",
  },
  {
    authors: [
      "SILVA, MATEUS BEZERRA DA",
      "FURTADO, STEPHANY DANTAS DE FREITAS",
      "FURTADO, Julio Cezar Costa",
    ],
    title:
      "A evasão dos estudantes em cursos de computação: um estudo sobre a Universidade Federal do Amapá",
    publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
    edition: "21", // Alterado de 'volume'
    pages: "e7820",
    year: "2024",
    link: "http://dx.doi.org/10.54033/cadpedv21n9-130",
    type: "article",
  },
  {
    authors: ["GUERRA, A.", "OLIVEIRA, Sandro Ronaldo Bezerra", "FURTADO, Julio C."],
    title:
      "Apoio ao Ensino da Construção de Produto de Software a partir do uso de um RPG: o Jogo ConES",
    publisher: "REVISTA EDUCAONLINE",
    edition: "17", // Alterado de 'volume'
    pages: "100-115",
    year: "2023",
    link: "#",
    type: "article",
  },
  {
    authors: [
      "KLEMZ, F. K.",
      "AMARAL, S. A. G.",
      "SANTOS, M. V. A.",
      "PINHEIRO, H. H. C.",
      "PEREIRA JUNIOR, A.",
      "FURTADO, Julio C.",
      "CALDAS, I. F. R.",
      "CHAVES, R. O.",
    ],
    title: "An electrogram-guided transvenous temporary pacemaker implant simulator",
    publisher: "PACE-PACING AND CLINICAL ELECTROPHYSIOLOGY",
    // edition: '', // Alterado de 'volume'
    pages: "1-9",
    year: "2023",
    link: "http://dx.doi.org/10.1111/pace.14886",
    type: "article",
  },
  {
    authors: [
      "FURTADO, Julio C.",
      "OLIVEIRA, S. R. B.",
      "CHAVES, R. O.",
      "TELES, A.",
      "COLARES, A.",
    ],
    title:
      "An Experimental Evaluation of a Teaching Approach for Statistical Process Control in Computer Courses",
    publisher: "INTERNATIONAL JOURNAL OF INFORMATION AND COMMUNICATION TECHNOLOGY EDUCATION",
    edition: "17", // Alterado de 'volume'
    pages: "154-171",
    year: "2021",
    link: "http://dx.doi.org/10.4018/ijicte.2021010110",
    type: "article",
  },
  {
    authors: [
      "SILVA, H. C.",
      "MIRANDA, E. F.",
      "ANDRADE, M. C.",
      "BRANDAO, F. M. V.",
      "COUTEIRO, R. P.",
      "BRITO, M. V. H.",
      "FURTADO, Julio C.",
      "CHAVES, R. O.",
    ],
    title: "HEART AT RISK: ELECTRONIC EDUCATIONAL GAME WITH INFORMATION ON DOPING IN ATHLETES",
    publisher: "REVISTA BRASILEIRA DE MEDICINA DO ESPORTE (ONLINE)",
    edition: "25", // Alterado de 'volume'
    pages: "379-383",
    year: "2019",
    link: "http://dx.doi.org/10.1590/1517-869220192505217459",
    type: "article",
  },
  //old articles repetidos
  // {
  //   type: "article",
  //   number: 6,
  //   title:
  //     "A evasão dos estudantes em cursos de computação: um estudo sobre a Universidade Federal do Amapá",
  //   authors: [
  //     "SILVA, MATEUS BEZERRA DA",
  //     "FURTADO, STEPHANY DANTAS DE FREITAS",
  //     "FURTADO, Julio Cezar Costa",
  //   ],
  //   year: 2024,
  //   link: "https://ojs.studiespublicacoes.com.br/ojs/index.php/cadped/article/view/7820",
  //   publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
  //   edition: "21",
  //   pages: "e7820",
  //   importance: 1,
  // },
  // {
  //   type: "article",
  //   number: 10,
  //   title:
  //     "Desafios enfrentados por profissionais e empresas da área de t.i. durante a pandemia de covid-19 no Brasil",
  //   authors: ["CIUFFI, E.", "FURTADO, S. D. F.", "FURTADO, Julio C."],
  //   year: 2024,
  //   link: "#",
  //   publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
  //   edition: "21",
  //   pages: "e3944",
  //   importance: 2,
  // },
  // {
  //   type: "article",
  //   number: 5,
  //   title: "PROJ-O-POLY: um jogo de banco imobiliário de apoio ao ensino da gerência de projetos",
  //   authors: [
  //     "SANTOS, CARLOS EDUARDO BRITO DA SILVA DOS",
  //     "FURTADO, STEPHANY DANTAS DE FREITAS",
  //     "GUERRA, ANDERSON DOS SANTOS",
  //     "FURTADO, Julio Cezar Costa",
  //   ],
  //   year: 2024,
  //   link: "https://ojs.studiespublicacoes.com.br/ojs/index.php/cadped/article/view/6306",
  //   publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
  //   edition: "21",
  //   pages: "e6306",
  //   importance: 3,
  // },

  // {
  //   type: "article",
  //   number: 2,
  //   title:
  //     "Um estudo sobre as principais dificuldades na empregabilidade de um engenheiro de software",
  //   authors: ["MONTEIRO NETO, E.", "FURTADO, S. D. F.", "FURTADO, Julio C."],
  //   year: 2024,
  //   link: "https://ojs.revistacontribuciones.com/ojs/index.php/clcs/article/view/5988",
  //   publisher: "CONTRIBUCIONES A LAS CIENCIAS SOCIALES",
  //   edition: "17",
  //   pages: "1-21",
  //   importance: 6,
  // },
  // {
  //   type: "article",
  //   number: 8,
  //   title: "An electrogram-guided transvenous temporary pacemaker implant simulator",
  //   authors: [
  //     "KLEMZ, F. K.",
  //     "AMARAL, S. A. G.",
  //     "SANTOS, M. V. A.",
  //     "PINHEIRO, H. H. C.",
  //     "PEREIRA JUNIOR, A.",
  //     "FURTADO, Julio C.",
  //     "CALDAS, I. F. R.",
  //     "CHAVES, R. O.",
  //   ],
  //   year: 2023,
  //   link: "https://onlinelibrary.wiley.com/doi/10.1111/pace.14886",
  //   publisher: "PACE-PACING AND CLINICAL ELECTROPHYSIOLOGY",
  //   pages: "1-9",
  //   importance: 7,
  // },
  // {
  //   type: "article",
  //   number: 1,
  //   title: "Uma abordagem focada no aluno para o ensino de engenharia de requisitos",
  //   authors: ["GUERRA, ANDERSON DOS SANTOS", "FURTADO, Julio Cezar Costa"],
  //   year: 2024,
  //   link: "https://ojs.cuadernoseducacion.com/ojs/index.php/ced/article/view/2571",
  //   publisher: "CUADERNOS DE EDUCACIÓN Y DESARROLLO",
  //   edition: "16",
  //   pages: "264-282",
  //   importance: 8,
  // },
  // {
  //   type: "article",
  //   number: 7,
  //   title:
  //     "Apoio ao Ensino da Construção de Produto de Software a partir do uso de um RPG: o Jogo ConES",
  //   authors: ["GUERRA, A.", "OLIVEIRA, Sandro Ronaldo Bezerra", "FURTADO, Julio C."],
  //   year: 2023,
  //   link: "",
  //   publisher: "REVISTA EDUCAONLINE",
  //   edition: "17",
  //   pages: "100-115",
  //   importance: 9,
  // },
  // {
  //   type: "article",
  //   number: 9,
  //   title:
  //     "An Experimental Evaluation of a Teaching Approach for Statistical Process Control in Computer Courses",
  //   authors: [
  //     "FURTADO, Julio C.",
  //     "OLIVEIRA, S. R. B.",
  //     "CHAVES, R. O.",
  //     "TELES, A.",
  //     "COLARES, A.",
  //   ],
  //   year: 2021,
  //   link: "https://www.igi-global.com/gateway/article/267730",
  //   publisher: "INTERNATIONAL JOURNAL OF INFORMATION AND COMMUNICATION TECHNOLOGY EDUCATION",
  //   edition: "17",
  //   pages: "154-171",
  //   webCitations: 2,
  //   scopusCitations: 3,
  //   importance: 10,
  // },

  // {
  //   type: "article",
  //   number: 3,
  //   title: "Um curriculum para ensino de melhoria do processo de software em cursos de computação",
  //   authors: [
  //     "COLARES, ADOLFO FRANCESCO DE OLIVEIRA",
  //     "OLIVEIRA, Sandro Ronaldo Bezerra",
  //     "FURTADO, Julio Cezar Costa",
  //   ],
  //   year: 2024,
  //   link: "https://ojs.studiespublicacoes.com.br/ojs/index.php/cadped/article/view/3722",
  //   publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
  //   edition: "21",
  //   pages: "e3722",
  //   importance: 14,
  // },
  // {
  //   type: "article",
  //   number: 4,
  //   title:
  //     "Desafios enfrentados por profissionais e empresas da área de t.i. durante a pandemia de covid-19 no Brasil",
  //   authors: ["CIUFFI, E.", "FURTADO, S. D. F.", "FURTADO, Julio C."],
  //   year: 2024,
  //   link: "https://ojs.studiespublicacoes.com.br/ojs/index.php/cadped/article/view/3944",
  //   publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
  //   edition: "21",
  //   pages: "e3944",
  //   importance: 15,
  // },
  // {
  //   type: "article",
  //   number: 11,
  //   title: "Experimental Evaluation of a Serious Game for Teaching Software Process Modeling",
  //   authors: [
  //     "CHAVES, R. O.",
  //     "GRESSE VON WANGENHEIM, C.",
  //     "FURTADO, Julio C.",
  //     "OLIVEIRA, Sandro Ronaldo Bezerra",
  //     "SANTOS, A.",
  //     "FAVERO, E. L.",
  //   ],
  //   year: 2015,
  //   link: "https://ieeexplore.ieee.org/document/7072571",
  //   publisher: "IEEE Transactions on Education",
  //   pages: "1-8",
  //   webCitations: 30,
  //   scopusCitations: 35,
  //   importance: 16,
  // },
  // patentes

  // Congressos
  {
    type: "congress",
    title:
      "A Methodology to Teaching Statistical Process Control for Software Engineers: An Overview",
    authors: ["FURTADO, Julio C.", "OLIVEIRA, S. R. B."],
    event: "40th International Conference on Software Engineering",
    location: "Gothenburg, Sweden",
    proceedings: "Proceedings of 40th ICSE",
    year: "2018",
    link: "#",
  },
  // {
  //   type: "congress",
  //   title: "Spider-ACQ: Uma Ferramenta de Apoio à Gerência de Projetos de Aquisição",
  //   authors: ["FURTADO, Julio C.", "OLIVEIRA, Sandro Ronaldo Bezerra"],
  //   event: "WAMPS 2011 - Ferramentas",
  //   location: "Campinas - SP",
  //   proceedings: "Anais do WAMPS 2011",
  //   year: "2011",
  //   link: "#",
  // },
  // {
  //   type: "congress",
  //   title:
  //     "SPIDER - Um Suite de Ferramentas de Software Livre de Apoio à Implementação do Modelo MPS.BR",
  //   authors: [
  //     "OLIVEIRA, S. R. B.",
  //     "YOSHIDOME, E.",
  //     "LIRA, W.",
  //     "FURTADO, Julio C.",
  //     "NEIVA, J.",
  //     "ALHO, F. M.",
  //     "TELES, M. P.",
  //     "SOUZA, M.",
  //     "Mezzomo, L. P.",
  //     "ESTACIO, B. J. S.",
  //     "VALENTE, K.",
  //     "BALDEZ, G.",
  //     "OLIVEIRA, S.",
  //     "AFONSO, P.",
  //   ],
  //   event: "VIII Encontro Anual de Computação",
  //   location: "Catalão - GO",
  //   proceedings: "Anais do VIII ENACOMP",
  //   year: "2010",
  //   link: "#",
  // },
  {
    authors: ["COLARES, A.", "OLIVEIRA, Sandro Ronaldo Bezerra", "FURTADO, Julio C."],
    title:
      "A Qualitative Evaluation of an Experiment on the Application of Active Methodologies in Teaching Software Process Improvement",
    publisher: "XXIV Simpósio Brasileiro de Qualidade de Software (SBQS)",
    edition: "Anais do SBQS 2025",
    // pages: null,
    year: "2025",
    link: "#",
    type: "congress",
  },
  {
    authors: ["MARTINS, L.", "FURTADO, S. D. F.", "GUERRA, A.", "FURTADO, Julio C."],
    title: "CLASSUP: UMA PLATAFORMA GAMIFICADA PARA AUXÍLIO DO APRENDIZADO UTILIZANDO QUIZZES",
    publisher:
      "International Conference on Information Systems and Technology Management - CONTECSI",
    edition: "Archive CONTECSI",
    // pages: null,
    year: "2024",
    link: "#",
    type: "congress",
  },
  {
    authors: ["COLARES, A.", "FURTADO, Julio C.", "OLIVEIRA, S. R. B."],
    title:
      "APPLICATION OF GAMIFICATION IN SPI PROGRAMS: A LITERATURE REVIEW USING SLR AND SNOWBALLING",
    publisher:
      "International Conference on Information Systems and Technology Management - CONTECSI",
    edition: "Archive CONTECSI",
    // pages: null,
    year: "2024",
    link: "#",
    type: "congress",
  },
  {
    authors: ["COLARES, A.", "FURTADO, Julio C. C.", "OLIVEIRA, S. R. B."],
    title: "PERCEPTIONS ON TEACHING OF SOFTWARE PROCESS IMPROVEMENT: AN INTERVIEW WITH PROFESSORS",
    publisher:
      "International Conference on Information Systems and Technology Management - CONTECSI",
    edition: "Archive CONTECSI",
    // pages: null,
    year: "2024",
    link: "#",
    type: "congress",
  },
  {
    authors: ["FARIAS, F. M.", "FURTADO, S. D. F.", "FURTADO, Julio C. C."],
    title:
      "PAPEL OU IDE: UMA ANÁLISE SOBRE AS FORMAS DE AVALIAÇÃO EM TURMAS INICIANTES DE PROGRAMAÇÃO",
    publisher:
      "International Conference on Information Systems and Technology Management - CONTECSI",
    edition: "Archive CONTECSI",
    // pages: null,
    year: "2024",
    link: "#",
    type: "congress",
  },
  {
    authors: ["BRITO, C. E.", "FURTADO, S. D. F.", "GUERRA, A.", "FURTADO, Julio C. C."],
    title: "PROJOPOLY: UM JOGO DE BANCO IMOBILIÁRIO DE APOIO AO ENSINO DA GERÊNCIA DE PROJETOS",
    publisher:
      "International Conference on Information Systems and Technology Management - CONTECSI",
    edition: "Archive CONTECSI",
    // pages: null,
    year: "2024",
    link: "#",
    type: "congress",
  },
  {
    authors: [
      "DE OLIVEIRA COLARES, ADOLFO FRANCESCO",
      "FURTADO, Julio Cezar Costa",
      "OLIVEIRA, Sandro Ronaldo Bezerra",
    ],
    title:
      "Content and Skills for Teaching Software Process Improvement in the Computer Science Course: A Mapping of ACM / IEEE, SBC, SWEBOK, CMMI and MR-MPS-SW Assets",
    publisher: "2023 IEEE Frontiers in Education Conference (FIE)",
    edition: "2023 IEEE Frontiers in Education Conference (FIE)",
    pages: "1",
    year: "2023",
    link: "http://dx.doi.org/10.1109/FIE58773.2023.10343447",
    type: "congress",
  },
  {
    authors: ["COLARES, A.", "FURTADO, Julio C.", "OLIVEIRA, S. R. B."],
    title:
      "Use of Gamification as Implementation Approach for Software Process Improvement: Trends and Gaps",
    publisher:
      "17th International Conference on Evaluation of Novel Approaches to Software Engineering - ENASE",
    edition: "Proceedings of ENASE 2022",
    // pages: null,
    year: "2022",
    link: "#",
    type: "congress",
  },
  {
    authors: ["GUERRA, A.", "FURTADO, Julio C.", "OLIVEIRA, S. R. B."],
    title: "ConES: Um RPG como Instrumento de Apoio ao Ensino da Construção de Produto de Software",
    publisher: "SBGames 2022",
    edition: "Anais do SBGames 2022",
    // pages: null,
    year: "2022",
    link: "#",
    type: "congress",
  },
  {
    authors: ["GUERRA, A.", "FURTADO, Julio C. C.", "OLIVEIRA, Sandro Ronaldo Bezerra"],
    title:
      "UM RELATO DE EXPERIÊNCIA DO CONES: UM RPG PARA APRENDIZAGEM DA CONSTRUÇÃO DE PRODUTO DE SOFTWARE",
    publisher:
      "International Conference on Information Systems and Technology Management - CONTECSI",
    edition: "Proceedings of 19h CONTECSI",
    // pages: null,
    year: "2022",
    link: "#",
    type: "congress",
  },
  {
    authors: ["LUIGI TAVARES DA SILVA CIUFFI, EDUARDO", "CEZAR COSTA FURTADO, JULIO"],
    title:
      "DESAFIOS ENFRENTADOS POR PROFISSIONAIS E EMPRESAS DA AREA DE T.I. DURANTE A PANDEMIA DE COVID-19 NO BRASIL",
    publisher:
      "19th CONTECSI International Conference on Information Systems and Technology Management",
    edition:
      "19th CONTECSI International Conference on Information Systems and Technology Management",
    // pages: null,
    year: "2022",
    link: "http://dx.doi.org/10.5748/19CONTECSI/PSE/SOC/6970",
    type: "congress",
  },
  {
    authors: ["TAYNARA SANTOS MOREIRA MACIEL, AILA", "CEZAR COSTA FURTADO, JULIO"],
    title: "AS PRINCIPAIS ABORDAGENS EM IHC UTILIZADAS PARA DESENVOLVIMENTO DE APLICATIVOS MOVEIS",
    publisher:
      "19th CONTECSI International Conference on Information Systems and Technology Management",
    edition:
      "19th CONTECSI International Conference on Information Systems and Technology Management",
    // pages: null,
    year: "2022",
    link: "http://dx.doi.org/10.5748/19CONTECSI/PSE/ESD/6971",
    type: "congress",
  },
  {
    authors: ["BEZERRA DA SILVA, MATEUS", "CEZAR COSTA FURTADO, JULIO"],
    title:
      "A EVASAO DOS ESTUDANTES EM CURSOS DE COMPUTACAO: UM ESTUDO SOBRE A UNIVERSIDADE FEDERAL DO AMAPA",
    publisher:
      "19th CONTECSI International Conference on Information Systems and Technology Management",
    edition:
      "19th CONTECSI International Conference on Information Systems and Technology Management",
    // pages: null,
    year: "2022",
    link: "http://dx.doi.org/10.5748/19CONTECSI/PSE/EDU/6972",
    type: "congress",
  },
  {
    authors: ["GUERRA, A.", "OLIVEIRA, Sandro Ronaldo Bezerra", "FURTADO, Julio C."],
    title: "UM MAPEAMENTO DOS TIPOS DE JOGOS EM RELAÇÃO AOS NÍVEIS DA TAXONOMIA REVISADA DE BLOOM",
    publisher:
      "International Conference on Information Systems and Technology Management - CONTECSI",
    edition: "Proceedings of 19h CONTECSI",
    // pages: null,
    year: "2022",
    link: "#",
    type: "congress",
  },
  {
    authors: [
      "LEAL ALVES, JULIANA",
      "DANTAS DE FREITAS FURTADO, STEPHANY",
      "CEZAR COSTA FURTADO, JULIO",
    ],
    title: "UMA ANALISE SOBRE HARD E SOFT SKILLS NA INDUSTRIA DE SOFTWARE BRASILEIRA",
    publisher:
      "19th CONTECSI International Conference on Information Systems and Technology Management",
    edition:
      "19th CONTECSI International Conference on Information Systems and Technology Management",
    // pages: null,
    year: "2022",
    link: "http://dx.doi.org/10.5748/19CONTECSI/PSE/EDU/6995",
    type: "congress",
  },
  {
    authors: ["TAYNARA SANTOS MOREIRA MACIEL, AÍLA", "FURTADO, Julio"],
    title: "A BIBLIOMETRIC ANALYSIS OF HCI APPROACHES IN THE CONTEXT OF MOBILE APPLICATIONS",
    publisher: "CONTECSI International Conference on Information Systems and Technology Management",
    // edition: null,
    // pages: null,
    year: "2021",
    link: "http://dx.doi.org/10.5748/18CONTECSI/PSE/ESD/6840",
    type: "congress",
  },
  {
    authors: [
      "DOS SANTOS GUERRA, ANDERSON",
      "MONTEIRO NETO, EDSON",
      "FURTADO, Julio",
      "RONALDO BEZERRA OLIVEIRA, SANDRO",
    ],
    title:
      "A BIBLIOMETRIC ANALYSIS OF THE USE OF GAMES FOR TEACHING SOFTWARE ENGINEERING FROM A SYSTEMATIC LITERATURE REVIEW",
    publisher: "CONTECSI International Conference on Information Systems and Technology Management",
    // edition: null,
    // pages: null,
    year: "2021",
    link: "#",
    type: "congress",
  },
  {
    authors: ["COSTA, M.", "CIUFFI, E.", "FURTADO, Julio C."],
    title: "JSniffer: A Tool for Automatic Identification of Bad Smells in JAVA",
    publisher:
      "International Conference on Information Systems and Technology Management - 18th CONTCSI",
    edition: "Archive CONTECSI",
    // pages: null,
    year: "2021",
    link: "#",
    type: "congress",
  },
  {
    authors: ["ARAUJO, E. A.", "ALEXANDRE, G. H. S.", "FURTADO, Julio C."],
    title:
      "Jogos de tabuleiros modernos para aprimorar a resolução de problemas em alunos de programação",
    publisher: "Simpósio Brasileiro de Games e Entretenimento Digital - SBGames 2020",
    edition: "Anais do SBGames 2020",
    // pages: null,
    year: "2020",
    link: "#",
    type: "congress",
  },
  {
    authors: ["FURTADO, Julio", "OLIVEIRA, SANDRO"],
    title:
      "An Experimental Evaluation of a Teaching Approach for Statistical Process Control for Software Engineers: An Experimental Study",
    publisher: "14th International Conference on Software Technologies",
    edition: "Proceedings of the 14th International Conference on Software Technologies",
    pages: "153",
    year: "2019",
    link: "http://dx.doi.org/10.5220/0007772501530161",
    type: "congress",
  },
  {
    authors: ["MONTEIRO NETO, E.", "FURTADO, Julio C."],
    title:
      "Um Estudo sobre as Principais Dificuldades na Empregabilidade de um Engenheiro de Software",
    publisher: "IV Workshop sobre Aspectos Sociais, Humanos e Econômicos de Software",
    edition: "CSBC 2019 - WASHES",
    // pages: null,
    year: "2019",
    link: "#",
    type: "congress",
  },
  {
    authors: ["GUERRA, A.", "FURTADO, Julio C."],
    title: "A Practical Approach to Teaching Requirements Engineering in Computing Programs",
    publisher: "The Fourteenth International Conference on Software Engineering Advances",
    edition:
      "Proceedings of The Fourteenth International Conference on Software Engineering Advances",
    // pages: null,
    year: "2019",
    link: "#",
    type: "congress",
  },
  {
    authors: ["GUERRA, A.", "FURTADO, Julio C."],
    title: "Uma abordagem focada no aluno para o ensino de Engenharia de Requisitos",
    publisher: "Seminário Argentina - Brasil de Tecnologias da Informação e da Comunicação 2019",
    edition:
      "Anais do eminário Argentina - Brasil de Tecnologias da Informação e da Comunicação 2019",
    // pages: null,
    year: "2019",
    link: "#",
    type: "congress",
  },
  {
    authors: ["FURTADO, Julio Cezar Costa", "OLIVEIRA, Sandro Ronaldo Bezerra"],
    title: "A Methodology to Teaching Statistical Process Control in Computer Courses",
    publisher:
      "13th International Conference on Evaluation of Novel Approaches to Software Engineering",
    edition:
      "Proceedings of the 13th International Conference on Evaluation of Novel Approaches to Software Engineering",
    pages: "424",
    year: "2018",
    link: "http://dx.doi.org/10.5220/0006800504240431",
    type: "congress",
  },
  {
    authors: ["OLIVEIRA ABREU, DIEGO", "CEZAR COSTA FURTADO, JULIO"],
    title:
      "ANÁLISE DA ADERÊNCIA DA FERRAMENTA DE SOFTWARE SPC EXPLORER PARA APOIAR O CONTROLE ESTATÍSTICO DE PROCESSOS DE SOFTWARE",
    publisher:
      "15th CONTECSI International Conference on Information Systems and Technology Management",
    // edition: null,
    // pages: null,
    year: "2018",
    link: "http://dx.doi.org/10.5748/9788599693148-15CONTECSI/PS-5769",
    type: "congress",
  },
  {
    authors: ["FURTADO, Julio C.", "OLIVEIRA, S. R. B."],
    title:
      "Evaluating Students' Perception of their Learning in a Student-Centered Software Engineering Course - A Experimental Study",
    publisher: "13th International Conference on Software Technologies - ICSOFT",
    edition: "Proceedings of 13th ICSOFT",
    // pages: null,
    year: "2018",
    link: "#",
    type: "congress",
  },
  {
    authors: [
      "RAMOS, ALUIZIO",
      "FURTADO, JÚLIO",
      "BATISTA, ARTHUR IVSON X. M.",
      "SILVA, GÉSSICA PINHEIRO DA",
      "OLIVEIRA, SANDRO R. B.",
    ],
    title:
      "THE STATISTICAL PROCESS CONTROL IN SOFTWARE DEVELOPMENT PROJECTS: A SYSTEMATIC REVIEW OF LITERATURE",
    publisher:
      "14th CONTECSI International Conference on Information Systems and Technology Management",
    // edition: null, // Dado original "org.crossref.xschema._1.Title@4ad175c5" parecia um erro
    pages: "3283",
    year: "2017",
    link: "http://dx.doi.org/10.5748/9788599693131-14contecsi/ps-4766",
    type: "congress",
  },
  {
    authors: ["FURTADO, JÚLIO", "OLIVEIRA, SANDRO R. B."],
    title:
      "A STUDY ON PERCEPTION OF THE USEFULNESS OF STATISTICAL PROCESS CONTROL IN SOFTWARE DEVELOPMENT ORGANIZATIONS: AN APPLICATION OF SURVEY",
    publisher:
      "14th CONTECSI International Conference on Information Systems and Technology Management",
    // edition: null,
    pages: "3311",
    year: "2017",
    link: "http://dx.doi.org/10.5748/9788599693131-14CONTECSI/PS-4767",
    type: "congress",
  },
  {
    authors: ["FURTADO, Julio C.", "OLIVEIRA, S. R. B."],
    title: "A Strategy for Statistical Process Control Education in Computer Science",
    publisher: "11th International Conference on Software Engineering Advances",
    edition: "The Eleventh International Conference on Software Engineering Advances",
    pages: "166-171",
    year: "2016",
    link: "#",
    type: "congress",
  },
  {
    authors: ["FURTADO, Julio C.", "OLIVEIRA, Sandro Ronaldo Bezerra"],
    title:
      "Uma Abordagem de Ensino para o Controle Estatístico do Processo nos Cursos de Ciência da Computação",
    publisher:
      "IX Fórum de Educação em Engenharia de Software no XXX Simpósio Brasileiro de Engenharia de Software",
    edition: "Anais do SBES 2016",
    // pages: null,
    year: "2016",
    link: "#",
    type: "congress",
  },
  {
    type: "conferenceAbstract",
    authors: ["NEVES, F.", "MACHADO, J.", "FURTADO, Julio C."],
    title:
      "Preliminary Evidence on the Use of Chatbots to Support Junior Software Professionals in Process Guidance",
    year: 2025,
    event: "XVIII Escola Regional de Informática Norte 2 (ERIN2)",
    location: "Macapá/AP",
    proceedings: "Anais da ERIN2",
  },
  {
    type: "conferenceAbstract",
    authors: ["NOGUEIRA, E. R.", "FURTADO, Julio C."],
    title:
      "EduGames: Uma Plataforma Web de Consulta a Jogos Digitais Educativos Para o Ensino de Computação",
    year: 2025,
    event: "XVIII Escola Regional de Informática Norte 2 (ERIN2)",
    location: "Macapá/AP",
    proceedings: "Anais da ERIN2",
  },
  {
    type: "conferenceAbstract",
    authors: ["FILHO, M.", "FURTADO, Julio C."],
    title:
      "Um Mapeamento Sistemático Sobre as Técnicas Emergentes de Pré-Processamento para Mitigação de Viés em Dados de Treinamento",
    year: 2025,
    event: "XVIII Escola Regional de Informática Norte 2 (ERIN2)",
    location: "Macapá/AP",
    proceedings: "Anais da ERIN2",
  },
  {
    type: "conferenceAbstract",
    authors: ["FURTADO, Julio C.", "OLIVEIRA, S. R. B."],
    title:
      "A Methodology to Teaching Statistical Process Control for Software Engineers: An Overview",
    year: 2018,
    event: "40th International Conference on Software Engineering",
    location: "Gothenburg, Sweden",
    proceedings: "Proceedings of 40th ICSE",
  },
]

const students: StudentProps[] = [
  {
    name: "Adriane da Costa Ferreira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0201229307900067",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1564966Z5",
    type: "Student",
  },
  {
    name: "Augusto Fadanelli de Sousa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4905967797980110",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8077169T2",
    type: "Student",
  },
  {
    name: "Aymmée Nadine Diniz Neris",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/2629359369799722",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2703499D5",
    type: "Student",
  },
  {
    name: "Carlos Alberto Barbosa de Almeida Junior",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4624599784919056",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1546828T8",
    type: "Student",
  },
  {
    name: "Carlos Henrique Barreto Mareco",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3855670927634348",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2863059J8",
    type: "Student",
  },
  {
    name: "Celeste dos Santos Dantas",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3115743863912814",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1176961E2",
    type: "Student",
  },
  {
    name: "Dario Rodrigues do Carmo",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1169535933506040",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1582105J0",
    type: "Student",
  },

  {
    name: "Eduardo Sousa Lima",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3954320570829034",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8254705U6",
    type: "Student",
  },
  {
    name: "Eduardo Teixeira Flexa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0262199390232721",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1539994D7",
    type: "Student",
  },
  {
    name: "Enzo Cardoso de Castilho",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0919329108329523",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2547927T7",
    type: "Student",
  },
  {
    name: "Fernando Rafael Serra Neves",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8768694050430103",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8145617U2",
    type: "Student",
  },
  {
    name: "Gabriel Enrique Almeida Gonçalves",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6118298421134507",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K9052777Y7",
    type: "Student",
  },
  {
    name: "Gabriela Felipa da Silva Souza",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6676365359182975",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2406638Y4",
    type: "Student",
  },
  {
    name: "Guilherme Cosmo Lins de Souza",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/7683827799391036",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K9360787E2",
    type: "Student",
  },
  {
    name: "Heloysa Gama Uchoa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0368761867719344",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1567493H0",
    type: "Student",
  },
  {
    name: "Higor Souza da Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4972084328427721",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1124089J2",
    type: "Student",
  },
  {
    name: "Jhonathan Willan Costa Lobato",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/2338212383461581",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=0425737136",
    type: "Student",
  },
  {
    name: "João Pedro Viana Bezerra",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8605422148199555",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2896833J8",
    type: "Student",
  },
  {
    name: "João Victor Machado de Andrade",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8539615512841442",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2726689P6",
    type: "Student",
  },
  {
    name: "Johnathan Rocha de Sousa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3678750924075733",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4404089Z4",
    type: "Student",
  },
  {
    name: "José Clêmer Teixeira Pantoja",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1617755992099891",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2896102D7",
    type: "Student",
  },
  {
    name: "José Kaynã Pereira de Sousa Bitencourt",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8979398424386518",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1563227E0",
    type: "Student",
  },
  {
    name: "José Olimpio de Freitas Dias Júnior",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6283613146447214",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8080585T4",
    type: "Student",
  },
  {
    name: "Josilene Aline Soares Ferreira de Oliveira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6490034202076915",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1511232Z6",
    type: "Student",
  },
  {
    name: "Julia Vitoria Costa dos Santos",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/9085951782034759",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1545016Z6",
    type: "Student",
  },
  {
    name: "Katlen Vanessa dos Santos da Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8478985982111322",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1160296T9",
    type: "Student",
  },
  {
    name: "Kauê de Magalhães Brandão",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/5709405973358001",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1536946Y9",
    type: "Student",
  },
  {
    name: "Lorena Roberta Nunes Guimarães",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8067840813058871",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2406465Y1",
    type: "Student",
  },
  {
    name: "Lucas Havel Nobre Maia",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0003377526836527",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1508336H3",
    type: "Student",
  },
  {
    name: "Lucas Soutelo Souto Pinheiro",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4400152259018443",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2896840T9",
    type: "Student",
  },
  {
    name: "Luis Henrique Campos Mafra",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/9961825338528812",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1545234A4",
    type: "Student",
  },
  {
    name: "Luiz Felipe Moreira dos Anjos",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6967787408321484",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1561560P9",
    type: "Student",
  },
  {
    name: "Luma Gabriela Andrade da Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4278102715514258",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1546897P6",
    type: "Student",
  },
  {
    name: "Marcus Vinícyus Santos Figueira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1581056759223655",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1546822D2",
    type: "Student",
  },
  {
    name: "Maria Eduarda Smith Santana",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6344082541870444",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1561962J3",
    type: "Student",
  },
  {
    name: "Mariane da Silva Azevedo",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6849698686793236",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2445217D7",
    type: "Student",
  },
  {
    name: "Patrick Miranda dos Santos",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0003988321971896",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1530663D5",
    type: "Student",
  },
  {
    name: "Paula Maria Lacerda de Oliveira Costa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3684202517504539",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1544794A0",
    type: "Student",
  },
  {
    name: "Victor Gabriel Gomes Bahia",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1336036540136342",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1109471Z0",
    type: "Student",
  },
  {
    name: "Yasmim Pereira Melo",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/9750144066062051",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1544291J9",
    type: "Student",
  },
  //ex students
  {
    name: "Aíla Taynara Santos Moreira Maciel",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0285174097186394",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2100157A0",
    type: "ExStudent",
  },
  {
    name: "Alexsandro Monteiro Nascimento Callins",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/2451866311989595",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1148930T6",
    type: "ExStudent",
  },
  {
    name: "Carlos Eduardo Brito da Silva dos Santos",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/7238237839067724",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8804965Z9",
    type: "ExStudent",
  },
  {
    name: "Davi Alberto Correa Silva do Carmo",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1934281181551924",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2774836U2",
    type: "ExStudent",
  },
  {
    name: "Edson Monteiro Neto",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1270283553777603",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8151323E4",
    type: "ExStudent",
  },
  {
    name: "Eduardo Luigi Tavares da Silva Ciuffi",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: " http://lattes.cnpq.br/8996710321421005",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2701533T0",
    type: "ExStudent",
  },
  {
    name: "Eduardo Rodrigues Nogueira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3772381642880757",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8068695T1",
    type: "ExStudent",
  },
  {
    name: "Erick da Cunha Sampaio",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3394751225824953",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8169200T6",
    type: "ExStudent",
  },
  {
    name: "Gabriel Melo da Silveira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1810258668918861",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8151934Y3",
    type: "ExStudent",
  },
  {
    name: "Edson Monteiro Neto",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1270283553777603",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8151323E4",
    type: "ExStudent",
  },
  {
    name: "Juliana Leal Alves",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4617405056839703",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8913815D6",
    type: "ExStudent",
  },
  {
    name: "Luís César Martins Amaral",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8829459581349801",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2109801U5",
    type: "ExStudent",
  },
  {
    name: "Marco Antonio da Silva Neves Filho",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/7123969561902651",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4373842E3",
    type: "ExStudent",
  },
  {
    name: "Mateus Bezerra da Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0650268746194141",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8846994Y0",
    type: "ExStudent",
  },
  {
    name: "Matheus Costa Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/9735600071757777",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8972040P1",
    type: "ExStudent",
  },
]
const teachers: TeacherProps[] = [
  {
    name: "Julio Cezar Costa Furtado",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/9175382702970383",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4258925P6",
  },
  {
    name: "Rafael Pontes Lima",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3248608898278519",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4133837P0",
  },
  {
    name: "Adolfo Francesco de Oliveira Colares",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/7694692886453388",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4202733D9",
  },
  {
    name: "Anderson dos Santos Guerra",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/7801947090551930",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8583463P7",
  },
  // {
  //   name: "Thiago Pinheiro do Nascimento",
  //   institution: "Unifap",
  //   campus: "Campus Unifap",
  //   email: "email@unifap.br",
  //   curriculumLink: "http://lattes.cnpq.br/3122065417402092",
  //   imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4373842E3",
  // },
]

const tccs: TCCProps[] = [
  {
    title:
      "UMA ANÁLISE DA APLICAÇÃO DE JOGOS PARA ENSINO DE PROGRAMAÇÃO BÁSICA A PARTIR DE UM MAPEAMENTO SISTEMÁTICO DA LITERATURA",
    link: "analise-aplicacao-de-jogos-para-",
    status: "Finalizado",
    students: ["Alexsandro Nascimento Callins", "Davi Alberto Correa do Carmo"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2025",
  },
  {
    title: "EDUGAMES: UM CATÁLOGO ONLINE DE JOGOS DIGITAIS EDUCATIVOS PARA O ENSINO DE COMPUTAÇÃO",
    link: "edugames-um-catalogo-online-de-jogos-digitais",
    status: "Finalizado",
    students: ["Eduardo Rodrigues Nogueira"],
    advisor: "Nome do Orientador",
    year: "2024",
  },
  {
    title:
      "MAPEAMENTO SISTEMÁTICO DE TÉCNICAS EMERGENTES DE PRÉ- PROCESSAMENTO PARA MITIGAÇÃO DE VIÉS EM DADOS DE TREINAMENTO",
    link: "mapeamento-sistematico-de-tecnicas-emergentes-de-pre",
    status: "Finalizado",
    students: ["Marco Antonio da Silva Neves Filho"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2024",
  },
  {
    title: "CLASSUP: UMA PLATAFORMA GAMIFICADA PARA AUXÍLIO DO APRENDIZADO UTILIZANDO QUIZZES",
    link: "classup-uma-plataforma-gamificada-para-auxilio-do",
    status: "Finalizado",
    students: ["Luís César Martins Amaral"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2024",
  },
  {
    title:
      "Desafios enfrentados por Profissionais e Empresas da Área de T.I. durante a pandemia de Covid-19 no Brasil",
    link: "desafios-enfrentados-por-profissionais-e-empresas-da",
    status: "Finalizado",
    students: ["Eduardo Luigi Tavares da Silva Ciuffi"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2023",
  },
  {
    title:
      "Papel ou IDE: Uma análise sobre as formas de avaliação em turmas iniciantes de programação",
    link: "papel-ou-ide-uma-analise-sobre-as",
    status: "Finalizado",
    students: [" Felipe Monteiro Farias"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2024",
  },
  {
    title: " A evasão em cursos de computação: Um estudo de caso na Universidade Federal do Amapá",
    link: "a-evasao-em-cursos-de-computacao-um",
    status: "Finalizado",
    students: ["Mateus Bezerra da Silva"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2023",
  },
  {
    title:
      "Um catálogo de práticas de IHC para aplicativos móveis. 2022. Trabalho de Conclusão de Curso",
    link: "um-catalogo-de-praticas-de-ihc-para",
    status: "Finalizado",
    students: ["Aíla Maciel"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2023",
  },
  {
    title:
      "Uma Proposta de Identificação de Componentes Reutilizáveis Baseada em Interações de Classes",
    link: "uma-proposta-de-identificacao-de-componentes-reutilizaveis",
    status: "Finalizado",
    students: ["Gabriel Melo da Silveira"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2021",
  },
  {
    title: "Uma Ferramenta para Identificação Automática de Bad Smells",
    link: "uma-ferramenta-para-identificacao-automatica-de-bad",
    status: "Finalizado",
    students: ["Matheus Costa Silva"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2021",
  },
  {
    title: "Uma Análise Sobre Hard e Soft Skills na Engenharia de Software",
    link: "uma-analise-sobre-hard-e-soft-skills",
    status: "Finalizado",
    students: ["Juliana Leal Alves"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2023",
  },
  {
    title: "Uma Abordagem para Ajustar o Controle de Versão à Natureza das Aplicações Web",
    link: "uma-abordagem-para-ajustar-o-controle-de",
    status: "Finalizado",
    students: ["Erick da Cunha Sampaio"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2021",
  },
  {
    title:
      "Proj-o-poly: Um Jogo para o Ensino de Gerenciamento de Projetos em Disciplinas de Engenharia de Software",
    link: "proj-o-poly-um-jogo-para-o-ensino",
    status: "Finalizado",
    students: ["Carlos Eduardo Brito"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2020",
  },
  {
    title:
      "Um Estudo sobre as Principais Dificuldades na Empregabilidade de um Engenheiros de Software",
    link: "um-estudo-sobre-as-principais-dificuldades-na",
    status: "Finalizado",
    students: ["Edson Monteiro Neto"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2020",
  },
  {
    title: "Uma Abordagem para o Ensino de Engenharia de Requisitos Focada no Aluno",
    link: "uma-abordagem-para-o-ensino-de-engenharia",
    status: "Finalizado",
    students: ["Anderson Guerra"],
    advisor: "Julio Cezar Costa Furtado",
    year: "2019",
  },
]

const projectsData: Project[] = [
  {
    title: "Projeto SERDE - Software Engineering: Research, Development and Education",
    description: "Descrição do projeto SERDE",
    professor: "Julio Cezar Costa Furtado",
    status: "Finalizado",
    type: "Pesquisa",
    link: "/projeto-serde",
  },
  {
    title: "Uma Metodologia Ágil para Gestão da Aquisição de Software e Serviços Correlatos",
    description: "Descrição da metodologia",
    professor: "Julio Cezar Costa Furtado",
    status: "Finalizado",
    type: "Pesquisa",
    link: "metodologia-agil-gestao-aquisicao-software-servicos-correlatos",
  },
  {
    title: "Laboratório de Desenvolvimento de Software Aplicado ao Judiciário",
    description: "Descrição do laboratório",
    professor: "Julio Cezar Costa Furtado",
    status: "Em andamento",
    type: "Extensão",
    link: "laboratorio-software-judiciario",
  },
]

const parcerias: ParceiroProps[] = [
  {
    title: "Unifap Digital",
    description: "",
    logoURL: "/image/parceiros/logo-unifap-digital.png",
    websiteURL: "https://unifapdigital.unifap.br/",
  },
  {
    title: "Tribunal Regional Eleitoral do Amapá",
    description: "",
    logoURL: "/image/parceiros/tre-ap-logo-transparent.png",
    websiteURL: "https://www.tre-ap.jus.br/",
  },
  {
    title: "Tribunal de Justiça Estado do Amapá",
    description: "",
    logoURL: "/image/parceiros/tjap-logo-ouro-2024.png",
    websiteURL: "https://www.tjap.jus.br/portal/",
  },
  {
    title: "Projeto SPIDER",
    description: "",
    logoURL: "/image/parceiros/spider.png",
    websiteURL: "https://projeto-spider.github.io/",
  },
  {
    title: "LAFocA",
    description: "",
    logoURL: "/image/parceiros/lafoca-logo.png",
    websiteURL: "https://lafoca.com.br/",
  },
]
const ProjectsContext = createContext<{
  projects: Project[]
  tccs: TCCProps[]
  teachers: TeacherProps[]
  students: StudentProps[]
  parcerias: ParceiroProps[]
  publications: PublicationProps[]
  patents: PatentProps[]
}>({
  projects: [],
  tccs: [],
  teachers: [],
  students: [],
  parcerias: [],
  publications: [],
  patents: [],
})

// 4. Crie o Componente Provider
// Este componente irá armazenar os dados e fornecer para a árvore de componentes.
export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  // Neste caso, os dados são estáticos, então não precisamos de um `useState`.
  // Se os projetos pudessem ser alterados (adicionados, removidos), usaríamos useState aqui.
  const value = {
    projects: projectsData,
    tccs: tccs,
    teachers: teachers,
    students: students,
    parcerias: parcerias,
    publications: publications,
    patents: patents,
  }

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}

// 5. Crie um Hook customizado para facilitar o uso do contexto
// Isso evita ter que importar `useContext` e `ProjectsContext` em todos os componentes.
export function useProjects() {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error("useProjects deve ser usado dentro de um ProjectsProvider")
  }
  return context
}
