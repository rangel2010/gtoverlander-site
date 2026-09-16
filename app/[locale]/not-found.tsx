import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

/**
 * 404 do site.
 *
 * Renderiza dentro do layout do locale, então herda header, footer e as
 * fontes — antes o Next servia a tela padrão dele ("This page could not be
 * found."), em inglês, sem marca e sem nenhum link de saída.
 *
 * Quem dispara isso pra URLs inexistentes é o catch-all em [locale]/[...rest].
 */
export default async function NotFound() {
  const t = await getTranslations('notFound');

  const atalhos = [
    { href: '/recursos', label: t('linkRecursos') },
    { href: '/planos', label: t('linkPlanos') },
    { href: '/suporte', label: t('linkSuporte') },
  ];

  return (
    <section className="bg-gt-bg py-24 md:py-32">
      <div className="container-narrow text-center">
        <p className="font-display text-6xl md:text-7xl text-gt-orange-text mb-4">
          {t('codigo')}
        </p>
        <h1 className="text-4xl md:text-5xl text-gt-text mb-4 leading-[0.95]">
          {t('titulo')}
        </h1>
        <p className="text-gt-text-muted mb-10 max-w-md mx-auto leading-relaxed font-sans">
          {t('subtitulo')}
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Button href="/">{t('ctaHome')}</Button>
          <Button href="/blog" variant="outline">
            {t('ctaBlog')}
          </Button>
        </div>

        <p className="text-sm text-gt-text-dim mb-3 font-sans">{t('atalhos')}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm font-sans">
          {atalhos.map((a) => (
            <li key={a.href}>
              <Link href={a.href} className="text-gt-orange-text hover:underline">
                {a.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
