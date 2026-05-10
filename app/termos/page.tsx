import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { LegalDocument } from '@/components/legal-document';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description:
    'Termos de Uso do GT Overlander. Condições para utilização da plataforma, regras de conduta, direitos e responsabilidades.',
};

export default async function TermosPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), 'content/legal/termos.md'),
    'utf-8'
  );
  return (
    <LegalDocument
      title="Termos de Uso"
      subtitle="Versão 1.0 — GT Overlander LTDA · CNPJ 59.840.412/0001-82"
      lastUpdated="10 de maio de 2026"
      content={content}
      relatedDocs={[
        { href: '/privacidade', label: 'Política de Privacidade' },
        { href: '/termos/help-overlander', label: 'Anexo I — Termo de Assunção de Risco (Help Overlander)' },
        { href: '/termos/conta-business', label: 'Anexo II — Termos da Conta Business' },
        { href: '/comunidade', label: 'Código de Conduta da Comunidade GT' },
      ]}
    />
  );
}
