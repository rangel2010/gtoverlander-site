import type { DefaultSession } from 'next-auth';

// Extende o tipo de sessão do NextAuth com isBrand: true quando o e-mail
// logado é o autorizado a responder como GT Overlander nos comentários
// do blog (ver lib/auth.ts, BRAND_REPLY_EMAIL).
declare module 'next-auth' {
  interface Session {
    user?: DefaultSession['user'] & {
      isBrand?: boolean;
    };
  }
}
