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
    pt: 'Destinos & Roteiros',
    en: 'Destinations & Routes',
    es: 'Destinos & Rutas',
  };
  const descs: Record<string, string> = {
    pt: PILLAR_DESCRIPTIONS.destinos.slice(0, 160),
    en: 'Overlanding destinations and routes across South America: guides, itineraries and real travel experience for those exploring overland.',
    es: 'Destinos y rutas overlander por Sudamérica: guías, itinerarios y experiencia real de viaje para quienes exploran por tierra.',
  };
  return {
    title: titles[locale] ?? titles.pt,
    description: descs[locale] ?? descs.pt,
    alternates: getPageAlternates(locale, '/blog/destinos'),
  };
}

export const revalidate = 60;

export default function DestinosPillarPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const blogLocale = (locale === 'en' || locale === 'es') ? locale : 'pt';
  return <PillarPage pillar="destinos" locale={blogLocale} />;
}
