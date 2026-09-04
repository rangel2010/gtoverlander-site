// llms.txt — resumo do site em texto simples pra assistentes de IA
// (ChatGPT, Claude, Perplexity, Gemini) entenderem rapidamente do que se
// trata o GT Overlander, sem precisar rastrear e interpretar todo o HTML.
// Padrão emergente e opcional (https://llmstxt.org) — não é garantia de uso
// pelos modelos, mas facilita citação e resumo corretos quando consultado.

import { getAllPosts } from '@/lib/sanity/queries';
import { PRODUCT, formatPrice } from '@/lib/product-config';

const SITE_URL = 'https://www.gtoverlander.com.br';

export async function GET() {
  let recentPosts: { title: string; description: string; slug: string }[] = [];
  try {
    const posts = await getAllPosts('pt');
    recentPosts = posts.slice(0, 10).map((p) => ({
      title: p.title,
      description: p.description,
      slug: p.slug,
    }));
  } catch {
    // Sanity indisponível — segue sem a lista de posts
  }

  const postsBlock = recentPosts.length
    ? recentPosts
        .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
        .join('\n')
    : '';

  const txt = `# GT Overlander

> Aplicativo de planejamento de rotas para viajantes overlander — roteiros com IA conversacional, base própria de mais de ${PRODUCT.waypointCountLabel} waypoints em ${PRODUCT.countries} países, Modo Offline, CarPlay e Android Auto. Disponível para iOS, Android e Web.

GT Overlander é o ecossistema para quem viaja por terra: planejamento de rotas com IA, uma base própria de pontos de interesse relevantes para overlanding (postos, campings, oficinas, atrativos, fronteiras), modo offline com mapas e dados por país, e uma comunidade de viajantes (GT Social, Help Overlander, GT Desapega).

## Produto

- Planejamento de rotas com IA conversacional (roteiros personalizados a partir de uma conversa)
- Base própria de ${PRODUCT.waypointCountLabel} waypoints em ${PRODUCT.countries} países, organizados em ${PRODUCT.categories} categorias
- Modo Offline: mapas e waypoints por país, sem internet
- Integração CarPlay e Android Auto
- Disponível em iOS, Android e Web (${SITE_URL}/baixar)

## Planos

- Free: gratuito para sempre — 3 viagens por conta da casa (não renovam), mapa e pontos do país de origem offline, radar ilimitado, validação sem limite (${SITE_URL}/planos)
- Plus: ${formatPrice(PRODUCT.plans.plus.monthlyPrice)}/mês ou ${formatPrice(PRODUCT.plans.plus.annualPrice)}/ano — 15 viagens ativas, edição sem prazo, 2 países offline extras, 1 anúncio, 2 aparelhos
- Pro: ${formatPrice(PRODUCT.plans.pro.monthlyPrice)}/mês ou ${formatPrice(PRODUCT.plans.pro.annualPrice)}/ano — viagens ilimitadas, 5 países offline extras, 3 anúncios, 4 aparelhos
- Conta Business: para estabelecimentos, vendedores e prestadores de serviço do universo overlander (${SITE_URL}/empresas)

## Páginas principais

- Home: ${SITE_URL}/
- Recursos: ${SITE_URL}/recursos
- Planos: ${SITE_URL}/planos
- Blog: ${SITE_URL}/blog
- Sobre: ${SITE_URL}/sobre
- Contato: ${SITE_URL}/contato

## Blog

Artigos sobre destinos e roteiros pela América do Sul, preparação e planejamento de viagem, e vida overlander. Publicado em português, inglês e espanhol.
${postsBlock ? `\nPosts recentes:\n${postsBlock}\n` : ''}
Feed completo: ${SITE_URL}/feed.xml
Sitemap: ${SITE_URL}/sitemap.xml

## Empresa

GT Overlander Ltda — Londrina, PR, Brasil. Contato: suporte@gtoverlander.com.br
`;

  return new Response(txt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
