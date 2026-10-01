'use client';

import { useEffect, useState } from 'react';

/**
 * Inauguração do Shopping: sexta, 9 de outubro de 2026, 00h de Brasília.
 * Antes dela o convite fala em "garantir o lugar na inauguração" e mostra a
 * contagem regressiva; a partir dela, os mesmos slides passam a dizer que o
 * Shopping está aberto — sem ninguém precisar publicar nada.
 */
export const INAUGURACAO = new Date('2026-10-09T00:00:00-03:00');

function useAberto() {
  // No servidor (e no primeiro desenho) vale "antes"; o navegador corrige.
  const [aberto, setAberto] = useState(false);
  useEffect(() => {
    const check = () => setAberto(Date.now() >= INAUGURACAO.getTime());
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return aberto;
}

/** Mostra `antes` até a inauguração e `depois` a partir dela. */
export function Fase({ antes, depois }: { antes: React.ReactNode; depois: React.ReactNode }) {
  return <>{useAberto() ? depois : antes}</>;
}

/** Contagem regressiva em dias, horas e minutos. */
export function Contagem() {
  const [agora, setAgora] = useState<number | null>(null);
  useEffect(() => {
    setAgora(Date.now());
    const id = setInterval(() => setAgora(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  if (agora === null) return <div className="h-[104px]" aria-hidden />;

  const falta = Math.max(0, INAUGURACAO.getTime() - agora);
  const dias = Math.floor(falta / 86_400_000);
  const horas = Math.floor((falta % 86_400_000) / 3_600_000);
  const minutos = Math.floor((falta % 3_600_000) / 60_000);
  const blocos = [
    { n: dias, l: dias === 1 ? 'dia' : 'dias' },
    { n: horas, l: horas === 1 ? 'hora' : 'horas' },
    { n: minutos, l: minutos === 1 ? 'minuto' : 'minutos' },
  ];

  return (
    <div className="flex gap-3 md:gap-5" aria-label="Contagem regressiva para a inauguração">
      {blocos.map((b) => (
        <div
          key={b.l}
          className="bg-white/10 border border-white/15 rounded-lg px-4 md:px-6 py-3 md:py-4 text-center min-w-[84px] md:min-w-[110px]"
        >
          <div className="font-display text-4xl md:text-6xl text-white leading-none">
            {String(b.n).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-white/70 font-sans mt-2 uppercase tracking-wider">{b.l}</div>
        </div>
      ))}
    </div>
  );
}
