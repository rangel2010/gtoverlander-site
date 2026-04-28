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
    <section className="bg-gt-cream py-16 md:py-20">
      <div className="container-wide">
        <p className="text-xs uppercase tracking-[0.18em] text-gt-green/60 mb-3">
          Disponível agora
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-12">
          O que o GT entrega hoje
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="bg-white rounded-lg p-7 md:p-8 border border-gt-green/10 hover:border-gt-green/30 transition-colors group"
            >
              <h3 className="font-medium text-gt-green text-lg md:text-xl mb-3 group-hover:text-gt-orange transition-colors">
                {i.titulo}
              </h3>
              <p className="text-sm text-gt-gray-mid leading-relaxed mb-5">
                {i.desc}
              </p>
              <span className="text-gt-orange text-sm font-medium">
                Saiba mais →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
