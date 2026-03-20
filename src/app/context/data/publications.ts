import type { PublicationProps, PatentProps } from "../types"

export const patents: PatentProps[] = [
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

export const publications: PublicationProps[] = [
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
    edition: "7",
    pages: "2872-2894",
    year: "2025",
    link: "http://dx.doi.org/10.56238/arev7n1-176",
    type: "article",
  },
  {
    authors: ["GUERRA, ANDERSON DOS SANTOS", "FURTADO, Julio Cezar Costa"],
    title: "Uma abordagem focada no aluno para o ensino de engenharia de requisitos",
    publisher: "CUADERNOS DE EDUCACIÓN Y DESARROLLO",
    edition: "16",
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
    edition: "17",
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
    edition: "21",
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
    edition: "21",
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
    edition: "21",
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
    edition: "21",
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
    edition: "17",
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
    edition: "17",
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
    edition: "25",
    pages: "379-383",
    year: "2019",
    link: "http://dx.doi.org/10.1590/1517-869220192505217459",
    type: "article",
  },
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
  {
    authors: ["COLARES, A.", "OLIVEIRA, Sandro Ronaldo Bezerra", "FURTADO, Julio C."],
    title:
      "A Qualitative Evaluation of an Experiment on the Application of Active Methodologies in Teaching Software Process Improvement",
    publisher: "XXIV Simpósio Brasileiro de Qualidade de Software (SBQS)",
    edition: "Anais do SBQS 2025",
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
    year: "2022",
    link: "#",
    type: "congress",
  },
  {
    authors: ["GUERRA, A.", "FURTADO, Julio C.", "OLIVEIRA, S. R. B."],
    title: "ConES: Um RPG como Instrumento de Apoio ao Ensino da Construção de Produto de Software",
    publisher: "SBGames 2022",
    edition: "Anais do SBGames 2022",
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
    year: "2022",
    link: "http://dx.doi.org/10.5748/19CONTECSI/PSE/EDU/6995",
    type: "congress",
  },
  {
    authors: ["TAYNARA SANTOS MOREIRA MACIEL, AÍLA", "FURTADO, Julio"],
    title: "A BIBLIOMETRIC ANALYSIS OF HCI APPROACHES IN THE CONTEXT OF MOBILE APPLICATIONS",
    publisher: "CONTECSI International Conference on Information Systems and Technology Management",
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
