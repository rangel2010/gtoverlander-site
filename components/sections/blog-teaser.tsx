import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/sanity/queries';
import { sanityConfigured } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import { PILLAR_TITLES } from '@/lib/sanity/types';

// Placeholders pra quando Sanity não estiver configurado ou não houver posts
const placeholderPosts = [
  {
    categoria: 'Destinos & Roteiros',
    categoriaHref: '/blog/destinos',
    titulo: 'Roteiros pela Patagônia: o que ninguém te conta',
    resumo: 'Argentina e Chile em 15 dias, com fronteiras, paradas obrigatórias e dicas de quem fez.',
  },
  {
    categoria: 'Preparação & Planejamento',
    categoriaHref: '/blog/preparacao',
    titulo: 'Cruzando fronteiras na América do Sul sem dor de cabeça',
    resumo: 'A documentação que você precisa, posto a posto, pra atravessar Mercosul tranquilo.',
  },
  {
    categoria: 'Vida Overlander',
    categoriaHref: '/blog/vida-overlander',
    titulo: 'Acampar é perrengue? Só se você não souber escolher o lugar',
    resumo: 'Como escolher camping, ler o terreno e dormir bem na estrada.',
  },
];

export async function BlogTeaser() {
  // Tenta buscar posts reais do Sanity. Se Sanity não estiver configurado,
  // ou se ainda não houver posts, usa placeholders.
  const realPosts = sanityConfigured ? await getAllPosts() : [];
  const showReal = realPosts.length >= 3;
  const display = showReal ? realPosts.slice(0, 3) : null;

  return (
    <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 className="text-3xl md:text-4xl text-gt-text">No blog</h2>
          <Link
            href="/blog"
            className="text-gt-orange text-sm font-medium hover:underline font-sans"
          >
            Ver todo o blog →
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
                          {PILLAR_TITLES[p.category]}
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
            : placeholderPosts.map((p, i) => (
                <article
                  key={i}
                  className="bg-gt-card rounded-lg overflow-hidden border border-gt-border hover:border-gt-border-strong transition-colors group"
                >
                  <div className="aspect-[16/9] bg-gt-card-hover flex items-center justify-center text-gt-text-dim text-xs font-sans">
                    Capa do artigo
                  </div>
                  <div className="p-6">
                    <Link
                      href={p.categoriaHref}
                      className="text-xs uppercase tracking-wider text-gt-orange/80 hover:text-gt-orange font-sans"
                    >
                      {p.categoria}
                    </Link>
                    <h3 className="font-sans font-medium text-gt-text text-base md:text-lg mt-3 mb-3 leading-snug group-hover:text-gt-orange transition-colors normal-case">
                      {p.titulo}
                    </h3>
                    <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                      {p.resumo}
                    </p>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
