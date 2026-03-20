"use client"
import { createContext, useContext } from "react"
import type {
  PublicationProps,
  PatentProps,
  StudentProps,
  TeacherProps,
  TCCProps,
  Project,
  ParceiroProps,
} from "./types"
import { publications, patents } from "./data/publications"
import { students, teachers } from "./data/members"
import { tccs } from "./data/tccs"
import { projectsData } from "./data/projects"
import { parcerias } from "./data/parcerias"

export type { FileProps, TCCProps, Project, ParceiroProps } from "./types"

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

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const value = {
    projects: projectsData,
    tccs,
    teachers,
    students,
    parcerias,
    publications,
    patents,
  }

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error("useProjects deve ser usado dentro de um ProjectsProvider")
  }
  return context
}
