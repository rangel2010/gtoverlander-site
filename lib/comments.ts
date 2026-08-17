// Regras compartilhadas de comentário: tipos, filtro automático anti-spam,
// e as GROQ queries usadas pela rota app/api/comments/route.ts.

export interface CommentDTO {
  _id: string;
  authorName: string;
  authorImage?: string;
  body: string;
  status: 'pending' | 'approved' | 'rejected';
  isAuthorReply: boolean;
  parentComment?: string;
  createdAt: string;
  mine: boolean;
}

// Filtro simples, roda antes de qualquer comentário cair na fila de
// moderação do Rangel. Não substitui a revisão manual, só evita que o óbvio
// (link solto, palavra banida) precise passar por olho humano.
const BLOCKED_WORDS = [
  'viagra',
  'cassino online',
  'aposta online',
  'bet365',
  'emprestimo facil',
  'ganhe dinheiro',
  'renda extra garantida',
];

const URL_PATTERN = /(https?:\/\/|www\.)\S+/i;

export function autoModerate(body: string): { blocked: boolean; reason?: string } {
  const normalized = body.toLowerCase();

  if (URL_PATTERN.test(body)) {
    return { blocked: true, reason: 'Contém link' };
  }

  const hit = BLOCKED_WORDS.find((w) => normalized.includes(w));
  if (hit) {
    return { blocked: true, reason: `Palavra bloqueada: "${hit}"` };
  }

  if (body.trim().length < 3) {
    return { blocked: true, reason: 'Comentário vazio ou curto demais' };
  }

  return { blocked: false };
}

// Comentários visíveis pro público (aprovados) + os próprios comentários
// pendentes/rejeitados do usuário logado (se houver e-mail), pra ele ver
// "em análise" em vez de o comentário simplesmente sumir.
export function buildCommentsQuery() {
  return `*[_type == "comment" && post._ref == $postId && (
      status == "approved" ||
      ($email != "" && authorEmail == $email)
    )] | order(createdAt asc) {
      _id,
      authorName,
      authorImage,
      body,
      status,
      isAuthorReply,
      "parentComment": parentComment._ref,
      createdAt,
      "mine": authorEmail == $email
    }`;
}

// Versão só de aprovados, sem sessão — usada no server component da página
// do post (app/[locale]/blog/[slug]/page.tsx) pra renderizar os comentários
// já no HTML inicial. Isso é o que faz o conteúdo de fato ser indexável pelo
// Google, em vez de só aparecer depois de carregar JavaScript no navegador.
export const APPROVED_COMMENTS_QUERY = `*[_type == "comment" && post._ref == $postId && status == "approved"] | order(createdAt asc) {
  _id,
  authorName,
  authorImage,
  body,
  status,
  isAuthorReply,
  "parentComment": parentComment._ref,
  createdAt,
  "mine": false
}`;
