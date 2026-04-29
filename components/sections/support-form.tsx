'use client';

import { useState, FormEvent } from 'react';
import { Button } from '../ui/button';

const inputStyles =
  'w-full bg-gt-bg border border-gt-border focus:border-gt-orange/60 rounded-md px-4 py-3 text-gt-text font-sans text-sm placeholder:text-gt-text-dim focus:outline-none focus:ring-2 focus:ring-gt-orange/30 transition';

const labelStyles = 'block text-sm font-medium text-gt-text mb-2 font-sans';

export function SupportForm() {
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
      const res = await fetch('/api/suporte', {
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
        window.plausible('Form Suporte');
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
          Ticket aberto
        </h3>
        <p className="text-gt-text-muted font-sans mb-5">
          Recebemos sua solicitação. Nossa equipe responde em até 24 horas em
          dias úteis.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-gt-orange text-sm font-medium hover:underline font-sans"
        >
          Abrir outro ticket
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
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
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelStyles}>
            E-mail da conta GT
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
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="tipo" className={labelStyles}>
            Tipo de problema
          </label>
          <select
            id="tipo"
            name="tipo"
            className={inputStyles}
            defaultValue=""
          >
            <option value="" disabled>
              Selecione…
            </option>
            <option value="Login / Acesso">Login / Acesso</option>
            <option value="Pagamento / Assinatura">Pagamento / Assinatura</option>
            <option value="App travando">App travando ou com erro</option>
            <option value="Geração de rota">Geração de rota</option>
            <option value="Waypoints / Mapa">Waypoints / Mapa</option>
            <option value="Sugestão de melhoria">Sugestão de melhoria</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label htmlFor="versao" className={labelStyles}>
            Versão do app (opcional)
          </label>
          <input
            id="versao"
            name="versao"
            type="text"
            className={inputStyles}
            placeholder="Ex: 1.4.2 — Android"
          />
        </div>
      </div>

      <div>
        <label htmlFor="descricao" className={labelStyles}>
          Descreva o problema
        </label>
        <textarea
          id="descricao"
          name="descricao"
          required
          rows={6}
          className={`${inputStyles} resize-y`}
          placeholder="O que aconteceu, o que você esperava, em que tela…"
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
        {status === 'loading' ? 'Enviando…' : 'Abrir ticket de suporte'}
      </Button>
    </form>
  );
}
