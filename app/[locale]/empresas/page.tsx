import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { BusinessLeadForm } from '@/components/sections/business-lead-form';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Conta Business',
    description:
    'Conta Business do GT Overlander, em breve. Destaque seu ponto no mapa, venda produtos e ofereça serviços pra quem viaja por terra. Entre na lista de espera.',
    alternates: getPageAlternates(locale, '/empresas'),
  };
}

export default async function EmpresasPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('empresas');

  const frentes = [
    { tag: t('frentes.f1tag'), titulo: t('frentes.f1titulo'), desc: t('frentes.f1desc'), exemplos: t('frentes.f1exemplos') },
    { tag: t('frentes.f2tag'), titulo: t('frentes.f2titulo'), desc: t('frentes.f2desc'), exemplos: t('frentes.f2exemplos') },
    { tag: t('frentes.f3tag'), titulo: t('frentes.f3titulo'), desc: t('frentes.f3desc'), exemplos: t('frentes.f3exemplos') },
  ];

  const beneficios = [
    { titulo: t('beneficios.b1t'), desc: t('beneficios.b1d') },
    { titulo: t('beneficios.b2t'), desc: t('beneficios.b2d') },
    { titulo: t('beneficios.b3t'), desc: t('beneficios.b3d') },
    { titulo: t('beneficios.b4t'), desc: t('beneficios.b4d') },
  ];

  const passos = [
    { num: 1, titulo: t('comoFunciona.p1t'), desc: t('comoFunciona.p1d') },
    { num: 2, titulo: t('comoFunciona.p2t'), desc: t('comoFunciona.p2d') },
    { num: 3, titulo: t('comoFunciona.p3t'), desc: t('comoFunciona.p3d') },
    { num: 4, titulo: t('comoFunciona.p4t'), desc: t('comoFunciona.p4d') },
  ];

  return (
    <>
      <section className="dark bg-gt-bg-elevated text-gt-text">
        <div className="container-wide py-16 md:py-24 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted font-sans mb-4">
            {t('hero.label')}
          </p>
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">
            {t('hero.titulo')}
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans mb-8">
            {t('hero.desc')}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#cadastro">{t('hero.cta1')}</Button>
            <Button href="/termos/conta-business" variant="outline">{t('hero.cta2')}</Button>
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">{t('frentes.titulo')}</h2>
          <p className="text-gt-text-muted mb-12 max-w-2xl font-sans leading-relaxed">
            {t('frentes.desc')}
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
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">{t('beneficios.titulo')}</h2>
          <p className="text-gt-text-muted mb-12 max-w-2xl font-sans">
            {t('beneficios.desc')}
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
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">{t('comoFunciona.titulo')}</h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            {t('comoFunciona.desc')}
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
            <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">{t('precos.labelLancamento')}</p>
            <p className="text-sm text-gt-text-dim font-sans mb-2">
              De <span className="line-through">R$ 199,90/mês</span> por
            </p>
            <div className="flex items-baseline justify-center gap-3 mb-3">
              <span className="text-base text-gt-text-muted font-sans">a partir de</span>
              <span className="font-display text-6xl md:text-7xl text-gt-text uppercase tracking-display">R$ 99,90</span>
              <span className="text-base text-gt-text-muted font-sans">por mês</span>
            </div>
            <p className="text-sm text-gt-text-muted font-sans leading-relaxed mb-6 max-w-xl mx-auto">
              Plano base inclui 1 ponto destacado, até 15 produtos no Desapega e 1 perfil profissional + 6 expedições agendadas em Serviços. Quem entrar na lista de espera agora garante esse valor de lançamento quando a Conta Business abrir. Cancele a qualquer momento, sem multa.{' '}
              <a href="/termos/conta-business" className="text-gt-orange hover:underline">Ver política completa</a>.
            </p>
            <Button href="#cadastro">{t('precos.ctaListaEspera')}</Button>
          </div>

          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl text-gt-text mb-3">Add-ons e escalonamento</h3>
            <p className="text-gt-text-muted mb-8 font-sans leading-relaxed">
              O plano base cobre quem está começando. Conforme a operação cresce, você adiciona pacotes — direto no painel, sem precisar renegociar.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gt-bg rounded-lg p-6 border border-gt-border">
                <p className="text-xs uppercase tracking-wider text-gt-orange mb-3 font-sans font-medium">Produtos no Desapega</p>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans mb-4">
                  Plano base inclui até 15 produtos ativos. Precisa de mais? Cada pacote de 10 produtos sai por R$ 59,90/mês.
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
                  Plano base inclui 1 ponto destacado. Cada unidade adicional entra por só R$ 59,90 — 40% abaixo do valor cheio. Todas as suas unidades no radar de quem já decidiu passar pela região.
                </p>
                <table className="w-full text-sm font-sans">
                  <tbody>
                    <tr className="border-b border-gt-border">
                      <td className="py-2 text-gt-text">1 ponto (incluso)</td>
                      <td className="py-2 text-right text-gt-text font-medium">R$ 99,90</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gt-text-muted">Cada ponto extra</td>
                      <td className="py-2 text-right text-gt-text">+ R$ 59,90</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gt-text-dim mt-4 font-sans leading-relaxed">
                  Pontos extras valem pra unidades da mesma marca e categoria. Sem limite de quantas você pode destacar — cada uma no radar de quem está na estrada.
                </p>
              </div>

              <div className="bg-gt-bg rounded-lg p-6 border border-gt-border">
                <p className="text-xs uppercase tracking-wider text-gt-orange mb-3 font-sans font-medium">Expedições e perfis (Serviços)</p>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans mb-4">
                  Plano base inclui 1 perfil profissional + 6 expedições agendadas. As expedições ficam visíveis até a data passar e arquivam sozinhas. Precisa de mais? Cada pacote adiciona +5 expedições, e cada guia extra (multi-guia) sai por R$ 39,90.
                </p>
                <table className="w-full text-sm font-sans">
                  <tbody>
                    <tr className="border-b border-gt-border">
                      <td className="py-2 text-gt-text">1 perfil + 6 expedições</td>
                      <td className="py-2 text-right text-gt-text font-medium">R$ 99,90</td>
                    </tr>
                    <tr className="border-b border-gt-border">
                      <td className="py-2 text-gt-text-muted">Cada pacote +5 expedições</td>
                      <td className="py-2 text-right text-gt-text">+ R$ 49,90</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gt-text-muted">+1 perfil (multi-guia)</td>
                      <td className="py-2 text-right text-gt-text">+ R$ 39,90</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gt-text-dim mt-4 font-sans leading-relaxed">
                  Multi-guia é pra operações com mais de um condutor: cada guia ganha perfil próprio (nome, foto, especialidade), e todos compartilham o mesmo pool de expedições da conta — as expedições são contadas pela conta, não por guia. Verificação reforçada de identidade e atividade profissional (CADASTUR, MTUR ou similar) exigida para Serviços.
                </p>
              </div>
            </div>

            <p className="text-xs text-gt-text-dim mt-8 font-sans leading-relaxed text-center">
              Pra agências de turismo com muitos guias ou modelos customizados, fale com a gente em <a href="mailto:business@gtoverlander.com.br" className="text-gt-orange hover:underline">business@gtoverlander.com.br</a>.
            </p>
          </div>
        </div>
      </section>

      <section id="cadastro" className="bg-gt-card py-16 md:py-24 border-t border-gt-border scroll-mt-20">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">{t('cadastro.label')}</p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">{t('cadastro.titulo')}</h2>
          <p className="text-gt-text-muted mb-10 font-sans leading-relaxed">
            {t('cadastro.desc')}
          </p>
          <BusinessLeadForm />
        </div>
      </section>
    </>
  );
}
