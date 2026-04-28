const stats = [
  { valor: 'Milhares', contexto: 'de viajantes cadastrados' },
  { valor: 'Milhares', contexto: 'de usuários ativos por mês' },
  { valor: '+40%', contexto: 'de recorrência mensal' },
  { valor: '+4 mi', contexto: 'de waypoints próprios em 209 países' },
];

export function Numeros() {
  return (
    <section className="bg-gt-green text-white py-16 md:py-20">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-medium mb-2 tracking-tightish">
                {s.valor}
              </div>
              <p className="text-sm text-white/70 leading-snug max-w-[180px]">
                {s.contexto}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/50 mt-10 md:mt-12">
          App rodando em iOS, Android, CarPlay e Android Auto, em 3 idiomas.
        </p>
      </div>
    </section>
  );
}
