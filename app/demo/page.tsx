import type { Metadata } from 'next';
import { WaypointsMap } from '@/components/demo/waypoints-map';
import { getGeoFromHeaders } from '@/lib/demo/geo';

export const metadata: Metadata = {
  title: 'Demo — Mapa interativo dos waypoints',
  description:
    'Mais de 4 milhões de waypoints curados em 209 países. Explore a base do GT Overlander no mapa — postos, campings, hospedagem, atrações.',
};

export default function DemoPage() {
  const geo = getGeoFromHeaders();

  return (
    <div className="bg-gt-bg min-h-screen text-gt-text">
      {/* Hero compacto — não toma espaço demais, deixa o mapa protagonizar */}
      <section className="container-wide pt-12 pb-6 md:pt-16 md:pb-8 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
          Demo interativa
        </p>
        <h1 className="text-4xl md:text-5xl leading-[0.95] mb-4">
          A base de waypoints do GT, em tempo real
        </h1>
        <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans max-w-2xl">
          Mais de 4 milhões de pontos em 209 países. Navegue, filtre por
          categoria, valide a base na sua região. É a maior curadoria
          overlander do mundo, aberta pra você explorar.
        </p>
      </section>

      {/* Container do mapa — ocupa quase a tela toda */}
      <section className="container-wide pb-12 md:pb-16 max-w-7xl">
        <WaypointsMap geo={geo} />
      </section>

      {/* CTA suave pro fim */}
      <section className="bg-gt-card py-12 md:py-16 border-t border-gt-border">
        <div className="container-narrow text-center">
          <h2 className="text-2xl md:text-3xl text-gt-text mb-4">
            Curtiu? Isso é só uma vitrine.
          </h2>
          <p className="text-gt-text-muted mb-6 max-w-md mx-auto font-sans">
            No app, você usa esses waypoints pra planejar viagens com IA,
            exporta a rota pro Google Maps e roda no painel do carro.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/baixar"
              className="inline-flex items-center justify-center bg-gt-orange text-white px-6 py-3 rounded-md font-medium text-sm hover:bg-gt-orange/90 transition-colors font-sans"
            >
              Baixar agora
            </a>
            <a
              href="/recursos/waypoints"
              className="inline-flex items-center justify-center bg-transparent text-gt-text border border-gt-text/30 px-6 py-3 rounded-md font-medium text-sm hover:bg-gt-text/10 transition-colors font-sans"
            >
              Saiba mais sobre a base
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
