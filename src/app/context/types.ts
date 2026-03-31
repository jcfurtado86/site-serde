export interface PublicationProps {
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
  patentNumber?: string
  registrationDate?: string
  registrationInstitution?: string
  patentType?: string
}

export interface PatentProps {
  number?: number
  title: string
  authors: string[]
  year: number | string
  link?: string
  patentNumber?: string
  registrationDate?: string
  registrationInstitution?: string
  patentType?: string
}

export interface StudentProps {
  name: string
  institution: string
  campus: string
  email?: string
  curriculumLink?: string
  imageUrl?: string
  type: string
  degree?: string
  imagePosition?: "center" | "top"
}

export interface TeacherProps {
  name: string
  institution: string
  campus: string
  email?: string
  curriculumLink?: string
  imageUrl?: string
  imagePosition?: "center" | "top"
}

export interface FileProps {
  name: string
  type: "article" | "video"
  link: string
}

export interface TCCProps {
  title: string
  title_en?: string
  link: string
  documentation?: FileProps[]
  status: string
  students: string[]
  advisor: string
  year: string
  keywords: string
  description?: string
  description_en?: string
  degree?: string
}

export interface Project {
  title: string
  title_en?: string
  description: string
  description_en?: string
  professor: string
  status: string
  type: string
  link: string
  documentation: FileProps[]
  period?: string
  team?: string[]
  funding?: string
}

export interface InnovationProject {
  title: string
  program: string
  year: string
  thematicAxis: string
  problemAndOpportunity: string
  originContext: string
  proposedSolution: string
  team: string[]
  resultAndRecognition: string
  link: string
  logoUrl?: string
}

export interface ParceiroProps {
  title: string
  description: string
  logoURL: string
  websiteURL: string
}
