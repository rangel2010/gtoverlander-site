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

  // Filtra erros de scripts injetados por in-app browsers (Instagram, Facebook, etc.)
  // Esses erros são do app hospedeiro, não do site GT — não têm ação possível.
  beforeSend(event, hint) {
    const err = hint.originalException;
    const msg = err instanceof Error ? err.message : String(err ?? '');

    // "Java object is gone" — WebView Android destruído enquanto script nativo rodava
    // "webkit.messageHandlers" — ponte iOS não disponível no contexto da WebView
    const isInAppBrowserNoise =
      msg.includes('Java object is gone') ||
      msg.includes('webkit.messageHandlers') ||
      msg.includes('postMessage');

    // Ignora também se vier de scripts de navegação de WebView (não do nosso bundle)
    const frames = event.exception?.values?.[0]?.stacktrace?.frames ?? [];
    const isInjectedScript = frames.some(
      (f) =>
        f.filename?.includes('navigation_performance_logger') ||
        f.filename?.includes('sendDataToNative')
    );

    if (isInAppBrowserNoise || isInjectedScript) return null;

    return event;
  },

  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
});
