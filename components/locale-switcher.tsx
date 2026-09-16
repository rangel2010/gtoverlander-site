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

const HREFLANG: Record<Locale, string> = { pt: 'pt-BR', en: 'en', es: 'es' };

// Pillar pages têm o mesmo caminho nos três idiomas; posts, não.
const BLOG_PILLARS = ['/blog/destinos', '/blog/preparacao', '/blog/vida-overlander'];

/**
 * Descobre pra onde ir ao trocar de idioma.
 *
 * Repetir o caminho atual só funciona quando ele existe nos dois idiomas. Posts
 * do blog são escritos nativamente e têm slug próprio por idioma
 * (serra-do-rio-do-rastro-de-carro / -road-brazil / -en-auto), então repetir o
 * caminho levava a um post inexistente — 404, tela em branco.
 *
 * A própria página já publica o endereço certo de cada idioma no
 * <link rel="alternate" hreflang>, montado a partir do linkedTranslations do
 * Sanity. É essa a fonte da verdade aqui.
 *
 * Usa só o pathname do alternate, nunca a URL inteira: o href é absoluto no
 * domínio de produção e mandaria o visitante pra fora de um preview.
 */
function targetPath(next: Locale, current: string): string {
  if (typeof document !== 'undefined') {
    const link = document.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${HREFLANG[next]}"]`
    );
    if (link?.href) {
      try {
        const path = new URL(link.href).pathname.replace(/^\/(pt|en|es)(?=\/|$)/, '');
        return path || '/';
      } catch {
        // href malformado: cai no fallback abaixo
      }
    }
  }

  // Post sem tradução linkada: o hub do blog existe nos três idiomas e é
  // um destino melhor que uma 404.
  if (current.startsWith('/blog/') && !BLOG_PILLARS.includes(current)) return '/blog';

  return current;
}

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
    router.replace(targetPath(next, pathname), { locale: next });
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
                    ? 'text-gt-orange-text bg-gt-card cursor-default'
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
