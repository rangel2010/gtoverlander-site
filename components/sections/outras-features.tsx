// Link do i18n, não o de 'next/link' — mantém o prefixo /es e /en.
import { Link } from '@/i18n/navigation';

const FEATURES = [
  {
    slug: 'roteiros-ia',
    titulo: 'Roteiros com IA',
    desc: 'Roteiros personalizados em uma conversa',
  },
  {
    slug: 'waypoints',
    titulo: 'Base de Waypoints',
    desc: 'Mais de 4 milhões de pontos em 211 países',
  },
  {
    slug: 'modo-offline',
    titulo: 'Modo Offline',
    desc: 'Use em qualquer lugar, sem sinal',
  },
  {
    slug: 'gt-social',
    titulo: 'GT Social',
    desc: 'Siga overlanders, descubra rotas, adote roteiros',
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
              {/* Nenhuma feature desta lista está "em breve" desde 06/09/2026 —
                  GT Social, Explorer e Desapega subiram junto com a V2. */}
              <h3 className="font-sans font-medium text-gt-text mb-2 group-hover:text-gt-orange-text transition-colors">
                {f.titulo}
              </h3>
              <p className="text-sm text-gt-text-muted mb-3 font-sans leading-relaxed">{f.desc}</p>
              <span className="text-gt-orange-text text-sm font-medium font-sans">
                Saiba mais →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
