import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Baixar o app',
  description:
    'Baixe o GT Overlander grátis na App Store ou Google Play. iOS, Android e Web — compatível com CarPlay e Android Auto.',
};

const stores = [
  {
    label: 'App Store',
    sub: 'pra iPhone e iPad',
    href: 'https://apps.apple.com/br/app/gt-overlander/id6745626026',
    icon: AppleIcon,
  },
  {
    label: 'Google Play',
    sub: 'pra Android',
    href: 'https://play.google.com/store/apps/details?id=com.overlander',
    icon: PlayIcon,
  },
];

export default function BaixarPage() {
  return (
    <section className="bg-gt-bg text-gt-text min-h-[80vh] flex items-center">
      <div className="container-wide py-16 md:py-24 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-5 font-sans">
          Free pra sempre
        </p>
        <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6">
          Baixe o GT Overlander
        </h1>
        <p className="text-base md:text-lg text-gt-text-muted leading-relaxed mb-12 font-sans">
          Disponível pra iOS e Android. Compatível com CarPlay e Android Auto.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {stores.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gt-card hover:bg-gt-card-hover border border-gt-border hover:border-gt-border-strong rounded-lg p-5 transition-colors flex items-center gap-4"
              >
                <Icon />
                <div className="text-left font-sans">
                  <p className="text-xs text-gt-text-muted">Disponível na</p>
                  <p className="font-medium">{s.label}</p>
                  <p className="text-xs text-gt-text-dim">{s.sub}</p>
                </div>
              </a>
            );
          })}
        </div>

        <p className="text-xs text-gt-text-dim mt-12 font-sans">
          Já tem conta?{' '}
          <Link
            href="/contato"
            className="text-gt-text-muted hover:text-gt-text"
          >
            Fale com a gente
          </Link>
        </p>
      </div>
    </section>
  );
}

function AppleIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="text-gt-text flex-shrink-0"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="text-gt-text flex-shrink-0"
    >
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.396-3.396l2.913 1.687a1 1 0 010 1.732l-2.913 1.687-2.557-2.553 2.557-2.553zM5.864 2.586l10.937 6.333-2.302 2.302L5.864 2.586z" />
    </svg>
  );
}
