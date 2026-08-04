import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { PillarPage } from '@/components/sections/pillar-page';
import { PILLAR_DESCRIPTIONS } from '@/lib/sanity/types';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const titles: Record<string, string> = {
    pt: 'Vida Overlander',
    en: 'Overlander Life',
    es: 'Vida Overlander',
  };
  const descs: Record<string, string> = {
    pt: PILLAR_DESCRIPTIONS['vida-overlander'].slice(0, 160),
    en: 'Life on the road: camping, routines, budget and the culture of those who live traveling overland.',
    es: 'La vida en la carretera: campamento, rutinas, presupuesto y la cultura de quienes viven viajando por tierra.',
  };
  return {
    title: titles[locale] ?? titles.pt,
    description: descs[locale] ?? descs.pt,
    alternates: getPageAlternates(locale, '/blog/vida-overlander'),
  };
}

export const revalidate = 60;

export default function VidaOverlanderPillarPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const blogLocale = (locale === 'en' || locale === 'es') ? locale : 'pt';
  return <PillarPage pillar="vida-overlander" locale={blogLocale} />;
}
