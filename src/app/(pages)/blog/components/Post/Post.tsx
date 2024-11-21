import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFacebookF, 
  faTwitter, 
  faWhatsapp, 
  faTelegram 
} from '@fortawesome/free-brands-svg-icons'
import { 
  faEnvelope, 
  faLink 
} from '@fortawesome/free-solid-svg-icons'

interface PostProps {
  id: string
  title: string
  date: string
  excerpt: string
  image?: string
  tags: string[]
  author: {
    name: string
    avatar: string
  }
  shareLinks?: {
    facebook?: string
    twitter?: string
    whatsapp?: string
    telegram?: string
    email?: string
    link?: string
  }
}

export function Post({ id, title, date, excerpt, image, tags, author, shareLinks }: PostProps) {
  return (
    <article className="bg-white hover:bg-gray-50 transition-colors cursor-pointer py-6">
      <div className="flex gap-4 px-4 md:px-6">
        <div className="flex-shrink-0">
          {author.avatar ? (
            <Image 
              src={author.avatar}
              alt={author.name}
              width={48}
              height={48}
              className="rounded-full"
              unoptimized
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-gray-900">{author.name}</span>
            <span className="text-gray-500">·</span>
            <span className="text-blue-500">{date}</span>
          </div>
          
          <Link href={`/blog/${id}`} className="block mt-2">
            <h2 className={`text-2xl font-bold text-gray-900 ${image ? 'mb-4' : 'mb-2'}`}>{title}</h2>
            {image && (
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 border border-gray-100 shadow-sm">
                <Image 
                  src={image}
                  alt={title}
                  width={800}
                  height={450}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
            )}
            <p className={`text-gray-600 ${image ? 'text-lg leading-relaxed' : 'text-base leading-normal'}`}>{excerpt}</p>
          </Link>

          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <Link key={index} href={`/blog/tag/${tag.toLowerCase()}`} 
                className="text-sm text-blue-600 hover:text-blue-800">
                #{tag}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-4 text-gray-500">
              {shareLinks?.facebook && (
                <Link href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
                </Link>
              )}
              {shareLinks?.twitter && (
                <Link href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
                </Link>
              )}
              {shareLinks?.whatsapp && (
                <Link href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                </Link>
              )}
              {shareLinks?.telegram && (
                <Link href={shareLinks.telegram} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <FontAwesomeIcon icon={faTelegram} className="w-5 h-5" />
                </Link>
              )}
              {shareLinks?.email && (
                <Link href={shareLinks.email} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                </Link>
              )}
              {shareLinks?.link && (
                <Link href={shareLinks.link} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <FontAwesomeIcon icon={faLink} className="w-5 h-5" />
                </Link>
              )}
            </div>
            
            <Link 
              href={`/blog/${id}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Ler Mais
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Posts() {
  const posts: PostProps[] = [
    {
      id: "post-1",
      title: "Lorem ipsum dolor sit amet consectetur",
      date: "jul 27,2021",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "",
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      author: {
        name: "teste",
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
    },
    {
      id: "post-2",
      title: "Sed ut perspiciatis unde omnis iste natus",
      date: "jul 27,2021",
      excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "",
      tags: ["Tag 2", "Tag 4", "Tag 5"],
      author: {
        name: "teste",
        avatar: ""
      },
      shareLinks: {
        facebook: "https://facebook.com/share",
        twitter: "https://twitter.com/share",
        whatsapp: "https://wa.me/share",
        telegram: "https://t.me/share",
        email: "mailto:share@example.com",
        link: "https://example.com/post-2"
      }
    },
    {
      id: "post-3",
      title: "At vero eos et accusamus et iusto odio",
      date: "jul 27,2021",
      excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/image/computador.png",
      tags: ["Tag 1", "Tag 3", "Tag 6"],
      author: {
        name: "Test User",
        avatar: ""
      },
      shareLinks: {
        facebook: "https://facebook.com/share",
        twitter: "https://twitter.com/share",
        whatsapp: "https://wa.me/share",
        telegram: "https://t.me/share",
        email: "mailto:share@example.com",
        link: "https://example.com/post-3"
      }
    }
  ]

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-2xl md:max-w-5xl lg:max-w-7xl mx-auto px-4">
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <div key={post.id}>
              <Post {...post} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}