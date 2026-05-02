'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import type {
  CountryFile,
  GeoData,
  Manifest,
  Waypoint,
} from '@/lib/demo/types';
import { DEFAULT_CENTER, DEFAULT_COUNTRY } from '@/lib/demo/countries';

interface WaypointsMapProps {
  geo: GeoData;
}

// URL pública do Storage Account (sem auth, com CORS)
const BLOB_BASE_URL =
  'https://gtoverlanderwaypoints.blob.core.windows.net/waypoint-regions';

export function WaypointsMap({ geo }: WaypointsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  const [loadingMessage, setLoadingMessage] = useState('Carregando mapa...');
  const [error, setError] = useState<string | null>(null);
  const [waypointsCount, setWaypointsCount] = useState<number | null>(null);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Inicializa o mapa centrado na localização do visitante (ou Brasil como fallback)
    const center: [number, number] =
      geo.lat !== null && geo.long !== null
        ? [geo.long, geo.lat]
        : [DEFAULT_CENTER.long, DEFAULT_CENTER.lat];

    const initialZoom = geo.lat !== null && geo.long !== null ? 8 : DEFAULT_CENTER.zoom;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        // Glyphs públicos da MapLibre — necessário pra renderizar texto nos clusters
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 22,
          },
        ],
      },
      center,
      zoom: initialZoom,
      attributionControl: { compact: true },
    });

    // Controle de navegação (zoom in/out)
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Quando o mapa carrega, busca os dados
    map.current.on('load', async () => {
      await loadCountryData(geo.countryName ?? DEFAULT_COUNTRY);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadCountryData(countryName: string) {
    if (!map.current) return;

    try {
      setLoadingMessage(`Buscando waypoints do ${countryName}...`);

      // 1. Fetch do manifest pra descobrir o nome do arquivo atual
      const manifestRes = await fetch(`${BLOB_BASE_URL}/manifest.json`);
      if (!manifestRes.ok) throw new Error('Falha ao carregar manifest');
      const manifest: Manifest = await manifestRes.json();

      // 2. Confirma que o país tem entrada
      const entry = manifest.regions[countryName];
      if (!entry) {
        throw new Error(`País ${countryName} não disponível na base`);
      }

      const fileSizeMB = (entry.sizeBytes / 1024 / 1024).toFixed(1);
      setLoadingMessage(
        `Carregando ${entry.count.toLocaleString('pt-BR')} waypoints do ${countryName} (${fileSizeMB} MB)...`
      );

      // 3. Fetch do arquivo do país (já vem gzipped, navegador descomprime)
      const fileRes = await fetch(`${BLOB_BASE_URL}/${entry.fileName}`);
      if (!fileRes.ok) throw new Error('Falha ao carregar dados do país');
      const data: CountryFile = await fileRes.json();

      // 4. Adiciona como GeoJSON source com clustering
      addWaypointsToMap(data.waypoints);

      setWaypointsCount(data.waypoints.length);
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

  function addWaypointsToMap(waypoints: Waypoint[]) {
    if (!map.current) return;
    const m = map.current;

    // Converte waypoints pra GeoJSON FeatureCollection
    const geojson = {
      type: 'FeatureCollection' as const,
      features: waypoints.map((w) => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [w.long, w.lat],
        },
        properties: {
          id: w.id,
          nome: w.nome,
          categoria: w.categoria,
          aceitaRv: w.aceitaRv,
          countryCode: w.countryCode,
        },
      })),
    };

    // Source com clustering ativado
    if (m.getSource('waypoints')) {
      (m.getSource('waypoints') as maplibregl.GeoJSONSource).setData(geojson);
    } else {
      m.addSource('waypoints', {
        type: 'geojson',
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14, // acima desse zoom não agrupa
        clusterRadius: 50,
      });

      // Layer de clusters (bolas com número)
      m.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'waypoints',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#E06226', // GT orange
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            18, // raio default
            10, // a partir de 10 pontos
            22,
            100, // a partir de 100 pontos
            28,
            1000, // a partir de 1000 pontos
            36,
            10000,
            44,
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#FFFFFF',
          'circle-opacity': 0.9,
        },
      });

      // Number label sobre o cluster
      m.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'waypoints',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['Open Sans Bold'],
          'text-size': 13,
        },
        paint: {
          'text-color': '#FFFFFF',
        },
      });

      // Pontos individuais (não agrupados)
      m.addLayer({
        id: 'unclustered-points',
        type: 'circle',
        source: 'waypoints',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#E06226',
          'circle-radius': 6,
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#FFFFFF',
        },
      });

      // Click no cluster — zoom in
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

      // Cursor pointer hover sobre cluster
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
  }

  return (
    <div className="relative">
      {/* Container do mapa */}
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

      {/* Stats overlay (canto inferior esquerdo) */}
      {waypointsCount !== null && activeCountry && (
        <div className="absolute bottom-4 left-4 bg-gt-bg/90 backdrop-blur-sm rounded-md border border-gt-border px-4 py-3 z-10">
          <p className="text-xs text-gt-text-muted uppercase tracking-wider font-sans mb-1">
            {activeCountry}
          </p>
          <p className="text-2xl font-display text-gt-text uppercase tracking-display">
            {waypointsCount.toLocaleString('pt-BR')}
          </p>
          <p className="text-xs text-gt-text-muted font-sans">waypoints</p>
        </div>
      )}
    </div>
  );
}
