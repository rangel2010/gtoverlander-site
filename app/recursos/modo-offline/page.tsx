import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';

export const metadata: Metadata = {
  title: 'Modo Offline',
  description:
    'Em breve no v2. Free baixa o país onde tá com todas as categorias de waypoints. Plus e Pro liberam os 209 países do mundo com atualização automática. Use o GT em qualquer canto, sem depender de sinal.',
};

const oQueFaz = [
  {
    titulo: 'Abrir o app e ver rotas salvas',
    desc: 'Suas rotas geradas, paradas, observações e fotos — tudo carrega sem sinal.',
  },
  {
    titulo: 'Radar de waypoints',
    desc: 'GPS funciona offline. O radar mostra postos, hospedagem, oficinas e atrações ao seu redor a partir da base baixada.',
  },
  {
    titulo: 'Detalhes completos de cada ponto',
    desc: 'Nome, categoria, facilidades, fotos, contato. O que outros overlanders validaram fica disponível offline também.',
  },
  {
    titulo: 'Validar e cadastrar pontos',
    desc: 'Encontrou camping novo no meio do nada? Cadastra ali, valida no momento. Sincroniza com a base assim que conectar.',
  },
  {
    titulo: 'Editar e usar rotas',
    desc: 'Adiciona paradas, reordena, exporta pra navegação local. Sincroniza assinatura quando voltar à conexão.',
  },
];

const precisaInternet = [
  'Gerar rota nova com a IA (IA roda no servidor)',
  'Help Overlander (depende de notificação em tempo real)',
  'GT Desapega (anúncios, contato com vendedor)',
  'Atualização automática da base (Plus/Pro fazem em wifi)',
];

const planos = [
  {
    nome: 'Free',
    badge: 'Incluso pra todos',
    titulo: '1 país com todas as categorias',
    items: [
      'Detecta automaticamente o país do dispositivo',
      'Todas as categorias de waypoints (postos, hospedagem, mecânica, camping, atração, etc)',
      'Mapa offline da região do país escolhido',
      'Atualização manual (você decide quando baixar nova versão)',
      'Validação e cadastro de pontos offline',
    ],
  },
  {
    nome: 'Plus + Pro',
    badge: 'Pra quem cruza fronteira',
    titulo: 'Todos os 209 países + atualização automática',
    items: [
      'Baixe qualquer país ou continente que precisar',
      'Atualização automática quando conectar wifi',
      'Mapa offline expandido com mais detalhe geográfico',
      'Roteamento offline em rotas previamente baixadas',
      'Sem limite de regiões simultâneas armazenadas',
    ],
  },
];

const faq = [
  {
    q: 'Quando lança?',
    a: 'Vem com o v2 do app, em desenvolvimento agora. Sem data exata ainda — focamos em entregar a versão completa em vez de atualizar em partes. Quando lançar, todos os assinantes ativos recebem automaticamente.',
  },
  {
    q: 'Por que o Free tem 1 país e não o mundo todo?',
    a: 'Custo de tráfego. Baixar a base de waypoints de 209 países pesa. Pra manter o Free sustentável e Plus/Pro relevantes, separamos: Free baixa o país onde mora (cobre 95% das viagens domésticas), pagantes liberam o resto do mundo.',
  },
  {
    q: 'Posso validar e cadastrar pontos offline?',
    a: 'Sim, em qualquer plano. É a contribuição mais valiosa que o Free dá pra comunidade — encontrou camping novo na trilha sem sinal, valida no celular ali, sincroniza quando voltar a conectar. A base cresce com isso.',
  },
  {
    q: 'O mapa offline é detalhado?',
    a: 'Free tem mapa básico do país escolhido (suficiente pra navegação geográfica). Plus/Pro têm mapa expandido com mais detalhe topográfico, vias secundárias, pontos de referência. Você sente a diferença em região remota.',
  },
  {
    q: 'Free atualiza a base quando?',
    a: 'Manualmente, no menu de Modo Offline. Você decide quando baixar a versão atualizada — útil pra controlar consumo de dados em wifi.',
  },
  {
    q: 'Plus/Pro atualiza sozinho?',
    a: 'Sim. Quando o app detecta wifi, atualiza a base de todos os países baixados em background. Sem você se preocupar.',
  },
];

export default function ModoOfflinePage() {
  return (
    <>
      <FeatureHero
        kicker="Em breve · vem com o v2"
        title="GT roda em qualquer canto do mundo, sem depender de sinal"
        subline="Free baixa o país onde você está com todas as categorias. Plus e Pro liberam os 209 países com atualização automática. Validação e cadastro de pontos funciona offline em todos os planos."
        primaryCta={{ label: 'Cadastre seu interesse', href: '/contato' }}
        secondaryCta={{ label: 'Ver planos', href: '/planos' }}
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
            Apps de mapa que dependem do Google ficam mudos quando o sinal cai. Modo Offline do GT mantém a base própria de waypoints disponível, com toda a riqueza de categorias e validação comunitária. Continua útil onde outros viram tela em branco.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="modo-offline" />
    </>
  );
}
