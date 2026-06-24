import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/scroll-reveal';

export async function Numeros() {
  const t = await getTranslations('home.numeros');

  const stats = [
    { valor: t('s1valor'), contexto: t('s1ctx') },
    { valor: t('s2valor'), contexto: t('s2ctx') },
    { valor: t('s3valor'), contexto: t('s3ctx') },
    { valor: t('s4valor'), contexto: t('s4ctx') },
  ];

  return (
    <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
      <div className="container-wide">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            {t('label')}
          </p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-12">
            {t('titulo')}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="text-4xl md:text-5xl font-display uppercase tracking-display text-gt-text mb-2">
                {s.valor}
              </div>
              <p className="text-sm text-gt-text-muted leading-snug max-w-[180px] font-sans">
                {s.contexto}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <p className="text-xs text-gt-text-dim mt-10 md:mt-12 font-sans">
          {t('rodape')}
        </p>
      </div>
    </section>
  );
}
