// Hub do blog: /blog (página 1) e /blog/pagina/N (demais).
// Rota fina em app/[locale]/blog/, mesmo padrão da PillarPage.

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '../ui/button';
import { Pagination } from '@/components/blog/pagination';
import { NewsletterCompact } from './newsletter-compact';
import {
  getPostsPage,
  getFeaturedPost,
  totalPagesFor,
} from '@/lib/sanity/queries';
import { sanityConfigured } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import type { PostListItem, Pillar, BlogLocale } from '@/lib/sanity/types';

const pillars: Pillar[] = ['destinos', 'preparacao', 'vida-overlander'];

const PILLAR_KEY: Record<Pillar, 'pillarDestinos' | 'pillarPreparacao' | 'pillarVidaOverlander'> = {
  destinos: 'pillarDestinos',
  preparacao: 'pillarPreparacao',
  'vida-overlander': 'pillarVidaOverlander',
};

const DATE_LOCALES: Record<string, string> = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };

function formatDate(iso: string, locale = 'pt') {
  return new Date(iso).toLocaleDateString(DATE_LOCALES[locale] ?? 'pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export async function BlogHub({ locale, page = 1 }: { locale: BlogLocale; page?: number }) {
  const t = await getTranslations('blogPage');

  if (!sanityConfigured) {
    return <BlogEmConstrucao t={t} />;
  }

  // O destaque tem seção própria na página 1 e sai da listagem em todas as
  // páginas — senão reapareceria no meio da paginação.
  const featured = await getFeaturedPost(locale);
  const { posts, total } = await getPostsPage(locale, page, featured?._id ?? '');
  const totalPages = totalPagesFor(total);

  // Página fora do intervalo: 404 em vez de uma listagem vazia indexável.
  if (page > totalPages) notFound();

  const isFirstPage = page === 1;

  return (
    <>
      <section className="dark bg-gt-bg-elevated text-gt-text">
        <div className="container-wide py-12 md:py-16 max-w-3xl">
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-5">{t('titulo')}</h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans">
            {t('desc')}
          </p>
          <NewsletterCompact />
        </div>
      </section>

      {isFirstPage && (
        <section className="bg-gt-bg py-12 md:py-16 border-t border-gt-border">
          <div className="container-wide">
            <h2 className="text-2xl md:text-3xl text-gt-text mb-8">{t('tresPilares')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((p) => (
                <Link
                  key={p}
                  href={`/blog/${p}`}
                  className="bg-gt-card rounded-lg p-6 border border-gt-border hover:border-gt-border-strong transition-colors group"
                >
                  <h3 className="font-sans text-lg font-medium text-gt-text mb-2 normal-case group-hover:text-gt-orange-text transition-colors">
                    {t(PILLAR_KEY[p])}
                  </h3>
                  <span className="text-gt-orange-text text-sm font-medium font-sans">
                    {t('verArtigos')}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {isFirstPage && featured && (
        <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
          <div className="container-wide">
            <p className="text-xs uppercase tracking-[0.18em] text-gt-orange-text mb-4 font-sans">
              {t('emDestaque')}
            </p>
            <FeaturedPost
              post={featured}
              pillarLabel={t(PILLAR_KEY[featured.category])}
              locale={locale}
            />
          </div>
        </section>
      )}

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl text-gt-text mb-10">{t('todosArtigos')}</h2>

          {posts.length === 0 ? (
            <p className="text-gt-text-muted font-sans">{t('semArtigos')}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  pillarLabel={t(PILLAR_KEY[post.category])}
                  locale={locale}
                />
              ))}
            </div>
          )}

          <Pagination basePath="/blog" page={page} totalPages={totalPages} />
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-4">{t('planejeSuaViagem')}</h2>
          <p className="text-gt-text-muted mb-8 font-sans max-w-md mx-auto">
            {t('planejeSuaViagemDesc')}
          </p>
          <Button href="/baixar">{t('comecarGratis')}</Button>
        </div>
      </section>
    </>
  );
}

function FeaturedPost({
  post,
  pillarLabel,
  locale,
}: {
  post: PostListItem;
  pillarLabel: string;
  locale?: string;
}) {
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
        <p className="text-xs uppercase tracking-wider text-gt-orange-text mb-3 font-sans">
          {pillarLabel}
        </p>
        <h3 className="text-2xl md:text-3xl text-gt-text mb-4 leading-snug group-hover:text-gt-orange-text transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-gt-text-muted leading-relaxed mb-5 font-sans">
          {post.description}
        </p>
        <p className="text-xs text-gt-text-dim font-sans">
          {formatDate(post.publishedAt, locale)}
        </p>
      </div>
    </Link>
  );
}

function PostCard({
  post,
  pillarLabel,
  locale,
}: {
  post: PostListItem;
  pillarLabel: string;
  locale?: string;
}) {
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
        <p className="text-xs uppercase tracking-wider text-gt-orange-text mb-3 font-sans">
          {pillarLabel}
        </p>
        <h3 className="font-sans text-lg font-medium text-gt-text mb-3 leading-snug group-hover:text-gt-orange-text transition-colors normal-case flex-1">
          {post.title}
        </h3>
        <p className="text-sm text-gt-text-muted leading-relaxed mb-4 font-sans line-clamp-3">
          {post.description}
        </p>
        <p className="text-xs text-gt-text-dim font-sans">
          {formatDate(post.publishedAt, locale)}
        </p>
      </div>
    </Link>
  );
}

function BlogEmConstrucao({ t }: { t: Awaited<ReturnType<typeof getTranslations<'blogPage'>>> }) {
  return (
    <section className="dark bg-gt-bg-elevated text-gt-text min-h-[60vh] flex items-center">
      <div className="container-narrow text-center py-16 md:py-24">
        <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">{t('titulo')}</h1>
        <p className="text-base md:text-lg text-gt-text-muted leading-relaxed mb-8 font-sans">
          {t('desc')}
        </p>
        <Button href="/baixar">{t('comecarGratis')}</Button>
      </div>
    </section>
  );
}
