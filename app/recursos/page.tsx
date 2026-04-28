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
      <section className="bg-gt-green text-white">
        <div className="container-wide py-16 md:py-24 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-white/60 mb-5">
            O que o GT entrega
          </p>
          <h1 className="text-4xl md:text-5xl font-medium leading-[1.1] mb-6">
            Tudo que você precisa pra rodar
          </h1>
          <p className="text-base md:text-lg text-white/75 leading-relaxed">
            Da rota gerada por IA aos pontos de apoio na estrada. Do asfalto à
            trilha. Online ou offline. O ecossistema completo do viajante
            overland.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <Link
                key={f.slug}
                href={`/recursos/${f.slug}`}
                className="bg-gt-cream rounded-lg p-7 md:p-8 border border-gt-green/10 hover:border-gt-green/30 transition-colors group relative"
              >
                {f.status === 'em-breve' && (
                  <span className="absolute top-5 right-5 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded">
                    Em breve
                  </span>
                )}
                <h2 className="font-medium text-gt-green text-xl md:text-2xl mb-3 group-hover:text-gt-orange transition-colors pr-24">
                  {f.titulo}
                </h2>
                <p className="text-sm text-gt-gray-mid leading-relaxed mb-5">
                  {f.desc}
                </p>
                <span className="text-gt-orange text-sm font-medium">
                  Saiba mais →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-green text-white py-16 md:py-20">
        <div className="container-narrow text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">
            Pronto pra começar?
          </h2>
          <p className="text-white/75 mb-8 max-w-md mx-auto">
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
