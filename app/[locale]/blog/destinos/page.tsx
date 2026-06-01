import type { Metadata } from 'next';
import { PillarPage } from '@/components/sections/pillar-page';
import { PILLAR_DESCRIPTIONS } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'Destinos & Roteiros',
  description: PILLAR_DESCRIPTIONS.destinos.slice(0, 160),
};

export const revalidate = 60;

export default function DestinosPillarPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const blogLocale = (locale === 'en' || locale === 'es') ? locale : 'pt';
  return <PillarPage pillar="destinos" locale={blogLocale} />;
}
