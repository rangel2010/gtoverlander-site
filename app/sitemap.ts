import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/sanity/queries';
import { postModifiedAt } from '@/lib/seo';
import { getRotasSite } from '@/lib/rotas';

const WWW = 'https://www.gtoverlander.com.br';
// A home entra como '/'. Para EN/ES isso geraria '/en/', que o Next responde
// com 308 pra '/en' — sitemap não deve listar URL que redireciona.
const localePath = (locale: string, path: string) =>
  locale === 'pt' ? WWW + path : WWW + '/' + locale + (path === '/' ? '' : path);

// Rotas disponiveis nos 3 locales (tem traducao real)
const MULTILINGUAL_ROUTES = [
  { path: '',            changeFreq: 'weekly'  as const, priority: 1.0 },
  { path: '/blog',                 changeFreq: 'weekly' as const, priority: 0.9 },
  { path: '/blog/destinos',        changeFreq: 'weekly' as const, priority: 0.8 },
  { path: '/blog/preparacao',      changeFreq: 'weekly' as const, priority: 0.8 },
  { path: '/blog/vida-overlander', changeFreq: 'weekly' as const, priority: 0.8 },
  { path: '/recursos',   changeFreq: 'monthly' as const, priority: 0.9 },
  { path: '/planos',     changeFreq: 'monthly' as const, priority: 0.9 },
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
  // /recursos/help-overlander saiu em 04/09/2026 — rota desligada, página
  // preservada no repo. Recolocar aqui quando a feature voltar.
  { path: '/recursos/explorer',        changeFreq: 'monthly' as const, priority: 0.8 },
  { path: '/recursos/shopping',        changeFreq: 'monthly' as const, priority: 0.8 },
  { path: '/dicas',                    changeFreq: 'weekly'  as const, priority: 0.7 },
  { path: '/privacidade',              changeFreq: 'yearly'  as const, priority: 0.3 },
  { path: '/termos',                   changeFreq: 'yearly'  as const, priority: 0.3 },
  { path: '/termos/help-overlander',   changeFreq: 'yearly'  as const, priority: 0.3 },
  { path: '/termos/conta-business',    changeFreq: 'yearly'  as const, priority: 0.3 },
  { path: '/comunidade',               changeFreq: 'yearly'  as const, priority: 0.4 },
  { path: '/demo',                     changeFreq: 'monthly' as const, priority: 0.5 },
];

// Datas de modificação (27/09/2026): antes, toda página fixa saía com
// lastModified = agora, renovado a cada hora. Data que não bate com mudança
// real ensina o Google a ignorar o campo — inclusive nos posts, onde ele vale.
// Agora: post leva a data da última edição (postModifiedAt); o blog e os
// pilares levam a do post mais recente; página fixa não informa data.
const BLOG_HUBS = new Set(['/blog', '/blog/destinos', '/blog/preparacao', '/blog/vida-overlander']);

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let ptPosts: Awaited<ReturnType<typeof getAllPosts>> = [];
  let enPosts: typeof ptPosts = [];
  let esPosts: typeof ptPosts = [];
  try {
    [ptPosts, enPosts, esPosts] = await Promise.all([
      getAllPosts('pt'),
      getAllPosts('en'),
      getAllPosts('es'),
    ]);
  } catch (e) {
    console.error('[sitemap] Falha ao buscar posts do Sanity:', e);
  }
  const postsByLocale = { pt: ptPosts, en: enPosts, es: esPosts };
  const latestPostDate = (locale: 'pt' | 'en' | 'es', pillar?: string) => {
    const dates = postsByLocale[locale]
      .filter((p) => !pillar || p.category === pillar)
      .map((p) => new Date(postModifiedAt(p)).getTime());
    return dates.length ? new Date(Math.max(...dates)) : undefined;
  };

  const multilingualEntries: MetadataRoute.Sitemap = MULTILINGUAL_ROUTES.flatMap((r) =>
    (['pt', 'en', 'es'] as const).map((locale) => ({
      url: localePath(locale, r.path || '/'),
      lastModified: BLOG_HUBS.has(r.path)
        ? latestPostDate(locale, r.path === '/blog' ? undefined : r.path.replace('/blog/', ''))
        : undefined,
      changeFrequency: r.changeFreq,
      priority: locale === 'pt' ? r.priority : r.priority * 0.9,
    }))
  );

  const ptOnlyEntries: MetadataRoute.Sitemap = PT_ONLY_ROUTES.map((r) => ({
    url: WWW + r.path,
    changeFrequency: r.changeFreq,
    priority: r.priority,
  }));

  const toEntries = (posts: typeof ptPosts, locale: string): MetadataRoute.Sitemap =>
    posts.map((post) => ({
      url: localePath(locale, '/blog/' + post.slug),
      lastModified: new Date(postModifiedAt(post)),
      changeFrequency: 'monthly' as const,
      priority: locale === 'pt' ? 0.7 : 0.63,
    }));

  const postEntries: MetadataRoute.Sitemap = [
    ...toEntries(ptPosts, 'pt'),
    ...toEntries(enPosts, 'en'),
    ...toEntries(esPosts, 'es'),
  ];

  // Rotas do site (02/10/2026): só as cadastradas no Studio, só em PT. A
  // vitrine /rotas só entra quando já tem rota — página vazia não vai pro Google.
  let rotas: Awaited<ReturnType<typeof getRotasSite>> = [];
  try {
    rotas = await getRotasSite();
  } catch (e) {
    console.error('[sitemap] Falha ao buscar rotas do Sanity:', e);
  }
  const rotaEntries: MetadataRoute.Sitemap = rotas.length
    ? [
        { url: WWW + '/rotas', changeFrequency: 'weekly' as const, priority: 0.8 },
        ...rotas.map((r) => ({
          url: WWW + '/rotas/' + r.slug,
          lastModified: new Date(r._updatedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        })),
      ]
    : [];

  return [...multilingualEntries, ...ptOnlyEntries, ...rotaEntries, ...postEntries];
}
