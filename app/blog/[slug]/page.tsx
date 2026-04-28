import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
} from '@/lib/sanity/queries';
import { urlForImage } from '@/lib/sanity/image';
import { PILLAR_TITLES } from '@/lib/sanity/types';
import {
  articleLd,
  breadcrumbLd,
  jsonLdScriptProps,
} from '@/lib/seo';

interface PageProps {
  params: { slug: string };
}

// Pré-renderiza todos os posts publicados em build
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Revalida a cada 60s pra pegar posts editados
export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post não encontrado' };

  const imageUrl = urlForImage(post.coverImage)?.width(1200).height(630).url();

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.authorName],
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.coverImageAlt }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Componentes customizados pra renderizar markdown com a paleta GT
const markdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-3xl md:text-4xl text-gt-text mt-12 mb-6">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-2xl md:text-3xl text-gt-text mt-12 mb-5">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-sans text-xl font-medium text-gt-text mt-8 mb-4 normal-case">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-gt-text leading-relaxed mb-5 font-sans">{children}</p>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-gt-orange pl-5 my-6 italic text-gt-text-muted font-sans">
      {children}
    </blockquote>
  ),
  a: ({ children, href }: { children?: React.ReactNode; href?: string }) => {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className="text-gt-orange hover:underline"
      >
        {children}
      </a>
    );
  },
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-medium text-gt-text">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc pl-6 mb-5 text-gt-text font-sans space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal pl-6 mb-5 text-gt-text font-sans space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  hr: () => <hr className="my-10 border-gt-border" />,
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="bg-gt-card text-gt-text px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse font-sans text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="border-b border-gt-border-strong text-gt-text-muted">
      {children}
    </thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="text-left py-3 px-4 font-medium">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="py-3 px-4 border-b border-gt-border text-gt-text">
      {children}
    </td>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || ''}
        className="rounded-lg w-full"
      />
      {alt && (
        <figcaption className="text-sm text-gt-text-dim mt-3 text-center font-sans italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
};

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.slug, post.category);
  const coverUrl = urlForImage(post.coverImage)
    ?.width(1600)
    .height(900)
    .url();

  return (
    <>
      {/* Schema.org Article + Breadcrumb */}
      <script {...jsonLdScriptProps(articleLd(post))} />
      <script
        {...jsonLdScriptProps(
          breadcrumbLd([
            { name: 'Blog', url: '/blog' },
            { name: PILLAR_TITLES[post.category], url: `/blog/${post.category}` },
            { name: post.title, url: `/blog/${post.slug}` },
          ])
        )}
      />

      <article>
        <header className="bg-gt-bg pt-16 md:pt-20 pb-10 md:pb-14">
          <div className="container-narrow">
            <Link
              href={`/blog/${post.category}`}
              className="text-xs uppercase tracking-wider text-gt-orange/80 hover:text-gt-orange font-sans inline-block mb-5"
            >
              {PILLAR_TITLES[post.category]}
            </Link>
            <h1 className="text-4xl md:text-5xl text-gt-text leading-[1.05] mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-gt-text-muted leading-relaxed mb-8 font-sans">
              {post.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gt-text-dim font-sans">
              <span>{post.authorName}</span>
              <span>·</span>
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
          </div>
        </header>

        {coverUrl && (
          <div className="relative aspect-[16/9] max-w-6xl mx-auto px-6">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src={coverUrl}
                alt={post.coverImageAlt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="bg-gt-bg py-12 md:py-16">
          <div className="container-narrow">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {post.body}
            </ReactMarkdown>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gt-border">
                <p className="text-xs uppercase tracking-wider text-gt-text-muted mb-3 font-sans">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gt-card border border-gt-border rounded-full px-3 py-1 text-gt-text-muted font-sans"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* CTA contextual */}
      <section className="bg-gt-card py-12 md:py-16 border-t border-gt-border">
        <div className="container-narrow text-center">
          <h2 className="text-2xl md:text-3xl text-gt-text mb-4">
            Pronto pra rodar essa rota?
          </h2>
          <p className="text-gt-text-muted mb-6 font-sans">
            Baixa o GT e começa a planejar agora.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/baixar">Baixar grátis</Button>
            <Button href="/planos" variant="outline">
              Ver planos
            </Button>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
          <div className="container-wide">
            <h2 className="text-2xl md:text-3xl text-gt-text mb-10">
              Artigos relacionados
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => {
                const url = urlForImage(p.coverImage)
                  ?.width(800)
                  .height(450)
                  .url();
                return (
                  <Link
                    key={p._id}
                    href={`/blog/${p.slug}`}
                    className="bg-gt-card rounded-lg overflow-hidden border border-gt-border hover:border-gt-border-strong transition-colors group"
                  >
                    {url && (
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={url}
                          alt={p.coverImageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-wider text-gt-orange/80 mb-2 font-sans">
                        {PILLAR_TITLES[p.category]}
                      </p>
                      <h3 className="font-sans text-base font-medium text-gt-text leading-snug group-hover:text-gt-orange transition-colors normal-case">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
