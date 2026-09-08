import { notFound } from 'next/navigation';
import { construirFeed, respostaDeFeed } from '@/lib/feed';
import type { BlogLocale } from '@/lib/sanity/types';

const IDIOMAS_COM_FEED: BlogLocale[] = ['en', 'es'];

/**
 * Feed do blog traduzido — /es/feed.xml e /en/feed.xml.
 *
 * O português tem rota própria em app/feed.xml, sem prefixo, e por isso não
 * entra aqui: /pt/feed.xml devolveria conteúdo duplicado numa URL que o site
 * não usa em lugar nenhum.
 */
export async function GET(
  _req: Request,
  { params }: { params: { locale: string } },
) {
  const locale = params.locale as BlogLocale;
  if (!IDIOMAS_COM_FEED.includes(locale)) notFound();

  return respostaDeFeed(await construirFeed(locale));
}
