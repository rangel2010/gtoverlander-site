import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/scroll-reveal';

export async function RecursosDisponiveis() {
  const t = await getTranslations('home.recursos');

  const items = [
    { titulo: t('r1titulo'), desc: t('r1desc'), href: '/recursos/roteiros-ia' },
    { titulo: t('r2titulo'), desc: t('r2desc'), href: '/recursos/waypoints' },
    { titulo: t('r3titulo'), desc: t('r3desc'), href: '/recursos/help-overlander' },
    { titulo: t('r4titulo'), desc: t('r4desc'), href: '/recursos/gt-social' },
    { titulo: t('r5titulo'), desc: t('r5desc'), href: '/recursos/explorer' },
    { titulo: t('r6titulo'), desc: t('r6desc'), href: '/recursos/desapega' },
  ];

  return (
    <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
      <div className="container-wide">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
            {t('label')}
          </p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-12">
            {t('titulo')}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((i, idx) => (
            <ScrollReveal key={i.href} delay={idx * 80}>
              <Link
                href={i.href}
                className="block bg-gt-bg rounded-lg p-7 md:p-8 border border-gt-border hover:border-gt-orange transition-colors group h-full"
              >
                <h3 className="text-xl md:text-2xl text-gt-text mb-3 group-hover:text-gt-orange transition-colors">
                  {i.titulo}
                </h3>
                <p className="text-sm text-gt-text-muted leading-relaxed mb-5 font-sans">
                  {i.desc}
                </p>
                <span className="text-gt-orange text-sm font-medium font-sans">
                  {t('saibaMais')}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
