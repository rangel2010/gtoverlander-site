import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';

// robots.txt programático — gerado automaticamente em /robots.txt
// Permite indexação geral, bloqueia /api/ (rotas de servidor) e /studio/ (CMS interno)

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
