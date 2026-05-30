import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { faqPageLd, jsonLdScriptProps } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Perguntas frequentes',
  description:
    'Dúvidas mais comuns sobre o GT Overlander — o app, como funciona, planos, conta e dados, Conta Business.',
};

export default async function FaqPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('faqPage');

  const categorias = [
    {
      titulo: t('cat1titulo'),
      perguntas: [
        { q: t('cat1q1'), a: t('cat1a1') },
        { q: t('cat1q2'), a: t('cat1a2') },
        { q: t('cat1q3'), a: t('cat1a3') },
        { q: t('cat1q4'), a: t('cat1a4') },
        { q: t('cat1q5'), a: t('cat1a5') },
      ],
    },
    {
      titulo: t('cat2titulo'),
      perguntas: [
        { q: t('cat2q1'), a: t('cat2a1') },
        { q: t('cat2q2'), a: t('cat2a2') },
        { q: t('cat2q3'), a: t('cat2a3') },
        { q: t('cat2q4'), a: t('cat2a4') },
      ],
    },
    {
      titulo: t('cat3titulo'),
      perguntas: [
        { q: t('cat3q1'), a: t('cat3a1') },
        { q: t('cat3q2'), a: t('cat3a2') },
        { q: t('cat3q3'), a: t('cat3a3') },
      ],
    },
    {
      titulo: t('cat4titulo'),
      perguntas: [
        { q: t('cat4q1'), a: t('cat4a1') },
        { q: t('cat4q2'), a: t('cat4a2') },
        { q: t('cat4q3'), a: t('cat4a3') },
      ],
    },
    {
      titulo: t('cat5titulo'),
      perguntas: [
        { q: t('cat5q1'), a: t('cat5a1') },
        { q: t('cat5q2'), a: t('cat5a2') },
      ],
    },
  ];

  // Achata todas as perguntas pra schema.org FAQPage
  const allQuestions = categorias.flatMap((cat) => cat.perguntas);

  return (
    <>
      {/* Schema.org FAQPage — pode aparecer como rich snippet no Google */}
      <script {...jsonLdScriptProps(faqPageLd(allQuestions))} />

      <section className="dark bg-gt-bg-elevated text-gt-text">
        <div className="container-wide py-12 md:py-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl leading-[1.05] mb-3">
            {t('hero.titulo')}
          </h1>
          <p className="text-base text-gt-text-muted font-sans">
            {t('hero.desc')}{' '}
            <Link
              href="/contato"
              className="text-gt-text underline underline-offset-4 hover:text-gt-orange"
            >
              {t('hero.descLink')}
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-12 md:py-16 border-t border-gt-border">
        <div className="container-narrow space-y-10">
          {categorias.map((cat) => (
            <div key={cat.titulo}>
              <h2 className="text-2xl md:text-3xl text-gt-text mb-5 pb-3 border-b border-gt-border">
                {cat.titulo}
              </h2>
              <div className="space-y-3">
                {cat.perguntas.map((p, i) => (
                  <details
                    key={i}
                    className="group bg-gt-card border border-gt-border rounded-lg overflow-hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                      <span className="font-sans font-medium text-gt-text pr-4">
                        {p.q}
                      </span>
                      <span className="text-gt-orange flex-shrink-0 text-xl leading-none transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-gt-text-muted leading-relaxed font-sans">
                      {p.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gt-card py-12 md:py-16 border-t border-gt-border">
        <div className="container-narrow text-center">
          <h2 className="text-2xl md:text-3xl text-gt-text mb-3">
            {t('cta.titulo')}
          </h2>
          <p className="text-gt-text-muted mb-6 font-sans">
            {t('cta.desc')}
          </p>
          <Button href="/contato" variant="secondary">
            {t('cta.btn')}
          </Button>
        </div>
      </section>
    </>
  );
}
