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

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, ts: Date.now() }));
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de privacidade"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50 bg-gt-card border border-gt-border rounded-lg shadow-2xl p-5 font-sans"
    >
      <p className="text-sm text-gt-text leading-relaxed mb-3">
        Usamos analytics anônimos (sem cookies, sem rastreamento individual) pra entender o que ressoa
        com a comunidade. Detalhes na nossa{' '}
        <Link href="/privacidade" className="text-gt-orange hover:underline">
          Política de Privacidade
        </Link>
        .
      </p>
      <button
        type="button"
        onClick={accept}
        className="w-full bg-gt-orange hover:bg-gt-orange/90 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
      >
        Entendi
      </button>
    </div>
  );
}
