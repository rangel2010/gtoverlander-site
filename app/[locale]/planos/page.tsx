import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { FeatureFaq } from '@/components/sections/feature-faq';
import { PlansCards } from '@/components/sections/plans-cards';
import { productPlansLd, jsonLdScriptProps, getPageAlternates } from '@/lib/seo';
import { ScrollReveal } from '@/components/scroll-reveal';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const titles: Record<string, string> = {
    pt: 'Planos',
    en: 'Plans',
    es: 'Planes',
  };
  const descs: Record<string, string> = {
    pt: 'Free pra começar. Plus pra quem viaja com frequência. Pro pra quem não para. A partir de R$ 14,90/mês ou R$ 79,90/ano.',
    en: 'Free to start. Plus for frequent travelers. Pro for those who never stop. Plans for every overlander.',
    es: 'Gratis para empezar. Plus para viajeros frecuentes. Pro para quienes nunca paran. Planes para cada overlander.',
  };
  return {
    title: titles[locale] ?? titles.pt,
    description: descs[locale] ?? descs.pt,
    alternates: getPageAlternates(locale, '/planos'),
  };
}

interface PlanFeature {
  label: string;
  values: [string | boolean, string | boolean, string | boolean];
}

function FeatureValue({ value }: { value: string | boolean }) {
  if (value === true) return <span className="text-gt-orange">✓</span>;
  if (value === false) return <span className="text-gt-text-dim">—</span>;
  return <span className="text-sm text-gt-text font-sans">{value}</span>;
}

export default async function PlanosPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('planos');
  const tc = await getTranslations('common');

  const features: PlanFeature[] = [
    { label: t('comparacao.f1l'), values: [t('comparacao.f1v0'), t('comparacao.f1v1'), t('comparacao.f1v2')] },
    { label: t('comparacao.f2l'), values: [t('comparacao.f2v0'), t('comparacao.f2v1'), t('comparacao.f2v2')] },
    { label: t('comparacao.f3l'), values: [t('comparacao.f3v0'), t('comparacao.f3v1'), t('comparacao.f3v2')] },
    { label: t('comparacao.f4l'), values: [true, true, true] },
    { label: t('comparacao.f5l'), values: [true, true, true] },
    { label: t('comparacao.f6l'), values: [true, true, true] },
    { label: t('comparacao.f7l'), values: [true, true, true] },
    { label: t('comparacao.f8l'), values: [false, true, true] },
    { label: t('comparacao.f9l'), values: [true, true, true] },
    { label: t('comparacao.f10l'), values: [false, true, true] },
    { label: t('comparacao.f11l'), values: [false, true, true] },
    { label: t('comparacao.f12l'), values: [false, true, true] },
    { label: t('comparacao.f13l'), values: [false, true, true] },
    { label: t('comparacao.f14l'), values: [true, true, true] },
    { label: t('comparacao.f15l'), values: [false, true, true] },
    { label: t('comparacao.f16l'), values: [t('comparacao.f16v0'), t('comparacao.f16v1'), t('comparacao.f16v2')] },
  ];

  const faq = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  return (
    <>
      <script {...jsonLdScriptProps(productPlansLd())} />

      <section className="dark bg-gt-bg-elevated text-gt-text">
        <div className="container-wide py-16 md:py-20 max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-5">
            {t('hero.titulo')}
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans">
            {t('hero.desc')}
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <ScrollReveal>
            <PlansCards />
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-3">{t('comparacao.titulo')}</h2>
            <p className="text-gt-text-muted mb-10 max-w-xl font-sans">
              {t('comparacao.desc')}
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-x-auto bg-gt-bg rounded-lg border border-gt-border">
              <table className="w-full border-collapse min-w-[640px] font-sans">
                <thead>
                  <tr className="border-b border-gt-border-strong">
                    <th className="text-left py-4 px-5 text-sm font-medium text-gt-text-muted">{t('comparacao.thRecursos')}</th>
                    <th className="text-center py-4 px-3 text-sm font-medium text-gt-text w-[18%]">Free</th>
                    <th className="text-center py-4 px-3 text-sm font-medium text-gt-text w-[20%] bg-gt-card">Plus</th>
                    <th className="text-center py-4 px-3 text-sm font-medium text-gt-text w-[18%]">Pro</th>
                  </tr>
                  <tr className="border-b border-gt-border text-xs text-gt-text-muted">
                    <td className="py-3 px-5">{t('comparacao.thMensal')}</td>
                    <td className="text-center py-3 px-3">R$ 0</td>
                    <td className="text-center py-3 px-3 bg-gt-card">R$ 14,90</td>
                    <td className="text-center py-3 px-3">R$ 19,90</td>
                  </tr>
                  <tr className="border-b border-gt-border text-xs text-gt-text-muted">
                    <td className="py-3 px-5">{t('comparacao.thAnual')}</td>
                    <td className="text-center py-3 px-3">—</td>
                    <td className="text-center py-3 px-3 bg-gt-card">R$ 79,90</td>
                    <td className="text-center py-3 px-3">R$ 99,90</td>
                  </tr>
                </thead>
                <tbody>
                  {features.map((f) => (
                    <tr key={f.label} className="border-b border-gt-border last:border-b-0">
                      <td className="py-4 px-5 text-sm text-gt-text">{f.label}</td>
                      <td className="text-center py-4 px-3"><FeatureValue value={f.values[0]} /></td>
                      <td className="text-center py-4 px-3 bg-gt-card"><FeatureValue value={f.values[1]} /></td>
                      <td className="text-center py-4 px-3"><FeatureValue value={f.values[2]} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <ScrollReveal>
            <div className="max-w-2xl mb-10">
              <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
                {t('business.label')}
              </p>
              <h2 className="text-3xl md:text-4xl text-gt-text mb-4 leading-tight">{t('business.titulo')}</h2>
              <p className="text-gt-text-muted font-sans leading-relaxed">
                {t('business.desc')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <ScrollReveal delay={0}>
              <div className="bg-gt-card rounded-lg p-6 border border-gt-border">
                <p className="text-xs uppercase tracking-wider text-gt-orange mb-3 font-sans font-medium">{t('business.w_tag')}</p>
                <h3 className="font-sans text-lg font-medium text-gt-text mb-2 normal-case">{t('business.w_titulo')}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{t('business.w_desc')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="bg-gt-card rounded-lg p-6 border border-gt-border">
                <p className="text-xs uppercase tracking-wider text-gt-orange mb-3 font-sans font-medium">{t('business.p_tag')}</p>
                <h3 className="font-sans text-lg font-medium text-gt-text mb-2 normal-case">{t('business.p_titulo')}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{t('business.p_desc')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="bg-gt-card rounded-lg p-6 border border-gt-border">
                <p className="text-xs uppercase tracking-wider text-gt-orange mb-3 font-sans font-medium">{t('business.s_tag')}</p>
                <h3 className="font-sans text-lg font-medium text-gt-text mb-2 normal-case">{t('business.s_titulo')}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{t('business.s_desc')}</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="bg-gt-card border border-gt-border rounded-lg p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
              <div className="flex-1">
                <p className="text-xs text-gt-text-dim font-sans mb-1">
                  {t('business.pricing_from')}{' '}
                  <span className="line-through">R$ 199,90/{t('business.pricing_per_month')}</span>{' '}
                  {t('business.pricing_by')}
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm text-gt-text-muted font-sans">{t('business.pricing_starting')}</span>
                  <span className="font-display text-5xl text-gt-text uppercase tracking-display">R$ 99,90</span>
                  <span className="text-sm text-gt-text-muted font-sans">{t('business.pricing_per_month')}</span>
                </div>
                <p className="text-sm text-gt-text-muted font-sans leading-relaxed">
                  {t('business.pricing')}{' '}
                  <a href="/empresas#precos" className="text-gt-orange hover:underline">{t('business.verTabela')}</a> ·{' '}
                  <a href="/termos/conta-business" className="text-gt-orange hover:underline">{t('business.verPolitica')}</a>.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <Button href="/empresas" className="w-full md:w-auto">{t('business.cta')}</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FeatureFaq items={faq} />

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-4">{t('cta.titulo')}</h2>
            <p className="text-gt-text-muted mb-8 font-sans">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button href="/baixar">{tc('baixarGratis')}</Button>
       
              <Button href="/contato" variant="outline">{t('cta.ctaFalar')}</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
