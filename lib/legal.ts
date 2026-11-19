// Os documentos legais do site: UMA ficha por documento, e é ela que decide
// qual arquivo se lê, o que vai no cabeçalho, o que o Google pode indexar e o
// que entra no sitemap.
//
// O original é sempre o português (`content/legal/<arquivo>.md`). A tradução
// mora ao lado, em `content/legal/<arquivo>.<lingua>.md`, e só passa a valer
// quando a língua entra em `linguas` da ficha — é isso que troca o texto, tira
// o `noindex`, anuncia o hreflang e põe a página no sitemap, tudo de uma vez.
//
// Língua declarada sem arquivo quebra o BUILD (as páginas são geradas
// estaticamente), e a Vercel mantém a publicação anterior no ar. É de
// propósito: cair calado para o português numa página que se anuncia como
// tradução era exatamente o defeito que este arquivo conserta.
//
// Língua que NÃO está na lista continua como antes: mostra o português, com
// `noindex` e sem hreflang.

import { promises as fs } from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { getPageAlternates } from '@/lib/seo';
import { routing, type Locale } from '@/i18n/routing';

export type DocumentoLegal =
  | 'termos'
  | 'privacidade'
  | 'help-overlander'
  | 'conta-business'
  | 'comunidade';

interface TextosDaPagina {
  /** O título grande da página. */
  titulo: string;
  /** O título da aba e do resultado de busca; também é o rótulo do link. */
  tituloDaAba: string;
  subtitulo: string;
  descricao: string;
}

interface Ficha {
  /** Nome do arquivo em `content/legal/`, sem extensão. */
  arquivo: string;
  /** Caminho da página, sem prefixo de idioma. */
  caminho: string;
  /** Data da última atualização do ORIGINAL (AAAA-MM-DD). */
  atualizadoEm: string;
  relacionados: readonly DocumentoLegal[];
  /** Línguas em que o documento existe de verdade. O português está sempre. */
  linguas: readonly Locale[];
  textos: Record<Locale, TextosDaPagina>;
}

const CNPJ = 'GT Overlander LTDA · CNPJ 59.840.412/0001-82';
const TODAS = ['pt', 'en', 'es'] as const;

export const DOCUMENTOS_LEGAIS: Record<DocumentoLegal, Ficha> = {
  termos: {
    arquivo: 'termos',
    caminho: '/termos',
    atualizadoEm: '2026-09-28',
    relacionados: ['privacidade', 'help-overlander', 'conta-business', 'comunidade'],
    linguas: TODAS,
    textos: {
      pt: {
        titulo: 'Termos de Uso',
        tituloDaAba: 'Termos de Uso',
        subtitulo: `Versão 1.1 — ${CNPJ}`,
        descricao:
          'Termos de Uso do GT Overlander. Condições para utilização da plataforma, regras de conduta, direitos e responsabilidades.',
      },
      es: {
        titulo: 'Términos de Uso',
        tituloDaAba: 'Términos de Uso',
        subtitulo: `Versión 1.1 — ${CNPJ}`,
        descricao:
          'Términos de Uso de GT Overlander. Condiciones para utilizar la plataforma, reglas de conducta, derechos y responsabilidades.',
      },
      en: {
        titulo: 'Terms of Use',
        tituloDaAba: 'Terms of Use',
        subtitulo: `Version 1.1 — ${CNPJ}`,
        descricao:
          'GT Overlander Terms of Use. Conditions for using the platform, rules of conduct, rights and responsibilities.',
      },
    },
  },

  privacidade: {
    arquivo: 'privacidade',
    caminho: '/privacidade',
    atualizadoEm: '2026-09-28',
    relacionados: ['termos', 'comunidade'],
    linguas: TODAS,
    textos: {
      pt: {
        titulo: 'Política de Privacidade',
        tituloDaAba: 'Política de Privacidade',
        subtitulo: 'Conformidade com a Lei Geral de Proteção de Dados (LGPD)',
        descricao:
          'Política de Privacidade do GT Overlander em conformidade com a LGPD. Como coletamos, usamos, compartilhamos e protegemos seus dados pessoais.',
      },
      es: {
        titulo: 'Política de Privacidad',
        tituloDaAba: 'Política de Privacidad',
        subtitulo:
          'Conformidad con la LGPD, la Ley General de Protección de Datos de Brasil',
        descricao:
          'Política de Privacidad de GT Overlander, en conformidad con la LGPD de Brasil. Cómo recopilamos, usamos, compartimos y protegemos tus datos personales.',
      },
      en: {
        titulo: 'Privacy Policy',
        tituloDaAba: 'Privacy Policy',
        subtitulo: 'Compliance with the LGPD, Brazil’s General Data Protection Law',
        descricao:
          'GT Overlander Privacy Policy, in compliance with Brazil’s LGPD. How we collect, use, share and protect your personal data.',
      },
    },
  },

  'help-overlander': {
    arquivo: 'anexo-help-overlander',
    caminho: '/termos/help-overlander',
    atualizadoEm: '2026-05-10',
    relacionados: ['termos', 'conta-business', 'privacidade'],
    linguas: TODAS,
    textos: {
      pt: {
        titulo: 'Anexo I — Help Overlander',
        tituloDaAba: 'Anexo I — Termo de Assunção de Risco (Help Overlander)',
        subtitulo:
          'Termo de Assunção de Risco · Aceite obrigatório para ativação da funcionalidade',
        descricao:
          'Termo específico de assunção de risco para uso da funcionalidade Help Overlander. Aceite obrigatório para ativação da funcionalidade.',
      },
      es: {
        titulo: 'Anexo I — Help Overlander',
        tituloDaAba: 'Anexo I — Término de Asunción de Riesgo (Help Overlander)',
        subtitulo:
          'Término de Asunción de Riesgo · Aceptación obligatoria para activar la funcionalidad',
        descricao:
          'Término específico de asunción de riesgo para el uso de la funcionalidad Help Overlander. Aceptación obligatoria para activar la funcionalidad.',
      },
      en: {
        titulo: 'Addendum I — Help Overlander',
        tituloDaAba: 'Addendum I — Assumption of Risk Agreement (Help Overlander)',
        subtitulo:
          'Assumption of Risk Agreement · Acceptance required to activate the feature',
        descricao:
          'Specific assumption of risk agreement for using the Help Overlander feature. Acceptance is required to activate the feature.',
      },
    },
  },

  'conta-business': {
    arquivo: 'anexo-conta-business',
    caminho: '/termos/conta-business',
    atualizadoEm: '2026-09-28',
    relacionados: ['termos', 'help-overlander', 'privacidade'],
    linguas: TODAS,
    textos: {
      pt: {
        titulo: 'Anexo II — Conta Business',
        tituloDaAba: 'Anexo II — Termos da Conta Business',
        subtitulo: 'Termos específicos para titulares de Conta Business — Versão 2.0',
        descricao:
          'Termos específicos da Conta Business no GT Overlander. Regras para destaque de pontos de interesse, cobrança, propriedade dos dados e responsabilidades.',
      },
      es: {
        titulo: 'Anexo II — Cuenta Business',
        tituloDaAba: 'Anexo II — Términos de la Cuenta Business',
        subtitulo: 'Términos específicos para titulares de Cuenta Business — Versión 2.0',
        descricao:
          'Términos específicos de la Cuenta Business en GT Overlander. Reglas para destacar puntos de interés, cobro, propiedad de los datos y responsabilidades.',
      },
      en: {
        titulo: 'Addendum II — Business Account',
        tituloDaAba: 'Addendum II — Business Account Terms',
        subtitulo: 'Specific terms for Business Account holders — Version 2.0',
        descricao:
          'Specific terms for the Business Account on GT Overlander. Rules for featuring points of interest, billing, data ownership and responsibilities.',
      },
    },
  },

  comunidade: {
    arquivo: 'comunidade',
    caminho: '/comunidade',
    atualizadoEm: '2026-09-28',
    relacionados: ['termos', 'privacidade'],
    linguas: TODAS,
    textos: {
      pt: {
        titulo: 'Código de Conduta',
        tituloDaAba: 'Código de Conduta da Comunidade',
        subtitulo: 'Como a Comunidade GT se relaciona, contribui e cuida uns dos outros',
        descricao:
          'Código de Conduta da Comunidade GT Overlander. Princípios, comportamentos esperados e regras de convivência entre overlanders.',
      },
      es: {
        titulo: 'Código de Conducta',
        tituloDaAba: 'Código de Conducta de la Comunidad',
        subtitulo: 'Cómo la Comunidad GT se relaciona, contribuye y se cuida entre sí',
        descricao:
          'Código de Conducta de la Comunidad GT Overlander. Principios, comportamientos esperados y reglas de convivencia entre overlanders.',
      },
      en: {
        titulo: 'Code of Conduct',
        tituloDaAba: 'Community Code of Conduct',
        subtitulo: 'How the GT Community relates, contributes and looks after one another',
        descricao:
          'GT Overlander Community Code of Conduct. Principles, expected behavior and rules for getting along among overlanders.',
      },
    },
  },
};

/** Os rótulos fixos da moldura, na língua do TEXTO que está sendo mostrado. */
const MOLDURA: Record<
  Locale,
  { atualizadoEm: string; relacionados: string; formatoDeData: string; aviso: string | null }
> = {
  pt: {
    atualizadoEm: 'Última atualização',
    relacionados: 'Documentos relacionados',
    formatoDeData: 'pt-BR',
    aviso: null,
  },
  es: {
    atualizadoEm: 'Última actualización',
    relacionados: 'Documentos relacionados',
    formatoDeData: 'es',
    aviso:
      'Esta es una traducción de cortesía. El documento original está en portugués y, en caso de divergencia entre las versiones, prevalece la versión en portugués.',
  },
  en: {
    atualizadoEm: 'Last updated',
    relacionados: 'Related documents',
    formatoDeData: 'en-US',
    aviso:
      'This is a courtesy translation. The original document is in Portuguese and, in case of any discrepancy between the versions, the Portuguese version prevails.',
  },
};

function ehLingua(valor: string): valor is Locale {
  return (routing.locales as readonly string[]).includes(valor);
}

/**
 * A língua em que o documento vai ser MOSTRADO pra quem pediu `locale`: a
 * própria, se o documento existe nela; senão o português.
 */
export function linguaDoDocumento(doc: DocumentoLegal, locale: string): Locale {
  const ficha = DOCUMENTOS_LEGAIS[doc];
  return ehLingua(locale) && ficha.linguas.includes(locale) ? locale : 'pt';
}

function arquivoDe(doc: DocumentoLegal, lingua: Locale): string {
  const { arquivo } = DOCUMENTOS_LEGAIS[doc];
  const nome = lingua === 'pt' ? `${arquivo}.md` : `${arquivo}.${lingua}.md`;
  return path.join(process.cwd(), 'content', 'legal', nome);
}

function dataPorExtenso(iso: string, formato: string): string {
  // Meio-dia em UTC: a data não escorrega de dia em fuso nenhum.
  return new Intl.DateTimeFormat(formato, { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${iso}T12:00:00Z`),
  );
}

export interface DocumentoPronto {
  lingua: Locale;
  titulo: string;
  subtitulo: string;
  atualizadoEm: string;
  rotuloDeAtualizado: string;
  rotuloDeRelacionados: string;
  aviso: string | null;
  conteudo: string;
  relacionados: { href: string; label: string }[];
}

/** Tudo que a página precisa pra desenhar o documento, já na língua certa. */
export async function lerDocumentoLegal(
  doc: DocumentoLegal,
  locale: string,
): Promise<DocumentoPronto> {
  const ficha = DOCUMENTOS_LEGAIS[doc];
  const lingua = linguaDoDocumento(doc, locale);
  const moldura = MOLDURA[lingua];
  const conteudo = await fs.readFile(arquivoDe(doc, lingua), 'utf-8');
  return {
    lingua,
    titulo: ficha.textos[lingua].titulo,
    subtitulo: ficha.textos[lingua].subtitulo,
    atualizadoEm: dataPorExtenso(ficha.atualizadoEm, moldura.formatoDeData),
    rotuloDeAtualizado: moldura.atualizadoEm,
    rotuloDeRelacionados: moldura.relacionados,
    aviso: moldura.aviso,
    conteudo,
    relacionados: ficha.relacionados.map((outro) => ({
      href: DOCUMENTOS_LEGAIS[outro].caminho,
      // O rótulo acompanha a língua desta página; se o outro documento ainda
      // não existir nela, o link leva ao português dele.
      label: DOCUMENTOS_LEGAIS[outro].textos[lingua].tituloDaAba,
    })),
  };
}

/** O `generateMetadata` de uma página legal. */
export function metadataDoDocumentoLegal(doc: DocumentoLegal, locale: string): Metadata {
  const ficha = DOCUMENTOS_LEGAIS[doc];
  const lingua = linguaDoDocumento(doc, locale);
  const traduzidoEmTudo = routing.locales.every((l) => ficha.linguas.includes(l));
  // `locale` fora do português e documento sem tradução nele: a página mostra
  // o português, então não se anuncia nem se indexa como se fosse tradução.
  const mostraOutraLingua = ehLingua(locale) && lingua !== locale;
  return {
    title: ficha.textos[lingua].tituloDaAba,
    description: ficha.textos[lingua].descricao,
    alternates: getPageAlternates(locale, ficha.caminho, { soPt: !traduzidoEmTudo }),
    ...(mostraOutraLingua && { robots: { index: false, follow: false } }),
  };
}

/** Pro sitemap: cada documento, nas línguas em que existe de verdade. */
export function paginasLegaisDoSitemap(): { caminho: string; lingua: Locale }[] {
  return Object.values(DOCUMENTOS_LEGAIS).flatMap((ficha) =>
    ficha.linguas.map((lingua) => ({ caminho: ficha.caminho, lingua })),
  );
}
