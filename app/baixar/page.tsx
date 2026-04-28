import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Baixar o app',
  description:
    'Baixe o GT Overlander grátis na App Store ou Google Play. iOS, Android, CarPlay e Android Auto.',
};

const stores = [
  {
    label: 'App Store',
    sub: 'pra iPhone e iPad',
    href: 'https://apps.apple.com/br/app/gt-overlander/id...', // TODO: substituir pelo link real
    icon: AppleIcon,
  },
  {
    label: 'Google Play',
    sub: 'pra Android',
    href: 'https://play.google.com/store/apps/details?id=com.overlander', // TODO: substituir pelo link real
    icon: PlayIcon,
  },
];

export default function BaixarPage() {
  return (
    <section className="bg-gt-green text-white min-h-[80vh] flex items-center">
      <div className="container-wide py-16 md:py-24 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-white/60 mb-5">
          Free pra sempre
        </p>
        <h1 className="text-4xl md:text-5xl font-medium leading-[1.1] mb-6">
          Baixe o GT Overlander
        </h1>
        <p className="text-base md:text-lg text-white/75 leading-relaxed mb-12">
          Disponível pra iOS e Android, com integração nativa pra CarPlay e
          Android Auto.
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
                className="bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 rounded-lg p-5 transition-colors flex items-center gap-4"
              >
                <Icon />
                <div className="text-left">
                  <p className="text-xs text-white/60">Disponível na</p>
                  <p className="font-medium">{s.label}</p>
                  <p className="text-xs text-white/55">{s.sub}</p>
                </div>
              </a>
            );
          })}
        </div>

        <p className="text-xs text-white/55 mt-12">
          Já tem conta?{' '}
          <Link href="/contato" className="text-white/70 hover:text-white">
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
      className="text-white flex-shrink-0"
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
      className="text-white flex-shrink-0"
    >
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.396-3.396l2.913 1.687a1 1 0 010 1.732l-2.913 1.687-2.557-2.553 2.557-2.553zM5.864 2.586l10.937 6.333-2.302 2.302L5.864 2.586z" />
    </svg>
  );
}
