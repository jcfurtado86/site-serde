import Image from "next/image"
import Link from "next/link"

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

interface IconProps {
  style?: React.CSSProperties;
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

export function Post({ id, title, date, excerpt, image, tags, author, shareLinks }: PostProps) {
  return (
    <article className={`
      bg-white 
      transition-all 
      duration-300 
      cursor-pointer 
      py-4 
      sm:py-6 
      border-l-2 
      border-b 
      border-gray-200 
      hover:border-blue-400
      hover:bg-blue-50/20
      ${image ? 'hover:shadow-md hover:-translate-y-0.5' : ''}
    `}>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-3 sm:px-4 md:px-6">
        <div className="flex-shrink-0">
          {author.avatar ? (
            <Image 
              src={author.avatar}
              alt={author.name}
              width={40}
              height={40}
              className="rounded-full sm:w-12 sm:h-12"
              unoptimized
            />
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-20 h-20 sm:w-24 sm:h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="font-medium text-gray-900">{author.name}</span>
            <span className="text-gray-500">·</span>
            <span className="text-blue-500">{date}</span>
          </div>
          
          <Link href={{
            pathname: `/blog/Post/${id}`,
            query: {
              title: title,
              date: date,
              excerpt: excerpt,
              image: image,
              tags: JSON.stringify(tags),
              authorName: author.name,
              authorAvatar: author.avatar,
              shareLinks: JSON.stringify(shareLinks)
            }
          }} className="block">
            <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 ${image ? 'mb-3 sm:mb-4' : 'mb-2'}`}>{title}</h2>
            {image && (
              <div className="relative aspect-video w-full rounded-lg sm:rounded-xl overflow-hidden mb-4 sm:mb-6 border border-gray-100 shadow-sm">
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
            <p className={`text-gray-600 line-clamp-3 ${image ? 'text-base sm:text-lg leading-relaxed' : 'text-sm sm:text-base leading-normal'}`}>{excerpt}</p>
          </Link>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {tags.map((tag, index) => (
              <Link key={index} href={`/blog/tag/${tag.toLowerCase()}`} 
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800">
                #{tag}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3 sm:mt-4">
            <div className="flex gap-2 sm:gap-4 text-gray-500">
              {shareLinks?.facebook && (
                <Link href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" 
                  className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-full">
                  <FacebookIcon style={{ fill: "#1877F2", width: "20px", height: "20px" }}  />
                </Link>
              )}
              {shareLinks?.twitter && (
                <Link href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" 
                  className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-full">
                  <TwitterIcon style={{ fill: "#1DA1F2", width: "20px", height: "20px" }}  />
                </Link>
              )}
              {shareLinks?.whatsapp && (
                <Link href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" 
                  className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-full">
                  <WhatsappIcon style={{ fill: "#25D366", width: "20px", height: "20px" }} />
                </Link>
              )}
              {shareLinks?.telegram && (
                <Link href={shareLinks.telegram} target="_blank" rel="noopener noreferrer" 
                  className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-full">
                  <TelegramIcon style={{ fill: "#0088cc", width: "20px", height: "20px" }}/>
                </Link>
              )}
              {shareLinks?.email && (
                <Link href={shareLinks.email} target="_blank" rel="noopener noreferrer" 
                  className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-full">
                  <EmailIcon style={{ fill: "#EA4335", width: "20px", height: "20px" }}  />
                </Link>
              )}
              {shareLinks?.link && (
                <Link href={shareLinks.link} target="_blank" rel="noopener noreferrer" 
                  className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-full">
                  <LinkIcon style={{ fill: "#718096", width: "20px", height: "20px" }}  />
                </Link>
              )}
            </div>
            
            <Link 
              href={{
                pathname: `/blog/Post/${id}`,
                query: {
                  title: title,
                  date: date,
                  excerpt: excerpt,
                  image: image,
                  tags: JSON.stringify(tags),
                  authorName: author.name,
                  authorAvatar: author.avatar,
                  shareLinks: JSON.stringify(shareLinks)
                }
              }}
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Ler Mais
              <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      date: "2024",
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
      date: "2024",
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
      date: "2024",
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
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-6 sm:py-8">
      <div className="max-w-xl sm:max-w-2xl md:max-w-5xl lg:max-w-7xl mx-auto px-3 sm:px-4">
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