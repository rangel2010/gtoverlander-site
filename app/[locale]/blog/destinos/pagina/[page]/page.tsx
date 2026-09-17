import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getPageAlternates } from '@/lib/seo';
import { PillarPage } from '@/components/sections/pillar-page';
import type { BlogLocale } from '@/lib/sanity/types';

/**
 * Páginas 2, 3, 4... de /blog/destinos. A página 1 fica no caminho base;
 * .../pagina/1 é redirecionado pra lá no next.config.
 */

/** Só inteiro positivo. "abc", "2.5" e "-1" não são página. */
function parsePage(raw: string): number | null {
  if (!/^[1-9][0-9]*$/.test(raw)) return null;
  return Number(raw);
}

export async function generateMetadata({
  params: { locale, page },
}: {
  params: { locale: string; page: string };
}): Promise<Metadata> {
  const n = parsePage(page);
  if (!n) return {};

  const titles: Record<string, string> = {
    pt: 'Destinos & Roteiros',
    en: 'Destinations & Routes',
    es: 'Destinos & Rutas',
  };
  const sufixo: Record<string, string> = {
    pt: `— página ${n}`,
    en: `— page ${n}`,
    es: `— página ${n}`,
  };
  const base = titles[locale] ?? titles.pt;

  return {
    title: `${base} ${sufixo[locale] ?? sufixo.pt}`,
    alternates: getPageAlternates(locale, `/blog/destinos/pagina/${n}`),
  };
}

export const revalidate = 60;

export default function DestinosPaginaPage({
  params: { locale, page },
}: {
  params: { locale: string; page: string };
}) {
  setRequestLocale(locale);

  const n = parsePage(page);
  // n === 1 não chega aqui: o next.config redireciona antes do render.
  if (!n || n === 1) notFound();

  const blogLocale: BlogLocale = locale === 'en' || locale === 'es' ? locale : 'pt';
  return <PillarPage pillar="destinos" locale={blogLocale} page={n} />;
}
