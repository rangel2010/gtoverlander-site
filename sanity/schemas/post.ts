import { defineType, defineField } from 'sanity';

export const PILLARS = {
  destinos: 'Destinos & Roteiros América do Sul',
  preparacao: 'Preparação & Planejamento',
  'vida-overlander': 'Vida Overlander',
} as const;

export type Pillar = keyof typeof PILLARS;

export const postSchema = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) =>
        Rule.required().max(80).warning('Acima de 80 caracteres é grande pra SEO'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 80,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 80),
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          // Slugs reservados (que conflitam com pillar pages estáticas)
          const reserved = ['destinos', 'preparacao', 'vida-overlander'];
          if (slug?.current && reserved.includes(slug.current)) {
            return `Slug "${slug.current}" é reservado pra pillar page. Use outro.`;
          }
          return true;
        }),
    }),
    defineField({
      name: 'description',
      title: 'Descrição (meta description)',
      type: 'text',
      rows: 2,
      validation: (Rule) =>
        Rule.required()
          .max(160)
          .warning('Recomendado até 160 caracteres pra SEO'),
      description: 'Aparece no Google e quando o link é compartilhado',
    }),
    defineField({
      name: 'category',
      title: 'Pilar',
      type: 'string',
      options: {
        list: Object.entries(PILLARS).map(([value, title]) => ({
          title,
          value,
        })),
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de capa',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audio',
      title: 'Áudio (narração do artigo)',
      type: 'file',
      options: { accept: 'audio/*' },
      description: 'Arquivo de narração do artigo na voz do Rangel. Preenchido automaticamente.',
    }),
    defineField({
      name: 'coverImageAlt',
      title: 'Texto alternativo da capa',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Descreva a imagem em 1 frase pra acessibilidade e SEO',
    }),
    defineField({
      name: 'coverImageSuggestions',
      title: 'Sugestões de foto de capa',
      type: 'text',
      rows: 3,
      description:
        'Preenchido automaticamente quando o rascunho ainda não tem capa definitiva: ou aponta pro arquivo já baixado na pasta "Blog - Capas Sugeridas" (é só arrastar pro campo "Imagem de capa" acima), ou traz 1-2 links de banco de imagem pra baixar manualmente quando não deu pra baixar sozinho. Pode apagar depois de resolver.',
    }),
    defineField({
      name: 'coverImageCredit',
      title: 'Crédito da foto de capa (se exigido)',
      type: 'string',
      description:
        'Preencha só quando a foto vier de uma fonte que exige atribuição (ex: Wikimedia Commons com licença CC BY). Formato: "Foto: Nome do autor / Wikimedia Commons (licença)". Aparece em texto discreto embaixo da capa no artigo. Deixe vazio se a foto não exige crédito (ex: Unsplash, ou foto própria).',
    }),
    defineField({
      name: 'imagemSocial',
      title: 'Imagem para redes sociais (opcional)',
      type: 'image',
      options: { hotspot: true },
      description:
        'Sobe aqui a imagem já tratada (1:1, com título e arte) para Instagram e Facebook. Quando presente, o Make posta essa imagem. Se não tiver, usa a capa original.',
    }),
    defineField({
      name: 'authorName',
      title: 'Autor',
      type: 'string',
      initialValue: 'Rangel Machado',
    }),
    defineField({
      name: 'authorBio',
      title: 'Bio do autor (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'locale',
      title: 'Idioma',
      type: 'string',
      options: {
        list: [
          { title: '🇧🇷 Português', value: 'pt' },
          { title: '🇺🇸 English', value: 'en' },
          { title: '🇪🇸 Español', value: 'es' },
        ],
        layout: 'radio',
      },
      initialValue: 'pt',
      validation: (Rule) => Rule.required(),
      description: 'Idioma em que este post foi escrito. Posts são escritos nativamente — não são traduções automáticas.',
    }),
    defineField({
      name: 'linkedTranslations',
      title: 'Posts equivalentes em outros idiomas (opcional)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'locale', title: 'Idioma', type: 'string' }),
            defineField({ name: 'slug', title: 'Slug do post', type: 'string' }),
          ],
          preview: {
            select: { locale: 'locale', slug: 'slug' },
            prepare: ({ locale, slug }: { locale?: string; slug?: string }) => ({
              title: locale?.toUpperCase() ?? '—',
              subtitle: slug ?? '—',
            }),
          },
        },
      ],
      description: 'Se este post existe em outros idiomas, linke aqui. Habilita hreflang e "leia em inglês" no site.',
    }),
    defineField({
      name: 'featured',
      title: 'Destacar este post no hub do blog',
      type: 'boolean',
      initialValue: false,
      description: 'Aparece em destaque no /blog. Só um post deve estar marcado por vez.',
    }),
    defineField({
      name: 'commentsEnabled',
      title: 'Comentários habilitados neste post',
      type: 'boolean',
      initialValue: true,
      description:
        'Liga a seção de comentários (login Google, moderação manual) neste artigo. Já vem ligado por padrão desde que o recurso passou a valer pra todo o blog PT; desligue aqui se quiser fechar em algum post específico.',
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo (Markdown)',
      type: 'text',
      rows: 30,
      description:
        'Cole o markdown completo aqui. Suporta # H1, ## H2, ### H3, **negrito**, *itálico*, [link](url), listas com - ou 1., > citação, ![imagem](url) e tabelas. Vai ser renderizado bonitinho no site.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'authorName',
      category: 'category',
      media: 'coverImage',
      featured: 'featured',
      locale: 'locale',
      publishedAt: 'publishedAt',
      coverSuggestions: 'coverImageSuggestions',
    },
    prepare({ title, author, category, media, featured, locale, publishedAt, coverSuggestions }) {
      const cat = category ? PILLARS[category as Pillar] ?? category : '—';
      const lang = locale ? locale.toUpperCase() : 'PT';
      const dateStr = publishedAt
        ? new Date(publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
        : 'sem data';
      const needsCover = !media && coverSuggestions;
      const flag = needsCover ? '📸 ' : featured ? '⭐ ' : '';
      return {
        title: `${flag}${title}`,
        subtitle: needsCover
          ? `${dateStr} · [${lang}] ${cat} · falta escolher capa`
          : `${dateStr} · [${lang}] ${cat}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Mais recente',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Mais antigo',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
});
