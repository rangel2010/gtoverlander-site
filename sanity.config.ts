// Sanity Studio config — embedded em /studio do site
// Acesso via https://gtoverlander.com.br/studio (após deploy)

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { schemaTypes } from './sanity/schemas';
import { structure } from './sanity/structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'gt-overlander-cms',
  title: 'GT Overlander CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool({ structure }), visionTool(), unsplashImageAsset()],
  schema: {
    types: schemaTypes,
    // Cada template já preenche o idioma certo ao criar um post
    // dentro da pasta correspondente (Português / English / Español).
    templates: (prev) => [
      ...prev,
      { id: 'post-pt', title: 'Post (Português)', schemaType: 'post', value: { locale: 'pt' } },
      { id: 'post-en', title: 'Post (English)', schemaType: 'post', value: { locale: 'en' } },
      { id: 'post-es', title: 'Post (Español)', schemaType: 'post', value: { locale: 'es' } },
    ],
  },
});
