// Sentry — client-side (navegador)
// Captura erros de JS no navegador e envia pra Sentry

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance monitoring — amostra 10% das transações
  tracesSampleRate: 0.1,

  // Session Replay — grava só sessões com erro (não as que vão bem)
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0,

  // Em dev, deixa false pra não poluir console
  debug: false,

  // Quando NEXT_PUBLIC_SENTRY_DSN não estiver setado (dev local sem Sentry),
  // o init fica em no-op silencioso — não dá erro
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),

  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
});
