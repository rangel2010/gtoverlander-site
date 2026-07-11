'use client';

import { useState } from 'react';

export function NewsletterBlog() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Tente novamente.');
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setErrorMsg('Erro de conexão. Tente novamente.');
      setStatus('error');
    }
  }

  return (
    <section className="bg-gt-card py-14 md:py-16 border-t border-gt-border">
      <div className="container-wide max-w-2xl text-center">
        {status === 'success' ? (
          <>
            <p className="text-2xl text-gt-text mb-2">Cadastrado!</p>
            <p className="text-gt-text-muted font-sans text-sm">
              Você vai receber os próximos artigos direto no e-mail.
            </p>
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.18em] text-gt-text-muted mb-3 font-sans">
              Newsletter
            </p>
            <h2 className="text-2xl md:text-3xl text-gt-text mb-2">
              Novos artigos no seu e-mail
            </h2>
            <p className="text-gt-text-muted font-sans text-sm mb-8">
              Sem spam. Só quando publicar algo novo.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                disabled={status === 'loading'}
                className="flex-1 max-w-xs bg-gt-bg border border-gt-border rounded-lg px-4 py-3 text-sm text-gt-text placeholder:text-gt-text-dim font-sans focus:outline-none focus:border-gt-orange disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-gt-orange hover:bg-gt-orange/90 text-white font-sans text-sm font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? 'Cadastrando…' : 'Receber novidades'}
              </button>
            </form>

            {status === 'error' && (
              <p className="mt-4 text-sm text-red-400 font-sans">{errorMsg}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
