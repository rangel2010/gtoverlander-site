'use client';

import { useState, FormEvent } from 'react';
import { Button } from '../ui/button';

const inputStyles =
  'w-full bg-gt-bg border border-gt-border focus:border-gt-orange/60 rounded-md px-4 py-3 text-gt-text font-sans text-sm placeholder:text-gt-text-dim focus:outline-none focus:ring-2 focus:ring-gt-orange/30 transition';

const labelStyles = 'block text-sm font-medium text-gt-text mb-2 font-sans';

export function PartnershipForm() {
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
      const res = await fetch('/api/parcerias', {
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
    } catch {
      setErrorMsg('Erro de conexão. Verifique sua internet.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-gt-card border border-gt-orange/40 rounded-lg p-8 text-center">
        <h3 className="font-sans text-xl font-medium text-gt-text mb-3 normal-case">
          Proposta recebida
        </h3>
        <p className="text-gt-text-muted font-sans mb-5">
          Vamos analisar com cuidado e responder em até 5 dias úteis. Se for um
          fit, marcamos uma conversa.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-gt-orange text-sm font-medium hover:underline font-sans"
        >
          Enviar outra proposta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nome" className={labelStyles}>
            Seu nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            autoComplete="name"
            className={inputStyles}
            placeholder="Como te chamamos"
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
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="empresa" className={labelStyles}>
            Empresa / Canal
          </label>
          <input
            id="empresa"
            name="empresa"
            type="text"
            required
            className={inputStyles}
            placeholder="Nome do canal, marca ou empresa"
          />
        </div>

        <div>
          <label htmlFor="tipo" className={labelStyles}>
            Tipo de parceria
          </label>
          <select
            id="tipo"
            name="tipo"
            className={inputStyles}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Selecione…
            </option>
            <option value="Criador de conteúdo">Criador de conteúdo</option>
            <option value="Marca ou produto">Marca ou produto</option>
            <option value="Serviço de viagem">Serviço de viagem</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="link" className={labelStyles}>
          Link do canal / site / Instagram
        </label>
        <input
          id="link"
          name="link"
          type="url"
          className={inputStyles}
          placeholder="https://…"
        />
      </div>

      <div>
        <label htmlFor="audiencia" className={labelStyles}>
          Audiência ou tamanho do negócio (opcional)
        </label>
        <input
          id="audiencia"
          name="audiencia"
          type="text"
          className={inputStyles}
          placeholder="Ex: 30k seguidores no IG, ou 5 lojas físicas, ou 200 clientes/mês"
        />
      </div>

      <div>
        <label htmlFor="proposta" className={labelStyles}>
          Sua proposta de parceria
        </label>
        <textarea
          id="proposta"
          name="proposta"
          required
          rows={6}
          className={`${inputStyles} resize-y`}
          placeholder="Conte como você vê a parceria com o GT — o que você faz, por que faz sentido junto, o que você imagina…"
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
        {status === 'loading' ? 'Enviando…' : 'Enviar proposta'}
      </Button>
    </form>
  );
}
