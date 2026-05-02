// Labels, emojis e cores das categorias de waypoints.
// A demo lê DINAMICAMENTE do arquivo de cada país quais categorias existem
// e renderiza o filtro com base nisso. Esse mapa serve de catálogo pra
// dar label bonito e emoji em PT-BR pras categorias conhecidas.
// Se o backend adicionar uma categoria nova, ela aparece com fallback automático.

interface CategoryConfig {
  label: string;
  emoji: string;
  color: string;
}

const CATEGORIES_KNOWN: Record<string, CategoryConfig> = {
  'gas station': { label: 'Postos', emoji: '⛽', color: '#E06226' },
  hotel: { label: 'Hospedagem', emoji: '🛌', color: '#7280C4' },
  camping: { label: 'Camping', emoji: '🏕️', color: '#5A8A48' },
  restaurant: { label: 'Restaurante', emoji: '🍽️', color: '#B8505A' },
  'fast food': { label: 'Fast Food', emoji: '🍔', color: '#D49850' },
  cafe: { label: 'Café', emoji: '☕', color: '#8B5A3C' },
  bakery: { label: 'Padaria', emoji: '🥐', color: '#C39556' },
  attraction: { label: 'Atração', emoji: '⭐', color: '#E0A025' },
  'rest area': { label: 'Área de Descanso', emoji: '🅿️', color: '#5C7080' },
  'national park': { label: 'Parque Nacional', emoji: '🌲', color: '#3F7050' },
  'border crossing': { label: 'Fronteira', emoji: '🛂', color: '#A050A0' },
  'rv support': { label: 'Aceita RV', emoji: '🚐', color: '#1F8A8A' },
  viewpoint: { label: 'Mirante', emoji: '🏞️', color: '#7080A0' },
  museum: { label: 'Museu', emoji: '🏛️', color: '#806060' },
  parking: { label: 'Estacionamento', emoji: '🚗', color: '#606060' },
  supermarket: { label: 'Supermercado', emoji: '🛒', color: '#5070A0' },
};

/**
 * Ordem preferencial de exibição quando a categoria é conhecida.
 * Categorias desconhecidas (não listadas aqui) ficam no fim, em ordem alfabética.
 */
const PREFERRED_ORDER: string[] = [
  'gas station',
  'hotel',
  'camping',
  'restaurant',
  'fast food',
  'cafe',
  'bakery',
  'supermarket',
  'attraction',
  'viewpoint',
  'museum',
  'national park',
  'rest area',
  'parking',
  'border crossing',
  'rv support',
];

/**
 * Retorna o config de uma categoria. Se for desconhecida, gera fallback
 * com label capitalizada do próprio código + emoji genérico.
 */
export function getCategoryConfig(category: string): CategoryConfig {
  if (category in CATEGORIES_KNOWN) {
    return CATEGORIES_KNOWN[category];
  }
  // Fallback: capitaliza primeira letra e troca _/- por espaço
  const label = category
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    label,
    emoji: '📍',
    color: '#707070',
  };
}

/**
 * Ordena categorias colocando as conhecidas na ordem preferencial primeiro,
 * e desconhecidas alfabeticamente no fim.
 */
export function sortCategories(categories: string[]): string[] {
  return [...categories].sort((a, b) => {
    const aIdx = PREFERRED_ORDER.indexOf(a);
    const bIdx = PREFERRED_ORDER.indexOf(b);

    // Ambas conhecidas — ordem preferencial
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    // Só A é conhecida — A vem primeiro
    if (aIdx !== -1) return -1;
    // Só B é conhecida — B vem primeiro
    if (bIdx !== -1) return 1;
    // Ambas desconhecidas — alfabético
    return a.localeCompare(b);
  });
}
