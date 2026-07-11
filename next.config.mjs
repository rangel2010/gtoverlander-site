import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Slug duplicado do artigo Rota Biker — redirect 301 permanente
      {
        source: '/blog/rota-biker-monumentos-mototurismo-brasilrota-biker-monumentos-mototurismo-brasil',
        destination: '/blog/rota-biker-monumentos-mototurismo-brasil',
        permanent: true,
      },
      {
        source: '/pt/blog/rota-biker-monumentos-mototurismo-brasilrota-biker-monumentos-mototurismo-brasil',
        destination: '/blog/rota-biker-monumentos-mototurismo-brasil',
        permanent: true,
      },
      {
        source: '/en/blog/rota-biker-monumentos-mototurismo-brasilrota-biker-monumentos-mototurismo-brasil',
        destination: '/blog/rota-biker-monumentos-mototurismo-brasil',
        permanent: true,
      },
      {
        source: '/es/blog/rota-biker-monumentos-mototurismo-brasilrota-biker-monumentos-mototurismo-brasil',
        destination: '/blog/rota-biker-monumentos-mototurismo-brasil',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'i3.ytimg.com' }
    ],
    formats: ['image/avif', 'image/webp']
  }
};

// Sentry config — wrap só se as env vars do Sentry estiverem setadas
// Em dev local sem Sentry configurado, o nextConfig sai puro (sem wrapping)
const sentryWebpackPluginOptions = {
  // Org e project precisam estar setados nas env vars do Vercel
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Auth token só é usado em build com upload de source maps
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Quieto durante o build (CI)
  silent: !process.env.CI,

  // Source maps upload otimizações
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,

  // Melhor pra Vercel
  automaticVercelMonitors: true,
};

const shouldWrap = Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN);

const baseConfig = shouldWrap
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;

// next-intl por fora — prepara o build pra resolver i18n/request.ts
export default withNextIntl(baseConfig);
