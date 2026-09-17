import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageAlternates } from '@/lib/seo';
import { BlogHub } from '@/components/sections/blog-hub';
import type { BlogLocale } from '@/lib/sanity/types';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const descs: Record<string, string> = {
    pt: 'Destinos, preparação e vida overlander pra quem viaja por terra. Roteiros, dicas e histórias de quem vive na estrada.',
    en: 'Destinations, preparation and overlander life for those who travel overland. Routes, tips and stories from life on the road.',
    es: 'Destinos, preparación y vida overlander para quienes viajan por tierra. Rutas, consejos e historias de la vida en la carretera.',
  };
  return {
    title: 'Blog',
    description: descs[locale] ?? descs.pt,
    alternates: getPageAlternates(locale, '/blog'),
  };
}

export const revalidate = 60;

export default function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const blogLocale: BlogLocale = locale === 'en' || locale === 'es' ? locale : 'pt';
  return <BlogHub locale={blogLocale} page={1} />;
}
