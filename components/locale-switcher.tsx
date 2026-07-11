'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { ChevronDown } from 'lucide-react';

const LOCALE_LABELS: Record<Locale, { short: string; label: string }> = {
  pt: { short: 'PT', label: 'Português' },
  en: { short: 'EN', label: 'English' },
  es: { short: 'ES', label: 'Español' },
};

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fecha com Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  function handleSelect(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  const current = LOCALE_LABELS[locale];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 h-9 px-2 text-sm font-medium text-gt-text-muted hover:text-gt-text transition-colors rounded-md font-sans"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Selecionar idioma"
      >
        {current.short}
        <ChevronDown
          size={13}
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Idiomas disponíveis"
          className="absolute right-0 top-full mt-1 w-36 bg-gt-bg border border-gt-border rounded-lg shadow-lg overflow-hidden z-50"
        >
          {routing.locales.map((l) => {
            const item = LOCALE_LABELS[l];
            const isActive = l === locale;
            return (
              <button
                key={l}
                role="option"
                aria-selected={isActive}
                type="button"
                onClick={() => handleSelect(l)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-sans transition-colors ${
                  isActive
                    ? 'text-gt-orange bg-gt-card cursor-default'
                    : 'text-gt-text-muted hover:text-gt-text hover:bg-gt-card cursor-pointer'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-60">{item.short}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
