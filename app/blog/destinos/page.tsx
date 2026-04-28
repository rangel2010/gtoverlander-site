import type { Metadata } from 'next';
import { PillarPage } from '@/components/sections/pillar-page';
import { PILLAR_DESCRIPTIONS } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'Destinos & Roteiros',
  description: PILLAR_DESCRIPTIONS.destinos.slice(0, 160),
};

export const revalidate = 60;

export default function DestinosPillarPage() {
  return <PillarPage pillar="destinos" />;
}
