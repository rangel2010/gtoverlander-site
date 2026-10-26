'use client';

import { useEffect } from 'react';

/**
 * Medição do clique para as lojas (26/10/2026).
 *
 * Antes, o "clique_loja" era uma regra criada no painel do GA4, fora do código,
 * e cada relatório contava de um jeito (51 eventos-chave, 47 usuários, 53
 * disparos no mesmo mês). Agora o próprio site avisa, com página e posição.
 *
 * Duas coisas acontecem em qualquer link para a loja, em qualquer página,
 * sem precisar mexer em cada botão:
 *
 * 1. Play Store: o link ganha uma etiqueta de origem (`referrer`) com
 *    utm_source=site, utm_medium=<posição do botão> e utm_campaign=<página>.
 *    O Play Console mostra as INSTALAÇÕES por essa etiqueta, que é o número
 *    que faltava. O app só lê `convite=` desse recado
 *    (apps/mobile/lib/convite-da-instalacao.ts, extrairCodigo), então a
 *    etiqueta não vira código de convite. Link que já tem `referrer` (um
 *    convite) não é tocado.
 *    A App Store não tem equivalente sem o código de provedor da conta Apple,
 *    então o link da Apple fica como está e só entra na contagem do GA4.
 *
 * 2. GA4: evento `clique_loja_site` com loja, página e posição. Só dispara se
 *    o GA4 estiver carregado, ou seja, se a pessoa aceitou os cookies.
 *
 * Posição: `data-posicao` no próprio link ou num pai; sem isso, "menu" se
 * estiver no cabeçalho, "rodape" no rodapé, "pagina" no resto.
 */
const PLAY = /^https:\/\/play\.google\.com\/store\/apps\/details/;
const APPLE = /^https:\/\/apps\.apple\.com\//;

type Gtag = (...args: unknown[]) => void;

function posicaoDo(a: HTMLAnchorElement): string {
  const marcado = a.closest<HTMLElement>('[data-posicao]');
  if (marcado?.dataset.posicao) return marcado.dataset.posicao;
  if (a.closest('header')) return 'menu';
  if (a.closest('footer')) return 'rodape';
  return 'pagina';
}

export function RastreioLoja() {
  useEffect(() => {
    function aoClicar(e: MouseEvent) {
      const alvo = e.target as Element | null;
      const a = alvo?.closest?.('a') as HTMLAnchorElement | null;
      if (!a || !a.href) return;
      const ehPlay = PLAY.test(a.href);
      if (!ehPlay && !APPLE.test(a.href)) return;

      const pagina = window.location.pathname.slice(0, 80) || '/';
      const posicao = posicaoDo(a);

      if (ehPlay) {
        try {
          const url = new URL(a.href);
          if (!url.searchParams.has('referrer')) {
            url.searchParams.set(
              'referrer',
              `utm_source=site&utm_medium=${posicao}&utm_campaign=${pagina}`
            );
            a.href = url.toString();
          }
        } catch {
          // URL estranha: segue sem etiqueta, o clique nunca pode quebrar
        }
      }

      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (typeof gtag === 'function') {
        gtag('event', 'clique_loja_site', {
          loja: ehPlay ? 'play' : 'apple',
          pagina,
          posicao,
          transport_type: 'beacon',
        });
      }
    }
    // Fase de captura: roda antes da navegação, inclusive em link que abre aba nova.
    document.addEventListener('click', aoClicar, true);
    document.addEventListener('auxclick', aoClicar, true);
    return () => {
      document.removeEventListener('click', aoClicar, true);
      document.removeEventListener('auxclick', aoClicar, true);
    };
  }, []);
  return null;
}
