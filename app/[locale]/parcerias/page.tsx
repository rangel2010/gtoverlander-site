import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PartnershipForm } from '@/components/sections/partnership-form';

export const metadata: Metadata = {
  title: 'Parcerias',
  description:
    'Criadores, marcas e serviços de viagem que sustentam o ecossistema overlander. Afiliados, embaixadores, co-marketing e integrações.',
};

export default async function ParceriasPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('parcerias');

  const categorias = [
    { titulo: t('quem.c1t'), desc: t('quem.c1d'), exemplos: t('quem.c1e') },
    { titulo: t('quem.c2t'), desc: t('quem.c2d'), exemplos: t('quem.c2e') },
    { titulo: t('quem.c3t'), desc: t('quem.c3d'), exemplos: t('quem.c3e') },
  ];

  const oferta = [
    { titulo: t('oferta.o1t'), desc: t('oferta.o1d') },
    { titulo: t('oferta.o2t'), desc: t('oferta.o2d') },
    { titulo: t('oferta.o3t'), desc: t('oferta.o3d') },
    { titulo: t('oferta.o4t'), desc: t('oferta.o4d') },
  ];

  const formatos = [
    { titulo: t('formatos.f1t'), desc: t('formatos.f1d') },
    { titulo: t('formatos.f2t'), desc: t('formatos.f2d') },
    { titulo: t('formatos.f3t'), desc: t('formatos.f3d') },
    { titulo: t('formatos.f4t'), desc: t('formatos.f4d') },
    { titulo: t('formatos.f5t'), desc: t('formatos.f5d') },
  ];

  return (
    <>
      <section className="dark bg-gt-bg-elevated text-gt-text">
        <div className="container-wide py-16 md:py-24 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-5 font-sans">
            {t('hero.label')}
          </p>
          <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">
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
            {t('quem.titulo')}
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            {t('quem.desc')}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {categorias.map((c) => (
              <div
                key={c.titulo}
                className="bg-gt-card rounded-lg p-7 border border-gt-border"
              >
                <h3 className="font-sans font-medium text-gt-text mb-3 normal-case text-lg">
                  {c.titulo}
                </h3>
                <p className="text-sm text-gt-text-muted leading-relaxed mb-4 font-sans">
                  {c.desc}
                </p>
                <p className="text-xs uppercase tracking-wider text-gt-orange/80 font-sans">
                  {c.exemplos}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            {t('oferta.titulo')}
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            {t('oferta.desc')}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {oferta.map((o) => (
              <div
                key={o.titulo}
                className="bg-gt-bg rounded-lg p-6 border border-gt-border"
              >
                <h3 className="font-sans font-medium text-gt-text mb-3 normal-case">
                  {o.titulo}
                </h3>
                <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                  {o.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            {t('formatos.titulo')}
          </h2>
          <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
            {t('formatos.desc')}
          </p>

          <div className="space-y-3">
            {formatos.map((f, i) => (
              <details
                key={i}
                className="group bg-gt-card border border-gt-border rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                  <span className="font-sans font-medium text-gt-text pr-4">
                    {f.titulo}
                  </span>
                  <span className="text-gt-orange flex-shrink-0 text-xl leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gt-text-muted leading-relaxed font-sans">
                  {f.desc}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-24 border-t border-gt-border">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">
            {t('contato.label')}
          </p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
            {t('contato.titulo')}
          </h2>
          <p className="text-gt-text-muted mb-10 font-sans">
            {t('contato.desc')}
          </p>

          <PartnershipForm />
        </div>
      </section>
    </>
  );
}
