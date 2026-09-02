/**
 * GT Overlander — Fonte única de verdade do produto
 *
 * Altere AQUI quando mudar preços, limites, contagens ou status de features.
 * Componentes e JSON-LD consomem este arquivo — não editar valores diretamente neles.
 */

export const PRODUCT = {
  // ── Base de waypoints ────────────────────────────────────────────────────
  waypointCount: 4_000_000,
  waypointCountLabel: '4M+',
  countries: 209,
  categories: 16,
  filters: 10,

  // ── Planos ───────────────────────────────────────────────────────────────
  plans: {
    free: {
      monthlyPrice: 0,
      annualPrice: 0,
      routeExports: { quantity: 1, periodDays: 90 },
      radarQueriesPerDay: 1,
      offlineRule: 'APP_STORE_COUNTRY' as const,
    },
    // Os preços "Original" são os cheios, que passam a valer na virada do app
    // novo. Aparecem riscados ao lado do preço atual, sinalizando que quem
    // assina agora trava a condição antiga.
    plus: {
      monthlyPrice: 14.90,
      monthlyOriginalPrice: 19.90,
      annualPrice: 79.90,
      annualOriginalPrice: 199.90,
      routeExportsPerMonth: 2,
      radarQueriesPerDay: 5,
      offlineRule: 'ALL_209_COUNTRIES' as const,
    },
    pro: {
      monthlyPrice: 19.90,
      monthlyOriginalPrice: 29.90,
      annualPrice: 99.90,
      annualOriginalPrice: 299.90,
      routeExports: 'unlimited' as const,
      radarQueries: 'unlimited' as const,
      offlineRule: 'ALL_209_COUNTRIES' as const,
    },
  },

  // ── Status das features ──────────────────────────────────────────────────
  features: {
    offline:          'AVAILABLE'  as const,
    social:           'AVAILABLE'  as const,
    helpOverlander:   'AVAILABLE'  as const,
    desapega:         'AVAILABLE'  as const,
    explorer:         'COMING_SOON' as const,
    business:         'WAITLIST'   as const,
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
