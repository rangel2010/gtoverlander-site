// Sentry — server-side (Node.js runtime)
// Captura erros das API routes, server components, server actions

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  debug: false,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
});
