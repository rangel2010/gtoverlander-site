import { defineType, defineField } from 'sanity';

/**
 * "Rota do site" (02/10/2026). Cada registro coloca UMA rota do app no site,
 * em www.gtoverlander.com.br/rotas/<endereço>, e na vitrine /rotas.
 *
 * Só aparece no site a rota que tem registro aqui — o Rangel escolhe quais.
 * A ficha da rota (km, dias, dificuldade, épocas, paradas, mapa) vem sozinha
 * do app, pelo código da rota. Aqui fica o que o app não tem: o texto escrito
 * pro Google, a capa e o artigo do blog relacionado.
 */
export const rotaSchema = defineType({
  name: 'rotaSite',
  title: 'Rota do site',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título da página',
      type: 'string',
      description:
        'O título que aparece no Google e no topo da página. Se ficar vazio, usa o título público da rota no app.',
      validation: (Rule) => Rule.max(70).warning('Acima de 70 caracteres o Google corta o título'),
    }),
    defineField({
      name: 'slug',
      title: 'Endereço (www.gtoverlander.com.br/rotas/…)',
      type: 'slug',
      description: 'Curto e fácil de falar no vídeo: uruguai, serras, ruta-40.',
      options: {
        source: 'titulo',
        maxLength: 40,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 40),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'appRouteId',
      title: 'Código da rota no app',
      type: 'string',
      description:
        'O final do endereço da rota pública no app. Ex.: em beta.gtoverlander.com.br/rotas/cmur0rf2v000l132o452yzoe2 o código é cmur0rf2v000l132o452yzoe2. A rota precisa estar pública no app.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mostrar',
      title: 'Mostrar no site',
      type: 'boolean',
      description: 'Desligue para tirar a rota do site sem apagar o registro.',
      initialValue: true,
    }),
    defineField({
      name: 'descricaoSeo',
      title: 'Descrição para o Google',
      type: 'text',
      rows: 2,
      description: 'Até 160 caracteres. Aparece embaixo do título no Google e quando o link é compartilhado.',
      validation: (Rule) => Rule.required().max(160).warning('Recomendado até 160 caracteres'),
    }),
    defineField({
      name: 'paises',
      title: 'Países',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Ex.: Brasil, Uruguai. Usado na vitrine de rotas.',
    }),
    defineField({
      name: 'capa',
      title: 'Foto de capa',
      type: 'image',
      options: { hotspot: true },
      description: 'Foto real de um lugar da rota. Se ficar vazio, usa a capa do artigo relacionado.',
    }),
    defineField({ name: 'capaAlt', title: 'Descrição da foto (acessibilidade)', type: 'string' }),
    defineField({ name: 'capaCredito', title: 'Crédito da foto', type: 'string' }),
    defineField({
      name: 'corpo',
      title: 'Texto da página (Markdown)',
      type: 'text',
      rows: 25,
      description:
        'O texto prático da rota: como é, os trechos, quando ir, o que levar. Mesmo formato do blog (## título, **negrito**, listas com -). A ficha, as paradas e o mapa entram sozinhos — não precisa repetir.',
    }),
    defineField({
      name: 'artigo',
      title: 'Artigo do blog relacionado',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'O artigo com a história e as dicas. A página da rota aponta pra ele.',
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem na vitrine',
      type: 'number',
      description: 'Menor aparece primeiro. Vazio vai pro fim.',
    }),
  ],
  preview: {
    select: { title: 'titulo', slug: 'slug.current', media: 'capa', mostrar: 'mostrar' },
    prepare: ({ title, slug, media, mostrar }) => ({
      title: title || slug || 'Rota sem título',
      subtitle: `/rotas/${slug ?? '…'}${mostrar === false ? ' · oculta' : ''}`,
      media,
    }),
  },
});
