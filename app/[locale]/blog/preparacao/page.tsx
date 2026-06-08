import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { PillarPage } from '@/components/sections/pillar-page';
import { PILLAR_DESCRIPTIONS } from '@/lib/sanity/types';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Preparação & Planejamento',
    description: PILLAR_DESCRIPTIONS.preparacao.slice(0, 160),
    alternates: getPageAlternates(locale, '/blog/preparacao'),
  };
}

export const revalidate = 60;

export default function PreparacaoPillarPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const blogLocale = (locale === 'en' || locale === 'es') ? locale : 'pt';
  return <PillarPage pillar="preparacao" locale={blogLocale} />;
}
