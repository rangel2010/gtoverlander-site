const stats = [
  { valor: 'Milhares', contexto: 'de viajantes cadastrados' },
  { valor: '+30%', contexto: 'de crescimento de usuários ao mês' },
  { valor: '+4 mi', contexto: 'de waypoints na nossa base — ajude a crescer ainda mais' },
  { valor: '+50%', contexto: 'dos que testaram voltaram a usar' },
];

export function Numeros() {
  return (
    <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
      <div className="container-wide">
        <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
          Momentum
        </p>
        <h2 className="text-3xl md:text-4xl text-gt-text mb-12">
          O ritmo dos últimos meses
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-display uppercase tracking-display text-gt-text mb-2">
                {s.valor}
              </div>
              <p className="text-sm text-gt-text-muted leading-snug max-w-[180px] font-sans">
                {s.contexto}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gt-text-dim mt-10 md:mt-12 font-sans">
          App em iOS, Android e Web — compatível com CarPlay e Android Auto, em 3 idiomas.
        </p>
      </div>
    </section>
  );
}
