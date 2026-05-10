import Link from 'next/link';

export function RecursosEmBreve() {
  return (
    <section className="bg-gt-bg py-16 md:py-20 border-t border-gt-border">
      <div className="container-wide">
        <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-3 font-sans">
          Em breve
        </p>
        <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
          Vem com o v2
        </h2>
        <p className="text-sm text-gt-text-muted mb-12 max-w-xl font-sans">
          Próximo lançamento, integrado ao app que vai entregar todas as novidades de uma vez.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <Link
            href="/recursos/modo-offline"
            className="bg-gt-card rounded-lg p-7 md:p-8 border border-gt-border hover:border-gt-orange/50 hover:bg-gt-card-hover transition-colors group relative"
          >
            <span className="absolute top-5 right-5 bg-gt-orange text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded font-sans">
              Em breve
            </span>
            <h3 className="text-xl md:text-2xl text-gt-text mb-3 mt-1 pr-20 group-hover:text-gt-orange transition-colors">
              Modo Offline
            </h3>
            <p className="text-sm text-gt-text-muted leading-relaxed mb-5 font-sans">
              Free baixa o país onde você está com todas as categorias. Plus e Pro liberam os 209 países do mundo com atualização automática. GT roda em qualquer canto, sem depender de sinal.
            </p>
            <span className="text-gt-orange text-sm font-medium font-sans">
              Saiba mais →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
