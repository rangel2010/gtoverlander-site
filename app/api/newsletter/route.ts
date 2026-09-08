import { NextResponse } from 'next/server';
import { createBrevoContact } from '@/lib/brevo';

export async function POST(req: Request) {
  try {
    const { email, nome, locale } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'E-mail obrigatório.' }, { status: 400 });
    }

    const trimmed = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 });
    }

    const listId = process.env.BREVO_LIST_NEWSLETTER_ID;

    const attributes: Record<string, string> = { SOURCE: 'site:blog/newsletter' };

    // IDIOMA alimenta a segmentação da newsletter no Brevo. O atributo precisa
    // existir lá (texto, nome IDIOMA) — se não existir, a API do Brevo recusa o
    // contato inteiro e a inscrição se perde em silêncio.
    const IDIOMAS_VALIDOS = ['pt', 'en', 'es'];
    attributes.IDIOMA =
      typeof locale === 'string' && IDIOMAS_VALIDOS.includes(locale)
        ? locale
        : 'pt';
    if (nome && typeof nome === 'string' && nome.trim()) {
      attributes.FIRSTNAME = nome.trim();
    }

    await createBrevoContact({
      email: trimmed,
      attributes,
      listIds: listId ? [Number(listId)] : [],
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[/api/newsletter] Error:', e);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
