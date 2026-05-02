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

const PREFERRED_ORDER: string[] = [
  'gas station',
  'mechanic',
  'hotel',
  'guesthouse',
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
  'hospital',
  'pharmacy',
  'rv support',
];

export function getCategoryConfig(category: string): CategoryConfig {
  if (category in CATEGORIES_KNOWN) {
    return CATEGORIES_KNOWN[category];
  }
  const label = category
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    label,
    emoji: '📍',
    color: '#707070',
  };
}

export function sortCategories(categories: string[]): string[] {
  return [...categories].sort((a, b) => {
    const aIdx = PREFERRED_ORDER.indexOf(a);
    const bIdx = PREFERRED_ORDER.indexOf(b);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return a.localeCompare(b);
  });
}

// === GRUPOS COMPOSTOS ===
const CATEGORY_TO_GROUP: Record<string, string> = {
  hotel: 'Hospedagem',
  guesthouse: 'Hospedagem',
  restaurant: 'Alimentação',
  'fast food': 'Alimentação',
  cafe: 'Alimentação',
  bakery: 'Alimentação',
  supermarket: 'Alimentação',
  hospital: 'Saúde',
  pharmacy: 'Saúde',
  // Parque Nacional cai dentro do chip "Atração" (são poucos por país).
  // No mapa cada um mantém o emoji próprio (⭐ vs 🌲).
  'national park': 'attraction',
};

const COMPOSITE_GROUPS_CONFIG: Record<string, CategoryConfig> = {
  Hospedagem: { label: 'Hospedagem', emoji: '🛌', color: '#7280C4' },
  Alimentação: { label: 'Alimentação', emoji: '🍽️', color: '#B8505A' },
  Saúde: { label: 'Saúde', emoji: '🏥', color: '#C04050' },
};

export function categoryToGroupKey(category: string): string {
  return CATEGORY_TO_GROUP[category] ?? category;
}

export function getGroupConfig(groupKey: string): CategoryConfig {
  if (groupKey in COMPOSITE_GROUPS_CONFIG) {
    return COMPOSITE_GROUPS_CONFIG[groupKey];
  }
  return getCategoryConfig(groupKey);
}

const GROUP_ORDER: string[] = [
  'gas station',
  'mechanic',
  'Hospedagem',
  'camping',
  'Alimentação',
  'attraction',
  'viewpoint',
  'museum',
  'rest area',
  'parking',
  'border crossing',
  'Saúde',
  'rv support',
];

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
