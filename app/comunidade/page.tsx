import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { LegalDocument } from '@/components/legal-document';

export const metadata: Metadata = {
  title: 'Código de Conduta da Comunidade',
  description:
    'Código de Conduta da Comunidade GT Overlander. Princípios, comportamentos esperados e regras de convivência entre overlanders.',
};

export default async function ComunidadePage() {
  const content = await fs.readFile(
    path.join(process.cwd(), 'content/legal/comunidade.md'),
    'utf-8'
  );
  return (
    <LegalDocument
      title="Código de Conduta"
      subtitle="Como a Comunidade GT se relaciona, contribui e cuida uns dos outros"
      lastUpdated="10 de maio de 2026"
      content={content}
      relatedDocs={[
        { href: '/termos', label: 'Termos de Uso' },
        { href: '/privacidade', label: 'Política de Privacidade' },
      ]}
    />
  );
}
