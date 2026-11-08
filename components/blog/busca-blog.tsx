'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

/**
 * Busca do blog (08/11/2026). Filtra na hora, no próprio navegador, a lista
 * de artigos do idioma: título, descrição e etiquetas. Ignora acento e
 * maiúscula ("pedagio" acha "pedágio"). Várias palavras: o artigo precisa
 * ter todas.
 *
 * Não cria endereço novo nem página nova: com a caixa vazia, o hub do blog
 * aparece igualzinho (children); com algo digitado, ele some e entram os
 * resultados.
 *
 * Cada busca (depois de a pessoa parar de digitar) vai pro GA4 como
 * `busca_blog` com o termo e quantos artigos achou — alimenta o banco de
 * pautas com o que o leitor procura e ainda não temos.
 */

export interface ItemBusca {
  slug: string;
  titulo: string;
  descricao: string;
  tags: string[];
  pilar: string;
  pilarSlug: string;
  data: string;
  imagem?: string;
  imagemAlt?: string;
}

export interface TextosBusca {
  placeholder: string;
  rotulo: string;
  limpar: string;
  resultados: string; // "{n} artigos"
  umResultado: string;
  nenhum: string;
  nenhumDesc: string;
  pilares: { slug: string; nome: string }[];
}

type Gtag = (...args: unknown[]) => void;

function normalizar(s: string) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Texto pronto pra busca por começo de palavra: " pedagios no uruguai ".
// Assim "moto" acha "moto" e "motorhome", mas não "remoto".
function preparar(s: string) {
  return ` ${normalizar(s).replace(/[^a-z0-9]+/g, ' ')} `;
}

export function BuscaBlog({
  itens,
  textos,
  children,
}: {
  itens: ItemBusca[];
  textos: TextosBusca;
  children: ReactNode;
}) {
  const [termo, setTermo] = useState('');
  const ultimoEnviado = useRef('');

  const indice = useMemo(
    () =>
      itens.map((i) => ({
        item: i,
        titulo: preparar(i.titulo),
        resto: preparar(`${i.descricao} ${i.tags.join(' ')}`),
      })),
    [itens],
  );

  const palavras = preparar(termo)
    .split(' ')
    .filter(Boolean)
    .map((p) => ` ${p}`);
  const ativo = palavras.length > 0;

  const achados = useMemo(() => {
    if (!ativo) return [];
    return indice
      .filter((x) => palavras.every((p) => x.titulo.includes(p) || x.resto.includes(p)))
      .map((x) => ({
        item: x.item,
        // quem tem o termo no título sobe
        peso: palavras.filter((p) => x.titulo.includes(p)).length,
      }))
      .sort((a, b) => b.peso - a.peso)
      .map((x) => x.item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice, termo]);

  // Manda pro GA4 quando a pessoa para de digitar (1,5 s), uma vez por termo.
  useEffect(() => {
    const limpo = termo.trim().toLowerCase();
    if (limpo.length < 2) return;
    const id = setTimeout(() => {
      if (limpo === ultimoEnviado.current) return;
      ultimoEnviado.current = limpo;
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      gtag?.('event', 'busca_blog', {
        search_term: limpo.slice(0, 100),
        resultados: achados.length,
        achou: achados.length > 0 ? 'sim' : 'nao',
      });
    }, 1500);
    return () => clearTimeout(id);
  }, [termo, achados.length]);

  return (
    <>
      <section className="bg-gt-bg border-t border-gt-border">
        <div className="container-wide py-6 md:py-8">
          <form role="search" onSubmit={(e) => e.preventDefault()} className="max-w-2xl">
            <label htmlFor="busca-blog" className="sr-only">
              {textos.rotulo}
            </label>
            <div className="relative">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gt-text-dim"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                id="busca-blog"
                type="search"
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                placeholder={textos.placeholder}
                autoComplete="off"
                enterKeyHint="search"
                className="w-full appearance-none [&::-webkit-search-cancel-button]:hidden rounded-lg border border-gt-border bg-gt-card pl-12 pr-24 py-3.5 text-base text-gt-text placeholder:text-gt-text-dim font-sans focus:outline-none focus:border-gt-orange-text"
              />
              {ativo && (
                <button
                  type="button"
                  onClick={() => setTermo('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gt-text-muted hover:text-gt-text font-sans px-2 py-1"
                >
                  {textos.limpar}
                </button>
              )}
            </div>
            {ativo && (
              <p className="mt-3 text-sm text-gt-text-muted font-sans" aria-live="polite">
                {achados.length === 1
                  ? textos.umResultado
                  : textos.resultados.replace('{n}', String(achados.length))}
              </p>
            )}
          </form>
        </div>
      </section>

      {ativo && (
        <section className="bg-gt-bg pb-16 md:pb-20">
          <div className="container-wide">
            {achados.length === 0 ? (
              <div className="max-w-2xl rounded-lg border border-gt-border bg-gt-card p-6 md:p-8">
                <p className="text-lg text-gt-text font-sans font-medium mb-2">{textos.nenhum}</p>
                <p className="text-sm text-gt-text-muted font-sans mb-5">{textos.nenhumDesc}</p>
                <div className="flex flex-wrap gap-3">
                  {textos.pilares.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="rounded-full border border-gt-border px-4 py-2 text-sm text-gt-text font-sans hover:border-gt-orange-text hover:text-gt-orange-text transition-colors"
                    >
                      {p.nome}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achados.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="bg-gt-card rounded-lg overflow-hidden border border-gt-border hover:border-gt-border-strong transition-colors group flex flex-col"
                  >
                    {post.imagem && (
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={post.imagem}
                          alt={post.imagemAlt ?? ''}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-xs uppercase tracking-wider text-gt-orange-text mb-3 font-sans">
                        {post.pilar}
                      </p>
                      <h3 className="font-sans text-lg font-medium text-gt-text mb-3 leading-snug group-hover:text-gt-orange-text transition-colors normal-case flex-1">
                        {post.titulo}
                      </h3>
                      <p className="text-sm text-gt-text-muted leading-relaxed mb-4 font-sans line-clamp-3">
                        {post.descricao}
                      </p>
                      <p className="text-xs text-gt-text-dim font-sans">{post.data}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Com busca ativa o hub fica escondido, mas continua no HTML (o Google vê igual). */}
      <div hidden={ativo}>{children}</div>
    </>
  );
}
