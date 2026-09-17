import Link from 'next/link';
import { Inter, Anton } from 'next/font/google';
import { getLocale, getTranslations } from 'next-intl/server';
import { Providers } from '../providers';
import '../globals.css';

/**
 * 404 do site.
 *
 * Monta o próprio documento — <html>, <body>, fontes, globals.css — pelo mesmo
 * motivo que app/studio/layout.tsx monta: o layout raiz é só um pass-through e
 * não emite <html>. Quem emite é o layout do [locale], e um boundary de
 * not-found NÃO é embrulhado por ele: renderiza direto sob a raiz. Sem <html>
 * próprio, o Next devolve <html id="__next_error__"> com body vazio — a tela
 * em branco que essa página existe pra evitar.
 *
 * Pela mesma razão não dá pra usar header/footer nem o Link do i18n/navigation
 * aqui: fora do layout do locale não existe o contexto que eles pedem. Os
 * caminhos são montados à mão a partir do locale resolvido.
 *
 * Quem dispara isso: o catch-all em [locale]/[...rest], pra URLs que não casam
 * com rota nenhuma, e o notFound() da página de post, quando o slug não existe
 * naquele idioma.
 */

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' });

const HTML_LANG: Record<string, string> = { pt: 'pt-BR', en: 'en', es: 'es' };

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

  const btn =
    'inline-flex items-center justify-center font-medium rounded-md px-6 py-3 text-sm ' +
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gt-orange/50';

  const atalhos = [
    { path: '/recursos', label: t('linkRecursos') },
    { path: '/planos', label: t('linkPlanos') },
    { path: '/suporte', label: t('linkSuporte') },
  ];

  return (
    <html
      lang={HTML_LANG[locale] ?? 'pt-BR'}
      className={`${inter.variable} ${anton.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen flex flex-col bg-gt-bg text-gt-text">
        <Providers>
          <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
            <Link href={href('/')} className="mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-gt-contorno.svg"
                alt="GT Overlander"
                width={108}
                height={64}
                className="h-14 w-auto"
              />
            </Link>

            <p className="font-display text-6xl md:text-7xl text-gt-orange-text mb-4">
              {t('codigo')}
            </p>
            <h1 className="font-display text-4xl md:text-5xl mb-4 leading-[0.95]">
              {t('titulo')}
            </h1>
            <p className="text-gt-text-muted mb-10 max-w-md leading-relaxed font-sans">
              {t('subtitulo')}
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <Link href={href('/')} className={`${btn} bg-gt-orange text-white hover:bg-gt-orange/90`}>
                {t('ctaHome')}
              </Link>
              <Link
                href={href('/blog')}
                className={`${btn} bg-transparent border border-gt-text/30 hover:bg-gt-text/10`}
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
          </main>
        </Providers>
      </body>
    </html>
  );
}
