import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageAlternates } from '@/lib/seo';
import { Hero } from '@/components/sections/hero';
import { ComoFunciona } from '@/components/sections/como-funciona';
import { PilarPlaneje } from '@/components/sections/pilar-planeje';
import { PilarEncontre } from '@/components/sections/pilar-encontre';
import { PilarComunidade } from '@/components/sections/pilar-comunidade';
import { BlogTeaser } from '@/components/sections/blog-teaser';
import { EmpresasTeaser } from '@/components/sections/empresas-teaser';
import { CtaFinal } from '@/components/sections/cta-final';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    alternates: getPageAlternates(locale, '/'),
  };
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ComoFunciona />
      <PilarPlaneje />
      <PilarEncontre />
      <PilarComunidade />
      <BlogTeaser locale={(locale === 'en' || locale === 'es') ? locale : 'pt'} />
      <EmpresasTease