import { getAllPosts } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';

const SITE_URL = 'https://gtoverlander.com.br';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getAllPosts('pt');

  const items = posts
    .slice(0, 50)
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      const pubDate = new Date(p.publishedAt).toUTCString();
      const desc = p.description ? escapeXml(p.description) : '';
      // Usa imagemSocial se disponivel, senao coverImage como fallback
      const imgSource = p.imagemSocial ?? p.coverImage;
      const imgUrl = urlForImage(imgSource)?.width(1200).height(630).url() ?? null;
      const enclosure = imgUrl
        ? `\n      <enclosure url="${imgUrl}" type="image/jpeg" length="0"/>`
        : '';
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${desc}</description>
      <pubDate>${pubDate}</pubDate>${enclosure}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog GT Overlander</title>
    <link>${SITE_URL}/blog</link>
    <description>Destinos, preparacao e vida overlander pra quem viaja por terra.</description>
    <language>pt-BR</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
