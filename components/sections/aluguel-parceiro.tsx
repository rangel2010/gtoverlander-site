/**
 * Faixa de parceria DiscoverCars na página inicial (19/10/2026).
 * Link de TEXTO (não widget/banner): é o que conta para a comissão bônus do
 * programa de afiliados. ID de afiliado: rangelmachado.
 * Público: quem voa até o destino e aluga carro lá (Atacama, Patagônia, gringo
 * que roda pela América do Sul). rel="sponsored" porque é link de parceiro.
 */
const AFILIADO = 'a_aid=rangelmachado';

const TEXTOS = {
  pt: {
    titulo: 'Vai voar e rodar no destino?',
    texto: 'Se a viagem começa no aeroporto, dá para montar o roteiro aqui e retirar o carro lá. Compare preços de locadoras no Chile, na Argentina, no Uruguai e no mundo todo.',
    link: 'Comparar aluguel de carros',
    aviso: 'Link de parceiro DiscoverCars. Você não paga nada a mais e ajuda o GT Overlander.',
    url: `https://www.discovercars.com/pt?${AFILIADO}`,
  },
  en: {
    titulo: 'Flying in and driving from there?',
    texto: 'If your trip starts at the airport, plan the route here and pick up the car there. Compare rental prices in Chile, Argentina, Uruguay and worldwide.',
    link: 'Compare car rentals',
    aviso: 'DiscoverCars partner link. It costs you nothing extra and supports GT Overlander.',
    url: `https://www.discovercars.com/?${AFILIADO}`,
  },
  es: {
    titulo: '¿Vuelas y manejas en el destino?',
    texto: 'Si tu viaje empieza en el aeropuerto, arma la ruta aquí y retira el auto allá. Compara precios de alquiler en Chile, Argentina, Uruguay y el mundo entero.',
    link: 'Comparar alquiler de autos',
    aviso: 'Enlace de socio DiscoverCars. No pagas nada extra y apoyas a GT Overlander.',
    url: `https://www.discovercars.com/es?${AFILIADO}`,
  },
} as const;

export function AluguelParceiro({ locale = 'pt' }: { locale?: 'pt' | 'en' | 'es' }) {
  const t = TEXTOS[locale] ?? TEXTOS.pt;
  return (
    <section className="bg-gt-bg py-10 md:py-12 border-t border-gt-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-xl md:text-2xl text-gt-text">{t.titulo}</h2>
            <p className="text-sm text-gt-text-muted leading-relaxed font-sans mt-2">{t.texto}</p>
            <p className="text-xs text-gt-text-dim font-sans mt-2">{t.aviso}</p>
          </div>
          <a
            href={t.url}
            target="_blank"
            rel="sponsored noopener"
            className="text-gt-orange-text font-sans font-medium underline underline-offset-4 hover:no-underline whitespace-nowrap"
          >
            {t.link} →
          </a>
        </div>
      </div>
    </section>
  );
}
