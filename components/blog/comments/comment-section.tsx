'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import { MessageSquare, LogIn, LogOut, Send } from 'lucide-react';
import type { CommentDTO } from '@/lib/comments';

interface CommentSectionProps {
  postId: string;
  initialComments?: CommentDTO[];
}

const STATUS_LABEL: Record<CommentDTO['status'], string | null> = {
  approved: null,
  pending: 'Em análise',
  rejected: 'Não pôde ser publicado',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function CommentItem({
  comment,
  replies,
  canReply,
  onReply,
}: {
  comment: CommentDTO;
  replies: CommentDTO[];
  canReply: boolean;
  onReply: (parentId: string) => void;
}) {
  const statusLabel = STATUS_LABEL[comment.status];

  return (
    <div className="py-5 border-b border-gt-border last:border-0">
      <div className="flex items-start gap-3">
        {comment.authorImage ? (
          <Image
            src={comment.authorImage}
            alt={comment.authorName}
            width={36}
            height={36}
            className="rounded-full flex-shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gt-card border border-gt-border flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans text-sm font-medium text-gt-text">
              {comment.authorName}
            </span>
            <span className="text-xs text-gt-text-dim font-sans">
              {formatDate(comment.createdAt)}
            </span>
            {statusLabel && (
              <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-gt-card border border-gt-border text-gt-text-muted">
                {statusLabel}
              </span>
            )}
          </div>
          <p className="text-sm text-gt-text font-sans mt-1 leading-relaxed whitespace-pre-wrap">
            {comment.body}
          </p>
          {canReply && !comment.isAuthorReply && comment.status === 'approved' && (
            <button
              type="button"
              onClick={() => onReply(comment._id)}
              className="text-xs text-gt-orange hover:underline font-sans mt-2"
            >
              Responder como GT Overlander
            </button>
          )}
        </div>
      </div>

      {replies.length > 0 && (
        <div className="ml-12 mt-3 space-y-3">
          {replies.map((reply) => (
            <div
              key={reply._id}
              className="flex items-start gap-3 bg-gt-card border-l-2 border-gt-orange rounded-r-md p-3"
            >
              {reply.authorImage ? (
                <Image
                  src={reply.authorImage}
                  alt={reply.authorName}
                  width={28}
                  height={28}
                  className="rounded-full flex-shrink-0"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gt-bg border border-gt-border flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-sans text-sm font-medium text-gt-orange">
                    {reply.authorName}
                  </span>
                  <span className="text-xs text-gt-text-dim font-sans">
                    {formatDate(reply.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gt-text font-sans mt-1 leading-relaxed whitespace-pre-wrap">
                  {reply.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CommentForm({
  postId,
  parentComment,
  onCancelReply,
  onSubmitted,
}: {
  postId: string;
  parentComment: string | null;
  onCancelReply: () => void;
  onSubmitted: () => void;
}) {
  const { data: session } = useSession();
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, body, parentComment }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Não deu pra enviar o comentário agora.');
        return;
      }
      setBody('');
      onCancelReply();
      onSubmitted();
    } catch {
      setError('Não deu pra enviar o comentário agora.');
    } finally {
      setSending(false);
    }
  }

  if (!session) {
    return (
      <button
        type="button"
        onClick={() => signIn('google')}
        className="flex items-center gap-2 bg-gt-card hover:bg-gt-card-hover border border-gt-border hover:border-gt-border-strong rounded-md px-4 py-2 text-sm text-gt-text font-sans transition-colors"
      >
        <LogIn size={16} />
        Entrar com Google pra comentar
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-2">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name ?? ''}
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
        <span className="text-xs text-gt-text-muted font-sans">
          Comentando como {session.user?.name}
        </span>
        <button
          type="button"
          onClick={() => signOut()}
          className="text-xs text-gt-text-dim hover:text-gt-text font-sans flex items-center gap-1 ml-auto"
        >
          <LogOut size={12} />
          Sair
        </button>
      </div>
      {parentComment && (
        <div className="text-xs text-gt-orange font-sans flex items-center justify-between bg-gt-card border border-gt-border rounded-md px-3 py-2">
          Respondendo como GT Overlander
          <button type="button" onClick={onCancelReply} className="underline">
            cancelar
          </button>
        </div>
      )}
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={1000}
        rows={3}
        placeholder="Escreva seu comentário"
        className="w-full bg-gt-bg border border-gt-border rounded-md px-3 py-2 text-sm text-gt-text font-sans resize-none focus:outline-none focus:border-gt-border-strong"
      />
      {error && <p className="text-xs text-red-400 font-sans">{error}</p>}
      <button
        type="submit"
        disabled={sending || !body.trim()}
        className="flex items-center gap-2 bg-gt-orange hover:opacity-90 disabled:opacity-50 rounded-md px-4 py-2 text-sm text-white font-sans transition-opacity"
      >
        <Send size={14} />
        {sending ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}

function CommentSectionInner({ postId, initialComments = [] }: CommentSectionProps) {
  const { data: session, status: sessionStatus } = useSession();
  // Começa com os comentários aprovados que já vieram renderizados no HTML
  // (bom pro Google, e evita "piscar" vazio pro leitor). Depois de saber se
  // tem sessão, refaz a busca incluindo os comentários pendentes do próprio
  // usuário, se houver.
  const [comments, setComments] = useState<CommentDTO[]>(initialComments);
  const [loading, setLoading] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/comments?postId=${encodeURIComponent(postId)}`);
    const data = await res.json();
    setComments(data.comments ?? []);
    setLoading(false);
  }, [postId]);

  useEffect(() => {
    // Só refaz a busca client-side quando a sessão termina de resolver — se
    // não tiver ninguém logado, os initialComments (aprovados) já bastam.
    if (sessionStatus === 'authenticated') {
      load();
    }
  }, [sessionStatus, load]);

  const topLevel = comments.filter((c) => !c.isAuthorReply);
  const repliesByParent = comments.reduce<Record<string, CommentDTO[]>>((acc, c) => {
    if (c.isAuthorReply && c.parentComment) {
      acc[c.parentComment] = [...(acc[c.parentComment] ?? []), c];
    }
    return acc;
  }, {});

  const isBrand = Boolean(session?.user?.isBrand);

  return (
    <section className="mt-16 pt-10 border-t border-gt-border">
      <h2 className="flex items-center gap-2 text-xl text-gt-text mb-4">
        <MessageSquare size={20} className="text-gt-orange" />
        Comentários
      </h2>

      <div className="bg-gt-card border border-gt-border rounded-lg p-4 mb-6">
        <p className="text-sm text-gt-text-muted font-sans leading-relaxed">
          Os artigos deste blog refletem a experiência de quem viajou e escreveu. Sua visão pode
          ser diferente da minha, e é bem-vinda aqui embaixo. Dê sua opinião, mas respeite a
          opinião de quem pensa diferente.
        </p>
        <p className="text-xs text-gt-text-dim font-sans leading-relaxed mt-2">
          Comentar exige login com Google, só pra identificar quem escreveu e evitar spam e bots.
          Usamos seu nome e foto de perfil só pra isso, nada além. Todo comentário passa por
          análise antes de aparecer pra outros leitores.
        </p>
      </div>

      {!loading && topLevel.length === 0 && (
        <p className="text-sm text-gt-text-dim font-sans mb-6">
          Nenhum comentário ainda. Seja o primeiro a comentar.
        </p>
      )}

      <div className="mb-6">
        {topLevel.map((c) => (
          <CommentItem
            key={c._id}
            comment={c}
            replies={repliesByParent[c._id] ?? []}
            canReply={isBrand}
            onReply={setReplyTo}
          />
        ))}
      </div>

      <CommentForm
        postId={postId}
        parentComment={replyTo}
        onCancelReply={() => setReplyTo(null)}
        onSubmitted={load}
      />
    </section>
  );
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
  return (
    <SessionProvider>
      <CommentSectionInner postId={postId} initialComments={initialComments} />
    </SessionProvider>
  );
}
