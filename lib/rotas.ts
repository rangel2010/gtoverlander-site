// Páginas de rota do site (02/10/2026).
//
// Duas fontes, cada uma com o que sabe:
//  - Sanity ("Rota do site"): QUAIS rotas aparecem, o endereço, o texto pro
//    Google, a capa e o artigo relacionado. Só entra no site o que o Rangel
//    cadastrar lá.
//  - App (endereço público da rota, sem login): a ficha — km, dias,
//    dificuldade, épocas, paradas e o traçado. Mudou no app, muda no site.

import { sanityClient } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import { WEB_APP_URL } from '@/lib/product-config';

const API_ROTA = 'https://beta.gtoverlander.com.br/backend/routes';
const REVALIDAR = 3600; // 1 hora: ajuste feito no app aparece no site em até 1h

/* ---------------- Sanity ---------------- */

export interface RotaSite {
  _id: string;
  _updatedAt: string;
  titulo?: string;
  slug: string;
  appRouteId: string;
  descricaoSeo?: string;
  paises?: string[];
  capa?: unknown;
  capaAlt?: string;
  capaCredito?: string;
  corpo?: string;
  ordem?: number;
  artigo?: ArtigoLigado | null;
  maisArtigos?: ArtigoLigado[] | null;
}

export interface ArtigoLigado {
  title: string;
  slug: string;
  description?: string;
  coverImage?: unknown;
  coverImageAlt?: string;
}

const CAMPOS = `
  _id, _updatedAt, titulo, "slug": slug.current, appRouteId, descricaoSeo, paises,
  capa, capaAlt, capaCredito, corpo, ordem,
  "artigo": artigo->{ title, "slug": slug.current, description, coverImage, coverImageAlt },
  "maisArtigos": maisArtigos[]->{ title, "slug": slug.current, description, coverImage, coverImageAlt }
`;

const FILTRO = `_type == "rotaSite" && mostrar != false && defined(slug.current) && defined(appRouteId)`;

export async function getRotasSite(): Promise<RotaSite[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<RotaSite[]>(
      `*[${FILTRO}] | order(coalesce(ordem, 9999) asc, _createdAt asc) { ${CAMPOS} }`,
      {},
      { next: { revalidate: 60 } }
    );
  } catch (e) {
    console.error('[rotas] getRotasSite:', e);
    return [];
  }
}

export async function getRotaSite(slug: string): Promise<RotaSite | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<RotaSite | null>(
      `*[${FILTRO} && slug.current == $slug][0] { ${CAMPOS} }`,
      { slug },
      { next: { revalidate: 60 } }
    );
  } catch (e) {
    console.error('[rotas] getRotaSite:', e);
    return null;
  }
}

/** Capa da rota; sem capa própria, a do artigo relacionado. */
export function capaDaRota(r: RotaSite, w = 1600, h = 900) {
  const src = r.capa ?? r.artigo?.coverImage;
  const url = urlForImage(src as never)?.width(w).height(h).url() ?? null;
  const alt = (r.capa ? r.capaAlt : r.artigo?.coverImageAlt) || r.titulo || '';
  return { url, alt, credito: r.capa ? r.capaCredito : undefined };
}

/* ---------------- App ---------------- */

export interface Ponto {
  nome: string;
  lat: number;
  lng: number;
  /** km desde a partida, medido sobre o traçado */
  km?: number;
}

export interface FichaRota {
  id: string;
  titulo: string;
  descricao: string;
  origem: Ponto;
  destino: Ponto;
  paradas: Ponto[];
  km: number;
  horasDirigindo: number;
  dias: number | null;
  dificuldade: string | null;
  epocas: string[];
  tracado: [number, number][]; // [lat, lng]
  visitas: number;
  salvamentos: number;
  nota: number | null;
  avaliacoes: number;
  urlApp: string;
}

const DIFICULDADE: Record<string, string> = {
  FACIL: 'Fácil',
  MODERADA: 'Moderada',
  MODERADO: 'Moderada',
  MEDIA: 'Moderada',
  DIFICIL: 'Difícil',
  EXTREMA: 'Extrema',
};

const EPOCA: Record<string, string> = {
  VERAO: 'Verão',
  OUTONO: 'Outono',
  INVERNO: 'Inverno',
  PRIMAVERA: 'Primavera',
};

export const nomeDificuldade = (d: string | null) => (d ? DIFICULDADE[d] ?? d : null);
export const nomeEpoca = (e: string) => EPOCA[e] ?? e;

function distKm(a: [number, number], b: [number, number]) {
  const R = 6371;
  const rad = Math.PI / 180;
  const dLat = (b[0] - a[0]) * rad;
  const dLng = (b[1] - a[1]) * rad;
  const s =
    Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/**
 * Km de cada parada desde a partida: acha o ponto do traçado mais perto da
 * parada e soma o caminho até ali. O traçado guardado é simplificado, então a
 * soma é ajustada pra fechar com a distância oficial da rota.
 */
function kmDasParadas(tracado: [number, number][], pontos: Ponto[], kmTotal: number) {
  if (tracado.length < 2) return;
  const acumulado = [0];
  for (let i = 1; i < tracado.length; i++) acumulado.push(acumulado[i - 1] + distKm(tracado[i - 1], tracado[i]));
  const fator = acumulado[acumulado.length - 1] > 0 ? kmTotal / acumulado[acumulado.length - 1] : 1;
  let desde = 0; // as paradas estão em ordem: a busca anda sempre pra frente
  for (const p of pontos) {
    let melhor = desde;
    let menor = Infinity;
    for (let i = desde; i < tracado.length; i++) {
      const d = distKm(tracado[i], [p.lat, p.lng]);
      if (d < menor) {
        menor = d;
        melhor = i;
      }
    }
    desde = melhor;
    p.km = Math.round(acumulado[melhor] * fator);
  }
}

/** Ficha da rota vinda do app. null se a rota não existe ou não está pública. */
export async function getFichaRota(appRouteId: string): Promise<FichaRota | null> {
  try {
    const res = await fetch(`${API_ROTA}/${encodeURIComponent(appRouteId)}`, {
      next: { revalidate: REVALIDAR },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const r = json?.data ?? json;
    if (!r?.id || r.isPublic === false) return null;

    let tracado: [number, number][] = [];
    try {
      const bruto = typeof r.polyline === 'string' ? JSON.parse(r.polyline) : r.polyline;
      if (Array.isArray(bruto)) tracado = bruto.filter((p: unknown) => Array.isArray(p) && p.length >= 2);
    } catch {
      tracado = [];
    }

    const km = Math.round((r.distanceMeters ?? 0) / 1000);
    const origem: Ponto = { nome: r.originName, lat: r.originLat, lng: r.originLng, km: 0 };
    const destino: Ponto = { nome: r.destinationName, lat: r.destinationLat, lng: r.destinationLng, km };
    const paradas: Ponto[] = (r.stops ?? [])
      .slice()
      .sort((a: { ord: number }, b: { ord: number }) => a.ord - b.ord)
      .map((s: Record<string, any>) => ({
        nome: s.customName ?? s.waypoint?.name ?? 'Parada',
        lat: s.customLat ?? s.waypoint?.latitude,
        lng: s.customLng ?? s.waypoint?.longitude,
      }))
      .filter((p: Ponto) => typeof p.lat === 'number' && typeof p.lng === 'number');
    kmDasParadas(tracado, paradas, km);

    return {
      id: r.id,
      titulo: r.publicTitle || r.title,
      descricao: r.publicDescription || r.description || '',
      origem,
      destino,
      paradas,
      km,
      horasDirigindo: Math.round((r.durationSeconds ?? 0) / 3600),
      dias: r.estimatedDays ?? null,
      dificuldade: r.difficulty ?? null,
      epocas: Array.isArray(r.bestSeasons) ? r.bestSeasons : [],
      tracado,
      visitas: r.viewCount ?? 0,
      salvamentos: r.savedCount ?? 0,
      nota: r.ratingAvg ?? null,
      avaliacoes: r.ratingCount ?? 0,
      urlApp: `${WEB_APP_URL}/rotas/${r.id}`,
    };
  } catch (e) {
    console.error('[rotas] getFichaRota:', e);
    return null;
  }
}

/** Nome curto da cidade: "Chuy, Rocha" → "Chuy". */
export const cidade = (nome: string) => nome.split(',')[0].trim();
