// Hook oficial do Next.js pra instrumentação
// Esse arquivo é carregado automaticamente pelo Next.js no boot
// https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

// Em Next.js 14.x, Sentry captura erros automaticamente via wrap
// do `withSentryConfig` em next.config.mjs + init do server config.
// O hook `onRequestError` só existe no Next.js 15+.
