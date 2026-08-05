export interface LatestYoutubeVideo {
  videoId: string
  title: string
  url: string
  thumbnail: string
}

const HTML_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
}

function decodeEntities(s: string): string {
  return s.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&apos;/g, (m) => HTML_ENTITIES[m] ?? m)
}

// YouTube pubblica un feed RSS pubblico per ogni canale, senza bisogno di API
// key: restituisce sempre gli ultimi video caricati. Nessun account developer
// da configurare, nessun token che scade.
export async function getLatestYoutubeVideo(channelId: string): Promise<LatestYoutubeVideo | null> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null

    const xml = await res.text()
    const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1]
    if (!entry) return null

    const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]
    const title = entry.match(/<title>([^<]*)<\/title>/)?.[1]
    const thumbnail = entry.match(/<media:thumbnail url="([^"]+)"/)?.[1]
    if (!videoId || !title || !thumbnail) return null

    return {
      videoId,
      title: decodeEntities(title),
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail,
    }
  } catch {
    return null
  }
}
