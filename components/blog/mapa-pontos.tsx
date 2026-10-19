'use client';

import { useEffect, useRef, useState } from 'react';
import type { PontoMapa } from '@/lib/mapas';

/**
 * Mapa de pontos dentro de um artigo (ex.: monumentos da Rota Biker).
 * Pino laranja = pronto; pino cinza = em construção. Tocar abre o nome,
 * a situação e o link pro Google Maps.
 *
 * Igual ao mapa das rotas: só carrega quando a pessoa rola até perto dele,
 * pra não deixar o celular lento.
 */
export function MapaPontos({
  pontos,
  titulo,
  original,
}: {
  pontos: PontoMapa[];
  titulo: string;
  original: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [perto, setPerto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setPerto(true);
      return;
    }
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setPerto(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!perto || !ref.current || pontos.length === 0) return;
    let map: import('maplibre-gl').Map | null = null;
    let cancelado = false;

    Promise.all([
      import('maplibre-gl'),
      // @ts-expect-error -- arquivo de estilo, sem tipos; o Next carrega na hora
      import('maplibre-gl/dist/maplibre-gl.css'),
    ]).then(([{ default: maplibregl }]) => {
      if (cancelado || !ref.current) return;
      const bounds = pontos.reduce(
        (b, p) => b.extend([p.lng, p.lat]),
        new maplibregl.LngLatBounds([pontos[0].lng, pontos[0].lat], [pontos[0].lng, pontos[0].lat])
      );

      map = new maplibregl.Map({
        container: ref.current,
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        bounds,
        fitBoundsOptions: { padding: 40 },
        attributionControl: { compact: true },
        cooperativeGestures: true,
      });
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

      // Em construção primeiro, pra os prontos ficarem por cima.
      const ordenados = [...pontos].sort((a, b) => (a.status === b.status ? 0 : a.status === 'construcao' ? -1 : 1));
      for (const p of ordenados) {
        const pronto = p.status === 'pronto';
        const el = document.createElement('div');
        el.style.cssText = `width:16px;height:16px;border-radius:9999px;background:${
          pronto ? '#E06226' : '#9ca3af'
        };border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35);cursor:pointer`;
        el.title = p.nome;
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', `${p.nome}${pronto ? '' : ' (em construção)'}`);

        // Balão montado com elementos (sem HTML vindo de fora).
        const box = document.createElement('div');
        box.style.cssText = 'font:13px/1.35 system-ui,sans-serif;max-width:220px;color:#1f2937';
        const n = document.createElement('strong');
        n.textContent = p.nome;
        const s = document.createElement('div');
        s.style.cssText = `margin-top:2px;color:${pronto ? '#b84916' : '#6b7280'}`;
        s.textContent = pronto ? 'Pronto e carimbando' : 'Em construção';
        box.append(n, s);
        if (p.nota) {
          const o = document.createElement('div');
          o.style.cssText = 'margin-top:4px;color:#4b5563';
          o.textContent = p.nota;
          box.append(o);
        }
        const a = document.createElement('a');
        a.href = `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = 'Abrir no Google Maps →';
        a.style.cssText = 'display:inline-block;margin-top:6px;color:#b84916;text-decoration:underline';
        box.append(a);

        new maplibregl.Marker({ element: el })
          .setLngLat([p.lng, p.lat])
          .setPopup(new maplibregl.Popup({ offset: 10, closeButton: false }).setDOMContent(box))
          .addTo(map);
      }
    });

    return () => {
      cancelado = true;
      map?.remove();
    };
  }, [perto, pontos]);

  const prontos = pontos.filter((p) => p.status === 'pronto').length;
  const construcao = pontos.length - prontos;

  return (
    <figure className="my-10 font-sans">
      <div
        ref={ref}
        className="w-full h-[380px] md:h-[500px] rounded-lg overflow-hidden border border-gt-border bg-gt-card"
        role="region"
        aria-label={titulo}
      />
      <figcaption className="mt-3 text-sm text-gt-text-muted flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: '#E06226' }} aria-hidden="true" />
          {prontos} prontos e carimbando
        </span>
        {construcao > 0 && (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: '#9ca3af' }} aria-hidden="true" />
            {construcao} em construção
          </span>
        )}
        <span>
          Toque num ponto pra ver o nome e abrir no Google Maps.{' '}
          <a href={original} target="_blank" rel="noopener" className="underline underline-offset-2">
            Mapa original
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
