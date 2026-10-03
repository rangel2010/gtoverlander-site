import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * Links curtos de rota (gtoverlander.com.br/rota/<nome>) que levam pra rota
 * pública no app web. Pra acrescentar uma rota nova, é só uma linha aqui:
 *   serras: 'https://beta.gtoverlander.com.br/rotas/<id-da-rota>',
 * Redirecionamento TEMPORÁRIO (307): o destino pode mudar (ex.: quando o app
 * web sair do beta) sem o Google nem os navegadores "decorarem" o endereço.
 */
const ROTAS_CURTAS = {
  uruguai: 'https://beta.gtoverlander.com.br/rotas/cmur0rf2v000l132o452yzoe2',
  serras: 'https://beta.gtoverlander.com.br/rotas/cmusc39nx000dwc6uqgfi6lz0',
  // Prontos antes do reel (03/10/2026):
  'carretera-austral': 'https://beta.gtoverlander.com.br/rotas/cmtsjcedt00098tr1hffbgj5q',
  'ruta-40-sul': 'https://beta.gtoverlander.com.br/rotas/cmtrnrby00005fhd3eprw9akx',
  'ruta-40-mendoza-bariloche': 'https://beta.gtoverlander.com.br/rotas/cmtrne7gz000vox9kagyhnq44',
  'ruta-40-norte': 'https://beta.gtoverlander.com.br/rotas/cmtrmwcx0000dox9kcmd6kltx',
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Links curtos de rota (lista ROTAS_CURTAS no topo do arquivo). Vale com
      // e sem prefixo de idioma, pra o link funcionar de qualquer jeito.
      ...Object.entries(ROTAS_CURTAS).flatMap(([nome, destino]) =>
        ['', '/pt', '/en', '/es'].map((prefix) => ({
          source: `${prefix}/rota/${nome}`,
          destination: destino,
          permanent: false,
        }))
      ),

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
          // "GT Desapega" virou parte do "Shopping" (28/09/2026).
          source: `${from}/recursos/desapega`,
          destination: `${to}/recursos/shopping`,
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
