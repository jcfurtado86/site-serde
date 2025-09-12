import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import PageUp from "./components/PageUp/PageUp";
import { Montserrat } from "next/font/google";
import { Nunito } from "next/font/google";
import { ProjectsProvider } from "./context/ProjectsContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Serde",
  description: "Serde",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${montserrat.className} ${nunito.className} antialiased`}
      >
        <ProjectsProvider>
          <Nav />
          <PageUp />
          {children}

          <Footer />
        </ProjectsProvider>
      </body>
    </html>
  );
}
