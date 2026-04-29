'use client';

import { useState, FormEvent } from 'react';
import { Button } from '../ui/button';

const inputStyles =
  'w-full bg-gt-bg border border-gt-border focus:border-gt-orange/60 rounded-md px-4 py-3 text-gt-text font-sans text-sm placeholder:text-gt-text-dim focus:outline-none focus:ring-2 focus:ring-gt-orange/30 transition';

const labelStyles = 'block text-sm font-medium text-gt-text mb-2 font-sans';

export function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(err.error || 'Erro ao enviar. Tente novamente.');
        setStatus('error');
        return;
      }

      setStatus('success');
      form.reset();

      // Plausible: dispara evento de conversão
      if (typeof window !== 'undefined' && window.plausible) {
        window.plausible('Form Contato');
      }
    } catch {
      setErrorMsg('Erro de conexão. Verifique sua internet.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-gt-card border border-gt-orange/40 rounded-lg p-8 text-center">
        <h3 className="font-sans text-xl font-medium text-gt-text mb-3 normal-case">
          Mensagem enviada
        </h3>
        <p className="text-gt-text-muted font-sans mb-5">
          Recebemos sua mensagem. Nossa equipe responde em breve em horário
          comercial.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-gt-orange text-sm font-medium hover:underline font-sans"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="nome" className={labelStyles}>
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          autoComplete="name"
          className={inputStyles}
          placeholder="Seu nome completo"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelStyles}>
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputStyles}
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label htmlFor="assunto" className={labelStyles}>
          Assunto
        </label>
        <select
          id="assunto"
          name="assunto"
          className={inputStyles}
          defaultValue=""
        >
          <option value="" disabled>
            Selecione…
          </option>
          <option value="Suporte">Suporte com o app</option>
          <option value="Empresas">Conta Business / Empresas</option>
          <option value="Imprensa">Imprensa / Mídia</option>
          <option value="Parcerias">Parcerias</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensagem" className={labelStyles}>
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          rows={6}
          className={`${inputStyles} resize-y`}
          placeholder="Conte o que precisa…"
        />
      </div>

      {status === 'error' && errorMsg && (
        <p className="text-sm text-gt-orange font-sans">{errorMsg}</p>
      )}

      <Button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto"
      >
        {status === 'loading' ? 'Enviando…' : 'Enviar mensagem'}
      </Button>
    </form>
  );
}
