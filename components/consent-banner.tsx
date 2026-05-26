'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'gt-consent-v1';

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mostra banner apenas se o usuário ainda não respondeu
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Pequeno delay pra não poluir o primeiro paint
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
    } catch {
      // localStorage indisponível (modo privado restrito) — não mostra
    }
  }, []);

  const save = (accepted: boolean) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted, ts: Date.now() })
      );
      // Dispara evento custom pro ClarityScript reagir sem reload da página
      window.dispatchEvent(new CustomEvent('gt:consent-changed'));
    } catch {
      // ignora falha de localStorage
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de privacidade"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50 bg-gt-card border border-gt-border rounded-lg shadow-2xl p-5 font-sans"
    >
      <p className="text-sm text-gt-text leading-relaxed mb-4">
        Usamos cookies de análise pra entender como você usa o site e melhorar a
        experiência. Você pode aceitar ou recusar — sua escolha fica salva.
        Detalhes na nossa{' '}
        <Link href="/privacidade" className="text-gt-orange hover:underline">
          Política de Privacidade
        </Link>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => save(false)}
          className="flex-1 bg-transparent hover:bg-gt-card-hover border border-gt-border hover:border-gt-border-strong text-gt-text text-sm font-medium px-4 py-2 rounded-md transition-colors"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => save(true)}
          className="flex-1 bg-gt-orange hover:bg-gt-orange/90 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
