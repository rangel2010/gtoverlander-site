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
      name: 'coverImageAlt',
      title: 'Texto alternativo da capa',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Descreva a imagem em 1 frase pra acessibilidade e SEO',
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
      name: 'featured',
      title: 'Destacar este post no hub do blog',
      type: 'boolean',
      initialValue: false,
      description: 'Aparece em destaque no /blog. Só um post deve estar marcado por vez.',
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Citação', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.required(),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Legenda (opcional)',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'authorName',
      category: 'category',
      media: 'coverImage',
      featured: 'featured',
    },
    prepare({ title, author, category, media, featured }) {
      const cat = category ? PILLARS[category as Pillar] ?? category : '—';
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${cat} · ${author ?? 'Sem autor'}`,
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
