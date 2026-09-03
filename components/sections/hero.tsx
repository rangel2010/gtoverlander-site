import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { Button } from '../ui/button';
import { getStats, porExtenso } from '@/lib/stats';

export async function Hero() {
  const t = await getTranslations('home.hero');
  const ts = await getTranslations('home.stats');
  const tc = await getTranslations('common');

  // Números vivos da API do app — mesma fonte do /sobre.
  // Ver lib/stats.ts (países é o único fixo, e o porquê está lá).
  const locale = await getLocale();
  const stats = await getStats();
  const nf = new Intl.NumberFormat(locale);

  const faixa = [
    { valor: nf.format(stats.usuarios), label: ts('usuarios') },
    { valor: nf.format(stats.rotasCriadas), label: ts('rotas') },
    { valor: porExtenso(stats.waypoints, locale), label: ts('waypoints') },
    { valor: nf.format(stats.paises), label: ts('paises') },
  ];

  return (
    <section className="dark bg-gt-bg-elevated text-gt-text relative overflow-hidden">
      <div className="container-wide grid md:grid-cols-2 gap-10 md:gap-12 items-center py-16 md:py-24 lg:py-28 relative">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-5 font-sans">
            {t('tagline')}
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 max-w-2xl">
            {t('titulo')}{' '}
            <span className="text-gt-orange-text">{t('tituloDestaque')}</span>
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

          {/* text-muted (não dim): sobre o verde do hero, o dim dá contraste
              2,76:1 e reprova no WCAG AA. O muted sobe pra 5,37:1. */}
          <p className="text-[11px] uppercase tracking-[0.15em] text-gt-text-muted mt-8 font-sans">
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

      {/* Faixa de números reais, lidos da API do app. Fica no rodapé do hero,
          full-width, pra não espremer a coluna de texto. text-muted nos rótulos
          pelo mesmo motivo do parágrafo de plataformas: sobre o verde do hero,
          o dim reprova no WCAG AA. */}
      <div className="container-wide border-t border-gt-border pb-12 md:pb-14">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 pt-8 md:pt-10">
          {faixa.map((n) => (
            <div key={n.label}>
              <dt className="sr-only">{n.label}</dt>
              <dd>
                <span className="block font-display text-3xl md:text-4xl text-gt-text uppercase tracking-display">
                  {n.valor}
                </span>
                <span className="block text-xs md:text-sm text-gt-text-muted leading-snug mt-1 font-sans">
                  {n.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
