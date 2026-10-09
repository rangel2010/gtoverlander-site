// Categorias e subtipos dos waypoints da demo (mapa de degustação).
//
// 09/10/2026: deixou de ser tabela escrita à mão. A fonte é o catálogo público
// do app — GET {API_BASE}/vocabulary → waypoints.categorias e waypoints.subtipos
// — buscado NO SERVIDOR (lib/demo/catalogo.ts) e entregue ao mapa como prop.
// O `code` com sublinhado (gas_station) é o canônico desde 14/09; a tabela
// antiga, com espaço ('gas station') e sem market/atm, era o resto daquele
// defeito sobrevivendo neste repositório.
//
// ⚠️ Não criar tabela de reserva aqui. Sem catálogo (API fora e cache vazio),
// tudo cai no pino genérico — é proposital.

/** Uma categoria como o catálogo entrega. */
export interface CategoriaCatalogo {
  code: string;
  label: string;
  color: string;
  emoji: string;
  soNoRadar: boolean;
  /** Código da categoria em cujo filtro esta entra (ex.: guesthouse → hotel). */
  agrupaEm: string | null;
}

/** Um subtipo (customIcon do ponto) como o catálogo entrega. */
export interface SubtipoCatalogo {
  code: string;
  label: string;
  emoji: string;
  categoria: string;
  cruzaEm: string | null;
}

export interface CatalogoWaypoints {
  categorias: CategoriaCatalogo[];
  subtipos: SubtipoCatalogo[];
}

export interface CategoryConfig {
  label: string;
  emoji: string;
  color: string;
}

/** Pino genérico: o que aparece quando o código não está no catálogo. */
const GENERICO = { emoji: '📍', color: '#707070' };

function rotuloDoCodigo(code: string): string {
  return code.replace(/[_-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** customIcon que não é um código (ex.: '✌️' legado da Rota Biker) passa direto. */
function ehCodigo(s: string): boolean {
  return /^[a-z0-9_]+$/.test(s);
}

export interface Catalogo {
  /** Códigos de todas as categorias, na ordem do catálogo. */
  codigos: string[];
  /** Label, emoji e cor da categoria. Fora do catálogo → pino genérico. */
  config(code: string): CategoryConfig;
  /** Chave do filtro (chip) onde a categoria entra: `agrupaEm` ou ela mesma. */
  grupo(code: string): string;
  /** Ordena chaves de filtro pela ordem do catálogo; desconhecidas no fim. */
  ordenarGrupos(keys: string[]): string[];
  /** Emoji do subtipo. Código desconhecido → '' (usa o emoji da categoria). */
  emojiDoSubtipo(customIcon: string): string;
}

export function criarCatalogo(dados: CatalogoWaypoints | null): Catalogo {
  const categorias = new Map((dados?.categorias ?? []).map((c) => [c.code, c]));
  const subtipos = new Map((dados?.subtipos ?? []).map((s) => [s.code, s]));
  const ordem = Array.from(categorias.keys());

  const config = (code: string): CategoryConfig => {
    const c = categorias.get(code);
    if (c) return { label: c.label, emoji: c.emoji, color: c.color };
    return { label: rotuloDoCodigo(code), ...GENERICO };
  };

  return {
    codigos: ordem,
    config,
    grupo: (code) => categorias.get(code)?.agrupaEm ?? code,
    ordenarGrupos: (keys) =>
      [...keys].sort((a, b) => {
        const ai = ordem.indexOf(a);
        const bi = ordem.indexOf(b);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return a.localeCompare(b);
      }),
    emojiDoSubtipo: (customIcon) => {
      if (!customIcon) return '';
      const s = subtipos.get(customIcon);
      if (s) return s.emoji;
      return ehCodigo(customIcon) ? '' : customIcon;
    },
  };
}
