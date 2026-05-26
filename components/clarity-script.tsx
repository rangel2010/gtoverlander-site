'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const CONSENT_KEY = 'gt-consent-v1';

/**
 * Inicializa Microsoft Clarity APENAS se o usuário aceitou o ConsentBanner.
 *
 * Como funciona:
 * - Na montagem: lê localStorage e inicia Clarity se accepted === true.
 * - Fica ouvindo o evento custom 'gt:consent-changed' que o banner dispara
 *   ao salvar a escolha — assim, se o usuário clicar em Aceitar agora,
 *   o Clarity liga no ato, sem precisar reload.
 *
 * Se NEXT_PUBLIC_CLARITY_PROJECT_ID não estiver configurada, não faz nada.
 */
export function ClarityScript() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    if (!projectId) return;

    let initialized = false;

    function tryInit() {
      if (initialized) return;
      try {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (!stored) return;
        const parsed = JSON.parse(stored);
        if (parsed?.accepted === true) {
          Clarity.init(projectId);
          initialized = true;
        }
      } catch {
        // localStorage indisponível ou JSON inválido — ignora
      }
    }

    tryInit();
    window.addEventListener('gt:consent-changed', tryInit);
    return () => window.removeEventListener('gt:consent-changed', tryInit);
  }, []);

  return null;
}
