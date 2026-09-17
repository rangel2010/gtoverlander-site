import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

/**
 * Paginação das listagens do blog.
 *
 * Links de verdade, renderizados no servidor — nada de botão "carregar mais".
 * O Google precisa conseguir andar pelas páginas sem executar JavaScript pra
 * alcançar os artigos antigos.
 *
 * A página 1 mora no caminho base (/blog, /blog/destinos) e as seguintes em
 * .../pagina/N. Assim as URLs que já estão indexadas não mudam.
 */

function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}/pagina/${page}`;
}

/**
 * Quais números mostrar: primeira, última, a atual e uma vizinha de cada lado.
 * O resto vira reticências — com 14 páginas em um ano, listar tudo não cabe
 * no celular. `null` marca onde entra a reticência.
 */
function pageWindow(current: number, total: number): (number | null)[] {
  const keep = new Set<number>([1, total, current, current - 1, current + 1]);
  const pages = [...keep].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const out: (number | null)[] = [];
  let prev = 0;
  for (const p of pages) {
    if (prev && p - prev > 1) out.push(null);
    out.push(p);
    prev = p;
  }
  return out;
}

export async function Pagination({
  basePath,
  page,
  totalPages,
}: {
  basePath: string;
  page: number;
  totalPages: number;
}) {
  const t = await getTranslations('blogPage.paginacao');

  if (totalPages <= 1) return null;

  const linkBase =
    'inline-flex items-center justify-center h-10 min-w-10 px-3 rounded-md text-sm font-sans ' +
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gt-orange/50';
  const inactive = `${linkBase} text-gt-text-muted hover:text-gt-text hover:bg-gt-card`;
  const active = `${linkBase} bg-gt-orange text-white pointer-events-none`;

  return (
    <nav aria-label={t('navegacao')} className="mt-12 flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-1">
        {page > 1 && (
          <Link href={pageHref(basePath, page - 1)} rel="prev" className={inactive}>
            ← {t('anterior')}
          </Link>
        )}

        {pageWindow(page, totalPages).map((p, i) =>
          p === null ? (
            <span key={`gap-${i}`} className="px-2 text-gt-text-dim font-sans text-sm">
              …
            </span>
          ) : (
            <Link
              key={p}
              href={pageHref(basePath, p)}
              className={p === page ? active : inactive}
              aria-label={t('irParaPagina', { page: p })}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </Link>
          )
        )}

        {page < totalPages && (
          <Link href={pageHref(basePath, page + 1)} rel="next" className={inactive}>
            {t('proxima')} →
          </Link>
        )}
      </div>

      <p className="text-xs text-gt-text-dim font-sans">
        {t('paginaAtual', { page, total: totalPages })}
      </p>
    </nav>
  );
}
