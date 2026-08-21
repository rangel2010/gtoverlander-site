'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  poster: string;
  /** Descrição do que o vídeo mostra — vira aria-label, já que não há legendas. */
  label: string;
  className?: string;
  /** Largura/altura reais do arquivo, pra reservar espaço e não causar CLS. */
  width: number;
  height: number;
}

/**
 * Vídeo decorativo que só baixa o mp4 quando chega perto da viewport.
 *
 * Por que existe: os dois vídeos das seções de pilar somavam ~1,9 MB e eram
 * baixados no carregamento inicial da home, mesmo ficando abaixo da dobra.
 * Numa conexão 4G lenta isso saturava a banda e atrasava a pintura do H1 —
 * que é o elemento de LCP da página (medido em 5,8s no PageSpeed).
 *
 * O poster continua no HTML inicial (é leve), então o espaço nunca fica vazio
 * e não há mudança de layout quando o vídeo entra.
 */
export function LazyVideo({
  src,
  poster,
  label,
  className,
  width,
  height,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Quem pediu menos animação no sistema fica só com o poster estático.
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return;

    // Navegador sem IntersectionObserver: carrega direto, sem quebrar.
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      // Começa a baixar um pouco antes de aparecer, pra já estar rodando
      // quando o leitor chegar na seção.
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // O play precisa ser disparado na mão porque o src só existe depois que
  // shouldLoad vira true — nesse momento o autoPlay do HTML já passou.
  useEffect(() => {
    if (!shouldLoad) return;
    const el = ref.current;
    if (!el) return;
    el.load();
    const play = el.play();
    if (play) play.catch(() => {});
  }, [shouldLoad]);

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className={className}
    />
  );
}
