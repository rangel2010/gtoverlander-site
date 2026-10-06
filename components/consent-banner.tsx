'use client';

import { useEffect, useState } from 'react';
// Link do i18n, não o de 'next/link' — mantém o prefixo /es e /en.
import { Link } from '@/i18n/navigation';

const STORAGE_KEY = 'gt-consent-v1';

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mostra banner apenas se o usuário ainda não respondeu
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // Aparece logo (06/10/2026). Antes esperava 0,8 s "pra não poluir o
      // primeiro paint" — e no celular o aviso acabava sendo o maior elemento
      // da tela, então o Google contava a página como lenta por causa dele.
      if (!stored) setVisible(true);
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
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50 bg-gt-card border border-gt-border rounded-lg shadow-2xl p-4 font-sans"
    >
      {/* Texto curto de propósito (06/10/2026): no celular o aviso não pode ser
          maior que o conteúdo da página. */}
      <p className="text-sm text-gt-text leading-snug mb-3">
        Usamos métricas anônimas para melhorar o site, sem perfis individuais.{' '}
        <Link href="/privacidade" className="text-gt-orange-text underline">
          Privacidade
        </Link>
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
