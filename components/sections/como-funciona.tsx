import Link from 'next/link';

const passos = [
  {
    num: 1,
    titulo: 'Você descreve a viagem',
    desc: 'Conta o destino, os dias, o ritmo, o perfil — em linguagem natural',
  },
  {
    num: 2,
    titulo: 'A IA monta a espinha dorsal',
    desc: 'O trajeto base da sua viagem, focado no caminho — pronto em segundos',
  },
  {
    num: 3,
    titulo: 'Você deixa com a sua cara',
    desc: 'Refina, personaliza, inclui paradas, postos, hotéis, campings — você decide',
  },
  {
    num: 4,
    titulo: 'Você roda',
    desc: 'Parte com CarPlay ou Android Auto. Tudo na palma da mão',
  },
];

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="bg-gt-bg py-20 md:py-24 border-t border-gt-border"
    >
      <div className="container-wide">
        <h2 className="text-3xl md:text-4xl text-gt-text mb-3">
          Como funciona
        </h2>
        <p className="text-gt-text-muted mb-12 max-w-xl font-sans">
          Da ideia ao roteiro pronto, em 4 passos.
        </p>

        <div className="grid md:grid-cols-4 gap-8 md:gap-6">
          {passos.map((p) => (
            <div key={p.num} className="border-l-2 border-gt-orange pl-5">
              <div className="text-gt-orange font-medium text-sm mb-2 font-sans">
                {p.num.toString().padStart(2, '0')}
              </div>
              <h3 className="text-lg text-gt-text mb-2 leading-snug">
                {p.titulo}
              </h3>
              <p className="text-sm text-gt-text-muted leading-relaxed font-sans">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/recursos/roteiros-ia"
            className="text-gt-orange text-sm font-medium hover:underline font-sans"
          >
            Ver demonstração da IA →
          </Link>
        </div>
      </div>
    </section>
  );
}
