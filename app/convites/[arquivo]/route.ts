import { sanityClient } from '@/lib/sanity/client';

/**
 * Convites individuais em PDF (15/10/2026): /convites/<endereço>.pdf
 * O PDF fica guardado no Studio ("Convite em PDF") e é entregue aqui, no
 * domínio do GT. Sempre com noindex: convite não aparece no Google.
 */
export const dynamic = 'force-dynamic';

const SEM_GOOGLE = 'noindex, nofollow, noarchive';

export async function GET(_req: Request, { params }: { params: { arquivo: string } }) {
  const slug = decodeURIComponent(params.arquivo).replace(/\.pdf$/i, '');
  const naoEncontrado = () =>
    new Response('Convite não encontrado.', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': SEM_GOOGLE },
    });

  if (!sanityClient || !/^[a-z0-9-]{1,80}$/.test(slug)) return naoEncontrado();

  const convite = await sanityClient.fetch<{ url?: string } | null>(
    `*[_type == "convitePdf" && slug.current == $slug && ativo != false][0]{ "url": arquivo.asset->url }`,
    { slug },
    { cache: 'no-store' }
  );
  if (!convite?.url) return naoEncontrado();

  const pdf = await fetch(convite.url, { cache: 'no-store' });
  if (!pdf.ok || !pdf.body) return naoEncontrado();

  return new Response(pdf.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Convite GT Overlander.pdf"',
      'X-Robots-Tag': SEM_GOOGLE,
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
