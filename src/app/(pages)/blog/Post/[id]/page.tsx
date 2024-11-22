import Link from 'next/link'
import Image from 'next/image'
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

interface IconProps {
  style?: React.CSSProperties;
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

  const FacebookIcon: React.FC<IconProps> = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={style}>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
    </svg>
  )

  const TwitterIcon: React.FC<IconProps> = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={style}>
      <path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.09 4.09 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4 4.1 4.1 0 0 1-1.86.07 4.11 4.11 0 0 0 3.83 2.84A8.22 8.22 0 0 1 3 18.34a11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 21 8.45v-.53A8.43 8.43 0 0 0 22 5.8z"/>
    </svg>
  )

  const EmailIcon: React.FC<IconProps> = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={style}>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  )

  const LinkIcon: React.FC<IconProps> = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={style}>
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
    </svg>
  )

  const WhatsappIcon: React.FC<IconProps> = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={style}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )

  const TelegramIcon: React.FC<IconProps> = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={style}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )

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
                  <FacebookIcon style={{ fill: "#1877F2" }} />
                </Link>
              )}
              {post.shareLinks?.twitter && (
                <Link href={post.shareLinks.twitter} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <TwitterIcon style={{ fill: "#1DA1F2" }} />
                </Link>
              )}
              {post.shareLinks?.whatsapp && (
                <Link href={post.shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <WhatsappIcon style={{ fill: "#25D366" }} />
                </Link>
              )}
              {post.shareLinks?.telegram && (
                <Link href={post.shareLinks.telegram} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <TelegramIcon style={{ fill: "#0088cc" }} />
                </Link>
              )}
              {post.shareLinks?.email && (
                <Link href={post.shareLinks.email} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <EmailIcon style={{ fill: "#EA4335" }} />
                </Link>
              )}
              {post.shareLinks?.link && (
                <Link href={post.shareLinks.link} target="_blank" rel="noopener noreferrer" 
                  className="p-2 hover:bg-blue-50 rounded-full">
                  <LinkIcon style={{ fill: "#718096" }} />
                </Link>
              )}
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
