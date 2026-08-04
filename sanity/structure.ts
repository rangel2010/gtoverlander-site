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
    ]);
