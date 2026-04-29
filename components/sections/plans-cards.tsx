'use client';

import { useState } from 'react';
import { Button } from '../ui/button';

interface Plan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  desc: string;
  cta: { label: string; href: string };
  highlight: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    desc: 'Pra começar a explorar. 1 rota a cada 90 dias e 1 consulta de radar por dia. Sem deadline — Free de verdade.',
    cta: { label: 'Baixar grátis', href: '/baixar' },
    highlight: false,
  },
  {
    name: 'Plus',
    monthlyPrice: 14.9,
    annualPrice: 79.9,
    desc: 'Pra quem viaja com frequência. 2 rotas por mês, 5 consultas de radar por dia, Premium da IA e Modo Offline universal.',
    cta: { label: 'Assinar Plus', href: '/baixar?plan=plus' },
    highlight: true,
    badge: 'Mais escolhido',
  },
  {
    name: 'Pro',
    monthlyPrice: 19.9,
    annualPrice: 99.9,
    desc: 'Pra quem não para. Tudo ilimitado — rotas, radar, suporte prioritário.',
    cta: { label: 'Assinar Pro', href: '/baixar?plan=pro' },
    highlight: false,
    badge: 'Melhor custo-benefício',
  },
];

function formatPrice(value: number): string {
  if (value === 0) return 'R$ 0';
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

function annualSavingsPct(monthly: number, annual: number): number {
  if (monthly === 0) return 0;
  const yearAtMonthly = monthly * 12;
  return Math.round(((yearAtMonthly - annual) / yearAtMonthly) * 100);
}

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
              −55%
            </span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-4">
        {plans.map((p) => {
          const isAnnual = billing === 'anual';
          const isPaid = p.monthlyPrice > 0;

          // Quando anual + pago, mostra equivalente mensal como destaque
          const displayPrice =
            isAnnual && isPaid ? p.annualPrice / 12 : p.monthlyPrice;
          const periodLabel = !isPaid ? 'pra sempre' : 'por mês';
          const annualNote =
            isPaid && isAnnual
              ? `${formatPrice(p.annualPrice)} cobrado anualmente`
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
