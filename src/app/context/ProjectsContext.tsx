// app/context/ProjectsContext.js
"use client" // Contextos que mantêm estado (useState) precisam ser Client Components.
import { createContext, useContext } from "react"
import logo from "public/logo.png"
interface StudentProps {
  name: string
  institution: string
  campus: string
  email: string
  curriculumLink: string
  imageUrl: string
}
interface ExStudentProps {
  name: string
  institution: string
  campus: string
  email: string
  curriculumLink: string
  imageUrl: string
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

// 2. Defina os dados que serão compartilhados.
const students: StudentProps[] = [
  {
    name: "Adriane da Costa Ferreira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0201229307900067",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1564966Z5",
  },
  {
    name: "Augusto Fadanelli de Sousa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4905967797980110",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8077169T2",
  },
  {
    name: "Aymmée Nadine Diniz Neris",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/2629359369799722",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2703499D5",
  },
  {
    name: "Carlos Alberto Barbosa de Almeida Junior",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4624599784919056",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1546828T8",
  },
  {
    name: "Carlos Henrique Barreto Mareco",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3855670927634348",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2863059J8",
  },
  {
    name: "Celeste dos Santos Dantas",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3115743863912814",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1176961E2",
  },
  {
    name: "Dario Rodrigues do Carmo",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1169535933506040",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1582105J0",
  },

  {
    name: "Eduardo Sousa Lima",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3954320570829034",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8254705U6",
  },
  {
    name: "Eduardo Teixeira Flexa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0262199390232721",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1539994D7",
  },
  {
    name: "Enzo Cardoso de Castilho",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0919329108329523",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2547927T7",
  },
  {
    name: "Fernando Rafael Serra Neves",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8768694050430103",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8145617U2",
  },
  {
    name: "Gabriel Enrique Almeida Gonçalves",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6118298421134507",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K9052777Y7",
  },
  {
    name: "Gabriela Felipa da Silva Souza",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6676365359182975",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2406638Y4",
  },
  {
    name: "Guilherme Cosmo Lins de Souza",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/7683827799391036",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K9360787E2",
  },
  {
    name: "Heloysa Gama Uchoa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0368761867719344",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1567493H0",
  },
  {
    name: "Higor Souza da Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4972084328427721",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1124089J2",
  },
  {
    name: "Jhonathan Willan Costa Lobato",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/2338212383461581",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=0425737136",
  },
  {
    name: "João Pedro Viana Bezerra",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8605422148199555",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2896833J8",
  },
  {
    name: "João Victor Machado de Andrade",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8539615512841442",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2726689P6",
  },
  {
    name: "Johnathan Rocha de Sousa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3678750924075733",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4404089Z4",
  },
  {
    name: "José Clêmer Teixeira Pantoja",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1617755992099891",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2896102D7",
  },
  {
    name: "José Kaynã Pereira de Sousa Bitencourt",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8979398424386518",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1563227E0",
  },
  {
    name: "José Olimpio de Freitas Dias Júnior",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6283613146447214",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8080585T4",
  },
  {
    name: "Josilene Aline Soares Ferreira de Oliveira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6490034202076915",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1511232Z6",
  },
  {
    name: "Julia Vitoria Costa dos Santos",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/9085951782034759",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1545016Z6",
  },
  {
    name: "Katlen Vanessa dos Santos da Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8478985982111322",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1160296T9",
  },
  {
    name: "Kauê de Magalhães Brandão",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/5709405973358001",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1536946Y9",
  },
  {
    name: "Lorena Roberta Nunes Guimarães",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8067840813058871",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2406465Y1",
  },
  {
    name: "Lucas Havel Nobre Maia",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0003377526836527",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1508336H3",
  },
  {
    name: "Lucas Soutelo Souto Pinheiro",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4400152259018443",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2896840T9",
  },
  {
    name: "Luis Henrique Campos Mafra",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/9961825338528812",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1545234A4",
  },
  {
    name: "Luiz Felipe Moreira dos Anjos",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6967787408321484",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1561560P9",
  },
  {
    name: "Luma Gabriela Andrade da Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4278102715514258",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1546897P6",
  },
  {
    name: "Marcus Vinícyus Santos Figueira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1581056759223655",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1546822D2",
  },
  {
    name: "Maria Eduarda Smith Santana",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6344082541870444",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1561962J3",
  },
  {
    name: "Mariane da Silva Azevedo",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6849698686793236",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2445217D7",
  },
  {
    name: "Patrick Miranda dos Santos",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0003988321971896",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1530663D5",
  },
  {
    name: "Paula Maria Lacerda de Oliveira Costa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3684202517504539",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1544794A0",
  },
  {
    name: "Victor Gabriel Gomes Bahia",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1336036540136342",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1109471Z0",
  },
  {
    name: "Yasmim Pereira Melo",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/9750144066062051",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1544291J9",
  },
]
const exStudents: ExStudentProps[] = [
  {
    name: "Aíla Taynara Santos Moreira Maciel",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0285174097186394",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2100157A0",
  },
  {
    name: "Alexsandro Monteiro Nascimento Callins",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/2451866311989595",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1148930T6",
  },
  {
    name: "Carlos Eduardo Brito da Silva dos Santos",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/7238237839067724",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8804965Z9",
  },
  {
    name: "Davi Alberto Correa Silva do Carmo",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1934281181551924",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2774836U2",
  },
  {
    name: "Edson Monteiro Neto",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1270283553777603",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8151323E4",
  },
  {
    name: "Eduardo Luigi Tavares da Silva Ciuffi",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: " http://lattes.cnpq.br/8996710321421005",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2701533T0",
  },
  {
    name: "Eduardo Rodrigues Nogueira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3772381642880757",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8068695T1",
  },
  {
    name: "Erick da Cunha Sampaio",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3394751225824953",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8169200T6",
  },
  {
    name: "Gabriel Melo da Silveira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1810258668918861",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8151934Y3",
  },
  {
    name: "Edson Monteiro Neto",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1270283553777603",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8151323E4",
  },
  {
    name: "Juliana Leal Alves",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4617405056839703",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8913815D6",
  },
  {
    name: "Luís César Martins Amaral",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8829459581349801",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2109801U5",
  },
  {
    name: "Marco Antonio da Silva Neves Filho",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/7123969561902651",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4373842E3",
  },
  {
    name: "Mateus Bezerra da Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0650268746194141",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8846994Y0",
  },
  {
    name: "Matheus Costa Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "julio@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/9735600071757777",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8972040P1",
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
  exStudents: ExStudentProps[]
  students: StudentProps[]
  parcerias: ParceiroProps[]
}>({
  projects: [],
  tccs: [],
  teachers: [],
  exStudents: [],
  students: [],
  parcerias: [],
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
    exStudents: exStudents,
    students: students,
    parcerias: parcerias,
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
