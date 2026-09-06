'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { formatPrice, annualSavingsPct } from '@/lib/product-config';
import type { PlanCode, Regua } from '@/lib/planos';

interface Plan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  descKey: PlanCode;
  ctaKey: PlanCode;
  href: string;
  highlight: boolean;
  badge?: boolean;
}

/**
 * Preço vem da API (a régua), em centavos. Desde 05/09/2026 não existe mais
 * desconto nos planos pessoais: o preço de tabela é o preço cobrado, então
 * não há riscado nem selo de economia. Só a Conta Business mantém "de/por",
 * e ela é uma seção separada, fora deste componente.
 */
const META: Record<PlanCode, Omit<Plan, 'name' | 'monthlyPrice' | 'annualPrice'>> = {
  free: { descKey: 'free', ctaKey: 'free', href: '/baixar', highlight: false },
  plus: { descKey: 'plus', ctaKey: 'plus', href: '/baixar?plan=plus', highlight: false },
  pro:  { descKey: 'pro',  ctaKey: 'pro',  href: '/baixar?plan=pro',  highlight: true, badge: true },
};

/**
 * Selo de economia no toggle Anual. Desligado hoje: com o anual valendo 10x o
 * mensal, o "Equivale a X por mês" já comunica a vantagem sem um segundo
 * percentual competindo com ele. Religar trocando pra true.
 */
const SHOW_ANNUAL_BADGE = false;

export function PlansCards({ regua }: { regua: Regua }) {
  const t = useTranslations('planos.cards');
  const [billing, setBilling] = useState<'mensal' | 'anual'>('anual');

  const daRegua = (code: PlanCode) => regua.planos.find((x) => x.code === code)!;

  // Preços vindos da régua (centavos → reais). Nenhum preço escrito à mão.
  const plans: Plan[] = (['free', 'plus', 'pro'] as PlanCode[]).map((code) => {
    const p = daRegua(code);
    return {
      name: p.nome,
      monthlyPrice: p.preco.mensalCentavos / 100,
      annualPrice: p.preco.anualCentavos / 100,
      ...META[code],
    };
  });

  const annualBadgePct = Math.min(
    annualSavingsPct(
      daRegua('plus').preco.mensalCentavos / 100,
      daRegua('plus').preco.anualCentavos / 100,
    ),
    annualSavingsPct(
      daRegua('pro').preco.mensalCentavos / 100,
      daRegua('pro').preco.anualCentavos / 100,
    ),
  );

  // Números que entram nas descrições dos cards. Nenhum é escrito na tradução:
  // a mensagem tem placeholder e o valor vem da régua.
  const valores = (code: PlanCode) => {
    const p = daRegua(code);
    return {
      viagens: p.rotasAtivas ?? 0,
      paises: p.paisesEstrangeiros,
      anuncios: p.anunciosSimultaneos,
      aparelhos: p.aparelhos,
    };
  };

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

              <div className="mb-3 h-4" />

              {/* flex-1 empurra o botão pro rodapé do card, alinhando os três
                  CTAs na mesma linha mesmo com descrições de tamanhos diferentes */}
              <p className="text-sm text-gt-text-muted leading-relaxed mb-6 min-h-[4rem] font-sans flex-1">
                {t(`plans.${p.descKey}.desc`, valores(p.descKey))}
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
