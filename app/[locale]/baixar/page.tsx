import type { Metadata } from 'next';
import Image from 'next/image';
import { getPageAlternates } from '@/lib/seo';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from '@/components/scroll-reveal';
import { DownloadCtas } from '@/components/sections/download-ctas';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Baixar o GT Overlander — Web, Android e iPhone',
    description:
      'Acesse o GT Overlander grátis: abra no navegador agora ou baixe para Android e iPhone. Compatível com CarPlay e Android Auto.',
    alternates: getPageAlternates(locale, '/baixar'),
  };
}

const BENEFITS = ['b1', 'b2', 'b3'] as const;

export default async function BaixarPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('baixar');

  return (
    <main className="bg-gt-bg min-h-screen">

      {/* Hero */}
      <section className="bg-gt-bg-elevated border-b border-gt-border py-20 md:py-28">
        <div className="container-wide max-w-3xl text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-5 font-sans">
              {t('label')}
            </p>
            <h1 className="text-5xl md:text-6xl leading-tight text-gt-text mb-5">
              {t('titulo')}
            </h1>
            <p className="text-base md:text-lg text-gt-text-muted leading-relaxed mb-12 font-sans max-w-xl mx-auto">
              {t('desc')}
            </p>

            {/* CTAs com detecção de dispositivo */}
            <DownloadCtas
              labels={{
                recomendado: t('recomendado'),
                webLabel: t('webLabel'),
                webSub: t('webSub'),
                androidLabel: t('androidLabel'),
                androidSub: t('androidSub'),
                iosLabel: t('iosLabel'),
                iosSub: t('iosSub'),
                disponivelNa: t('disponivelNa'),
              }}
            />

            {/* Já tem conta */}
            <p className="mt-8 text-sm text-gt-text-muted font-sans">
              {t('temConta')}{' '}
              <a
                href="https://app.gtoverlander.com.br"
                className="text-gt-orange hover:underline font-medium"
              >
                {t('entrar')}
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* QR Code — para quem está no desktop */}
      <section className="py-16 md:py-20 border-b border-gt-border">
        <div className="container-wide max-w-3xl">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-center gap-8 bg-gt-card rounded-2xl border border-gt-border p-8 md:p-10">
              <div className="flex-shrink-0 bg-white rounded-xl p-3 shadow-md">
                <Image
                  src="/images/qr-baixar.png"
                  alt="QR Code para baixar o GT Overlander"
                  width={160}
                  height={160}
                  className="rounded-lg"
                />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl text-gt-text mb-2">
                  {t('qrTitulo')}
                </h2>
                <p className="text-gt-text-muted font-sans leading-relaxed">
                  {t('qrDesc')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3 Benefícios */}
      <section className="py-16 md:py-20">
        <div className="container-wide max-w-3xl">
          <ScrollReveal>
            <ul className="grid sm:grid-cols-3 gap-6">
              {BENEFITS.map((key, i) => (
                <li
                  key={key}
                  className="flex items-start gap-3 bg-gt-card rounded-xl border border-gt-border p-6"
                >
                  <span className="text-gt-orange mt-0.5 flex-shrink-0 font-bold text-lg">✓</span>
                  <span className="text-sm text-gt-text leading-relaxed font-sans">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Rodapé */}
      <div className="pb-16 text-center">
        <p className="text-xs text-gt-text-dim font-sans">
          {t('rodape')}{' '}
          <Link href="/contato" className="text-gt-text-muted hover:text-gt-text">
            {t('rodapeLink')}
          </Link>
        </p>
      </div>

    </main>
  );
}
