'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const navLinks = [
  { href: '/recursos', label: 'Recursos' },
  { href: '/planos', label: 'Planos' },
  { href: '/blog', label: 'Blog' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/empresas', label: 'Empresas' },
];

const mobileExtraLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/contato', label: 'Contato' },
  { href: '/suporte', label: 'Suporte' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gt-green/10">
      <div className="container-wide flex items-center justify-between h-20">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setMobileOpen(false)}
          aria-label="GT Overlander — página inicial"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-gt.svg"
            alt="GT Overlander"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gt-green/75 hover:text-gt-green transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Button href="/baixar" size="sm" className="hidden sm:inline-flex">
            Baixar grátis
          </Button>
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-gt-green"
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
        <div className="md:hidden border-t border-gt-green/10 bg-white">
          <nav className="container-wide py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-gt-green text-base py-1"
              >
                {l.label}
              </Link>
            ))}
            <div className="border-t border-gt-green/10 pt-3 mt-1 flex flex-col gap-3">
              {mobileExtraLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gt-green/75 text-sm py-1"
                >
                  {l.label}
                </Link>
              ))}
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
