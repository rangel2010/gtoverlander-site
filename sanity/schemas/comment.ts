import { defineType, defineField } from 'sanity';

// Comentários do blog. Fluxo: leitor loga com Google só pra identificar
// (nome + foto), escreve, cai como "pending". Um filtro automático simples
// (link/palavra bloqueada) já marca como "rejected" antes de chegar na fila.
// Rangel revisa manualmente no Studio e aprova ("approved") pra ficar público.
// Resposta da marca usa o mesmo schema, com isAuthorReply true e parentComment
// apontando pro comentário original — não é thread livre entre leitores.

export const STATUS_LABELS = {
  pending: 'Pendente',
  approved: 'Aprovado',
  rejected: 'Rejeitado',
} as const;

export type CommentStatus = keyof typeof STATUS_LABELS;

export const commentSchema = defineType({
  name: 'comment',
  title: 'Comentário',
  type: 'document',
  fields: [
    defineField({
      name: 'post',
      title: 'Artigo',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Nome (da conta Google)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorImage',
      title: 'Foto (URL da conta Google)',
      type: 'url',
    }),
    defineField({
      name: 'authorEmail',
      title: 'E-mail (da conta Google, não exibido publicamente)',
      type: 'string',
      description: 'Usado só pra moderação e pra identificar o autor. Nunca aparece no site.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Texto do comentário',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(1000),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: Object.entries(STATUS_LABELS).map(([value, title]) => ({ title, value })),
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'autoFlagReason',
      title: 'Motivo do bloqueio automático (se houver)',
      type: 'string',
      description: 'Preenchido automaticamente quando o filtro (link ou palavra bloqueada) rejeita antes da fila. Ajuda a conferir se o filtro errou.',
      readOnly: true,
    }),
    defineField({
      name: 'isAuthorReply',
      title: 'É resposta da marca (GT Overlander)',
      type: 'boolean',
      initialValue: false,
      description: 'Marcado automaticamente quando a resposta vem da conta autorizada do Rangel.',
    }),
    defineField({
      name: 'parentComment',
      title: 'Em resposta a',
      type: 'reference',
      to: [{ type: 'comment' }],
      description: 'Preenchido só quando isAuthorReply é true. Comentários de leitores não respondem a outros comentários.',
    }),
    defineField({
      name: 'createdAt',
      title: 'Criado em',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Mais recente',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      author: 'authorName',
      body: 'body',
      status: 'status',
      isReply: 'isAuthorReply',
      postTitle: 'post.title',
    },
    prepare({ author, body, status, isReply, postTitle }) {
      const statusLabel = STATUS_LABELS[status as CommentStatus] ?? status;
      const flag = isReply ? '🟠 GT · ' : '';
      return {
        title: `${flag}${author}: ${body?.slice(0, 60) ?? ''}`,
        subtitle: `${statusLabel} · ${postTitle ?? 'artigo não encontrado'}`,
      };
    },
  },
});
