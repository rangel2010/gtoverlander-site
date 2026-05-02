// Mapeamento ISO 2-letter country code → nome do país no manifest do GT.
// Vercel entrega o ISO via header `x-vercel-ip-country` (ex: BR).
// Manifest usa nomes em inglês (ex: Brazil).

const ISO_TO_COUNTRY_NAME: Record<string, string> = {
  // América Latina (mercado principal)
  BR: 'Brazil',
  AR: 'Argentina',
  CL: 'Chile',
  UY: 'Uruguay',
  PY: 'Paraguay',
  BO: 'Bolivia',
  PE: 'Peru',
  CO: 'Colombia',
  VE: 'Venezuela',
  EC: 'Ecuador',
  GY: 'Guyana',
  SR: 'Suriname',
  GF: 'French Guiana',
  // América Central / Norte
  MX: 'Mexico',
  US: 'United States',
  CA: 'Canada',
  CR: 'Costa Rica',
  PA: 'Panama',
  GT: 'Guatemala',
  HN: 'Honduras',
  NI: 'Nicaragua',
  SV: 'El Salvador',
  BZ: 'Belize',
  CU: 'Cuba',
  DO: 'Dominican Republic',
  // Europa (turismo + comunidade)
  PT: 'Portugal',
  ES: 'Spain',
  FR: 'France',
  IT: 'Italy',
  DE: 'Germany',
  GB: 'United Kingdom',
  IE: 'Ireland',
  NL: 'Netherlands',
  BE: 'Belgium',
  CH: 'Switzerland',
  AT: 'Austria',
  // Demais comuns
  AU: 'Australia',
  NZ: 'New Zealand',
  JP: 'Japan',
  ZA: 'South Africa',
};

/**
 * Converte ISO country code (BR) pro nome usado no manifest (Brazil).
 * Retorna null se não tiver mapeamento.
 */
export function isoToCountryName(iso: string | null): string | null {
  if (!iso) return null;
  return ISO_TO_COUNTRY_NAME[iso.toUpperCase()] ?? null;
}

/**
 * País default quando detecção falha ou país não está no manifest.
 * Brasil é o mercado principal hoje.
 */
export const DEFAULT_COUNTRY = 'Brazil';

/**
 * Centro geográfico aproximado pra fallback quando não temos lat/long do visitante.
 */
export const DEFAULT_CENTER: { lat: number; long: number; zoom: number } = {
  lat: -15.7,
  long: -47.9,
  zoom: 4,
};
