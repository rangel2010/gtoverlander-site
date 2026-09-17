import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getPageAlternates } from '@/lib/seo';
import { BlogHub } from '@/components/sections/blog-hub';
import type { BlogLocale } from '@/lib/sanity/types';

/**
 * Páginas 2, 3, 4... da listagem geral. A página 1 mora em /blog — as URLs que
 * já estão indexadas não mudam.
 *
 * Ficam indexáveis, cada uma com canonical pra si mesma: é o que o Google
 * recomenda pra paginação, e é como os artigos antigos continuam alcançáveis
 * por link. O que nunca pode acontecer é /blog/pagina/1 existir em paralelo
 * com /blog mostrando o mesmo conteúdo — daí o redirect permanente abaixo.
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
    pt: `Blog — página ${n}`,
    en: `Blog — page ${n}`,
    es: `Blog — página ${n}`,
  };
  const descs: Record<string, string> = {
    pt: `Página ${n} dos artigos do blog do GT Overlander: destinos, preparação e vida overlander.`,
    en: `Page ${n} of the GT Overlander blog: destinations, preparation and overlander life.`,
    es: `Página ${n} del blog de GT Overlander: destinos, preparación y vida overlander.`,
  };

  return {
    title: titles[locale] ?? titles.pt,
    description: descs[locale] ?? descs.pt,
    alternates: getPageAlternates(locale, `/blog/pagina/${n}`),
  };
}

export const revalidate = 60;

export default function BlogPaginaPage({
  params: { locale, page },
}: {
  params: { locale: string; page: string };
}) {
  setRequestLocale(locale);

  const n = parsePage(page);
  // n === 1 não chega aqui: o next.config redireciona /blog/pagina/1 pra /blog
  // antes do render. Se chegar, 404 é melhor que servir a mesma listagem em
  // dois endereços.
  if (!n || n === 1) notFound();

  const blogLocale: BlogLocale = locale === 'en' || locale === 'es' ? locale : 'pt';
  return <BlogHub locale={blogLocale} page={n} />;
}
