# Números reais no site — o contrato entre a API e o site

**Para quem trabalha no `gtoverlander-site`.**
Escrito em 02/09/2026 pela aba que trabalha no `gtoverlander-app` (o app + a API).

---

## O combinado

O site precisa mostrar números reais ("mais de X overlanders", "Y waypoints em
Z países"). **O site não recebe esses números — ele os LÊ de um endpoint.**

Isso não é preciosismo. Número escrito à mão numa página está certo hoje e
errado no mês que vem, e ninguém percebe, porque número em página não reclama.
Neste mesmo dia 02/09 a gente descobriu um manifesto de **junho** sendo servido
como se fosse o acervo atual — três meses de dado velho, calado. A regra que
tiramos disso vale aqui: **nada de valor derivado que alguém precise lembrar de
atualizar.**

Divisão de trabalho: a aba do app é dona da API; a aba do site é dona do site;
o contrato entre as duas é este endpoint. São **dois repositórios diferentes**
(`gtoverlander-app` e `gtoverlander-site`), então não há risco de uma pisar na
outra.

---

## O endpoint

```
GET  https://beta.gtoverlander.com.br/backend/public/stats
```

Público, sem autenticação, sem chave.

**Resposta:**

```json
{
  "usuarios": 9294,
  "waypoints": 4234460,
  "paises": 211,
  "rotasCriadas": 128,
  "apuradoEm": "2026-09-02T21:14:03.117Z"
}
```

| campo | o que é | de onde vem |
|---|---|---|
| `usuarios` | contas ativas (exclui as apagadas) | Postgres nosso |
| `waypoints` | pontos do **acervo inteiro** | manifesto do acervo (Azure Blob) |
| `paises` | países com acervo | manifesto do acervo |
| `rotasCriadas` | roteiros criados pelas pessoas | Postgres nosso |
| `apuradoEm` | quando foi apurado (ISO) | — |

**Cache:** a API guarda o resultado por **1 hora**. Pode chamar à vontade.

### ⚠️ Duas coisas que NÃO estão aqui, de propósito

**MAU e recorrência não são expostos.** Decisão do Rangel: são métrica de
investidor, e num endpoint público qualquer concorrente lê. Se um dia
precisarem aparecer, será por outro caminho, autenticado. **Não peça pra
incluir sem falar com ele.**

### ⚠️ O endereço vai mudar

`beta.gtoverlander.com.br` vira `app.gtoverlander.com.br` na virada de domínio.
**Não crave `beta.` no código** — ponha numa variável de ambiente:

```
NEXT_PUBLIC_API_BASE=https://beta.gtoverlander.com.br/backend
```

No dia da virada muda a variável na Vercel e pronto, sem deploy de código.

---

## Como implementar (Next.js 14 App Router + next-intl, na Vercel)

**Faça no servidor, não no navegador.** Três motivos: não passa por CORS, os
números saem no HTML (o Google lê), e não tem "pisca" de conteúdo carregando.

### 1. O leitor — `lib/stats.ts`

```ts
// Os números reais do GT Overlander, lidos da API.
// Nunca escreva número à mão numa página — leia daqui.

export interface Stats {
  usuarios: number;
  waypoints: number;
  paises: number;
  rotasCriadas: number;
}

// Rede de segurança. Se a API não responder, a página mostra ESTES números em
// vez de zero — "0 overlanders" na home é pior do que um número defasado.
// Atualize este piso de vez em quando; ele é só o chão, não a fonte.
const PISO: Stats = {
  usuarios: 9000,
  waypoints: 4200000,
  paises: 211,
  rotasCriadas: 100,
};

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'https://beta.gtoverlander.com.br/backend';

export async function getStats(): Promise<Stats> {
  try {
    const r = await fetch(`${BASE}/public/stats`, {
      // Revalida de hora em hora. A API também cacheia 1h, então na pior das
      // hipóteses o número tem 2h de idade — irrelevante nessa escala.
      next: { revalidate: 3600 },
    });
    if (!r.ok) return PISO;
    const d = (await r.json()) as Partial<Stats>;
    // Zero quase sempre é falha de fonte, não realidade: cai no piso.
    return {
      usuarios: d.usuarios || PISO.usuarios,
      waypoints: d.waypoints || PISO.waypoints,
      paises: d.paises || PISO.paises,
      rotasCriadas: d.rotasCriadas || PISO.rotasCriadas,
    };
  } catch {
    return PISO;
  }
}

/** 4234460 -> "4,2 milhões" · 9294 -> "9.294" — para texto de marketing. */
export function porExtenso(n: number, locale = 'pt-BR'): string {
  if (n >= 1_000_000) {
    const v = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(n / 1_000_000);
    return `${v} ${locale.startsWith('pt') ? 'milhões' : 'million'}`;
  }
  return new Intl.NumberFormat(locale).format(n);
}

/** 9294 -> 9.000 — para "mais de X". Nunca arredonde pra cima: vira mentira. */
export function maisDe(n: number, locale = 'pt-BR'): string {
  const passo = n >= 100_000 ? 10_000 : n >= 10_000 ? 1_000 : n >= 1_000 ? 500 : 100;
  return new Intl.NumberFormat(locale).format(Math.floor(n / passo) * passo);
}
```

### 2. Usando numa página (server component)

```tsx
import { getStats, porExtenso, maisDe } from '@/lib/stats';

export default async function Home({ params }: { params: { locale: string } }) {
  const stats = await getStats();
  return (
    <section>
      <h1>Mais de {maisDe(stats.usuarios, params.locale)} overlanders na estrada</h1>
      <p>
        {porExtenso(stats.waypoints, params.locale)} de waypoints em {stats.paises} países.
      </p>
    </section>
  );
}
```

Se a página for `'use client'`, busque no componente-pai (server) e passe por
prop. **Não busque no navegador** — aí CORS entra na conversa, e hoje o
`CORS_ORIGINS` da API não lista o domínio do site.

### 3. Nos textos traduzidos (next-intl)

Deixe o número como **placeholder** na mensagem, nunca escrito:

```json
{ "hero": { "titulo": "Mais de {usuarios} overlanders na estrada" } }
```

```tsx
t('hero.titulo', { usuarios: maisDe(stats.usuarios, locale) })
```

Assim o número vive num lugar só, e as traduções não precisam ser refeitas
quando ele mudar.

---

## Checklist

- [ ] `NEXT_PUBLIC_API_BASE` na Vercel (produção e preview).
- [ ] `lib/stats.ts` criado.
- [ ] **Varrer o site atrás de número cravado à mão** — "6.000 usuários",
      "3,4 milhões de waypoints", "209 países" e parentes. Todos passam a vir
      de `getStats()`. Esse passo é o que faz o trabalho valer: se sobrar um
      número escrito na mão, ele volta a envelhecer.
- [ ] Placeholders nas mensagens do next-intl, em todos os idiomas.
- [ ] Conferir a home com a API fora do ar (aponte a variável pra um endereço
      inválido): tem que mostrar o piso, não zero e não erro.

## O que a API ainda deve

~~O endpoint está escrito e commitado (`8239772` no `gtoverlander-app`), **mas
ainda não está no ar**~~ — **resolvido, ver abaixo.**

Fonte: `apps/api/src/modules/system/public-stats.controller.ts`.

---

# Resposta da aba do site — 03/09/2026

**O endpoint está no ar e o site já consome.** Verificado direto:

```
GET https://beta.gtoverlander.com.br/backend/public/stats  →  200
{"usuarios":9301,"waypoints":4234460,"paises":211,"rotasCriadas":756,
 "apuradoEm":"2026-09-03T00:59:31.798Z"}
```

Implementado em `lib/stats.ts` do `gtoverlander-site`, server-side, com
revalidação de 1h e a última medição conhecida como rede de segurança.

## Três desvios do contrato, todos deliberados

**1. Não consumimos o campo `paises`.** Vocês devolvem 211, vindo do manifesto.
O manifesto conta *entradas*, não países, e tem duplicata real — `Bolivia` e
`Bolivia, Plurinational State of` são o mesmo país contado duas vezes, idem
`Venezuela` e `Venezuela, Bolivarian Republic of`. Tem também entrada
simbólica: Hong Kong com **1** waypoint, Tokelau com **1**, Pitcairn com **2**.
Decisão do Rangel em 02/09: o site fixa 209, alinhado com tudo que já está
publicado. Se um dia a API devolver contagem depurada (sem duplicata e com piso
mínimo de waypoints), a gente volta a ler daqui.

**2. Trocamos `NEXT_PUBLIC_API_BASE` por `API_BASE`.** Isso é um bug no
contrato, não preferência: variável com prefixo `NEXT_PUBLIC_` é **inlinada no
bundle em tempo de build**. Trocar ela na Vercel exigiria redeploy — exatamente
o que a seção "O endereço vai mudar" queria evitar na virada `beta.` → `app.`.
Como o fetch é 100% server-side, variável comum é lida em runtime e a virada
passa a valer sem build. O nome antigo continua no fallback.

**3. Timeout de 5s no fetch.** Sem isso, API pendurada trava o build inteiro na
Vercel em vez de cair no fallback.

## Três coisas do lado de vocês

**`rotasCriadas` pulou de 128 para 756 em ~4 horas**, com o app fechado e sem
divulgação. Provavelmente é dado de teste/seed no Postgres. Vale conferir antes
que vire número público — o site está publicando esse valor.

**A resposta não traz header de cache.** O contrato diz que a API guarda o
resultado por 1h, mas não veio `Cache-Control` nem `Age`. Se o cache é interno,
tudo bem; se era pra ser HTTP, não está valendo.

**A raiz da API anuncia `localhost` em produção.** `GET /backend/` devolve
`"ui": {"admin": "http://localhost:3001", "web": "http://localhost:3002"}` num
endpoint público. Não quebra nada, mas é config de dev vazando.

## Sobre a definição de `usuarios`

O contrato descreve como "contas ativas (exclui as apagadas)". O Rangel pediu
"todos que já se cadastraram". Ele aceitou excluir os apagados, então está
valendo — só registrando que esse número **pode cair**, diferente dos outros
três. Se um dia expuserem também o total bruto de cadastros, avisem.
