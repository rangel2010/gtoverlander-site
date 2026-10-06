import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getPageAlternates, jsonLdScriptProps, BASE_URL } from '@/lib/seo';
import { getRotasSite, getFichaRota, capaDaRota, nomeDificuldade, cidade } from '@/lib/rotas';

/**
 * Vitrine de rotas (02/10/2026): www.gtoverlander.com.br/rotas.
 * Mostra só as rotas cadastradas no Studio ("Rota do site"), na ordem de lá.
 * Os números de cada cartão vêm do app.
 */

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const vazia = (await getRotasSite()).length === 0;
  return {
    title: 'Rotas de viagem de carro pela América do Sul',
    description:
      'Roteiros de carro prontos, parada por parada: distância, dias, dificuldade e melhor época. Abra a rota no app GT Overlander e leve no celular.',
    alternates: getPageAlternates(params.locale, '/rotas', { soPt: true }),
    // Fora do Google enquanto não tiver rota, e nas versões en/es (texto em PT).
    ...((params.locale !== 'pt' || vazia) && { robots: { index: false, follow: true } }),
  };
}

export default async function RotasPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const rotas = await getRotasSite();
  const fichas = await Promise.all(rotas.map((r) => getFichaRota(r.appRouteId)));
  const cartoes = rotas
    .map((rota, i) => ({ rota, ficha: fichas[i] }))
    .filter((c): c is { rota: (typeof rotas)[number]; ficha: NonNullable<(typeof fichas)[number]> } => !!c.ficha);

  const listaLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Rotas GT Overlander',
    itemListElement: cartoes.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE_URL}/rotas/${c.rota.slug}`,
      name: c.rota.titulo || c.ficha.titulo,
    })),
  };

  return (
    <>
      {cartoes.length > 0 && <script {...jsonLdScriptProps(listaLd)} />}

      <section className="bg-gt-bg pt-14 md:pt-20 pb-10">
        <div className="container-wide">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange-text mb-4 font-sans">Rotas</p>
          <h1 className="text-4xl md:text-5xl text-gt-text leading-[1.15] md:leading-[1.15] mb-5 max-w-3xl">
            Rotas prontas pra viajar de carro
          </h1>
          <p className="font-sans text-gt-text-muted text-lg max-w-2xl">
            Cada rota foi traçada e testada no app, parada por parada. Veja a distância, os dias e a melhor época, e abra
            no GT Overlander pra levar no celular.
          </p>
        </div>
      </section>

      <section className="bg-gt-bg pb-20">
        <div className="container-wide">
          {cartoes.length === 0 ? (
            <p className="font-sans text-gt-text-muted">As primeiras rotas chegam em breve.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartoes.map(({ rota, ficha }, i) => {
                const capa = capaDaRota(rota, 800, 450);
                const dif = nomeDificuldade(ficha.dificuldade);
                return (
                  <Link
                    key={rota._id}
                    href={`/rotas/${rota.slug}`}
                    className="group bg-gt-card border border-gt-border rounded-lg overflow-hidden flex flex-col hover:border-gt-orange transition-colors"
                  >
                    <div className="relative aspect-[16/9] bg-gt-bg-elevated">
                      {capa.url && (
                        <Image
                          src={capa.url}
                          alt={capa.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 400px"
                          className="object-cover"
                          // As primeiras fotos aparecem logo na tela: carregam na frente (06/10/2026).
                          priority={i < 3}
                        />
                      )}
                    </div>
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      {rota.paises?.length ? (
                        <p className="text-xs uppercase tracking-wider text-gt-orange-text font-sans">{rota.paises.join(' · ')}</p>
                      ) : null}
                      <h2 className="font-sans text-lg font-medium text-gt-text normal-case leading-snug group-hover:text-gt-orange-text">
                        {rota.titulo || ficha.titulo}
                      </h2>
                      <p className="font-sans text-sm text-gt-text-muted">
                        {cidade(ficha.origem.nome)} → {cidade(ficha.destino.nome)}
                      </p>
                      <p className="font-sans text-sm text-gt-text mt-auto pt-2">
                        {ficha.km.toLocaleString('pt-BR')} km
                        {ficha.dias ? ` · ${ficha.dias} dias` : ''}
                        {dif ? ` · ${dif}` : ''}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
