import type { PublicationProps, PatentProps } from "../types"

export const patents: PatentProps[] = [
  {
    authors: [
      "COSTA, E. S.",
      "LIMA, R. P.",
      "FURTADO, Julio C. C.",
    ],
    title: "Plataforma do Quintal",
    year: 2020,
    patentNumber: "BR512021001576-2",
    registrationDate: "30/10/2020",
    registrationInstitution: "INPI - Instituto Nacional da Propriedade Industrial",
    patentType: "Programa de Computador",
  },
  {
    authors: [
      "LIMA, R. P.",
      "SILVA, N. G.",
      "FURTADO, Julio C.",
      "MELO, A. M. S.",
      "SILVA, J. G.",
    ],
    title: "Plataforma WEB AGROWIK",
    year: 2021,
    patentNumber: "BR512021001558-4",
    registrationDate: "05/06/2021",
    registrationInstitution: "INPI - Instituto Nacional da Propriedade Industrial",
    patentType: "Programa de Computador",
  },
  {
    authors: [
      "FURTADO, Julio C.",
      "GUERRA, A.",
      "MARTINS, L.",
    ],
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
    title:
      "Abordagens para Apoio à Implementação da Melhoria do Processo de Software",
    authors: [
      "OLIVEIRA, S. R. B.",
      "VASCONCELOS, A. M. L.",
      "FURTADO, Julio C.",
    ],
    year: "2016",
    publisher: "Editora UFPE",
    edition: "1. ed.",
    pages: "562p",
    link: "#",
  },
  // Capítulos
  {
    type: "chapter",
    title:
      "PROJ-O-POLY: UM JOGO DE BANCO IMOBILIÁRIO DE APOIO AO ENSINO DA GERÊNCIA DE PROJETOS",
    authors: [
      "BRITO, C. E.",
      "FURTADO, S. D. F.",
      "GUERRA, A.",
      "FURTADO, Julio C.",
    ],
    year: "2024",
    publisher: "Current practices and strategies",
    edition: "1ed.",
    pages: "p. 25-",
    link: "#",
  },
  // Artigos
  {
    type: "article",
    title:
      "UMA ANÁLISE DA APLICAÇÃO DE JOGOS PARA ENSINO DE PROGRAMAÇÃO BÁSICA A PARTIR DE UM MAPEAMENTO SISTEMÁTICO DA LITERATURA",
    authors: [
      "CALLINS, A. M. N.",
      "CARMO, D. A. C.",
      "FURTADO, Julio C.",
    ],
    year: "2025",
    publisher: "ARACÊ - DIREITOS HUMANOS EM REVISTA",
    edition: "7",
    pages: "2872-2894",
    link: "https://dx.doi.org/10.56238/arev7n1-176",
  },
  {
    type: "article",
    title:
      "Uma abordagem focada no aluno para o ensino de engenharia de requisitos",
    authors: ["GUERRA, ANDERSON DOS SANTOS", "FURTADO, Julio Cezar Costa"],
    year: "2024",
    publisher: "CUADERNOS DE EDUCACIÓN Y DESARROLLO",
    edition: "16",
    pages: "264-282",
    link: "https://dx.doi.org/10.55905/cuadv16n1-015",
  },
  {
    type: "article",
    title:
      "Um estudo sobre as principais dificuldades na empregabilidade de um engenheiro de software",
    authors: [
      "MONTEIRO NETO, E.",
      "FURTADO, S. D. F.",
      "FURTADO, Julio C.",
    ],
    year: "2024",
    publisher: "CONTRIBUCIONES A LAS CIENCIAS SOCIALES",
    edition: "17",
    pages: "1-21",
    link: "https://dx.doi.org/10.55905/revconv.17n.3-298",
  },
  {
    type: "article",
    title:
      "Um curriculum para ensino de melhoria do processo de software em cursos de computação",
    authors: [
      "COLARES, ADOLFO FRANCESCO DE OLIVEIRA",
      "OLIVEIRA, Sandro Ronaldo Bezerra",
      "FURTADO, Julio Cezar Costa",
    ],
    year: "2024",
    publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
    edition: "21",
    pages: "e3722",
    link: "https://dx.doi.org/10.54033/cadpedv21n4-077",
  },
  {
    type: "article",
    title:
      "Desafios enfrentados por profissionais e empresas da área de t.i. durante a pandemia de covid-19 no Brasil",
    authors: [
      "CIUFFI, E.",
      "FURTADO, S. D. F.",
      "FURTADO, Julio C.",
    ],
    year: "2024",
    publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
    edition: "21",
    pages: "e3944",
    link: "https://dx.doi.org/10.54033/cadpedv21n4-158",
  },
  {
    type: "article",
    title:
      "PROJ-O-POLY: um jogo de banco imobiliário de apoio ao ensino da gerência de projetos",
    authors: [
      "SANTOS, CARLOS EDUARDO BRITO DA SILVA DOS",
      "FURTADO, STEPHANY DANTAS DE FREITAS",
      "GUERRA, ANDERSON DOS SANTOS",
      "FURTADO, Julio Cezar Costa",
    ],
    year: "2024",
    publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
    edition: "21",
    pages: "e6306",
    link: "https://dx.doi.org/10.54033/cadpedv21n8-012",
  },
  {
    type: "article",
    title:
      "A evasão dos estudantes em cursos de computação: um estudo sobre a Universidade Federal do Amapá",
    authors: [
      "SILVA, MATEUS BEZERRA DA",
      "FURTADO, STEPHANY DANTAS DE FREITAS",
      "FURTADO, Julio Cezar Costa",
    ],
    year: "2024",
    publisher: "CADERNO PEDAGÓGICO (LAJEADO. ONLINE)",
    edition: "21",
    pages: "e7820",
    link: "https://dx.doi.org/10.54033/cadpedv21n9-130",
  },
  {
    type: "article",
    title:
      "Apoio ao Ensino da Construção de Produto de Software a partir do uso de um RPG: o Jogo ConES",
    authors: [
      "GUERRA, A.",
      "OLIVEIRA, Sandro Ronaldo Bezerra",
      "FURTADO, Julio C.",
    ],
    year: "2023",
    publisher: "REVISTA EDUCAONLINE",
    edition: "17",
    pages: "100-115",
  },
  {
    type: "article",
    title:
      "An electrogram-guided transvenous temporary pacemaker implant simulator",
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
    year: "2023",
    publisher: "PACE-PACING AND CLINICAL ELECTROPHYSIOLOGY",
    pages: "1-9",
    link: "https://dx.doi.org/10.1111/pace.14886",
  },
  {
    type: "article",
    title:
      "An Experimental Evaluation of a Teaching Approach for Statistical Process Control in Computer Courses",
    authors: [
      "FURTADO, Julio C.",
      "OLIVEIRA, S. R. B.",
      "CHAVES, R. O.",
      "TELES, A.",
      "COLARES, A.",
    ],
    year: "2021",
    publisher: "INTERNATIONAL JOURNAL OF INFORMATION AND COMMUNICATION TECHNOLOGY EDUCATION",
    edition: "17",
    pages: "154-171",
    link: "https://dx.doi.org/10.4018/ijicte.2021010110",
    webCitations: 2,
    scopusCitations: 4,
  },
  {
    type: "article",
    title:
      "HEART AT RISK: ELECTRONIC EDUCATIONAL GAME WITH INFORMATION ON DOPING IN ATHLETES",
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
    year: "2019",
    publisher: "REVISTA BRASILEIRA DE MEDICINA DO ESPORTE (ONLINE)",
    edition: "25",
    pages: "379-383",
    link: "https://dx.doi.org/10.1590/1517-869220192505217459",
    webCitations: 4,
    scopusCitations: 4,
  },
  // Congressos
  {
    type: "congress",
    title:
      "A Qualitative Evaluation of an Experiment on the Application of Active Methodologies in Teaching Software Process Improvement",
    authors: [
      "COLARES, A.",
      "OLIVEIRA, Sandro Ronaldo Bezerra",
      "FURTADO, Julio C.",
    ],
    year: "2025",
    event: "XXIV Simpósio Brasileiro de Qualidade de Software (SBQS)",
    location: "São José dos Campos - SP",
    proceedings: "Anais do SBQS 2025",
  },
  {
    type: "congress",
    title:
      "CLASSUP: UMA PLATAFORMA GAMIFICADA PARA AUXÍLIO DO APRENDIZADO UTILIZANDO QUIZZES",
    authors: [
      "MARTINS, L.",
      "FURTADO, S. D. F.",
      "GUERRA, A.",
      "FURTADO, Julio C.",
    ],
    year: "2024",
    event: "International Conference on Information Systems and Technology Management - CONTECSI",
    location: "São Paulo - SP",
    proceedings: "Archive CONTECSI",
    link: "https://dx.doi.org/10.5748/20CONTECSI/PSE/%20EDU%20/7250%20e207250",
  },
  {
    type: "congress",
    title:
      "APPLICATION OF GAMIFICATION IN SPI PROGRAMS: A LITERATURE REVIEW USING SLR AND SNOWBALLING",
    authors: [
      "COLARES, A.",
      "FURTADO, Julio C.",
      "OLIVEIRA, S. R. B.",
    ],
    year: "2024",
    event: "International Conference on Information Systems and Technology Management - CONTECSI",
    location: "São Paulo - SP",
    proceedings: "Archive CONTECSI",
    link: "https://dx.doi.org/10.5748/20CONTECSI/PSE/%20ESD%20/7182%20e207182",
  },
  {
    type: "congress",
    title:
      "PERCEPTIONS ON TEACHING OF SOFTWARE PROCESS IMPROVEMENT: AN INTERVIEW WITH PROFESSORS",
    authors: [
      "COLARES, A.",
      "FURTADO, Julio C. C.",
      "OLIVEIRA, S. R. B.",
    ],
    year: "2024",
    event: "International Conference on Information Systems and Technology Management - CONTECSI",
    location: "São Paulo - SP",
    proceedings: "Archive CONTECSI",
    link: "https://dx.doi.org/10.5748/20CONTECSI/PSE/%20ESD%20/7181%20e207181",
  },
  {
    type: "congress",
    title:
      "PAPEL OU IDE: UMA ANÁLISE SOBRE AS FORMAS DE AVALIAÇÃO EM TURMAS INICIANTES DE PROGRAMAÇÃO",
    authors: [
      "FARIAS, F. M.",
      "FURTADO, S. D. F.",
      "FURTADO, Julio C. C.",
    ],
    year: "2024",
    event: "International Conference on Information Systems and Technology Management - CONTECSI",
    location: "São Paulo - SP",
    proceedings: "Archive CONTECSI",
    link: "https://dx.doi.org/10.5748/20CONTECSI/PSE/%20EDU%20/7171%20e207171",
  },
  {
    type: "congress",
    title:
      "PROJOPOLY: UM JOGO DE BANCO IMOBILIÁRIO DE APOIO AO ENSINO DA GERÊNCIA DE PROJETOS",
    authors: [
      "BRITO, C. E.",
      "FURTADO, S. D. F.",
      "GUERRA, A.",
      "FURTADO, Julio C. C.",
    ],
    year: "2024",
    event: "International Conference on Information Systems and Technology Management - CONTECSI",
    location: "São Paulo - SP",
    proceedings: "Archive CONTECSI",
    link: "https://dx.doi.org/10.5748/20CONTECSI/PSE/%20EDU%20/7176%20e207176",
  },
  {
    type: "congress",
    title:
      "Content and Skills for Teaching Software Process Improvement in the Computer Science Course: A Mapping of ACM / IEEE, SBC, SWEBOK, CMMI and MR-MPS-SW Assets",
    authors: [
      "DE OLIVEIRA COLARES, ADOLFO FRANCESCO",
      "FURTADO, Julio Cezar Costa",
      "OLIVEIRA, Sandro Ronaldo Bezerra",
    ],
    year: "2023",
    pages: "1",
    event: "2023 IEEE Frontiers in Education Conference (FIE)",
    location: "College Station",
    proceedings: "2023 IEEE Frontiers in Education Conference (FIE)",
    link: "https://dx.doi.org/10.1109/FIE58773.2023.10343447",
  },
  {
    type: "congress",
    title:
      "Use of Gamification as Implementation Approach for Software Process Improvement: Trends and Gaps",
    authors: [
      "COLARES, A.",
      "FURTADO, Julio C.",
      "OLIVEIRA, S. R. B.",
    ],
    year: "2022",
    proceedings: "Proceedings of ENASE 2022",
  },
  {
    type: "congress",
    title:
      "ConES: Um RPG como Instrumento de Apoio ao Ensino da Construção de Produto de Software",
    authors: [
      "GUERRA, A.",
      "FURTADO, Julio C.",
      "OLIVEIRA, S. R. B.",
    ],
    year: "2022",
    event: "SBGames 2022",
    location: "Natal",
    proceedings: "Anais do SBGames 2022",
  },
  {
    type: "congress",
    title:
      "UM RELATO DE EXPERIÊNCIA DO CONES: UM RPG PARA APRENDIZAGEM DA CONSTRUÇÃO DE PRODUTO DE SOFTWARE",
    authors: [
      "GUERRA, A.",
      "FURTADO, Julio C. C.",
      "OLIVEIRA, Sandro Ronaldo Bezerra",
    ],
    year: "2022",
    event: "International Conference on Information Systems and Technology Management - CONTECSI",
    location: "São Paulo - SP",
    proceedings: "Proceedings of 19h CONTECSI",
    link: "https://dx.doi.org/10.5748/19CONTECSI/PSE/EDU/696",
  },
  {
    type: "congress",
    title:
      "DESAFIOS ENFRENTADOS POR PROFISSIONAIS E EMPRESAS DA AREA DE T.I. DURANTE A PANDEMIA DE COVID-19 NO BRASIL",
    authors: ["LUIGI TAVARES DA SILVA CIUFFI, EDUARDO", "CEZAR COSTA FURTADO, JULIO"],
    year: "2022",
    link: "https://dx.doi.org/10.5748/19CONTECSI/PSE/SOC/6970",
  },
  {
    type: "congress",
    title:
      "AS PRINCIPAIS ABORDAGENS EM IHC UTILIZADAS PARA DESENVOLVIMENTO DE APLICATIVOS MOVEIS",
    authors: ["TAYNARA SANTOS MOREIRA MACIEL, AILA", "CEZAR COSTA FURTADO, JULIO"],
    year: "2022",
    link: "https://dx.doi.org/10.5748/19CONTECSI/PSE/ESD/6971",
  },
  {
    type: "congress",
    title:
      "A EVASAO DOS ESTUDANTES EM CURSOS DE COMPUTACAO: UM ESTUDO SOBRE A UNIVERSIDADE FEDERAL DO AMAPA",
    authors: ["BEZERRA DA SILVA, MATEUS", "CEZAR COSTA FURTADO, JULIO"],
    year: "2022",
    link: "https://dx.doi.org/10.5748/19CONTECSI/PSE/EDU/6972",
  },
  {
    type: "congress",
    title:
      "UM MAPEAMENTO DOS TIPOS DE JOGOS EM RELAÇÃO AOS NÍVEIS DA TAXONOMIA REVISADA DE BLOOM",
    authors: [
      "GUERRA, A.",
      "OLIVEIRA, Sandro Ronaldo Bezerra",
      "FURTADO, Julio C.",
    ],
    year: "2022",
    event: "International Conference on Information Systems and Technology Management - CONTECSI",
    location: "São Paulo - SP",
    proceedings: "Proceedings of 19h CONTECSI",
    link: "https://dx.doi.org/10.5748/19CONTECSI/PSE/EDU/698",
  },
  {
    type: "congress",
    title:
      "UMA ANALISE SOBRE HARD E SOFT SKILLS NA INDUSTRIA DE SOFTWARE BRASILEIRA",
    authors: [
      "LEAL ALVES, JULIANA",
      "DANTAS DE FREITAS FURTADO, STEPHANY",
      "CEZAR COSTA FURTADO, JULIO",
    ],
    year: "2022",
    link: "https://dx.doi.org/10.5748/19CONTECSI/PSE/EDU/6995",
  },
  {
    type: "congress",
    title:
      "A BIBLIOMETRIC ANALYSIS OF HCI APPROACHES IN THE CONTEXT OF MOBILE APPLICATIONS",
    authors: ["TAYNARA SANTOS MOREIRA MACIEL, AÍLA", "FURTADO, Julio"],
    year: "2021",
    event: "CONTECSI International Conference on Information Systems and Technology Management",
    location: "São Paulo - SP, 2021",
    link: "https://dx.doi.org/10.5748/18CONTECSI/PSE/ESD/6840",
  },
  {
    type: "congress",
    title:
      "A BIBLIOMETRIC ANALYSIS OF THE USE OF GAMES FOR TEACHING SOFTWARE ENGINEERING FROM A SYSTEMATIC LITERATURE REVIEW",
    authors: [
      "DOS SANTOS GUERRA, ANDERSON",
      "MONTEIRO NETO, EDSON",
      "FURTADO, Julio",
      "RONALDO BEZERRA OLIVEIRA, SANDRO",
    ],
    year: "2021",
    event: "CONTECSI International Conference on Information Systems and Technology Management",
    location: "São Paulo - SP, 2021",
    link: "https://dx.doi.org/10.5748/18contecsi/pse/esd/6734",
  },
  {
    type: "congress",
    title:
      "JSniffer: A Tool for Automatic Identification of Bad Smells in JAVA",
    authors: [
      "COSTA, M.",
      "CIUFFI, E.",
      "FURTADO, Julio C.",
    ],
    year: "2021",
    event: "International Conference on Information Systems and Technology Management - 18th CONTCSI",
    location: "São Paulo - SP",
    proceedings: "Archive CONTECSI",
    link: "https://dx.doi.org/10.5748/18CONTECSI/PSE/ESD/672",
  },
  {
    type: "congress",
    title:
      "Jogos de tabuleiros modernos para aprimorar a resolução de problemas em alunos de programação",
    authors: [
      "ARAUJO, E. A.",
      "ALEXANDRE, G. H. S.",
      "FURTADO, Julio C.",
    ],
    year: "2020",
    event: "Simpósio Brasileiro de Games e Entretenimento Digital - SBGames 2020",
    location: "Recife - PE",
    proceedings: "Anais do SBGames 2020",
  },
  {
    type: "congress",
    title:
      "An Experimental Evaluation of a Teaching Approach for Statistical Process Control for Software Engineers: An Experimental Study",
    authors: ["FURTADO, Julio", "OLIVEIRA, SANDRO"],
    year: "2019",
    pages: "153",
    event: "14th International Conference on Software Technologies",
    location: "Prague",
    proceedings: "Proceedings of the 14th International Conference on Software Technologies",
    link: "https://dx.doi.org/10.5220/0007772501530161",
  },
  {
    type: "congress",
    title:
      "Um Estudo sobre as Principais Dificuldades na Empregabilidade de um Engenheiro de Software",
    authors: ["MONTEIRO NETO, E.", "FURTADO, Julio C."],
    year: "2019",
    event: "IV Workshop sobre Aspectos Sociais, Humanos e Econômicos de Software",
    location: "Belém - PA",
    proceedings: "CSBC 2019 - WASHES",
  },
  {
    type: "congress",
    title:
      "A Practical Approach to Teaching Requirements Engineering in Computing Programs",
    authors: ["GUERRA, A.", "FURTADO, Julio C."],
    year: "2019",
    event: "The Fourteenth International Conference on Software Engineering Advances",
    location: "Espanha",
    proceedings: "Proceedings of The Fourteenth International Conference on Software Engineering Advances",
  },
  {
    type: "congress",
    title:
      "Uma abordagem focada no aluno para o ensino de Engenharia de Requisitos",
    authors: ["GUERRA, A.", "FURTADO, Julio C."],
    year: "2019",
    event: "eminário Argentina - Brasil de Tecnologias da Informação e da Comunicação 2019",
    location: "Rio Grande - RS",
    proceedings: "Anais do eminário Argentina - Brasil de Tecnologias da Informação e da Comunicação 2019",
  },
  {
    type: "congress",
    title:
      "A Methodology to Teaching Statistical Process Control in Computer Courses",
    authors: ["FURTADO, Julio Cezar Costa", "OLIVEIRA, Sandro Ronaldo Bezerra"],
    year: "2018",
    pages: "424",
    event: "13th International Conference on Evaluation of Novel Approaches to Software Engineering",
    location: "Funchal",
    proceedings: "Proceedings of the 13th International Conference on Evaluation of Novel Approaches to Software Engineering",
    link: "https://dx.doi.org/10.5220/0006800504240431",
  },
  {
    type: "congress",
    title:
      "AN¿LISE DA ADER¿NCIA DA FERRAMENTA DE SOFTWARE SPC EXPLORER PARA APOIAR O CONTROLE ESTAT¿STICO DE PROCESSOS DE SOFTWARE",
    authors: ["OLIVEIRA ABREU, DIEGO", "CEZAR COSTA FURTADO, JULIO"],
    year: "2018",
    event: "15th CONTECSI International Conference on Information Systems and Technology Management",
    location: "2018",
    link: "https://dx.doi.org/10.5748/9788599693148-15CONTECSI/PS-5769",
  },
  {
    type: "congress",
    title:
      "Evaluating Students' Perception of their Learning in a Student-Centered Software Engineering Course - A Experimental Study",
    authors: ["FURTADO, Julio C.", "OLIVEIRA, S. R. B."],
    year: "2018",
    event: "13th International Conference on Software Technologies - ICSOFT",
    location: "Porto, Portugal",
    proceedings: "Proceedings of 13th ICSOFT",
  },
  {
    type: "congress",
    title:
      "THE STATISTICAL PROCESS CONTROL IN SOFTWARE DEVELOPMENT PROJECTS: A SYSTEMATIC REVIEW OF LITERATURE",
    authors: [
      "RAMOS, ALUIZIO",
      "FURTADO, JÚLIO",
      "BATISTA, ARTHUR IVSON X. M.",
      "SILVA, GÉSSICA PINHEIRO DA",
      "OLIVEIRA, SANDRO R. B.",
    ],
    year: "2017",
    link: "https://dx.doi.org/10.5748/9788599693131-14contecsi/ps-4766",
  },
  {
    type: "congress",
    title:
      "A STUDY ON PERCEPTION OF THE USEFULNESS OF STATISTICAL PROCESS CONTROL IN SOFTWARE DEVELOPMENT ORGANIZATIONS: AN APPLICATION OF SURVEY",
    authors: ["FURTADO, JÚLIO", "OLIVEIRA, SANDRO R. B."],
    year: "2017",
    link: "https://dx.doi.org/10.5748/9788599693131-14CONTECSI/PS-4767",
  },
  {
    type: "congress",
    title:
      "A Strategy for Statistical Process Control Education in Computer Science",
    authors: ["FURTADO, Julio C.", "OLIVEIRA, S. R. B."],
    year: "2016",
    pages: "166-171",
    event: "11th International Conference on Software Engineering Advances",
    location: "Roma - Itália",
    proceedings: "The Eleventh International Conference on Software Engineering Advances",
  },
  {
    type: "congress",
    title:
      "Uma Abordagem de Ensino para o Controle Estatístico do Processo nos Cursos de Ciência da Computação",
    authors: ["FURTADO, Julio C.", "OLIVEIRA, Sandro Ronaldo Bezerra"],
    year: "2016",
    event: "IX Fórum de Educação em Engenharia de Software no XXX Simpósio Brasileiro de Engenharia de Software",
    location: "Maringá - PR",
    proceedings: "Anais do SBES 2016",
  },
  // Resumos em congressos
  {
    type: "conferenceAbstract",
    title:
      "Preliminary Evidence on the Use of Chatbots to Support Junior Software Professionals in Process Guidance",
    authors: [
      "NEVES, F.",
      "MACHADO, J.",
      "FURTADO, Julio C.",
    ],
    year: "2025",
    event: "XVIII Escola Regional de Informática Norte 2 (ERIN2)",
    location: "Macapá/AP",
    proceedings: "Anais da ERIN2",
  },
  {
    type: "conferenceAbstract",
    title:
      "EduGames: Uma Plataforma Web de Consulta a Jogos Digitais Educativos Para o Ensino de Computação",
    authors: ["NOGUEIRA, E. R.", "FURTADO, Julio C."],
    year: "2025",
    event: "XVIII Escola Regional de Informática Norte 2 (ERIN2)",
    location: "Macapá/AP",
    proceedings: "Anais da ERIN2",
  },
  {
    type: "conferenceAbstract",
    title:
      "Um Mapeamento Sistemático Sobre as Técnicas Emergentes de Pré-Processamento para Mitigação de Viés em Dados de Treinamento",
    authors: ["FILHO, M.", "FURTADO, Julio C."],
    year: "2025",
    event: "XVIII Escola Regional de Informática Norte 2 (ERIN2)",
    location: "Macapá/AP",
    proceedings: "Anais da ERIN2",
  },
  {
    type: "conferenceAbstract",
    title:
      "A Methodology to Teaching Statistical Process Control for Software Engineers: An Overview",
    authors: ["FURTADO, Julio C.", "OLIVEIRA, S. R. B."],
    year: "2018",
    event: "40th International Conference on Software Engineering",
    location: "Gothenburg, Sweden",
    proceedings: "Proceedings of 40th ICSE",
  },
]
