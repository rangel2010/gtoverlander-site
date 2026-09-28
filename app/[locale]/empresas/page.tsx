import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { setRequestLocale, getTranslations, getLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/scroll-reveal';
import { BUSINESS_SIGNUP_URL } from '@/lib/product-config';
import { getStats, porExtenso } from '@/lib/stats';

/**
 * Conta Business (reescrita em 28/09/2026, a partir da instrução
 * "lp-conta-business.md" batida pelo Rangel).
 *
 * A página CONVIDA o empresário a entrar — não vende. Regras que não se
 * negociam aqui:
 *  - nada de preço, "a partir de", planos ou faixa;
 *  - nada de "grátis" nem "cortesia" (diga o que ele ganha, não o que custa);
 *  - nada de aprovação, prazo de análise ou CNPJ na entrada;
 *  - nenhum limite de quantidade (muda no produto sem reescrever a página);
 *  - nenhum número escrito à mão: os números vêm do servidor (getStats).
 *
 * O formulário de lista de espera saiu junto (components/sections/
 * business-lead-form.tsx e /api/leads/business ficaram no repositório, sem uso).
 */

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'empresas.meta' });
  return {
    title: { absolute: t('titulo') },
    description: t('desc'),
    alternates: getPageAlternates(locale, '/empresas'),
  };
}

export const revalidate = 3600;

export default async function EmpresasPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('empresas');
  const ts = await getTranslations('home.stats');
  const loc = await getLocale();
  const stats = await getStats();
  const nf = new Intl.NumberFormat(loc);

  const frentes = [
    { tag: t('frentes.f1tag'), titulo: t('frentes.f1titulo'), desc: t('frentes.f1desc') },
    { tag: t('frentes.f2tag'), titulo: t('frentes.f2titulo'), desc: t('frentes.f2desc') },
    { tag: t('frentes.f3tag'), titulo: t('frentes.f3titulo'), desc: t('frentes.f3desc') },
  ];

  const aoEntrar = [t('aoEntrar.i1'), t('aoEntrar.i2'), t('aoEntrar.i3'), t('aoEntrar.i4')];

  const metricas = [t('metricas.m1'), t('metricas.m2'), t('metricas.m3')];

  const passos = [
    { num: 1, titulo: t('comoFunciona.p1t'), desc: t('comoFunciona.p1d') },
    { num: 2, titulo: t('comoFunciona.p2t'), desc: t('comoFunciona.p2d') },
    { num: 3, titulo: t('comoFunciona.p3t'), desc: t('comoFunciona.p3d') },
    { num: 4, titulo: t('comoFunciona.p4t'), desc: t('comoFunciona.p4d') },
  ];

  const numeros = [
    { valor: porExtenso(stats.waypoints, loc), label: ts('waypoints') },
    { valor: nf.format(stats.paises), label: ts('paises') },
    { valor: nf.format(stats.rotasCriadas), label: ts('rotas') },
    { valor: nf.format(stats.usuarios), label: ts('usuarios') },
  ];

  const cta = (
    <Button href={BUSINESS_SIGNUP_URL} external size="lg">
      {t('cta')}
    </Button>
  );

  return (
    <>
      {/* 1 · Herói — uma promessa, um botão */}
      <section className="dark bg-gt-bg-elevated text-gt-text">
        <div className="container-narrow py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange-text mb-5 font-sans">
            {t('hero.label')}
          </p>
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">{t('hero.titulo')}</h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed max-w-xl mb-10 font-sans">
            {t('hero.desc')}
          </p>
          {cta}
        </div>
      </section>

      {/* 2 · As três frentes, com nome de gente */}
      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-10">{t('frentes.titulo')}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {frentes.map((f, i) => (
              <ScrollReveal key={f.tag} delay={i * 80}>
                <div className="bg-gt-card rounded-lg p-7 border border-gt-border h-full">
                  <p className="text-xs uppercase tracking-wider text-gt-orange-text mb-3 font-sans font-medium">{f.tag}</p>
                  <h3 className="font-sans text-lg font-medium text-gt-text mb-3 normal-case">{f.titulo}</h3>
                  <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · O que ele faz assim que entra */}
      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-8">{t('aoEntrar.titulo')}</h2>
          </ScrollReveal>
          <ul className="space-y-4">
            {aoEntrar.map((item) => (
              <li key={item} className="flex gap-3 font-sans text-gt-text leading-relaxed">
                <span className="text-gt-orange-text mt-0.5" aria-hidden>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 · Métricas — o argumento central, com bloco próprio */}
      <section className="dark bg-gt-bg-elevated text-gt-text py-16 md:py-24">
        <div className="container-narrow">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.18em] text-gt-orange-text mb-4 font-sans">{t('metricas.label')}</p>
            <h2 className="text-4xl md:text-5xl leading-tight mb-8">{t('metricas.titulo')}</h2>
          </ScrollReveal>
          <ul className="space-y-3 mb-8">
            {metricas.map((m) => (
              <li key={m} className="font-sans text-lg text-gt-text leading-relaxed border-l-2 border-gt-orange pl-4">{m}</li>
            ))}
          </ul>
          <p className="font-sans text-gt-text-muted leading-relaxed max-w-xl">{t('metricas.desc')}</p>
        </div>
      </section>

      {/* 5 · A frase que é a página inteira */}
      <section className="bg-gt-bg py-16 md:py-24 border-t border-gt-border">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl text-gt-text leading-tight mb-6">{t('frase.titulo')}</h2>
            <p className="font-sans text-gt-text-muted leading-relaxed max-w-xl mx-auto">{t('frase.desc')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* 6 · Como funciona — quatro passos, sem pagamento e sem validação */}
      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-12">{t('comoFunciona.titulo')}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {passos.map((p) => (
              <div key={p.num} className="border-l-2 border-gt-orange pl-5">
                <div className="text-gt-orange-text font-medium text-sm mb-2 font-sans">
                  {p.num.toString().padStart(2, '0')}
                </div>
                <h3 className="font-sans font-medium text-gt-text mb-2 leading-snug normal-case">{p.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · Prova, com número do servidor */}
      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-10">{t('numeros.titulo')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {numeros.map((n) => (
              <div key={n.label}>
                <p className="font-display text-4xl md:text-5xl text-gt-text uppercase tracking-display">{n.valor}</p>
                <p className="text-sm text-gt-text-muted font-sans mt-1">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · Fecho */}
      <section className="dark bg-gt-bg-elevated text-gt-text py-16 md:py-24">
        <div className="container-narrow text-center">
          <h2 className="text-4xl md:text-5xl leading-tight mb-8">{t('fecho.titulo')}</h2>
          {cta}
          <p className="text-sm text-gt-text-muted font-sans mt-8">
            <a href="/termos/conta-business" className="text-gt-orange-text hover:underline">{t('fecho.termos')}</a>
            {' · '}
            {t('fecho.duvidas')}{' '}
            <a href="mailto:business@gtoverlander.com.br" className="text-gt-orange-text hover:underline">business@gtoverlander.com.br</a>
          </p>
        </div>
      </section>
    </>
  );
}
