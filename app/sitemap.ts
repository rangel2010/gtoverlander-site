import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/sanity/queries';

const WWW = 'https://www.gtoverlander.com.br';
const localePath = (locale: string, path: string) =>
  locale === 'pt' ? WWW + path : WWW + '/' + locale + path;

// Rotas disponiveis nos 3 locales (tem traducao real)
const MULTILINGUAL_ROUTES = [
  { path: '',            changeFreq: 'weekly'  as const, priority: 1.0 },
  { path: '/recursos',   changeFreq: 'monthly' as const, priority: 0.9 },
  { path: '/planos',     changeFreq: 'monthly' as const, priority: 0.9 },
  { path: '/blog',       changeFreq: 'weekly'  as const, priority: 0.9 },
  { path: '/sobre',      changeFreq: 'monthly' as const, priority: 0.7 },
  { path: '/faq',        changeFreq: 'monthly' as const, priority: 0.7 },
  { path: '/empresas',   changeFreq: 'monthly' as const, priority: 0.7 },
  { path: '/parcerias',  changeFreq: 'monthly' as const, priority: 0.7 },
  { path: '/contato',    changeFreq: 'monthly' as const, priority: 0.5 },
  { path: '/suporte',    changeFreq: 'monthly' as const, priority: 0.5 },
  { path: '/baixar',     changeFreq: 'monthly' as const, priority: 0.6 },
];

// Rotas PT-only: conteudo sem traducao ou legal em portugues
// Nao incluir EN/ES — evita thin content duplicado e crawl budget desperdicado
const PT_ONLY_ROUTES = [
  { path: '/recursos/roteiros-ia',     changeFreq: 'monthly' as const, priority: 0.8 },
  { path: '/recursos/modo-offline',    changeFreq: 'monthly' as const, priority: 0.7 },
  { path: '/recursos/waypoints',       changeFreq: 'monthly' as const, priority: 0.8 },
  { path: '/recursos/gt-social',       changeFreq: 'monthly' as const, priority: 0.8 },
  { path: '/recursos/help-overlander', changeFreq: 'monthly' as const, priority: 0.8 },
  { path: '/recursos/explorer',        changeFreq: 'monthly' as const, priority: 0.8 },
  { path: '/recursos/desapega',        changeFreq: 'monthly' as const, priority: 0.8 },
  { path: '/blog/destinos',            changeFreq: 'weekly'  as const, priority: 0.8 },
  { path: '/blog/preparacao',          changeFreq: 'weekly'  as const, priority: 0.8 },
  { path: '/blog/vida-overlander',     changeFreq: 'weekly'  as const, priority: 0.8 },
  { path: '/privacidade',              changeFreq: 'yearly'  as const, priority: 0.3 },
  { path: '/termos',                   changeFreq: 'yearly'  as const, priority: 0.3 },
  { path: '/termos/help-overlander',   changeFreq: 'yearly'  as const, priority: 0.3 },
  { path: '/termos/conta-business',    changeFreq: 'yearly'  as const, priority: 0.3 },
  { path: '/comunidade',               changeFreq: 'yearly'  as const, priority: 0.4 },
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const multilingualEntries: MetadataRoute.Sitemap = MULTILINGUAL_ROUTES.flatMap((r) =>
    (['pt', 'en', 'es'] as const).map((locale) => ({
      url: localePath(locale, r.path || '/'),
      lastModified: now,
      changeFrequency: r.changeFreq,
      priority: locale === 'pt' ? r.priority : r.priority * 0.9,
    }))
  );

  const ptOnlyEntries: MetadataRoute.Sitemap = PT_ONLY_ROUTES.map((r) => ({
    url: WWW + r.path,
    lastModified: now,
    changeFrequency: r.changeFreq,
    priority: r.priority,
  }));

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const [ptPosts, enPosts, esPosts] = await Promise.all([
      getAllPosts('pt'),
      getAllPosts('en'),
      getAllPosts('es'),
    ]);

    const toEntries = (posts: typeof ptPosts, locale: string): MetadataRoute.Sitemap =>
      posts.map((post) => ({
        url: localePath(locale, '/blog/' + post.slug),
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
