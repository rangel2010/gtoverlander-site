import { getTranslations } from 'next-intl/server';
import { Button } from '../ui/button';
import { ScrollReveal } from '@/components/scroll-reveal';
import { WaveDivider } from '@/components/wave-divider';

export async function CtaFinal() {
  const t = await getTranslations('home.ctaFinal');
  const tc = await getTranslations('common');

  return (
    <section className="relative bg-gt-bg py-20 md:py-28">
      <WaveDivider fill="gt-bg" />

      <div className="container-narrow text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl text-gt-text mb-4 leading-[0.95]">{t('titulo')}</h2>
          <p className="text-gt-text-muted mb-10 max-w-md mx-auto leading-relaxed font-sans">{t('subtitulo')}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/baixar">{tc('baixarGratis')}</Button>
            <Button href="/planos" variant="outline">{t('ctaPlanos')}</Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
