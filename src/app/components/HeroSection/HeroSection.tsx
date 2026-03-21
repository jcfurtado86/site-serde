"use client"

import Link from "next/link";
import Image from "next/image";
import { Nunito } from "next/font/google";
import { useLanguage } from "@/app/i18n/context";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function HeroSection() {
  const { t } = useLanguage()
  return (
    <div className="relative bg-gray-200 min-h-screen flex items-center overflow-hidden">
      {/* Mobile: decoração leve, sem blur pesado nem shooting stars */}
      <div className="sm:hidden">
        <div className="absolute -top-[50px] -right-[100px] w-[250px] h-[250px] border border-[#1565C0]/20 rounded-full"></div>
        <div className="absolute -top-[30px] -right-[70px] w-[200px] h-[200px] border-2 border-[#2E7D32]/20 rounded-full"></div>
        <div className="absolute top-[10px] -right-[40px] w-[150px] h-[150px] border border-dashed border-[#EF6C00]/20 rounded-full"></div>

        <div className="absolute -bottom-[100px] -left-[80px] w-[280px] h-[280px] border border-blue-400/15 rounded-full"></div>
        <div className="absolute -bottom-[70px] -left-[50px] w-[220px] h-[220px] border-2 border-blue-400/15 rounded-full"></div>
        <div className="absolute -bottom-[30px] -left-[20px] w-[160px] h-[160px] border border-dashed border-blue-400/20 rounded-full"></div>
      </div>

      {/* Desktop: gradiente estático em vez de blur pesado, círculos sem animação de spin */}
      <div className="hidden sm:block">

        <div className="absolute top-0 right-0 w-[900px] h-[900px] border border-dashed border-[#1565C0]/10 rounded-full"></div>
        <div className="absolute top-20 right-20 w-[700px] h-[700px] border-2 border-[#2E7D32]/10 rounded-full"></div>
        <div className="absolute top-40 right-40 w-[500px] h-[500px] border border-dashed border-[#EF6C00]/15 rounded-full"></div>
        <div className="absolute top-60 right-60 w-[300px] h-[300px] border-2 border-dashed border-blue-400/15 rounded-full"></div>

        <div className="absolute -bottom-[500px] -left-[200px] w-[1200px] h-[1200px] border border-dashed border-blue-400/15 rounded-full"></div>
        <div className="absolute -bottom-[300px] -left-[100px] w-[900px] h-[900px] border-2 border-dashed border-blue-400/15 rounded-full"></div>
        <div className="absolute -bottom-[100px] left-0 w-[600px] h-[600px] border border-dashed border-blue-400/20 rounded-full"></div>

        <div className="absolute top-20 left-20 w-48 h-48 border border-dashed border-blue-400/20 rounded-full"></div>
        <div className="absolute bottom-40 right-40 w-64 h-64 border-2 border-dashed border-blue-400/20 rounded-full"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 border border-dashed border-blue-400/15 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 border-2 border-dashed border-blue-400/20 rounded-full"></div>

        <svg
          className="absolute inset-0 w-[200%] h-[200%] -translate-x-[25%] -translate-y-[25%] opacity-20"
          viewBox="0 0 1000 1000"
        >
          <path
            className="animate-drawLineInfinite"
            d="M0 500 Q 250 500, 250 250 T 500 250 T 750 250 T 1000 250"
            fill="none"
            stroke="#1565C0"
            strokeWidth="1.5"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
          <path
            className="animate-drawLineInfinite delay-1000"
            d="M0 750 Q 250 750, 250 500 T 500 500 T 750 500 T 1000 500"
            fill="none"
            stroke="#2E7D32"
            strokeWidth="1.5"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
          <path
            className="animate-drawLineInfinite delay-[2000ms]"
            d="M250 0 L 250 1000"
            fill="none"
            stroke="#EF6C00"
            strokeWidth="1.5"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
          <path
            className="animate-drawLineInfinite delay-[3000ms]"
            d="M500 0 L 500 1000"
            fill="none"
            stroke="#1565C0"
            strokeWidth="1.5"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
          <path
            className="animate-drawLineInfinite delay-[4000ms]"
            d="M750 0 L 750 1000"
            fill="none"
            stroke="#2E7D32"
            strokeWidth="1.5"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl relative z-10">
          <h1 className="text-7xl sm:text-[7rem] md:text-[13rem] lg:text-[13rem] font-extrabold text-gray-900 mb-4 sm:mb-6 leading-none tracking-tight">
            <div className="main-conteiner flex items-center justify-start sm:gap-4">
              <div
                className="
                translate-x-2
                translate-y-1/4
                sm:translate-y-[55%]
                size-12
                sm:size-16
                md:size-20

                "
              >
                <Image
                  src="/image/galho-serde.png"
                  alt="Galho"
                  width={80}
                  height={80}
                  className="size-full object-contain"
                />
              </div>
              <div
                className="absolute
                          top-3
                          -left-6
                          sm:top-[2.7rem]
                          md:top-[5.5rem]
                          lg:top-[4.8rem]
                          sm:-left-9
                          md:-left-12
                          lg:-left-16
                          size-12
                          sm:size-16
                          md:size-20
                          lg:size-24
                          animate-float-leaf"
              >
                <Image
                  src="/image/folha-azul.png"
                  alt="Folha Azul"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
              <div
                className="absolute
                          -top-8
                          -left-2
                          sm:-top-2
                          md:top-[1.7rem]
                          lg:top-3
                          sm:-left-2
                          md:-left-3
                          lg:-left-5
                          size-16
                          sm:size-20
                          md:size-24
                          lg:size-28
                          animate-float-leaf-green"
              >
                <Image
                  src="/image/folha-verde.png"
                  alt="Folha Verde"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
              <div
                className="absolute
                          -top-1
                          left-8
                          sm:top-5
                          lg:top-[3rem]
                          lg:left-[2.8rem]
                          sm:left-10
                          md:top-[3.8rem]
                          md:left-[3.1rem]
                          size-12
                          sm:size-16
                          md:size-20
                          lg:size-24
                          animate-float-leaf"
              >
                <Image
                  src="/image/folha-laranja.png"
                  alt="Folha Azul"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="relative ml-6">
                <span className={`font-normal font-[Questrial] `}>
                  <span className="">
                    <span style={{ color: "black" }}> s</span>
                    <span style={{ color: "black" }}>e</span>
                    <span style={{ color: "#1565C0" }}>r</span>
                    <span style={{ color: "#2E7D32" }}>d</span>
                    <span style={{ color: "#EF6C00" }}>e</span>
                  </span>
                </span>
              </div>
            </div>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-6 sm:mb-14 mt-4 sm:mt-10 leading-relaxed font-light max-w-3xl">
            Software Engineering:
            <span className=" hover:text-[#1565C0] "> Research, </span>
            <span className=" hover:text-[#2E7D32] ">Development</span> and
            <span className=" hover:text-[#EF6C00]"> Education</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              href="#sobre"
              className="inline-block px-6 sm:px-14 py-3 sm:py-5 bg-gray-900/5 backdrop-blur-sm border-2 border-gray-900/20 text-gray-900 text-sm sm:text-xl font-medium rounded-xl hover:bg-gray-900/10 hover:border-gray-900/30 hover:tracking-wider transition-all duration-300 ease-in-out text-center transform hover:scale-102 hover:shadow-lg hover:shadow-gray-500/30 active:scale-95"
            >
              {t("hero.learn_more")}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
