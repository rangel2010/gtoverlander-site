import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { PlansCards } from '@/components/sections/plans-cards';
import { productPlansLd, jsonLdScriptProps } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Planos',
  description:
    'Free pra começar. Plus pra quem viaja com frequência. Pro pra quem não para. A partir de R$ 14,90/mês ou R$ 79,90/ano.',
};

interface PlanFeature {
  label: string;
  values: [string | boolean, string | boolean, string | boolean];
}

const features: PlanFeature[] = [
  {
    label: 'Roteiros com IA',
    values: ['IA padrão', 'IA avançada', 'IA avançada'],
  },
  {
    label: 'Rotas exportadas pra navegação',
    values: ['1 a cada 90 dias', '2 por mês', 'ilimitado'],
  },
  {
    label: 'Consultas de radar de waypoints',
    values: ['1 por dia', '5 por dia', 'ilimitado'],
  },
  {
    label: 'Waypoints próprios — base mundial',
    values: [true, true, true],
  },
  {
    label: 'CarPlay / Android Auto',
    values: [true, true, true],
  },
  {
    label: 'Ver e contatar anúncios no GT Desapega',
    values: [true, true, true],
  },
  {
    label: 'Anunciar no GT Desapega',
    values: [false, true, true],
  },
  {
    label: 'Copiar rotas públicas de outros overlanders',
    values: [false, true, true],
  },
  {
    label: 'Pedir ajuda no Help Overlander',
    values: [true, true, true],
  },
  {
    label: 'Oferecer ajuda como prestador no Help Overlander',
    values: [false, true, true],
  },
  {
    label: 'Explore Novos Destinos (em breve)',
    values: [false, true, true],
  },
  {
    label: 'Suporte',
    values: ['E-mail', 'E-mail prioritário', 'E-mail prioritário'],
  },
];

const faq = [
  {
    q: 'Posso testar antes de assinar?',
    a: 'O plano Free não é trial — é grátis pra sempre. Você usa o GT com a IA padrão, todos os waypoints próprios disponíveis, CarPlay e Android Auto, sem deadline. Quando quiser mais densidade, sobe pra Plus ou Pro.',
  },
  {
    q: 'Posso cancelar a qualquer momento?',
    a: 'Sim. Cancele quando quiser, sem multa. O plano segue ativo até o fim do ciclo já pago e depois volta automaticamente pro Free.',
  },
  {
    q: 'Qual a diferença entre mensal e anual?',
    a: 'Anual tem desconto significativo: Plus mensal sai R$ 178,80/ano, anual sai R$ 79,90 (economia de 55%). Pro mensal sai R$ 238,80/ano, anual sai R$ 99,90 (economia de 58%). Mesmo plano, mesmas features — só muda o ciclo de cobrança.',
  },
  {
    q: 'Quanto custa em outras moedas?',
    a: 'Os preços em real (R$) são os oficiais. Em outras moedas, o app converte automaticamente baseado na cobrança da sua loja.',
  },
  {
    q: 'O que acontece com minhas rotas se eu cancelar?',
    a: 'Suas rotas, paradas e configurações nunca são apagadas — em nenhum plano. O que muda entre os planos é só a quantidade de vezes que você pode exportar a rota pra navegar. Se voltar pro Plus ou Pro depois, tudo continua exatamente onde estava.',
  },
  {
    q: 'Conta Business é diferente?',
    a: 'Sim. A Conta Business é pra quem comercializa pro universo overlander — estabelecimentos com ponto físico (postos, campings, pousadas, oficinas), vendedores recorrentes (e-commerce, fabricantes de equipamento) e prestadores de serviço (guias, condutores de expedição). Plano à parte dos pessoais (Free/Plus/Pro). Detalhes em /empresas.',
  },
];

function FeatureValue({ value }: { value: string | boolean }) {
  if (value === true) return <span className="text-gt-orange">✓</span>;
  if (value === false) return <span className="text-gt-text-dim">—</span>;
  return <span className="text-sm text-gt-text font-sans">{value}</span>;
}

export default function PlanosPage() {
  return (
    <>
      {/* Schema.org Product + Offers — rich snippet com preços no Google */}
      <script {...jsonLdScriptProps(productPlansLd())} />

      <section className="bg-gt-bg text-gt-text">
        <div className="container-wide py-16 md:py-20 max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-5">
            Escolha o plano que combina com sua viagem
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans">
            Free pra começar. Plus pra quem viaja com frequência. Pro pra quem não para.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <PlansCards />
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Comparação completa
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-xl font-sans">
            Todos os planos têm acesso à base de mais de 4 milhões de waypoints. Criar rotas é ilimitado pra todo mundo — a diferença está em exportar pra navegar, no uso intenso da IA e nas consultas do radar.
          </p>

          <div className="overflow-x-auto bg-gt-bg rounded-lg border border-gt-border">
            <table className="w-full border-collapse min-w-[640px] font-sans">
              <thead>
                <tr className="border-b border-gt-border-strong">
                  <th className="text-left py-4 px-5 text-sm font-medium text-gt-text-muted">
                    Recursos
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-medium text-gt-text w-[18%]">
                    Free
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-medium text-gt-text w-[20%] bg-gt-card">
                    Plus
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-medium text-gt-text w-[18%]">
                    Pro
                  </th>
                </tr>
                <tr className="border-b border-gt-border text-xs text-gt-text-muted">
                  <td className="py-3 px-5">Mensal</td>
                  <td className="text-center py-3 px-3">R$ 0</td>
                  <td className="text-center py-3 px-3 bg-gt-card">R$ 14,90</td>
                  <td className="text-center py-3 px-3">R$ 19,90</td>
                </tr>
                <tr className="border-b border-gt-border text-xs text-gt-text-muted">
                  <td className="py-3 px-5">Anual</td>
                  <td className="text-center py-3 px-3">—</td>
                  <td className="text-center py-3 px-3 bg-gt-card">R$ 79,90</td>
                  <td className="text-center py-3 px-3">R$ 99,90</td>
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr
                    key={f.label}
                    className="border-b border-gt-border last:border-b-0"
                  >
                    <td className="py-4 px-5 text-sm text-gt-text">
                      {f.label}
                    </td>
                    <td className="text-center py-4 px-3">
                      <FeatureValue value={f.values[0]} />
                    </td>
                    <td className="text-center py-4 px-3 bg-gt-card">
                      <FeatureValue value={f.values[1]} />
                    </td>
                    <td className="text-center py-4 px-3">
                      <FeatureValue value={f.values[2]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
              Pra quem vende ao universo overlander
            </p>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-4 leading-tight">
              Conta Business
            </h2>
            <p className="text-gt-text-muted font-sans leading-relaxed">
              Plano comercial único, três frentes de uso conforme seu negócio:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <div className="bg-gt-card rounded-lg p-6 border border-gt-border">
              <p className="text-xs uppercase tracking-wider text-gt-orange mb-3 font-sans font-medium">
                Waypoints
              </p>
              <h3 className="font-sans text-lg font-medium text-gt-text mb-2 normal-case">
                Destaque seu ponto no mapa
              </h3>
              <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                Estabelecimento físico — posto, hotel, oficina, camping, restaurante, atrativo. Aparece em destaque no radar e no planejamento de quem viaja pela região.
              </p>
            </div>
            <div className="bg-gt-card rounded-lg p-6 border border-gt-border">
              <p className="text-xs uppercase tracking-wider text-gt-orange mb-3 font-sans font-medium">
                Produtos
              </p>
              <h3 className="font-sans text-lg font-medium text-gt-text mb-2 normal-case">
                Venda pra base que viaja
              </h3>
              <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                E-commerce, fabricante, distribuidor de equipamento overlander. Anuncie seus produtos com link direto pra sua loja, marketplace ou WhatsApp comercial.
              </p>
            </div>
            <div className="bg-gt-card rounded-lg p-6 border border-gt-border">
              <p className="text-xs uppercase tracking-wider text-gt-orange mb-3 font-sans font-medium">
                Serviços
              </p>
              <h3 className="font-sans text-lg font-medium text-gt-text mb-2 normal-case">
                Ofereça experiência guiada
              </h3>
              <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                Guia, condutor de expedição, instrutor 4×4, fotógrafo de roteiro. Apareça nas regiões e roteiros relevantes pra quem está planejando a viagem.
              </p>
            </div>
          </div>

          <div className="bg-gt-card border border-gt-border rounded-lg p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div className="flex-1">
              <p className="text-xs text-gt-text-dim font-sans mb-1">
                De <span className="line-through">R$ 199,90/mês</span> por
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-5xl text-gt-text uppercase tracking-display">
                  R$ 99,90
                </span>
                <span className="text-sm text-gt-text-muted font-sans">por mês</span>
              </div>
              <p className="text-sm text-gt-text-muted font-sans leading-relaxed">
                Plano único cobrindo as três frentes — você ativa as que fizerem sentido pro seu negócio. Cancele a qualquer momento.{' '}
                <a href="/termos/conta-business" className="text-gt-orange hover:underline">
                  Ver política completa
                </a>.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <Button href="/empresas" className="w-full md:w-auto">
                Cadastrar minha conta Business
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-4">
            Comece grátis e suba quando precisar
          </h2>
          <p className="text-gt-text-muted mb-8 font-sans">
            Sem multa de cancelamento. Suas rotas ficam guardadas mesmo se você descer de plano.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/baixar">Baixar grátis</Button>
            <Button href="/contato" variant="outline">
              Falar com a gente
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
