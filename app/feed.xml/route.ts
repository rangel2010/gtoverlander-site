// RSS feed do blog GT Overlander
// Acessível em /feed.xml — usado por leitores de feed e automações
// (Make.com, Zapier, dlvr.it) pra disparar posts automáticos em redes sociais.

import { getAllPosts } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';
import { PILLAR_TITLES } from '@/lib/sanity/types';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gtoverlander.com.br';

function escapeXml(str: string): string {
  return str.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const imageUrl = post.coverImage
        ? urlForImage(post.coverImage)?.width(1200).height(630).url()
        : null;
      const pillarLabel = PILLAR_TITLES[post.category] ?? post.category;

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(pillarLabel)}</category>${
        imageUrl
          ? `\n      <enclosure url="${imageUrl}" type="image/jpeg" length="0" />`
          : ''
      }
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GT Overlander · Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Roteiros, preparação e vida overlander — conteúdo pra quem viaja por terra, em qualquer lugar do mundo.</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

// Revalida o cache do RSS a cada hora
export const revalidate = 3600;
