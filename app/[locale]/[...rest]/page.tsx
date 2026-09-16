import { notFound } from 'next/navigation';

/**
 * Catch-all de URLs inexistentes dentro do locale.
 *
 * Sem ele o Next não acha rota nenhuma, cai no not-found da raiz (fora do
 * segmento [locale]) e serve a tela padrão sem header, footer nem tradução.
 * Com ele, a 404 do site renderiza dentro do layout do idioma certo.
 *
 * Rotas reais têm precedência sobre catch-all no App Router, então isso só
 * pega o que não casou com nada.
 */
export default function CatchAllNotFound() {
  notFound();
}
