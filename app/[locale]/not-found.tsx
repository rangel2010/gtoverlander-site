import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

/**
 * 404 do site.
 *
 * Renderiza dentro do layout do locale, herdando header, footer e fontes.
 *
 * Nada aqui pode depender de contexto implícito de locale. Dentro de um
 * boundary de not-found o Next renderiza fora do contexto de request da página
 * que chamou notFound(), e um hook que precise do locale lança no SSR. Quando
 * isso acontece o conteúdo fica só no payload do React e o HTML sai como
 * <html id="__next_error__"> com body vazio — tela em branco, exatamente o que
 * essa página existe pra evitar. Por isso: next/link puro em vez do Link do
 * i18n/navigation (e do Button, que usa ele), locale resolvido de forma
 * explícita, prefixo montado à mão.
 *
 * Quem dispara isso: o catch-all em [locale]/[...rest], pra URLs que não casam
 * com rota nenhuma, e o notFound() da página de post, quando o slug não existe
 * naquele idioma.
 */
export default async function NotFound() {
  let locale = 'pt';
  try {
    locale = await getLocale();
  } catch {
    // fica no pt
  }
  const t = await getTranslations({ locale, namespace: 'notFound' });

  // PT não tem prefixo na URL; os outros idiomas, sim.
  const href = (path: string) => (locale === 'pt' ? path : `/${locale}${path}`);

  const atalhos = [
    { path: '/recursos', label: t('linkRecursos') },
    { path: '/planos', label: t('linkPlanos') },
    { path: '/suporte', label: t('linkSuporte') },
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
          <Link
            href={href('/')}
            className="inline-flex items-center justify-center font-medium rounded-md px-6 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gt-orange/50 bg-gt-orange text-white hover:bg-gt-orange/90"
          >
            {t('ctaHome')}
          </Link>
          <Link
            href={href('/blog')}
            className="inline-flex items-center justify-center font-medium rounded-md px-6 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gt-orange/50 bg-transparent text-gt-text border border-gt-text/30 hover:bg-gt-text/10"
          >
            {t('ctaBlog')}
          </Link>
        </div>

        <p className="text-sm text-gt-text-dim mb-3 font-sans">{t('atalhos')}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm font-sans">
          {atalhos.map((a) => (
            <li key={a.path}>
              <Link href={href(a.path)} className="text-gt-orange-text hover:underline">
                {a.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
