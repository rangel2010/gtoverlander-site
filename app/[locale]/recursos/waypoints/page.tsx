import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';
import { FeatureScreenshot } from '@/components/sections/feature-screenshot';
import { WaypointsMap } from '@/components/demo/waypoints-map';
import { getGeoFromHeaders } from '@/lib/demo/geo';
import { getCatalogoWaypoints } from '@/lib/demo/catalogo';
import { getStats } from '@/lib/stats';
import type { CatalogoWaypoints } from '@/lib/demo/categories';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const stats = await getStats();
  return {
    title: 'Base de Waypoints',
    description: `Mais de 4 milhões de waypoints em ${fmt(stats.paises)} países, organizados por tipo de parada. Base curada pelo GT e mantida viva pela comunidade — valida e cadastra direto do app.`,
    alternates: getPageAlternates(locale, '/recursos/waypoints', { soPt: true }),
    ...(locale !== "pt" && { robots: { index: false, follow: false } }),
  };
}

// Números e categorias desta página (09/10/2026): nada escrito à mão.
// Países e pontos vêm de lib/stats.ts; categorias e filtros, do catálogo do
// app (lib/demo/catalogo.ts) — o mesmo que desenha os filtros do mapa abaixo.
const fmt = (n: number) => new Intl.NumberFormat('pt-BR').format(n);

/** 4.357.857 → "+4,3 mi" (arredonda pra baixo, nunca promete a mais). */
const milhoes = (n: number) =>
  `+${new Intl.NumberFormat('pt-BR').format(Math.floor(n / 100_000) / 10)} mi`;

/** Um chip por filtro do mapa; as categorias agrupadas nele entram entre parênteses. */
function filtrosDoCatalogo(catalogo: CatalogoWaypoints | null): string[] {
  if (!catalogo) return [];
  const todas = catalogo.categorias;
  return todas
    .filter((c) => !c.agrupaEm)
    .map((c) => {
      const dentro = todas.filter((x) => x.agrupaEm === c.code).map((x) => x.label);
      return `${c.emoji} ${c.label}${dentro.length ? ` (+ ${dentro.join(', ')})` : ''}`;
    });
}

const faq = [
  {
    q: 'É confiável?',
    a: 'Sim. A base começou com dados públicos do OpenStreetMap e passou por curadoria exaustiva do time GT — deduplificação, organização por tipo de parada e enriquecimento. Hoje a base é viva: overlanders validam e cadastram pontos pelo app, e o time GT cura continuamente. Erros acontecem, mas em escala muito menor que confiar só no Google Places.',
  },
  {
    q: 'Quem pode validar e cadastrar pontos?',
    a: 'Qualquer overlander, em qualquer plano, sem limite de quantidade. Validar e cadastrar é livre pra todos — e rende viagem: 5 pontos seus aprovados pela comunidade valem 1 viagem, e 5 validações feitas no local valem outra. Cada validação também rende XP no GT Explorer.',
  },
  {
    q: 'Funciona offline?',
    a: 'Sim. Como a base é nossa (não depende do Google Places), os waypoints ficam disponíveis offline. O pacote do seu país é grátis em todos os planos, pra sempre, com todas as categorias. Plus e Pro somam países extras pra quem cruza fronteira.',
  },
  {
    q: 'De onde vêm os dados?',
    a: 'A base começou com dados públicos do OpenStreetMap. O time GT processa, deduplifica, enriquece e organiza por tipo de parada, com filtros pensados pro overlander. A partir daí, a comunidade alimenta — overlanders validam o que existe e cadastram o que não tinha sido mapeado ainda.',
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

export default async function WaypointsPage() {
  const geo = getGeoFromHeaders();
  // Catálogo de categorias buscado no servidor e passado como prop (09/10/2026).
  const [catalogo, stats] = await Promise.all([getCatalogoWaypoints(), getStats()]);
  const paises = fmt(stats.paises);
  const filtros = filtrosDoCatalogo(catalogo);
  const qtdCategorias = catalogo?.categorias.length ?? 0;
  const numeros = [
    { valor: milhoes(stats.waypoints), contexto: 'pontos no mundo' },
    { valor: paises, contexto: 'países' },
    ...(qtdCategorias ? [{ valor: fmt(qtdCategorias), contexto: 'categorias' }] : []),
    ...(filtros.length ? [{ valor: fmt(filtros.length), contexto: 'filtros no radar' }] : []),
  ];

  return (
    <>
      <FeatureHero
        kicker="Disponível agora"
        title="Onde parar, onde dormir, onde abastecer"
        subline={`Mais de 4 milhões de pontos em ${paises} países, organizados por tipo de parada. Base curada pelo GT e mantida viva pela comunidade — qualquer overlander valida ou cadastra direto do app.`}
        primaryCta={{ label: 'Começar grátis', href: '/baixar' }}
        secondaryCta={{ label: 'Explorar planos', href: '/planos' }}
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
              Mapa interativo com os waypoints curados pelo GT. Filtra por categoria, navega pelos pontos, abre os detalhes. Mais de 4 milhões de lugares em {paises} países — aqui tem uma prévia pra você.
            </p>
            <a
              href="/demo"
              className="inline-flex items-center text-sm text-gt-orange-text hover:underline font-sans"
            >
              Abrir em tela cheia →
            </a>
          </div>
          <WaypointsMap geo={geo} catalogo={catalogo} />
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
        title="Quem passou por lá é a única fonte disso"
        desc="Continua de pé, mudou alguma coisa ou fechou — um voto por pessoa, direto na tela. Dá pra completar com detalhes que só quem esteve lá sabe, tipo se o lugar tem ponto de recarga. Validar e cadastrar é livre em qualquer plano, sem limite, e ainda rende viagem."
        src="/screenshots/recursos/waypoints-acao.jpg"
        alt="Tela de validação de waypoint perguntando como está o Recanto Pinhão, com as opções Continua de pé, Mudou alguma coisa e Fechou, pergunta sobre ponto de recarga e campo livre para observações"
        bg="card"
      />

      <FeatureScreenshot
        kicker={qtdCategorias ? `${qtdCategorias} categorias de parada` : 'Categorias de parada'}
        title="Categorias pensadas pra quem viaja"
        desc='Camping, área de descanso, posto, restaurante, hotel, mecânica, atrações, fronteira, hospital, farmácia, mercado, caixa eletrônico — categorias úteis pro overlander, sem ruído de "academia" ou "petshop". Cada ponto tá organizado pra você encontrar exatamente o que precisa, na hora que precisa.'
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

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
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
            {filtros.map((c) => (
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
            A base GT foi estruturada a partir de dados abertos do OpenStreetMap e passou por processamento, deduplicação e organização por tipo de parada, com filtros pensados para facilitar o planejamento e o dia a dia na estrada.
          </p>
          <p className="text-gt-text leading-relaxed mb-5 font-sans">
            Hoje a Base GT é viva. O time GT cura continuamente, e a comunidade contribui validando pontos existentes e cadastrando os que ainda não tinham sido mapeados — tudo direto do app, em qualquer plano. Quanto mais gente na estrada validando, mais rica e atual a base fica.
          </p>
          <p className="text-gt-text leading-relaxed font-sans">
            Por ser a Base GT, os waypoints ficam disponíveis offline. O pacote do seu país é grátis em todos os planos, com todas as categorias; Plus e Pro somam países extras pra quem cruza fronteira.
          </p>
          <p className="text-xs text-gt-text-dim leading-relaxed font-sans mt-4">
            Dados de origem: © colaboradores do OpenStreetMap — ODbL. Curadoria, organização e enriquecimento: GT Overlander.
          </p>
        </div>
      </section>

      <section className="bg-gt-card py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Diferencial
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            O Google Maps conhece tudo — e por isso traz tudo, inclusive o que não importa pra você. O GT entrega só o que o overlander precisa: postos, campings, hospedagem, oficinas, atrativos. Curadoria editorial GT + Base GT de waypoints, validada continuamente pela comunidade que vive a estrada.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="waypoints" />
    </>
  );
}
