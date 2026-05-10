import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';

export const metadata: Metadata = {
  title: 'Overlanders',
  description:
    'A rede social dos viajantes do GT. Siga overlanders, descubra rotas públicas testadas, copie roteiros que outros completaram, construa comunidade de quem realmente vive a estrada.',
};

const oQueFaz = [
  {
    titulo: 'Descobre overlanders próximos',
    desc: 'Filtra por região, por estilo de viagem (4×4, RV, van), por nível no Explorer. Encontra gente que viaja parecido com você.',
  },
  {
    titulo: 'Segue quem inspira',
    desc: 'Acompanhe overlanders cujas rotas e fotos te interessam. Conta pública = qualquer um segue. Conta privada = você aprova.',
  },
  {
    titulo: 'Descobre rotas públicas',
    desc: 'Cada rota pública vira card navegável: distância, tempo, paradas, fotos da galeria, dificuldade. Filtra por região e tipo.',
  },
  {
    titulo: 'Copia rotas testadas',
    desc: 'Encontrou rota que serve pra você? Copia com 1 toque, vira tua, edita à vontade. Original fica creditado ao autor.',
  },
];

const privacidade = [
  {
    titulo: 'Conta pública × privada',
    desc: 'Você decide. Pública = qualquer overlander te segue. Privada = aprova um a um. Pode mudar a qualquer momento.',
  },
  {
    titulo: 'Rota pública × privada',
    desc: 'Cada rota tem visibilidade própria. Pode criar 50 rotas privadas e 1 pública. Você controla o que compartilha.',
  },
  {
    titulo: 'Bloquear seguidor',
    desc: 'Tirou um seguidor que não te agrada? Em qualquer momento, sem aviso, sem justificativa.',
  },
  {
    titulo: 'Anonimização opcional',
    desc: 'Suas contribuições à base de waypoints podem aparecer como "Comunidade GT", sem teu nome. Reputação ganha; identidade resguardada.',
  },
];

const faq = [
  {
    q: 'Tem mensagem direta entre overlanders?',
    a: 'Não dentro do Overlanders. A intenção da rede é descoberta e cópia de rotas, não bate-papo. Pra contato direto, existe Help Overlander (situação de socorro) ou os canais externos que cada overlander disponibiliza no perfil (e-mail, redes sociais).',
  },
  {
    q: 'Qualquer um pode copiar minhas rotas públicas?',
    a: 'Sim, é o ponto. Rota pública é pra ser copiada — gente testando suas trilhas é elogio, não invasão. Se algo for sensível pra você, mantenha a rota privada. Quem copia ganha sua rota como base, edita do jeito que quiser, e o crédito de origem fica registrado.',
  },
  {
    q: 'Overlanders verificados? O que isso muda?',
    a: 'Quem passou pelo processo de verificação de identidade ganha selo no perfil. Não muda funções básicas, mas aumenta confiança — outros overlanders tendem a aceitar Help Overlander de quem é verificado, e perfis verificados têm mais peso em ranking.',
  },
  {
    q: 'Posso seguir/copiar no Free?',
    a: 'No Free você acessa, vê perfis públicos, vê rotas públicas, mas não copia rota nem salva como favorita. Pra essas ações, é Plus ou Pro. Seguir overlanders também é benefício do plano pago (cria rede ativa).',
  },
  {
    q: 'Como funciona quando o autor original deleta a rota?',
    a: 'Quem já copiou continua com a sua versão. A rota original some da rede pública, e novas cópias não rolam. Suas cópias permanecem na sua biblioteca como rotas suas — independentes.',
  },
];

export default function OverlandersPage() {
  return (
    <>
      <FeatureHero
        kicker="Disponível agora"
        title="A estrada é sempre melhor com gente junto"
        subline="Overlanders é a rede social dos viajantes do GT. Encontre quem viaja parecido com você, descubra rotas testadas pela comunidade, copie roteiros que outros já completaram. Comunidade que cresce na estrada."
        primaryCta={{ label: 'Baixar grátis', href: '/baixar' }}
        secondaryCta={{ label: 'Ver planos', href: '/planos' }}
      />

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            O que vc faz no Overlanders
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans">
            Rede social com propósito: descobrir, seguir, aprender com quem já passou pela estrada que você quer cruzar.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {oQueFaz.map((o) => (
              <div key={o.titulo} className="bg-gt-bg rounded-lg p-6 border border-gt-border">
                <h3 className="font-sans font-medium text-gt-text mb-3 normal-case">{o.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            Privacidade — você no controle
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans leading-relaxed">
            Comunidade aberta sem expor quem prefere reserva. A configuração padrão é privada — você decide o que vira público.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {privacidade.map((p) => (
              <div key={p.titulo} className="bg-gt-card rounded-lg p-6 border border-gt-border">
                <h3 className="font-sans font-medium text-gt-text mb-3 normal-case">{p.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{p.desc}</p>
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
            Instagram mostra fotos bonitas. Strava mostra performance. Overlanders mostra ROTA — onde foi, como foi, o que encontrou. Conhecimento prático que outros viajantes podem usar literalmente. Comunidade que constrói biblioteca compartilhada de viagens reais.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="overlanders" />
    </>
  );
}
