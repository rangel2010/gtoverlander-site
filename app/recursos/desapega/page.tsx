import type { Metadata } from 'next';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';

export const metadata: Metadata = {
  title: 'GT Desapega',
  description:
    'Marketplace overlander entre quem realmente viaja. Compre e venda equipamento, peças, veículos adaptados e acessórios. Vitrine entre overlanders, sem intermediação.',
};

const categorias = [
  { emoji: '🚐', titulo: 'Veículos', desc: 'Motorhomes, vans, 4×4, trailers' },
  { emoji: '🔩', titulo: 'Peças', desc: 'Suspensão, motor, pneus' },
  { emoji: '⛺', titulo: 'Camping', desc: 'Barracas, fogareiros, mochilas' },
  { emoji: '🔋', titulo: 'Energia', desc: 'Painéis, baterias, inversores' },
  { emoji: '🧰', titulo: 'Acessórios', desc: 'Bagageiros, snorkel, guincho' },
  { emoji: '🥾', titulo: 'Vestuário', desc: 'Roupa de trilha, bota, capa' },
];

const passosVendedor = [
  { num: 1, titulo: 'Cadastra o anúncio', desc: 'Foto real, descrição honesta, preço e condição de uso' },
  { num: 2, titulo: 'Aparece pra quem viaja', desc: 'Anúncio fica visível pra base do GT — overlanders ativos' },
  { num: 3, titulo: 'Negocia direto', desc: 'Interessado entra em contato. Combinem preço, pagamento e entrega' },
  { num: 4, titulo: 'Avaliam-se mutuamente', desc: 'Reputação cresce, comunidade fica mais segura pra próxima' },
];

const beneficios = [
  {
    titulo: 'Audiência certa',
    desc: 'Quem vê seu anúncio é overlander de verdade. Não é tráfego frio nem curioso — é gente que precisa do equipamento que você tem.',
  },
  {
    titulo: 'Sem taxas sobre venda',
    desc: 'GT é vitrine, não marketplace transacional. Você combina pagamento direto com o comprador. Zero taxa em cima da venda.',
  },
  {
    titulo: 'Filtros relevantes',
    desc: 'Categoria, distância, preço, estado de uso. Quem busca encontra rapidinho — e quem anuncia tem mais chance de fechar.',
  },
  {
    titulo: 'Anúncio com link próprio',
    desc: 'Coloca link pro WhatsApp, e-commerce ou marketplace externo. GT só conecta — vc operacionaliza do seu jeito.',
  },
];

const faq = [
  {
    q: 'Quem pode anunciar?',
    a: 'Assinantes Plus ou Pro podem anunciar até 3 itens pessoais (sem link de redirecionamento). Pra anunciar mais, vender de forma recorrente, ou incluir link comercial, é Conta Business — pensada pra lojas, fabricantes e distribuidores.',
  },
  {
    q: 'GT cobra alguma comissão sobre a venda?',
    a: 'Não. GT é vitrine: você paga a assinatura mensal e anuncia. Combina venda, pagamento e entrega direto com o comprador. Zero taxa em cima da transação — diferente de Mercado Livre, OLX paga, e similares.',
  },
  {
    q: 'Como recebo o pagamento? E a entrega?',
    a: 'Tudo combinado entre comprador e vendedor. PIX, transferência, dinheiro na entrega — fica entre vocês. GT não tem visibilidade ou intermediação financeira. Recomendamos cuidado padrão com vendas P2P (encontros em local público, conferência do produto antes do pagamento, registro de combinados).',
  },
  {
    q: 'E se for golpe?',
    a: 'GT modera anúncios e remove os reportados. Mas o GT NÃO é parte da transação — risco de fraude existe e é responsabilidade dos envolvidos. Avaliações entre usuários e o sistema de reputação ajudam a identificar comportamento ruim com o tempo.',
  },
  {
    q: 'Posso anunciar serviços?',
    a: 'Pra serviços, especialmente serviços guiados (expedições, condução, instrução), o canal certo é a Conta Business — frente Serviços. Mais detalhes em /empresas.',
  },
  {
    q: 'Posso ver e contatar anúncios mesmo no Free?',
    a: 'Sim. Ver, buscar e iniciar contato com vendedores é livre pra todo mundo. O que é restrito a pagantes é PUBLICAR anúncio.',
  },
];

export default function DesapegaPage() {
  return (
    <>
      <FeatureHero
        kicker="Disponível agora"
        title="Marketplace entre quem realmente viaja"
        subline="Equipamento overlander tem mercado próprio: barracas usadas, suspensão modificada, motorhome adaptado. Anuncia entre quem entende e busca exatamente isso. Vitrine sem comissão sobre venda."
        primaryCta={{ label: 'Baixar grátis', href: '/baixar' }}
        secondaryCta={{ label: 'Ver planos', href: '/planos' }}
      />

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            Categorias do Desapega
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans">
            Tudo que circula no universo overlander tem espaço — equipamento de viagem, modificação de veículo, vestuário técnico, acessórios.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categorias.map((c) => (
              <div key={c.titulo} className="bg-gt-bg rounded-lg p-5 border border-gt-border">
                <div className="text-3xl mb-2">{c.emoji}</div>
                <h3 className="font-sans font-medium text-gt-text mb-1 normal-case text-sm">{c.titulo}</h3>
                <p className="text-xs text-gt-text-muted font-sans">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">
            Como vender
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            Self-service, do anúncio à venda.
          </p>
          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {passosVendedor.map((p) => (
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
            Por que vender no Desapega
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans">
            Anunciar em rede social ou OLX é gritar pra qualquer um. Aqui você fala com quem entende.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {beneficios.map((b) => (
              <div key={b.titulo} className="bg-gt-bg rounded-lg p-6 border border-gt-border">
                <h3 className="font-sans font-medium text-gt-text mb-3 normal-case">{b.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-12 md:py-14 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            Diferencial
          </p>
          <p className="font-sans text-xl md:text-2xl font-medium leading-snug text-gt-text">
            Desapega é o classificado feito pra um nicho específico: gente que vive em estrada. Vende rápido porque o comprador entende o que está vendo. E se aqui não vender, dificilmente vende em outro lugar.
          </p>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="desapega" />
    </>
  );
}
