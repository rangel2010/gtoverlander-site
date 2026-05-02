// Types pra demo de waypoints — espelham os arquivos públicos do Storage Account
// Fonte: gtoverlanderwaypoints.blob.core.windows.net/waypoint-regions

/**
 * Manifest — cardápio que lista todos os países disponíveis e versão atual.
 * URL: https://gtoverlanderwaypoints.blob.core.windows.net/waypoint-regions/manifest.json
 */
export interface Manifest {
  generatedAt: string;
  regions: Record<string, ManifestEntry>;
}

export interface ManifestEntry {
  version: string;
  count: number;
  fileName: string;
  sizeBytes: number;
}

/**
 * Arquivo de waypoints de um país específico.
 * URL: https://gtoverlanderwaypoints.blob.core.windows.net/waypoint-regions/{fileName}
 * Já vem com Content-Encoding: gzip — navegador descomprime automaticamente.
 */
export interface CountryFile {
  country: string;
  version: string;
  generatedAt: string;
  waypoints: Waypoint[];
}

export interface Waypoint {
  id: string;
  nome: string;
  categoria: string;
  lat: number;
  long: number;
  countryCode: string;
  aceitaRv: boolean;
  /**
   * Pontos destacados (curadoria editorial OU patrocinado Business) — recebem
   * caixinha colorida da categoria no mapa. Comuns ficam só com o emoji.
   */
  featured?: boolean;
  /**
   * Ícone customizado pra pontos destacados — pode ser emoji (ex: '✌️' pra Rota Biker)
   * ou (futuramente) URL de logo de marca pra Business. Quando ausente, destacado
   * usa o emoji da categoria por padrão.
   */
  customIcon?: string;
}

/**
 * Geo data extraído dos headers do Vercel (server-side).
 * Vercel injeta esses headers automaticamente baseado no IP do visitante.
 */
export interface GeoData {
  countryCode: string | null; // BR
  countryName: string | null; // Brazil (mapeado pra usar no manifest)
  region: string | null; // SP
  city: string | null; // São Paulo
  lat: number | null;
  long: number | null;
}

/**
 * Categorias disponíveis na base.
 * 12 aparecem no Planejamento do app (mais relevantes pra demo do site).
 * 4 aparecem só no Radar (viewpoint, museum, parking, supermarket).
 */
export type WaypointCategory =
  | 'gas station'
  | 'hotel'
  | 'camping'
  | 'restaurant'
  | 'fast food'
  | 'cafe'
  | 'bakery'
  | 'attraction'
  | 'rest area'
  | 'national park'
  | 'border crossing'
  | 'rv support'
  | 'viewpoint'
  | 'museum'
  | 'parking'
  | 'supermarket';
