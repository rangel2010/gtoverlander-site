import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function PorqueGt() {
  const t = await getTranslations('home.porqueGt');

  return (
    <section className="bg-gt-card py-20 md:py-24 border-t border-gt-border">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl text-gt-text mb-8 leading-tight">
          {t('titulo')}
        </h2>

        <div className="space-y-5 text-gt-text leading-relaxed font-sans">
          <p>{t('p1')}</p>
          <p>{t('p2')}</p>
          <p>{t('p3')}</p>
          <p>{t('p4')}</p>
        </div>

        <div className="mt-10">
          <Link
            href="/sobre"
            className="text-gt-orange text-sm font-medium hover:underline font-sans"
          >
            {t('linkHistoria')}
          </Link>
        </div>
      </div>
    </section>
  );
}
