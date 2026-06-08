import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getPageAlternates } from '@/lib/seo';
import { Hero } from '@/components/sections/hero';
import { ComoFunciona } from '@/components/sections/como-funciona';
import { RecursosDisponiveis } from '@/components/sections/recursos-disponiveis';
import { Numeros } from '@/components/sections/numeros';
import { PorqueGt } from '@/components/sections/porque-gt';
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
      <RecursosDisponiveis />
      <Numeros />
      <PorqueGt />
      <BlogTeaser locale={(locale === 'en' || locale === 'es') ? locale : 'pt'} />
      <EmpresasTeaser />
      <CtaFinal />
    </>
  );
}
