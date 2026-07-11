import type { ReactNode } from 'react';

/**
 * Root layout pass-through.
 *
 * O layout real (html/body, providers, header/footer, i18n) vive em
 * app/[locale]/layout.tsx. Esse root precisa existir pro Next, mas só
 * repassa os filhos — assim rotas fora do segmento [locale] (ex.: /studio,
 * route handlers) não herdam o <html> do site.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
