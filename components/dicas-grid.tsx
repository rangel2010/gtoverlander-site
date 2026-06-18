'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { YouTubeShort } from '@/lib/youtube';

function formatDurationClient(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatDateClient(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

interface Props {
  shorts: YouTubeShort[];
}

export function DicasGrid({ shorts }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeVideo = shorts.find((v) => v.id === activeId) ?? null;

  const closeModal = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId, closeModal]);

  // Trava scroll da pagina quando modal aberto
  useEffect(() => {
    document.body.style.overflow = activeId ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeId]);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {shorts.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActiveId(video.id)}
            className="group bg-gt-card border border-gt-border rounded-lg overflow-hidden hover:border-gt-border-strong transition-colors text-left"
          >
            {/* Thumbnail vertical 9:16 */}
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
              {/* Duração */}
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-sans">
                {formatDurationClient(video.durationSeconds)}
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
                {formatDateClient(video.publishedAt)}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-[240px] bg-gt-bg rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botao fechar */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
              aria-label="Fechar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Iframe 9:16 */}
            <div className="relative aspect-[9/16] bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Titulo + link externo */}
            <div className="p-4 flex items-start justify-between gap-3">
              <p className="text-sm font-sans text-gt-text leading-snug flex-1">
                {activeVideo.title}
              </p>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-gt-orange hover:underline text-xs font-sans flex items-center gap-1"
              >
                YouTube
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
