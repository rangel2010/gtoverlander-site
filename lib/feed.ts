/**
 * Gerador do RSS do blog, por idioma.
 *
 * Existe um feed por idioma pra que a newsletter possa ser segmentada: quem
 * assinou lendo em espanhol recebe o link do artigo em espanhol, não o em
 * português. As campanhas do Brevo apontam pro feed do idioma da lista.
 *
 *   /feed.xml       → português (canônico, sem prefixo)
 *   /es/feed.xml    → espanhol
 *   /en/feed.xml    → inglês
 *
 * O prefixo segue a mesma regra do site: PT não leva ('as-needed' no
 * i18n/routing.ts), EN e ES levam. Link de feed sem o prefixo cai em 404,
 * porque o slug traduzido não existe na rota portuguesa.
 */

import { getAllPosts } from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';
import type { BlogLocale } from '@/lib/sanity/types';

const SITE_URL = 'https://www.gtoverlander.com.br';

const TITULOS: Record<BlogLocale, string> = {
  pt: 'Blog GT Overlander',
  en: 'GT Overlander Blog',
  es: 'Blog GT Overlander',
};

const DESCRICOES: Record<BlogLocale, string> = {
  pt: 'Destinos, preparacao e vida overlander pra quem viaja por terra.',
  en: 'Destinations, preparation and overlander life for those who travel by land.',
  es: 'Destinos, preparacion y vida overlander para quien viaja por tierra.',
};

const IDIOMAS: Record<BlogLocale, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** PT não leva prefixo; EN e ES levam. */
function baseDoIdioma(locale: BlogLocale): string {
  return locale === 'pt' ? SITE_URL : `${SITE_URL}/${locale}`;
}

export async function construirFeed(locale: BlogLocale): Promise<string> {
  const posts = await getAllPosts(locale);
  const base = baseDoIdioma(locale);

  const items = posts
    .slice(0, 50)
    .map((p) => {
      const url = `${base}/blog/${p.slug}`;
      const pubDate = new Date(p.publishedAt).toUTCString();
      const desc = p.description ? escapeXml(p.description) : '';
      const imgSource = p.imagemSocial ?? p.coverImage;
      const imgUrl = urlForImage(imgSource)?.width(1200).url() ?? null;
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

  const caminhoFeed = locale === 'pt' ? '/feed.xml' : `/${locale}/feed.xml`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${TITULOS[locale]}</title>
    <link>${base}/blog</link>
    <description>${DESCRICOES[locale]}</description>
    <language>${IDIOMAS[locale]}</language>
    <atom:link href="${SITE_URL}${caminhoFeed}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

export function respostaDeFeed(xml: string): Response {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
