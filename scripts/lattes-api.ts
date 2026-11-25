/**
 * Importa o currículo da nova plataforma do Lattes (busca-cv-lattes.cnpq.br).
 *
 * Desde nov/2026 a página do currículo é uma aplicação Angular que monta o conteúdo
 * no navegador, então salvar o HTML não traz mais os dados. Eles vêm de uma API JSON
 * pública (sem captcha nas rotas do currículo), que segue o esquema do XML do Lattes.
 *
 * Este módulo busca as seções e converte para os mesmos tipos que o parser antigo
 * de HTML gerava, para que a mesclagem com os dados locais continue funcionando.
 */
import * as cheerio from "cheerio"
import type { PublicationProps, PatentProps, Project, TCCProps } from "../src/app/context/types"
import { fixCasing } from "./fix-casing"

export const LATTES_ID = "9175382702970383"
export const PROFESSOR = "Julio Cezar Costa Furtado"

const API_BASE = "https://busca-cv-lattes-api.cnpq.br/busca-textual-api/v1/busca-curriculo/cv"
const TIMEOUT_MS = 90_000
const MAX_RETRIES = 3

// --- Tipos da API (só os campos usados) ---

interface ApiAutor {
  nomeCitacaoBibliografica: string
  nroIdCnpq: string | null
}

interface ApiCitacao {
  codBaseBibliografica: number // 1 = Web of Science, 2 = SciELO, 3 = Scopus
  nroCitacoes: number | null
}

interface ApiProducao {
  tituloProducao: string
  anoProducao: string
  tipoProducao: string
  subTipoproducao: string
  producaoNomeTipo: string | null
  coautores: ApiAutor[] | null
  urlProducao: string | null
  nomeEvento: string | null
  tituloDosAnaisOuProcedings: string | null
  citacoes: ApiCitacao[] | null
  capitulosLivro: { referenciaCapituloFormatada: string | null; referenciaLivroFormatada: string | null }[] | null
  tituloPeriodicoPublic: string | null
  numeroVolume: string | null
  numeroPaginaInicial: string | null
  numeroPaginaFinal: string | null
  cidadeEditora: string | null
  nomeEditora: string | null
}

interface ApiPatente {
  tituloProducao: string
  tpoProducao: string
  anoProducao: string
  dataRegistro: string | null
  numeroRegistro: string | null
  institutoDeRegistro: string | null
  instituicaoFinanciadora: string | null
  coautores: ApiAutor[] | null
}

interface ApiOrientacao {
  tituloProducao: string
  anoProducao: string
  codTipoProducao: string | null
  tipoProducao: string | null
  tipoOrientacao: string // "Concluída" | "Em andamento"
  tpoOrientacao: string | null // "ORIENTADOR_PRINCIPAL" | "CO_ORIENTADOR" | ""
  curso: string | null
  nomeOrientado: string | null
}

export interface LattesApiData {
  producao: ApiProducao[]
  orientacoes: ApiOrientacao[]
  patentes: ApiPatente[]
  atuacoesXml: string
}

// --- Busca ---

async function fetchWithRetry(url: string, accept: string): Promise<Response> {
  let lastError: unknown
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, { headers: { Accept: accept }, signal: AbortSignal.timeout(TIMEOUT_MS) })
      if (res.ok) return res
      lastError = new Error(`HTTP ${res.status}`)
    } catch (err) {
      lastError = err
    }
    if (attempt < MAX_RETRIES) await new Promise((r) => setTimeout(r, 2000 * attempt))
  }
  throw new Error(`Falha ao buscar ${url}: ${lastError}`)
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetchWithRetry(`${API_BASE}/${LATTES_ID}/${path}`, "application/json")
  return (await res.json()) as T
}

export async function fetchLattesApi(): Promise<LattesApiData> {
  const [producao, orientacoes, patentes, atuacoesXml] = await Promise.all([
    fetchJson<ApiProducao[]>("producao"),
    fetchJson<ApiOrientacao[]>("orientacoes"),
    fetchJson<ApiPatente[]>("patentes"),
    fetchWithRetry(`${API_BASE}/${LATTES_ID}/secao.xml?secao=atuacoes`, "application/xml").then((r) => r.text()),
  ])
  return { producao, orientacoes, patentes, atuacoesXml }
}

// --- Utilitários ---

// A API devolve alguns textos com entidades HTML (&amp;) e com caracteres de controle
// C1 que, na origem, eram pontuação do Windows-1252 (ex.: \x96 = travessão).
const CP1252_C1: Record<string, string> = {
  "\x91": "‘", "\x92": "’", "\x93": "“", "\x94": "”", "\x96": "–", "\x97": "—", "\x85": "…",
}
const HTML_ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " }

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10)
      return Number.isFinite(n) ? String.fromCodePoint(n) : m
    }
    return HTML_ENTITIES[code.toLowerCase()] ?? m
  })
}

function clean(text: string | null | undefined): string {
  return decodeEntities(text ?? "")
    .replace(/[\x80-\x9f]/g, (c) => CP1252_C1[c] ?? " ")
    .replace(/\s+/g, " ")
    .trim()
}

function yearOf(text: string | null | undefined): number {
  return parseInt(clean(text), 10)
}

function authorsOf(coautores: ApiAutor[] | null): string[] {
  return (coautores ?? []).map((a) => fixCasing(clean(a.nomeCitacaoBibliografica))).filter(Boolean)
}

function doiLink(url: string | null): string | undefined {
  const u = clean(url)
  if (!u) return undefined
  if (/^https?:\/\//i.test(u)) return u
  if (/^10\.\d+\//.test(u)) return `http://dx.doi.org/${u}`
  return undefined
}

function pageRange(start: string | null, end: string | null): string | undefined {
  const s = clean(start)
  const e = clean(end)
  if (!s && !e) return undefined
  return e ? `${s}-${e}` : s
}

function citations(p: ApiProducao, base: number): number | undefined {
  const c = (p.citacoes ?? []).find((x) => x.codBaseBibliografica === base)
  // A página antiga só exibia a contagem quando havia citações.
  return c && typeof c.nroCitacoes === "number" && c.nroCitacoes > 0 ? c.nroCitacoes : undefined
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 100)
}

function stripTrailingDot(text: string): string {
  return text.replace(/\.\s*$/, "")
}

// --- Publicações ---

function parseArticle(p: ApiProducao): PublicationProps {
  const edition = clean(p.numeroVolume)
  const pages = pageRange(p.numeroPaginaInicial, p.numeroPaginaFinal)
  const link = doiLink(p.urlProducao)
  const webCitations = citations(p, 1)
  const scopusCitations = citations(p, 3)
  return {
    type: "article",
    title: fixCasing(stripTrailingDot(clean(p.tituloProducao))),
    authors: authorsOf(p.coautores),
    publisher: fixCasing(clean(p.tituloPeriodicoPublic)),
    year: clean(p.anoProducao),
    ...(edition && { edition }),
    ...(pages && { pages }),
    ...(link && { link }),
    ...(webCitations !== undefined && { webCitations }),
    ...(scopusCitations !== undefined && { scopusCitations }),
  }
}

function parseBook(p: ApiProducao): PublicationProps {
  const ref = clean(p.capitulosLivro?.[0]?.referenciaLivroFormatada)
  const edition = ref.match(/^(\d+\.\s*ed\.?)/)?.[1]
  const publisher = clean(p.nomeEditora)
  const pages = clean(p.numeroPaginaInicial)
  return {
    type: "book",
    title: fixCasing(stripTrailingDot(clean(p.tituloProducao))),
    authors: authorsOf(p.coautores),
    ...(edition && { edition }),
    ...(publisher && { publisher: fixCasing(publisher) }),
    year: clean(p.anoProducao),
    ...(pages && { pages: `${pages}p` }),
    link: "#",
  }
}

function parseChapter(p: ApiProducao): PublicationProps {
  // A API não traz o título do livro (que o site usa como publisher); a mesclagem
  // preserva o valor local quando o campo vem vazio.
  const ref = clean(p.capitulosLivro?.[0]?.referenciaCapituloFormatada)
  const edition = ref.match(/(\d+\s*ed\.?)/)?.[1]
  const start = clean(p.numeroPaginaInicial)
  const end = clean(p.numeroPaginaFinal)
  return {
    type: "chapter",
    title: fixCasing(stripTrailingDot(clean(p.tituloProducao))),
    authors: authorsOf(p.coautores),
    ...(edition && { edition }),
    year: clean(p.anoProducao),
    ...(start && { pages: `p. ${start}-${end}` }),
    link: "#",
  }
}

function parseCongress(p: ApiProducao): PublicationProps {
  const type = p.producaoNomeTipo === "Completo" ? "congress" : "conferenceAbstract"
  const event = clean(p.nomeEvento)
  const location = clean(p.cidadeEditora)
  const proceedings = clean(p.tituloDosAnaisOuProcedings)
  const link = doiLink(p.urlProducao)
  const pages = pageRange(p.numeroPaginaInicial, p.numeroPaginaFinal)
  return {
    type,
    title: fixCasing(stripTrailingDot(clean(p.tituloProducao))),
    authors: authorsOf(p.coautores),
    year: clean(p.anoProducao),
    ...(event && { event: fixCasing(event) }),
    ...(location && { location: fixCasing(location) }),
    ...(proceedings && { proceedings: fixCasing(proceedings) }),
    ...(link && { link }),
    ...(pages && { pages }),
  }
}

export function parsePublications(producao: ApiProducao[], minYear: number): PublicationProps[] {
  const books: PublicationProps[] = []
  const chapters: PublicationProps[] = []
  const articles: PublicationProps[] = []
  const congress: PublicationProps[] = []

  for (const p of producao) {
    if (p.tipoProducao !== "Produção Bibliográfica") continue
    if (!(yearOf(p.anoProducao) >= minYear)) continue

    const sub = p.subTipoproducao
    const nome = p.producaoNomeTipo ?? ""
    if (sub === "Artigos Completos publicados em periódicos") articles.push(parseArticle(p))
    else if (sub === "Livros e Capítulos" && /^Livro/i.test(nome)) books.push(parseBook(p))
    else if (sub === "Livros e Capítulos" && /^Cap/i.test(nome)) chapters.push(parseChapter(p))
    else if (sub === "Trabalhos publicados em anais de congressos") congress.push(parseCongress(p))
    // Artigos aceitos e apresentações de trabalho não aparecem no site (igual ao parser antigo).
  }

  // Mesma ordem do parser antigo; dentro de cada grupo, a API já vem do mais novo ao mais antigo.
  const congressFull = congress.filter((c) => c.type === "congress")
  const abstracts = congress.filter((c) => c.type === "conferenceAbstract")
  return [...books, ...chapters, ...articles, ...congressFull, ...abstracts]
}

// --- Patentes / programas de computador ---

function formatDateBr(iso: string | null): string | undefined {
  const m = clean(iso).match(/^(\d{4})-(\d{2})-(\d{2})/)
  return m ? `${m[3]}/${m[2]}/${m[1]}` : undefined
}

export function parsePatents(patentes: ApiPatente[]): PatentProps[] {
  return patentes
    .filter((p) => /programa de computador/i.test(p.tpoProducao))
    .map((p) => {
      const patentNumber = clean(p.numeroRegistro)
      const registrationDate = formatDateBr(p.dataRegistro)
      const registrationInstitution = clean(p.institutoDeRegistro)
      const fundingInstitution = clean(p.instituicaoFinanciadora)
      return {
        title: fixCasing(stripTrailingDot(clean(p.tituloProducao))),
        authors: authorsOf(p.coautores),
        ...(patentNumber && { patentNumber }),
        ...(registrationDate && { registrationDate }),
        ...(registrationInstitution && { registrationInstitution }),
        ...(fundingInstitution && { fundingInstitution: fixCasing(fundingInstitution) }),
        patentType: "Programa de Computador",
      }
    })
}

// --- Projetos (seção "atuacoes", em XML no esquema do Lattes) ---

const PROJECT_TYPE: Record<string, string> = {
  PESQUISA: "Pesquisa",
  EXTENSAO: "Extensão",
  DESENVOLVIMENTO: "Desenvolvimento",
  ENSINO: "Ensino",
  OUTRA: "Outra",
}

const FUNDING_TYPE: Record<string, string> = {
  BOLSA: "Bolsa",
  AUXILIO_FINANCEIRO: "Auxílio financeiro",
  COOPERACAO: "Cooperação",
  REMUNERACAO: "Remuneração",
  OUTRA: "Outra",
  OUTRO: "Outra",
}

function titleCaseLabel(raw: string): string {
  const s = raw.replace(/_/g, " ").toLowerCase()
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function parseProjects(atuacoesXml: string, minYear: number): Project[] {
  const $ = cheerio.load(atuacoesXml, { xml: true })
  const projects: Project[] = []
  const seen = new Set<string>()

  $("PROJETO-DE-PESQUISA").each((_, el) => {
    const $p = $(el)
    const title = clean($p.attr("NOME-DO-PROJETO"))
    const startYear = yearOf($p.attr("ANO-INICIO"))
    if (!title || !(startYear >= minYear)) return

    const members = $p
      .find("INTEGRANTES-DO-PROJETO")
      .toArray()
      .map((m) => ({
        name: clean($(m).attr("NOME-COMPLETO")),
        responsible: $(m).attr("FLAG-RESPONSAVEL") === "SIM",
        order: parseInt($(m).attr("ORDEM-DE-INTEGRACAO") ?? "0", 10) || 0,
      }))
      .sort((a, b) => a.order - b.order)

    const coordinator = members.find((m) => m.responsible)?.name ?? ""
    // Só projetos coordenados pelo professor (igual ao parser antigo).
    if (coordinator !== PROFESSOR) return

    // O mesmo projeto pode aparecer em mais de um vínculo profissional.
    const key = slugify(title)
    if (seen.has(key)) return
    seen.add(key)

    const endYear = clean($p.attr("ANO-FIM"))
    const situacao = clean($p.attr("SITUACAO"))
    const status = situacao === "CONCLUIDO" ? "Finalizado" : situacao === "EM_ANDAMENTO" ? "Em andamento" : titleCaseLabel(situacao)
    const natureza = clean($p.attr("NATUREZA"))
    const team = members.map((m) => m.name).filter(Boolean)
    const funding = $p
      .find("FINANCIADOR-DO-PROJETO")
      .toArray()
      .map((f) => {
        const name = clean($(f).attr("NOME-INSTITUICAO"))
        const nat = clean($(f).attr("NATUREZA"))
        const label = FUNDING_TYPE[nat] ?? (nat ? titleCaseLabel(nat) : "")
        return label ? `${name} - ${label}` : name
      })
      .filter(Boolean)
      .join(" / ")

    projects.push({
      title,
      description: stripTrailingDot(clean($p.attr("DESCRICAO-DO-PROJETO"))),
      professor: coordinator,
      status,
      type: PROJECT_TYPE[natureza] ?? titleCaseLabel(natureza),
      link: key,
      documentation: [],
      period: `${startYear} - ${endYear || "Atual"}`,
      ...(team.length > 0 && { team }),
      ...(funding && { funding }),
    })
  })

  return projects
}

// --- Orientações ---

function degreeOf(o: ApiOrientacao): string | null {
  const kind = `${o.codTipoProducao ?? ""} ${o.tipoProducao ?? ""}`.toLowerCase()
  if (kind.includes("cient")) return null // Iniciação Científica não entra no site
  if (kind.includes("mestrado")) return "Mestrado"
  if (kind.includes("doutorado") || kind.includes("tese")) return "Doutorado"
  if (kind.includes("aperfei") || kind.includes("especializ")) return "Especialização"
  return "Graduação"
}

function courseOf(curso: string, degree: string): string | undefined {
  const c = clean(curso)
  if (!c) return undefined
  if (degree === "Graduação") return /^gradua/i.test(c) ? c : `Graduação em ${c}`
  if (degree === "Especialização") return /^especializ/i.test(c) ? c : `Especialização em ${c}`
  return c.replace(/^Mestrado(?:\s+profissional)?\s+em\s+Mestrado\s+Profissional/i, "Mestrado Profissional")
}

function splitStudents(text: string): string[] {
  if (text.includes(";")) return text.split(";").map((s) => s.trim()).filter(Boolean)
  const parts = text.split(" e ")
  if (parts.length === 2 && parts[0].trim().length > 3 && parts[1].trim().length > 3) {
    return parts.map((s) => s.trim())
  }
  return [text.trim()]
}

export function parseOrientations(orientacoes: ApiOrientacao[], minYear: number): TCCProps[] {
  const result: TCCProps[] = []
  // Em andamento primeiro, depois concluídas (mesma ordem do parser antigo).
  const ordered = [
    ...orientacoes.filter((o) => o.tipoOrientacao !== "Concluída"),
    ...orientacoes.filter((o) => o.tipoOrientacao === "Concluída"),
  ]

  for (const o of ordered) {
    if (o.tpoOrientacao === "CO_ORIENTADOR") continue // só orientações principais
    const degree = degreeOf(o)
    if (!degree) continue
    const year = clean(o.anoProducao)
    if (!(parseInt(year, 10) >= minYear)) continue

    const title = stripTrailingDot(clean(o.tituloProducao))
    if (!title) continue
    const course = courseOf(o.curso ?? "", degree)

    result.push({
      title: fixCasing(title),
      description: "",
      link: slugify(title),
      status: o.tipoOrientacao === "Concluída" ? "Finalizado" : "Em andamento",
      students: splitStudents(clean(o.nomeOrientado)).map(fixCasing),
      advisor: PROFESSOR,
      year,
      keywords: "",
      degree,
      ...(course ? { course } : {}),
    })
  }

  return result
}

// --- Tudo junto ---

export function parseLattesApi(data: LattesApiData, minYear: number) {
  return {
    publications: parsePublications(data.producao, minYear),
    patents: parsePatents(data.patentes),
    projects: parseProjects(data.atuacoesXml, minYear),
    orientations: parseOrientations(data.orientacoes, minYear),
  }
}
