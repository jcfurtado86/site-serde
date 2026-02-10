# 🔬 SERDE - Landing Page do Grupo de Pesquisa

Uma plataforma moderna e responsiva para compartilhar informações, projetos e participantes do grupo de pesquisa SERDE.

## 📋 Sobre o Projeto

A landing page SERDE foi desenvolvida para apresentar e divulgar o grupo de pesquisa SERDE, destacando informações sobre os participantes (orientadores, mestrandos e alunos de graduação em Ciência da Computação), publicações, projetos e parcerias.

## 🚀 Tecnologias Utilizadas

- **Next.js 15+** - Framework React com renderização otimizada
- **TypeScript** - Tipagem estática para melhor qualidade de código
- **Tailwind CSS** - Framework CSS utility-first para estilização
- **React** - Biblioteca para construção de componentes UI

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas e layout principal
│   ├── (pages)/           # Rotas dinâmicas
│   │   ├── blog/          # Seção de blog
│   │   ├── membros/       # Lista de membros
│   │   ├── parcerias/     # Parcerias
│   │   ├── projetos/      # Projetos de pesquisa
│   │   └── publicacoes/   # Publicações
│   ├── components/        # Componentes reutilizáveis
│   │   ├── About/         # Seção sobre o projeto
│   │   ├── BreadCrumb/    # Navegação em trilha
│   │   ├── Footer/        # Rodapé
│   │   ├── HeroSection/   # Seção destaque
│   │   ├── Nav/           # Navegação principal
│   │   ├── PageUp/        # Botão voltar ao topo
│   │   ├── RecentPost/    # Posts recentes
│   │   └── SearchBar/     # Barra de pesquisa
│   ├── context/           # Contextos React
│   │   └── ProjectsContext.tsx
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página home
public/
└── image/                 # Imagens do projeto
build/                     # Build gerado (ignorar)
```

## 🎨 Design

O design segue os padrões visuais da logo do grupo SERDE, implementando:

- **Hero Section** - Seção de destaque com informações principais
- **Cards** - Componentes para exibir trabalhos e participantes
- **Listas** - Apresentação organizada de conteúdos
- **Design Responsivo** - Otimizado para desktop, tablet e mobile

## 🛠️ Como Usar

### Instalação

1. Clone o repositório:
```bash
git clone <seu-repositório>
cd site-serde
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (se necessário):
```bash
cp .env.example .env.local
```

### Desenvolvimento

Para rodar o servidor de desenvolvimento:

```bash
npm run dev
```

O site estará disponível em [http://localhost:3000](http://localhost:3000)

### Build para Produção

```bash
npm run build
npm start
```

## 📄 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build para produção
- `npm start` - Inicia servidor de produção
- `npm run lint` - Executa verificação de linting

## 📚 Seções Principais

- **Home** - Página inicial com overview do projeto
- **Sobre** - Informações detalhadas sobre o SERDE
- **Membros** - Lista de orientadores e pesquisadores
- **Projetos** - Projetos de pesquisa em desenvolvimento
- **Publicações** - Artigos e publicações do grupo
- **Parcerias** - Instituições e empresas parceiras
- **Blog** - Notícias e atualizações

## 🤝 Contribuindo

Para contribuir com este projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE) - veja o arquivo LICENSE para mais detalhes.

## 📧 Contato

Para mais informações sobre o grupo de pesquisa SERDE, entre em contato com os coordenadores.

---

**Desenvolvido com ❤️ para o Grupo de Pesquisa SERDE**
