import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';

export const metadata: Metadata = {
  title: 'Waypoints próprios',
  description:
    'Mais de 4 milhões de waypoints em 209 países e 16 categorias. A maior base do universo overlander já reunida em uma plataforma.',
};

const numeros = [
  { valor: '+4 mi', contexto: 'pontos no mundo' },
  { valor: '209', contexto: 'países' },
  { valor: '16', contexto: 'categorias' },
  { valor: '6', contexto: 'continentes habitados' },
];

const categorias = [
  '⛽ Postos',
  '🛌 Hospedagem',
  '🏕️ Camping',
  '🍽️ Restaurante',
  '🍔 Fast Food',
  '☕ Café',
  '🥐 Padaria',
  '📍 Atração',
  '🧺 Área de Descanso',
  '🌲 Parque Nacional',
  '🛂 Fronteira',
  '🚐 Aceita RV',
];

const faq = [
  {
    q: 'É confiável?',
    a: 'Sim. Os dados vêm de fontes consolidadas (OpenStreetMap, iOverlander e MaCamp) e passam por um processo de deduplificação e enriquecimento pelo time GT antes de entrar na base. Erros acontecem, mas em escala muito menor que confiar só no Google Places — que não foi feito pro overlander.',
  },
  {
    q: 'Posso adicionar pontos novos?',
    a: 'Em construção. Estamos preparando o fluxo de validação por comunidade — overlanders contribuindo com pontos novos e validando os existentes. Sem data ainda, mas é parte do roadmap próximo.',
  },
  {
    q: 'Funciona offline?',
    a: 'Quando o Modo Offline estiver disponível, todos os waypoints da sua região (e do mundo, se você quiser) ficam acessíveis sem sinal. Hoje a consulta exige internet.',
  },
  {
    q: 'De onde vêm os dados?',
    a: 'OpenStreetMap, iOverlander e MaCamp são as fontes principais. O time GT processa, deduplifica, enriquece e classifica em 16 categorias relevantes pro universo overlander.',
  },
  {
    q: 'É só radar ou aparece na hora de planejar a rota também?',
    a: 'Os dois. Quando você gera uma rota com a IA, os waypoints relevantes da nossa base aparecem como sugestão de paradas. E quando você está rodando, o radar mostra os pontos próximos da sua posição.',
  },
];

export default function WaypointsPage() {
  return (
    <>
      <FeatureHero
        kicker="Disponível agora"
        title="Onde parar, onde dormir, onde abastecer"
        subline="Mais de 4 milhões de pontos em 209 países e 16 categorias. A maior base do universo overlander já reunida em uma plataforma."
        primaryCta={{ label: 'Baixar grátis', href: '/baixar' }}
        secondaryCta={{ label: 'Ver planos', href: '/planos' }}
      />

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="flex justify-center md:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/screenshots/app-radar.jpg"
              alt="Tela do Radar de Waypoints mostrando filtros por categoria (restaurantes, hotéis, postos) e mapa com pontos coloridos por tipo"
              className="max-h-[640px] w-auto rounded-3xl border border-gt-border shadow-2xl"
            />
          </div>
          <div className="md:order-1">
            <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
              Radar de Waypoints
            </p>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-5 leading-tight">
              Tudo que você precisa, perto de você
            </h2>
            <p className="text-gt-text-muted leading-relaxed font-sans">
              Abre o radar e vê o que tem ao redor — postos, restaurantes,
              hotéis, atrativos. Filtros por categoria, mapa interativo, ícones
              coloridos por tipo. Ideal pra encontrar recursos durante a viagem
              ou ajustar a rota no momento.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {numeros.map((n) => (
              <div
                key={n.contexto}
                className="text-center bg-gt-card rounded-lg p-6 border border-gt-border"
              >
                <div className="font-display text-4xl md:text-5xl text-gt-text mb-2 uppercase tracking-display">
                  {n.valor}
                </div>
                <p className="text-sm text-gt-text-muted font-sans">{n.contexto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Como o radar funciona
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl leading-relaxed font-sans">
            Ao longo da sua rota, uma busca geoespacial filtra os pontos por
            categoria e ordena por relevância. Corredor adaptativo: raios
            diferentes pra postos versus campings, porque overlander busca
            cada coisa numa distância diferente.
          </p>

          <h3 className="font-sans text-lg font-medium text-gt-text mb-5 normal-case">
            Categorias visíveis
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categorias.map((c) => (
              <div
                key={c}
                className="bg-gt-card rounded-md px-4 py-3 text-sm text-gt-text border border-gt-border font-sans"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-6">
            Origem dos dados
          </h2>
          <p className="text-gt-text leading-relaxed mb-5 font-sans">
            A base do GT vem de fontes consolidadas — OpenStreetMap,
            iOverlander e MaCamp — processadas, deduplificadas e enriquecidas
            pelo time GT em 16 categorias relevantes pro overlander.
          </p>
          <p className="text-gt-text leading-relaxed font-sans">
            Transparência aumenta credibilidade: a base não foi inventada do
            nada. É curadoria em cima de dados públicos e dados de comunidades
            de viajantes que já funcionam.
          </p>
        </div>
      </section>

      <section className="bg-gt-card py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Diferencial
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            O Google Maps não conhece o postinho rural. O GT conhece. A gente
            controla o que aparece como ponto de apoio — qualidade, ordem,
            relevância pra quem viaja por terra.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="waypoints" />
    </>
  );
}
