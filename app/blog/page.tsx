import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  getAllPosts,
  getFeaturedPost,
} from '@/lib/sanity/queries';
import { sanityConfigured } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import { PILLAR_TITLES, type Pillar } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Destinos, preparação e vida overlander pra quem viaja por terra. Roteiros, dicas e histórias de quem vive na estrada.',
};

const pillars: Pillar[] = ['destinos', 'preparacao', 'vida-overlander'];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPage() {
  if (!sanityConfigured) {
    return <BlogEmConstrucao />;
  }

  const [allPosts, featured] = await Promise.all([
    getAllPosts(),
    getFeaturedPost(),
  ]);

  // Remove o featured da lista pra não duplicar
  const otherPosts = featured
    ? allPosts.filter((p) => p._id !== featured._id)
    : allPosts;

  return (
    <>
      <section className="bg-gt-bg text-gt-text">
        <div className="container-wide py-12 md:py-16 max-w-3xl">
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-5">
            Blog GT Overlander
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans">
            Destinos, preparação e vida overlander pra quem viaja por terra.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-12 md:py-16 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl text-gt-text mb-8">
            Os 3 pilares
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <Link
                key={p}
                href={`/blog/${p}`}
                className="bg-gt-card rounded-lg p-6 border border-gt-border hover:border-gt-border-strong transition-colors group"
              >
                <h3 className="font-sans text-lg font-medium text-gt-text mb-2 normal-case group-hover:text-gt-orange transition-colors">
                  {PILLAR_TITLES[p]}
                </h3>
                <span className="text-gt-orange text-sm font-medium font-sans">
                  Ver artigos →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured && (
        <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
          <div className="container-wide">
            <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-4 font-sans">
              Em destaque
            </p>
            <FeaturedPost post={featured} />
          </div>
        </section>
      )}

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl text-gt-text mb-10">
            Todos os artigos
          </h2>

          {otherPosts.length === 0 ? (
            <p className="text-gt-text-muted font-sans">
              Ainda não temos artigos publicados. Em breve!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-4">
            Planeje sua próxima viagem
          </h2>
          <p className="text-gt-text-muted mb-8 font-sans max-w-md mx-auto">
            Pegou inspiração? Baixa o GT e começa a planejar.
          </p>
          <Button href="/baixar">Baixar grátis</Button>
        </div>
      </section>
    </>
  );
}

function FeaturedPost({ post }: { post: NonNullable<Awaited<ReturnType<typeof getFeaturedPost>>> }) {
  const imageUrl = urlForImage(post.coverImage)?.width(1200).height(675).url();

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="grid md:grid-cols-2 gap-8 items-center bg-gt-bg rounded-lg overflow-hidden border border-gt-border hover:border-gt-border-strong transition-colors group"
    >
      {imageUrl && (
        <div className="aspect-[16/9] relative">
          <Image
            src={imageUrl}
            alt={post.coverImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-wider text-gt-orange/80 mb-3 font-sans">
          {PILLAR_TITLES[post.category]}
        </p>
        <h3 className="text-2xl md:text-3xl text-gt-text mb-4 leading-snug group-hover:text-gt-orange transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-gt-text-muted leading-relaxed mb-5 font-sans">
          {post.description}
        </p>
        <p className="text-xs text-gt-text-dim font-sans">
          {formatDate(post.publishedAt)}
        </p>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: Awaited<ReturnType<typeof getAllPosts>>[number] }) {
  const imageUrl = urlForImage(post.coverImage)?.width(800).height(450).url();

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-gt-card rounded-lg overflow-hidden border border-gt-border hover:border-gt-border-strong transition-colors group flex flex-col"
    >
      {imageUrl && (
        <div className="aspect-[16/9] relative">
          <Image
            src={imageUrl}
            alt={post.coverImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-xs uppercase tracking-wider text-gt-orange/80 mb-3 font-sans">
          {PILLAR_TITLES[post.category]}
        </p>
        <h3 className="font-sans text-lg font-medium text-gt-text mb-3 leading-snug group-hover:text-gt-orange transition-colors normal-case flex-1">
          {post.title}
        </h3>
        <p className="text-sm text-gt-text-muted leading-relaxed mb-4 font-sans line-clamp-3">
          {post.description}
        </p>
        <p className="text-xs text-gt-text-dim font-sans">
          {formatDate(post.publishedAt)}
        </p>
      </div>
    </Link>
  );
}

function BlogEmConstrucao() {
  return (
    <section className="bg-gt-bg text-gt-text min-h-[60vh] flex items-center">
      <div className="container-narrow text-center py-16 md:py-24">
        <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">
          Blog em construção
        </h1>
        <p className="text-base md:text-lg text-gt-text-muted leading-relaxed mb-8 font-sans">
          Estamos preparando o blog GT Overlander — destinos, preparação e
          histórias de estrada. Em breve.
        </p>
        <Button href="/baixar">Baixar o app</Button>
      </div>
    </section>
  );
}
