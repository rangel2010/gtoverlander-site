import Image from 'next/image';

interface FeatureScreenshotProps {
  /** Sem src, a seção vira só texto (21/10/2026: print antigo fora do ar). */
  src?: string;
  alt?: string;
  kicker?: string;
  title: string;
  desc: string;
  /** Quando true, a imagem aparece à esquerda em desktop (default: imagem à direita) */
  reverse?: boolean;
  /** Cor de fundo da seção */
  bg?: 'bg' | 'card';
  /** Largura aproximada da imagem em px (mantém proporção). Default 280. */
  imgWidth?: number;
}

/**
 * Seção com screenshot do app + texto descritivo, lado a lado.
 * Imagem renderizada com moldura tipo phone bezel.
 * Em mobile, empilha vertical (texto em cima, imagem embaixo).
 */
export function FeatureScreenshot({
  src,
  alt,
  kicker,
  title,
  desc,
  reverse = false,
  bg = 'bg',
  imgWidth = 280,
}: FeatureScreenshotProps) {
  const sectionBg = bg === 'card' ? 'bg-gt-card' : 'bg-gt-bg';
  // Telas novas (public/images/app/celular-*) já vêm com o celular desenhado:
  // nada de moldura preta em volta. Mesmo padrão da home (21/10/2026).
  const jaTemCelular = !!src && src.startsWith('/images/app/celular-');
  if (!src) {
    return (
      <section className={`${sectionBg} py-16 md:py-20 border-t border-gt-border`}>
        <div className="container-wide">
          <div className="max-w-3xl">
            {kicker && (
              <p className="text-xs uppercase tracking-[0.18em] text-gt-orange-text mb-3 font-sans">
                {kicker}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl text-gt-text mb-5 leading-tight">
              {title}
            </h2>
            <p className="text-gt-text-muted leading-relaxed font-sans">{desc}</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className={`${sectionBg} py-16 md:py-20 border-t border-gt-border`}>
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className={reverse ? 'md:order-2' : ''}>
            {kicker && (
              <p className="text-xs uppercase tracking-[0.18em] text-gt-orange-text mb-3 font-sans">
                {kicker}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl text-gt-text mb-5 leading-tight">
              {title}
            </h2>
            <p className="text-gt-text-muted leading-relaxed font-sans">{desc}</p>
          </div>
          <div className={`flex justify-center ${reverse ? 'md:order-1' : ''}`}>
            {jaTemCelular ? (
              <Image
                src={src}
                alt={alt ?? ''}
                width={680}
                height={1296}
                unoptimized
                className="w-[250px] md:w-[290px] h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.45)]"
              />
            ) : (
            <div
              className="relative rounded-[2.5rem] overflow-hidden border-[8px] border-black shadow-2xl bg-black"
              style={{ width: imgWidth, maxWidth: '85vw' }}
            >
              <Image
                src={src}
                alt={alt ?? ''}
                width={imgWidth * 2}
                height={imgWidth * 2 * 2.16}
                className="w-full h-auto block"
                priority={false}
              />
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
