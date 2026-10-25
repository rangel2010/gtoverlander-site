import { sanityClient } from './client';
import type { BlogLocale } from './types';

/**
 * Endereço de artigo que quase existe (25/10/2026).
 *
 * O Search Console listava dezenas de /blog/<slug> que davam 404 com o artigo
 * no ar: slug antigo de antes de uma renomeação (dormir-posto-gasolina →
 * dormir-posto-de-gasolina) e slug com erro de digitação que um robô ou link
 * externo copiou (paraguai-de-carro-fronteira-e-routeiro-ate-assuncao).
 * Nenhum link do próprio blog aponta pra eles (conferido nos 243 posts).
 *
 * Em vez de uma lista de redirecionamentos escrita à mão, que nunca fica
 * completa, o 404 do blog procura o artigo mais parecido no mesmo idioma e
 * redireciona (301) só quando a semelhança é alta E claramente maior que a do
 * segundo colocado. Na dúvida, continua 404. Calibrado com os 40 endereços
 * quebrados reais: 33 acertos, 7 ficam 404 de propósito, nenhum erro.
 */
const MINIMO = 0.72;
const FOLGA = 0.08;

function levenshtein(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, k) => k);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let k = 1; k <= b.length; k++) {
      cur[k] = Math.min(prev[k] + 1, cur[k - 1] + 1, prev[k - 1] + (a[i - 1] === b[k - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

function semelhanca(pedido: string, real: string): number {
  const porLetra = 1 - levenshtein(pedido, real) / Math.max(pedido.length, real.length);
  const a = new Set(pedido.split(/[-_]/).filter(Boolean));
  const b = new Set(real.split('-'));
  const comuns = Array.from(a).filter((p) => b.has(p)).length;
  const uniao = new Set(Array.from(a).concat(Array.from(b))).size;
  const porPalavra = (comuns / a.size + comuns / uniao) / 2;
  return Math.max(porLetra, porPalavra);
}

export async function slugParecido(pedido: string, locale: BlogLocale): Promise<string | null> {
  if (!sanityClient) return null;
  const alvo = decodeURIComponent(pedido).toLowerCase();
  if (alvo.length < 8 || alvo.length > 160) return null;
  let slugs: string[] = [];
  try {
    slugs = await sanityClient.fetch<string[]>(
      `*[_type == "post" && defined(slug.current) && publishedAt <= now()
        && (locale == $locale || (!defined(locale) && $locale == "pt"))].slug.current`,
      { locale },
      { next: { revalidate: 3600 } }
    );
  } catch (e) {
    console.error('[sanity] slugParecido error:', e);
    return null;
  }
  let melhor = { slug: '', nota: 0 };
  let segunda = 0;
  for (const s of slugs) {
    if (s === alvo) return null;
    const nota = semelhanca(alvo, s);
    if (nota > melhor.nota) {
      segunda = melhor.nota;
      melhor = { slug: s, nota };
    } else if (nota > segunda) {
      segunda = nota;
    }
  }
  return melhor.nota >= MINIMO && melhor.nota - segunda >= FOLGA ? melhor.slug : null;
}
