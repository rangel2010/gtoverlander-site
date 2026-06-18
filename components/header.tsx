'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';
import { LocaleSwitcher } from './locale-switcher';

const APP_WEB_URL = 'https://app.gtoverlander.com.br';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');
  const locale = useLocale();

  if (pathname?.startsWith('/studio')) return null;

  const navLinks = [
    { href: '/recursos' as const, label: t('recursos'), ptOnly: false },
    { href: '/planos' as const, label: t('planos'), ptOnly: false },
    { href: '/blog' as const, label: t('blog'), ptOnly: false },
    { href: '/dicas' as const, label: t('dicas'), ptOnly: true },
    { href: '/sobre' as const, label: t('sobre'), ptOnly: false },
    { href: '/empresas' as const, label: t('empresas'), ptOnly: false },
    { href: '/parcerias' as const, label: t('parcerias'), ptOnly: false },
  ].filter((l) => !l.ptOnly || locale === 'pt');

  const mobileExtraLinks = [
    { href: '/faq' as const, label: t('faq') },
    { href: '/contato' as const, label: t('contato') },
    { href: '/suporte' as const, label: t('suporte') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-gt-bg/95 backdrop-blur border-b border-gt-border">
      <div className="container-wide flex items-center justify-between h-20">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setMobileOpen(false)}
          aria-label={t('paginaInicial')}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-gt-contorno.svg"
            alt="GT Overlander"
            className="h-16 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gt-text-muted hover:text-gt-orange transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTAs + mobile toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <ThemeToggle />

          <a
            href={APP_WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-gt-text-muted hover:text-gt-orange transition-colors px-3 py-2"
          >
            {t('acessarComputador')}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>

          <Button href="/baixar" size="sm" className="hidden sm:inline-flex">
            {t('comecarGratis')}
          </Button>

          <button
            type="button"
            className="lg:hidden p-2 -mr-2 text-gt-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t('fecharMenu') : t('abrirMenu')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gt-border bg-gt-bg">
          <nav className="container-wide py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-gt-text text-base py-1"
              >
                {l.label}
              </Link>
            ))}
            <div className="border-t border-gt-border pt-3 mt-1 flex flex-col gap-3">
              {mobileExtraLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gt-text-muted hover:text-gt-orange text-sm py-1 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={APP_WEB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gt-text-muted hover:text-gt-orange text-sm py-1 transition-colors inline-flex items-center gap-1.5"
              >
                {t('acessarComputador')}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
            <Button href="/baixar" className="mt-3 w-fit">
              {t('comecarGratis')}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
