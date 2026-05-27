'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Providers centralizados da app.
 * - next-themes: dark é padrão da primeira visita; usuário pode mudar pra light
 *   e a escolha fica salva. enableSystem=false ignora prefers-color-scheme do SO.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
