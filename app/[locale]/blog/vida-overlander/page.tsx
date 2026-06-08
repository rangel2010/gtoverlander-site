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
    title: 'Vida Overlander',
    description: PILLAR_DESCRIPTIONS['vida-overlander'].slice(0, 160),
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
