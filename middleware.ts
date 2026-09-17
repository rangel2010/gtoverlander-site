import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Middleware de i18n do GT Overlander.
 *
 * Fluxo automático:
 * 1. Primeira visita → lê Accept-Language do navegador → redireciona pro locale correto
 * 2. Usuário troca idioma pelo seletor → navega pra /en/... ou /es/... →
 *    middleware salva cookie NEXT_LOCALE automaticamente
 * 3. Próximas visitas → cookie tem prioridade sobre Accept-Language
 *
 * Adicionar novo idioma: basta incluir em i18n/routing.ts e criar messages/xx.json.
 * Nenhuma alteração necessária aqui.
 *
 * PT é o default sem prefixo (localePrefix: 'as-needed' no routing.ts).
 * EN/ES (e futuros) ganham prefixo: /en, /es, /it, /de...
 */
export default createMiddleware(routing);

export const config = {
  // Roda em todas as rotas EXCETO:
  // - /api (route handlers)
  // - /studio (Sanity Studio, fora do [locale])
  // - /_next (assets internos do Next)
  // - arquivos com extensão (favicon.ico, og images, feed.xml, sitemap.xml, robots.txt, etc.)
  // Prefixos ancorados: 'studio' solto também excluía /studio-qualquer-coisa,
  // que então escapava do i18n e casava [locale] com um locale inválido. O
  // layout chamava notFound() — e quando é o layout que lança, ele não envolve
  // a própria 404: o documento sai sem <html> e a tela fica em branco.
  matcher: ['/((?!api(?:/|$)|studio(?:/|$)|_next(?:/|$)|.*\\..*).*)'],
};
