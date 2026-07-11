'use client';

import { useEffect, useState } from 'react';

type Device = 'web' | 'android' | 'ios';

interface DownloadCtasProps {
  labels: {
    recomendado: string;
    webLabel: string;
    webSub: string;
    androidLabel: string;
    androidSub: string;
    iosLabel: string;
    iosSub: string;
    disponivelNa: string;
  };
}

function detectDevice(): Device {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'web';
}

export function DownloadCtas({ labels }: DownloadCtasProps) {
  const [device, setDevice] = useState<Device>('web');

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  const options: { id: Device; label: string; sub: string; href: string; icon: React.ReactNode }[] = [
    {
      id: 'web',
      label: labels.webLabel,
      sub: labels.webSub,
      href: 'https://app.gtoverlander.com.br',
      icon: <WebIcon />,
    },
    {
      id: 'android',
      label: labels.androidLabel,
      sub: labels.androidSub,
      href: 'https://play.google.com/store/apps/details?id=com.overlander',
      icon: <PlayIcon />,
    },
    {
      id: 'ios',
      label: labels.iosLabel,
      sub: labels.iosSub,
      href: 'https://apps.apple.com/br/app/gt-overlander/id6745626026',
      icon: <AppleIcon />,
    },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-4 w-full max-w-2xl mx-auto">
      {options.map((opt) => {
        const isRecommended = opt.id === device;
        return (
          <a
            key={opt.id}
            href={opt.href}
            target={opt.id !== 'web' ? '_blank' : undefined}
            rel={opt.id !== 'web' ? 'noopener noreferrer' : undefined}
            className={`
              relative flex flex-col items-center gap-3 rounded-xl p-6 border transition-all text-center
              ${isRecommended
                ? 'border-gt-orange bg-gt-orange/5 shadow-[0_0_0_1px_var(--color-gt-orange)]'
                : 'border-gt-border bg-gt-card hover:border-gt-border-strong'
              }
            `}
          >
            {isRecommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gt-orange text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full font-sans whitespace-nowrap">
                {labels.recomendado}
              </span>
            )}
            <span className={isRecommended ? 'text-gt-orange' : 'text-gt-text'}>
              {opt.icon}
            </span>
            <div>
              <p className="font-medium text-gt-text text-sm">{opt.label}</p>
              <p className="text-xs text-gt-text-muted font-sans mt-0.5">{opt.sub}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}

function WebIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.396-3.396l2.913 1.687a1 1 0 010 1.732l-2.913 1.687-2.557-2.553 2.557-2.553zM5.864 2.586l10.937 6.333-2.302 2.302L5.864 2.586z" />
    </svg>
  );
}
