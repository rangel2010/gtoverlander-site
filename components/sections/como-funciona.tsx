import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/scroll-reveal';

export async function ComoFunciona() {
  const t = await getTranslations('home.comoFunciona');

  const passos = [
    { num: 1, titulo: t('passo1titulo'), desc: t('passo1desc') },
    { num: 2, titulo: t('passo2titulo'), desc: t('passo2desc') },
    { num: 3, titulo: t('passo3titulo'), desc: t('passo3desc') },
    { num: 4, titulo: t('passo4titulo'), desc: t('passo4desc') },
  ];

  return (
    <section id="como-funciona" className="bg-gt-bg py-20 md:py-24 border-t border-gt-border">

      <div className="container-wide">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">{t('titulo')}</h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">{t('subtitulo')}</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-8 md:gap-6">
          {passos.map((p, i) => (
            <ScrollReveal key={p.num} delay={i * 120}>
              <div className="border-l-2 border-gt-orange pl-5">
                <div className="text-gt-orange font-medium text-sm mb-2 font-sans">
                  {p.num.toString().padStart(2, '0')}
                </div>
                <h3 className="text-lg text-gt-text mb-2 leading-snug">{p.titulo}</h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/recursos/roteiros-ia" className="text-gt-orange text-sm font-medium hover:underline font-sans">
            {t('verDemo')}
          </Link>
        </div>
      </div>
    </section>
  );
}
