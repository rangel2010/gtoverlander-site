import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';
import { CtaFinal } from '@/components/sections/cta-final';

export const metadata: Metadata = {
  title: 'Roteiros com IA',
  description:
    'Descreva a viagem em linguagem natural. A IA monta o trajeto — estradas, cidades e destino — e você completa com paradas. Free pra começar, Pro pra desafios maiores.',
};

const motores = [
  {
    nome: 'IA padrão',
    pra: 'Plano Free',
    desc: 'Trajetos diretos pra rotas convencionais. Suficiente pra primeira viagem ou roteiro mais simples.',
  },
  {
    nome: 'IA avançada',
    pra: 'Planos Plus e Pro',
    desc: 'Pra quando o trajeto exige mais. Conhecimento geográfico apurado, adaptação ao seu estilo de viagem, e capacidade de planejar rotas complexas com vias secundárias e regiões menos conhecidas.',
  },
];

const passos = [
  {
    num: 1,
    titulo: 'Você descreve a viagem',
    desc: 'Conta o destino, as regiões que quer cruzar, suas preferências de estrada — em linguagem natural',
  },
  {
    num: 2,
    titulo: 'A IA monta o trajeto',
    desc: 'Estradas, cidades e destino — pronto em segundos, do jeito que você pediu',
  },
  {
    num: 3,
    titulo: 'Você escolhe onde parar',
    desc: 'Postos, hospedagem, campings, atrações — escolhe da maior base de waypoints overlander do mundo',
  },
  {
    num: 4,
    titulo: 'Você roda',
    desc: 'Exporta a rota pro Google Maps e roda direto no painel do carro com CarPlay ou Android Auto',
  },
];

const faq = [
  {
    q: 'A IA erra alguma vez?',
    a: 'Acontece — IA generativa pode sugerir uma parada que não existe mais ou não está aberta. Por isso o passo 3 é parte do fluxo: você revisa e ajusta antes de partir. A base própria de waypoints do GT minimiza esse risco porque os pontos são curados.',
  },
  {
    q: 'Posso editar paradas depois que a rota tá pronta?',
    a: 'Sim. Adiciona, remove e reordena paradas o quanto quiser. Cada modificação atualiza a rota no mapa.',
  },
  {
    q: 'Funciona offline?',
    a: 'Gerar uma nova rota com a IA precisa de internet (a IA roda no servidor). Mas quando o Modo Offline lançar, você verá a rota gerada, paradas e waypoints sem sinal — só a geração nova precisa estar online.',
  },
  {
    q: 'Em quantos idiomas?',
    a: 'Português, inglês e espanhol. Você descreve a viagem no idioma que preferir e a IA responde no mesmo.',
  },
  {
    q: 'Qual a diferença entre Free e Plus/Pro?',
    a: 'Free usa a IA padrão, suficiente pra rotas convencionais e primeiras viagens. Plus e Pro usam a IA avançada — mais precisão em rotas complexas, conhecimento geográfico apurado e adaptação ao seu estilo de viagem.',
  },
];

export default function RoteirosIaPage() {
  return (
    <>
      <FeatureHero
        kicker="Disponível agora"
        title="Roteiros personalizados em uma conversa"
        subline="Descreva a viagem em linguagem natural. Primeiro a IA monta o trajeto — estradas, cidades e destino. Depois você completa: paradas, postos, hospedagem e campings."
        primaryCta={{ label: 'Baixar grátis', href: '/baixar' }}
        secondaryCta={{ label: 'Ver planos', href: '/planos' }}
      />

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
              Veja em ação
            </p>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-5 leading-tight">
              Da descrição ao mapa, em segundos
            </h2>
            <p className="text-gt-text-muted leading-relaxed font-sans">
              A IA traça o trajeto e exibe no mapa. Você filtra na nossa base de
              mais de 4 milhões de waypoints — postos, hospedagem, campings,
              atrações — pra escolher onde quer parar. Quando estiver pronto,
              exporta pro Google Maps com um toque.
            </p>
          </div>
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/screenshots/app-chat-mapa.jpg"
              alt="Tela do app mostrando a rota São Paulo a Curitiba com mapa, paradas em postos de combustível e botões de filtro por categoria"
              className="max-h-[640px] w-auto rounded-3xl border border-gt-border shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            2 motores de IA, calibrados pra cada nível de viagem
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-xl font-sans">
            IA padrão pra começar. IA avançada pra rotas mais complexas — mais
            precisão geográfica, mais adaptação ao seu estilo de viagem.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {motores.map((m) => (
              <div
                key={m.nome}
                className="bg-gt-card rounded-lg p-6 border border-gt-border"
              >
                <h3 className="font-sans font-medium text-gt-text text-lg mb-2 normal-case">
                  {m.nome}
                </h3>
                <p className="text-xs uppercase tracking-wider text-gt-orange/80 mb-3 font-sans">
                  {m.pra}
                </p>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Como funciona
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            Da ideia ao roteiro pronto, em 4 passos. Você no controle, sempre.
          </p>

          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {passos.map((p) => (
              <div
                key={p.num}
                className="border-l-2 border-gt-orange pl-5"
              >
                <div className="text-gt-orange font-medium text-sm mb-2 font-sans">
                  {p.num.toString().padStart(2, '0')}
                </div>
                <h3 className="font-sans font-medium text-gt-text mb-2 leading-snug normal-case">
                  {p.titulo}
                </h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Diferencial
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            Outros apps te empurram pro caminho mais rápido. O GT entende que
            pra um overlander, o que importa é o caminho — não só o destino. A
            IA pensa no seu trajeto — estradas, regiões e contexto — não em
            chegar logo.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <CtaFinal />

      <OutrasFeatures currentSlug="roteiros-ia" />
    </>
  );
}
