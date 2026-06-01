import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/sanity/queries';
import { sanityConfigured } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import { type Pillar, type BlogLocale } from '@/lib/sanity/types';

const PILLAR_KEY: Record<Pillar, 'pillarDestinos' | 'pillarPreparacao' | 'pillarVidaOverlander'> = {
  destinos: 'pillarDestinos',
  preparacao: 'pillarPreparacao',
  'vida-overlander': 'pillarVidaOverlander',
};

const placeholderHrefs = ['/blog/destinos', '/blog/preparacao', '/blog/vida-overlander'];

export async function BlogTeaser({ locale = 'pt' }: { locale?: BlogLocale }) {
  const t = await getTranslations('home.blog');
  const tb = await getTranslations('blogPage');

  // Tenta buscar posts reais do Sanity filtrados por locale.
  // Se houver pelo menos 1 post real, mostra os reais (até 3).
  // Só cai em placeholder se não tiver nenhum.
  const realPosts = sanityConfigured ? await getAllPosts(locale) : [];
  const showReal = realPosts.length >= 1;
  const display = showReal ? realPosts.slice(0, 3) : null;

  return (
    <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 className="text-3xl md:text-4xl text-gt-text">{t('titulo')}</h2>
          <Link
            href="/blog"
            className="text-gt-orange text-sm font-medium hover:underline font-sans"
          >
            {t('verTudo')}
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {display
            ? display.map((p) => {
                const url = urlForImage(p.coverImage)
                  ?.width(800)
                  .height(450)
                  .url();
                return (
                  <article
                    key={p._id}
                    className="bg-gt-card rounded-lg overflow-hidden border border-gt-border hover:border-gt-border-strong transition-colors group"
                  >
                    <Link href={`/blog/${p.slug}`}>
                      {url ? (
                        <div className="aspect-[16/9] relative">
                          <Image
                            src={url}
                            alt={p.coverImageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/9] bg-gt-card-hover flex items-center justify-center text-gt-text-dim text-xs font-sans">
                          {p.title}
                        </div>
                      )}
                      <div className="p-6">
                        <p className="text-xs uppercase tracking-wider text-gt-orange/80 font-sans">
                          {tb(PILLAR_KEY[p.category])}
                        </p>
                        <h3 className="font-sans font-medium text-gt-text text-base md:text-lg mt-3 mb-3 leading-snug group-hover:text-gt-orange transition-colors normal-case">
                          {p.title}
                        </h3>
                        <p className="text-sm text-gt-text-muted leading-relaxed font-sans line-clamp-3">
                          {p.description}
                        </p>
                      </div>
                    </Link>
                  </article>
                );
              })
            : ([1, 2, 3] as const).map((n) => (
                <article
                  key={n}
                  className="bg-gt-card rounded-lg overflow-hidden border border-gt-border hover:border-gt-border-strong transition-colors group"
                >
                  <div className="aspect-[16/9] bg-gt-card-hover flex items-center justify-center text-gt-text-dim text-xs font-sans">
                    {t('capaCover')}
                  </div>
                  <div className="p-6">
                    <Link
                      href={placeholderHrefs[n - 1]}
                      className="text-xs uppercase tracking-wider text-gt-orange/80 hover:text-gt-orange font-sans"
                    >
                      {tb(PILLAR_KEY[(['destinos', 'preparacao', 'vida-overlander'] as const)[n - 1]])}
                    </Link>
                    <h3 className="font-sans font-medium text-gt-text text-base md:text-lg mt-3 mb-3 leading-snug group-hover:text-gt-orange transition-colors normal-case">
                      {t(`placeholderTitulo${n}`)}
                    </h3>
                    <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                      {t(`placeholderResumo${n}`)}
                    </p>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
