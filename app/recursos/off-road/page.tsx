import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';

export const metadata: Metadata = {
  title: 'Modo Off Road',
  description:
    'Em breve. Você desenha a rota off-road ponto a ponto no mapa. Trilhas, ripio, estradas de terra — sem IA, pronta pra rodar offline em qualquer lugar do mundo.',
};

const beneficios = [
  {
    titulo: 'Você desenha sua rota',
    desc: 'No mapa, você seleciona os waypoints da nossa base na ordem que quiser. A trilha se forma ligando ponto por ponto — você decide cada curva, sem IA otimizando o caminho.',
  },
  {
    titulo: 'Trilhas e caminhos secundários',
    desc: 'Estradas de terra, caminhos rurais, trilhas conhecidas só por quem já passou. Apps convencionais focam em rotas otimizadas — Off Road existe pra você desenhar o caminho que não tá no asfalto.',
  },
  {
    titulo: 'Asfalto continua igual',
    desc: 'A IA continua cuidando das rotas convencionais, com Google Maps, CarPlay e Android Auto. Off Road é uma camada nova — não substitui o que já funciona.',
  },
  {
    titulo: 'Você no controle',
    desc: 'Sem voz fazendo barulho, sem recálculo automático tirando você do rumo. Quem viaja por terra quer pilotar, não ser pilotado.',
  },
];

const tiers = [
  { nome: 'Free', uso: '1 exportação a cada 90 dias' },
  { nome: 'Plus', uso: '2 exportações por mês' },
  { nome: 'Pro', uso: 'Exportações ilimitadas' },
];

const faq = [
  {
    q: 'Quando lança?',
    a: 'Está em desenvolvimento. Não temos data fechada — entra na lista de espera abaixo pra ser avisado quando estiver disponível.',
  },
  {
    q: 'É grátis ou pago?',
    a: 'Universal: todos os planos (Free, Plus, Pro) podem CRIAR rotas off-road sem limite. A diferença está em quantas vezes você pode EXPORTAR pra navegar. Free 1 a cada 90 dias, Plus 2 por mês, Pro ilimitado.',
  },
  {
    q: 'Funciona sem sinal?',
    a: 'Sim. Quando o Modo Offline também estiver disponível, você baixa a região e a rota off-road funciona em qualquer lugar — independente de cobertura de celular.',
  },
  {
    q: 'Posso compartilhar minhas rotas?',
    a: 'No MVP inicial, não. Mas tá na visão de longo prazo: uma biblioteca social de trilhas brasileiras onde overlanders compartilham rotas que viraram realidade.',
  },
  {
    q: 'Como faço pra navegar?',
    a: 'O GT abre o Google Maps até o ponto de início da trilha (com CarPlay e Android Auto). Quando você chega na trilha, o GT entra em modo trilha e mostra a rota desenhada — sem voz, sem recálculo automático.',
  },
];

export default function OffRoadPage() {
  return (
    <>
      <FeatureHero
        status="em-breve"
        title="Saia do asfalto sem perder o caminho"
        subline="Em breve. Você desenha a rota ponto a ponto no mapa — trilhas, ripio, estradas de terra. Sem IA, funciona offline."
        primaryCta={{ label: 'Avise quando lançar', href: '/contato' }}
        secondaryCta={{ label: 'Baixar o app agora', href: '/baixar' }}
      />

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-12">
            Como vai funcionar
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {beneficios.map((b) => (
              <div
                key={b.titulo}
                className="bg-gt-card rounded-lg p-6 border border-gt-border"
              >
                <h3 className="font-sans font-medium text-gt-text mb-2 normal-case">
                  {b.titulo}
                </h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Modelo universal de uso
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-xl font-sans">
            Criar é ilimitado pra todos os planos. A diferença está em quantas
            vezes você exporta pra navegar.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div
                key={t.nome}
                className="bg-gt-card rounded-lg p-6 border border-gt-border text-center"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-gt-orange/80 mb-3 font-sans">
                  {t.nome}
                </p>
                <p className="text-base font-medium text-gt-text font-sans">{t.uso}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Visão de longo prazo
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            Uma biblioteca social de trilhas overlander — outros viajantes
            compartilhando rotas que viraram realidade, em qualquer canto do
            mundo. O Off Road do GT é o primeiro passo.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="off-road" />
    </>
  );
}
