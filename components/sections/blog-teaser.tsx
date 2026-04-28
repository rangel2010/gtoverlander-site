import Link from 'next/link';

// TODO Fase 1.6: substituir por fetch real do Sanity (3 últimos artigos publicados)
// Por enquanto, placeholder estático com os 3 pilares
const placeholderPosts = [
  {
    categoria: 'Destinos',
    categoriaHref: '/blog/destinos',
    titulo: 'Roteiros pela Patagônia: o que ninguém te conta',
    resumo: 'Argentina e Chile em 15 dias, com fronteiras, paradas obrigatórias e dicas de quem fez.',
    href: '/blog',
  },
  {
    categoria: 'Preparação',
    categoriaHref: '/blog/preparacao',
    titulo: 'Cruzando fronteiras na América do Sul sem dor de cabeça',
    resumo: 'A documentação que você precisa, posto a posto, pra atravessar Mercosul tranquilo.',
    href: '/blog',
  },
  {
    categoria: 'Vida Overlander',
    categoriaHref: '/blog/vida-overlander',
    titulo: 'Acampar é perrengue? Só se você não souber escolher o lugar',
    resumo: 'Como escolher camping, ler o terreno e dormir bem na estrada.',
    href: '/blog',
  },
];

export function BlogTeaser() {
  return (
    <section className="bg-gt-cream py-16 md:py-20">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-medium text-gt-green">
            No blog
          </h2>
          <Link
            href="/blog"
            className="text-gt-orange text-sm font-medium hover:underline"
          >
            Ver todo o blog →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {placeholderPosts.map((p, i) => (
            <article
              key={i}
              className="bg-white rounded-lg overflow-hidden border border-gt-green/10 hover:border-gt-green/30 transition-colors group"
            >
              {/* Foto de capa — entra na fase de assets */}
              <div className="aspect-[16/9] bg-gt-green/5 flex items-center justify-center text-gt-green/30 text-xs">
                Capa do artigo
              </div>
              <div className="p-6">
                <Link
                  href={p.categoriaHref}
                  className="text-xs uppercase tracking-wider text-gt-orange/80 hover:text-gt-orange"
                >
                  {p.categoria}
                </Link>
                <h3 className="font-medium text-gt-green text-base md:text-lg mt-3 mb-3 leading-snug group-hover:text-gt-orange transition-colors">
                  <Link href={p.href}>{p.titulo}</Link>
                </h3>
                <p className="text-sm text-gt-gray-mid leading-relaxed">
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
