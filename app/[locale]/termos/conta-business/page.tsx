import type { Metadata } from 'next';
import { LegalDocument } from '@/components/legal-document';
import { lerDocumentoLegal, metadataDoDocumentoLegal } from '@/lib/legal';

// Texto, título, língua e indexação saem da ficha em `lib/legal.ts`.
const DOCUMENTO = 'conta-business' as const;

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  return metadataDoDocumentoLegal(DOCUMENTO, locale);
}

export default async function ContaBusinessPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const doc = await lerDocumentoLegal(DOCUMENTO, locale);
  return (
    <LegalDocument
      title={doc.titulo}
      subtitle={doc.subtitulo}
      lastUpdated={doc.atualizadoEm}
      lastUpdatedLabel={doc.rotuloDeAtualizado}
      relatedDocsLabel={doc.rotuloDeRelacionados}
      notice={doc.aviso}
      content={doc.conteudo}
      relatedDocs={doc.relacionados}
    />
  );
}
