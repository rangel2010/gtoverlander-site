import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { PlansCards } from '@/components/sections/plans-cards';

export const metadata: Metadata = {
  title: 'Planos',
  description:
    'Free pra começar. Plus pra quem viaja com frequência. Pro pra quem não para. A partir de R$ 14,90/mês ou R$ 79,90/ano.',
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
    label: 'Geração de rota (IA + Off Road)',
    values: ['1 a cada 90 dias', '2 por mês', 'ilimitado'],
  },
  {
    label: 'Consultas de radar de waypoints',
    values: ['1 por dia', '5 por dia', 'ilimitado'],
  },
  {
    label: 'Modo Offline (em breve)',
    values: [true, true, true],
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
    label: 'Suporte',
    values: ['Comunidade', 'E-mail', 'Prioritário'],
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
    q: 'Qual a diferença entre mensal e anual?',
    a: 'Anual tem desconto significativo: Plus mensal sai R$ 178,80/ano, anual sai R$ 79,90 (economia de 55%). Pro mensal sai R$ 238,80/ano, anual sai R$ 99,90 (economia de 58%). Mesmo plano, mesmas features — só muda o ciclo de cobrança.',
  },
  {
    q: 'Tenho assinatura no iOS?',
    a: 'Hoje só Android (via Asaas). A assinatura no iOS está em desenvolvimento — quando estiver pronta, todos os planos ficam disponíveis nas duas plataformas.',
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
          <PlansCards />
        </div>
      </section>

      <section className="bg-gt-cream py-16 md:py-20">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-3">
            Comparação completa
          </h2>
          <p className="text-gt-gray-mid mb-10 max-w-xl">
            Todos os planos têm acesso à base de mais de 4 milhões de waypoints
            e ao Modo Offline (em breve). A diferença é o uso intenso da IA e
            do radar.
          </p>

          <div className="overflow-x-auto bg-white rounded-lg border border-gt-green/10">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-gt-green/20">
                  <th className="text-left py-4 px-5 text-sm font-medium text-gt-green/70">
                    Recursos
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-medium text-gt-green w-[18%]">
                    Free
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-medium text-gt-green w-[20%] bg-gt-cream">
                    Plus
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-medium text-gt-green w-[18%]">
                    Pro
                  </th>
                </tr>
                <tr className="border-b border-gt-green/10 text-xs text-gt-gray-mid">
                  <td className="py-3 px-5">Mensal</td>
                  <td className="text-center py-3 px-3">R$ 0</td>
                  <td className="text-center py-3 px-3 bg-gt-cream">R$ 14,90</td>
                  <td className="text-center py-3 px-3">R$ 19,90</td>
                </tr>
                <tr className="border-b border-gt-green/10 text-xs text-gt-gray-mid">
                  <td className="py-3 px-5">Anual</td>
                  <td className="text-center py-3 px-3">—</td>
                  <td className="text-center py-3 px-3 bg-gt-cream">R$ 79,90</td>
                  <td className="text-center py-3 px-3">R$ 99,90</td>
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr
                    key={f.label}
                    className="border-b border-gt-green/10"
                  >
                    <td className="py-4 px-5 text-sm text-gt-gray-dark">
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
