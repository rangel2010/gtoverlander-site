import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';
import { WaypointsMap } from '@/components/demo/waypoints-map';
import { getGeoFromHeaders } from '@/lib/demo/geo';

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
  '⭐ Atração',
  '🏥 Hospitais',
  '💊 Farmácias',
  '🅿️ Área de Descanso',
  '🌲 Parque Nacional',
  '🛂 Fronteira',
  '🚐 Aceita RV',
];

const faq = [
  {
    q: 'É confiável?',
    a: 'Sim. A base começou com dados públicos do OpenStreetMap e passou por curadoria exaustiva do time GT — deduplificação, classificação em 16 categorias e enriquecimento. Erros acontecem, mas em escala muito menor que confiar só no Google Places. Em breve, a comunidade vai poder validar e atualizar continuamente.',
  },
  {
    q: 'Posso adicionar pontos novos?',
    a: 'Em construção. Estamos preparando o fluxo de validação por comunidade — overlanders contribuindo com pontos novos e validando os existentes diretamente pelo app. Sem data ainda, mas é parte do roadmap próximo.',
  },
  {
    q: 'Funciona offline?',
    a: 'Como os waypoints são nossos (não dependem do Google Places), eles podem ficar disponíveis offline em qualquer lugar do mundo. Quando o Modo Offline lançar, sua base de pontos vai junto com você — sem sinal, sem dependência de servidor de terceiros.',
  },
  {
    q: 'De onde vêm os dados?',
    a: 'A base começou com dados públicos do OpenStreetMap. O time GT processa, deduplifica, enriquece e classifica em 16 categorias relevantes pro overlander. Daí em diante a base é viva — em breve com validação contínua pela comunidade.',
  },
  {
    q: 'É só radar ou aparece na hora de planejar a rota também?',
    a: 'Os dois. Quando você gera uma rota com a IA, os waypoints relevantes da nossa base aparecem como sugestão de paradas. E quando você está rodando, o radar mostra os pontos próximos da sua posição.',
  },
];

export default function WaypointsPage() {
  const geo = getGeoFromHeaders();

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
        <div className="container-wide">
          <div className="max-w-2xl mb-8">
            <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
              Radar de Waypoints
            </p>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-5 leading-tight">
              Explore a base na sua região agora
            </h2>
            <p className="text-gt-text-muted leading-relaxed font-sans mb-6">
              Mapa interativo com os waypoints curados pelo GT. Filtra por
              categoria, navega pelos pontos, abre os detalhes. Mais de 4
              milhões de lugares em 209 países, e você vê tudo direto aqui.
            </p>
            <a
              href="/demo"
              className="inline-flex items-center text-sm text-gt-orange hover:underline font-sans"
            >
              Abrir em tela cheia →
            </a>
          </div>
          <WaypointsMap geo={geo} />
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
            O radar mostra tudo o que está ao redor da sua localização atual.
            Você filtra por categoria com um toque — postos, hospedagem,
            hospitais, o que precisar. Achou o ponto? Um clique em &quot;Ir&quot; e
            a rota vai pro Google Maps, pronta pra navegar.
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
            A base começou com dados públicos do OpenStreetMap e foi
            exaustivamente curada pelo time GT — processada, deduplificada,
            classificada e enriquecida em 16 categorias relevantes pro
            overlander.
          </p>
          <p className="text-gt-text leading-relaxed mb-5 font-sans">
            A base é viva. O time GT cura continuamente, e em breve a
            comunidade vai poder validar pontos existentes e incluir novos
            diretamente pelo app — quanto mais gente na estrada, mais rica a
            base fica.
          </p>
          <p className="text-gt-text leading-relaxed font-sans">
            Por ser uma base própria, os waypoints podem ficar disponíveis
            offline em qualquer lugar do mundo. Coisa que app que depende do
            Google Places não consegue.
          </p>
        </div>
      </section>

      <section className="bg-gt-card py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Diferencial
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            O Google Maps conhece tudo — e por isso traz tudo, inclusive o que
            não importa pra você. O GT entrega só o que o overlander precisa:
            postos, campings, hospedagem, oficinas, atrativos. Curadoria, não
            enxurrada.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="waypoints" />
    </>
  );
}
