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

  // Estado
  const [allWaypoints, setAllWaypoints] = useState<Waypoint[]>([]);
  // Grupos disponíveis no arquivo do país atual (compostos como Hospedagem,
  // Alimentação, Saúde + categorias individuais)
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const [activeGroups, setActiveGroups] = useState<Set<string>>(new Set());
  const [loadingMessage, setLoadingMessage] = useState('Carregando mapa...');
  const [error, setError] = useState<string | null>(null);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Filtro: aplica activeGroups + lógica OR transversal de "Aceita RV"
  const filteredWaypoints = useMemo(() => {
    if (allWaypoints.length === 0) return [];

    const rvActive = activeGroups.has('rv support');

    return allWaypoints.filter((w) => {
      const groupKey = categoryToGroupKey(w.categoria);
      // Se o grupo do waypoint está ativo, mostra
      if (activeGroups.has(groupKey)) return true;
      // Se "Aceita RV" está ativo e o waypoint aceita RV (transversal)
      if (rvActive && w.aceitaRv) return true;
      return false;
    });
  }, [allWaypoints, activeGroups]);

  // Init do mapa (executa uma vez)
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const center: [number, number] =
      geo.lat !== null && geo.long !== null
        ? [geo.long, geo.lat]
        : [DEFAULT_CENTER.long, DEFAULT_CENTER.lat];

    const initialZoom =
      geo.lat !== null && geo.long !== null ? 10 : DEFAULT_CENTER.zoom;

    // Estilo dark matter da Carto — mesma vibe do app GT.
    // É um vector style hospedado, já vem com glyphs (fontes) configurados.
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center,
      zoom: initialZoom,
      attributionControl: { compact: true },
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // style.load garante que o estilo (e os glyphs) tá pronto antes de adicionar custom layers
    map.current.on('style.load', () => {
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

  // Sincroniza waypoints filtrados com o source do mapa
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

      // Lê dinamicamente quais GRUPOS existem (categoria → grupo via map).
      // O sync de dados pro mapa acontece via useEffect [filteredWaypoints, mapReady].
      const uniqueGroups = Array.from(
        new Set(data.waypoints.map((w) => categoryToGroupKey(w.categoria)))
      );
      const sorted = sortGroups(uniqueGroups);

      // UX: começa com apenas 1 grupo ativo (Postos por padrão).
      // Se o país não tem postos, escolhe o primeiro grupo disponível.
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

    // Source com cluster
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

    // Cluster (bolha escura com contorno laranja, semelhante aos cards do app)
    m.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'waypoints',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': 'rgba(15, 15, 15, 0.88)', // fundo escuro translúcido
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20, // base
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
        'circle-stroke-color': '#E06226', // borda laranja GT
      },
    });

    // Número dentro do cluster — usa font do estilo Carto (que vem com Roboto Bold)
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

    // Pontos individuais — cor vem do grupo da categoria (pré-calculada no GeoJSON)
    m.addLayer({
      id: 'unclustered-points',
      type: 'circle',
      source: 'waypoints',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': ['get', 'color'],
        'circle-radius': 7,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#0F0F0F', // contorno escuro pra destacar do mapa dark
      },
    });

    // === Eventos ===

    // Click no cluster → zoom in
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

    // Click no ponto individual → popup
    m.on('click', 'unclustered-points', (e) => {
      const feature = e.features?.[0];
      if (!feature || feature.geometry.type !== 'Point') return;

      const props = feature.properties;
      if (!props) return;

      const coords = (feature.geometry as GeoJSON.Point).coordinates as [
        number,
        number,
      ];

      // Remove popup anterior se existir
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

    // Cursor pointer no hover
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

  // === Handlers de filtro ===

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

  return (
    <div className="space-y-4">
      {/* Filtros de categoria */}
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
                className={`text-xs px-3 py-2 rounded-md font-sans font-medium transition-all border ${
                  isActive
                    ? 'bg-transparent text-gt-orange border-gt-orange'
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

      {/* Container do mapa */}
      <div className="relative">
        <div
          ref={mapContainer}
          className="w-full h-[70vh] min-h-[500px] rounded-lg overflow-hidden border border-gt-border bg-gt-card"
        />

        {/* Overlay de loading */}
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

        {/* Overlay de erro */}
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

        {/* Stats overlay */}
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

        {/* Empty state quando filtros zeram */}
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

      {/* Estilos do popup (Tailwind não consegue alcançar dentro do popup do MapLibre) */}
      <style jsx global>{`
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

function waypointsToGeoJSON(
  waypoints: Waypoint[]
): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: 'FeatureCollection',
    features: waypoints.map((w) => {
      // Pre-calcula a cor do grupo pra MapLibre poder renderizar via expression
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

  // Escape básico pra evitar XSS no innerHTML
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
