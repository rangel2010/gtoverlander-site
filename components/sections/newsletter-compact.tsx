'use client';

import { useState } from 'react';

export function NewsletterCompact() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className="text-sm text-gt-text-muted font-sans mt-6">
        ✓ Cadastrado — você vai receber os próximos artigos por e-mail.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        disabled={status === 'loading'}
        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-gt-text placeholder:text-gt-text-dim font-sans focus:outline-none focus:border-gt-orange disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-gt-orange hover:bg-gt-orange/90 text-white font-sans text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'loading' ? 'Cadastrando…' : 'Receber artigos'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-400 font-sans mt-1 sm:mt-0 sm:self-center">Tente novamente.</p>
      )}
    </form>
  );
}
