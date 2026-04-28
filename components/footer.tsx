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
      { href: 'https://apps.apple.com', label: 'App Store', external: true },
      { href: 'https://play.google.com', label: 'Play Store', external: true },
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
        href: 'mailto:contato@gtoverlander.com.br',
        label: 'contato@gtoverlander.com.br',
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gt-green text-white mt-auto">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-medium mb-4 text-sm">{col.title}</h3>
              <ul className="space-y-2 text-sm text-white/70">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="hover:text-white transition-colors"
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

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-sm text-white/70">
              O ecossistema do viajante overland
            </p>
            <p className="text-xs text-white/50 mt-2">
              © 2026 GT Overlander
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/gtoverlander"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://youtube.com/@gtoverlander"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Youtube size={20} />
            </a>
          </div>

          {/* Logo real do GT (versão branca) — lado direito */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-gt-white.svg"
            alt="GT Overlander"
            className="h-16 w-auto opacity-90"
          />
        </div>
      </div>
    </footer>
  );
}
