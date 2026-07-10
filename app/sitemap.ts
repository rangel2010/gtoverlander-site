import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/sanity/queries';

const WWW = 'https://www.gtoverlander.com.br';
const localePath = (locale: string, path: string) =>
  locale === 'pt' ? `${WWW}${path}` : `${WWW}/${locale}${path}`;

// Rotas disponíveis nos 3 locales (têm tradução real)
const MULTILINGUAL_ROUTES: {
  path: string;
  changeFreq: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}[] = [
  { path: '',            changeFreq: 'weekly',  priority: 1.0 },
  { path: '/recursos',   changeFreq: 'monthly', priority: 0.9 },
  { path: '/planos',     changeFreq: 'monthly', priority: 0.9 },
  { path: '/blog',       changeFreq: 'weekly',  priority: 0.9 },
  { path: '/sobre',      changeFreq: 'monthly', priority: 0.7 },
  { path: '/faq',        changeFreq: 'monthly', priority: 0.7 },
  { path: '/empresas',   changeFreq: 'monthly', priority: 0.7 },
  { path: '/parcerias',  changeFreq: 'monthly', priority: 0.7 },
  { path: '/contato',    changeFreq: 'monthly', priority: 0.5 },
  { path: '/suporte',    changeFreq: 'monthly', priority: 0.5 },
  { path: '/baixar',     changeFreq: 'monthly', priority: 0.6 },
];

// Rotas PT-only: conteúdo não traduzido ou legal em português
// Não incluir EN/ES — evita thin content duplicado e crawl budget desperdiçado
const PT_ONLY_ROUTES: {
  path: string;
  changeFreq: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}[] = [
  // Feature sub-pages — conteúdo em PT sem tradução
  { path: '/recursos/roteiros-ia',        changeFreq: 'monthly', priority: 0.8 },
  { path: '/recursos/modo-offline',       changeFreq: 'monthly', priority: 0.7 },
  { path: '/recursos/waypoints',          changeFreq: 'monthly', priority: 0.8 },
  { path: '/recursos/gt-social',          changeFreq: 'monthly', priority: 0.8 },
  { path: '/recursos/help-overlander',    changeFreq: 'monthly', priority: 0.8 },
  { path: '/recursos/explorer',           changeFreq: 'monthly', priority: 0.8 },
  { path: '/recursos/desapega',           changeFreq: 'monthly', priority: 0.8 },
  // Blog pillar pages — slugs em PT, conteúdo PT
  { path: '/blog/destinos',               changeFreq: 'weekly',  priority: 0.8 },
  { path: '/blog/preparacao',             changeFreq: 'weekly',  priority: 0.8 },
  { path: '/blog/vida-overlander',        changeFreq: 'weekly',  priority: 0.8 },
  // Legal — documentos só em português
  { path: '/privacidade',                 changeFreq: 'yearly',  priority: 0.3 },
  { path: '/termos',                      changeFreq: 'yearly',  priority: 0.3 },
  { path: '/termos/help-overlander',      changeFreq: 'yearly',  priority: 0.3 },
  { path: '/termos/conta-business',       changeFreq: 'yearly',  priority: 0.3 },
  { path: '/comunidade',                  changeFreq: 'yearly',  priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Rotas multilíngues — gera entrada para PT, EN e ES
  const multilingualEntries: MetadataRoute.Sitemap = MULTILINGUAL_ROUTES.flatMap((r) =>
    (['pt', 'en', 'es'] as const).map((locale) => ({
      url: localePath(locale, r.path || '/'),
      lastModified: now,
      changeFrequency: r.changeFreq,
      priority: locale === 'pt' ? r.priority : r.priority * 0.9,
    }))
  );

  // Rotas PT-only — gera só entrada PT
  const ptOnlyEntries: MetadataRoute.Sitemap = PT_ONLY_ROUTES.map((r) => ({
    url: `${WWW}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFreq,
    priority: r.priority,
  }));

  // Posts do blog — busca por locale e só inclui o que realmente existe
  // Evita /en/blog/slug-pt que retorna 404
  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const [ptPosts, enPosts, esPosts] = await Promise.all([
      getAllPosts('pt'),
      getAllPosts('en'),
      getAllPosts('es'),
    ]);

    const toEntries = (posts: typeof ptPosts, locale: string) =>
      posts.map((post) => ({
        url: localePath(locale, `/blog/${post.slug}`),
        lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: locale === 'pt' ? 0.7 : 0.63,
      }));

    postEntries = [
      ...toEntries(ptPosts, 'pt'),
      ...toEntries(enPosts, 'en'),
      ...toEntries(esPosts, 'es'),
    ];
  } catch (e) {
    console.error('[sitemap] Falha ao buscar posts do Sanity:', e);
  }

  return [...multilingualEntries, ...ptOnlyEntries, ...postEntries];
}

// Revalida o sitemap a cada hora
export const revalidate = 3600;
