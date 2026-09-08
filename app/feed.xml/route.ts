import { construirFeed, respostaDeFeed } from '@/lib/feed';

/**
 * Feed canônico, em português. A lógica vive em lib/feed.ts, compartilhada com
 * os feeds de /es/feed.xml e /en/feed.xml.
 */
export async function GET() {
  return respostaDeFeed(await construirFeed('pt'));
}
