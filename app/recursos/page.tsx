import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Recursos',
  description:
    'Roteiros com IA, Modo Off Road, Modo Offline e mais de 4 milhões de waypoints próprios em 209 países. Tudo no GT Overlander.',
};

const features = [
  {
    slug: 'roteiros-ia',
    titulo: 'Roteiros com IA',
    desc: 'Descreva sua viagem em linguagem natural. A IA monta a espinha dorsal do trajeto e você personaliza com paradas, postos, hotéis e campings. Free pra começar, Premium pra ir mais fundo.',
    status: 'disponivel' as const,
  },
  {
    slug: 'waypoints',
    titulo: 'Waypoints próprios',
    desc: 'Mais de 4 milhões de waypoints em 209 países: postos, campings, oficinas, atrativos. A maior base do universo overlander já reunida em uma plataforma.',
    status: 'disponivel' as const,
  },
  {
    slug: 'off-road',
    titulo: 'Modo Off Road',
    desc: 'Crie rotas off-road com a sua cara, ligando os waypoints da nossa base num mapa interativo dedicado a trilhas. Para quem sai do asfalto.',
    status: 'em-breve' as const,
  },
  {
    slug: 'modo-offline',
    titulo: 'Modo Offline',
    desc: 'Use o GT em qualquer lugar do mundo — sem depender de sinal. Baixe e parta. Universal pra Free, Plus e Pro.',
    status: 'em-breve' as const,
  },
];

export default function RecursosPage() {
  return (
    <>
      <section className="bg-gt-bg text-gt-text">
        <div className="container-wide py-16 md:py-24 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-5 font-sans">
            O que o GT entrega
          </p>
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">
            Tudo que você precisa pra rodar
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans">
            Da rota gerada por IA aos pontos de apoio na estrada. Do asfalto à
            trilha. Online ou offline. O ecossistema completo do viajante
            overland.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <Link
                key={f.slug}
                href={`/recursos/${f.slug}`}
                className="bg-gt-card rounded-lg p-7 md:p-8 border border-gt-border hover:border-gt-border-strong hover:bg-gt-card-hover transition-colors group relative"
              >
                {f.status === 'em-breve' && (
                  <span className="absolute top-5 right-5 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded font-sans">
                    Em breve
                  </span>
                )}
                <h2 className="text-2xl md:text-3xl text-gt-text mb-3 group-hover:text-gt-orange transition-colors pr-24">
                  {f.titulo}
                </h2>
                <p className="text-sm text-gt-text-muted leading-relaxed mb-5 font-sans">
                  {f.desc}
                </p>
                <span className="text-gt-orange text-sm font-medium font-sans">
                  Saiba mais →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-4">
            Pronto pra começar?
          </h2>
          <p className="text-gt-text-muted mb-8 max-w-md mx-auto font-sans">
            Free pra começar. Premium pra ir mais fundo. Off Road pra quem sai
            do asfalto.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/baixar">Baixar grátis</Button>
            <Button href="/planos" variant="outline">
              Ver planos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
