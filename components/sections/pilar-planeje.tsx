import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/scroll-reveal';

export async function PilarPlaneje() {
  const t = await getTranslations('home.pilarPlaneje');

  const features = [t('f1'), t('f2'), t('f3'), t('f4')];

  return (
    <section className="bg-gt-card py-20 md:py-28 border-t border-gt-border overflow-hidden">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

          {/* Visual — esquerda (igual ao Pilar 2) */}
          <ScrollReveal delay={120} className="flex-shrink-0 order-first md:order-none">
            <div className="relative">
              <div className="absolute inset-0 bg-gt-orange/15 rounded-3xl blur-3xl scale-110 pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden border border-gt-border shadow-2xl w-[230px] md:w-[250px]">
                <video
                  src="/images/screenshots/app-rotas.mp4"
                  poster="/images/screenshots/app-chat-mapa.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Texto */}
          <ScrollReveal className="flex-1 min-w-0">
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
              href="/recursos/roteiros-ia"
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
