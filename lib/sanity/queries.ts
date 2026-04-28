import { sanityClient } from './client';
import type { PostListItem, PostFull, Pillar } from './types';

// Query base — todos os campos de listagem
const POST_LIST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  description,
  category,
  coverImage,
  coverImageAlt,
  authorName,
  publishedAt,
  tags,
  featured
`;

const POST_FULL_FIELDS = `
  ${POST_LIST_FIELDS},
  authorBio,
  body
`;

/**
 * Lista todos os posts publicados, ordenados pelo mais recente.
 * Retorna [] se Sanity não estiver configurado (fallback gracioso).
 */
export async function getAllPosts(): Promise<PostListItem[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<PostListItem[]>(
      `*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]
        | order(publishedAt desc) {
          ${POST_LIST_FIELDS}
        }`,
      {},
      { next: { revalidate: 60 } }
    );
  } catch (e) {
    console.error('[sanity] getAllPosts error:', e);
    return [];
  }
}

/**
 * Lista posts de uma pillar específica.
 */
export async function getPostsByPillar(pillar: Pillar): Promise<PostListItem[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<PostListItem[]>(
      `*[_type == "post" && category == $pillar && defined(slug.current) && publishedAt <= now()]
        | order(publishedAt desc) {
          ${POST_LIST_FIELDS}
        }`,
      { pillar },
      { next: { revalidate: 60 } }
    );
  } catch (e) {
    console.error('[sanity] getPostsByPillar error:', e);
    return [];
  }
}

/**
 * Busca um post completo pelo slug. Retorna null se não encontrado.
 */
export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  if (!sanityClient) return null;
  try {
    const post = await sanityClient.fetch<PostFull | null>(
      `*[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
        ${POST_FULL_FIELDS}
      }`,
      { slug },
      { next: { revalidate: 60 } }
    );
    return post ?? null;
  } catch (e) {
    console.error('[sanity] getPostBySlug error:', e);
    return null;
  }
}

/**
 * Busca o post em destaque (featured == true). Retorna null se não houver.
 */
export async function getFeaturedPost(): Promise<PostListItem | null> {
  if (!sanityClient) return null;
  try {
    const post = await sanityClient.fetch<PostListItem | null>(
      `*[_type == "post" && featured == true && defined(slug.current) && publishedAt <= now()]
        | order(publishedAt desc)[0] {
          ${POST_LIST_FIELDS}
        }`,
      {},
      { next: { revalidate: 60 } }
    );
    return post ?? null;
  } catch (e) {
    console.error('[sanity] getFeaturedPost error:', e);
    return null;
  }
}

/**
 * Lista posts relacionados (mesma pillar, exceto o atual). Limita a 3.
 */
export async function getRelatedPosts(
  currentSlug: string,
  pillar: Pillar
): Promise<PostListItem[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<PostListItem[]>(
      `*[_type == "post" && category == $pillar && slug.current != $slug && defined(slug.current) && publishedAt <= now()]
        | order(publishedAt desc)[0...3] {
          ${POST_LIST_FIELDS}
        }`,
      { pillar, slug: currentSlug },
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
