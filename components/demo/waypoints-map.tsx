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
  resolveCustomIcon,
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

  // Modo navegação (mobile-only): GPS em tempo real + fullscreen + filtros via hamburger
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMode, setIsNavMode] = useState(false);
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);
  const watchIdRef = useRef<number | null>(null);
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);

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
      geo.lat !== null && geo.long !== null ? 10 : DEFAULT_CENTER.zoom;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
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
      const manifestRes = await fetch(`${BLOB_BASE_URL}/manifest.json`, {
        cache: 'no-store',
      });
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
      const fileRes = await fetch(`${BLOB_BASE_URL}/${entry.fileName}`, {
        cache: 'no-store',
      });
      if (!fileRes.ok) throw new Error('Falha ao carregar dados do país');
      const data: CountryFile = await fileRes.json();

      // Registra sprites custom (combinações únicas categoria + customIcon)
      // ANTES de setar os waypoints, pra que MapLibre encontre o sprite
      // quando renderizar o symbol layer.
      if (map.current) {
        const seen = new Set<string>();
        for (const w of data.waypoints) {
          if (w.customIcon) {
            const featured = !!w.featured;
            const k = `${w.categoria}|${w.customIcon}|${featured}`;
            if (!seen.has(k)) {
              seen.add(k);
              registerCustomSprite(map.current, w.categoria, w.customIcon, featured);
            }
          }
        }
      }

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
      clusterMinPoints: 3,
    });

    m.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'waypoints',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': 'rgba(18, 46, 31, 0.55)',
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
        'icon-size': 0.85,
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
      geo.lat !== null && geo.long !== null ? 10 : DEFAULT_CENTER.zoom;
    map.current.easeTo({ center, zoom, bearing: 0, pitch: 0, duration: 700 });
  }

  // === Modo navegação ===

  function startWatchingPosition() {
    if (!navigator.geolocation || !map.current) return;
    if (watchIdRef.current !== null) return; // já está rodando

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (!map.current) return;

        // Cria ou atualiza marcador azul pulsante
        if (!userMarkerRef.current) {
          const el = document.createElement('div');
          el.className = 'gt-user-location-dot';
          userMarkerRef.current = new maplibregl.Marker({ element: el })
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        } else {
          userMarkerRef.current.setLngLat([longitude, latitude]);
        }

        // Centraliza com easing suave + zoom apertado
        map.current.easeTo({
          center: [longitude, latitude],
          zoom: Math.max(map.current.getZoom(), 15),
          duration: 800,
        });
      },
      (err) => {
        console.error('Geolocation error:', err);
        if (err.code === err.PERMISSION_DENIED) {
          alert(
            'Pra usar o modo navegação, precisamos da sua localização. Ativa nas permissões do navegador.'
          );
          exitNavMode();
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 30000,
      }
    );
  }

  function stopWatchingPosition() {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }

  function startNavMode() {
    setActiveGroups(new Set(availableGroups)); // ativa todas categorias
    setIsNavMode(true);
    startWatchingPosition();
  }

  function exitNavMode() {
    stopWatchingPosition();
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    setIsNavMode(false);
    setIsFiltersDrawerOpen(false);
  }

  // Detecta se é mobile (só client-side)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Pausa GPS quando aba perde foco (economiza bateria)
  useEffect(() => {
    if (!isNavMode) return;
    const handleVisibility = () => {
      if (document.hidden) {
        stopWatchingPosition();
      } else {
        startWatchingPosition();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavMode]);

  // Resize do mapa quando entra/sai de fullscreen (MapLibre precisa recalcular)
  useEffect(() => {
    if (!map.current) return;
    const t = setTimeout(() => {
      map.current?.resize();
    }, 150);
    return () => clearTimeout(t);
  }, [isNavMode]);

  // Cleanup quando desmontar
  useEffect(() => {
    return () => {
      stopWatchingPosition();
      if (userMarkerRef.current) userMarkerRef.current.remove();
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className={`space-y-3 ${isNavMode ? 'invisible' : ''}`}>
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
                className={`text-xs px-3 py-2 rounded-md font-sans font-medium transition-all border ${
                  isActive
                    ? 'bg-transparent text-gt-orange border-gt-orange'
                    : 'bg-transparent text-gt-text-muted border-gt-border/60 hover:text-gt-text hover:border-gt-text/30'
                }`}
              >
                <span className="mr-1">{config.emoji}</span>
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={
          isNavMode
            ? 'fixed inset-0 z-[100] bg-gt-bg'
            : 'relative'
        }
      >
        <div
          ref={mapContainer}
          className={
            isNavMode
              ? 'gt-map-medium w-full h-full'
              : 'gt-map-medium w-full h-[70vh] min-h-[500px] rounded-lg overflow-hidden border border-gt-border bg-gt-card'
          }
        />

        {/* Botão "Modo navegação" — só mobile, fora de nav mode */}
        {isMobile && !isNavMode && mapReady && (
          <button
            type="button"
            onClick={startNavMode}
            className="absolute bottom-6 right-6 z-20 bg-gt-orange hover:bg-gt-orange/90 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 font-sans text-sm font-medium transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
            Modo navegação
          </button>
        )}

        {/* Botão sair do modo navegação (X) */}
        {isNavMode && (
          <button
            type="button"
            onClick={exitNavMode}
            aria-label="Sair do modo navegação"
            className="absolute top-4 right-4 z-[110] w-11 h-11 flex items-center justify-center bg-gt-bg/90 backdrop-blur-sm text-gt-text border border-gt-border rounded-full shadow-lg"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Botão hamburger pra abrir drawer de filtros */}
        {isNavMode && !isFiltersDrawerOpen && (
          <button
            type="button"
            onClick={() => setIsFiltersDrawerOpen(true)}
            aria-label="Abrir filtros de categoria"
            className="absolute top-4 left-4 z-[110] w-11 h-11 flex items-center justify-center bg-gt-bg/90 backdrop-blur-sm text-gt-text border border-gt-border rounded-full shadow-lg"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        )}

        {/* Drawer lateral de filtros (em nav mode) */}
        {isNavMode && isFiltersDrawerOpen && (
          <>
            <div
              className="absolute inset-0 z-[115] bg-black/40"
              onClick={() => setIsFiltersDrawerOpen(false)}
            />
            <div className="absolute top-0 left-0 z-[120] w-72 max-w-[85vw] h-full bg-gt-bg border-r border-gt-border p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm uppercase tracking-wider text-gt-text font-sans font-medium">
                  Filtros
                </p>
                <button
                  type="button"
                  onClick={() => setIsFiltersDrawerOpen(false)}
                  aria-label="Fechar filtros"
                  className="w-8 h-8 flex items-center justify-center text-gt-text-muted hover:text-gt-text"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex gap-3 mb-4">
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
              <div className="flex flex-col gap-2">
                {availableGroups.map((groupKey) => {
                  const config = getGroupConfig(groupKey);
                  const isActive = activeGroups.has(groupKey);
                  return (
                    <button
                      key={groupKey}
                      type="button"
                      onClick={() => toggleGroup(groupKey)}
                      className={`text-sm px-3 py-2.5 rounded-md font-sans font-medium transition-all border text-left ${
                        isActive
                          ? 'bg-transparent text-gt-orange border-gt-orange'
                          : 'bg-transparent text-gt-text-muted border-gt-border/60 hover:text-gt-text hover:border-gt-text/30'
                      }`}
                    >
                      <span className="mr-2">{config.emoji}</span>
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {mapReady && !isNavMode && (
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
          filter: brightness(0.92) contrast(0.95);
        }
        /* Ponto azul clássico de localização (modo navegação) */
        .gt-user-location-dot {
          width: 18px;
          height: 18px;
          background: #1d8cf8;
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow:
            0 0 0 0 rgba(29, 140, 248, 0.6),
            0 1px 4px rgba(0, 0, 0, 0.4);
          animation: gt-user-pulse 2s ease-out infinite;
        }
        @keyframes gt-user-pulse {
          0% {
            box-shadow:
              0 0 0 0 rgba(29, 140, 248, 0.55),
              0 1px 4px rgba(0, 0, 0, 0.4);
          }
          70% {
            box-shadow:
              0 0 0 22px rgba(29, 140, 248, 0),
              0 1px 4px rgba(0, 0, 0, 0.4);
          }
          100% {
            box-shadow:
              0 0 0 0 rgba(29, 140, 248, 0),
              0 1px 4px rgba(0, 0, 0, 0.4);
          }
        }
        .gt-popup .maplibregl-popup-content {
          background: rgba(18, 46, 31, 0.85);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          color: #ededed;
          border: 1px solid rgba(58, 90, 68, 0.6);
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
          border-top-color: rgba(18, 46, 31, 0.85);
          border-bottom-color: rgba(18, 46, 31, 0.85);
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

/**
 * Sanitiza string pra compor chave de sprite. Ex: "gas station" → "gas-station".
 */
function slugify(s: string): string {
  return s.replace(/\s+/g, '-').toLowerCase();
}

/**
 * Computa a chave do sprite pra um waypoint. 4 estados possíveis:
 *  - Comum sem customIcon: 'plain-{cat}' (emoji da categoria, sem caixinha)
 *  - Comum com customIcon: 'plain-custom-{cat}-{icon}' (emoji subtipo, sem caixinha)
 *  - Destacado sem customIcon: 'featured-{cat}' (emoji da categoria + caixinha laranja)
 *  - Destacado com customIcon: 'custom-{cat}-{icon}' (emoji custom + caixinha laranja)
 */
function iconKeyForWaypoint(w: { categoria: string; featured?: boolean; customIcon?: string }): string {
  const cat = slugify(w.categoria);
  const hasCustom = !!w.customIcon;
  if (!w.featured) {
    if (!hasCustom) return `plain-${cat}`;
    return `plain-custom-${cat}-${slugify(w.customIcon!)}`;
  }
  if (!hasCustom) return `featured-${cat}`;
  return `custom-${cat}-${slugify(w.customIcon!)}`;
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

/**
 * Desenha um sprite de pino no canvas. Se withBox=true, desenha a caixinha
 * colorida da categoria ao redor do emoji. emoji pode ser o da categoria
 * (default) ou um custom (ex: ✌️ pra Rota Biker, M pra McDonald's).
 */
function drawPinSprite(
  emoji: string,
  groupColor: string,
  withBox: boolean,
  pixelRatio: number
): ImageData {
  const SIZE = Math.round(40 * pixelRatio);
  const STROKE = 2 * pixelRatio;
  const FONT_SIZE = Math.round(20 * pixelRatio);
  const PAD = 4 * pixelRatio;
  const CORNER = 6 * pixelRatio;

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  if (withBox) {
    ctx.beginPath();
    ctx.roundRect(PAD, PAD, SIZE - 2 * PAD, SIZE - 2 * PAD, CORNER);
    // Cor única laranja GT pra TODOS os destacados (editorial + business),
    // independente da categoria primária. Vira "carimbo de destaque GT".
    // groupColor não é mais usado pra desenhar caixa (mantido na assinatura
    // pra retrocompatibilidade caso a gente queira variação por destaque).
    ctx.lineWidth = STROKE;
    ctx.strokeStyle = '#E06226';
    ctx.stroke();
  }

  ctx.font = `${FONT_SIZE}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, SIZE / 2, SIZE / 2 + pixelRatio);

  return ctx.getImageData(0, 0, SIZE, SIZE);
}

/**
 * Pré-registra os sprites BASE pra todas as categorias conhecidas:
 *  - 'plain-{cat}': comum (só emoji, sem caixinha)
 *  - 'featured-{cat}': destacado sem customIcon (emoji + caixinha)
 *
 * Sprites com customIcon são gerados sob demanda em registerCustomSprite().
 */
function loadCategoryIcons(map: maplibregl.Map) {
  const PIXEL_RATIO = window.devicePixelRatio || 1;

  for (const category of ALL_CATEGORIES_FOR_ICONS) {
    const groupColor = getGroupConfig(categoryToGroupKey(category)).color;
    const emoji = getCategoryConfig(category).emoji;
    const cat = slugify(category);

    const plainKey = `plain-${cat}`;
    if (!map.hasImage(plainKey)) {
      map.addImage(plainKey, drawPinSprite(emoji, groupColor, false, PIXEL_RATIO), {
        pixelRatio: PIXEL_RATIO,
      });
    }

    const featuredKey = `featured-${cat}`;
    if (!map.hasImage(featuredKey)) {
      map.addImage(featuredKey, drawPinSprite(emoji, groupColor, true, PIXEL_RATIO), {
        pixelRatio: PIXEL_RATIO,
      });
    }
  }
}

/**
 * Registra (se ainda não existe) um sprite com customIcon pra uma categoria.
 * Chamado lazy quando a demo recebe waypoints com customIcon.
 *
 * featured=true → caixinha laranja GT (destacado editorial/business)
 * featured=false → sem caixinha (subtipo dentro da categoria, ex: cachoeira em Atração)
 *
 * customIcon pode ser slug (ex: 'waterfall') ou emoji direto (ex: '✌️' Rota Biker).
 * resolveCustomIcon mapeia slug → emoji; passthrough quando já é emoji.
 */
function registerCustomSprite(
  map: maplibregl.Map,
  category: string,
  customIcon: string,
  featured: boolean
) {
  const cat = slugify(category);
  const key = featured
    ? `custom-${cat}-${slugify(customIcon)}`
    : `plain-custom-${cat}-${slugify(customIcon)}`;
  if (map.hasImage(key)) return;
  const PIXEL_RATIO = window.devicePixelRatio || 1;
  const groupColor = getGroupConfig(categoryToGroupKey(category)).color;
  const emoji = resolveCustomIcon(customIcon);
  map.addImage(key, drawPinSprite(emoji, groupColor, featured, PIXEL_RATIO), {
    pixelRatio: PIXEL_RATIO,
  });
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
          featured: w.featured ?? false,
          editorialLabel: w.editorialLabel ?? '',
          customIcon: w.customIcon ?? '',
          iconKey: iconKeyForWaypoint(w),
        },
      };
    }),
  };
}

function buildPopupHTML(props: Record<string, unknown>): string {
  const nome = String(props.nome ?? 'Sem nome');
  const categoria = String(props.categoria ?? '');
  const aceitaRv = props.aceitaRv === true || props.aceitaRv === 'true';
  const editorialLabel = String(props.editorialLabel ?? '');
  const customIconRaw = String(props.customIcon ?? '');
  const customIcon = resolveCustomIcon(customIconRaw);
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
        editorialLabel
          ? `<p style="font-size: 12px; color: #B89E5C; margin: 0; display: flex; align-items: center; gap: 4px;">
            ${customIcon || '⭐'} ${escape(editorialLabel)}
          </p>`
          : ''
      }
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
