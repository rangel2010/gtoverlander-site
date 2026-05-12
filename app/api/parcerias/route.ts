import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, TO_EMAIL } from '@/lib/resend';
import { createBrevoContact } from '@/lib/brevo';

interface PartnershipPayload {
  nome?: string;
  email?: string;
  empresa?: string;
  tipo?: string;
  link?: string;
  audiencia?: string;
  proposta?: string;
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
    const data: PartnershipPayload = await req.json();
    const nome = (data.nome ?? '').trim();
    const email = (data.email ?? '').trim();
    const empresa = (data.empresa ?? '').trim();
    const tipo = (data.tipo ?? '').trim();
    const proposta = (data.proposta ?? '').trim();

    if (!nome || !email || !empresa || !tipo || !proposta) {
      return NextResponse.json(
        { error: 'Preencha nome, e-mail, empresa, tipo de parceria e proposta.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido.' },
        { status: 400 }
      );
    }

    const link = (data.link ?? '').trim();
    const audiencia = (data.audiencia ?? '').trim();

    const html = `
      <h2>Nova proposta de parceria</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Empresa / Canal:</strong> ${escapeHtml(empresa)}</p>
      <p><strong>Tipo:</strong> ${escapeHtml(tipo)}</p>
      <p><strong>Link:</strong> ${
        link
          ? `<a href="${escapeHtml(link)}">${escapeHtml(link)}</a>`
          : '—'
      }</p>
      <p><strong>Audiência / tamanho:</strong> ${escapeHtml(audiencia || '—')}</p>
      <h3>Proposta:</h3>
      <p>${escapeHtml(proposta).replace(/\n/g, '<br>')}</p>
    `;

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Parcerias] ${tipo} — ${empresa}`,
      html,
    });

    if (result.error) {
      console.error('[/api/parcerias] Resend error:', result.error);
      return NextResponse.json(
        { error: 'Falha ao enviar. Tente novamente em alguns minutos.' },
        { status: 500 }
      );
    }

    // Salva contato no Brevo (CRM + email mkt futuro)
    // Não bloqueia o fluxo se falhar — email principal já foi enviado.
    const parceriasListId = process.env.BREVO_LIST_PARCERIAS_ID;
    await createBrevoContact({
      email,
      attributes: {
        NOME: nome,
        EMPRESA: empresa,
        TIPO_PARCERIA: tipo,
        LINK: link || null,
        AUDIENCIA: audiencia || null,
        PROPOSTA: proposta,
        SOURCE: 'site:/parcerias',
      },
      listIds: parceriasListId ? [Number(parceriasListId)] : [],
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[/api/parcerias] Error:', e);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
