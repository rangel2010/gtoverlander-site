import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';
import { FeatureScreenshot } from '@/components/sections/feature-screenshot';
import { WaypointsMap } from '@/components/demo/waypoints-map';
import { getGeoFromHeaders } from '@/lib/demo/geo';

export const metadata: Metadata = {
  title: 'Waypoints próprios',
  description:
    'Mais de 4 milhões de waypoints em 209 países e 16 categorias. Base própria curada e mantida viva pela comunidade — overlanders validam e cadastram pontos diretamente do app.',
};

const numeros = [
  { valor: '+4 mi', contexto: 'pontos no mundo' },
  { valor: '209', contexto: 'países' },
  { valor: '16', contexto: 'categorias' },
  { valor: '6', contexto: 'continentes habitados' },
];

const categorias = [
  '⛽ Postos',
  '🔧 Oficina',
  '🛌 Hospedagem (Hotel + Pousada)',
  '🏕️ Camping',
  '🍴 Alimentação (Restaurante + Fast Food + Café + Padaria)',
  '⭐ Atração (atrações turísticas e parques nacionais)',
  '🅿️ Área de Descanso',
  '🛂 Fronteira',
  '🏥 Saúde (Hospital + Farmácia)',
  '🚐 Aceita RV',
];

const faq = [
  {
    q: 'É confiável?',
    a: 'Sim. A base começou com dados públicos do OpenStreetMap e passou por curadoria exaustiva do time GT — deduplificação, classificação em 16 categorias e enriquecimento. Hoje a base é viva: overlanders validam e cadastram pontos pelo app, e o time GT cura continuamente. Erros acontecem, mas em escala muito menor que confiar só no Google Places.',
  },
  {
    q: 'Quem pode validar e cadastrar pontos?',
    a: 'Qualquer overlander, em qualquer plano (Free, Plus ou Pro). Validar e cadastrar é a forma mais valiosa que a comunidade contribui — e por isso é livre pra todos. Cada validação rende XP no GT Explorer e ajuda a manter a base atualizada.',
  },
  {
    q: 'Funciona offline?',
    a: 'Sim. Como a base é nossa (não depende do Google Places), os waypoints ficam disponíveis offline. No plano Free você baixa o país do dispositivo com todas as categorias. No Plus e Pro, libera os 209 países com atualização automática. O Modo Offline vem com o v2.',
  },
  {
    q: 'De onde vêm os dados?',
    a: 'A base começou com dados públicos do OpenStreetMap. O time GT processa, deduplifica, enriquece e classifica em 16 categorias relevantes pro overlander. A partir daí, a comunidade alimenta — overlanders validam o que existe e cadastram o que não tinha sido mapeado ainda.',
  },
  {
    q: 'É só radar ou aparece na hora de planejar a rota também?',
    a: 'Os dois. Quando você gera uma rota com a IA, os waypoints relevantes da nossa base aparecem como sugestão de paradas. E quando você está rodando, o radar mostra os pontos próximos da sua posição.',
  },
  {
    q: 'O que ganho validando ou cadastrando?',
    a: 'XP no GT Explorer (sobe nível, cria reputação no ranking regional), satisfação de ver a base ficando melhor, e um benefício prático: as próximas viagens da comunidade ficam mais ricas — incluindo as suas. Quanto mais gente contribui, mais valor a base entrega pra todo mundo.',
  },
];

export default function WaypointsPage() {
  const geo = getGeoFromHeaders();

  return (
    <>
      <FeatureHero
        kicker="Disponível agora"
        title="Onde parar, onde dormir, onde abastecer"
        subline="Mais de 4 milhões de pontos em 209 países e 16 categorias. Base curada pelo GT e mantida viva pela comunidade — qualquer overlander valida ou cadastra direto do app."
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
              Mapa interativo com os waypoints curados pelo GT. Filtra por categoria, navega pelos pontos, abre os detalhes. Mais de 4 milhões de lugares em 209 países — aqui tem uma prévia pra você.
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

      <FeatureScreenshot
        kicker="A base é viva"
        title="Adicione ou valide um waypoint em 1 toque"
        desc="Encontrou camping novo no meio do nada? Cadastra ali. Posto fechou? Marca como inativo. Achou um lugar útil que ainda não tava no GT? Adiciona com foto e descrição. A base cresce a cada overlander na estrada — em qualquer plano, Free incluso."
        src="/screenshots/recursos/waypoints-acao.png"
        alt="Tela de Adicionar ou validar waypoint, com opções 'Adicionar novo ponto' e 'Validar ponto próximo'"
        bg="card"
      />

      <FeatureScreenshot
        kicker="16 categorias relevantes"
        title="Categorias pensadas pra quem viaja"
        desc='Camping, área de descanso, posto, restaurante, hotel, oficina, atrações, fronteira, saúde — categorias úteis pro overlander, sem ruído de "academia" ou "petshop". Cada ponto tá organizado pra você encontrar exatamente o que precisa, na hora que precisa.'
        src="/screenshots/recursos/waypoints-categoria.png"
        alt="Tela 'Escolha a categoria' com opções: Camping, Área de descanso, Posto de combustível, Restaurante, Hotel, Oficina mecânica"
        reverse
      />

      <FeatureScreenshot
        kicker="Facilidades reais"
        title="Detalhes que outros viajantes confirmaram"
        desc='Tem banheiro? Água potável? Aceita RV? Cada ponto guarda as facilidades validadas por quem esteve lá pessoalmente. Marcação simples — "Sim", "Não" ou "Não sei" — pra evitar informação chutada. O resultado: outros overlanders chegam sabendo o que esperar.'
        src="/screenshots/recursos/waypoints-facilidades.png"
        alt="Tela 'Detalhes e facilidades' de um camping, com perguntas sobre Banheiro e Água potável"
        bg="card"
      />

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Como o radar funciona
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl leading-relaxed font-sans">
            O radar mostra tudo o que está ao redor da sua localização atual. Você filtra por categoria com um toque — postos, hospedagem, hospitais, o que precisar. Achou o ponto? Um clique em &quot;Ir&quot; e a rota vai pro Google Maps, pronta pra navegar.
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
            Origem e evolução dos dados
          </h2>
          <p className="text-gt-text leading-relaxed mb-5 font-sans">
            A base começou com dados públicos do OpenStreetMap e foi exaustivamente curada pelo time GT — processada, deduplificada, classificada e enriquecida em 16 categorias relevantes pro overlander.
          </p>
          <p className="text-gt-text leading-relaxed mb-5 font-sans">
            Hoje a base é viva. O time GT cura continuamente, e a comunidade contribui validando pontos existentes e cadastrando os que ainda não tinham sido mapeados — tudo direto do app, em qualquer plano. Quanto mais gente na estrada validando, mais rica e atual a base fica.
          </p>
          <p className="text-gt-text leading-relaxed font-sans">
            Por ser base própria, os waypoints ficam disponíveis offline. Plus e Pro liberam os 209 países com atualização automática; Free baixa o país do dispositivo com todas as categorias.
          </p>
        </div>
      </section>

      <section className="bg-gt-card py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Diferencial
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            O Google Maps conhece tudo — e por isso traz tudo, inclusive o que não importa pra você. O GT entrega só o que o overlander precisa: postos, campings, hospedagem, oficinas, atrativos. Curadoria editorial GT + base viva validada continuamente pela comunidade que vive a estrada.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="waypoints" />
    </>
  );
}
