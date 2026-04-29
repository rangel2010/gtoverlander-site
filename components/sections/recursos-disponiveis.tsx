import Link from 'next/link';

const items = [
  {
    titulo: 'Roteiros com IA',
    desc: 'Trajeto montado pela IA em uma conversa — estradas, cidades e destino, pronto em segundos. Free pra começar, Pro pra desafios maiores.',
    href: '/recursos/roteiros-ia',
  },
  {
    titulo: 'Waypoints próprios',
    desc: 'Mais de 4 milhões de pontos em 209 países — postos, campings, hospedagem, atrações, oficinas. Você escolhe onde parar na maior base overlander do mundo.',
    href: '/recursos/waypoints',
  },
  {
    titulo: 'Roda no painel do carro',
    desc: 'Exporta a rota pro Google Maps com um toque. Você ganha radar, trânsito ao vivo e dirige com CarPlay ou Android Auto.',
    href: '/baixar',
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

        <div className="grid md:grid-cols-3 gap-6">
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
