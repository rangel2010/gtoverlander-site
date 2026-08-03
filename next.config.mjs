import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Blog EN/ES → PT enquanto não há conteúdo nessas línguas
      // 302 (temporário) para remover facilmente quando houver artigos EN/ES
      { source: '/en/blog', destination: '/blog', permanent: false },
      { source: '/en/blog/:path*', destination: '/blog/:path*', permanent: false },
      { source: '/es/blog', destination: '/blog', permanent: false },
      { source: '/es/blog/:path*', destination: '/blog/:path*', permanent: false },

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

      // Slug duplicado do artigo Internet na estrada — redirect 301 permanente
      // Slug real publicado ficou "internet-na-estrada-chip-esim-e-starlink-em-viagem-overland"
      {
        source: '/blog/internet-na-estrada-chip-esim-starlinkinternet-na-estrada-chip-esim-starlink',
        destination: '/blog/internet-na-estrada-chip-esim-e-starlink-em-viagem-overland',
        permanent: true,
      },
      {
        source: '/pt/blog/internet-na-estrada-chip-esim-starlinkinternet-na-estrada-chip-esim-starlink',
        destination: '/blog/internet-na-estrada-chip-esim-e-starlink-em-viagem-overland',
        permanent: true,
      },
      {
        source: '/en/blog/internet-na-estrada-chip-esim-starlinkinternet-na-estrada-chip-esim-starlink',
        destination: '/blog/internet-na-estrada-chip-esim-e-starlink-em-viagem-overland',
        permanent: true,
      },
      {
        source: '/es/blog/internet-na-estrada-chip-esim-starlinkinternet-na-estrada-chip-esim-starlink',
        destination: '/blog/internet-na-estrada-chip-esim-e-starlink-em-viagem-overland',
        permanent: true,
      },

      // Slug com erro de digitação do artigo Rota 40 Argentina (faltava o "r") — redirect 301 permanente
      // Corrigir o slug no Sanity pra "rota-40-argentina-roteiro-de-carro" antes de publicar
      {
        source: '/blog/ota-40-argentina-roteiro-de-carro',
        destination: '/blog/rota-40-argentina-roteiro-de-carro',
        permanent: true,
      },
      {
        source: '/pt/blog/ota-40-argentina-roteiro-de-carro',
        destination: '/blog/rota-40-argentina-roteiro-de-carro',
        permanent: true,
      },
      {
        source: '/en/blog/ota-40-argentina-roteiro-de-carro',
        destination: '/blog/rota-40-argentina-roteiro-de-carro',
        permanent: true,
      },
      {
        source: '/es/blog/ota-40-argentina-roteiro-de-carro',
        destination: '/blog/rota-40-argentina-roteiro-de-carro',
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
