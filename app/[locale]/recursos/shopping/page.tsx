import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { FeatureHero } from '@/components/sections/feature-hero';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { OutrasFeatures } from '@/components/sections/outras-features';
import { DESAPEGA_ABERTO_A_TODOS } from '@/lib/product-config';

/**
 * Shopping (28/09/2026). Substitui a página do GT Desapega — /recursos/desapega
 * redireciona pra cá (next.config.mjs). O Desapega continua existindo, como a
 * parte do Shopping em que o viajante vende o que não usa mais.
 *
 * Como o Shopping funciona, nas palavras do Rangel:
 *  - produtos de lojas e usados do Desapega, tudo misturado, dividido por
 *    categoria; serviços de guia e aluguel de equipamento, cada um no seu lugar;
 *  - Conta Business vende e gerencia produtos e serviços pelo site e escolhe o
 *    canal de contato (site, WhatsApp...);
 *  - usuário comum anuncia usado no Desapega, e o contato é por mensagem no app.
 *
 * Sem limites de quantidade no texto. Sem screenshots por enquanto: as antigas
 * mostram a tela do GT Desapega, que mudou.
 */

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Shopping',
    description:
      'Equipamento de lojas e usados de viajantes, guias e aluguel de equipamento, organizados por categoria dentro do GT Overlander.',
    alternates: getPageAlternates(locale, '/recursos/shopping', { soPt: true }),
    ...(locale !== 'pt' && { robots: { index: false, follow: false } }),
  };
}

const oQueTem = [
  {
    titulo: 'Produtos de lojas',
    desc: 'Equipamento, acessórios e peças de lojas do universo overlander, com o caminho direto pra loja.',
  },
  {
    titulo: 'Usados do Desapega',
    desc: 'O que outro viajante não usa mais: barraca, geladeira, bagageiro, peça. Misturado com os produtos de loja, na mesma categoria.',
  },
  {
    titulo: 'Guias e expedições',
    desc: 'Quem conhece a região e leva você junto. Serviço e próximas saídas, pra quem está planejando a viagem.',
  },
  {
    titulo: 'Aluguel de equipamento',
    desc: 'Pra quem quer testar antes de comprar, ou precisa só pra essa viagem.',
  },
];

const contato = [
  {
    titulo: 'Loja ou prestador de serviço',
    desc: 'Quem tem Conta Business escolhe como quer ser procurado: site, WhatsApp ou outro canal. Você fala direto com ele.',
  },
  {
    titulo: 'Viajante no Desapega',
    desc: 'O contato é por mensagem, dentro do app. Vocês combinam tudo por ali.',
  },
];

const passosVendedor = [
  { num: 1, titulo: 'Anuncie', desc: 'Foto real, descrição honesta, preço e estado de uso' },
  { num: 2, titulo: 'Apareça pra quem viaja', desc: 'Seu anúncio entra na categoria certa do Shopping' },
  { num: 3, titulo: 'Converse', desc: 'Quem se interessar manda mensagem pelo app' },
  { num: 4, titulo: 'Combine direto', desc: 'Preço, pagamento e entrega ficam entre vocês' },
];

const faq = [
  {
    q: 'Quem pode vender no Shopping?',
    a: DESAPEGA_ABERTO_A_TODOS
      ? 'Qualquer pessoa com conta no GT pode anunciar o que não usa mais no Desapega. Lojas e prestadores de serviço vendem pela Conta Business, que é onde publicam produtos, anunciam serviços e escolhem o canal de contato.'
      : 'Assinantes podem anunciar o que não usam mais no Desapega. Lojas e prestadores de serviço vendem pela Conta Business, que é onde publicam produtos, anunciam serviços e escolhem o canal de contato.',
  },
  {
    q: 'O GT cobra comissão sobre a venda?',
    a: 'Não. O GT é vitrine: não recebe pagamento, não faz entrega e não fica com parte da venda.',
  },
  {
    q: 'Como pago e recebo?',
    a: 'Tudo é combinado direto entre quem compra e quem vende. Pix, transferência, dinheiro na entrega: fica entre vocês. Recomendamos cuidado padrão: encontro em local público, conferir o produto antes de pagar e guardar o que foi combinado.',
  },
  {
    q: 'E se for golpe?',
    a: 'O GT modera anúncios e remove os denunciados. Mas o GT não participa da negociação, e o risco é de quem negocia. Desconfie de preço bom demais e de pressa pra receber.',
  },
  {
    q: 'Tenho loja ou ofereço serviço. Como entro?',
    a: 'Pela Conta Business. Você cria a conta, publica seus produtos ou serviços e escolhe como o cliente fala com você. Detalhes em /empresas.',
  },
];

export default function ShoppingPage() {
  return (
    <>
      <FeatureHero
        kicker="Shopping"
        title="Tudo o que a estrada pede, de quem entende de estrada"
        subline="Equipamento de lojas e usados de viajantes, guias e aluguel de equipamento. Tudo junto, organizado por categoria, dentro do GT Overlander."
        primaryCta={{ label: 'Começar grátis', href: '/baixar' }}
        secondaryCta={{ label: 'Tenho loja ou serviço', href: '/empresas' }}
      />

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">O que tem no Shopping</h2>
          <p className="text-gt-text-muted mb-10 max-w-2xl font-sans">
            Produto novo e usado lado a lado, na mesma categoria. Serviços e aluguel, cada um no seu lugar.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {oQueTem.map((b) => (
              <div key={b.titulo} className="bg-gt-bg rounded-lg p-6 border border-gt-border">
                <h3 className="font-sans font-medium text-gt-text mb-3 normal-case">{b.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-10 leading-tight">Como você fala com quem vende</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {contato.map((c) => (
              <div key={c.titulo} className="border-l-2 border-gt-orange pl-5">
                <h3 className="font-sans font-medium text-gt-text mb-2 normal-case">{c.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3 leading-tight">Desapega: venda o que você não usa mais</h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            O equipamento parado na garagem pode ser a próxima viagem de alguém.
          </p>
          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {passosVendedor.map((p) => (
              <div key={p.num} className="border-l-2 border-gt-orange pl-5">
                <div className="text-gt-orange-text font-medium text-sm mb-2 font-sans">
                  {p.num.toString().padStart(2, '0')}
                </div>
                <h3 className="font-sans font-medium text-gt-text mb-2 leading-snug normal-case">{p.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-gt-bg border border-gt-border rounded-lg p-5 mt-12 font-sans text-sm text-gt-text-muted leading-relaxed">
            <strong className="text-gt-text font-medium">Atenção:</strong> O GT funciona como vitrine e canal de contato. Não recebe pagamentos, não realiza entregas e não garante a condição dos produtos. Confira o item, a identidade de quem vende e as condições da negociação antes de qualquer pagamento. Pra mais segurança, combine encontros em locais públicos e movimentados.
          </div>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <OutrasFeatures currentSlug="shopping" />
    </>
  );
}
