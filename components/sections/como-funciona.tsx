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
    <section id="como-funciona" className="bg-white py-20 md:py-24">
      <div className="container-wide">
        <h2 className="text-2xl md:text-3xl font-medium text-gt-green mb-3">
          Como funciona
        </h2>
        <p className="text-gt-gray-mid mb-12 max-w-xl">
          Da ideia ao roteiro pronto, em 4 passos.
        </p>

        <div className="grid md:grid-cols-4 gap-8 md:gap-6">
          {passos.map((p) => (
            <div key={p.num} className="border-l-2 border-gt-orange pl-5">
              <div className="text-gt-orange font-medium text-sm mb-2">
                {p.num.toString().padStart(2, '0')}
              </div>
              <h3 className="font-medium text-gt-green mb-2 leading-snug">
                {p.titulo}
              </h3>
              <p className="text-sm text-gt-gray-mid leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/recursos/roteiros-ia"
            className="text-gt-orange text-sm font-medium hover:underline"
          >
            Ver demonstração da IA →
          </Link>
        </div>
      </div>
    </section>
  );
}
