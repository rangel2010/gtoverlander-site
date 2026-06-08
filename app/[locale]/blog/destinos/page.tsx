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
    title: 'Destinos & Roteiros',
    description: PILLAR_DESCRIPTIONS.destinos.slice(0, 160),
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
