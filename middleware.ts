import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Middleware do next-intl.
 * - Detecta o idioma do navegador na primeira visita e redireciona pro locale certo
 * - PT é o default sem prefixo (localePrefix: 'as-needed' no routing.ts)
 * - en/es ganham prefixo (/en, /es)
 */
export default createMiddleware(routing);

export const config = {
  // Roda em todas as rotas EXCETO:
  // - /api (route handlers)
  // - /studio (Sanity Studio, fora do [locale])
  // - /_next (assets internos do Next)
  // - arquivos com extensão (favicon.ico, og images, feed.xml, sitemap.xml, robots.txt, etc.)
  matcher: ['/((?!api|studio|_next|.*\\..*).*)'],
};
