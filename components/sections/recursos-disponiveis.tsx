import Link from 'next/link';

const items = [
  {
    titulo: 'Roteiros com IA',
    desc: 'Roteiros personalizados em uma conversa — do trajeto às paradas, no jeito que combina com você. Free pra começar, Premium pra ir mais fundo.',
    href: '/recursos/roteiros-ia',
  },
  {
    titulo: 'Waypoints próprios',
    desc: 'Mais de 4 milhões de waypoints em 209 países: postos, campings, oficinas, atrativos. A maior base do universo overlander.',
    href: '/recursos/waypoints',
  },
];

export function RecursosDisponiveis() {
  return (
    <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
      <div className="container-wide">
        <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
          Disponível agora
        </p>
        <h2 className="text-3xl md:text-4xl text-gt-text mb-12">
          O que o GT entrega hoje
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="bg-gt-card rounded-lg p-7 md:p-8 border border-gt-border hover:border-gt-border-strong hover:bg-gt-card-hover transition-colors group"
            >
              <h3 className="text-xl md:text-2xl text-gt-text mb-3 group-hover:text-gt-orange transition-colors">
                {i.titulo}
              </h3>
              <p className="text-sm text-gt-text-muted leading-relaxed mb-5 font-sans">
                {i.desc}
              </p>
              <span className="text-gt-orange text-sm font-medium font-sans">
                Saiba mais →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
