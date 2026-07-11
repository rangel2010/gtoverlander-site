import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, TO_EMAIL } from '@/lib/resend';
import { createBrevoContact } from '@/lib/brevo';

interface BusinessLeadPayload {
  nome?: string;
  email?: string;
  telefone?: string;
  empresa?: string;
  tipo?: string;
  cidade?: string;
  observacoes?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  try {
    const data: BusinessLeadPayload = await req.json();
    const nome = (data.nome ?? '').trim();
    const email = (data.email ?? '').trim();
    const empresa = (data.empresa ?? '').trim();
    const tipo = (data.tipo ?? '').trim();
    const cidade = (data.cidade ?? '').trim();

    if (!nome || !email || !empresa) {
      return NextResponse.json(
        { error: 'Preencha nome, e-mail e nome da empresa.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido.' },
        { status: 400 }
      );
    }

    const telefone = (data.telefone ?? '').trim();
    const observacoes = (data.observacoes ?? '').trim();

    const html = `
      <h2>Novo lead — Conta Business</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefone:</strong> ${escapeHtml(telefone || '—')}</p>
      <p><strong>Empresa:</strong> ${escapeHtml(empresa)}</p>
      <p><strong>Tipo de negócio:</strong> ${escapeHtml(tipo || '—')}</p>
      <p><strong>Cidade:</strong> ${escapeHtml(cidade || '—')}</p>
      ${
        observacoes
          ? `<h3>Observações:</h3><p>${escapeHtml(observacoes).replace(/\n/g, '<br>')}</p>`
          : ''
      }
    `;

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Conta Business] Novo lead: ${empresa} — ${cidade || 'cidade não informada'}`,
      html,
    });

    if (result.error) {
      console.error('[/api/leads/business] Resend error:', result.error);
      return NextResponse.json(
        { error: 'Falha ao enviar. Tente novamente em alguns minutos.' },
        { status: 500 }
      );
    }


    // E-mail de confirmação para quem preencheu o formulário
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Conta Business — GT Overlander',
        html: `<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body style='margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif'><table width='100%' cellpadding='0' cellspacing='0'><tr><td align='center' style='padding:24px 16px'><table cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:8px;width:100%;max-width:580px'><tr><td style='background:#122e1f;padding:20px 32px;border-radius:8px 8px 0 0'><span style='color:#e06226;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:3px'>GT Overlander</span></td></tr><tr><td style='padding:32px'><h2 style='color:#122e1f;font-size:20px;margin:0 0 16px'>Interesse recebido, ${escapeHtml(nome)}!</h2><p style='color:#555;font-size:15px;line-height:1.6;margin:0 0 16px'>Obrigado pelo interesse na Conta Business GT Overlander. Nossa equipe vai analisar as informações de ${escapeHtml(empresa)} e retornar em breve.</p><p style='color:#555;font-size:15px;line-height:1.6;margin:0 0 16px'>Continue explorando o GT Overlander. &#129347;</p></td></tr><tr><td style='padding:16px 32px 24px;border-top:1px solid #eee'><p style='color:#aaa;font-size:11px;margin:0'>GT Overlander &middot; <a href='https://gtoverlander.com.br' style='color:#aaa'>gtoverlander.com.br</a></p></td></tr></table></td></tr></table></body></html>`,
      });
    } catch (confirmErr) {
      console.warn('[/api/leads/business] Confirmation email failed:', confirmErr);
    }

    // Salva contato no Brevo (CRM + segmentação pra campanhas futuras)
    // Não bloqueia o fluxo se falhar — email principal já foi enviado.
    // Atributos têm que bater EXATAMENTE com os nomes cadastrados no Brevo.
    const businessListId = process.env.BREVO_LIST_BUSINESS_ID;
    await createBrevoContact({
      email,
      attributes: {
        NOME: nome,
        EMPRESA: empresa,
        TELEFONE: telefone || null,
        TIPO_DE_NEGOCIO: tipo || null,
        CIDADE: cidade || null,
        OBSERVACOES: observacoes || null,
        SOURCE: 'site:/empresas',
      },
      listIds: businessListId ? [Number(businessListId)] : [],
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[/api/leads/business] Error:', e);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
