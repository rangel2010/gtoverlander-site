'use client';

import { useState } from 'react';
import { Check, Copy, Facebook, MessageCircle, Twitter } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silencioso — em alguns browsers antigos clipboard não funciona
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const buttonClass =
    'flex items-center gap-2 bg-gt-card hover:bg-gt-card-hover border border-gt-border hover:border-gt-border-strong rounded-md px-4 py-2 text-sm text-gt-text font-sans transition-colors';

  return (
    <div className="mt-12 pt-8 border-t border-gt-border">
      <p className="text-xs uppercase tracking-wider text-gt-text-muted mb-4 font-sans">
        Compartilhar
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Compartilhar no WhatsApp"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Compartilhar no X (Twitter)"
        >
          <Twitter size={16} />X
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Compartilhar no Facebook"
        >
          <Facebook size={16} />
          Facebook
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className={buttonClass}
          aria-label="Copiar link"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copiado!' : 'Copiar link'}
        </button>
      </div>
    </div>
  );
}
