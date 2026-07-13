'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { PRODUCT, formatPrice, annualSavingsPct } from '@/lib/product-config';

interface Plan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  /** Preço anual de tabela ("cheio") — quando definido, aparece riscado acima do preço promocional */
  annualOriginalPrice?: number;
  desc: string;
  cta: { label: string; href: string };
  highlight: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    name: 'Free',
    monthlyPrice: PRODUCT.plans.free.monthlyPrice,
    annualPrice: PRODUCT.plans.free.annualPrice,
    desc: 'Pra começar a explorar. Crie quantas rotas quiser e exporte 1 para navegação a cada 90 dias. Radar 1 vez por dia. Sem prazo pra acabar.',
    cta: { label: 'Começar grátis', href: '/baixar' },
    highlight: false,
  },
  {
    name: 'Plus',
    monthlyPrice: PRODUCT.plans.plus.monthlyPrice,
    annualPrice: PRODUCT.plans.plus.annualPrice,
    annualOriginalPrice: PRODUCT.plans.plus.annualOriginalPrice,
    desc: 'Pra quem viaja com frequência. Crie quantas rotas quiser, exporte até 2 por mês para navegação e consulte o Radar até 5 vezes por dia. Inclui IA avançada e Modo Offline internacional.',
    cta: { label: 'Assinar Plus', href: '/baixar?plan=plus' },
    highlight: false,
  },
  {
    name: 'Pro',
    monthlyPrice: PRODUCT.plans.pro.monthlyPrice,
    annualPrice: PRODUCT.plans.pro.annualPrice,
    annualOriginalPrice: PRODUCT.plans.pro.annualOriginalPrice,
    desc: 'Pra quem não quer pensar em limites. Exportações de rotas e Radar de Waypoints ilimitados, IA avançada e suporte prioritário.',
    cta: { label: 'Assinar Pro', href: '/baixar?plan=pro' },
    highlight: true,
    badge: 'Recomendado',
  },
];

export function PlansCards() {
  const [billing, setBilling] = useState<'mensal' | 'anual'>('anual');

  return (
    <div>
      {/* Toggle Mensal / Anual */}
      <div className="flex justify-center mb-10">
        <div
          role="tablist"
          aria-label="Período de cobrança"
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
            Mensal
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
            Anual
            <span className="text-[10px] uppercase tracking-wider bg-gt-orange text-white px-2 py-0.5 rounded">
              −58%
            </span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-4">
        {plans.map((p) => {
          const isAnnual = billing === 'anual';
          const isPaid = p.monthlyPrice > 0;

          // Anual: valor cheio anual = número grande (anchor); equivalência mensal = pequeno embaixo
          // Mensal: valor mensal = número grande
          const displayPrice = isAnnual && isPaid ? p.annualPrice : p.monthlyPrice;
          const periodLabel = !isPaid ? 'pra sempre' : isAnnual ? 'por ano' : 'por mês';
          const perMonth = isAnnual && isPaid ? p.annualPrice / 12 : 0;
          const annualNote =
            isPaid && isAnnual
              ? `Equivale a ${formatPrice(perMonth)} por mês`
              : null;
          const showSavings = isPaid && isAnnual;
          const savingsPct = showSavings
            ? annualSavingsPct(p.monthlyPrice, p.annualPrice)
            : 0;

          return (
            <div
              key={p.name}
              className={`bg-gt-card rounded-lg p-7 relative ${
                p.highlight
                  ? 'border-2 border-gt-orange'
                  : 'border border-gt-border'
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded font-sans">
                  {p.badge}
                </span>
              )}

              <h3 className="font-sans text-xl font-medium text-gt-text mb-2 normal-case">
                {p.name}
              </h3>

              {isAnnual && p.annualOriginalPrice && (
                <p className="text-xs text-gt-text-dim font-sans mb-1">
                  De{' '}
                  <span className="line-through">
                    {formatPrice(p.annualOriginalPrice)}/ano
                  </span>{' '}
                  por
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
                <p className="text-xs text-gt-orange font-medium mb-3 font-sans">
                  Economize {savingsPct}% em relação ao mensal
                </p>
              )}
              {!showSavings && <div className="mb-3 h-4" />}

              <p className="text-sm text-gt-text-muted leading-relaxed mb-6 min-h-[4rem] font-sans">
                {p.desc}
              </p>

              <Button
                href={p.cta.href}
                variant={p.highlight ? 'primary' : 'secondary'}
                className="w-full"
              >
                {p.cta.label}
              </Button>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gt-text-muted text-center mt-6 font-sans">
        Cancele a qualquer momento. Sem multa. Suas rotas ficam guardadas mesmo
        se você descer de plano.
      </p>
    </div>
  );
}
