/**
 * GT Overlander — Fonte única de verdade do produto
 *
 * Altere AQUI quando mudar preços, limites, contagens ou status de features.
 * Componentes e JSON-LD consomem este arquivo — não editar valores diretamente neles.
 */

/**
 * Endereço do webapp — o "Acessar pelo computador" do header, do rodapé e da
 * página de download.
 *
 * Aponta pro beta desde 06/09/2026: o `app.` ainda serve a V1 e o beta já está
 * mais próximo do produto real. Na virada de domínio o beta vira `app.`, e aí
 * é trocar AQUI — ou definir WEB_APP_URL no ambiente, que sobrepõe sem deploy.
 * Ver a seção "três domínios" no CLAUDE.md do gtoverlander-app.
 */
export const WEB_APP_URL =
  process.env.WEB_APP_URL ?? 'https://beta.gtoverlander.com.br';

export const PRODUCT = {
  // ── Base de waypoints ────────────────────────────────────────────────────
  waypointCount: 4_000_000,
  waypointCountLabel: '4M+',
  countries: 211, // piso: o valor real vem da API (lib/stats.ts)
  categories: 16,
  filters: 10,

  // ── Planos ───────────────────────────────────────────────────────────────
  plans: {
    // ATENÇÃO: estes valores são PISO, não fonte.
    //
    // O preço exibido vem da API (lib/planos.ts). Em 05/09/2026 o desconto do
    // site acabou junto com a subida do app novo: o preço de tabela passou a ser
    // o preço cobrado, e não existe mais riscado nos planos pessoais. Só a Conta
    // Business mantém "de/por" — ela está fora da régua.
    //
    // Os limites de plano (viagens, países offline, anúncios, aparelhos) saíram
    // daqui em 04/09/2026 e também vêm da API — ver
    // PLANOS_O_QUE_CADA_UM_ENTREGA.md. Não reintroduza limite neste arquivo:
    // ele volta a envelhecer calado, que foi exatamente o problema.
    free: {
      monthlyPrice: 0,
      annualPrice: 0,
    },
    plus: {
      monthlyPrice: 19.90,
      annualPrice: 199.90,
    },
    pro: {
      monthlyPrice: 29.90,
      annualPrice: 299.90,
    },
  },

  // ── Status das features ──────────────────────────────────────────────────
  features: {
    offline:          'AVAILABLE'  as const,
    social:           'AVAILABLE'  as const,
    desapega:         'AVAILABLE'  as const,
    explorer:         'COMING_SOON' as const,
    business:         'WAITLIST'   as const,
    // Desligado em 04/09/2026: a feature saiu do app na V2, mas volta no
    // futuro. A página em /recursos/help-overlander continua no repo e é
    // religada trocando isto pra 'COMING_SOON' ou 'AVAILABLE' — ver
    // HELP_OVERLANDER_ATIVO em app/[locale]/recursos/help-overlander/page.tsx.
    helpOverlander:   'DISABLED'   as const,
  },

  // ── Plataformas ──────────────────────────────────────────────────────────
  platforms: {
    android:      true,
    ios:          true,
    web:          true,
    carplay:      true,
    androidAuto:  true,
  },
} as const;

// Helpers de formatação
export function formatPrice(value: number, locale = 'pt-BR'): string {
  if (value === 0) return 'R$ 0';
  return value.toLocaleString(locale, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

export function annualSavingsPct(monthly: number, annual: number): number {
  if (monthly === 0) return 0;
  return Math.round(((monthly * 12 - annual) / (monthly * 12)) * 100);
}

/**
 * Desconto do preço atual em relação ao preço cheio que passa a valer na
 * virada do app novo. É esse número que aparece no selo dos cards, no lugar
 * da antiga comparação anual-vs-mensal (que continua comunicada pelo
 * "Equivale a X por mês").
 */
export function discountPct(original: number, current: number): number {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}
