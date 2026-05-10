import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';

export const metadata: Metadata = {
  title: 'Help Overlander',
  description:
    'Pane na estrada, pneu furado, bateria, combustível? Sinaliza no Help Overlander e quem está perto e disposto a ajudar aparece. Comunidade que cuida de comunidade.',
};

const tipos = [
  { emoji: '🔧', titulo: 'Mecânica', desc: 'Pane, vazamento, falha elétrica' },
  { emoji: '🛞', titulo: 'Pneu furado', desc: 'Estepe, reparo na estrada' },
  { emoji: '🔋', titulo: 'Bateria', desc: 'Sem carga pra dar partida' },
  { emoji: '⛽', titulo: 'Combustível', desc: 'Pane seca' },
];

const passos = [
  { num: 1, titulo: 'Sinaliza o pedido', desc: 'Em segundos, escolhe o tipo de ajuda, descreve a situação e marca a urgência' },
  { num: 2, titulo: 'GT avisa quem tá perto', desc: 'Overlanders próximos disponíveis recebem a notificação em tempo real' },
  { num: 3, titulo: 'Combina diretamente', desc: 'Quem aceita entra em contato. Vocês alinham detalhes e local' },
  { num: 4, titulo: 'Avalia depois', desc: 'Os dois lados avaliam. Reputação cresce, comunidade fica mais segura' },
];

const seguranca = [
  {
    titulo: 'Sem mediação financeira',
    desc: 'O Help Overlander conecta. Eventual cobrança, troca ou retribuição é combinada direto entre os envolvidos. GT não fica no meio.',
  },
  {
    titulo: 'Avaliação obrigatória',
    desc: 'Após cada interação, ambos avaliam. Reincidência negativa suspende. Comunidade saudável é responsabilidade compartilhada.',
  },
  {
    titulo: 'Filtros pra você decidir',
    desc: 'Configure quem pode te encontrar — avaliação mínima, verificação de identidade, filtros por gênero. Você decide com quem aceita interagir.',
  },
  {
    titulo: 'Verificação reforçada disponível',
    desc: 'Mecânicos solidários e prestadores recorrentes podem verificar identidade pra ganhar selo. Outro patamar de confiança.',
  },
];

const faq = [
  {
    q: 'Mas e se algo der errado?',
    a: 'Help Overlander é uma ferramenta de conexão entre overlanders — o GT NÃO supervisiona, não verifica antecedentes nem é parte das interações. Cada usuário assume os riscos. Em situação de risco grave (vida, segurança, patrimônio), aciona os serviços públicos: Polícia (190), SAMU (192), Bombeiros (193). Nosso anexo do Termo de Assunção de Risco explica em detalhe.',
  },
  {
    q: 'Quem pode oferecer ajuda como prestador?',
    a: 'Qualquer assinante Plus ou Pro maior de 18 anos. Ofertar ajuda no Free não é possível — pra criar reputação séria, é benefício do plano pago. Pedir ajuda, isso sim, é livre pra todos os planos.',
  },
  {
    q: 'O que cobrar / não cobrar?',
    a: 'Fica entre os overlanders envolvidos. Algumas situações são solidárias (ajuda gratuita, comunidade), outras envolvem reembolso de combustível ou pagamento por serviço técnico. O GT não interfere — recomendamos só que tudo seja combinado ANTES.',
  },
  {
    q: 'Funciona offline?',
    a: 'Não. Help Overlander depende de conexão pra notificar overlanders próximos em tempo real. Se você tá sem sinal, use os serviços de emergência tradicionais.',
  },
  {
    q: 'E se eu tô viajando sozinha — é seguro?',
    a: 'Tem filtros específicos: você pode aceitar ajuda apenas de mulheres, só de prestadores verificados, ou só de quem tem avaliação acima de X. Dá pra calibrar bastante. Mas a decisão final de aceitar ou não a interação é sempre sua, e em qualquer momento você pode recuar.',
  },
];

export default function HelpOverlanderPage() {
  return (
    <>
      <FeatureHero
        kicker="Disponível agora"
        title="Pane na estrada? Tem comunidade pra te ajudar"
        subline="Pneu furado, bateria, pane seca ou mecânica — sinaliza no Help Overlander e quem está perto, disponível e disposto a ajudar aparece. Comunidade que cuida de comunidade."
        primaryCta={{ label: 'Baixar grátis', href: '/baixar' }}
        secondaryCta={{ label: 'Ver planos', href: '/planos' }}
      />

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            Tipos de ajuda cobertos
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans">
            Categorias diretas, que cobrem 90% das paradas de emergência na estrada — sem confundir com outros usos da plataforma.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tipos.map((t) => (
              <div key={t.titulo} className="bg-gt-bg rounded-lg p-6 border border-gt-border">
                <div className="text-4xl mb-3">{t.emoji}</div>
                <h3 className="font-sans font-medium text-gt-text mb-1 normal-case">{t.titulo}</h3>
                <p className="text-sm text-gt-text-muted font-sans">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            Como funciona
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            Do pedido ao atendimento, em minutos.
          </p>
          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {passos.map((p) => (
              <div key={p.num} className="border-l-2 border-gt-orange pl-5">
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

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            Segurança e responsabilidade
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans leading-relaxed">
            Help Overlander conecta pessoas reais que vão se encontrar na estrada. Trabalhamos com camadas de segurança e clareza desde o desenho da feature.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {seguranca.map((s) => (
              <div key={s.titulo} className="bg-gt-bg rounded-lg p-6 border border-gt-border">
                <h3 className="font-sans font-medium text-gt-text mb-3 normal-case">{s.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gt-text-dim mt-8 font-sans leading-relaxed">
            O uso do Help Overlander exige aceite de termo específico de assunção de risco. <a href="/termos/help-overlander" className="text-gt-orange hover:underline">Ver Anexo I — Help Overlander</a>.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Diferencial
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            App de mapa não te ajuda quando o pneu fura. Aplicativo de seguro só responde se vc pagar caro. Help Overlander é a primeira solução de socorro na estrada feita pela própria comunidade overlander, gratuita pra pedir e aberta a quem quer retribuir.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="help-overlander" />
    </>
  );
}
