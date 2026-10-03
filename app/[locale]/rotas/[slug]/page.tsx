import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getPageAlternates, jsonLdScriptProps, breadcrumbLd, BASE_URL } from '@/lib/seo';
import {
  getRotaSite,
  getFichaRota,
  capaDaRota,
  nomeDificuldade,
  nomeEpoca,
  cidade,
  type FichaRota,
  type RotaSite,
} from '@/lib/rotas';
import { MapaRota } from '@/components/rotas/mapa-rota';
import { BotaoBaixar, SelosLojas } from '@/components/rotas/botao-baixar';
import { urlForImage } from '@/lib/sanity/image';

/**
 * Página de rota (02/10/2026): www.gtoverlander.com.br/rotas/<endereço>.
 *
 * Só existe pra rota cadastrada no Studio ("Rota do site"). A ficha, as paradas
 * e o mapa vêm do app; o texto, a capa e o artigo relacionado vêm do Studio.
 * A página do app (beta) continua fora do Google — esta aqui é a que indexa.
 *
 * Só em português: en/es respondem com o mesmo texto e noindex (mesma régua
 * do Shopping), pra quem cai pelo idioma do navegador não ver erro.
 */

export const revalidate = 3600;

// Contadores do app só aparecem quando já dizem alguma coisa — "0 pessoas
// salvaram" afasta mais do que convence.
const MIN_SALVAMENTOS = 10;
const MIN_AVALIACOES = 3;


async function carregar(slug: string): Promise<{ rota: RotaSite; ficha: FichaRota } | null> {
  const rota = await getRotaSite(slug);
  if (!rota) return null;
  const ficha = await getFichaRota(rota.appRouteId);
  if (!ficha) return null;
  return { rota, ficha };
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const dados = await carregar(params.slug);
  if (!dados) return { title: 'Rota não encontrada', robots: { index: false, follow: false } };
  const { rota, ficha } = dados;
  const titulo = rota.titulo || ficha.titulo;
  const descricao = rota.descricaoSeo || ficha.descricao.slice(0, 157) + '…';
  const capa = capaDaRota(rota, 1200, 630);
  return {
    title: titulo.length > 44 ? { absolute: titulo } : titulo,
    description: descricao,
    alternates: getPageAlternates(params.locale, `/rotas/${rota.slug}`, { soPt: true }),
    ...(params.locale !== 'pt' && { robots: { index: false, follow: true } }),
    openGraph: {
      title: titulo,
      description: descricao,
      type: 'article',
      url: `${BASE_URL}/rotas/${rota.slug}`,
      images: capa.url ? [{ url: capa.url, width: 1200, height: 630, alt: capa.alt }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: titulo,
      description: descricao,
      images: capa.url ? [capa.url] : [],
    },
  };
}

const md = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-2xl md:text-3xl text-gt-text mt-12 mb-5">{children}</h2>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-2xl md:text-3xl text-gt-text mt-12 mb-5">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-sans text-xl font-medium text-gt-text mt-8 mb-4 normal-case">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-gt-text leading-relaxed mb-5 font-sans">{children}</p>
  ),
  a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a
      href={href}
      {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-gt-orange-text hover:underline"
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-medium text-gt-text">{children}</strong>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc pl-6 mb-5 text-gt-text font-sans space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal pl-6 mb-5 text-gt-text font-sans space-y-2">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-gt-orange pl-5 my-6 text-gt-text-muted font-sans">
      {children}
    </blockquote>
  ),
};


export default async function RotaPage({ params }: { params: { locale: string; slug: string } }) {
  setRequestLocale(params.locale);
  const dados = await carregar(params.slug);
  if (!dados) notFound();
  const { rota, ficha } = dados;

  const titulo = rota.titulo || ficha.titulo;
  const capa = capaDaRota(rota);
  const dificuldade = nomeDificuldade(ficha.dificuldade);
  const epocas = ficha.epocas.map(nomeEpoca);
  // O site leva pra loja, não pro app web (decisão do Rangel, 03/10): quem vem
  // do Google baixa o app; quem vem das redes usa o link curto /rota/<nome>,
  // que cai direto na rota no app web. Quem já tem o app procura pelo nome.
  const jaTemApp = (
    <>
      Já tem o GT Overlander? Abra o app e procure <strong className="font-medium text-gt-text">“{ficha.titulo}”</strong>{' '}
      em Rotas Públicas.
    </>
  );

  const itens = [
    { rotulo: 'Distância', valor: `${ficha.km.toLocaleString('pt-BR')} km` },
    ficha.dias ? { rotulo: 'Duração', valor: `${ficha.dias} dias` } : null,
    ficha.horasDirigindo ? { rotulo: 'Ao volante', valor: `cerca de ${ficha.horasDirigindo} h` } : null,
    dificuldade ? { rotulo: 'Dificuldade', valor: dificuldade } : null,
    epocas.length ? { rotulo: 'Melhor época', valor: epocas.join(' e ') } : null,
    { rotulo: 'Paradas', valor: String(ficha.paradas.length) },
  ].filter(Boolean) as { rotulo: string; valor: string }[];

  const sequencia = [
    { ...ficha.origem, tipo: 'ponta' as const, papel: 'Partida' },
    ...ficha.paradas.map((p, i) => ({ ...p, tipo: 'parada' as const, n: i + 1, papel: `Parada ${i + 1}` })),
    { ...ficha.destino, tipo: 'ponta' as const, papel: 'Chegada' },
  ];

  const mostraSalvos = ficha.salvamentos >= MIN_SALVAMENTOS;
  const mostraNota = ficha.nota !== null && ficha.avaliacoes >= MIN_AVALIACOES;
  const capaArtigo = rota.artigo ? urlForImage(rota.artigo.coverImage as never)?.width(640).height(360).url() : null;

  const tripLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: titulo,
    description: rota.descricaoSeo || ficha.descricao,
    url: `${BASE_URL}/rotas/${rota.slug}`,
    ...(capa.url && { image: capa.url }),
    provider: { '@type': 'Organization', name: 'GT Overlander', url: BASE_URL },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: sequencia.length,
      itemListElement: sequencia.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Place',
          name: p.nome,
          geo: { '@type': 'GeoCoordinates', latitude: p.lat, longitude: p.lng },
        },
      })),
    },
  };

  return (
    <>
      <script {...jsonLdScriptProps(tripLd)} />
      <script
        {...jsonLdScriptProps(
          breadcrumbLd([
            { name: 'Rotas', url: '/rotas' },
            { name: titulo, url: `/rotas/${rota.slug}` },
          ])
        )}
      />

      <article>
        {/* Topo */}
        <header className="bg-gt-bg pt-14 md:pt-20 pb-10">
          <div className="container-narrow">
            <Link
              href="/rotas"
              className="text-xs uppercase tracking-wider text-gt-orange-text font-sans inline-block mb-5"
            >
              Rotas{rota.paises?.length ? ` · ${rota.paises.join(' · ')}` : ''}
            </Link>
            <h1 className="text-4xl md:text-5xl text-gt-text leading-[1.15] md:leading-[1.15] mb-5">{titulo}</h1>
            <p className="font-sans text-gt-text-muted text-lg mb-2">
              {cidade(ficha.origem.nome)} → {cidade(ficha.destino.nome)}
            </p>
            <p className="font-sans text-gt-text leading-relaxed text-lg">{ficha.descricao}</p>
          </div>
        </header>

        {capa.url && (
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden">
              <Image src={capa.url} alt={capa.alt} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
            </div>
            {capa.credito && <p className="text-xs text-gt-text-muted mt-2 text-right font-sans">{capa.credito}</p>}
          </div>
        )}

        {/* Ficha + botão */}
        <section className="bg-gt-bg py-10">
          <div className="container-narrow">
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-gt-border border border-gt-border rounded-lg overflow-hidden">
              {itens.map((it) => (
                <div key={it.rotulo} className="bg-gt-card px-5 py-4">
                  <dt className="text-xs uppercase tracking-wider text-gt-text-muted font-sans">{it.rotulo}</dt>
                  <dd className="font-display text-2xl text-gt-text uppercase mt-1">{it.valor}</dd>
                </div>
              ))}
            </dl>
            {(mostraSalvos || mostraNota) && (
              <p className="font-sans text-sm text-gt-text-muted mt-3">
                {mostraSalvos && `${ficha.salvamentos.toLocaleString('pt-BR')} viajantes salvaram esta rota`}
                {mostraSalvos && mostraNota && ' · '}
                {mostraNota && `nota ${ficha.nota!.toFixed(1).replace('.', ',')} de 5 (${ficha.avaliacoes} avaliações)`}
              </p>
            )}

            <div className="mt-8 bg-gt-card border border-gt-border rounded-lg p-6 flex flex-col md:flex-row md:items-center gap-5 md:justify-between">
              <div>
                <p className="font-sans font-medium text-gt-text">A rota inteira está pronta no app</p>
                <p className="font-sans text-sm text-gt-text-muted mt-1">
                  Baixe grátis e leve no celular: o mapa, as paradas e os postos e restaurantes do caminho.
                </p>
              </div>
              <BotaoBaixar className="shrink-0" />
            </div>
            <p className="font-sans text-sm text-gt-text-muted mt-3">{jaTemApp}</p>
          </div>
        </section>

        {/* Mapa */}
        <section className="bg-gt-bg pb-10">
          <div className="max-w-5xl mx-auto px-6">
            <MapaRota
              tracado={ficha.tracado}
              pontos={sequencia.map(({ nome, lat, lng, tipo, ...r }) => ({ nome, lat, lng, tipo, n: 'n' in r ? r.n : undefined }))}
            />
          </div>
        </section>

        {/* Texto do Studio */}
        {rota.corpo && (
          <section className="bg-gt-bg pb-6">
            <div className="container-narrow">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
                {rota.corpo}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {/* Paradas em texto: é isto que o Google lê */}
        <section className="bg-gt-bg pb-14">
          <div className="container-narrow">
            <h2 className="text-2xl md:text-3xl text-gt-text mt-6 mb-6">Parada por parada</h2>
            <ol className="relative border-l-2 border-gt-border ml-2">
              {sequencia.map((p) => (
                <li key={`${p.papel}-${p.nome}`} className="pl-6 pb-5 relative">
                  <span
                    className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 ${
                      p.tipo === 'ponta' ? 'bg-gt-green border-gt-green' : 'bg-gt-bg border-gt-orange'
                    }`}
                    aria-hidden
                  />
                  <p className="font-sans text-xs uppercase tracking-wider text-gt-text-muted">
                    {p.papel}
                    {typeof p.km === 'number' && p.tipo === 'parada' ? ` · km ${p.km.toLocaleString('pt-BR')}` : ''}
                    {p.papel === 'Chegada' ? ` · km ${ficha.km.toLocaleString('pt-BR')}` : ''}
                  </p>
                  <p className="font-sans text-gt-text font-medium">{p.nome}</p>
                </li>
              ))}
            </ol>
            <p className="font-sans text-xs text-gt-text-muted mt-2">
              Quilometragem aproximada, medida sobre o traçado da rota no app.
            </p>
          </div>
        </section>

        {/* Artigo relacionado */}
        {rota.artigo && (
          <section className="bg-gt-card border-t border-gt-border py-12">
            <div className="container-narrow">
              <p className="text-xs uppercase tracking-wider text-gt-orange-text font-sans mb-4">Do blog</p>
              <Link
                href={`/blog/${rota.artigo.slug}`}
                className="group grid sm:grid-cols-[220px_1fr] gap-5 items-center bg-gt-bg border border-gt-border rounded-lg overflow-hidden"
              >
                {capaArtigo && (
                  <div className="relative h-44 sm:h-full sm:min-h-[150px]">
                    <Image src={capaArtigo} alt={rota.artigo.coverImageAlt || ''} fill sizes="220px" className="object-cover" />
                  </div>
                )}
                <div className="p-5 sm:pl-0">
                  <p className="font-sans font-medium text-gt-text group-hover:text-gt-orange-text">{rota.artigo.title}</p>
                  {rota.artigo.description && (
                    <p className="font-sans text-sm text-gt-text-muted mt-2">{rota.artigo.description}</p>
                  )}
                  <p className="font-sans text-sm text-gt-orange-text mt-3">Ler a história e as dicas →</p>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Fecho */}
        <section className="dark bg-gt-bg-elevated text-gt-text py-14">
          <div className="container-narrow text-center flex flex-col items-center gap-6">
            <h2 className="text-3xl md:text-4xl leading-[1.25] md:leading-[1.25]">Pronto pra pegar a estrada?</h2>
            <SelosLojas />
            <p className="font-sans text-sm text-gt-text-muted max-w-md">{jaTemApp}</p>
          </div>
        </section>
      </article>
    </>
  );
}
