// Helper compartilhado pra ler localização do visitante via Vercel Geo headers.
// Em dev local esses headers ficam vazios — front trata fallback.
import { headers } from 'next/headers';
import { isoToCountryName, DEFAULT_COUNTRY } from './countries';
import type { GeoData } from './types';

export function getGeoFromHeaders(): GeoData {
  const h = headers();

  const countryCode = h.get('x-vercel-ip-country');
  const region = h.get('x-vercel-ip-country-region');
  const cityRaw = h.get('x-vercel-ip-city');
  const latStr = h.get('x-vercel-ip-latitude');
  const longStr = h.get('x-vercel-ip-longitude');

  const city = cityRaw ? decodeURIComponent(cityRaw) : null;
  const lat = latStr ? Number(latStr) : null;
  const long = longStr ? Number(longStr) : null;

  return {
    countryCode,
    countryName: isoToCountryName(countryCode) ?? DEFAULT_COUNTRY,
    region,
    city,
    lat: Number.isFinite(lat) ? lat : null,
    long: Number.isFinite(long) ? long : null,
  };
}
