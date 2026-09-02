'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import {
  PRODUCT,
  formatPrice,
  discountPct,
  annualSavingsPct,
} from '@/lib/product-config';

interface Plan {
  name: string;
  monthlyPrice: number;
  monthlyOriginalPrice?: number;
  annualPrice: number;
  annualOriginalPrice?: number;
  descKey: 'free' | 'plus' | 'pro';
  ctaKey: 'free' | 'plus' | 'pro';
  href: string;
  highlight: boolean;
  badge?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Free',
    monthlyPrice: PRODUCT.plans.free.monthlyPrice,
    annualPrice: PRODUCT.plans.free.annualPrice,
    descKey: 'free',
    ctaKey: 'free',
    href: '/baixar',
    highlight: false,
  },
  {
    name: 'Plus',
    monthlyPrice: PRODUCT.plans.plus.monthlyPrice,
    monthlyOriginalPrice: PRODUCT.plans.plus.monthlyOriginalPrice,
    annualPrice: PRODUCT.plans.plus.annualPrice,
    annualOriginalPrice: PRODUCT.plans.plus.annualOriginalPrice,
    descKey: 'plus',
    ctaKey: 'plus',
    href: '/baixar?plan=plus',
    highlight: false,
  },
  {
    name: 'Pro',
    monthlyPrice: PRODUCT.plans.pro.monthlyPrice,
    monthlyOriginalPrice: PRODUCT.plans.pro.monthlyOriginalPrice,
    annualPrice: PRODUCT.plans.pro.annualPrice,
    annualOriginalPrice: PRODUCT.plans.pro.annualOriginalPrice,
    descKey: 'pro',
    ctaKey: 'pro',
    href: '/baixar?plan=pro',
    highlight: true,
    badge: true,
  },
];

/**
 * Economia do ciclo anual sobre 12x o mensal. Usa o MENOR valor entre os planos
 * pagos (Plus 55%, Pro 58%) pra que o número do selo seja verdadeiro em
 * qualquer plano que o visitante escolher, e não só no Pro.
 */
const annualBadgePct = Math.min(
  annualSavingsPct(PRODUCT.plans.plus.monthlyPrice, PRODUCT.plans.plus.annualPrice),
  annualSavingsPct(PRODUCT.plans.pro.monthlyPrice, PRODUCT.plans.pro.annualPrice),
);

/**
 * Selo de economia no toggle Anual. Desligado enquanto todos os planos estão
 * com desconto sobre o preço cheio: o card já mostra "Economize X%" e um
 * segundo percentual no toggle só confunde. Religar (true) quando o desconto
 * de virada sair e o anual voltar a ser a única economia da página.
 */
const SHOW_ANNUAL_BADGE = false;

export function PlansCards() {
  const t = useTranslations('planos.cards');
  const [billing, setBilling] = useState<'mensal' | 'anual'>('anual');

  return (
    <div>
      {/* Toggle Mensal / Anual */}
      <div className="flex justify-center mb-10">
        <div
          role="tablist"
          aria-label="Billing period"
          className="inline-flex bg-gt-card rounded-full p-1 border border-gt-border"
        >
          <button
            type="button"
            role="tab"
            aria-selected={billing === 'mensal'}
            onClick={() => setBilling('mensal')}
            className={`px-5 py-2 text-sm font-sans font-medium rounded-full transition-colors ${
              billing === 'mensal'
                ? 'bg-gt-bg text-gt-text shadow-sm'
                : 'text-gt-text-muted hover:text-gt-text'
            }`}
          >
            {t('billing_mensal')}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={billing === 'anual'}
            onClick={() => setBilling('anual')}
            className={`px-5 py-2 text-sm font-sans font-medium rounded-full transition-colors flex items-center gap-2 ${
              billing === 'anual'
                ? 'bg-gt-bg text-gt-text shadow-sm'
                : 'text-gt-text-muted hover:text-gt-text'
            }`}
          >
            {t('billing_anual')}
            {SHOW_ANNUAL_BADGE && (
              <span className="text-[10px] uppercase tracking-wider bg-gt-orange text-white px-2 py-0.5 rounded">
                −{annualBadgePct}%
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-4">
        {plans.map((p) => {
          const isAnnual = billing === 'anual';
          const isPaid = p.monthlyPrice > 0;

          const displayPrice = isAnnual && isPaid ? p.annualPrice : p.monthlyPrice;
          const periodLabel = !isPaid
            ? t('period_forever')
            : isAnnual
            ? t('period_year')
            : t('period_month');
          const perMonth = isAnnual && isPaid ? p.annualPrice / 12 : 0;
          const annualNote =
            isPaid && isAnnual
              ? t('annual_note', { price: formatPrice(perMonth) })
              : null;

          // Preço cheio que entra em vigor na virada do app novo. Vale pros
          // dois ciclos, então o bloco riscado deixou de ser só do anual.
          const originalPrice = isAnnual
            ? p.annualOriginalPrice
            : p.monthlyOriginalPrice;
          const savingsPct =
            isPaid && originalPrice ? discountPct(originalPrice, displayPrice) : 0;
          const showSavings = savingsPct > 0;

          return (
            <div
              key={p.name}
              className={`bg-gt-card rounded-lg p-7 relative flex flex-col h-full ${
                p.highlight
                  ? 'border-2 border-gt-orange'
                  : 'border border-gt-border'
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded font-sans">
                  {t('badge_recomendado')}
                </span>
              )}

              <h3 className="font-sans text-xl font-medium text-gt-text mb-2 normal-case">
                {p.name}
              </h3>

              {isPaid && originalPrice && (
                <p className="text-xs text-gt-text-dim font-sans mb-1">
                  {t('price_from')}{' '}
                  <span className="line-through">
                    {formatPrice(originalPrice)}/
                    {isAnnual ? t('period_year') : t('period_month')}
                  </span>{' '}
                  {t('price_by')}
                </p>
              )}

              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display text-4xl text-gt-text uppercase tracking-display">
                  {formatPrice(displayPrice)}
                </span>
                <span className="text-sm text-gt-text-muted font-sans">
                  {periodLabel}
                </span>
              </div>

              {annualNote && (
                <p className="text-xs text-gt-text-dim mb-1 font-sans">
                  {annualNote}
                </p>
              )}

              {showSavings && savingsPct > 0 && (
                <p className="text-xs text-gt-orange-text font-medium mb-3 font-sans">
                  {t('savings', { pct: savingsPct })}
                </p>
              )}
              {!showSavings && <div className="mb-3 h-4" />}

              {/* flex-1 empurra o botão pro rodapé do card, alinhando os três
                  CTAs na mesma linha mesmo com descrições de tamanhos diferentes */}
              <p className="text-sm text-gt-text-muted leading-relaxed mb-6 min-h-[4rem] font-sans flex-1">
                {t(`plans.${p.descKey}.desc`)}
              </p>

              <Button
                href={p.href}
                variant={p.highlight ? 'primary' : 'secondary'}
                className="w-full"
              >
                {t(`plans.${p.ctaKey}.cta`)}
              </Button>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gt-text-muted text-center mt-6 font-sans">
        {t('footer')}
      </p>
    </div>
  );
}
