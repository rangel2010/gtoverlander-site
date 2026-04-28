import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { FeatureFaq } from '@/components/sections/feature-faq';

export const metadata: Metadata = {
  title: 'Planos',
  description:
    'Free pra começar. Plus pra quem viaja com mais frequência. Pro pra quem não para. Compare e escolha o plano que combina com sua viagem.',
};

interface PlanFeature {
  label: string;
  values: [string | boolean, string | boolean, string | boolean]; // [Free, Plus, Pro]
}

const features: PlanFeature[] = [
  {
    label: 'Roteiros com IA',
    values: ['Standard Free (gpt-5.4-mini)', 'Premium (gpt-5.4)', 'Premium (gpt-5.4)'],
  },
  {
    label: 'Eventos guardados',
    values: ['até X', 'até Y', 'ilimitado'],
  },
  {
    label: 'Off Road manual (em breve)',
    values: ['1 execução / 90 dias', '2 execuções / mês', 'execuções ilimitadas'],
  },
  {
    label: 'Modo Offline (em breve)',
    values: [true, true, true],
  },
  {
    label: 'Waypoints próprios',
    values: [true, true, true],
  },
  {
    label: 'CarPlay / Android Auto',
    values: [true, true, true],
  },
  {
    label: 'Suporte',
    values: ['Comunidade', 'E-mail', 'Prioritário'],
  },
];

const plans = [
  {
    name: 'Free',
    price: 'R$ 0',
    priceContext: 'pra sempre',
    desc: 'Pra quem tá começando ou viaja menos. Free de verdade — não é trial.',
    cta: { label: 'Baixar grátis', href: '/baixar' },
    highlight: false,
  },
  {
    name: 'Plus',
    price: 'R$ X',
    priceContext: 'por mês',
    desc: 'Pra quem viaja com frequência. Premium de IA + Off Road universal com limite mensal.',
    cta: { label: 'Assinar Plus', href: '/baixar?plan=plus' },
    highlight: true,
  },
  {
    name: 'Pro',
    price: 'R$ Y',
    priceContext: 'por mês',
    desc: 'Pra quem não para. Tudo ilimitado, suporte prioritário.',
    cta: { label: 'Assinar Pro', href: '/baixar?plan=pro' },
    highlight: false,
  },
];

const faq = [
  {
    q: 'Posso testar antes de assinar?',
    a: 'O plano Free não é trial — é grátis pra sempre. Você usa o GT com Standard Free de IA, todos os waypoints próprios disponíveis, CarPlay e Android Auto, sem deadline. Quando quiser mais densidade, sobe pra Plus ou Pro.',
  },
  {
    q: 'Posso cancelar a qualquer momento?',
    a: 'Sim. Cancele quando quiser, sem multa. O plano segue ativo até o fim do ciclo já pago e depois volta automaticamente pro Free.',
  },
  {
    q: 'Tenho assinatura no iOS?',
    a: 'Hoje só Android (via Asaas). A assinatura no iOS está em desenvolvimento — quando estiver pronta, todos os planos ficam disponíveis nas duas plataformas.',
  },
  {
    q: 'Tem desconto no plano anual?',
    a: 'Estamos avaliando o modelo de plano anual. Hoje só mensal.',
  },
  {
    q: 'Quanto custa em outras moedas?',
    a: 'Os preços em real (R$) são os oficiais. Em outras moedas, o app converte automaticamente baseado na cobrança da sua loja.',
  },
  {
    q: 'O que acontece com minhas rotas se eu cancelar?',
    a: 'Suas rotas, paradas e configurações ficam guardadas na conta — não são apagadas. Se você voltar pro Plus ou Pro depois, tudo continua exatamente onde estava.',
  },
  {
    q: 'Conta Business é diferente?',
    a: 'Sim. A Conta Business (em breve) é pra estabelecimentos — postos, campings, pousadas, oficinas — que querem aparecer no mapa do GT pra quem passar pela região. Diferente dos planos pessoais (Free/Plus/Pro). Veja em /empresas.',
  },
];

function FeatureValue({ value }: { value: string | boolean }) {
  if (value === true) return <span className="text-gt-orange">✓</span>;
  if (value === false) return <span className="text-gt-gray-light">—</span>;
  return <span className="text-sm text-gt-gray-dark">{value}</span>;
}

export default function PlanosPage() {
  return (
    <>
      <section className="bg-gt-green text-white">
        <div className="container-wide py-16 md:py-20 max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-medium leading-[1.1] mb-5">
            Escolha o plano que combina com sua viagem
          </h1>
          <p className="text-base md:text-lg text-white/75 leading-relaxed">
            Free pra começar. Plus pra quem viaja com frequência. Pro pra quem
            não para.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`bg-white rounded-lg p-7 relative ${
                  p.highlight
                    ? 'border-2 border-gt-orange'
                    : 'border border-gt-green/10'
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded">
                    Mais escolhido
                  </span>
                )}

                <h3 className="text-xl font-medium text-gt-green mb-2">
                  {p.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-medium text-gt-green">
                    {p.price}
                  </span>
                  <span className="text-sm text-gt-gray-mid">
                    {p.priceContext}
                  </span>
                </div>
                <p className="text-sm text-gt-gray-mid leading-relaxed mb-6 min-h-[3rem]">
                  {p.desc}
                </p>
                <Button
                  href={p.cta.href}
                  variant={p.highlight ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {p.cta.label}
                </Button>
              </div>
            ))}
          </div>

          <p className="text-xs text-gt-gray-mid italic mb-6 text-center">
            Preços e limites finais sendo confirmados. Tabela abaixo é referência da estrutura.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gt-green/20">
                  <th className="text-left py-4 pr-4 text-sm font-medium text-gt-green/70">
                    Comparação completa
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-medium text-gt-green w-[18%]">
                    Free
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-medium text-gt-green w-[18%] bg-gt-cream">
                    Plus
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-medium text-gt-green w-[18%]">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr
                    key={f.label}
                    className="border-b border-gt-green/10"
                  >
                    <td className="py-4 pr-4 text-sm text-gt-gray-dark">
                      {f.label}
                    </td>
                    <td className="text-center py-4 px-3">
                      <FeatureValue value={f.values[0]} />
                    </td>
                    <td className="text-center py-4 px-3 bg-gt-cream">
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

      <FeatureFaq items={faq} />

      <section className="bg-gt-green text-white py-16 md:py-20">
        <div className="container-narrow text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">
            Comece grátis e suba quando precisar
          </h2>
          <p className="text-white/75 mb-8">
            Sem multa de cancelamento. Suas rotas ficam guardadas mesmo se
            você descer de plano.
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
