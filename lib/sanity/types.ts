export type Pillar = 'destinos' | 'preparacao' | 'vida-overlander';

export const PILLAR_TITLES: Record<Pillar, string> = {
  destinos: 'Destinos & Roteiros',
  preparacao: 'Preparação & Planejamento',
  'vida-overlander': 'Vida Overlander',
};

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

export interface PostListItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: Pillar;
  coverImage: SanityImage;
  coverImageAlt: string;
  authorName: string;
  publishedAt: string;
  readingTime?: number;
  tags?: string[];
  featured?: boolean;
}

export interface PostFull extends PostListItem {
  authorBio?: string;
  body: string; // markdown bruto — renderizado via react-markdown
}
