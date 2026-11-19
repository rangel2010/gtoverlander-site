'use client';

import { useEffect, useState } from 'react';
import { BotaoBaixar } from './botao-baixar';

/**
 * Barra fixa no rodapé da tela, só no celular (19/11/2026). Aparece depois que
 * a pessoa passa da primeira chamada da página e some enquanto qualquer outra
 * chamada (marcada com data-cta-rota) estiver visível, pra não repetir.
 */
export function BarraBaixar() {
  const [passouPrimeira, setPassouPrimeira] = useState(false);
  const [outraVisivel, setOutraVisivel] = useState(false);

  useEffect(() => {
    const ctas = Array.from(document.querySelectorAll<HTMLElement>('[data-cta-rota]'));
    if (!ctas.length || typeof IntersectionObserver === 'undefined') return;
    const primeira = ctas[0];
    const visiveis = new Set<Element>();
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) visiveis.add(e.target);
          else visiveis.delete(e.target);
          if (e.target === primeira && !e.isIntersecting) {
            // Passou quando a primeira chamada saiu pela parte de cima da tela.
            setPassouPrimeira(e.boundingClientRect.top < 0);
          }
        }
        setOutraVisivel(visiveis.size > 0);
      },
      { threshold: 0 }
    );
    ctas.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const mostrar = passouPrimeira && !outraVisivel;
  return (
    <div
      data-posicao="rota-barra"
      aria-hidden={!mostrar}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-gt-border bg-gt-card/95 backdrop-blur px-4 pt-3 transition-transform duration-300 ${
        mostrar ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-sans text-sm text-gt-text leading-snug">Esta rota pronta no seu celular</p>
        <BotaoBaixar className="shrink-0 !px-4 !py-2.5 text-sm" />
      </div>
    </div>
  );
}
