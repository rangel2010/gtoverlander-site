import type { Metadata } from 'next';
import { Inter, Anton } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ConsentBanner } from '@/components/consent-banner';
import {
  organizationLd,
  websiteLd,
  softwareApplicationLd,
  jsonLdScriptProps,
} from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gtoverlander.com.br'
  ),
  title: {
    default: 'GT Overlander · O maior ecossistema overlander do mundo',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${anton.variable}`}
    >
      <head>
        {/* Schema.org JSON-LD — Organization + WebSite + SoftwareApplication */}
        <script {...jsonLdScriptProps(organizationLd())} />
        <script {...jsonLdScriptProps(websiteLd())} />
        <script {...jsonLdScriptProps(softwareApplicationLd())} />
      </head>
      <body className="font-sans antialiased flex flex-col min-h-screen bg-gt-bg text-gt-text">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConsentBanner />
        {/* Vercel Speed Insights — mede Core Web Vitals reais dos visitantes */}
        <SpeedInsights />
        {/* Vercel Web Analytics — pageviews, top pages, referrers, sem cookies */}
        <Analytics />
      </body>
    </html>
  );
}
