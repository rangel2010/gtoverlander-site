import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SupportForm } from '@/components/sections/support-form';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Suporte',
    description:
    'Centro de ajuda do GT Overlander. Tópicos populares, FAQ aprofundado e abertura de ticket — pra resolver seu problema rápido.',
    alternates: getPageAlternates(locale, '/suporte'),
  };
}

export default async function SuportePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('suporte');

  const topicosPopulares = [
    { titulo: t('topicos.t1t'), desc: t('topicos.t1d') },
    { titulo: t('topicos.t2t'), desc: t('topicos.t2d') },
    { titulo: t('topicos.t3t'), desc: t('topicos.t3d') },
    { titulo: t('topicos.t4t'), desc: t('topicos.t4d') },
    { titulo: t('topicos.t5t'), desc: t('topicos.t5d') },
    { titulo: t('topicos.t6t'), desc: t('topicos.t6d') },
  ];

  const faqAprofundado = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  return (
    <>
      <section className="dark bg-gt-bg-elevated text-gt-text">
        <div className="container-wide py-16 md:py-20 max-w-3xl">
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-5">
            {t('hero.titulo')}
          </h1>
          <p className="text-base md:text-lg text-gt-text-muted leading-relaxed font-sans">
            {t('hero.desc')}
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            {t('topicos.titulo')}
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            {t('topicos.desc')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicosPopulares.map((tp) => (
              <div
                key={tp.titulo}
                className="bg-gt-card rounded-lg p-5 border border-gt-border"
              >
                <h3 className="font-sans font-medium text-gt-text mb-2 normal-case">
                  {tp.titulo}
                </h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                  {tp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            {t('faq.titulo')}
          </h2>
          <p className="text-gt-text-muted mb-10 font-sans">
            {t('faq.desc')}
          </p>

          <div className="space-y-3">
            {faqAprofundado.map((p, i) => (
              <details
                key={i}
                className="group bg-gt-bg border border-gt-border rounded-lg overflow-hidden"
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

          <p className="text-sm text-gt-text-muted mt-8 font-sans">
            {t('faq.rodapeTexto')}{' '}
            <Link href="/faq" className="text-gt-orange hover:underline">
              {t('faq.verFaq')}
            </Link>{' '}
            {t('faq.rodapeLink')}
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">
            {t('ticket.label')}
          </p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            {t('ticket.titulo')}
          </h2>
          <p className="text-gt-text-muted mb-10 font-sans">
            {t('ticket.desc')}
          </p>

          <SupportForm />

          <p className="text-xs text-gt-text-dim mt-8 font-sans">
            {t('ticket.rodape')}
          </p>
        </div>
      </section>
    </>
  );
}
