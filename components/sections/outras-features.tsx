import Link from 'next/link';

const FEATURES = [
  {
    slug: 'roteiros-ia',
    titulo: 'Roteiros com IA',
    desc: 'Roteiros personalizados em uma conversa',
  },
  {
    slug: 'waypoints',
    titulo: 'Waypoints próprios',
    desc: 'Mais de 4 milhões de pontos em 209 países',
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
    slug: 'overlanders',
    titulo: 'Overlanders',
    desc: 'Siga viajantes, descubra rotas, copie roteiros',
  },
  {
    slug: 'help-overlander',
    titulo: 'Help Overlander',
    desc: 'Comunidade que se ajuda na estrada',
  },
  {
    slug: 'explorer',
    titulo: 'GT Explorer',
    desc: 'Sua jornada em níveis, conquistas e ranking',
  },
  {
    slug: 'desapega',
    titulo: 'GT Desapega',
    desc: 'Compra, venda e troca de equipamento overlander',
  },
];

interface OutrasFeaturesProps {
  currentSlug: string;
}

export function OutrasFeatures({ currentSlug }: OutrasFeaturesProps) {
  const others = FEATURES.filter((f) => f.slug !== currentSlug);

  return (
    <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
      <div className="container-wide">
        <h2 className="text-2xl md:text-3xl text-gt-text mb-10">
          Outras features
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {others.map((f) => (
            <Link
              key={f.slug}
              href={`/recursos/${f.slug}`}
              className="bg-gt-bg rounded-lg p-6 border border-gt-border hover:border-gt-border-strong transition-colors group relative"
            >
              {f.emBreve && (
                <span className="absolute top-4 right-4 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded font-sans">
                  Em breve
                </span>
              )}
              <h3 className="font-sans font-medium text-gt-text mb-2 group-hover:text-gt-orange transition-colors pr-16">
                {f.titulo}
              </h3>
              <p className="text-sm text-gt-text-muted mb-3 font-sans leading-relaxed">{f.desc}</p>
              <span className="text-gt-orange text-sm font-medium font-sans">
                Saiba mais →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
