"use client"
import Image from "next/image"
import { useEffect } from "react"
import { useProjects } from "@/app/context/ProjectsContext"

interface MemberProps {
  name: string
  institution: string
  campus: string
  email: string
  curriculumLink: string
  imageUrl: string
}

interface MemberComponentProps {
  members: MemberProps[]
  title: string
}

function Member({ name, institution, campus, email, curriculumLink, imageUrl }: MemberProps) {
  return (
    <div className="group bg-white rounded-xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
      <div className="relative w-full h-[200px] sm:h-[300px] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300 "
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyUC0zLyYuLy0xPDZCNzIrLjM9RUdQRUVHSUlNTU1CQUJISUhNTU3/2wBDAQwXFx0aHR4dHU1MLSU1TU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-2 sm:p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-sm sm:text-lg lg:text-lg text-gray-800 font-bold line-clamp-2 group-hover:text-gray-900 group-hover:brightness-125 transition-all duration-300">
          {name}
        </h2>
        {/*<p className="text-xs sm:text-sm text-gray-600 mt-auto">
          {institution} - {campus}
        </p>*/}
        <div className="flex items-center justify-start gap-1 sm:gap-4">
          <a
            href={`mailto:${email}`}
            className="flex-1 text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1 sm:gap-2 py-1 sm:py-2 px-1.5 sm:px-3 rounded-lg hover:bg-blue-50 transition-all duration-300 text-xs sm:text-base"
          >
            <svg
              className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="whitespace-nowrap">Email</span>
          </a>
          <a
            href={curriculumLink}
            className="flex-1 text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1 sm:gap-2 py-1 sm:py-2 px-1.5 sm:px-3 rounded-lg hover:bg-blue-50 transition-all duration-300 text-xs sm:text-base"
            target="_blank"
          >
            <svg
              className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="whitespace-nowrap">Lattes</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export function Members({ members, title }: MemberComponentProps) {
  useEffect(() => {
    const preloadImages = () => {
      members.forEach((member) => {
        if (member.imageUrl) {
          const img = document.createElement("img")
          img.src = member.imageUrl
        }
      })
    }

    preloadImages()
  }, [])
  const usersToFix = ["victor gabriel gomes bahia"]
  const fixedPositionMembers = members.filter((member) =>
    usersToFix.some((user) => member.name.toLowerCase().includes(user))
  )
  console.log(fixedPositionMembers)
  return (
    <main className="bg-gradient-to-b from-gray-50 to-white py-3 sm:py-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black text-center mb-3 sm:mb-16">
          {title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 auto-rows-[28rem]">
          {members.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full"
            >
              <div className="relative w-full h-[200px] sm:h-[20rem] overflow-hidden bg-gray-100">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority
                    className={`${fixedPositionMembers.some((fixedMember) => fixedMember.name === member.name) ? "object-center" : "object-top"} object-cover group-hover:scale-105 transition-transform duration-300 `}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyUC0zLyYuLy0xPDZCNzIrLjM9RUdQRUVHSUlNTU1CQUJISUhNTU3/2wBDAQwXFx0aHR4dHU1MLSU1TU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <svg
                      className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-2 sm:px-4 flex flex-col justify-between flex-grow">
                <h2 className="text-sm sm:text-lg lg:text-lg text-gray-800 font-bold line-clamp-2 group-hover:text-gray-900 group-hover:brightness-125 transition-all duration-300">
                  {member.name}
                </h2>
                <div className="flex items-center justify-between gap-1 sm:gap-4">
                  {title === "Docentes" && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex-1 text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1 sm:gap-2 py-1 sm:py-2 px-1.5 sm:px-3 rounded-lg hover:bg-blue-50 transition-all duration-300 text-xs sm:text-base"
                    >
                      <svg
                        className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="whitespace-nowrap">Email</span>
                    </a>
                  )}
                  <a
                    href={member.curriculumLink}
                    className="flex-1 text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1 sm:gap-2 py-1 sm:py-2 px-1.5 sm:px-3 rounded-lg hover:bg-blue-50 transition-all duration-300 text-xs sm:text-base"
                    target="_blank"
                  >
                    <svg
                      className="size-3 sm:size-6 flex-shrink-0 mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="whitespace-nowrap">Lattes</span>
                  </a>
                  {title !== "Docentes" && (
                    <a
                      href={"/"}
                      className="flex-1 text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1 sm:gap-2 py-1 sm:py-2 px-1.5 sm:px-3 rounded-lg hover:bg-blue-50 transition-all duration-300 text-xs sm:text-base"
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-notebook-pen-icon lucide-notebook-pen size-3 sm:size-5 flex-shrink-0 mb-1"
                      >
                        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                        <path d="M2 6h4" />
                        <path d="M2 10h4" />
                        <path d="M2 14h4" />
                        <path d="M2 18h4" />
                        <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                      </svg>
                      <span className="whitespace-nowrap">Projeto</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
