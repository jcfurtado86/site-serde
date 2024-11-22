import Link from 'next/link'
import Image from 'next/image'
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

import { Breadcrumb } from '@/app/components/BreadCrumb/BreadCrumb'


interface PostPageProps {
  searchParams: {
    title: string
    date: string
    excerpt: string
    image: string
    tags: string
    authorName: string
    authorAvatar: string
    shareLinks: string
  }
  params: Promise<{
    id: string
  }>
}

interface ShareLinks {
  facebook: string
  twitter: string
  whatsapp: string
  telegram: string
  email: string
  link: string
}

export async function generateMetadata({ params, searchParams }: PostPageProps) {
  return {
    title: searchParams.title
  }
}
    
export default async function PostPage({ params, searchParams }: PostPageProps) {
  const { id } = await params
  
  const post = {
    id,
    title: searchParams.title,
    date: searchParams.date,
    excerpt: searchParams.excerpt,
    image: searchParams.image,
    tags: JSON.parse(searchParams.tags || '[]'),
    author: {
      name: searchParams.authorName,
      avatar: searchParams.authorAvatar
    },
    shareLinks: JSON.parse(searchParams.shareLinks || '{}') as ShareLinks
  }

  return (
    <main className="bg-gray-50 min-h-screen py-8 pt-20 ">
      <Breadcrumb 
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title, href: `/blog/post/${id}` }
            ]} 
      />
      <div className="max-w-2xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 pt-10">
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
              {post.tags.map((tag: string, index: number) => (
                <Link key={index} href={`/blog/tag/${tag.toLowerCase()}`} 
                  className="text-sm text-blue-600 hover:text-blue-800">
                  #{tag}
                </Link>
              ))}
            </div>

            <div className="flex gap-4 text-gray-500">
              {post.shareLinks?.facebook && (
                <Link href={post.shareLinks.facebook} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
                </Link>
              )}
              {post.shareLinks?.twitter && (
                <Link href={post.shareLinks.twitter} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
                </Link>
              )}
              {post.shareLinks?.whatsapp && (
                <Link href={post.shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                </Link>
              )}
              {post.shareLinks?.telegram && (
                <Link href={post.shareLinks.telegram} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <FontAwesomeIcon icon={faTelegram} className="w-5 h-5" />
                </Link>
              )}
              {post.shareLinks?.email && (
                <Link href={post.shareLinks.email} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                </Link>
              )}
              {post.shareLinks?.link && (
                <Link href={post.shareLinks.link} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <FontAwesomeIcon icon={faLink} className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
