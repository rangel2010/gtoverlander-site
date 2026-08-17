import { createClient } from '@sanity/client';

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const SANITY_API_VERSION = '2024-01-01';

export const sanityConfigured = Boolean(SANITY_PROJECT_ID);

// Cliente Sanity. Se NEXT_PUBLIC_SANITY_PROJECT_ID não estiver configurado,
// retorna null e as páginas devem mostrar fallback "blog em construção".
export const sanityClient = sanityConfigured
  ? createClient({
      projectId: SANITY_PROJECT_ID!,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: true,
      perspective: 'published',
    })
  : null;

// Cliente com permissão de escrita, usado só em rotas server-side (nunca
// importar isso em componente de cliente). Precisa de SANITY_API_WRITE_TOKEN
// (token "Editor" gerado em sanity.io/manage → API → Tokens). Usado hoje só
// pela rota de comentários (app/api/comments/route.ts).
const SANITY_WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN;

export const sanityWriteClient =
  sanityConfigured && SANITY_WRITE_TOKEN
    ? createClient({
        projectId: SANITY_PROJECT_ID!,
        dataset: SANITY_DATASET,
        apiVersion: SANITY_API_VERSION,
        useCdn: false,
        token: SANITY_WRITE_TOKEN,
      })
    : null;
