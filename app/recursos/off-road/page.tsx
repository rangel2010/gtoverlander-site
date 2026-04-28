import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';

export const metadata: Metadata = {
  title: 'Modo Off Road',
  description:
    'Em breve. Crie rotas off-road com a sua cara, ligando os waypoints da nossa base num mapa interativo dedicado a trilhas. Pra quem sai do asfalto.',
};

const beneficios = [
  {
    titulo: 'Você desenha sua rota',
    desc: 'Liga os waypoints da nossa base num mapa interativo dedicado a trilhas. No jeito que faz sentido pra sua viagem.',
  },
  {
    titulo: 'Trilhas que o Google não conhece',
    desc: 'Estradas de terra, caminhos rurais, pontos longe do asfalto. Onde os mapas convencionais não chegam.',
  },
  {
    titulo: 'Asfalto continua igual',
    desc: 'A IA e o Google Maps seguem cuidando das rotas convencionais. Off Road é uma camada nova, não substituição.',
  },
  {
    titulo: 'Você no controle',
    desc: 'Sem voz fazendo barulho, sem recálculo automático tirando seu rumo. Overlander quer pilotar, não ser pilotado.',
  },
];

const tiers = [
  { nome: 'Free', uso: '1 execução a cada 90 dias' },
  { nome: 'Plus', uso: '2 execuções por mês' },
  { nome: 'Pro', uso: 'Execuções ilimitadas' },
];

const faq = [
  {
    q: 'Quando lança?',
    a: 'Está em desenvolvimento. Não temos data fechada — entra na lista de espera abaixo pra ser avisado quando estiver disponível.',
  },
  {
    q: 'É grátis ou pago?',
    a: 'Universal: todos os planos (Free, Plus, Pro) podem CRIAR rotas off-road sem limite. A diferença está em quantas vezes por mês você roda essas rotas. Free 1 a cada 90 dias, Plus 2 por mês, Pro ilimitado.',
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
        subline="Em breve. Crie rotas off-road com a sua cara, ligando os waypoints da nossa base num mapa interativo dedicado a trilhas."
        primaryCta={{ label: 'Avise quando lançar', href: '/contato' }}
        secondaryCta={{ label: 'Baixar o app agora', href: '/baixar' }}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-12">
            Como vai funcionar
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {beneficios.map((b) => (
              <div
                key={b.titulo}
                className="bg-gt-cream rounded-lg p-6 border border-gt-green/10"
              >
                <h3 className="font-medium text-gt-green mb-2">
                  {b.titulo}
                </h3>
                <p className="text-sm text-gt-gray-mid leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-cream py-16 md:py-20">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-3">
            Modelo universal de uso
          </h2>
          <p className="text-gt-gray-mid mb-10 max-w-xl">
            Criar é ilimitado pra todos os planos. A diferença está em quantas
            vezes por mês você roda.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div
                key={t.nome}
                className="bg-white rounded-lg p-6 border border-gt-green/10 text-center"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-gt-orange/80 mb-3">
                  {t.nome}
                </p>
                <p className="text-base font-medium text-gt-green">{t.uso}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-green text-white py-12 md:py-14">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-white/60 mb-3">
            Visão de longo prazo
          </p>
          <p className="text-xl md:text-2xl font-medium leading-snug">
            Uma biblioteca social de trilhas brasileiras — outros overlanders
            compartilhando rotas que viraram realidade. O Off Road do GT é o
            primeiro passo.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="off-road" />
    </>
  );
}
