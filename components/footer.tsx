'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const tn = useTranslations('nav');
  const tf = useTranslations('footer');

  // Esconder footer dentro do Studio do Sanity (/studio)
  if (pathname?.startsWith('/studio')) return null;

  const columns = [
    {
      title: tf('colProduto'),
      links: [
        { href: '/recursos', label: tn('recursos') },
        { href: '/planos', label: tn('planos') },
        { href: '/blog', label: tn('blog') },
        {
          href: 'https://apps.apple.com/br/app/gt-overlander/id6745626026',
          label: tf('appStore'),
          external: true,
        },
        {
          href: 'https://play.google.com/store/apps/details?id=com.overlander',
          label: tf('playStore'),
          external: true,
        },
        {
          href: 'https://app.gtoverlander.com.br',
          label: tn('acessarComputador'),
          external: true,
        },
      ],
    },
    {
      title: tf('colEmpresa'),
      links: [
        { href: '/sobre', label: tn('sobre') },
        { href: '/empresas', label: tn('empresas') },
        { href: '/parcerias', label: tn('parcerias') },
        { href: '/contato', label: tn('contato') },
        { href: '/suporte', label: tn('suporte') },
      ],
    },
    {
      title: tf('colConteudo'),
      links: [
        { href: '/blog/destinos', label: tf('destinos') },
        { href: '/blog/preparacao', label: tf('preparacao') },
        { href: '/blog/vida-overlander', label: tf('vidaOverlander') },
      ],
    },
    {
      title: tf('colLegal'),
      links: [
        { href: '/termos', label: tf('termos') },
        { href: '/privacidade', label: tf('privacidade') },
        { href: '/comunidade', label: tf('conduta') },
        { href: '/termos/help-overlander', label: tf('anexoHelp') },
        { href: '/termos/conta-business', label: tf('anexoBusiness') },
      ],
    },
  ];

  return (
    <footer className="dark bg-gt-card text-gt-text mt-auto border-t border-gt-border">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-sans font-medium mb-4 text-sm text-gt-text uppercase tracking-wider">
                {col.title}
              </h3>
              <ul className="space-y-2 text-sm text-gt-text-muted font-sans">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gt-text transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="hover:text-gt-text transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gt-border flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="font-sans">
            <p className="text-sm text-gt-text-muted">
              {tf('tagline')}
            </p>
            <p className="text-xs text-gt-text-dim mt-2">
              © 2026 GT Overlander Ltda · CNPJ 59.840.412/0001-82
            </p>
          </div>

          <div className="flex items-center justify-center gap-5">
            <a
              href="https://instagram.com/gtoverlander"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gt-text-muted hover:text-gt-text transition-colors"
            >
              <Instagram size={26} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61566265237861"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gt-text-muted hover:text-gt-text transition-colors"
            >
              <Facebook size={26} />
            </a>
            <a
              href="https://youtube.com/@gtoverlander"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-gt-text-muted hover:text-gt-text transition-colors"
            >
              <Youtube size={26} />
            </a>
            <a
              href="mailto:suporte@gtoverlander.com.br"
              aria-label="E-mail"
              className="text-gt-text-muted hover:text-gt-text transition-colors"
            >
              <Mail size={26} />
            </a>
          </div>

          {/* Logo real do GT (cor contorno, mesma do header) — lado direito */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-gt-contorno.svg"
            alt="GT Overlander"
            className="h-16 w-auto"
          />
        </div>
      </div>
    </footer>
  );
}
