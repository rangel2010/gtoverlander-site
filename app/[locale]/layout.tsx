import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Inter, Anton } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { Providers } from '../providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ConsentBanner } from '@/components/consent-banner';
import { ClarityScript } from '@/components/clarity-script';
import { GaScript } from '@/components/ga-script';
import { routing } from '@/i18n/routing';
import {
  organizationLd,
  websiteLd,
  softwareApplicationLd,
  jsonLdScriptProps,
} from '@/lib/seo';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: true,
});

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gtoverlander.com.br'
  ),
  title: {
    default: 'GT Overlander · O único ecossistema feito para quem viaja por terra',
    template: '%s · GT Overlander',
  },
  description:
    'Roteiros personalizados em uma conversa com IA. Mais de 4 milhões de waypoints em 209 países. iOS, Android, CarPlay e Android Auto.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'GT Overlander',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  verification: {
    google: 'xR2d6RJaIm9keUfM916f21S2XXFEu8J8A_iG36v9dj0',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const localeToHtmlLang: Record<string, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Valida o locale; se não for um dos suportados, 404
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Habilita renderização estática pro locale ativo
  setRequestLocale(locale);

  // Carrega as mensagens (traduções) do locale ativo
  const messages = await getMessages();

  return (
    <html
      lang={localeToHtmlLang[locale] ?? locale}
      className={`${inter.variable} ${anton.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Schema.org JSON-LD — Organization + WebSite + SoftwareApplication */}
        <script {...jsonLdScriptProps(organizationLd())} />
        <script {...jsonLdScriptProps(websiteLd())} />
        <script {...jsonLdScriptProps(softwareApplicationLd())} />
      </head>
      <body className="font-sans antialiased flex flex-col min-h-screen bg-gt-bg text-gt-text">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ConsentBanner />
            {/* Vercel Speed Insights — mede Core Web Vitals reais dos visitantes */}
            <SpeedInsights />
            {/* Vercel Web Analytics — pageviews, top pages, referrers, sem cookies */}
            <Analytics />
            {/* Microsoft Clarity — heatmap + session recording, só inicializa se o
                usuário aceitou o ConsentBanner */}
            <ClarityScript />
            {/* Google Analytics 4 — só inicializa se o usuário aceitou o ConsentBanner */}
            <GaScript />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
