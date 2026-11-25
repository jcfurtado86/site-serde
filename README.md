# SERDE - Site do Grupo de Pesquisa

Site do grupo de pesquisa SERDE (Software Engineering: Research, Development and Education), vinculado à Universidade Federal do Amapá (UNIFAP).

## Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **PM2** - Gerenciamento de processo em produção

## Estrutura

```
src/app/
├── (pages)/              # Páginas do site
│   ├── membros/          # Membros do grupo
│   ├── orientacoes/      # Orientações concluídas e em andamento
│   ├── parcerias/        # Parcerias institucionais
│   ├── projetos/         # Projetos de pesquisa
│   └── publicacoes/      # Publicações e patentes
├── components/           # Componentes reutilizáveis (Nav, Footer, etc.)
├── context/              # Context React + dados estáticos
│   └── data/             # Dados do site (members, publications, projects, tccs)
├── i18n/                 # Internacionalização (PT/EN)
│   ├── context.tsx       # LanguageProvider + useLanguage hook
│   ├── pt.json           # Dicionário português
│   └── en.json           # Dicionário inglês
scripts/                  # Scripts de atualização de dados
├── update-all.ts         # Script unificado (lattes + repositório + membros)
├── update-members.ts     # Importa membros do CNPq DGP
├── update-lattes.ts      # Importa publicações/projetos/orientações do Lattes
├── update-repository.ts  # Enriquece orientações com o Repositório UNIFAP
├── lattes-api.ts         # Busca e converte os dados da API do Lattes
└── ts-generator.ts       # Gera arquivos TypeScript de dados
```

## Desenvolvimento

```bash
npm install
npm run dev
```

O site estará disponível em http://localhost:3000

## Atualização de Dados

Os dados do site (membros, publicações, orientações) são gerados por scripts que importam do CNPq e do Lattes.

### Atualizar tudo de uma vez

```bash
npm run update
```

### Atualizar individualmente

```bash
npm run update-members   # Importa membros do CNPq DGP
npm run update-lattes    # Importa publicações/projetos/orientações do Lattes
```

### Fluxo completo

1. Rode `npm run update` (não é preciso baixar nada: o currículo vem direto da API do Lattes)
2. Revise as mudanças em `src/app/context/data/` e `public/members/`
3. Commit e push — o deploy é automático via GitHub Actions

### De onde vêm os dados

- **Lattes:** desde nov/2026 o currículo fica em `https://busca-cv-lattes.cnpq.br/curriculo/<id>`, uma aplicação que monta a página no navegador (salvar o HTML não traz os dados). O `lattes-api.ts` lê a API pública por trás dela (`busca-cv-lattes-api.cnpq.br`), que segue o esquema do XML do Lattes e não exige captcha nas rotas do currículo.
- **Membros:** tabelas do grupo no DGP. Um aluno vira egresso quando está na tabela de egressos do DGP **e** tem orientação concluída no Lattes; uma vez egresso, não volta a ser aluno.
- **Fotos:** quem já tem foto pelo ID curto (`K…`) continua no `servicosweb.cnpq.br`, que dá a imagem maior. Membros novos usam a foto da nova plataforma pelo número do Lattes (PNG menor), porque o ID curto não pode mais ser descoberto.

## Internacionalização

O site suporta português (padrão) e inglês, alternável pelo botão de bandeira na navegação. A preferência é salva no localStorage.

- Labels e textos da interface: `src/app/i18n/pt.json` e `en.json`
- Conteúdo de projetos e orientações: campos `title_en` e `description_en` nos dados
- Publicações: mantidas no idioma original (não traduzidas)

## Build e Deploy

```bash
npm run build
npm start
```

O deploy para produção é automático via GitHub Actions ao fazer push na branch `main`. O pipeline faz SSH no servidor, puxa as mudanças, builda e reinicia o PM2.

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Servidor de produção |
| `npm run lint` | Verificação de linting |
| `npm run update` | Atualiza todos os dados (membros + lattes) |
| `npm run update-members` | Atualiza apenas membros (CNPq DGP) |
| `npm run update-lattes` | Atualiza publicações e orientações (Lattes HTML) |
