import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/sanity/queries';
import { BASE_URL } from '@/lib/seo';

const WWW = 'https://www.gtoverlander.com.br';
const LOCALES = ['pt', 'en', 'es'] as const;
const localePath = (locale: string, path: string) =>
  locale === 'pt' ? `${WWW}${path}` : `${WWW}/${locale}${path}`;

// Rotas estáticas + dinâmicas (posts do Sanity)
// Acessível em /sitemap.xml após build/deploy

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: {
    path: string;
    changeFreq: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }[] = [
    { path: '', changeFreq: 'weekly', priority: 1.0 },
    { path: '/recursos', changeFreq: 'monthly', priority: 0.9 },
    { path: '/recursos/roteiros-ia', changeFreq: 'monthly', priority: 0.8 },
    { path: '/recursos/modo-offline', changeFreq: 'monthly', priority: 0.7 },
    { path: '/recursos/waypoints', changeFreq: 'monthly', priority: 0.8 },
    { path: '/recursos/gt-social', changeFreq: 'monthly', priority: 0.8 },
    { path: '/recursos/help-overlander', changeFreq: 'monthly', priority: 0.8 },
    { path: '/recursos/explorer', changeFreq: 'monthly', priority: 0.8 },
    { path: '/recursos/desapega', changeFreq: 'monthly', priority: 0.8 },
    { path: '/planos', changeFreq: 'monthly', priority: 0.9 },
    { path: '/blog', changeFreq: 'weekly', priority: 0.9 },
    { path: '/blog/destinos', changeFreq: 'weekly', priority: 0.8 },
    { path: '/blog/preparacao', changeFreq: 'weekly', priority: 0.8 },
    { path: '/blog/vida-overlander', changeFreq: 'weekly', priority: 0.8 },
    { path: '/sobre', changeFreq: 'monthly', priority: 0.7 },
    { path: '/faq', changeFreq: 'monthly', priority: 0.7 },
    { path: '/empresas', changeFreq: 'monthly', priority: 0.7 },
    { path: '/parcerias', changeFreq: 'monthly', priority: 0.7 },
    { path: '/contato', changeFreq: 'monthly', priority: 0.5 },
    { path: '/suporte', changeFreq: 'monthly', priority: 0.5 },
    { path: '/baixar', changeFreq: 'monthly', priority: 0.6 },
    { path: '/privacidade', changeFreq: 'yearly', priority: 0.3 },
    { path: '/termos', changeFreq: 'yearly', priority: 0.3 },
    { path: '/termos/help-overlander', changeFreq: 'yearly', priority: 0.3 },
    { path: '/termos/conta-business', changeFreq: 'yearly', priority: 0.3 },
    { path: '/comunidade', changeFreq: 'yearly', priority: 0.4 },
  ];

  // Gera uma entrada por locale para cada rota estática
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((r) =>
    LOCALES.map((locale) => ({
      url: localePath(locale, r.path || '/'),
      lastModified: now,
      changeFrequency: r.changeFreq,
      priority: locale === 'pt' ? r.priority : r.priority * 0.9,
    }))
  );

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    // Gera uma entrada por locale para cada post
    postEntries = posts.flatMap((post) =>
      LOCALES.map((locale) => ({
        url: localePath(locale, `/blog/${post.slug}`),
        lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: locale === 'pt' ? 0.7 : 0.63,
      }))
    );
  } catch (e) {
    console.error('[sitemap] Falha ao buscar posts do Sanity:', e);
  }

  return [...staticEntries, ...postEntries];
}
