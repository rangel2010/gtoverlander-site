import { getAllPosts } from '@/lib/sanity/queries';

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
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${desc}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog GT Overlander</title>
    <link>${SITE_URL}/blog</link>
    <description>Destinos, preparação e vida overlander pra quem viaja por terra.</description>
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
