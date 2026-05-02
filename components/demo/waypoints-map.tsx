'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import type {
  CountryFile,
  GeoData,
  Manifest,
  Waypoint,
} from '@/lib/demo/types';
import { DEFAULT_CENTER, DEFAULT_COUNTRY } from '@/lib/demo/countries';
import {
  categoryToGroupKey,
  getCategoryConfig,
  getGroupConfig,
  sortGroups,
} from '@/lib/demo/categories';

interface WaypointsMapProps {
  geo: GeoData;
}

const BLOB_BASE_URL =
  'https://gtoverlanderwaypoints.blob.core.windows.net/waypoint-regions';

export function WaypointsMap({ geo }: WaypointsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const popup = useRef<maplibregl.Popup | null>(null);

  const [allWaypoints, setAllWaypoints] = useState<Waypoint[]>([]);
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const [activeGroups, setActiveGroups] = useState<Set<string>>(new Set());
  const [loadingMessage, setLoadingMessage] = useState('Carregando mapa...');
  const [error, setError] = useState<string | null>(null);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const filteredWaypoints = useMemo(() => {
    if (allWaypoints.length === 0) return [];
    const rvActive = activeGroups.has('rv support');
    return allWaypoints.filter((w) => {
      const groupKey = categoryToGroupKey(w.categoria);
      if (activeGroups.has(groupKey)) return true;
      if (rvActive && w.aceitaRv) return true;
      return false;
    });
  }, [allWaypoints, activeGroups]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const center: [number, number] =
      geo.lat !== null && geo.long !== null
        ? [geo.long, geo.lat]
        : [DEFAULT_CENTER.long, DEFAULT_CENTER.lat];

    const initialZoom =
      geo.lat !== null && geo.long !== null ? 8 : DEFAULT_CENTER.zoom;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center,
      zoom: initialZoom,
      attributionControl: { compact: true },
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current.on('style.load', () => {
      loadCategoryIcons(map.current!);
      addWaypointsLayers([]);
      setMapReady(true);
      loadCountryData(geo.countryName ?? DEFAULT_COUNTRY);
    });

    return () => {
      popup.current?.remove();
      map.current?.remove();
      map.current = null;
      popup.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map.current || !mapReady) return;
    const source = map.current.getSource('waypoints') as
      | maplibregl.GeoJSONSource
      | undefined;
    if (!source) return;
    const geojson = waypointsToGeoJSON(filteredWaypoints);
    source.setData(geojson);
  }, [filteredWaypoints, mapReady]);

  async function loadCountryData(countryName: string) {
    if (!map.current) return;
    try {
      setLoadingMessage(`Buscando waypoints do ${countryName}...`);
      const manifestRes = await fetch(`${BLOB_BASE_URL}/manifest.json`);
      if (!manifestRes.ok) throw new Error('Falha ao carregar manifest');
      const manifest: Manifest = await manifestRes.json();
      const entry = manifest.regions[countryName];
      if (!entry) {
        throw new Error(`País ${countryName} não disponível na base`);
      }
      const fileSizeMB = (entry.sizeBytes / 1024 / 1024).toFixed(1);
      setLoadingMessage(
        `Carregando ${entry.count.toLocaleString('pt-BR')} waypoints do ${countryName} (${fileSizeMB} MB)...`
      );
      const fileRes = await fetch(`${BLOB_BASE_URL}/${entry.fileName}`);
      if (!fileRes.ok) throw new Error('Falha ao carregar dados do país');
      const data: CountryFile = await fileRes.json();

      const uniqueGroups = Array.from(
        new Set(data.waypoints.map((w) => categoryToGroupKey(w.categoria)))
      );
      const sorted = sortGroups(uniqueGroups);
      const initialGroup = sorted.includes('gas station')
        ? 'gas station'
        : sorted[0];

      setAllWaypoints(data.waypoints);
      setAvailableGroups(sorted);
      setActiveGroups(initialGroup ? new Set([initialGroup]) : new Set());
      setActiveCountry(countryName);
      setLoadingMessage('');
    } catch (e) {
      console.error('[demo] erro ao carregar:', e);
      setError(
        e instanceof Error ? e.message : 'Erro desconhecido ao carregar dados'
      );
      setLoadingMessage('');
    }
  }

  function addWaypointsLayers(waypoints: Waypoint[]) {
    if (!map.current) return;
    const m = map.current;
    const geojson = waypointsToGeoJSON(waypoints);

    if (m.getSource('waypoints')) {
      (m.getSource('waypoints') as maplibregl.GeoJSONSource).setData(geojson);
      return;
    }

    m.addSource('waypoints', {
      type: 'geojson',
      data: geojson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });

    m.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'waypoints',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': 'rgba(15, 15, 15, 0.88)',
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          10,
          26,
          100,
          32,
          1000,
          40,
          10000,
          48,
        ],
        'circle-stroke-width': 2.5,
        'circle-stroke-color': '#E06226',
      },
    });

    m.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'waypoints',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': ['get', 'point_count_abbreviated'],
        'text-font': ['Roboto Bold'],
        'text-size': 13,
      },
      paint: {
        'text-color': '#FFFFFF',
      },
    });

    m.addLayer({
      id: 'unclustered-points',
      type: 'symbol',
      source: 'waypoints',
      filter: ['!', ['has', 'point_count']],
      layout: {
        'icon-image': ['get', 'iconKey'],
        'icon-size': 0.7,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      },
    });

    m.on('click', 'clusters', (e) => {
      const features = m.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
      });
      const feature = features[0];
      if (!feature || feature.geometry.type !== 'Point') return;
      const clusterId = feature.properties?.cluster_id;
      if (clusterId === undefined) return;
      const source = m.getSource('waypoints') as maplibregl.GeoJSONSource;
      source.getClusterExpansionZoom(clusterId).then((zoom) => {
        const coords = feature.geometry as GeoJSON.Point;
        m.easeTo({
          center: coords.coordinates as [number, number],
          zoom,
        });
      });
    });

    m.on('click', 'unclustered-points', (e) => {
      const feature = e.features?.[0];
      if (!feature || feature.geometry.type !== 'Point') return;
      const props = feature.properties;
      if (!props) return;
      const coords = (feature.geometry as GeoJSON.Point).coordinates as [
        number,
        number,
      ];
      popup.current?.remove();
      popup.current = new maplibregl.Popup({
        closeButton: true,
        closeOnClick: true,
        className: 'gt-popup',
        maxWidth: '280px',
      })
        .setLngLat(coords)
        .setHTML(buildPopupHTML(props))
        .addTo(m);
    });

    m.on('mouseenter', 'clusters', () => {
      m.getCanvas().style.cursor = 'pointer';
    });
    m.on('mouseleave', 'clusters', () => {
      m.getCanvas().style.cursor = '';
    });
    m.on('mouseenter', 'unclustered-points', () => {
      m.getCanvas().style.cursor = 'pointer';
    });
    m.on('mouseleave', 'unclustered-points', () => {
      m.getCanvas().style.cursor = '';
    });
  }

  function toggleGroup(groupKey: string) {
    setActiveGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupKey)) {
        next.delete(groupKey);
      } else {
        next.add(groupKey);
      }
      return next;
    });
  }

  function selectAll() {
    setActiveGroups(new Set(availableGroups));
  }

  function clearAll() {
    setActiveGroups(new Set());
  }

  function recenterMap() {
    if (!map.current) return;
    const center: [number, number] =
      geo.lat !== null && geo.long !== null
        ? [geo.long, geo.lat]
        : [DEFAULT_CENTER.long, DEFAULT_CENTER.lat];
    const zoom =
      geo.lat !== null && geo.long !== null ? 8 : DEFAULT_CENTER.zoom;
    map.current.easeTo({ center, zoom, bearing: 0, pitch: 0, duration: 700 });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs uppercase tracking-wider text-gt-text-muted font-sans">
            Filtrar por categoria
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={selectAll}
              className="text-xs text-gt-text-muted hover:text-gt-text font-sans transition-colors"
            >
              Selecionar tudo
            </button>
            <span className="text-xs text-gt-text-dim">·</span>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-gt-text-muted hover:text-gt-text font-sans transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {availableGroups.map((groupKey) => {
            const config = getGroupConfig(groupKey);
            const isActive = activeGroups.has(groupKey);
            return (
              <button
                key={groupKey}
                type="button"
                onClick={() => toggleGroup(groupKey)}
                style={
                  isActive
                    ? { color: config.color, borderColor: config.color }
                    : undefined
                }
                className={`text-xs px-3 py-2 rounded-md font-sans font-medium transition-all border ${
                  isActive
                    ? 'bg-transparent'
                    : 'bg-transparent text-gt-text-dim border-gt-border/40 opacity-50 hover:opacity-90 hover:text-gt-text-muted'
                }`}
              >
                <span className="mr-1">{config.emoji}</span>
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <div
          ref={mapContainer}
          className="gt-map-medium w-full h-[70vh] min-h-[500px] rounded-lg overflow-hidden border border-gt-border bg-gt-card"
        />

        {mapReady && (
          <button
            type="button"
            onClick={recenterMap}
            aria-label="Recentralizar mapa"
            title="Recentralizar mapa"
            className="absolute top-[120px] right-[10px] z-10 w-[29px] h-[29px] flex items-center justify-center bg-white/95 hover:bg-white border border-gt-border/50 rounded shadow-sm transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
          </button>
        )}

        {loadingMessage && (
          <div className="absolute inset-0 flex items-center justify-center bg-gt-bg/80 backdrop-blur-sm rounded-lg z-10">
            <div className="text-center max-w-md px-6">
              <div className="inline-block w-8 h-8 border-2 border-gt-orange border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gt-text font-sans text-sm leading-relaxed">
                {loadingMessage}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gt-bg/80 backdrop-blur-sm rounded-lg z-10">
            <div className="text-center max-w-md px-6">
              <p className="text-gt-text font-sans mb-3">
                Não conseguimos carregar a demo agora.
              </p>
              <p className="text-gt-text-muted text-sm font-sans">{error}</p>
            </div>
          </div>
        )}

        {activeCountry && filteredWaypoints.length > 0 && (
          <div className="absolute bottom-4 left-4 bg-gt-bg/90 backdrop-blur-sm rounded-md border border-gt-border px-4 py-3 z-10">
            <p className="text-xs text-gt-text-muted uppercase tracking-wider font-sans mb-1">
              {activeCountry}
            </p>
            <p className="text-2xl font-display text-gt-text uppercase tracking-display">
              {filteredWaypoints.length.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-gt-text-muted font-sans">
              {filteredWaypoints.length === allWaypoints.length
                ? 'waypoints visíveis'
                : `de ${allWaypoints.length.toLocaleString('pt-BR')} no total`}
            </p>
          </div>
        )}

        {activeCountry &&
          allWaypoints.length > 0 &&
          filteredWaypoints.length === 0 &&
          !loadingMessage && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gt-bg/90 backdrop-blur-sm rounded-md border border-gt-border px-4 py-3 z-10">
              <p className="text-sm text-gt-text font-sans">
                Nenhuma categoria selecionada. Clica em algum chip acima.
              </p>
            </div>
          )}
      </div>

      <style jsx global>{`
        .gt-map-medium .maplibregl-canvas {
          filter: brightness(1.55) saturate(1.15) contrast(0.9);
        }
        .gt-popup .maplibregl-popup-content {
          background: #0f0f0f;
          color: #ededed;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 16px;
          font-family:
            ui-sans-serif,
            system-ui,
            -apple-system,
            sans-serif;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        .gt-popup .maplibregl-popup-tip {
          border-top-color: #0f0f0f;
          border-bottom-color: #0f0f0f;
        }
        .gt-popup .maplibregl-popup-close-button {
          color: #888;
          font-size: 18px;
          padding: 4px 8px;
        }
        .gt-popup .maplibregl-popup-close-button:hover {
          color: #ededed;
          background: transparent;
        }
      `}</style>
    </div>
  );
}

// === Helpers ===

function iconKeyFor(category: string): string {
  return `gt-icon-${category.replace(/\s+/g, '-').toLowerCase()}`;
}

const ALL_CATEGORIES_FOR_ICONS: string[] = [
  'gas station',
  'mechanic',
  'hotel',
  'guesthouse',
  'camping',
  'restaurant',
  'fast food',
  'cafe',
  'bakery',
  'attraction',
  'rest area',
  'national park',
  'border crossing',
  'rv support',
  'hospital',
  'pharmacy',
  'viewpoint',
  'museum',
  'parking',
  'supermarket',
];

function loadCategoryIcons(map: maplibregl.Map) {
  const PIXEL_RATIO = window.devicePixelRatio || 1;
  const SIZE = Math.round(40 * PIXEL_RATIO);
  const RADIUS = SIZE / 2 - 2 * PIXEL_RATIO;
  const STROKE = 2 * PIXEL_RATIO;
  const FONT_SIZE = Math.round(20 * PIXEL_RATIO);

  for (const category of ALL_CATEGORIES_FOR_ICONS) {
    const key = iconKeyFor(category);
    if (map.hasImage(key)) continue;

    const groupColor = getGroupConfig(categoryToGroupKey(category)).color;
    const emoji = getCategoryConfig(category).emoji;

    const canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    // Bolinha vazada — só contorno colorido com o emoji dentro,
    // visualmente coerente com os chips ativos (transparent + colored border).
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, RADIUS, 0, Math.PI * 2);
    ctx.lineWidth = STROKE * 1.5; // ring um pouco mais grosso pra dar presença
    ctx.strokeStyle = groupColor;
    ctx.stroke();

    ctx.font = `${FONT_SIZE}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, SIZE / 2, SIZE / 2 + PIXEL_RATIO);

    map.addImage(key, ctx.getImageData(0, 0, SIZE, SIZE), {
      pixelRatio: PIXEL_RATIO,
    });
  }
}

function waypointsToGeoJSON(
  waypoints: Waypoint[]
): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: 'FeatureCollection',
    features: waypoints.map((w) => {
      const groupConfig = getGroupConfig(categoryToGroupKey(w.categoria));
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [w.long, w.lat],
        },
        properties: {
          id: w.id,
          nome: w.nome,
          categoria: w.categoria,
          aceitaRv: w.aceitaRv,
          countryCode: w.countryCode,
          color: groupConfig.color,
          iconKey: iconKeyFor(w.categoria),
        },
      };
    }),
  };
}

function buildPopupHTML(props: Record<string, unknown>): string {
  const nome = String(props.nome ?? 'Sem nome');
  const categoria = String(props.categoria ?? '');
  const aceitaRv = props.aceitaRv === true || props.aceitaRv === 'true';
  const config = getCategoryConfig(categoria);

  const escape = (s: string) =>
    s.replace(
      /[&<>"']/g,
      (c) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[c] ?? c
    );

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 18px;">${config.emoji}</span>
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #999;">
          ${escape(config.label)}
        </span>
      </div>
      <h3 style="font-size: 15px; font-weight: 500; line-height: 1.3; margin: 0; color: #ededed;">
        ${escape(nome)}
      </h3>
      ${
        aceitaRv
          ? `<p style="font-size: 12px; color: #1F8A8A; margin: 0; display: flex; align-items: center; gap: 4px;">
            🚐 Aceita RV / Motorhome
          </p>`
          : ''
      }
      <a href="/baixar"
         style="font-size: 11px; color: #E06226; margin-top: 4px; text-decoration: none; border-top: 1px solid #2a2a2a; padding-top: 8px;">
        Quer usar isso de verdade? Baixe o app →
      </a>
    </div>
  `;
}
