/**
 * A régua dos planos, lida da API do app.
 *
 * Contrato: CONTRATO_REGUA_PLANOS_API.md, e a definição de produto em
 * PLANOS_O_QUE_CADA_UM_ENTREGA.md (04/09/2026), que substituiu tudo que existia
 * antes. Nenhuma página escreve limite de plano à mão — todas leem daqui.
 *
 * O que a API entrega é o preço DE TABELA (o riscado). O preço promocional que
 * o site cobra continua em product-config.ts. Decisão do Rangel em 04/09: fica
 * assim até ele mandar mudar.
 */

const BASE =
  process.env.API_BASE ??
  process.env.NEXT_PUBLIC_API_BASE ??
  'https://beta.gtoverlander.com.br/backend';

const TIMEOUT_MS = 5000;

export type PlanCode = 'free' | 'plus' | 'pro';

export interface Plano {
  code: PlanCode;
  nome: string;
  /** Preço de tabela, em centavos. É o valor que aparece riscado no site. */
  preco: { mensalCentavos: number; anualCentavos: number };
  /** null = ilimitado. NUNCA renderizar null como 0. */
  rotasAtivas: number | null;
  /** null = enquanto a assinatura estiver ativa. No Free, 30 dias. */
  diasParaEditar: number | null;
  /** Países offline ALÉM do de origem, que é grátis em todo plano. */
  paisesEstrangeiros: number;
  anunciosSimultaneos: number;
  aparelhos: number;
  /**
   * Só o Free é true. Significa que as viagens são GASTAS, não ocupadas:
   * apagar não devolve. Todo texto sobre o limite do Free depende disso.
   */
  viagensSaoGastas: boolean;
}

export interface Contribuicao {
  PONTOS_APROVADOS_POR_VIAGEM: number;
  VALIDACOES_NO_LOCAL_POR_VIAGEM: number;
}

export interface Selo {
  VOTOS_PARA_VERIFICADO: number;
  CONFIRMACOES_NO_LOCAL: number;
  MESES_DE_VALIDADE_NO_LOCAL: number;
  VOTOS_PARA_FECHADO: number;
  RAIO_NO_LOCAL_METROS: number;
}

export interface Regua {
  planos: Plano[];
  contribuicao: Contribuicao;
  selo: Selo;
  /** true quando veio da API; false quando caímos no piso. */
  aoVivo: boolean;
}

/**
 * Piso de segurança — valores conferidos contra a API em 04/09/2026.
 * Existe pra a página de planos não sumir se a API cair. Não é fonte:
 * quando divergir da API, é o piso que está errado.
 */
const PISO: Omit<Regua, 'aoVivo'> = {
  planos: [
    {
      code: 'free',
      nome: 'Free',
      preco: { mensalCentavos: 0, anualCentavos: 0 },
      rotasAtivas: 3,
      diasParaEditar: 30,
      paisesEstrangeiros: 0,
      anunciosSimultaneos: 0,
      aparelhos: 1,
      viagensSaoGastas: true,
    },
    {
      code: 'plus',
      nome: 'Plus',
      preco: { mensalCentavos: 1990, anualCentavos: 19990 },
      rotasAtivas: 15,
      diasParaEditar: null,
      paisesEstrangeiros: 2,
      anunciosSimultaneos: 1,
      aparelhos: 2,
      viagensSaoGastas: false,
    },
    {
      code: 'pro',
      nome: 'Pro',
      preco: { mensalCentavos: 2990, anualCentavos: 29990 },
      rotasAtivas: null,
      diasParaEditar: null,
      paisesEstrangeiros: 5,
      anunciosSimultaneos: 3,
      aparelhos: 4,
      viagensSaoGastas: false,
    },
  ],
  contribuicao: {
    PONTOS_APROVADOS_POR_VIAGEM: 5,
    VALIDACOES_NO_LOCAL_POR_VIAGEM: 5,
  },
  selo: {
    VOTOS_PARA_VERIFICADO: 1,
    CONFIRMACOES_NO_LOCAL: 1,
    MESES_DE_VALIDADE_NO_LOCAL: 12,
    VOTOS_PARA_FECHADO: 3,
    RAIO_NO_LOCAL_METROS: 200,
  },
};

const ORDEM: PlanCode[] = ['free', 'plus', 'pro'];

export async function getRegua(): Promise<Regua> {
  try {
    const r = await fetch(`${BASE}/public/planos`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!r.ok) return { ...PISO, aoVivo: false };

    const d = (await r.json()) as Partial<Omit<Regua, 'aoVivo'>>;
    if (!Array.isArray(d.planos) || d.planos.length === 0) {
      return { ...PISO, aoVivo: false };
    }

    // A ordem da resposta não é contrato — ordenamos aqui.
    const planos = ORDEM.map(
      (code) =>
        d.planos!.find((p) => p.code === code) ??
        PISO.planos.find((p) => p.code === code)!,
    );

    return {
      planos,
      contribuicao: d.contribuicao ?? PISO.contribuicao,
      selo: d.selo ?? PISO.selo,
      aoVivo: true,
    };
  } catch {
    return { ...PISO, aoVivo: false };
  }
}

/** Atalho pra pegar um plano pelo código sem repetir find em toda página. */
export function plano(regua: Regua, code: PlanCode): Plano {
  return regua.planos.find((p) => p.code === code)!;
}

/**
 * Formata um limite numérico. `null` vira o texto de ilimitado que a página
 * passar — nunca 0, nunca vazio.
 */
export function limite(n: number | null, ilimitado: string): string {
  return n === null ? ilimitado : String(n);
}

/** 1990 → "R$ 19,90". Preço de tabela, usado no riscado. */
export function reais(centavos: number, locale = 'pt-BR'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
  }).format(centavos / 100);
}
