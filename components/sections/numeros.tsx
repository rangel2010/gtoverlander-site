const stats = [
  { valor: 'Milhares', contexto: 'de viajantes cadastrados' },
  { valor: 'Milhares', contexto: 'de usuários ativos por mês' },
  { valor: '+40%', contexto: 'de recorrência mensal' },
  { valor: '+4 mi', contexto: 'de waypoints próprios em 209 países' },
];

export function Numeros() {
  return (
    <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
      <div className="container-wide">
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
          App rodando em iOS, Android, CarPlay e Android Auto, em 3 idiomas.
        </p>
      </div>
    </section>
  );
}
