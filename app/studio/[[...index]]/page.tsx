'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

// Studio embedado do Sanity — acesse em /studio
// Requer: NEXT_PUBLIC_SANITY_PROJECT_ID configurado

export const dynamic = 'force-static';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
