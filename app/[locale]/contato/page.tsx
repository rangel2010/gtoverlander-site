import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ContactForm } from '@/components/sections/contact-form';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Contato',
    description:
    'Fale com a equipe GT Overlander. Suporte, parcerias, imprensa, dúvidas comerciais — todos os canais reunidos numa só página.',
    alternates: getPageAlternates(locale, '/contato'),
  };
}

export default async function ContatoPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('contato');

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

      <section className="bg-gt-card py-16 md:py-20 border-t border-gt-border">
        <div className="container-wide">
          <div className="grid md:grid-cols-[1fr_320px] gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl text-gt-text mb-8">
                {t('form.titulo')}
              </h2>
              <ContactForm />
            </div>

            <aside className="space-y-8">
              <div>
                <h3 className="font-sans text-sm font-medium text-gt-text-muted uppercase tracking-wider mb-3">
                  {t('aside.canaisLabel')}
                </h3>
                <a
                  href="mailto:suporte@gtoverlander.com.br"
                  className="text-gt-text hover:text-gt-orange transition-colors font-sans block mb-1"
                >
                  suporte@gtoverlander.com.br
                </a>
                <p className="text-sm text-gt-text-muted font-sans">
                  {t('aside.emailDesc')}
                </p>
              </div>

              <div>
                <h3 className="font-sans text-sm font-medium text-gt-text-muted uppercase tracking-wider mb-3">
                  {t('aside.suporteLabel')}
                </h3>
                <Link
                  href="/suporte"
                  className="text-gt-text hover:text-gt-orange transition-colors font-sans block mb-1"
                >
                  {t('aside.suporteLink')}
                </Link>
                <p className="text-sm text-gt-text-muted font-sans">
                  {t('aside.suporteDesc')}
                </p>
              </div>

              <div>
                <h3 className="font-sans text-sm font-medium text-gt-text-muted uppercase tracking-wider mb-3">
                  {t('aside.empresasLabel')}
                </h3>
                <Link
                  href="/empresas"
                  className="text-gt-text hover:text-gt-orange transition-colors font-sans block mb-1"
                >
                  {t('aside.empresasLink')}
                </Link>
                <p className="text-sm text-gt-text-muted font-sans">
                  {t('aside.empresasDesc')}
                </p>
              </div>

              <div>
                <h3 className="font-sans text-sm font-medium text-gt-text-muted uppercase tracking-wider mb-3">
                  {t('aside.razaoLabel')}
                </h3>
                <p className="text-sm text-gt-text font-sans">
                  GT Overlander Ltda
                </p>
                <p className="text-sm text-gt-text-muted font-sans">
                  CNPJ 59.840.412/0001-82
                </p>
                <p className="text-sm text-gt-text-muted font-sans">
                  {t('aside.cidade')}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
