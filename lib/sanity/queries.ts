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
  imagemSocial,
  authorName,
  publishedAt,
  tags,
  featured,
  locale,
  linkedTranslations
`;

const POST_FULL_FIELDS = `
  ${POST_LIST_FIELDS},
  authorBio,
  body
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
 * Lista posts de uma pillar específica filtrados por locale.
 */
export async function getPostsByPillar(pillar: Pillar, locale: BlogLocale = 'pt'): Promise<PostListItem[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<PostListItem[]>(
      `*[_type == "post" && category == $pillar && defined(slug.current) && publishedAt <= now()
        && (locale == $locale || (!defined(locale) && $locale == "pt"))]
        | order(publishedAt desc) {
          ${POST_LIST_FIELDS}
        }`,
      { pillar, locale },
      { next: { revalidate: 60 } }
    );
  } catch (e) {
    console.error('[sanity] getPostsByPillar error:', e);
    return [];
  }
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
