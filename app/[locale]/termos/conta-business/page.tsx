import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { LegalDocument } from '@/components/legal-document';

export const metadata: Metadata = {
  title: 'Anexo II — Termos da Conta Business',
  description:
    'Termos específicos da Conta Business no GT Overlander. Regras para destaque de pontos de interesse, cobrança, propriedade dos dados e responsabilidades.',
};

export default async function ContaBusinessPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), 'content/legal/anexo-conta-business.md'),
    'utf-8'
  );
  return (
    <LegalDocument
      title="Anexo II — Conta Business"
      subtitle="Termos específicos para titulares de Conta Business (CNPJ ou CPF)"
      lastUpdated="10 de maio de 2026"
      content={content}
      relatedDocs={[
        { href: '/termos', label: 'Termos de Uso' },
        { href: '/termos/help-overlander', label: 'Anexo I — Help Overlander' },
        { href: '/privacidade', label: 'Política de Privacidade' },
      ]}
    />
  );
}
