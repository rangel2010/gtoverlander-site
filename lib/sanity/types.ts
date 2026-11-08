export type Pillar = 'destinos' | 'preparacao' | 'vida-overlander';

export const PILLAR_TITLES: Record<Pillar, string> = {
  destinos: 'Destinos & Roteiros',
  preparacao: 'Preparação & Planejamento',
  'vida-overlander': 'Vida Overlander',
};

// Nome do pilar no idioma da página (08/11/2026). Mesmos textos de
// messages/*.json (blogPage.pillar*). Antes o artigo em EN/ES mostrava o
// nome em português acima do título e na migalha de pão do Google.
const PILLAR_TITLES_LOCALE: Record<'en' | 'es', Record<Pillar, string>> = {
  en: {
    destinos: 'Destinations & Routes',
    preparacao: 'Preparation & Planning',
    'vida-overlander': 'Overlander Life',
  },
  es: {
    destinos: 'Destinos & Rutas',
    preparacao: 'Preparación & Planificación',
    'vida-overlander': 'Vida Overlander',
  },
};

export function pillarTitle(pillar: Pillar, locale: string = 'pt'): string {
  if (locale === 'en' || locale === 'es') return PILLAR_TITLES_LOCALE[locale][pillar];
  return PILLAR_TITLES[pillar];
}

export const PILLAR_DESCRIPTIONS: Record<Pillar, string> = {
  destinos:
    'Roteiros, destinos e rotas pela América do Sul — do litoral nordestino à Patagônia, do Pantanal aos Andes. Quem viaja por terra precisa entender que cada região tem sua personalidade, sua geografia, seu ritmo. Aqui a gente conta o que importa pra quem quer rodar.',
  preparacao:
    'Documentação, equipamento, logística, fronteiras, mecânica básica. Tudo que você precisa saber antes de partir, e o que aprender no caminho. Da primeira viagem ao roteiro de meses, conteúdo prático que tira você do paralisia da preparação.',
  'vida-overlander':
    'O lado humano de viajar por terra. Acampamento, comunidade, segurança, comida na estrada, custos reais, perrengues, rotinas. Histórias e aprendizados de quem vive o overlanding na prática — não como turismo eventual, como modo de viver.',
};

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number };
}

export type BlogLocale = 'pt' | 'en' | 'es';

export interface LinkedTranslation {
  locale: string;
  slug: string;
}

export interface PostListItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: Pillar;
  coverImage: SanityImage;
  coverImageAlt: string;
  coverImageCredit?: string;
  imagemSocial?: SanityImage; // imagem pré-tratada para Instagram/Facebook (opcional)
  authorName: string;
  publishedAt: string;
  _updatedAt?: string; // carimbo do Sanity: muda a cada edição salva
  readingTime?: number;
  tags?: string[];
  featured?: boolean;
  locale?: BlogLocale;
  linkedTranslations?: LinkedTranslation[];
  commentsEnabled?: boolean;
}

export interface PostFull extends PostListItem {
  authorBio?: string;
  body: string; // markdown bruto — renderizado via react-markdown
  audioUrl?: string; // narração em áudio do artigo (opcional)
}
