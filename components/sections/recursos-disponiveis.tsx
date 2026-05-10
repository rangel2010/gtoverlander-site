import Link from 'next/link';

const items = [
  {
    titulo: 'Roteiros com IA',
    desc: 'Trajeto montado pela IA em uma conversa — estradas, cidades e destino, pronto em segundos.',
    href: '/recursos/roteiros-ia',
  },
  {
    titulo: 'Waypoints próprios',
    desc: 'Mais de 4 milhões de pontos em 209 países, validados e cadastrados pela comunidade. A maior base overlander do mundo.',
    href: '/recursos/waypoints',
  },
  {
    titulo: 'Help Overlander',
    desc: 'Pane na estrada? Sinaliza no app e quem está perto e disposto a ajudar aparece. Comunidade que cuida de comunidade.',
    href: '/recursos/help-overlander',
  },
  {
    titulo: 'GT Social',
    desc: 'Rede social dentro do GT. Siga overlanders, descubra rotas testadas, copie roteiros completos com 1 toque.',
    href: '/recursos/gt-social',
  },
  {
    titulo: 'GT Explorer',
    desc: 'Sua jornada vira XP, níveis, conquistas e ranking regional. Cada km, cada validação, cada rota concluída soma.',
    href: '/recursos/explorer',
  },
  {
    titulo: 'GT Desapega',
    desc: 'Marketplace overlander entre quem realmente viaja. Compre, venda e troque equipamento sem comissão sobre venda.',
    href: '/recursos/desapega',
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
