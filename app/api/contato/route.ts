import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, TO_EMAIL } from '@/lib/resend';
import { createBrevoContact } from '@/lib/brevo';

interface ContactPayload {
  nome?: string;
  email?: string;
  assunto?: string;
  mensagem?: string;
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
    const data: ContactPayload = await req.json();
    const nome = (data.nome ?? '').trim();
    const email = (data.email ?? '').trim();
    const assunto = (data.assunto ?? '').trim();
    const mensagem = (data.mensagem ?? '').trim();

    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { error: 'Preencha nome, e-mail e mensagem.' },
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
      <h2>Novo contato pelo site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Assunto:</strong> ${escapeHtml(assunto || 'Não informado')}</p>
      <h3>Mensagem:</h3>
      <p>${escapeHtml(mensagem).replace(/\n/g, '<br>')}</p>
    `;

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Site] Contato: ${assunto || 'Outro'} — ${nome}`,
      html,
    });

    if (result.error) {
      console.error('[/api/contato] Resend error:', result.error);
      return NextResponse.json(
        { error: 'Falha ao enviar a mensagem. Tente novamente em alguns minutos.' },
        { status: 500 }
      );
    }

    // Salva contato no Brevo (CRM + email mkt futuro)
    // Não bloqueia o fluxo se falhar — email principal já foi enviado.
    const contatosListId = process.env.BREVO_LIST_CONTATOS_ID;
    await createBrevoContact({
      email,
      attributes: {
        NOME: nome,
        ASSUNTO: assunto || null,
        MENSAGEM: mensagem,
        SOURCE: 'site:/contato',
      },
      listIds: contatosListId ? [Number(contatosListId)] : [],
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[/api/contato] Error:', e);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
