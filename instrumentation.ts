// Hook oficial do Next.js pra instrumentação (Sentry server + edge)
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

// Captura erros server-side pra mandar pro Sentry
export const onRequestError = async (
  err: unknown,
  request: Request | { path: string; method: string; headers: Headers },
  context: {
    routerKind: 'Pages Router' | 'App Router';
    routePath: string;
    routeType: 'render' | 'route' | 'action' | 'middleware';
  }
) => {
  const Sentry = await import('@sentry/nextjs');
  Sentry.captureRequestError(err, request, context);
};
