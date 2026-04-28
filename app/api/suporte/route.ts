import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, TO_EMAIL } from '@/lib/resend';

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

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[/api/suporte] Error:', e);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
