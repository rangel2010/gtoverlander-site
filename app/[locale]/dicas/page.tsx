import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getChannelShorts } from '@/lib/youtube';
import { DicasGrid } from '@/components/dicas-grid';
import { jsonLdScriptProps, BASE_URL } from '@/lib/seo';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Dicas em Video',
  description:
    'Shorts com dicas praticas de overlanding - roteiros, preparacao de veiculo, vida na estrada e tudo que voce precisa saber antes de partir.',
  openGraph: {
    title: 'Dicas em Video - GT Overlander',
    description: 'Dicas rapidas de overlanding em video. Roteiros, preparacao, vida na estrada.',
    type: 'website',
  },
};

interface PageProps {
  params: { locale: string };
}

function videosLd(shorts: Awaited<ReturnType<typeof getChannelShorts>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Dicas de Overlanding em Video - GT Overlander',
    url: `${BASE_URL}/dicas`,
    itemListElement: shorts.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'VideoObject',
        name: v.title,
        description: v.description || v.title,
        thumbnailUrl: v.thumbnail,
        uploadDate: v.publishedAt,
        duration: v.duration,
        url: v.url,
        embedUrl: `https://www.youtube.com/embed/${v.id}`,
        publisher: {
          '@type': 'Organization',
          name: 'GT Overlander',
          url: BASE_URL,
        },
      },
    })),
  };
}

export default async function DicasPage({ params: { locale } }: PageProps) {
  if (locale !== 'pt') notFound();

  const shorts = await getChannelShorts(24);

  return (
    <>
      {shorts.length > 0 && (
        <script {...jsonLdScriptProps(videosLd(shorts))} />
      )}

      {/* Hero */}
      <section className="dark bg-gt-bg-elevated py-16 md:py-20">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.18em] text-gt-orange mb-4 font-sans">
            Canal GT Overlander
          </p>
          <h1 className="text-4xl md:text-5xl text-gt-text leading-[1.05] mb-5">
            Dicas em Video
          </h1>
          <p className="text-lg text-gt-text-muted leading-relaxed font-sans max-w-xl">
            Dicas rapidas de overlanding — roteiros, preparacao, vida na estrada.
            Novos videos toda semana.
          </p>
          <a
            href="https://www.youtube.com/@gtoverlander/shorts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm text-gt-orange hover:underline font-sans"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
            </svg>
            Ver no YouTube
          </a>
        </div>
      </section>

      {/* Grid com modal integrado */}
      <section className="bg-gt-bg py-12 md:py-16 border-t border-gt-border">
        <div className="container-wide">
          {shorts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gt-text-muted font-sans">
                Videos em breve. Acompanhe no{' '}
                <a
                  href="https://www.youtube.com/@gtoverlander"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gt-orange hover:underline"
                >
                  YouTube
                </a>
                .
              </p>
            </div>
          ) : (
            <DicasGrid shorts={shorts} />
          )}

          {shorts.length > 0 && (
            <div className="text-center mt-12">
              <a
                href="https://www.youtube.com/@gtoverlander/shorts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gt-text-muted hover:text-gt-orange transition-colors font-sans border border-gt-border rounded-full px-5 py-2.5 hover:border-gt-border-strong"
              >
                Ver todos no YouTube
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.010-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
