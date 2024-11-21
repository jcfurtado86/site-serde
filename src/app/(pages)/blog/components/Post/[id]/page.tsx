import Link from 'next/link'
import Image from 'next/image'

interface PostPageProps {
  params: {
    id: string
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = {
    id: params.id,
    title: "Lorem ipsum dolor sit amet consectetur",
    date: "jul 27,2021",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/image/computador.png",
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    author: {
      name: "John Doe",
      avatar: ""
    },
    shareLinks: {
      facebook: "https://facebook.com/share",
      twitter: "https://twitter.com/share",
      whatsapp: "https://wa.me/share",
      telegram: "https://t.me/share",
      email: "mailto:share@example.com",
      link: "https://example.com/post-1"
    }
  }

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-2xl md:max-w-5xl lg:max-w-7xl mx-auto px-4">
        <article className="bg-white rounded-lg shadow-sm">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {post.author.avatar ? (
                  <Image 
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                    unoptimized
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <span className="font-medium text-gray-900">{post.author.name}</span>
              </div>
              <span className="text-gray-500">·</span>
              <span className="text-blue-500">{post.date}</span>
            </div>

            {post.image && (
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8 border border-gray-100 shadow-sm">
                <Image 
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={675}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
            )}

            <p className="text-lg text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <Link key={index} href={`/blog/tag/${tag.toLowerCase()}`} 
                  className="text-sm text-blue-600 hover:text-blue-800">
                  #{tag}
                </Link>
              ))}
            </div>

            <div className="flex gap-4 text-gray-500">
              {/* Share links como antes */}
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
