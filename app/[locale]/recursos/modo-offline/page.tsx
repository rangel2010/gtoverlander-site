import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Modo Offline',
    description:
    'Free baixa o país onde está com todas as categorias de waypoints. Plus e Pro liberam os 209 países. Use o GT em qualquer canto, sem depender de sinal.',
    alternates: getPageAlternates(locale, '/recursos/modo-offline'),
  };
}

const oQueFaz = [
  {
    titulo: 'Abrir o app e ver rotas salvas',
    desc: 'Suas rotas geradas, paradas, observações e fotos — tudo carrega sem sinal.',
  },
  {
    titulo: 'Radar de waypoints',
    desc: 'GPS funciona offline. O Radar mostra postos, hospedagem, oficinas e atrações ao redor a partir da base baixada. Ao escolher um ponto, você pode abri-lo no Google Maps para navegar até ele.',
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
  'Gerar rota nova com a IA (IA roda no servidor)',
  'Editar, adicionar ou reordenar paradas de uma rota',
  'Exportar rota para o Google Maps',
  'Baixar ou atualizar regiões pela primeira vez',
  'Sincronizar cadastros e validações pendentes',
  'Help Overlander (notificação em tempo real)',
  'GT Desapega (anúncios e contato com vendedor)',
  'Recursos em tempo real do GT Social',
];

const planos = [
  {
    nome: 'Free',
    badge: 'Incluso pra todos',
    titulo: '1 país com todas as categorias',
    items: [
      'País identificado pelo app no momento do download na loja — sem troca no Free',
      'Todas as categorias de waypoints (postos, hospedagem, mecânica, camping, atração, etc)',
      'Mapa offline da região do país escolhido',
      'Atualização automática quando conectar wifi',
      'Validação e cadastro de pontos offline',
    ],
  },
  {
    nome: 'Plus + Pro',
    badge: 'Pra quem cruza fronteira',
    titulo: 'Todos os 209 países do mundo',
    items: [
      'Baixe qualquer país ou continente que precisar',
      'Atualização automática quando conectar wifi',
      'Sem limite de regiões definido pelo GT — sujeito ao espaço disponível no aparelho',
    ],
  },
];

const faq = [
  {
    q: 'Como ativo o Modo Offline?',
    a: 'Direto no app. Você escolhe as regiões ou países que vai usar, o GT baixa a base de waypoints e mapas dessas áreas, e tudo fica acessível mesmo sem sinal. Atualiza sozinho quando você reconecta no wifi.',
  },
  {
    q: 'Por que o Free tem 1 país e não o mundo todo?',
    a: 'Custo de tráfego. Baixar a base de waypoints de 209 países pesa. Pra manter o Free sustentável e Plus/Pro relevantes, separamos: Free baixa o país onde mora (cobre 95% das viagens domésticas), pagantes liberam o resto do mundo.',
  },
  {
    q: 'Posso validar e cadastrar pontos offline?',
    a: 'Sim, em qualquer plano. Encontrou camping novo na trilha sem sinal? Valida no celular ali, sincroniza quando voltar a conectar. A base cresce com isso.',
  },
  {
    q: 'O mapa offline é detalhado?',
    a: 'O mapa de visualização de waypoints é o mesmo em todos os planos. A diferença está em quantas regiões você pode baixar — Free cobre o país do dispositivo, Plus/Pro liberam qualquer país ou continente do mundo.',
  },
  {
    q: 'Como a base se atualiza?',
    a: 'A base de waypoints é atualizada continuamente pelo GT. O app sincroniza o cache do usuário automaticamente em segundo plano, sem que você precise fazer nada. Quando estiver offline, os dados disponíveis são os da última sincronização.',
  },
];

export default function ModoOfflinePage() {
  return (
    <>
      <FeatureHero
        kicker="Disponível agora"
        title="O essencial da viagem continua disponível mesmo sem sinal"
        subline="Baixe previamente a base de waypoints da região. Depois, consulte rotas salvas e encontre pontos ao redor com o Radar — mesmo sem conexão. Free cobre um país; Plus e Pro liberam qualquer país ou continente."
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
            Free cobre quem viaja no próprio país. Plus e Pro liberam o mundo. Em qualquer caso, a base offline tem todas as categorias de waypoints — não restringimos o que você pode acessar.
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
                  <span className="text-xs uppercase tracking-wider text-gt-orange font-sans font-medium">
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-medium text-gt-text mb-4 normal-case leading-snug">
                  {p.titulo}
                </h3>
                <ul className="space-y-2 font-sans text-sm text-gt-text-muted">
                  {p.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-gt-orange flex-shrink-0">✓</span>
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

      <section className="bg-gt-bg py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Diferencial
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            Mesmo sem sinal, o GT mantém disponíveis as rotas salvas e a base de waypoints baixada para aquela região. Você continua encontrando postos, campings, hospedagens, oficinas e pontos validados pela comunidade — sem precisar de internet pra isso.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="modo-offline" />
    </>
  );
}
