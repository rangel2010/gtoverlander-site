// Helpers de schema.org JSON-LD pra SEO estruturado.
// Cada função retorna um objeto que deve ser injetado como
// <script type="application/ld+json"> em sua respectiva página.

import { urlForImage } from '@/lib/sanity/image';
import type { PostFull, PostListItem } from '@/lib/sanity/types';

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gtoverlander.com.br';

const ORG_NAME = 'GT Overlander';
const ORG_LEGAL_NAME = 'GT Overlander Ltda';
const ORG_LOGO = `${BASE_URL}/images/logo-gt.svg`;
const ORG_CNPJ = '59.840.412/0001-82';

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    url: BASE_URL,
    logo: ORG_LOGO,
    description:
      'Aplicativo de planejamento de rotas para viajantes overlander — IA conversacional, mais de 4 milhões de waypoints próprios em 209 países, CarPlay e Android Auto.',
    sameAs: [
      'https://instagram.com/gtoverlander',
      'https://youtube.com/@gtoverlander',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Londrina',
      addressRegion: 'PR',
      addressCountry: 'BR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'suporte@gtoverlander.com.br',
      contactType: 'customer support',
      availableLanguage: ['Portuguese', 'English', 'Spanish'],
    },
    taxID: ORG_CNPJ,
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG_NAME,
    url: BASE_URL,
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
    },
  };
}

export function softwareApplicationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: ORG_NAME,
    operatingSystem: 'iOS, Android',
    applicationCategory: 'TravelApplication',
    description:
      'App de planejamento de rotas com IA pra viajantes overlander. Disponível em iOS, Android, CarPlay e Android Auto.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
    },
  };
}

export function productPlansLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'GT Overlander — Assinatura',
    description:
      'Planos de assinatura do GT Overlander. Free pra começar, Plus pra quem viaja com frequência, Pro pra quem não para.',
    brand: { '@type': 'Brand', name: ORG_NAME },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free',
        price: '0',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/planos`,
      },
      {
        '@type': 'Offer',
        name: 'Plus mensal',
        price: '14.90',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '14.90',
          priceCurrency: 'BRL',
          billingDuration: 'P1M',
        },
        url: `${BASE_URL}/planos`,
      },
      {
        '@type': 'Offer',
        name: 'Plus anual',
        price: '79.90',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '79.90',
          priceCurrency: 'BRL',
          billingDuration: 'P1Y',
        },
        url: `${BASE_URL}/planos`,
      },
      {
        '@type': 'Offer',
        name: 'Pro mensal',
        price: '19.90',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '19.90',
          priceCurrency: 'BRL',
          billingDuration: 'P1M',
        },
        url: `${BASE_URL}/planos`,
      },
      {
        '@type': 'Offer',
        name: 'Pro anual',
        price: '99.90',
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '99.90',
          priceCurrency: 'BRL',
          billingDuration: 'P1Y',
        },
        url: `${BASE_URL}/planos`,
      },
    ],
  };
}

export function articleLd(post: PostFull) {
  const imageUrl =
    urlForImage(post.coverImage)?.width(1200).height(630).url() ?? null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: 'pt-BR',
    author: {
      '@type': 'Person',
      name: post.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      logo: {
        '@type': 'ImageObject',
        url: ORG_LOGO,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
  };
}

export function blogLd(posts: PostListItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog GT Overlander',
    url: `${BASE_URL}/blog`,
    inLanguage: 'pt-BR',
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
    },
    blogPost: posts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: `${BASE_URL}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      author: { '@type': 'Person', name: p.authorName },
    })),
  };
}

export function faqPageLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.a,
      },
    })),
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${BASE_URL}${it.url}`,
    })),
  };
}

export function aboutPagePersonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Person',
      name: 'Rangel Machado',
      jobTitle: 'Fundador',
      worksFor: {
        '@type': 'Organization',
        name: ORG_NAME,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Londrina',
        addressRegion: 'PR',
        addressCountry: 'BR',
      },
    },
  };
}

/**
 * Helper pra renderizar JSON-LD em uma página.
 * Uso: <JsonLd data={organizationLd()} />
 */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data),
    },
  };
}
