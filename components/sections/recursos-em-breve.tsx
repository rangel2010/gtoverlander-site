import Link from 'next/link';

const items = [
  {
    titulo: 'Modo Off Road',
    desc: 'Crie rotas off-road com a sua cara, ligando os waypoints da nossa base num mapa interativo dedicado a trilhas.',
    href: '/recursos/off-road',
  },
  {
    titulo: 'Modo Offline',
    desc: 'Use o GT em qualquer lugar do mundo — sem depender de sinal. Baixe e parta.',
    href: '/recursos/modo-offline',
  },
  {
    titulo: 'Explore Novos Destinos',
    desc: 'Roteiros curados por especialistas e pelo time GT. Inspire sua próxima viagem com rotas prontas.',
    href: '/contato',
  },
];

export function RecursosEmBreve() {
  return (
    <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
      <div className="container-wide">
        <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">
          Em breve
        </p>
        <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
          O que tá vindo
        </h2>
        <p className="text-sm text-gt-text-muted mb-12 max-w-xl font-sans">
          Recursos em construção. Cadastre-se na lista pra ser avisado quando lançarem.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((i) => (
            <Link
              key={i.titulo}
              href={i.href}
              className="bg-gt-card rounded-lg p-6 md:p-7 border border-gt-border hover:border-gt-orange/50 hover:bg-gt-card-hover transition-colors group relative"
            >
              <span className="absolute top-4 right-4 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded font-sans">
                Em breve
              </span>
              <h3 className="text-lg text-gt-text mb-3 mt-1 pr-20 group-hover:text-gt-orange transition-colors">
                {i.titulo}
              </h3>
              <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                {i.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
