// Sentry — edge runtime (middleware, edge API routes)
// Captura erros que acontecem no edge runtime do Vercel

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  debug: false,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),

  beforeSend(event, hint) {
    const err = hint.originalException;
    // notFound() do Next.js lança NEXT_NOT_FOUND internamente — é 404 esperado, não bug
    if (err && (err as { digest?: string }).digest === 'NEXT_NOT_FOUND') return null;
    return event;
  },
});
