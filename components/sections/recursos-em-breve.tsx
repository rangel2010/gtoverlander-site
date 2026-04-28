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
    href: '/contato', // captura interesse via form geral por enquanto
  },
];

export function RecursosEmBreve() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-wide">
        <p className="text-xs uppercase tracking-[0.18em] text-gt-orange/80 mb-3">
          Em breve
        </p>
        <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-3">
          O que tá vindo
        </h2>
        <p className="text-sm text-gt-gray-mid mb-12 max-w-xl">
          Recursos em construção. Cadastre-se na lista pra ser avisado quando lançarem.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((i) => (
            <Link
              key={i.titulo}
              href={i.href}
              className="bg-gt-cream rounded-lg p-6 md:p-7 border border-gt-green/10 hover:border-gt-orange/40 transition-colors group relative"
            >
              <span className="absolute top-4 right-4 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded">
                Em breve
              </span>
              <h3 className="font-medium text-gt-green mb-3 mt-1 pr-20 group-hover:text-gt-orange transition-colors">
                {i.titulo}
              </h3>
              <p className="text-sm text-gt-gray-mid leading-relaxed">
                {i.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
