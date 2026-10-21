import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { Button } from '../ui/button';
import { getStats, porExtenso } from '@/lib/stats';
import { MOSTRAR_WEBAPP } from '@/lib/product-config';

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
            {t(MOSTRAR_WEBAPP ? 'plataformas' : 'plataformasSemWeb')}
          </p>
        </div>

        {/* Celulares da V2 (21/10/2026): PNGs transparentes 680x1296 da
            campanha "telefone premium", convertidos para WebP (~90 KB cada).
            unoptimized: já vêm leves e assim não gastam a cota de
            transformação de imagem da Vercel. Proporção 680/1296 = 0,525:
            altura 600 -> largura 315; altura 545 -> 286; altura 440 -> 231.
            Se trocar a imagem, recalcular aqui (evita o layout pular).
            Computador: dois aparelhos (tela inicial na frente, ficha da Ruta
            40 atrás). Celular: só a tela inicial, abaixo do texto. */}
        <div className="hidden md:flex justify-center items-center h-[640px]">
          <div className="relative w-[530px] h-[620px] max-w-full">
            <Image
              src="/images/app/celular-rota-resumo.webp"
              alt=""
              width={286}
              height={545}
              unoptimized
              className="absolute right-0 top-0 h-[545px] w-auto"
            />
            <Image
              src="/images/app/celular-home.webp"
              alt={t('appAlt')}
              width={315}
              height={600}
              priority
              unoptimized
              className="absolute left-0 bottom-0 h-[600px] w-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
        <div className="md:hidden flex justify-center">
          <Image
            src="/images/app/celular-home.webp"
            alt={t('appAlt')}
            width={231}
            height={440}
            priority
            unoptimized
            className="h-[440px] w-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)]"
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
