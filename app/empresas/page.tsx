import type { Metadata } from 'next';
import { BusinessLeadForm } from '@/components/sections/business-lead-form';

export const metadata: Metadata = {
  title: 'Conta Business — em breve',
  description:
    'Postos, campings, pousadas, oficinas e restaurantes podem aparecer no mapa do GT pra viajantes que vão passar pela sua região. Conta Business em breve — entre na lista de espera.',
};

const beneficios = [
  {
    titulo: 'Audiência qualificada',
    desc: 'Apareça pra quem JÁ DECIDIU passar pela sua região. Não é tráfego frio — é viajante no momento exato de planejar.',
  },
  {
    titulo: 'Indicação prioritária no mapa',
    desc: 'Sua empresa ganha destaque visual no radar. Quando houver concorrentes próximos, você aparece com prioridade pro viajante.',
  },
  {
    titulo: 'Self-service',
    desc: 'Cadastra a empresa, escolhe a categoria, e tá no mapa. Sem ligação de vendas, sem contrato longo, sem burocracia.',
  },
  {
    titulo: 'ROI mensurável',
    desc: 'Você vai ver quantos viajantes passaram pela região, quantos viram seu perfil, quantos chegaram até você.',
  },
];

const passos = [
  { num: 1, titulo: 'Cadastra sua empresa', desc: 'Nome, fotos, horário, contato — tudo no painel' },
  { num: 2, titulo: 'Define a localização', desc: 'Endereço da empresa, categoria principal, fotos. O GT cuida do resto.' },
  { num: 3, titulo: 'Aparece pra viajantes', desc: 'Quando alguém planeja rota pela sua região, você está lá' },
  { num: 4, titulo: 'Acompanha métricas', desc: 'Visualizações, cliques, contatos — tudo medido' },
];

const categorias = [
  '⛽ Postos de combustível',
  '🛌 Hotéis',
  '🏕️ Campings',
  '🏡 Pousadas',
  '🍽️ Restaurantes',
  '☕ Cafés',
  '🥐 Padarias',
  '🔧 Oficinas mecânicas',
  '🚐 Receptivos pra RV',
];

export default function EmpresasPage() {
  return (
    <>
      <section className="bg-gt-bg text-gt-text">
        <div className="container-wide py-16 md:py-24 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded font-sans">
              Em breve
            </span>
            <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted font-sans">
              Conta Business
            </p>
          </div>
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">
            Apareça pra quem já decidiu viajar
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans">
            Postos, campings, pousadas, oficinas e restaurantes ganham
            visibilidade pra viajantes que já decidiram passar pela sua região.
            Conta Business em breve — entre na lista de espera.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Por que Conta Business
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-2xl font-sans">
            Diferente de anunciar em rede social ou Google Ads — o GT te coloca
            na frente de quem já decidiu passar pela sua região.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beneficios.map((b) => (
              <div
                key={b.titulo}
                className="bg-gt-card rounded-lg p-6 border border-gt-border"
              >
                <h3 className="font-sans font-medium text-gt-text mb-3 normal-case">
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

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Como vai funcionar
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            Self-service, em 4 passos. Sem ligação de vendedor, sem contrato
            longo.
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

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Categorias atendidas
          </h2>
          <p className="text-gt-text-muted mb-10 max-w-xl font-sans">
            Qualquer estabelecimento na rota dos viajantes overlander tem
            espaço.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categorias.map((c) => (
              <div
                key={c}
                className="bg-gt-card rounded-md px-4 py-3 text-sm text-gt-text border border-gt-border font-sans"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-24 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">
            Lista de espera
          </p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            Cadastre seu interesse
          </h2>
          <p className="text-gt-text-muted mb-10 font-sans">
            Quando a Conta Business lançar, quem está na lista é dos primeiros
            a saber e ganha condições especiais nos primeiros meses.
          </p>

          <BusinessLeadForm />
        </div>
      </section>
    </>
  );
}
