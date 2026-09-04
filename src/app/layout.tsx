import type { Metadata } from "next"
import "./globals.css"
import Nav from "./components/Nav/Nav"
import Footer from "./components/Footer/Footer"
import PageUp from "./components/PageUp/PageUp"
import { Montserrat } from "next/font/google"
import { Nunito } from "next/font/google"
import { Questrial } from "next/font/google"
import { ProjectsProvider } from "./context/ProjectsContext"
import { LanguageProvider } from "./i18n/context"
import DynamicHead from "./components/DynamicHead/DynamicHead"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

// Questrial só existe no peso 400. Servida pelo next/font (self-hosted) porque
// o CSP em next.config.ts bloqueia stylesheet/fonte vindas do Google Fonts.
const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-questrial",
})

export const metadata: Metadata = {
  title: "SERDE - Software Engineering: Research, Development and Education",
  description: "Grupo de pesquisa em Engenharia de Software da UNIFAP - Universidade Federal do Amapá | Software Engineering Research Group at UNIFAP - Federal University of Amapá",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={` ${montserrat.className} ${nunito.className} ${questrial.variable} antialiased `}>
        <LanguageProvider>
          <DynamicHead />
          <ProjectsProvider>
            <Nav />
            <PageUp />
            {children}
            <Footer />
          </ProjectsProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
