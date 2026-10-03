'use client';

import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

/**
 * Mapa da rota: o traçado vindo do app, partida e chegada em verde, paradas
 * numeradas em laranja. Só ilustra — o Google lê a lista de paradas em texto,
 * que fica fora do mapa.
 */
export function MapaRota({
  tracado,
  pontos,
}: {
  tracado: [number, number][]; // [lat, lng]
  pontos: { nome: string; lat: number; lng: number; tipo: 'ponta' | 'parada'; n?: number }[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let map: import('maplibre-gl').Map | null = null;
    let cancelado = false;

    import('maplibre-gl').then(({ default: maplibregl }) => {
      if (cancelado || !ref.current) return;
      const coords = tracado.map(([lat, lng]) => [lng, lat] as [number, number]);
      const todos = coords.length ? coords : pontos.map((p) => [p.lng, p.lat] as [number, number]);
      const bounds = todos.reduce(
        (b, c) => b.extend(c),
        new maplibregl.LngLatBounds(todos[0], todos[0])
      );

      map = new maplibregl.Map({
        container: ref.current,
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        bounds,
        fitBoundsOptions: { padding: 40 },
        attributionControl: { compact: true },
        cooperativeGestures: true, // rolar a página não dá zoom sem querer
      });
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

      map.on('load', () => {
        if (!map) return;
        map.addSource('rota', {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: coords } },
        });
        map.addLayer({
          id: 'rota-borda',
          type: 'line',
          source: 'rota',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#ffffff', 'line-width': 7 },
        });
        map.addLayer({
          id: 'rota',
          type: 'line',
          source: 'rota',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#E06226', 'line-width': 4 },
        });

        for (const p of pontos) {
          const el = document.createElement('div');
          if (p.tipo === 'ponta') {
            el.style.cssText =
              'width:18px;height:18px;border-radius:9999px;background:#122E1F;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35)';
          } else {
            el.style.cssText =
              'width:20px;height:20px;border-radius:9999px;background:#fff;border:2px solid #E06226;color:#b84916;font:600 10px/16px system-ui,sans-serif;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.25)';
            el.textContent = String(p.n ?? '');
          }
          el.title = p.nome;
          new maplibregl.Marker({ element: el })
            .setLngLat([p.lng, p.lat])
            .setPopup(new maplibregl.Popup({ offset: 12, closeButton: false }).setText(p.nome))
            .addTo(map);
        }
      });
    });

    return () => {
      cancelado = true;
      map?.remove();
    };
  }, [tracado, pontos]);

  return (
    <div
      ref={ref}
      className="w-full h-[360px] md:h-[480px] rounded-lg overflow-hidden border border-gt-border bg-gt-card"
      role="img"
      aria-label="Mapa com o traçado da rota e as paradas"
    />
  );
}
