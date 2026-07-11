import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Recursos',
    description:
    'Roteiros com IA, waypoints próprios, GT Social, Help Overlander, GT Explorer e GT Desapega. O ecossistema completo pra quem viaja por terra.',
    alternates: getPageAlternates(locale, '/recursos'),
  };
}

type FeatureStatus = 'disponivel' | 'em-breve';

interface Feature {
  slug: string;
  titulo: string;
  desc: string;
  status: FeatureStatus;
}

function FeatureCard({
  f,
  surface = 'bg',
  emBreve,
  saibaMais,
}: {
  f: Feature;
  surface?: 'bg' | 'card';
  emBreve: string;
  saibaMais: string;
}) {
  const cardBg = surface === 'card' ? 'bg-gt-bg' : 'bg-gt-card';
  return (
    <Link
      href={`/recursos/${f.slug}`}
      className={`${cardBg} rounded-lg p-7 md:p-8 border border-gt-border hover:border-gt-orange transition-colors group relative`}
    >
      {f.status === 'em-breve' && (
        <span className="absolute top-5 right-5 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded font-sans">
          {emBreve}
        </span>
      )}
      <h3 className="text-2xl md:text-3xl text-gt-text mb-3 group-hover:text-gt-orange transition-colors pr-24">
        {f.titulo}
      </h3>
      <p className="text-sm text-gt-text-muted leading-relaxed mb-5 font-sans">
        {f.desc}
      </p>
      <span className="text-gt-orange text-sm font-medium font-sans">
        {saibaMais}
      </span>
    </Link>
  );
}

export default async function RecursosPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('recursos');
  const tc = await getTranslations('common');

  const planejamento: Feature[] = [
    { slug: 'roteiros-ia', titulo: t('planejamento.r1t'), desc: t('planejamento.r1d'), status: 'disponivel' },
    { slug: 'waypoints', titulo: t('planejamento.r2t'), desc: t('planejamento.r2d'), status: 'disponivel' },
    { slug: 'modo-offline', titulo: t('planejamento.r3t'), desc: t('planejamento.r3d'), status: 'disponivel' },
  ];

  const comunidade: Feature[] = [
    { slug: 'gt-social', titulo: t('comunidade.r1t'), desc: t('comunidade.r1d'), status: 'em-breve' },
    { slug: 'help-overlander', titulo: t('comunidade.r2t'), desc: t('comunidade.r2d'), status: 'em-breve' },
    { slug: 'explorer', titulo: t('comunidade.r3t'), desc: t('comunidade.r3d'), status: 'em-breve' },
    { slug: 'desapega', titulo: t('comunidade.r4t'), desc: t('comunidade.r4d'), status: 'em-breve' },
  ];

  const emBreve = t('planejamento.emBreve');
  const saibaMais = t('planejamento.saibaMais');

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
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">
            {t('planejamento.label')}
          </p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-10 leading-tight">
            {t('planejamento.titulo')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {planejamento.map((f) => (
              <FeatureCard key={f.slug} f={f} surface="bg" emBreve={emBreve} saibaMais={saibaMais} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">
            {t('comunidade.label')}
          </p>
          <h2 className="text-3xl md:text-4xl text-gt-text mb-10 leading-tight">
            {t('comunidade.titulo')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {comunidade.map((f) => (
              <FeatureCard key={f.slug} f={f} surface="card" emBreve={emBreve} saibaMais={saibaMais} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl text-gt-text mb-4">
            {t('cta.titulo')}
          </h2>
          <p className="text-gt-text-muted mb-8 max-w-md mx-auto font-sans">
            {t('cta.desc')}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/baixar">{tc('baixarGratis')}</Button>
            <Button href="/planos" variant="outline">
              {tc('explorarPlanos')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
