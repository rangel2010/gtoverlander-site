import { NextResponse } from 'next/server';
import { createBrevoContact } from '@/lib/brevo';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'E-mail obrigatório.' }, { status: 400 });
    }

    const trimmed = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 });
    }

    const listId = process.env.BREVO_LIST_NEWSLETTER_ID;

    await createBrevoContact({
      email: trimmed,
      attributes: { SOURCE: 'site:blog/newsletter' },
      listIds: listId ? [Number(listId)] : [],
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[/api/newsletter] Error:', e);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
