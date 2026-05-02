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
  // Estrada e veículo
  'gas station': { label: 'Postos', emoji: '⛽', color: '#E06226' },
  mechanic: { label: 'Oficina', emoji: '🔧', color: '#8090A0' },
  'rv support': { label: 'Aceita RV', emoji: '🚐', color: '#1F8A8A' },
  // Hospedagem
  hotel: { label: 'Hospedagem', emoji: '🛌', color: '#7280C4' },
  guesthouse: { label: 'Pousada', emoji: '🏡', color: '#A48B65' },
  camping: { label: 'Camping', emoji: '🏕️', color: '#5A8A48' },
  // Comida
  restaurant: { label: 'Restaurante', emoji: '🍽️', color: '#B8505A' },
  'fast food': { label: 'Fast Food', emoji: '🍔', color: '#D49850' },
  cafe: { label: 'Café', emoji: '☕', color: '#8B5A3C' },
  bakery: { label: 'Padaria', emoji: '🥐', color: '#C39556' },
  // Turismo
  attraction: { label: 'Atração', emoji: '⭐', color: '#E0A025' },
  'national park': { label: 'Parque Nacional', emoji: '🌲', color: '#3F7050' },
  // Logística
  'rest area': { label: 'Área de Descanso', emoji: '🅿️', color: '#5C7080' },
  'border crossing': { label: 'Fronteira', emoji: '🛂', color: '#A050A0' },
  // Saúde / emergência
  hospital: { label: 'Hospital', emoji: '🏥', color: '#C04050' },
  pharmacy: { label: 'Farmácia', emoji: '💊', color: '#5BAA5F' },
  // Categorias do Radar (podem aparecer em outros países, mantidas como fallback)
  viewpoint: { label: 'Mirante', emoji: '🏞️', color: '#7080A0' },
  museum: { label: 'Museu', emoji: '🏛️', color: '#806060' },
  parking: { label: 'Estacionamento', emoji: '🚗', color: '#606060' },
  supermarket: { label: 'Supermercado', emoji: '🛒', color: '#5070A0' },
};

/**
 * Ordem preferencial de exibição quando a categoria é conhecida.
 * Agrupa por contexto: estrada → hospedagem → comida → turismo → logística → emergência.
 * Categorias desconhecidas (não listadas) ficam no fim, em ordem alfabética.
 */
const PREFERRED_ORDER: string[] = [
  // Estrada
  'gas station',
  'mechanic',
  // Hospedagem
  'hotel',
  'guesthouse',
  'camping',
  // Comida
  'restaurant',
  'fast food',
  'cafe',
  'bakery',
  'supermarket',
  // Turismo
  'attraction',
  'viewpoint',
  'museum',
  'national park',
  // Logística
  'rest area',
  'parking',
  'border crossing',
  // Emergência
  'hospital',
  'pharmacy',
  // Transversal (sempre no fim)
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

// === GRUPOS COMPOSTOS ===
// Algumas categorias agrupam pra simplificar o filtro:
// - Hospedagem = hotel + guesthouse
// - Alimentação = restaurant + fast food + cafe + bakery + supermarket
// - Saúde = hospital + pharmacy
// As demais ficam como chips individuais.

const CATEGORY_TO_GROUP: Record<string, string> = {
  // Hospedagem (composto)
  hotel: 'Hospedagem',
  guesthouse: 'Hospedagem',
  // Alimentação (composto)
  restaurant: 'Alimentação',
  'fast food': 'Alimentação',
  cafe: 'Alimentação',
  bakery: 'Alimentação',
  supermarket: 'Alimentação',
  // Saúde (composto)
  hospital: 'Saúde',
  pharmacy: 'Saúde',
};

const COMPOSITE_GROUPS_CONFIG: Record<string, CategoryConfig> = {
  Hospedagem: { label: 'Hospedagem', emoji: '🛌', color: '#7280C4' },
  Alimentação: { label: 'Alimentação', emoji: '🍽️', color: '#B8505A' },
  Saúde: { label: 'Saúde', emoji: '🏥', color: '#C04050' },
};

/**
 * Retorna a chave do "grupo" pra uma categoria.
 * Se categoria está num grupo composto, retorna o nome do grupo.
 * Senão, retorna a própria categoria.
 */
export function categoryToGroupKey(category: string): string {
  return CATEGORY_TO_GROUP[category] ?? category;
}

/**
 * Retorna config de um grupo (composto ou categoria simples).
 */
export function getGroupConfig(groupKey: string): CategoryConfig {
  if (groupKey in COMPOSITE_GROUPS_CONFIG) {
    return COMPOSITE_GROUPS_CONFIG[groupKey];
  }
  return getCategoryConfig(groupKey);
}

const GROUP_ORDER: string[] = [
  'gas station', // Postos
  'mechanic', // Oficina
  'Hospedagem', // composto
  'camping', // Camping
  'Alimentação', // composto
  'attraction', // Atração
  'viewpoint',
  'museum',
  'national park', // Parque Nacional
  'rest area', // Área de Descanso
  'parking',
  'border crossing', // Fronteira
  'Saúde', // composto
  'rv support', // Aceita RV (transversal — sempre no fim)
];

/**
 * Ordena grupos (compostos ou categorias simples) na ordem preferencial.
 */
export function sortGroups(groupKeys: string[]): string[] {
  return [...groupKeys].sort((a, b) => {
    const aIdx = GROUP_ORDER.indexOf(a);
    const bIdx = GROUP_ORDER.indexOf(b);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return a.localeCompare(b);
  });
}
