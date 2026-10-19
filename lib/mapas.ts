/**
 * Mapas de pontos dentro dos artigos do blog (19/10/2026).
 *
 * O artigo marca onde o mapa entra com uma linha sozinha no corpo (Sanity):
 *   [[mapa:rota-biker]]
 * A página do post corta o texto nessa linha e põe o mapa no lugar.
 *
 * Os pontos vêm de um mapa do Google (My Maps) público, lido uma vez por dia.
 * Monumento novo que entrar lá aparece sozinho no artigo. Se o Google não
 * responder, o mapa simplesmente não aparece (o texto do artigo segue normal).
 */

export type StatusPonto = 'pronto' | 'construcao';

export type PontoMapa = {
  nome: string;
  lat: number;
  lng: number;
  status: StatusPonto;
  /** Observação do mapa original quando foge do padrão (ex.: onde carimbar). */
  nota?: string;
};

type FonteMapa = {
  /** Endereço de exportação do My Maps em KML puro (forcekml=1). */
  kml: string;
  /** Página pública do mapa original, pra quem quiser abrir lá. */
  original: string;
  titulo: string;
};

export const MAPAS: Record<string, FonteMapa> = {
  'rota-biker': {
    kml: 'https://www.google.com/maps/d/kml?mid=1ZHPck3Yykbhc8M1GYPrCcKf5pajiTvk&forcekml=1',
    original: 'https://www.google.com/maps/d/viewer?mid=1ZHPck3Yykbhc8M1GYPrCcKf5pajiTvk',
    titulo: 'Mapa dos monumentos da Rota Biker',
  },
};

/** Linha do corpo do post que marca o mapa. */
export const MARCA_MAPA = /^[ \t]*\[\[mapa:([a-z0-9-]+)\]\][ \t]*$/m;

const ENTIDADES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
};

function limpar(txt: string): string {
  return txt
    .replace(/^<!\[CDATA\[/, '')
    .replace(/\]\]>$/, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(amp|lt|gt|quot|#39|apos);/g, (e) => ENTIDADES[e] ?? e)
    .replace(/\s+/g, ' ')
    .trim();
}

function tag(bloco: string, nome: string): string {
  const m = bloco.match(new RegExp(`<${nome}>([\\s\\S]*?)</${nome}>`));
  return m ? limpar(m[1]) : '';
}

/** Lê os pontos do KML. Só entram os que estão prontos ou em construção. */
export function lerKml(kml: string): PontoMapa[] {
  const pontos: PontoMapa[] = [];
  for (const [, bloco] of kml.matchAll(/<Placemark>([\s\S]*?)<\/Placemark>/g)) {
    const coord = bloco.match(/<coordinates>\s*([-\d.]+)\s*,\s*([-\d.]+)/);
    if (!coord) continue;
    const lng = Number(coord[1]);
    const lat = Number(coord[2]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

    const nome = tag(bloco, 'name');
    const desc = tag(bloco, 'description');
    const D = desc.toUpperCase();
    let status: StatusPonto | null = null;
    if (D.includes('CONSTRU')) status = 'construcao';
    else if (D.includes('PRONTO')) status = 'pronto';
    if (!status || !nome) continue; // sem situação informada: fica de fora

    const padrao = /^MONUMENTO PRONTO E CARIMBANDO\.?$/i.test(desc) || /^EM CONSTRU[ÇC][ÃA]O\.?$/i.test(desc);
    pontos.push({ nome, lat, lng, status, ...(padrao ? {} : { nota: desc }) });
  }
  return pontos;
}

export async function getPontosMapa(chave: string): Promise<PontoMapa[] | null> {
  const fonte = MAPAS[chave];
  if (!fonte) return null;
  try {
    const res = await fetch(fonte.kml, {
      next: { revalidate: 86400 }, // uma vez por dia
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const pontos = lerKml(await res.text());
    return pontos.length ? pontos : null;
  } catch {
    return null;
  }
}
