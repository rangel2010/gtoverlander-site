import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Button } from '../ui/button';

export async function Hero() {
  const t = await getTranslations('home.hero');
  const tc = await getTranslations('common');

  return (
    <section className="dark bg-gt-bg-elevated text-gt-text relative overflow-hidden">
      <div className="container-wide grid md:grid-cols-2 gap-10 md:gap-12 items-center py-16 md:py-24 lg:py-28 relative">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-5 font-sans">
            {t('tagline')}
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 max-w-2xl">
            {t('titulo')}{' '}
            <span className="text-gt-orange">{t('tituloDestaque')}</span>
          </h1>

          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed max-w-md mb-8 font-sans">
            {t('desc')}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="/baixar">{tc('baixarGratis')}</Button>
            <Button href="#como-funciona" variant="secondary">
              {t('ctaVerComo')}
            </Button>
          </div>

          <p className="text-[11px] uppercase tracking-[0.15em] text-gt-text-dim mt-8 font-sans">
            {t('plataformas')}
          </p>
        </div>

        {/* Reserva espaço explícito pra evitar CLS — 338x640 = proporção 846x1600 cortada em max-h-640 */}
        <div className="hidden md:flex justify-center items-center h-[640px]">
          <Image
            src="/images/screenshots/app-home.jpg"
            alt={t('appAlt')}
            width={338}
            height={640}
            priority
            sizes="(max-width: 1280px) 338px, 338px"
            className="rounded-3xl border border-gt-border shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
