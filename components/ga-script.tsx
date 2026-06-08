'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const CONSENT_KEY = 'gt-consent-v1';

/**
 * Carrega Google Analytics 4 APENAS se o usuário aceitou o ConsentBanner.
 *
 * Como funciona:
 * - Na montagem: lê localStorage e carrega o gtag.js se accepted === true.
 * - Fica ouvindo o evento 'gt:consent-changed' — se o usuário aceitar agora,
 *   o GA liga no ato, sem reload.
 *
 * Se NEXT_PUBLIC_GA_MEASUREMENT_ID não estiver configurada, não faz nada.
 */
export function GaScript() {
  const [load, setLoad] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    function tryInit() {
      try {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (!stored) return;
        const parsed = JSON.parse(stored);
        if (parsed?.accepted === true) {
          setLoad(true);
        }
      } catch {
        // localStorage indisponível ou JSON inválido — ignora
      }
    }

    tryInit();
    window.addEventListener('gt:consent-changed', tryInit);
    return () => window.removeEventListener('gt:consent-changed', tryInit);
  }, []);

  if (!load || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
