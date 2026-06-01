// Componente reutilizável pra renderizar uma pillar page do blog
// Usado por /blog/destinos, /blog/preparacao, /blog/vida-overlander

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '../ui/button';
import { getPostsByPillar } from '@/lib/sanity/queries';
import { sanityConfigured } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import {
  type Pillar,
  type BlogLocale,
} from '@/lib/sanity/types';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const PILLAR_KEY: Record<Pillar, 'pillarDestinos' | 'pillarPreparacao' | 'pillarVidaOverlander'> = {
  destinos: 'pillarDestinos',
  preparacao: 'pillarPreparacao',
  'vida-overlander': 'pillarVidaOverlander',
};

const PILLAR_DESC_KEY: Record<Pillar, 'pillarDestinosDesc' | 'pillarPreparacaoDesc' | 'pillarVidaOverlanderDesc'> = {
  destinos: 'pillarDestinosDesc',
  preparacao: 'pillarPreparacaoDesc',
  'vida-overlander': 'pillarVidaOverlanderDesc',
};

export async function PillarPage({ pillar, locale = 'pt' }: { pillar: Pillar; locale?: BlogLocale }) {
  const t = await getTranslations('blogPage');
  const posts = sanityConfigured ? await getPostsByPillar(pillar, locale) : [];
  const otherPillars: Pillar[] = (
    ['destinos', 'preparacao', 'vida-overlander'] as Pillar[]
  ).filter((p) => p !== pillar);

  return (
    <>
      <section className="dark bg-gt-bg-elevated text-gt-text">
        <div className="container-wide py-12 md:py-16 max-w-3xl">
          <Link
            href="/blog"
            className="text-xs uppercase tracking-wider text-gt-text-muted hover:text-gt-text font-sans inline-block mb-5"
          >
            {t('voltarBlog')}
          </Link>
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">
            {t(PILLAR_KEY[pillar])}
          </h1>
        </div>
      </section>

      <section className="bg-gt-bg py-12 md:py-16 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-base md:text-lg text-gt-text leading-relaxed font-sans">
            {t(PILLAR_DESC_KEY[pillar])}
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-12 md:py-16 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl text-gt-text mb-10">
            {t('pillarArtigos')}
          </h2>

          {posts.length === 0 ? (
            <p className="text-gt-text-muted font-sans">
              {t('semArtigosPilar')}
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const url = urlForImage(post.coverImage)
                  ?.width(800)
                  .height(450)
                  .url();
                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="bg-gt-card rounded-lg overflow-hidden border border-gt-border hover:border-gt-border-strong transition-colors group flex flex-col"
                  >
                    {url && (
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={url}
                          alt={post.coverImageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
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
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gt-card py-12 md:py-16 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-xl md:text-2xl text-gt-text mb-6">
            {t('vejaTambem')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {otherPillars.map((p) => (
              <Link
                key={p}
                href={`/blog/${p}`}
                className="bg-gt-bg rounded-lg p-6 border border-gt-border hover:border-gt-border-strong transition-colors group"
              >
                <h3 className="font-sans text-lg font-medium text-gt-text mb-2 normal-case group-hover:text-gt-orange transition-colors">
                  {t(PILLAR_KEY[p])}
                </h3>
                <span className="text-gt-orange text-sm font-medium font-sans">
                  {t('verArtigos')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-12 md:py-16 border-t border-gt-border">
        <div className="container-narrow text-center">
          <h2 className="text-2xl md:text-3xl text-gt-text mb-4">
            {t('planejeSuaViagem')}
          </h2>
          <p className="text-gt-text-muted mb-6 font-sans">
            {t('planejeSuaViagemDesc')}
          </p>
          <Button href="/baixar">{t('comecarGratis')}</Button>
        </div>
      </section>
    </>
  );
}
