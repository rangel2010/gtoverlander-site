'use client';

import type { VarianteCta } from '@/lib/cta-pilotos';

/**
 * Cartão de ponte blog → app (08/11/2026). Fica no fluxo do texto, depois da
 * resposta que o leitor buscou. Sem pop-up.
 *
 * No clique: guarda a origem (artigo, variante, posição) na memória da aba
 * (sessionStorage 'gt-origem') e manda o evento `cta_contextual` pro GA4.
 * O RastreioLoja lê essa origem quando a pessoa clica numa loja depois,
 * mesmo passando antes pelo /baixar ou por uma página de rota.
 */
const ICONE: Record<VarianteCta, string> = { rota: '🗺️', copiloto: '🧭', radar: '📍' };

type Gtag = (...args: unknown[]) => void;

export function CtaContextual({
  variante,
  artigo,
  posicao,
  titulo,
  frase,
  botao,
  href,
}: {
  variante: VarianteCta;
  artigo: string;
  posicao: string;
  titulo: string;
  frase: string;
  botao: string;
  href: string;
}) {
  function aoClicar() {
    const origem = { artigo, cta: variante, pos: posicao };
    try {
      sessionStorage.setItem('gt-origem', JSON.stringify(origem));
    } catch {
      // sem sessionStorage: segue sem a origem
    }
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'cta_contextual', {
        artigo,
        variante,
        posicao,
        destino: href,
        transport_type: 'beacon',
      });
    }
  }

  return (
    <aside
      className="my-10 bg-gt-card border border-gt-border border-l-4 border-l-gt-orange rounded-lg p-5 md:p-6 font-sans"
      aria-label={titulo}
      data-posicao={`cta-${variante}`}
    >
      <p className="text-base font-semibold text-gt-text mb-2">
        {ICONE[variante]} {titulo}
      </p>
      <p className="text-gt-text-muted leading-relaxed mb-4">{frase}</p>
      <a
        href={href}
        onClick={aoClicar}
        className="inline-flex items-center justify-center bg-gt-orange text-white font-semibold px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity no-underline"
      >
        {botao} →
      </a>
    </aside>
  );
}
