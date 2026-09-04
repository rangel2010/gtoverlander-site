import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';
import { getRegua, plano } from '@/lib/planos';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Modo Offline',
    description:
    'O mapa e os pontos do seu país ficam offline pra sempre, em qualquer plano. Plus e Pro somam países extras pra quem cruza fronteira.',
    alternates: getPageAlternates(locale, '/recursos/modo-offline'),
    ...(locale !== "pt" && { robots: { index: false, follow: false } }),
  };
}

const oQueFaz = [
  {
    titulo: 'Radar de waypoints',
    desc: 'GPS funciona offline. O Radar mostra postos, hospedagem, oficinas e atrações ao redor a partir da base baixada. Ao escolher um ponto, você pode abri-lo no Google Maps com a localização já definida. Para navegar sem internet, é necessário ter baixado previamente a região no próprio Google Maps.',
  },
  {
    titulo: 'Informações disponíveis de cada ponto',
    desc: 'Nome, categoria, localização e atributos cadastrados ficam acessíveis sem sinal. O nível de detalhe varia conforme os dados de cada ponto.',
  },
  {
    titulo: 'Validar e cadastrar pontos',
    desc: 'Encontrou camping novo no meio do nada? Cadastra ali, valida no momento. Sincroniza com a base assim que conectar.',
  },
  {
    titulo: 'Consultar rotas salvas',
    desc: 'Visualize suas rotas geradas, paradas e pontos marcados sem precisar de sinal. Edição e exportação de rotas requerem conexão.',
  },
];

const precisaInternet = [
  'Gerar rota nova com a IA (a IA roda no servidor)',
  'Editar, adicionar ou reordenar paradas de uma rota',
  'Exportar rota para o Google Maps',
  'Baixar ou atualizar mapas e dados offline',
  'Sincronizar cadastros e validações pendentes',
  'GT Desapega (anúncios e contato com vendedor)',
  'Recursos em tempo real do GT Social',
];

const faq = (extraPlus: number, extraPro: number) => [
  {
    q: 'Como ativo o Modo Offline?',
    a: 'Direto no app. O pacote do seu país já vem incluso; se você tiver países extras no plano, escolhe quais quer baixar. O GT guarda a base de waypoints e os mapas dessas áreas, e tudo fica acessível mesmo sem sinal. Depois do primeiro download, o app sincroniza as atualizações sozinho quando houver conexão.',
  },
  {
    q: 'O país de origem é grátis mesmo no Free?',
    a: 'É, e pra sempre. O pacote offline do seu país não custa nada em nenhum plano — baixa uma vez e funciona na estrada toda, com todas as categorias de waypoints. O país de origem é escolhido uma vez e não muda depois.',
  },
  {
    q: 'Como funcionam os países extras do Plus e do Pro?',
    a: `São países offline ALÉM do seu, pra quem cruza fronteira. O Plus soma ${extraPlus} e o Pro soma ${extraPro}, trocáveis quando você quiser — terminou a viagem pela Argentina, troca por outro país na próxima. O seu país de origem continua incluso e não ocupa nenhuma dessas vagas.`,
  },
  {
    q: 'Posso validar e cadastrar pontos offline?',
    a: 'Sim, em qualquer plano e sem limite. Encontrou camping novo na trilha sem sinal? Valida no celular ali, sincroniza quando voltar a conectar. A base cresce com isso — e validar ainda te rende viagens.',
  },
  {
    q: 'O mapa offline é detalhado?',
    a: 'O mapa e as categorias de waypoints são iguais em todos os planos. Nunca entregamos uma base pior pra quem é Free. O que muda é só quantos países você leva junto.',
  },
  {
    q: 'Como garantir que a navegação funcione sem sinal?',
    a: 'Você precisa baixar duas coisas antes de entrar em área sem cobertura: o mapa da região no GT (pelo Modo Offline) e o mapa da mesma região no próprio Google Maps. O GT encontra os waypoints offline e abre o ponto com a localização já definida — mas quem faz a navegação é o Maps. Se o Maps não tiver o mapa baixado, ele abre em branco. Os dois downloads juntos garantem a experiência completa.',
  },
  {
    q: 'Como a base se atualiza?',
    a: 'A base de waypoints é atualizada continuamente pelo GT. O app sincroniza o cache do usuário automaticamente em segundo plano, sem que você precise fazer nada. Quando estiver offline, os dados disponíveis são os da última sincronização.',
  },
];

export default async function ModoOfflinePage() {
  // Os números de países vêm da régua — ver lib/planos.ts.
  const regua = await getRegua();
  const extraPlus = plano(regua, 'plus').paisesEstrangeiros;
  const extraPro = plano(regua, 'pro').paisesEstrangeiros;

  const planos = [
    {
      nome: 'Free',
      badge: 'Incluso em todos os planos',
      titulo: 'O seu país inteiro, offline, pra sempre',
      items: [
        'Todas as categorias de waypoints — postos, hospedagem, mecânica, camping, atração',
        'Mapa offline da região do seu país',
        'Sincronização automática das atualizações',
        'Validação e cadastro de pontos offline, sem limite',
        'O país de origem é escolhido uma vez e não muda depois',
      ],
    },
    {
      nome: 'Plus e Pro',
      badge: 'Pra quem cruza fronteira',
      titulo: `Países extras além do seu — ${extraPlus} no Plus, ${extraPro} no Pro`,
      items: [
        'Somam-se ao país de origem, que continua incluso',
        'Trocáveis quando quiser — terminou a viagem, troca pelo próximo destino',
        'Mesmas categorias e mesmo mapa do pacote de origem',
        'Sincronização automática das atualizações',
      ],
    },
  ];

  return (
    <>
      <FeatureHero
        kicker="Disponível agora"
        title="O essencial da viagem continua disponível mesmo sem sinal"
        subline="O mapa e os pontos do seu país ficam offline pra sempre, em qualquer plano — inclusive no Free. Quem cruza fronteira soma países extras no Plus e no Pro."
        primaryCta={{ label: 'Começar grátis', href: '/baixar' }}
        secondaryCta={{ label: 'Explorar planos', href: '/planos' }}
      />

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            O que funciona offline
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans leading-relaxed">
            Com a região baixada, o GT continua sendo útil mesmo sem sinal — e isso é o ponto. Estrada de verdade tem trecho sem 4G, sem 3G, sem nada.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {oQueFaz.map((o) => (
              <div key={o.titulo} className="bg-gt-bg rounded-lg p-6 border border-gt-border">
                <h3 className="font-sans font-medium text-gt-text mb-2 normal-case">{o.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            Como funciona em cada plano
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans leading-relaxed">
            O seu país é grátis em todos os planos, pra sempre. Plus e Pro somam países extras pra quem cruza fronteira. Em qualquer caso, a base offline tem todas as categorias de waypoints — não entregamos uma base pior pra quem é Free.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {planos.map((p) => (
              <div
                key={p.nome}
                className={`rounded-lg p-7 border ${
                  p.nome === 'Free'
                    ? 'bg-gt-card border-gt-border'
                    : 'bg-gt-card border-2 border-gt-orange'
                }`}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-display text-3xl text-gt-text uppercase tracking-display">
                    {p.nome}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-gt-orange-text font-sans font-medium">
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-medium text-gt-text mb-4 normal-case leading-snug">
                  {p.titulo}
                </h3>
                <ul className="space-y-2 font-sans text-sm text-gt-text-muted">
                  {p.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-gt-orange-text flex-shrink-0">✓</span>
                      <span className="leading-relaxed">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            O que ainda precisa de internet
          </h2>
          <p className="text-gt-text-muted mb-8 max-w-2xl font-sans leading-relaxed">
            Algumas funções dependem de servidor por natureza — IA, comunicação em tempo real, marketplace. Quando você voltar a conectar, tudo retoma.
          </p>
          <div className="bg-gt-bg rounded-lg border border-gt-border p-6 max-w-2xl">
            <ul className="space-y-3 font-sans text-sm text-gt-text">
              {precisaInternet.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="text-gt-text-dim flex-shrink-0">○</span>
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Diferencial
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            Mesmo sem sinal, o GT mantém disponíveis as rotas salvas e a base de waypoints baixada para aquela região. Você continua encontrando postos, campings, hospedagens, oficinas e pontos validados pela comunidade — sem precisar de internet pra isso.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq(extraPlus, extraPro)} />

      <OutrasFeatures currentSlug="modo-offline" />
    </>
  );
}
