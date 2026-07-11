import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { aboutPagePersonLd, jsonLdScriptProps,
  getPageAlternates
} from '@/lib/seo';
import { ScrollReveal } from '@/components/scroll-reveal';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Sobre',
    description:
    'O GT Overlander é o único ecossistema feito de ponta a ponta para quem viaja por terra — une planejamento com IA, waypoints curados e comunidade.',
    alternates: getPageAlternates(locale, '/sobre'),
  };
}

export default async function SobrePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('sobre');
  const tc = await getTranslations('common');

  const numeros = [
    { valor: t('numeros.n1v'), contexto: t('numeros.n1c') },
    { valor: t('numeros.n2v'), contexto: t('numeros.n2c') },
    { valor: t('numeros.n3v'), contexto: t('numeros.n3c') },
    { valor: t('numeros.n4v'), contexto: t('numeros.n4c') },
  ];

  const proximas = [
    { titulo: t('proximas.p1t'), desc: t('proximas.p1d') },
    { titulo: t('proximas.p2t'), desc: t('proximas.p2d') },
    { titulo: t('proximas.p3t'), desc: t('proximas.p3d') },
    { titulo: t('proximas.p4t'), desc: t('proximas.p4d') },
  ];

  return (
    <>
      {/* Schema.org AboutPage + Person */}
      <script {...jsonLdScriptProps(aboutPagePersonLd())} />

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
        <div className="container-narrow">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-6">
              {t('missao.titulo')}
            </h2>
            <p className="text-gt-text leading-relaxed mb-5 font-sans">{t('missao.p1')}</p>
            <p className="text-gt-text leading-relaxed mb-5 font-sans">{t('missao.p2')}</p>
            <p className="text-gt-text leading-relaxed font-sans">{t('missao.p3')}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-12">
              {t('fundador.titulo')}
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">
            <ScrollReveal delay={80}>
              <div className="aspect-square bg-gt-bg rounded-lg overflow-hidden border border-gt-border relative">
                <Image
                  src="/images/rangel-e-esposa.jpg"
                  alt={t('fundador.imgAlt')}
                  fill
                  sizes="320px"
                  className="object-cover"
                  style={{ objectPosition: 'center 25%' }}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <div>
                <h3 className="font-sans text-xl font-medium text-gt-text mb-2 normal-case">
                  {t('fundador.nome')}
                </h3>
                <p className="text-sm text-gt-orange mb-5 uppercase tracking-wider font-sans">
                  {t('fundador.cargo')}
                </p>
                <p className="text-gt-text leading-relaxed mb-4 font-sans">{t('fundador.p1')}</p>
                <p className="text-gt-text leading-relaxed font-sans">{t('fundador.p2')}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-6">
              {t('comunidade.titulo')}
            </h2>
            <p className="text-gt-text leading-relaxed mb-5 font-sans">{t('comunidade.p1')}</p>
            <p className="text-gt-text leading-relaxed mb-5 font-sans">{t('comunidade.p2')}</p>
            <p className="text-gt-text leading-relaxed font-sans">{t('comunidade.p3')}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-12">
              {t('numeros.titulo')}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {numeros.map((n, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div>
                  <div className="font-display text-4xl md:text-5xl text-gt-text mb-2 uppercase tracking-display">
                    {n.valor}
                  </div>
                  <p className="text-sm text-gt-text-muted leading-snug font-sans">
                    {n.contexto}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-sm text-gt-text-muted mt-10 font-sans">
            {t('numeros.rodape')}
          </p>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
              {t('proximas.titulo')}
            </h2>
            <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
              {t('proximas.desc')}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {proximas.map((p, idx) => (
              <ScrollReveal key={p.titulo} delay={idx * 80}>
                <div
                  className="bg-gt-card rounded-lg p-6 border border-gt-border"
                >
                  <h3 className="font-sans font-medium text-gt-text mb-2 normal-case">
                    {p.titulo}
                  </h3>
                  <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gt-text mb-4">
              {t('cta.titulo')}
            </h2>
            <p className="text-gt-text-muted mb-8 max-w-md mx-auto font-sans">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button href="/baixar">{tc('baixarGratis')}</Button>
              <Button href="/empresas" variant="outline">
                {t('cta.ctaBusiness')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
