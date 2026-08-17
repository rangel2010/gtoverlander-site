import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Login com Google usado só pra identificar quem comenta no blog (nome e foto
// pública da conta). Não guardamos senha, não pedimos escopo além do básico
// de perfil, e não usamos esse login pra mais nada no site.
//
// E-mail do Rangel autorizado a responder como a marca GT Overlander nos
// comentários (ver lib/comments.ts). Configurável via env pra não deixar
// hardcoded o e-mail pessoal dele no código.
export const BRAND_REPLY_EMAIL = process.env.BRAND_REPLY_EMAIL ?? '';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    // JWT ao invés de sessão em banco: não precisamos persistir usuários,
    // só validar a identidade no momento de comentar.
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email ?? session.user.email;
        session.user.name = token.name ?? session.user.name;
        session.user.image = (token.picture as string | undefined) ?? session.user.image;
        session.user.isBrand = Boolean(
          BRAND_REPLY_EMAIL && session.user.email === BRAND_REPLY_EMAIL
        );
      }
      return session;
    },
  },
  pages: {
    // Sem tela de login customizada por enquanto — usa o fluxo padrão do
    // NextAuth (botão dispara signIn('google') direto do componente).
  },
};
