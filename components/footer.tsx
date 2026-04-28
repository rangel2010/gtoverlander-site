import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Produto',
    links: [
      { href: '/recursos', label: 'Recursos' },
      { href: '/planos', label: 'Planos' },
      { href: '/blog', label: 'Blog' },
      {
        href: 'https://apps.apple.com/br/app/gt-overlander/id6745626026',
        label: 'App Store',
        external: true,
      },
      {
        href: 'https://play.google.com/store/apps/details?id=com.overlander',
        label: 'Play Store',
        external: true,
      },
      {
        href: 'https://app.gtoverlander.com.br',
        label: 'Acessar pelo computador',
        external: true,
      },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { href: '/sobre', label: 'Sobre' },
      { href: '/empresas', label: 'Empresas' },
      { href: '/contato', label: 'Contato' },
      { href: '/suporte', label: 'Suporte' },
    ],
  },
  {
    title: 'Conteúdo',
    links: [
      { href: '/blog/destinos', label: 'Destinos' },
      { href: '/blog/preparacao', label: 'Preparação' },
      { href: '/blog/vida-overlander', label: 'Vida Overlander' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacidade', label: 'Privacidade' },
      { href: '/termos', label: 'Termos' },
      {
        href: 'mailto:suporte@gtoverlander.com.br',
        label: 'suporte@gtoverlander.com.br',
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gt-card text-gt-text mt-auto border-t border-gt-border">
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
              O ecossistema do viajante overland
            </p>
            <p className="text-xs text-gt-text-dim mt-2">
              © 2026 GT Overlander Ltda · CNPJ 59.840.412/0001-82
            </p>
          </div>

          <div className="flex items-center gap-4">
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
              href="https://youtube.com/@gtoverlander"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-gt-text-muted hover:text-gt-text transition-colors"
            >
              <Youtube size={26} />
            </a>
          </div>

          {/* Logo real do GT (cor contorno, mesma do header) — lado direito */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-gt-contorno.svg"
            alt="GT Overlander"
            className="h-24 w-auto"
          />
        </div>
      </div>
    </footer>
  );
}
