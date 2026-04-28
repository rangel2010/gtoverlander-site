import Link from 'next/link';

const FEATURES = [
  {
    slug: 'roteiros-ia',
    titulo: 'Roteiros com IA',
    desc: 'Roteiros personalizados em uma conversa',
  },
  {
    slug: 'off-road',
    titulo: 'Modo Off Road',
    desc: 'Crie rotas off-road do seu jeito',
    emBreve: true,
  },
  {
    slug: 'modo-offline',
    titulo: 'Modo Offline',
    desc: 'Use em qualquer lugar, sem sinal',
    emBreve: true,
  },
  {
    slug: 'waypoints',
    titulo: 'Waypoints próprios',
    desc: 'Mais de 4 milhões de pontos em 209 países',
  },
];

interface OutrasFeaturesProps {
  currentSlug: string;
}

export function OutrasFeatures({ currentSlug }: OutrasFeaturesProps) {
  const others = FEATURES.filter((f) => f.slug !== currentSlug);

  return (
    <section className="bg-gt-cream py-16 md:py-20">
      <div className="container-wide">
        <h2 className="text-xl md:text-2xl font-medium text-gt-green mb-10">
          Outras features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {others.map((f) => (
            <Link
              key={f.slug}
              href={`/recursos/${f.slug}`}
              className="bg-white rounded-lg p-6 border border-gt-green/10 hover:border-gt-green/30 transition-colors group relative"
            >
              {f.emBreve && (
                <span className="absolute top-4 right-4 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded">
                  Em breve
                </span>
              )}
              <h3 className="font-medium text-gt-green mb-2 group-hover:text-gt-orange transition-colors pr-20">
                {f.titulo}
              </h3>
              <p className="text-sm text-gt-gray-mid mb-3">{f.desc}</p>
              <span className="text-gt-orange text-sm font-medium">
                Saiba mais →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
