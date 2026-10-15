import { defineType, defineField } from 'sanity';

/**
 * "Convite em PDF" (15/10/2026). Convites individuais para parceiros, enviados
 * por link (Instagram, WhatsApp). Cada registro vira um endereço no domínio:
 *   www.gtoverlander.com.br/convites/<endereço>.pdf
 *
 * Os convites ficam FORA do Google: a resposta leva "X-Robots-Tag: noindex",
 * não entram no sitemap e nenhuma página do site aponta pra eles.
 * Pra tirar um convite do ar, desligue "Ativo" (não apague o registro).
 */
const codigo = () => Math.random().toString(36).slice(2, 6);

export const conviteSchema = defineType({
  name: 'convitePdf',
  title: 'Convite em PDF',
  type: 'document',
  fields: [
    defineField({
      name: 'parceiro',
      title: 'Parceiro',
      type: 'string',
      description: 'Nome do parceiro convidado. Só aparece aqui no Studio.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Endereço (www.gtoverlander.com.br/convites/….pdf)',
      type: 'slug',
      description:
        'Clique em "Gerar": usa o nome do parceiro e acrescenta um código curto no fim, pra ninguém adivinhar o convite de outro. O link final é www.gtoverlander.com.br/convites/<endereço>.pdf',
      options: {
        source: 'parceiro',
        maxLength: 60,
        slugify: (input: string) => {
          const base = input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 50);
          return `${base}-${codigo()}`;
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'arquivo',
      title: 'PDF do convite',
      type: 'file',
      options: { accept: 'application/pdf' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ativo',
      title: 'Ativo',
      type: 'boolean',
      description: 'Desligue pra tirar o convite do ar sem apagar o registro.',
      initialValue: true,
    }),
    defineField({
      name: 'observacao',
      title: 'Observação (interna)',
      type: 'text',
      rows: 3,
      description: 'Ex.: enviado por Instagram em 15/10, respondeu em…',
    }),
  ],
  preview: {
    select: { title: 'parceiro', slug: 'slug.current', ativo: 'ativo' },
    prepare: ({ title, slug, ativo }) => ({
      title: `${ativo === false ? '⏸️ ' : ''}${title || 'Sem nome'}`,
      subtitle: slug ? `/convites/${slug}.pdf` : 'Sem endereço',
    }),
  },
});
