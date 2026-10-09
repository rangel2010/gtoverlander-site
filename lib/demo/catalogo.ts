// Catálogo de categorias/subtipos de waypoints, buscado NO SERVIDOR (09/10/2026).
//
// Mesmo padrão do lib/stats.ts: mesma API_BASE, cache de 1 h (revalidate) e
// tempo-limite curto. Servidor-com-servidor, sem CORS. O resultado vai pro
// mapa como prop — o navegador não busca o catálogo.
//
// Se a API não responder, vale o que o cache do Next tiver (a revalidação que
// falha mantém a cópia anterior). Sem nada em cache, devolve null e o mapa
// desenha o pino genérico. Sem tabela de reserva, de propósito.

import { API_BASE } from '@/lib/stats';
import type {
  CatalogoWaypoints,
  CategoriaCatalogo,
  SubtipoCatalogo,
} from '@/lib/demo/categories';

const TIMEOUT_MS = 5000;

const texto = (v: unknown): v is string => typeof v === 'string' && v.length > 0;

function categoriaValida(c: unknown): c is CategoriaCatalogo {
  const x = c as Record<string, unknown>;
  return !!x && texto(x.code) && texto(x.label) && texto(x.color) && texto(x.emoji);
}

function subtipoValido(s: unknown): s is SubtipoCatalogo {
  const x = s as Record<string, unknown>;
  return !!x && texto(x.code) && texto(x.emoji);
}

export async function getCatalogoWaypoints(): Promise<CatalogoWaypoints | null> {
  try {
    const r = await fetch(`${API_BASE}/vocabulary`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!r.ok) return null;
    const d = (await r.json()) as {
      waypoints?: { categorias?: unknown[]; subtipos?: unknown[] };
    };
    const categorias = (d.waypoints?.categorias ?? []).filter(categoriaValida).map((c) => ({
      code: c.code,
      label: c.label,
      color: c.color,
      emoji: c.emoji,
      soNoRadar: c.soNoRadar === true,
      agrupaEm: texto(c.agrupaEm) ? c.agrupaEm : null,
    }));
    if (categorias.length === 0) return null;
    const subtipos = (d.waypoints?.subtipos ?? []).filter(subtipoValido).map((s) => ({
      code: s.code,
      label: texto(s.label) ? s.label : s.code,
      emoji: s.emoji,
      categoria: texto(s.categoria) ? s.categoria : '',
      cruzaEm: texto(s.cruzaEm) ? s.cruzaEm : null,
    }));
    return { categorias, subtipos };
  } catch {
    return null;
  }
}
