import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import PageUp from "./components/PageUp/PageUp";
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
        className={` antialiased`}
      >
        
          <Nav />
          <PageUp />
          {children}
        
        <Footer />
      </body>
    </html>
  );
}
