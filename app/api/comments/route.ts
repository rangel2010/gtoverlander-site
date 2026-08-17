import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, BRAND_REPLY_EMAIL } from '@/lib/auth';
import { sanityClient, sanityWriteClient } from '@/lib/sanity/client';
import { autoModerate, buildCommentsQuery, type CommentDTO } from '@/lib/comments';

// GET /api/comments?postId=xxx
// Comentários aprovados do post + (se logado) os próprios comentários
// pendentes/rejeitados, pra o autor ver o status em vez do comentário sumir.
export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get('postId');
  if (!postId) {
    return NextResponse.json({ error: 'postId obrigatório' }, { status: 400 });
  }
  if (!sanityClient) {
    return NextResponse.json({ comments: [] });
  }

  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? '';

  const comments = await sanityClient.fetch<CommentDTO[]>(buildCommentsQuery(), {
    postId,
    email,
  });

  return NextResponse.json({ comments });
}

// POST /api/comments
// Cria um comentário como "pending" (ou "rejected" se o filtro automático
// barrar). Exige login Google. Resposta da marca só é aceita se o e-mail da
// sessão bater com BRAND_REPLY_EMAIL.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'É preciso entrar com o Google pra comentar.' },
      { status: 401 }
    );
  }
  if (!sanityWriteClient) {
    return NextResponse.json(
      { error: 'Comentários indisponíveis no momento.' },
      { status: 503 }
    );
  }

  const { postId, body, parentComment } = await req.json();

  if (!postId || typeof body !== 'string' || !body.trim()) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
  }
  if (body.length > 1000) {
    return NextResponse.json({ error: 'Comentário longo demais.' }, { status: 400 });
  }

  const isAuthorReply = Boolean(
    BRAND_REPLY_EMAIL && session.user.email === BRAND_REPLY_EMAIL && parentComment
  );

  const { blocked, reason } = autoModerate(body);

  const doc = {
    _type: 'comment',
    post: { _type: 'reference', _ref: postId },
    authorName: session.user.name ?? 'Anônimo',
    authorImage: session.user.image ?? undefined,
    authorEmail: session.user.email,
    body: body.trim(),
    status: blocked ? 'rejected' : 'pending',
    autoFlagReason: blocked ? reason : undefined,
    isAuthorReply,
    parentComment:
      isAuthorReply && parentComment
        ? { _type: 'reference', _ref: parentComment }
        : undefined,
    createdAt: new Date().toISOString(),
  };

  const created = await sanityWriteClient.create(doc);

  return NextResponse.json({
    ok: true,
    status: doc.status,
    id: created._id,
  });
}
