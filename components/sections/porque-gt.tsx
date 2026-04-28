import Link from 'next/link';

export function PorqueGt() {
  return (
    <section className="bg-gt-bg py-20 md:py-24 border-t border-gt-border">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl text-gt-text mb-8 leading-tight">
          O Google Maps não foi feito pra overlanders
        </h2>

        <div className="space-y-5 text-gt-text leading-relaxed font-sans">
          <p>
            Aplicativos de mapa convencionais foram desenhados pra cidades e asfalto. O overlander vive numa outra realidade — estradas de terra, postos rurais, campings selvagens, fronteiras burocráticas, rotas que aparecem em mapa nenhum.
          </p>
          <p>
            O GT existe pra preencher esse vazio. Uma IA que entende viagem por terra, uma base própria com mais de 4 milhões de waypoints relevantes pra quem viaja por terra, e um app pensado pra quem precisa de informação confiável quando o sinal cai.
          </p>
          <p>
            Não substituímos o Google Maps na navegação. A gente passa a ser a inteligência dos pontos de apoio — onde dormir, onde abastecer, onde comer, onde acampar — junto da rota que faz sentido pro seu jeito de viajar.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/sobre"
            className="text-gt-orange text-sm font-medium hover:underline font-sans"
          >
            Conheça nossa história →
          </Link>
        </div>
      </div>
    </section>
  );
}
