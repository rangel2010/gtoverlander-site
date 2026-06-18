// Busca os Shorts do canal GT Overlander via YouTube Data API v3.
// Usada exclusivamente pela página /dicas (só PT).
// Cache de 1h no Vercel — evita quota desnecessária (10k unidades/dia free).

export interface YouTubeShort {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string; // ISO 8601, ex: PT45S
  durationSeconds: number;
  url: string;
}

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? 'UCiQGUGW2rNdYnSvi89TuqYQ';
const API_KEY = process.env.YOUTUBE_API_KEY ?? '';

/** Converte duração ISO 8601 (PT1M3S) em segundos */
function isoToSeconds(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (parseInt(m[1] ?? '0') * 3600) +
         (parseInt(m[2] ?? '0') * 60) +
         (parseInt(m[3] ?? '0'));
}

/** Formata segundos em string legível (ex: 0:45) */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Busca os Shorts mais recentes do canal (≤ 60s, máx 24) */
export async function getChannelShorts(maxResults = 24): Promise<YouTubeShort[]> {
  if (!API_KEY) {
    console.warn('[youtube] YOUTUBE_API_KEY não configurada');
    return [];
  }

  try {
    // 1. Busca vídeos curtos do canal
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
    searchUrl.searchParams.set('part', 'snippet');
    searchUrl.searchParams.set('channelId', CHANNEL_ID);
    searchUrl.searchParams.set('type', 'video');
    searchUrl.searchParams.set('videoDuration', 'short'); // < 4 min
    searchUrl.searchParams.set('order', 'date');
    searchUrl.searchParams.set('maxResults', String(maxResults));
    searchUrl.searchParams.set('key', API_KEY);

    const searchRes = await fetch(searchUrl.toString(), {
      next: { revalidate: 3600 }, // cache 1h
    });

    if (!searchRes.ok) {
      console.error('[youtube] search error', searchRes.status);
      return [];
    }

    const searchData = await searchRes.json();
    const items = searchData.items ?? [];
    if (!items.length) return [];

    const videoIds = items.map((i: { id: { videoId: string } }) => i.id.videoId).join(',');

    // 2. Busca duração exata de cada vídeo
    const detailUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    detailUrl.searchParams.set('part', 'contentDetails,snippet');
    detailUrl.searchParams.set('id', videoIds);
    detailUrl.searchParams.set('key', API_KEY);

    const detailRes = await fetch(detailUrl.toString(), {
      next: { revalidate: 3600 },
    });

    if (!detailRes.ok) {
      console.error('[youtube] videos error', detailRes.status);
      return [];
    }

    const detailData = await detailRes.json();

    return (detailData.items ?? [])
      .map((v: {
        id: string;
        snippet: { title: string; description: string; publishedAt: string; thumbnails: { maxres?: { url: string }; high?: { url: string }; medium?: { url: string } } };
        contentDetails: { duration: string };
      }) => {
        const seconds = isoToSeconds(v.contentDetails.duration);
        const thumb =
          v.snippet.thumbnails?.maxres?.url ??
          v.snippet.thumbnails?.high?.url ??
          v.snippet.thumbnails?.medium?.url ?? '';

        return {
          id: v.id,
          title: v.snippet.title,
          description: v.snippet.description,
          thumbnail: thumb,
          publishedAt: v.snippet.publishedAt,
          duration: v.contentDetails.duration,
          durationSeconds: seconds,
          url: `https://www.youtube.com/shorts/${v.id}`,
        };
      })
      .filter((v: YouTubeShort) => v.durationSeconds <= 90); // shorts reais ≤ 90s
  } catch (e) {
    console.error('[youtube] erro ao buscar shorts:', e);
    return [];
  }
}
