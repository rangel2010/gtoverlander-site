// Estrutura do Studio: separa os posts por idioma no menu lateral.
// É só organização visual do /studio — não muda nada no site,
// que continua buscando os posts pelo campo `locale` via query.

import type { StructureResolver } from 'sanity/structure';

const ordenacaoPorData = [
  { field: 'publishedAt', direction: 'desc' as const },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('🇧🇷 Português')
        .child(
          S.documentList()
            .title('Posts em Português')
            .filter('_type == "post" && (locale == "pt" || !defined(locale))')
            .defaultOrdering(ordenacaoPorData)
            .initialValueTemplates([S.initialValueTemplateItem('post-pt')])
        ),
      S.listItem()
        .title('🇺🇸 English')
        .child(
          S.documentList()
            .title('Posts in English')
            .filter('_type == "post" && locale == "en"')
            .defaultOrdering(ordenacaoPorData)
            .initialValueTemplates([S.initialValueTemplateItem('post-en')])
        ),
      S.listItem()
        .title('🇪🇸 Español')
        .child(
          S.documentList()
            .title('Posts en Español')
            .filter('_type == "post" && locale == "es"')
            .defaultOrdering(ordenacaoPorData)
            .initialValueTemplates([S.initialValueTemplateItem('post-es')])
        ),
      S.divider(),
      // Rotas que aparecem no site (www.gtoverlander.com.br/rotas/…). 02/10/2026.
      S.listItem()
        .title('🗺️ Rotas do site')
        .child(
          S.documentList()
            .title('Rotas do site')
            .filter('_type == "rotaSite"')
            .defaultOrdering([{ field: 'ordem', direction: 'asc' }])
        ),
      S.divider(),
      S.listItem()
        .title('💬 Comentários pendentes')
        .child(
          S.documentList()
            .title('Pendentes de moderação')
            .filter('_type == "comment" && status == "pending"')
            .defaultOrdering([{ field: 'createdAt', direction: 'asc' }])
        ),
      S.listItem()
        .title('✅ Comentários aprovados')
        .child(
          S.documentList()
            .title('Aprovados')
            .filter('_type == "comment" && status == "approved"')
            .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('🚫 Comentários rejeitados')
        .child(
          S.documentList()
            .title('Rejeitados (bloqueio automático ou manual)')
            .filter('_type == "comment" && status == "rejected"')
            .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
        ),
    ]);
