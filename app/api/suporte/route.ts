import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, TO_EMAIL } from '@/lib/resend';
import { createBrevoContact } from '@/lib/brevo';

interface SupportPayload {
  nome?: string;
  email?: string;
  tipo?: string;
  descricao?: string;
  versao?: string;
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
    const data: SupportPayload = await req.json();
    const nome = (data.nome ?? '').trim();
    const email = (data.email ?? '').trim();
    const tipo = (data.tipo ?? '').trim();
    const descricao = (data.descricao ?? '').trim();
    const versao = (data.versao ?? '').trim();

    if (!nome || !email || !descricao) {
      return NextResponse.json(
        { error: 'Preencha nome, e-mail e descrição do problema.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido.' },
        { status: 400 }
      );
    }

    const html = `
      <h2>Novo ticket de suporte</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Tipo de problema:</strong> ${escapeHtml(tipo || 'Não informado')}</p>
      <p><strong>Versão do app:</strong> ${escapeHtml(versao || '—')}</p>
      <h3>Descrição:</h3>
      <p>${escapeHtml(descricao).replace(/\n/g, '<br>')}</p>
    `;

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Suporte] ${tipo || 'Ticket'} — ${nome}`,
      html,
    });

    if (result.error) {
      console.error('[/api/suporte] Resend error:', result.error);
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
        subject: 'Suporte registrado — GT Overlander',
        html: `<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body style='margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif'><table width='100%' cellpadding='0' cellspacing='0'><tr><td align='center' style='padding:24px 16px'><table cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:8px;width:100%;max-width:580px'><tr><td style='background:#122e1f;padding:20px 32px;border-radius:8px 8px 0 0'><span style='color:#e06226;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:3px'>GT Overlander</span></td></tr><tr><td style='padding:32px'><h2 style='color:#122e1f;font-size:20px;margin:0 0 16px'>Ticket registrado, ${escapeHtml(nome)}!</h2><p style='color:#555;font-size:15px;line-height:1.6;margin:0 0 16px'>Recebemos seu chamado de suporte. Nossa equipe vai analisar e retornar em breve pelo mesmo e-mail.</p><p style='color:#555;font-size:15px;line-height:1.6;margin:0 0 16px'>Continue explorando o GT Overlander. &#129347;</p></td></tr><tr><td style='padding:16px 32px 24px;border-top:1px solid #eee'><p style='color:#aaa;font-size:11px;margin:0'>GT Overlander &middot; <a href='https://gtoverlander.com.br' style='color:#aaa'>gtoverlander.com.br</a></p></td></tr></table></td></tr></table></body></html>`,
      });
    } catch (confirmErr) {
      console.warn('[/api/suporte] Confirmation email failed:', confirmErr);
    }

    // Salva contato no Brevo (CRM + email mkt futuro)
    // Não bloqueia o fluxo se falhar — email principal já foi enviado.
    const suporteListId = process.env.BREVO_LIST_SUPORTE_ID;
    await createBrevoContact({
      email,
      attributes: {
        NOME: nome,
        TIPO_PROBLEMA: tipo || null,
        DESCRICAO: descricao,
        VERSAO_APP: versao || null,
        SOURCE: 'site:/suporte',
      },
      listIds: suporteListId ? [Number(suporteListId)] : [],
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[/api/suporte] Error:', e);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
