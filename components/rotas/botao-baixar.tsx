'use client';

import { useEffect, useState } from 'react';

export const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.overlander';
export const APP_STORE = 'https://apps.apple.com/br/app/gt-overlander/id6745626026';

/**
 * Botão "Baixar o app grátis". No celular já abre a loja certa (Android →
 * Google Play, iPhone → App Store); no computador leva pra página /baixar,
 * que mostra as duas lojas.
 */
export function BotaoBaixar({ className = '' }: { className?: string }) {
  const [href, setHref] = useState('/baixar');
  useEffect(() => {
    const ua = navigator.userAgent || '';
    if (/android/i.test(ua)) setHref(PLAY_STORE);
    else if (/iphone|ipad|ipod/i.test(ua)) setHref(APP_STORE);
  }, []);
  const externo = href.startsWith('http');
  return (
    <a
      href={href}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center justify-center bg-gt-orange text-white font-sans font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity ${className}`}
    >
      Baixar o app grátis
    </a>
  );
}

/** Selos oficiais das lojas, mesma altura. */
export function SelosLojas() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="hover:opacity-85 transition-opacity">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/convite/selo-google-play.png" alt="Disponível no Google Play" className="h-11 w-auto block" />
      </a>
      <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="hover:opacity-85 transition-opacity">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/convite/selo-app-store.svg" alt="Baixar na App Store" className="h-11 w-auto block" />
      </a>
    </div>
  );
}
