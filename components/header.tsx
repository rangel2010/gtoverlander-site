'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';

const APP_WEB_URL = 'https://app.gtoverlander.com.br';

const navLinks = [
  { href: '/recursos', label: 'Recursos' },
  { href: '/planos', label: 'Planos' },
  { href: '/blog', label: 'Blog' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/empresas', label: 'Empresas' },
  { href: '/parcerias', label: 'Parcerias' },
];

const mobileExtraLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/contato', label: 'Contato' },
  { href: '/suporte', label: 'Suporte' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Esconder header dentro do Studio do Sanity (/studio)
  if (pathname?.startsWith('/studio')) return null;

  return (
    <header className="sticky top-0 z-40 bg-gt-bg/95 backdrop-blur border-b border-gt-border">
      <div className="container-wide flex items-center justify-between h-20">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setMobileOpen(false)}
          aria-label="GT Overlander — página inicial"
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
              className="text-sm text-gt-text-muted hover:text-gt-text transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTAs + mobile toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={APP_WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-gt-text-muted hover:text-gt-text transition-colors px-3 py-2"
          >
            Acessar pelo computador
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>

          <Button href="/baixar" size="sm" className="hidden sm:inline-flex">
            Baixar grátis
          </Button>

          <button
            type="button"
            className="lg:hidden p-2 -mr-2 text-gt-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
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
                  className="text-gt-text-muted text-sm py-1"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={APP_WEB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gt-text-muted text-sm py-1 inline-flex items-center gap-1.5"
              >
                Acessar pelo computador
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
            <Button href="/baixar" className="mt-3 w-fit">
              Baixar grátis
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
