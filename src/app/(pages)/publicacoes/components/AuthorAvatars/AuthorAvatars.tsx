"use client"
import Image from "next/image"
import { findMember } from "@/app/utils/resolveAuthorName"

export function AuthorAvatars({ authors, members }: {
  authors: string[]
  members: { name: string; imageUrl?: string }[]
}) {
  return (
    <div className="flex -space-x-2">
      {authors.map((a, i) => {
        const member = findMember(a, members)
        return member?.imageUrl ? (
          <Image
            key={i}
            src={member.imageUrl}
            alt={member.name}
            width={28}
            height={28}
            className="rounded-full object-cover w-7 h-7 border-2 border-white bg-white"
            unoptimized
          />
        ) : null
      })}
    </div>
  )
}
