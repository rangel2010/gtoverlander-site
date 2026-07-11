import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/scroll-reveal';

export async function PilarEncontre() {
  const t = await getTranslations('home.pilarEncontre');

  const features = [t('f1'), t('f2'), t('f3'), t('f4')];

  return (
    <section className="bg-gt-bg py-20 md:py-28 border-t border-gt-border overflow-hidden">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Visual — DOM primeiro (mobile: acima do texto), desktop: coluna esquerda */}
          <ScrollReveal delay={120} className="md:order-1">
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                {/* Glow decorativo */}
                <div className="absolute inset-0 bg-gt-orange/15 rounded-3xl blur-3xl scale-110 pointer-events-none" />
                <div className="relative rounded-3xl overflow-hidden border border-gt-border shadow-2xl w-[260px] md:w-[290px]">
                  <Image
                    src="/images/screenshots/app-radar.jpg"
                    alt={t('imgAlt')}
                    width={290}
                    height={580}
                    className="w-full h-auto"
                    sizes="(max-width: 768px) 260px, 290px"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Texto — DOM segundo (mobile: abaixo do visual), desktop: coluna direita */}
          <ScrollReveal className="md:order-2 order-first">
            <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-4 font-sans">
              {t('label')}
            </p>
            <h2 className="text-4xl md:text-5xl text-gt-text mb-5 leading-tight">
              {t('titulo')}
            </h2>
            <p className="text-gt-text-muted leading-relaxed mb-8 font-sans max-w-md">
              {t('desc')}
            </p>
            <ul className="space-y-3.5 mb-10">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 font-sans">
                  <span className="text-gt-orange mt-0.5 flex-shrink-0 font-medium">→</span>
                  <span className="text-gt-text text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/recursos/waypoints"
              className="inline-flex items-center gap-2 text-gt-orange text-sm font-medium hover:underline font-sans transition-opacity hover:opacity-80"
            >
              {t('cta')}
            </Link>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
