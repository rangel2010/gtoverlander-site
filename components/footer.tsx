'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const tn = useTranslations('nav');
  const tf = useTranslations('footer');
  const locale = useLocale();

  if (pathname?.startsWith('/studio')) return null;

  const columns = [
    {
      title: tf('colProduto'),
      links: [
        { href: '/recursos', label: tn('recursos') },
        { href: '/planos', label: tn('planos') },
        { href: '/blog', label: tn('blog') },
        { href: 'https://apps.apple.com/br/app/gt-overlander/id6745626026', label: tf('appStore'), external: true },
        { href: 'https://play.google.com/store/apps/details?id=com.overlander', label: tf('playStore'), external: true },
        { href: 'https://app.gtoverlander.com.br', label: tn('acessarComputador'), external: true },
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
        ...(locale === 'pt' ? [{ href: '/dicas', label: 'Dicas em Vídeo' }] : []),
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
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-gt-text transition-colors">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="hover:text-gt-text transition-colors">
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
            <p className="text-sm text-gt-text-muted">{tf('tagline')}</p>
            <p className="text-xs text-gt-text-dim mt-2">© 2026 GT Overlander Ltda · CNPJ 59.840.412/0001-82</p>
          </div>

          <div className="flex items-center justify-center gap-5">
            <a href="https://instagram.com/gtoverlander" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gt-text-muted hover:text-gt-text transition-colors">
              <Instagram size={26} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61566265237861" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gt-text-muted hover:text-gt-text transition-colors">
              <Facebook size={26} />
            </a>
            <a href="https://youtube.com/@gtoverlander" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gt-text-muted hover:text-gt-text transition-colors">
              <Youtube size={26} />
            </a>
            <a href="https://open.spotify.com/show/033tikILUKLf5PFKXLJwat" target="_blank" rel="noopener noreferrer" aria-label="Podcast no Spotify" className="text-gt-text-muted hover:text-gt-text transition-colors">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 11-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.52-.972c3.632-1.102 8.147-.568 11.233 1.328a.78.78 0 01.257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.543-1.794c3.532-1.072 9.404-.865 13.115 1.338a.937.937 0 01-.954 1.614z"/>
              </svg>
            </a>
            <a href="mailto:suporte@gtoverlander.com.br" aria-label="E-mail" className="text-gt-text-muted hover:text-gt-text transition-colors">
              <Mail size={26} />
            </a>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-gt-contorno.svg" alt="GT Overlander" className="h-16 w-auto" />
        </div>
      </div>
    </footer>
  );
}
