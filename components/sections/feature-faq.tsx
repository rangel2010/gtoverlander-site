interface FaqItem {
  q: string;
  a: string;
}

interface FeatureFaqProps {
  title?: string;
  items: FaqItem[];
}

export function FeatureFaq({ title = 'Perguntas frequentes', items }: FeatureFaqProps) {
  return (
    <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl text-gt-text mb-10">
          {title}
        </h2>

        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group bg-gt-card border border-gt-border rounded-lg overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                <span className="font-sans font-medium text-gt-text pr-4">
                  {item.q}
                </span>
                <span className="text-gt-orange flex-shrink-0 text-xl leading-none transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-sm text-gt-text-muted leading-relaxed font-sans">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
