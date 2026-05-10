import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { LegalDocument } from '@/components/legal-document';

export const metadata: Metadata = {
  title: 'Anexo I — Termo de Assunção de Risco (Help Overlander)',
  description:
    'Termo específico de assunção de risco para uso da funcionalidade Help Overlander. Aceite obrigatório para ativação da funcionalidade.',
};

export default async function HelpOverlanderPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), 'content/legal/anexo-help-overlander.md'),
    'utf-8'
  );
  return (
    <LegalDocument
      title="Anexo I — Help Overlander"
      subtitle="Termo de Assunção de Risco · Aceite obrigatório para ativação da funcionalidade"
      lastUpdated="10 de maio de 2026"
      content={content}
      relatedDocs={[
        { href: '/termos', label: 'Termos de Uso' },
        { href: '/termos/conta-business', label: 'Anexo II — Termos da Conta Business' },
        { href: '/privacidade', label: 'Política de Privacidade' },
      ]}
    />
  );
}
