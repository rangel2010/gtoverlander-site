import { getTranslations } from 'next-intl/server';
import { Button } from '../ui/button';
import { ScrollReveal } from '@/components/scroll-reveal';
import { WaveDivider } from '@/components/wave-divider';

export async function EmpresasTeaser() {
  const t = await getTranslations('home.empresas');

  return (
    <section className="relative bg-gt-card py-16 md:py-20">
      <WaveDivider fill="gt-card" />

      <div className="container-wide">
        <ScrollReveal>
          <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">{t('label')}</p>
              <h2 className="text-3xl md:text-4xl text-gt-text mb-4 leading-tight">{t('titulo')}</h2>
              <p className="text-gt-text-muted leading-relaxed max-w-xl font-sans">{t('desc')}</p>
            </div>
            <div className="md:text-right">
              <Button href="/empresas" variant="secondary">{t('cta')}</Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
