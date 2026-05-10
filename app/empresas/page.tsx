import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { BusinessLeadForm } from '@/components/sections/business-lead-form';

export const metadata: Metadata = {
  title: 'Conta Business',
  description:
    'Conta comercial do GT Overlander. Destaque seu ponto no mapa, anuncie produtos pra base que viaja, ofereça serviços guiados. R$ 99,90/mês durante a fase de lançamento.',
};

const frentes = [
  {
    tag: 'Waypoints',
    titulo: 'Destaque seu ponto no mapa',
    desc: 'Estabelecimento físico — posto, hotel, oficina, camping, restaurante, atrativo turístico. Aparece em destaque no radar de quem já decidiu passar pela sua região, com ícone customizado, foto e dados completos.',
    exemplos: 'Postos · Campings · Hotéis · Pousadas · Oficinas · Restaurantes · Atrativos',
  },
  {
    tag: 'Produtos',
    titulo: 'Venda pra base que viaja',
    desc: 'E-commerce, fabricante ou distribuidor de equipamento overlander. Anuncie seus produtos no GT Desapega com link direto pra sua loja, marketplace ou WhatsApp comercial.',
    exemplos: 'Lojas online · Fabricantes · Distribuidores · Customização · Acessórios · Peças',
  },
  {
    tag: 'Serviços',
    titulo: 'Ofereça experiência guiada',
    desc: 'Guia local, condutor de expedição, instrutor 4×4, fotógrafo de roteiro. Apareça em regiões e roteiros relevantes pra quem está planejando viagem — antes de sair de casa.',
    exemplos: 'Guias 4×4 · Condutores · Instrutores · Fotógrafos · Trilhas guiadas · Expedições',
  },
];

const beneficios = [
  { titulo: 'Audiência qualificada', desc: 'Apareça pra quem JÁ DECIDIU viajar pra sua região. Não é tráfego frio — é viajante no momento exato de planejar.' },
  { titulo: 'Destaque visual exclusivo', desc: 'Caixinha colorida + ícone customizado no mapa, presença no Desapega, apresentação nas páginas de destinos.' },
  { titulo: 'Self-service', desc: 'Cadastra seu negócio, ativa as frentes que fazem sentido pra você, e tá no ar. Sem ligação de vendas, sem contrato longo.' },
  { titulo: 'Cancele quando quiser', desc: 'Mensal, sem multa, sem fidelidade. Se não trouxer resultado, você sai. Suas informações ficam com você.' },
];

const passos = [
  { num: 1, titulo: 'Preenche o cadastro', desc: 'Dados do negócio, frentes que vai usar, fotos e contato' },
  { num: 2, titulo: 'GT valida', desc: 'Conferimos as informações pra garantir qualidade e segurança da base' },
  { num: 3, titulo: 'Vai pro ar', desc: 'Aparece no mapa, no Desapega ou nos roteiros, conforme as frentes que ativou' },
  { num: 4, titulo: 'Acompanha métricas', desc: 'Visualizações, cliques, contatos — tudo medido no painel' },
];

export default function EmpresasPage() {
  return (
    <>
      <section className="bg-gt-bg text-gt-text">
        <div className="container-wide py-16 md:py-24 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted font-sans mb-4">
            Conta Business
          </p>
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">
            Vende pra quem viaja? GT é o seu canal.
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans mb-8">
            Estabelecimento físico, e-commerce de equipamento ou serviço de guia — a Conta Business é a porta única pra quem comercializa no universo overlander aparecer pra viajantes que já decidiram pegar a estrada.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#cadastro">Cadastrar minha conta</Button>
            <Button href="/termos/conta-business" variant="outline">Ver política completa</Button>
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">Três frentes, uma conta</h2>
          <p className="text-gt-text-muted mb-12 max-w-2xl font-sans leading-relaxed">
            A mesma assinatura cobre as três modalidades. Você ativa as que fizerem sentido pro seu negócio — pode ser uma, duas ou todas.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {frentes.map((f) => (
              <div key={f.tag} className="bg-gt-card rounded-lg p-7 border border-gt-border">
                <p className="text-xs uppercase tracking-wider text-gt-orange mb-3 font-sans font-medium">{f.tag}</p>
                <h3 className="font-sans text-xl font-medium text-gt-text mb-3 normal-case leading-tight">{f.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans mb-4">{f.desc}</p>
                <p className="text-xs text-gt-text-dim font-sans leading-relaxed">{f.exemplos}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">Por que Conta Business</h2>
          <p className="text-gt-text-muted mb-12 max-w-2xl font-sans">
            Diferente de anunciar em rede social ou Google Ads — o GT te coloca na frente de quem já decidiu pegar a estrada.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beneficios.map((b) => (
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
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">Como funciona</h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            Self-service, em 4 passos. Sem ligação de vendedor, sem contrato longo.
          </p>
          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {passos.map((p) => (
              <div key={p.num} className="border-l-2 border-gt-orange pl-5">
                <div className="text-gt-orange font-medium text-sm mb-2 font-sans">{p.num.toString().padStart(2, '0')}</div>
                <h3 className="font-sans font-medium text-gt-text mb-2 leading-snug normal-case">{p.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="precos" className="bg-gt-card py-16 md:py-20 border-t border-gt-border scroll-mt-20">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto bg-gt-bg border border-gt-border rounded-lg p-8 md:p-12 text-center mb-10">
            <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">Preço de lançamento</p>
            <p className="text-sm text-gt-text-dim font-sans mb-2">
              De <span className="line-through">R$ 199,90/mês</span> por
            </p>
            <div className="flex items-baseline justify-center gap-3 mb-3">
              <span className="text-base text-gt-text-muted font-sans">a partir de</span>
              <span className="font-display text-6xl md:text-7xl text-gt-text uppercase tracking-display">R$ 99,90</span>
              <span className="text-base text-gt-text-muted font-sans">por mês</span>
            </div>
            <p className="text-sm text-gt-text-muted font-sans leading-relaxed mb-6 max-w-xl mx-auto">
              Inclui 1 ponto destacado e até 15 produtos no Desapega. Cancele a qualquer momento, sem multa.{' '}
              <a href="/termos/conta-business" className="text-gt-orange hover:underline">Ver política completa</a>.
            </p>
            <Button href="#cadastro">Cadastrar minha conta agora</Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl text-gt-text mb-3">Add-ons e escalonamento</h3>
            <p className="text-gt-text-muted mb-8 font-sans leading-relaxed">
              O plano base cobre quem está começando. Conforme a operação cresce, você adiciona pacotes — direto no painel, sem precisar renegociar.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gt-bg rounded-lg p-6 border border-gt-border">
                <p className="text-xs uppercase tracking-wider text-gt-orange mb-3 font-sans font-medium">Produtos no Desapega</p>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans mb-4">
                  Plano base inclui até 15 produtos ativos. Pra mais, adicione pacotes de 10 produtos por R$ 59,90/mês cada.
                </p>
                <table className="w-full text-sm font-sans">
                  <tbody>
                    <tr className="border-b border-gt-border">
                      <td className="py-2 text-gt-text">Até 15 produtos</td>
                      <td className="py-2 text-right text-gt-text font-medium">R$ 99,90</td>
                    </tr>
                    <tr className="border-b border-gt-border">
                      <td className="py-2 text-gt-text-muted">+10 produtos (16–25)</td>
                      <td className="py-2 text-right text-gt-text">+ R$ 59,90</td>
                    </tr>
                    <tr className="border-b border-gt-border">
                      <td className="py-2 text-gt-text-muted">+10 produtos (26–35)</td>
                      <td className="py-2 text-right text-gt-text">+ R$ 59,90</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gt-text-muted">e assim por diante</td>
                      <td className="py-2 text-right text-gt-text-dim">+ R$ 59,90/pacote</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gt-bg rounded-lg p-6 border border-gt-border">
                <p className="text-xs uppercase tracking-wider text-gt-orange mb-3 font-sans font-medium">Pontos destacados (Waypoints)</p>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans mb-4">
                  Plano base inclui 1 ponto. Para redes com múltiplas unidades da mesma marca, escala progressiva com desconto por volume.
                </p>
                <table className="w-full text-sm font-sans">
                  <tbody>
                    <tr className="border-b border-gt-border">
                      <td className="py-2 text-gt-text">1 ponto</td>
                      <td className="py-2 text-right text-gt-text font-medium">R$ 99,90</td>
                    </tr>
                    <tr className="border-b border-gt-border">
                      <td className="py-2 text-gt-text-muted">2 a 10 pontos</td>
                      <td className="py-2 text-right text-gt-text">+ R$ 59,90 cada</td>
                    </tr>
                    <tr className="border-b border-gt-border">
                      <td className="py-2 text-gt-text-muted">Pacote 25 pontos</td>
                      <td className="py-2 text-right text-gt-text">R$ 999/mês</td>
                    </tr>
                    <tr className="border-b border-gt-border">
                      <td className="py-2 text-gt-text-muted">Pacote 50 pontos</td>
                      <td className="py-2 text-right text-gt-text">R$ 1.799/mês</td>
                    </tr>
                    <tr className="border-b border-gt-border">
                      <td className="py-2 text-gt-text-muted">Pacote 100 pontos</td>
                      <td className="py-2 text-right text-gt-text">R$ 2.999/mês</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gt-text-muted">Acima de 100</td>
                      <td className="py-2 text-right text-gt-text-dim">Sob consulta</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gt-text-dim mt-4 font-sans leading-relaxed">
                  Pacotes de rede aplicam-se a unidades da mesma marca e categoria. Para redes diferentes ou categorias mistas, fale com a gente em <a href="mailto:business@gtoverlander.com.br" className="text-gt-orange hover:underline">business@gtoverlander.com.br</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cadastro" className="bg-gt-bg py-16 md:py-24 border-t border-gt-border scroll-mt-20">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">Cadastro</p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">Conte sobre o seu negócio</h2>
          <p className="text-gt-text-muted mb-10 font-sans leading-relaxed">
            Preenche os dados abaixo e a gente entra em contato em até 2 dias úteis pra ativar sua conta. Quanto mais detalhe, mais rápido.
          </p>
          <BusinessLeadForm />
        </div>
      </section>
    </>
  );
}
