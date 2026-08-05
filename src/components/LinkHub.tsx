import Image from 'next/image'
import { Home, MapPin, PlayCircle, Image as ImageIcon } from 'lucide-react'
import { InstagramIcon, FacebookIcon, YoutubeIcon, TiktokIcon, WhatsappIcon } from '@/components/icons'
import { getLatestYoutubeVideo } from '@/lib/youtube'
import { ScrollFadeBanner } from '@/components/ScrollFadeBanner'

interface SocialLink {
  platform: string
  url: string | null
}

interface Review {
  name: string
  rating: number
  text: string
}

interface LinkItem {
  type: string
  label: string
  url: string
  enabled: boolean
  image?: string | null
  badge?: string | null
}

export interface LinkHubData {
  enabled: boolean
  heading: string
  bio: string
  avatarImage?: string | null
  bannerImage?: string | null
  socialLinks: SocialLink[]
  youtubeChannelId?: string | null
  reviewsBadge: string
  reviewsLive?: boolean
  reviews: Review[]
  links: LinkItem[]
}

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
}

const CARD_PLACEHOLDER_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  sell: Home,
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  youtube: PlayCircle,
  facebook: FacebookIcon,
  agency: MapPin,
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-[#f5b301] text-xs leading-none" aria-label={`${rating} su 5 stelle`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(Math.max(0, 5 - rating))}
    </span>
  )
}

function LinkCard({ link }: { link: LinkItem }) {
  const PlaceholderIcon = CARD_PLACEHOLDER_ICONS[link.type] ?? ImageIcon

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl border border-[#e4e4e7] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative w-full aspect-video bg-[#f4f4f5] flex items-center justify-center">
        {link.image ? (
          <Image src={link.image} alt="" fill className="object-cover" />
        ) : (
          <PlaceholderIcon size={32} className="text-[#c1c1c6]" />
        )}
      </div>
      <div className="px-4 py-3">
        <span className="text-sm font-medium text-[#18181b]">{link.label}</span>
        {link.badge && (
          <div className="mt-2">
            <span className="inline-block text-xs bg-[#f4f4f5] text-[#52525b] px-3 py-1 rounded-full">
              {link.badge}
            </span>
          </div>
        )}
      </div>
    </a>
  )
}

function LinkRow({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-white hover:bg-[#f9f9f9] rounded-full border border-[#e4e4e7] shadow-sm px-4 py-3.5 transition-colors"
    >
      <WhatsappIcon size={20} className="text-[#25D366] flex-shrink-0" />
      <span className="text-sm font-medium text-[#18181b]">{link.label}</span>
    </a>
  )
}

export async function LinkHub({ data, bordered = false }: { data: LinkHubData; bordered?: boolean }) {
  const activeSocial = data.socialLinks.filter((s): s is SocialLink & { url: string } => Boolean(s.url))

  const activeLinks = await Promise.all(
    data.links.filter((l) => l.enabled).map(async (link) => {
      if (link.type === 'youtube' && data.youtubeChannelId) {
        const latest = await getLatestYoutubeVideo(data.youtubeChannelId)
        if (latest) {
          return { ...link, url: latest.url, image: latest.thumbnail, badge: latest.title }
        }
      }
      return link
    })
  )

  const content = (
    <>
      {/* Banner + avatar */}
      <div className="relative w-full max-w-sm mb-10">
        {data.bannerImage ? (
          <ScrollFadeBanner src={data.bannerImage} />
        ) : (
          <div className="w-full aspect-[3/4] rounded-3xl bg-[#f4f4f5] border border-[#e4e4e7] shadow-md flex items-center justify-center overflow-hidden">
            <span className="text-xs text-[#a1a1aa] px-6 text-center">Foto di copertina da aggiungere</span>
          </div>
        )}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
          {data.avatarImage ? (
            <Image src={data.avatarImage} alt="" width={80} height={80} className="object-contain p-1.5" />
          ) : (
            <span className="text-[10px] text-[#a1a1aa]">Logo</span>
          )}
        </div>
      </div>

      <div className="text-center max-w-sm">
        <h1 className="text-[#CC1414] font-bold text-xl mb-1">{data.heading}</h1>
        <p className="text-[#555555] text-sm mb-4">{data.bio}</p>

        {activeSocial.length > 0 && (
          <div className="flex items-center justify-center gap-5 mb-4">
            {activeSocial.map((s) => {
              const Icon = SOCIAL_ICONS[s.platform]
              if (!Icon) return null
              return (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333] hover:text-[#CC1414] transition-colors"
                  aria-label={s.platform}
                >
                  <Icon size={22} />
                </a>
              )
            })}
          </div>
        )}

        <span className="inline-block bg-white text-[#333333] text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm border border-[#e4e4e7] mb-8">
          {data.reviewsBadge}
        </span>
      </div>

      {data.reviews.length > 0 && (
        <div className="w-full max-w-sm mb-8">
          <div className={`flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory ${bordered ? '' : '-mx-4 px-4'}`}>
            {data.reviews.map((r, i) => (
              <div
                key={i}
                className="min-w-[80%] snap-start bg-white rounded-xl border border-[#e4e4e7] p-4 shadow-sm flex-shrink-0"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#f4f4f5] flex items-center justify-center text-xs font-bold text-[#71717a] flex-shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#18181b]">{r.name}</p>
                    <StarRating rating={r.rating} />
                  </div>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
          {!data.reviewsLive && (
            <p className="text-[11px] text-[#a1a1aa] text-center mt-2 italic">
              Recensioni di esempio: verranno sostituite automaticamente da quelle vere di Google appena sarà collegata l&apos;integrazione.
            </p>
          )}
        </div>
      )}

      <div className="w-full max-w-sm flex flex-col gap-3">
        {activeLinks.map((link) =>
          link.type === 'whatsapp' ? (
            <LinkRow key={link.url} link={link} />
          ) : (
            <LinkCard key={link.url} link={link} />
          )
        )}
      </div>
    </>
  )

  return (
    <div className="min-h-[calc(100vh-3rem)] bg-gradient-to-b from-red-50 via-white to-white flex flex-col items-center px-4 py-10">
      {bordered ? (
        <div className="w-full max-w-sm rounded-[2rem] border border-[#e4e4e7] bg-[#f6f3f2] shadow-lg px-4 pt-8 pb-6 flex flex-col items-center">
          {content}
        </div>
      ) : (
        content
      )}
    </div>
  )
}
