import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { promises as fs } from 'fs';
import path from 'path';
import { LegalDocument } from '@/components/legal-document';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: 'Política de Privacidade',
    description:
    'Política de Privacidade do GT Overlander em conformidade com a LGPD. Como coletamos, usamos, compartilhamos e protegemos seus dados pessoais.',
    alternates: getPageAlternates(locale, '/privacidade'),
  };
}

export default async function PrivacidadePage() {
  const content = await fs.readFile(
    path.join(process.cwd(), 'content/legal/privacidade.md'),
    'utf-8'
  );
  return (
    <LegalDocument
      title="Política de Privacidade"
      subtitle="Conformidade com a Lei Geral de Proteção de Dados (LGPD)"
      lastUpdated="10 de maio de 2026"
      content={content}
      relatedDocs={[
        { href: '/termos', label: 'Termos de Uso' },
        { href: '/comunidade', label: 'Código de Conduta da Comunidade GT' },
      ]}
    />
  );
}
