import type { Metadata } from 'next';
import { PillarPage } from '@/components/sections/pillar-page';
import { PILLAR_DESCRIPTIONS } from '@/lib/sanity/types';

export const metadata: Metadata = {
  title: 'Preparação & Planejamento',
  description: PILLAR_DESCRIPTIONS.preparacao.slice(0, 160),
};

export const revalidate = 60;

export default function PreparacaoPillarPage() {
  return <PillarPage pillar="preparacao" />;
}
