'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

const LOCALE_LABELS: Record<Locale, string> = {
  pt: 'PT',
  en: 'EN',
  es: 'ES',
};

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(next: Locale) {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-0.5 text-xs font-medium font-sans">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && (
            <span className="text-gt-border mx-0.5 select-none">|</span>
          )}
          <button
            type="button"
            onClick={() => handleChange(l)}
            className={
              l === locale
                ? 'text-gt-orange cursor-default'
                : 'text-gt-text-muted hover:text-gt-text transition-colors cursor-pointer'
            }
            aria-label={`Mudar idioma para ${l.toUpperCase()}`}
            aria-current={l === locale ? 'true' : undefined}
          >
            {LOCALE_LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
