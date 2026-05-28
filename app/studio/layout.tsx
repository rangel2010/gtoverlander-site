import type { ReactNode } from 'react';

export const metadata = {
  title: 'GT Overlander · Studio',
  robots: { index: false, follow: false },
};

/**
 * Layout próprio do Sanity Studio.
 *
 * O Studio vive fora do segmento [locale], então precisa do seu próprio
 * <html>/<body> (o root layout agora é só pass-through). Sem i18n, sem
 * header/footer do site — o Studio renderiza sua própria UI inteira.
 */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
