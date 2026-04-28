import { Button } from '../ui/button';

interface FeatureHeroProps {
  kicker?: string;
  status?: 'disponivel' | 'em-breve';
  title: string;
  subline: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function FeatureHero({
  kicker,
  status,
  title,
  subline,
  primaryCta,
  secondaryCta,
}: FeatureHeroProps) {
  return (
    <section className="bg-gt-bg text-gt-text">
      <div className="container-wide py-16 md:py-24 max-w-4xl">
        {(kicker || status) && (
          <div className="flex items-center gap-3 mb-6">
            {kicker && (
              <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted font-sans">
                {kicker}
              </p>
            )}
            {status === 'em-breve' && (
              <span className="bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded font-sans">
                Em breve
              </span>
            )}
          </div>
        )}

        <h1 className="text-5xl md:text-6xl leading-[0.95] mb-6 max-w-3xl">
          {title}
        </h1>

        <p className="text-base md:text-lg text-gt-text-muted leading-relaxed max-w-2xl mb-8 font-sans">
          {subline}
        </p>

        <div className="flex flex-wrap gap-3">
          <Button href={primaryCta.href}>{primaryCta.label}</Button>
          {secondaryCta && (
            <Button href={secondaryCta.href} variant="outline">
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
