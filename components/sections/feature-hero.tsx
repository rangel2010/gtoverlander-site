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
    <section className="bg-gt-green text-white">
      <div className="container-wide py-16 md:py-24 max-w-4xl">
        {(kicker || status) && (
          <div className="flex items-center gap-3 mb-6">
            {kicker && (
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                {kicker}
              </p>
            )}
            {status === 'em-breve' && (
              <span className="bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded">
                Em breve
              </span>
            )}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-medium leading-[1.1] mb-6 max-w-3xl">
          {title}
        </h1>

        <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-2xl mb-8">
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
