import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Página 1 da paginação mora no caminho base (/blog, /blog/destinos).
      // .../pagina/1 mostrando a mesma listagem seria conteúdo duplicado.
      // Resolvido aqui, na borda: redirect() de server component devolve 307
      // sem header Location neste projeto — foi o que quebrou as rotas de
      // recurso descontinuadas logo abaixo.
      ...['', '/pt', '/en', '/es'].flatMap((prefix) => {
        const to = prefix === '/pt' ? '' : prefix;
        return ['/blog', '/blog/destinos', '/blog/preparacao', '/blog/vida-overlander'].map(
          (base) => ({
            source: `${prefix}${base}/pagina/1`,
            destination: `${to}${base}`,
            permanent: true,
          })
        );
      }),

      // Rotas de recurso descontinuadas. Antes eram páginas que chamavam
      // redirect() de server component: o Next respondia 307 SEM header
      // Location, com corpo HTML marcado "index, follow" — o Googlebot não
      // conseguia seguir e a autoridade da URL antiga não era consolidada.
      // Aqui vira 301 de verdade, resolvido na borda antes do render.
      // PT não usa prefixo na URL, então '' e '/pt' apontam pro destino limpo —
      // mandar pra '/pt/recursos' faria o middleware encadear outro redirect.
      ...[
        { from: '', to: '' },
        { from: '/pt', to: '' },
        { from: '/en', to: '/en' },
        { from: '/es', to: '/es' },
      ].flatMap(({ from, to }) => [
        {
          source: `${from}/recursos/off-road`,
          destination: `${to}/recursos`,
          permanent: true,
        },
        {
          // "Overlanders" virou "GT Social".
          source: `${from}/recursos/overlanders`,
          destination: `${to}/recursos/gt-social`,
          permanent: true,
        },
      ]),

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
      { protocol: 'https', hostname: 'i3.ytimg.com' },
      // Foto de perfil do Google, usada no login de comentários do blog
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }
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
