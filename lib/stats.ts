/**
 * Números reais do GT Overlander, lidos da API do app.
 *
 * Contrato: CONTRATO_NUMEROS_API.md (escrito pela aba do gtoverlander-app).
 * Regra de ouro: nenhuma página escreve esses números à mão — todas leem daqui.
 *
 * DESVIO PROPOSITAL DO CONTRATO — países.
 * O contrato expõe `paises` vindo do manifesto do acervo. Não consumimos esse
 * campo: o manifesto conta ENTRADAS, não países, e tem duplicata real
 * ("Bolivia" e "Bolivia, Plurinational State of"; idem Venezuela) além de
 * entradas simbólicas (Hong Kong com 1 waypoint, Tokelau com 1, Pitcairn com 2).
 * Decisão do Rangel em 02/09/2026: países segue fixo em PRODUCT.countries,
 * alinhado com todo o resto do site. Se um dia a API passar a devolver uma
 * contagem depurada, é só voltar a ler daqui.
 */

import { PRODUCT } from './product-config';

export interface Stats {
  usuarios: number;
  waypoints: number;
  rotasCriadas: number;
  /** Fixo em PRODUCT.countries — ver nota de desvio no topo do arquivo. */
  paises: number;
  /** true quando os números vieram da API; false quando caímos no piso. */
  aoVivo: boolean;
}

/**
 * Última medição real conhecida, usada enquanto a API não responde.
 *
 * NÃO é estimativa nem arredondamento: são os valores exatos apurados em
 * 02/09/2026, registrados no CONTRATO_NUMEROS_API.md. Assim a página mostra
 * número verdadeiro desde o primeiro dia, e a API simplesmente passa por cima
 * assim que entrar no ar.
 *
 * Se for atualizar à mão algum dia, copie do endpoint — nunca chute.
 */
const ULTIMA_MEDICAO = {
  usuarios: 9294,
  waypoints: 4_234_460,
  rotasCriadas: 128,
  em: '2026-09-02',
} as const;

/**
 * Lido em runtime, não no build. O contrato sugeria NEXT_PUBLIC_API_BASE, mas
 * variável NEXT_PUBLIC_ é inlinada no bundle na hora do build — trocar ela na
 * Vercel exigiria redeploy, justamente o que o contrato queria evitar na virada
 * de beta. → app. Como esse fetch é 100% server-side, uma variável comum
 * resolve e passa a valer sem novo deploy. NEXT_PUBLIC_ fica no fallback só pra
 * não quebrar se alguém já tiver configurado assim.
 */
const BASE =
  process.env.API_BASE ??
  process.env.NEXT_PUBLIC_API_BASE ??
  'https://beta.gtoverlander.com.br/backend';

/** Segura o build se a API estiver pendurada: melhor cair no piso que travar. */
const TIMEOUT_MS = 5000;

export async function getStats(): Promise<Stats> {
  const base: Stats = {
    usuarios: ULTIMA_MEDICAO.usuarios,
    waypoints: ULTIMA_MEDICAO.waypoints,
    rotasCriadas: ULTIMA_MEDICAO.rotasCriadas,
    paises: PRODUCT.countries,
    aoVivo: false,
  };

  try {
    const r = await fetch(`${BASE}/public/stats`, {
      // A API já cacheia 1h do lado dela. Na pior das hipóteses o número tem
      // 2h de idade, irrelevante nessa escala.
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!r.ok) return base;

    const d = (await r.json()) as Partial<Record<keyof Stats, unknown>>;
    const num = (v: unknown): number | null =>
      typeof v === 'number' && Number.isFinite(v) && v > 0 ? Math.floor(v) : null;

    const usuarios = num(d.usuarios);
    const waypoints = num(d.waypoints);
    const rotasCriadas = num(d.rotasCriadas);

    return {
      usuarios: usuarios ?? base.usuarios,
      waypoints: waypoints ?? base.waypoints,
      rotasCriadas: rotasCriadas ?? base.rotasCriadas,
      paises: PRODUCT.countries,
      aoVivo: usuarios !== null && waypoints !== null && rotasCriadas !== null,
    };
  } catch {
    return base;
  }
}

const MILHOES: Record<string, string> = {
  pt: 'milhões',
  es: 'millones',
  en: 'million',
};

/** 4234460 → "4,2 milhões" · 9294 → "9.294". Para texto de marketing. */
export function porExtenso(n: number, locale = 'pt-BR'): string {
  const idioma = locale.slice(0, 2);
  if (n >= 1_000_000) {
    const v = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(
      n / 1_000_000,
    );
    return `${v} ${MILHOES[idioma] ?? MILHOES.en}`;
  }
  return new Intl.NumberFormat(locale).format(n);
}

/**
 * 9294 → "9.000". Para construções de "mais de X".
 * Sempre arredonda PRA BAIXO — arredondar pra cima vira afirmação falsa.
 */
export function maisDe(n: number, locale = 'pt-BR'): string {
  const passo =
    n >= 100_000 ? 10_000 : n >= 10_000 ? 1_000 : n >= 1_000 ? 500 : 100;
  return new Intl.NumberFormat(locale).format(Math.floor(n / passo) * passo);
}
