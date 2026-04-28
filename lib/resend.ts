// Cliente Resend — envio de e-mail dos forms do site
// Configurado via env vars (.env.local pra dev, painel Vercel pra prod)
//
// IMPORTANTE: pra funcionar em produção, o domínio gtoverlander.com.br precisa
// estar verificado no Resend (https://resend.com/domains). Enquanto não verifica,
// dá pra usar onboarding@resend.dev como FROM (sandbox da Resend pra testes).

import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  console.warn(
    '[Resend] RESEND_API_KEY não está configurada — envios vão falhar.'
  );
}

export const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder');

// FROM: precisa vir de domínio verificado no Resend
export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'GT Overlander <onboarding@resend.dev>';

// TO: pra onde os e-mails dos forms são enviados
export const TO_EMAIL =
  process.env.RESEND_TO_EMAIL ?? 'suporte@gtoverlander.com.br';
