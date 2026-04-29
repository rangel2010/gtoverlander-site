import Link from 'next/link';

export function PorqueGt() {
  return (
    <section className="bg-gt-bg py-20 md:py-24 border-t border-gt-border">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl text-gt-text mb-8 leading-tight">
          Apps de mapa convencionais não entendem overlander
        </h2>

        <div className="space-y-5 text-gt-text leading-relaxed font-sans">
          <p>
            Apps de mapa te empurram pro caminho mais rápido — a estrada principal, o atalho, a rota mais eficiente. Pra um overlander, o que importa é o caminho, não o destino.
          </p>
          <p>
            O GT existe pra preencher esse vazio. Uma IA que entende viagem por terra, uma base própria com mais de 4 milhões de waypoints curados pelo time e pela comunidade, e um app pensado pra quem precisa de informação confiável quando o sinal cai.
          </p>
          <p>
            Não substituímos o Google Maps na navegação. A gente passa a ser a inteligência dos pontos de apoio — onde dormir, onde abastecer, onde comer, onde acampar — junto da rota que faz sentido pro seu jeito de viajar.
          </p>
          <p>
            Quando você fecha o roteiro, sua viagem sai do GT pro Google Maps com um toque. Você ganha radar, trânsito ao vivo e dirige com CarPlay ou Android Auto — coisa rara entre apps overlander.
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
