import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getChannelShorts, formatDuration } from '@/lib/youtube';
import { jsonLdScriptProps, BASE_URL } from '@/lib/seo';

// Revalida a cada hora — sincroniza com o cache da lib YouTube
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Dicas em Vídeo',
  description:
    'Shorts com dicas práticas de overlanding — roteiros, preparação de veículo, vida na estrada e tudo que você precisa saber antes de partir.',
  openGraph: {
    title: 'Dicas em Vídeo — GT Overlander',
    description: 'Dicas rápidas de overlanding em vídeo. Roteiros, preparação, vida na estrada.',
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
    name: 'Dicas de Overlanding em Vídeo — GT Overlander',
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default async function DicasPage({ params: { locale } }: PageProps) {
  // Página exclusiva PT — EN/ES retornam 404
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
            Dicas em Vídeo
          </h1>
          <p className="text-lg text-gt-text-muted leading-relaxed font-sans max-w-xl">
            Dicas rápidas de overlanding — roteiros, preparação, vida na estrada.
            Novos vídeos toda semana.
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

      {/* Grid de shorts */}
      <section className="bg-gt-bg py-12 md:py-16 border-t border-gt-border">
        <div className="container-wide">
          {shorts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gt-text-muted font-sans">
                Vídeos em breve. Acompanhe no{' '}
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {shorts.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gt-card border border-gt-border rounded-lg overflow-hidden hover:border-gt-border-strong transition-colors"
                >
                  {/* Thumbnail vertical (9:16) */}
                  <div className="relative aspect-[9/16] bg-gt-bg-elevated overflow-hidden">
                    {video.thumbnail ? (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="#e06226" opacity="0.4">
                          <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                        </svg>
                      </div>
                    )}
                    {/* Chip de duração */}
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-sans">
                      {formatDuration(video.durationSeconds)}
                    </span>
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <div className="bg-gt-orange rounded-full p-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-sm font-sans text-gt-text leading-snug line-clamp-2 group-hover:text-gt-orange transition-colors">
                      {video.title}
                    </p>
                    <p className="text-xs text-gt-text-dim mt-1.5 font-sans">
                      {formatDate(video.publishedAt)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
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
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
