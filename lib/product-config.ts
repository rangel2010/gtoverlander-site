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
    plus: {
      monthlyPrice: 14.90,
      annualPrice: 79.90,
      annualOriginalPrice: 149.90,
      routeExportsPerMonth: 2,
      radarQueriesPerDay: 5,
      offlineRule: 'ALL_209_COUNTRIES' as const,
    },
    pro: {
      monthlyPrice: 19.90,
      annualPrice: 99.90,
      annualOriginalPrice: 189.90,
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
