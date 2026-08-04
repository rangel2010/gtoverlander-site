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
    pt: 'Preparação & Planejamento',
    en: 'Preparation & Planning',
    es: 'Preparación & Planificación',
  };
  const descs: Record<string, string> = {
    pt: PILLAR_DESCRIPTIONS.preparacao.slice(0, 160),
    en: 'Vehicle prep, documents, gear and route planning: everything you need to sort out before an overland trip.',
    es: 'Preparación del vehículo, documentos, equipo y planificación de rutas: todo lo que necesitas resolver antes de un viaje overland.',
  };
  return {
    title: titles[locale] ?? titles.pt,
    description: descs[locale] ?? descs.pt,
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
