import { Hero } from '@/components/sections/hero';
import { ComoFunciona } from '@/components/sections/como-funciona';
import { RecursosDisponiveis } from '@/components/sections/recursos-disponiveis';
import { Numeros } from '@/components/sections/numeros';
import { PorqueGt } from '@/components/sections/porque-gt';
import { BlogTeaser } from '@/components/sections/blog-teaser';
import { EmpresasTeaser } from '@/components/sections/empresas-teaser';
import { CtaFinal } from '@/components/sections/cta-final';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ComoFunciona />
      <RecursosDisponiveis />
      <Numeros />
      <PorqueGt />
      <BlogTeaser />
      <EmpresasTeaser />
      <CtaFinal />
    </>
  );
}
