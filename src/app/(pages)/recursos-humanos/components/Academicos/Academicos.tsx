interface StudentProps {
  name: string
  institution: string
  campus: string
  email: string
  curriculumLink: string
  imageUrl: string
}

function Student({ name, institution, campus, email, curriculumLink, imageUrl }: StudentProps) {
  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          width={200}
          height={200}
          loading="lazy"
          className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <svg className="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
      <div className="p-8">
        <h2 className="text-2xl text-gray-800 font-bold mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">{name}</h2>
        <p className="text-base text-gray-600 mb-6 line-clamp-2">{institution} - {campus}</p>
        <div className="flex gap-6">
          <a href={curriculumLink} className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2" target="_blank">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Currículo Lattes
          </a>
        </div>
      </div>
    </div>
  )
}

export function Students() {
  const students: StudentProps[] = [
  {
    name: "Adriane da Costa Ferreira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0201229307900067",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1564966Z5"
  },
  {
    name: "Augusto Fadanelli de Sousa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4905967797980110",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8077169T2"
  },
  {
    name: "Aymmée Nadine Diniz Neris",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/2629359369799722",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2703499D5"
  },
  {
    name: "Carlos Alberto Barbosa de Almeida Junior",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4624599784919056",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1546828T8"
  },
  {
    name: "Carlos Henrique Barreto Mareco",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3855670927634348",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2863059J8"
  },
  {
    name: "Celeste dos Santos Dantas",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3115743863912814",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1176961E2"
  },
  {
    name: "Dario Rodrigues do Carmo",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1169535933506040",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1582105J0"
  },
  {
    name: "Eduardo Rodrigues Nogueira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3772381642880757",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8068695T1"
  },
  {
    name: "Eduardo Sousa Lima",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3954320570829034",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8254705U6"
  },
  {
    name: "Eduardo Teixeira Flexa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0262199390232721",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1539994D7"
  },
  {
    name: "Enzo Cardoso de Castilho",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0919329108329523",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2547927T7"
  },
  {
    name: "Fernando Rafael Serra Neves",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8768694050430103",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8145617U2"
  },
  {
    name: "Gabriel Enrique Almeida Gonçalves",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6118298421134507",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K9052777Y7"
  },
  {
    name: "Gabriela Felipa da Silva Souza",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6676365359182975",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2406638Y4"
  },
  {
    name: "Guilherme Cosmo Lins de Souza",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/7683827799391036",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K9360787E2"
  },
  {
    name: "Heloysa Gama Uchoa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0368761867719344",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1567493H0"
  },
  {
    name: "Higor Souza da Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4972084328427721",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1124089J2"
  },
  {
    name: "Jhonathan Willan Costa Lobato",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/2338212383461581",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=0425737136"
  },
  {
    name: "João Pedro Viana Bezerra",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8605422148199555",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2896833J8"
  },
  {
    name: "João Victor Machado de Andrade",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8539615512841442",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2726689P6"
  },
  {
    name: "Johnathan Rocha de Sousa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3678750924075733",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4404089Z4"
  },
  {
    name: "José Clêmer Teixeira Pantoja",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1617755992099891",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2896102D7"
  },
  {
    name: "José Kaynã Pereira de Sousa Bitencourt",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8979398424386518",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1563227E0"
  },
  {
    name: "José Olimpio de Freitas Dias Júnior",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6283613146447214",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K8080585T4"
  },
  {
    name: "Josilene Aline Soares Ferreira de Oliveira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6490034202076915",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1511232Z6"
  },
  {
    name: "Julia Vitoria Costa dos Santos",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/9085951782034759",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1545016Z6"
  },
  {
    name: "Katlen Vanessa dos Santos da Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8478985982111322",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1160296T9"
  },
  {
    name: "Kauê de Magalhães Brandão",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/5709405973358001",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1536946Y9"
  },
  {
    name: "Lorena Roberta Nunes Guimarães",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/8067840813058871",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2406465Y1"
  },
  {
    name: "Lucas Havel Nobre Maia",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0003377526836527",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1508336H3"
  },
  {
    name: "Lucas Soutelo Souto Pinheiro",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4400152259018443",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2896840T9"
  },
  {
    name: "Luis Henrique Campos Mafra",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/9961825338528812",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1545234A4"
  },
  {
    name: "Luiz Felipe Moreira dos Anjos",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6967787408321484",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1561560P9"
  },
  {
    name: "Luma Gabriela Andrade da Silva",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/4278102715514258",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1546897P6"
  },
  {
    name: "Marco Antonio da Silva Neves Filho",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/7123969561902651",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4373842E3"
  },
  {
    name: "Marcus Vinícyus Santos Figueira",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1581056759223655",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1546822D2"
  },
  {
    name: "Maria Eduarda Smith Santana",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6344082541870444",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1561962J3"
  },
  {
    name: "Mariane da Silva Azevedo",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/6849698686793236",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K2445217D7"
  },
  {
    name: "Patrick Miranda dos Santos",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/0003988321971896",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1530663D5"
  },
  {
    name: "Paula Maria Lacerda de Oliveira Costa",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/3684202517504539",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1544794A0"
  },
  {
    name: "VICTOR Gabriel gomes bahia",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/1336036540136342",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1109471Z0"
  },
  {
    name: "Yasmim Pereira Melo",
    institution: "Unifap",
    campus: "Campus Unifap",
    email: "email@unifap.br",
    curriculumLink: "http://lattes.cnpq.br/9750144066062051",
    imageUrl: "http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K1544291J9"
  }
];

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 text-center mb-16">
          Acadêmicos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {students.map((student, index) => (
            <Student key={index} {...student} />
          ))}
        </div>
      </div>
    </main>
  )
}