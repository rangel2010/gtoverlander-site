'use client';

import { useState, FormEvent } from 'react';
import { Button } from '../ui/button';

const inputStyles =
  'w-full bg-gt-bg border border-gt-border focus:border-gt-orange/60 rounded-md px-4 py-3 text-gt-text font-sans text-sm placeholder:text-gt-text-dim focus:outline-none focus:ring-2 focus:ring-gt-orange/30 transition';

const labelStyles = 'block text-sm font-medium text-gt-text mb-2 font-sans';

export function BusinessLeadForm() {
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
      const res = await fetch('/api/leads/business', {
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
          Cadastro recebido
        </h3>
        <p className="text-gt-text-muted font-sans mb-5">
          Você está na lista de espera da Conta Business. Quando lançarmos,
          você é dos primeiros a saber.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-gt-orange text-sm font-medium hover:underline font-sans"
        >
          Cadastrar outro estabelecimento
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
          <label htmlFor="telefone" className={labelStyles}>
            Telefone (opcional)
          </label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            autoComplete="tel"
            className={inputStyles}
            placeholder="(00) 00000-0000"
          />
        </div>

        <div>
          <label htmlFor="empresa" className={labelStyles}>
            Nome da empresa
          </label>
          <input
            id="empresa"
            name="empresa"
            type="text"
            required
            className={inputStyles}
            placeholder="Posto Tal, Camping Tal..."
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="tipo" className={labelStyles}>
            Tipo de negócio
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
            <option value="Posto de combustível">Posto de combustível</option>
            <option value="Camping">Camping</option>
            <option value="Pousada / Hotel">Pousada / Hotel</option>
            <option value="Restaurante">Restaurante</option>
            <option value="Oficina mecânica">Oficina mecânica</option>
            <option value="Mercado / Loja">Mercado / Loja</option>
            <option value="Hospital veterinário">Hospital veterinário</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label htmlFor="cidade" className={labelStyles}>
            Cidade / Estado
          </label>
          <input
            id="cidade"
            name="cidade"
            type="text"
            className={inputStyles}
            placeholder="Ex: Bonito / MS"
          />
        </div>
      </div>

      <div>
        <label htmlFor="raio" className={labelStyles}>
          Raio de atuação (opcional)
        </label>
        <input
          id="raio"
          name="raio"
          type="text"
          className={inputStyles}
          placeholder="Ex: 50 km, ou cidade inteira, ou rota X-Y"
        />
      </div>

      <div>
        <label htmlFor="observacoes" className={labelStyles}>
          Algo mais que queira contar (opcional)
        </label>
        <textarea
          id="observacoes"
          name="observacoes"
          rows={4}
          className={`${inputStyles} resize-y`}
          placeholder="Tipo de viajante que atende, diferencial, dúvidas…"
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
        {status === 'loading' ? 'Enviando…' : 'Entrar na lista de espera'}
      </Button>
    </form>
  );
}
