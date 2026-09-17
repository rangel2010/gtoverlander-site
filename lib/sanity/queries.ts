import { sanityClient } from './client';
import type { PostListItem, PostFull, Pillar, BlogLocale } from './types';

// Query base — todos os campos de listagem
const POST_LIST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  description,
  category,
  coverImage,
  coverImageAlt,
  coverImageCredit,
  imagemSocial,
  authorName,
  publishedAt,
  tags,
  featured,
  locale,
  linkedTranslations,
  commentsEnabled
`;

const POST_FULL_FIELDS = `
  ${POST_LIST_FIELDS},
  authorBio,
  body,
  "audioUrl": audio.asset->url
`;

/**
 * Lista todos os posts publicados de um locale, ordenados pelo mais recente.
 * Posts sem locale definido são tratados como PT (retrocompatível).
 * Retorna [] se Sanity não estiver configurado (fallback gracioso).
 */
export async function getAllPosts(locale: BlogLocale = 'pt'): Promise<PostListItem[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<PostListItem[]>(
      `*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()
        && (locale == $locale || (!defined(locale) && $locale == "pt"))]
        | order(publishedAt desc) {
          ${POST_LIST_FIELDS}
        }`,
      { locale },
      { next: { revalidate: 60 } }
    );
  } catch (e) {
    console.error('[sanity] getAllPosts error:', e);
    return [];
  }
}

/**
 * Os N posts mais recentes. Usado pelo teaser da home, que mostra 3 — antes ele
 * chamava getAllPosts e trazia os 63 inteiros pra descartar 60.
 */
export async function getLatestPosts(locale: BlogLocale = 'pt', limit = 3): Promise<PostListItem[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<PostListItem[]>(
      `*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()
        && (locale == $locale || (!defined(locale) && $locale == "pt"))]
        | order(publishedAt desc) [0...$limit] {
          ${POST_LIST_FIELDS}
        }`,
      { locale, limit },
      { next: { revalidate: 60 } }
    );
  } catch (e) {
    console.error('[sanity] getLatestPosts error:', e);
    return [];
  }
}

/**
 * Quantos artigos cada página da listagem mostra.
 *
 * O blog publica ~3 posts por semana. Sem paginação a /blog renderizava todos
 * de uma vez — 63 artigos viravam 390KB de HTML, e em um ano passaria de 800KB.
 * 12 fecha certinho na grade de 3 colunas.
 */
export const POSTS_PER_PAGE = 12;

export interface PostsPage {
  posts: PostListItem[];
  /** Total de posts que casam com o filtro, não só os desta página. */
  total: number;
}

const EMPTY_PAGE: PostsPage = { posts: [], total: 0 };

// Filtro base da listagem. $excludeId tira o post em destaque, que tem seção
// própria na página 1 e não deve reaparecer no meio da paginação. Quando não há
// nada a excluir vai string vazia, que nunca casa com um _id — assim o filtro é
// sempre a mesma expressão, sem ramo condicional no GROQ.
const LIST_FILTER = `_type == "post"
  && defined(slug.current) && defined(publishedAt) && publishedAt <= now()
  && (locale == $locale || (!defined(locale) && $locale == "pt"))
  && _id != $excludeId`;

/**
 * Uma página da listagem geral, com o total pra calcular quantas páginas existem.
 * Fatia e contagem saem na mesma consulta — uma ida ao Sanity, não duas.
 */
export async function getPostsPage(
  locale: BlogLocale = 'pt',
  page = 1,
  excludeId = ''
): Promise<PostsPage> {
  if (!sanityClient) return EMPTY_PAGE;
  const { start, end } = sliceFor(page);
  try {
    return await sanityClient.fetch<PostsPage>(
      `{
        "posts": *[${LIST_FILTER}] | order(publishedAt desc) [${start}...${end}] {
          ${POST_LIST_FIELDS}
        },
        "total": count(*[${LIST_FILTER}])
      }`,
      { locale, excludeId },
      { next: { revalidate: 60 } }
    );
  } catch (e) {
    console.error('[sanity] getPostsPage error:', e);
    return EMPTY_PAGE;
  }
}

/**
 * Mesma coisa, restrito a uma pillar. Aqui não há post em destaque pra excluir.
 */
export async function getPillarPostsPage(
  pillar: Pillar,
  locale: BlogLocale = 'pt',
  page = 1
): Promise<PostsPage> {
  if (!sanityClient) return EMPTY_PAGE;
  const { start, end } = sliceFor(page);
  const filter = `${LIST_FILTER} && category == $pillar`;
  try {
    return await sanityClient.fetch<PostsPage>(
      `{
        "posts": *[${filter}] | order(publishedAt desc) [${start}...${end}] {
          ${POST_LIST_FIELDS}
        },
        "total": count(*[${filter}])
      }`,
      { pillar, locale, excludeId: '' },
      { next: { revalidate: 60 } }
    );
  } catch (e) {
    console.error('[sanity] getPillarPostsPage error:', e);
    return EMPTY_PAGE;
  }
}

/**
 * Limites da fatia, interpolados direto na query em vez de irem como parâmetro:
 * GROQ aceita variável em range, mas aqui isso é uma incerteza a menos e os
 * valores nunca vêm crus da URL — o número da página é validado contra
 * /^[1-9][0-9]*$/ na rota antes de chegar aqui, e Math.trunc fecha a porta.
 */
function sliceFor(page: number) {
  const safe = Math.max(1, Math.trunc(page) || 1);
  const start = (safe - 1) * POSTS_PER_PAGE;
  return { start, end: start + POSTS_PER_PAGE };
}

/** Quantas páginas um total de posts ocupa. Sempre pelo menos 1. */
export function totalPagesFor(total: number): number {
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}

/**
 * Busca um post completo pelo slug e locale. Retorna null se não encontrado.
 * Filtrar por locale evita que posts PT sejam renderizados em /en/ ou /es/,
 * o que causaria duplicatas sem canonical definido no Google.
 */
export async function getPostBySlug(slug: string, locale: BlogLocale = 'pt'): Promise<PostFull | null> {
  if (!sanityClient) return null;
  try {
    const post = await sanityClient.fetch<PostFull | null>(
      `*[_type == "post" && slug.current == $slug && publishedAt <= now()
        && (locale == $locale || (!defined(locale) && $locale == "pt"))][0] {
        ${POST_FULL_FIELDS}
      }`,
      { slug, locale },
      { next: { revalidate: 60 } }
    );
    return post ?? null;
  } catch (e) {
    console.error('[sanity] getPostBySlug error:', e);
    return null;
  }
}

/**
 * Em qual idioma esse slug existe?
 *
 * Serve pra URL que pede um slug sob o idioma errado — /blog/<slug-en>,
 * /es/blog/<slug-en>, /en/blog/<slug-es>. Dois bugs antigos (o hreflang
 * montando URL sem prefixo e os links do blog perdendo o prefixo de locale)
 * espalharam centenas dessas combinações, e o Search Console acumulou 281 em
 * "Não encontrado (404)". Sabendo o idioma real dá pra redirecionar em vez de
 * devolver erro.
 *
 * Post sem locale definido conta como PT, igual ao resto das queries.
 */
export async function findPostLocaleBySlug(slug: string): Promise<BlogLocale | null> {
  if (!sanityClient) return null;
  try {
    // Projeção em objeto, não `[0].locale`: aquele devolve null tanto pra
    // "slug não existe" quanto pra "existe sem campo locale", e aí o redirect
    // apontaria pra uma URL que também dá 404. coalesce resolve o default PT
    // no próprio GROQ, e o objeto nulo distingue os dois casos.
    const found = await sanityClient.fetch<{ locale: string } | null>(
      `*[_type == "post" && slug.current == $slug
        && defined(publishedAt) && publishedAt <= now()][0]{
          "locale": coalesce(locale, "pt")
        }`,
      { slug },
      { next: { revalidate: 60 } }
    );
    if (!found) return null;
    return found.locale === 'en' || found.locale === 'es' ? found.locale : 'pt';
  } catch (e) {
    console.error('[sanity] findPostLocaleBySlug error:', e);
    return null;
  }
}

/**
 * Busca o post em destaque (featured == true) de um locale. Retorna null se não houver.
 */
export async function getFeaturedPost(locale: BlogLocale = 'pt'): Promise<PostListItem | null> {
  if (!sanityClient) return null;
  try {
    const post = await sanityClient.fetch<PostListItem | null>(
      `*[_type == "post" && featured == true && defined(slug.current) && publishedAt <= now()
        && (locale == $locale || (!defined(locale) && $locale == "pt"))]
        | order(publishedAt desc)[0] {
          ${POST_LIST_FIELDS}
        }`,
      { locale },
      { next: { revalidate: 60 } }
    );
    return post ?? null;
  } catch (e) {
    console.error('[sanity] getFeaturedPost error:', e);
    return null;
  }
}

/**
 * Lista posts relacionados (mesma pillar e locale, exceto o atual). Limita a 3.
 */
export async function getRelatedPosts(
  currentSlug: string,
  pillar: Pillar,
  locale: BlogLocale = 'pt'
): Promise<PostListItem[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<PostListItem[]>(
      `*[_type == "post" && category == $pillar && slug.current != $slug && defined(slug.current) && publishedAt <= now()
        && (locale == $locale || (!defined(locale) && $locale == "pt"))]
        | order(publishedAt desc)[0...3] {
          ${POST_LIST_FIELDS}
        }`,
      { pillar, slug: currentSlug, locale },
      { next: { revalidate: 60 } }
    );
  } catch (e) {
    console.error('[sanity] getRelatedPosts error:', e);
    return [];
  }
}

/**
 * Lista todos os slugs publicados (pra generateStaticParams).
 */
export async function getAllPostSlugs(): Promise<string[]> {
  if (!sanityClient) return [];
  try {
    const slugs = await sanityClient.fetch<{ slug: string }[]>(
      `*[_type == "post" && defined(slug.current) && publishedAt <= now()] {
        "slug": slug.current
      }`,
      {},
      { next: { revalidate: 300 } }
    );
    return slugs.map((s) => s.slug);
  } catch (e) {
    console.error('[sanity] getAllPostSlugs error:', e);
    return [];
  }
}
