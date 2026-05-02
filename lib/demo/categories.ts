// Labels e emojis das categorias de waypoints.
// Mantém alinhado com o que aparece em /recursos/waypoints (categorias visíveis).

import type { WaypointCategory } from './types';

interface CategoryConfig {
  label: string; // Label em PT-BR
  emoji: string; // Emoji que representa
  // Cor do pin individual no mapa (quando não está em cluster)
  color: string;
  // Aparece no filtro principal? (algumas categorias do Radar não aparecem no filtro padrão)
  inFilter: boolean;
}

export const CATEGORIES: Record<WaypointCategory, CategoryConfig> = {
  'gas station': {
    label: 'Postos',
    emoji: '⛽',
    color: '#E06226', // GT orange
    inFilter: true,
  },
  hotel: {
    label: 'Hospedagem',
    emoji: '🛌',
    color: '#7280C4',
    inFilter: true,
  },
  camping: {
    label: 'Camping',
    emoji: '🏕️',
    color: '#5A8A48',
    inFilter: true,
  },
  restaurant: {
    label: 'Restaurante',
    emoji: '🍽️',
    color: '#B8505A',
    inFilter: true,
  },
  'fast food': {
    label: 'Fast Food',
    emoji: '🍔',
    color: '#D49850',
    inFilter: true,
  },
  cafe: {
    label: 'Café',
    emoji: '☕',
    color: '#8B5A3C',
    inFilter: true,
  },
  bakery: {
    label: 'Padaria',
    emoji: '🥐',
    color: '#C39556',
    inFilter: true,
  },
  attraction: {
    label: 'Atração',
    emoji: '⭐',
    color: '#E0A025',
    inFilter: true,
  },
  'rest area': {
    label: 'Área de Descanso',
    emoji: '🅿️',
    color: '#5C7080',
    inFilter: true,
  },
  'national park': {
    label: 'Parque Nacional',
    emoji: '🌲',
    color: '#3F7050',
    inFilter: true,
  },
  'border crossing': {
    label: 'Fronteira',
    emoji: '🛂',
    color: '#A050A0',
    inFilter: true,
  },
  'rv support': {
    label: 'Aceita RV',
    emoji: '🚐',
    color: '#1F8A8A',
    inFilter: true,
  },
  // Categorias adicionais (Radar) — não aparecem no filtro padrão
  viewpoint: {
    label: 'Mirante',
    emoji: '🏞️',
    color: '#7080A0',
    inFilter: false,
  },
  museum: {
    label: 'Museu',
    emoji: '🏛️',
    color: '#806060',
    inFilter: false,
  },
  parking: {
    label: 'Estacionamento',
    emoji: '🚗',
    color: '#606060',
    inFilter: false,
  },
  supermarket: {
    label: 'Supermercado',
    emoji: '🛒',
    color: '#5070A0',
    inFilter: false,
  },
};

/**
 * Categorias que aparecem no filtro principal da demo.
 * Ordem importa pra UI.
 */
export const DEFAULT_FILTER_CATEGORIES: WaypointCategory[] = [
  'gas station',
  'hotel',
  'camping',
  'restaurant',
  'fast food',
  'cafe',
  'bakery',
  'attraction',
  'rest area',
  'national park',
  'border crossing',
  'rv support',
];

/**
 * Retorna o config de uma categoria. Se categoria não for reconhecida,
 * retorna config genérico (pra defensive coding).
 */
export function getCategoryConfig(category: string): CategoryConfig {
  if (category in CATEGORIES) {
    return CATEGORIES[category as WaypointCategory];
  }
  return {
    label: category,
    emoji: '📍',
    color: '#707070',
    inFilter: false,
  };
}
