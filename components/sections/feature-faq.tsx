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
    <section className="bg-white py-16 md:py-20">
      <div className="container-narrow">
        <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-10">
          {title}
        </h2>

        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group bg-gt-cream rounded-lg overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                <span className="font-medium text-gt-green pr-4">
                  {item.q}
                </span>
                <span className="text-gt-orange flex-shrink-0 text-xl leading-none transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-sm text-gt-gray-mid leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
