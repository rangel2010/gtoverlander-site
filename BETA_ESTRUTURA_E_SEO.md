# beta.gtoverlander.com.br — estrutura e SEO

**Para a aba que trabalha no `gtoverlander-app`.**
Escrito em 06/09/2026 pela aba do `gtoverlander-site`, depois de ler o repo do app.

Irmão do `CONTRATO_NUMEROS_API.md` e do `CONTRATO_REGUA_PLANOS_API.md`, na mesma pasta.

---

## O combinado, em uma frase

**O webapp é a ferramenta de planejamento em tela grande, mais o acervo público da
comunidade. Ele não é canal de venda e não é site institucional.**

Planejar rota no celular dá trabalho — o webapp existe pra resolver isso. Quem
chega nele já passou pela landing e já decidiu. Tudo que é convencimento pertence
a `gtoverlander.com.br`; tudo que é cobrança pertence às lojas.

## Decisões que sustentam este documento

- O beta **fica como `beta.`** por pelo menos 90 dias. Não é ambiente de teste
  descartável: é produção.
- **Assinatura acontece só nas lojas.** Checkout web volta no futuro, e apenas
  para B2B da Conta Business, que ainda não está desenhada.
- O link "Acessar pelo computador" na landing está **temporariamente escondido**
  (flag `MOSTRAR_WEBAPP` no `lib/product-config.ts` do site). Ele volta quando a
  reorganização abaixo estiver feita. Isso tirou a pressa, não a necessidade.

---

# Parte 1 — Estrutura

## 1.1 Remover: a ilha de marketing

`/sobre` · `/como-funciona` · `/faq`

São cópias da landing. Fui ver quem linka pra elas dentro do app: **linkam quase
só umas pras outras** — `/como-funciona` aponta pra `/faq` e `/planos`, `/faq`
aponta pra `/planos`, `/sobre` aponta pra `/planos`. Nenhuma parte funcional
depende delas.

Manter as duas versões significa atualizar posicionamento em dois lugares, e uma
delas sempre fica velha. Onde houver link interno, apontar pro equivalente em
`https://gtoverlander.com.br`.

## 1.2 Desativar o checkout web

`apps/web/src/app/planos/actions.ts` tem `subscribeLab` — exige login, escolhe
gateway, redireciona pra `/me/assinatura`.

⚠️ **A trava tem padrão LIGADO:**

```ts
const v = (process.env.GTO_LAB_SUBSCRIPTIONS ?? 'on').toLowerCase().trim();
```

Sem `GTO_LAB_SUBSCRIPTIONS=off` no ambiente de produção, o formulário aparece e
submete. Sem chave do Asaas configurada, o usuário cai em `/planos?erro=gateway`
— ou seja, ele preencheu, tentou pagar e levou erro. Pior do que não existir.

Como a cobrança é só pelas lojas, **remover o fluxo é mais limpo que desligar por
variável.**

## 1.3 Transformar `/me/assinatura`

Deixa de ser gestão de cobrança e vira leitura:

- Qual plano o usuário tem hoje
- O que esse plano entrega — **lido de `packages/waypoints/src/regua-dos-planos.ts`**,
  nunca escrito à mão, mesma régua que a landing consome pela API
- Caminho claro pra gerenciar ou cancelar **na Google Play / App Store**

Quem está no Free e quer subir vai pra loja, não pra formulário.

## 1.4 Manter mínimo

`/privacidade` e `/legal/*` continuam acessíveis por exigência de loja e LGPD, e
o registro de consentimento aponta pra eles. Podem ser página fina.

## 1.5 Conferir

**`/help` está no `sitemap.ts` com prioridade 0,6, mas o Help Overlander foi
desligado** (04/09). Se a feature saiu, as rotas não deveriam existir nem ser
indexadas. No site institucional a página equivalente foi preservada no repo com
a rota devolvendo 404, atrás de uma flag — mesmo padrão serve aqui.

---

# Parte 2 — SEO

Depois da Parte 1 não sobra página do webapp competindo com a landing, e a
configuração fica simples.

## 2.1 O princípio

Dois domínios, dois trabalhos. A landing responde busca comercial ("app para
overlander", "planejar viagem 4x4"). O webapp responde cauda longa gerada por
usuário ("roteiro Foz do Iguaçu Bariloche", "camping em Urubici"). **Eles nunca
devem disputar a mesma consulta.**

## 2.2 Indexar — é o valor de busca do webapp

`/` · `/rotas` · `/rotas/[id]` · `/waypoints` · `/waypoints/[id]` ·
`/overlanders` · `/overlanders/[username]` · `/galeria` · `/tags` · `/explorar` ·
`/explorar/[uf]` · `/leaderboard` · `/desapega` · `/desapega/[id]`

Cada uma declara **canônico próprio absoluto**, saindo de
`NEXT_PUBLIC_SITE_URL` — nunca com `beta.` escrito à mão:

```ts
alternates: { canonical: `${SITE_URL}/rotas/${id}` },
```

Sem isso, parâmetro de UTM e paginação viram URLs duplicadas.

No `layout.tsx`, definir a base uma vez:

```ts
metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://beta.gtoverlander.com.br'),
```

## 2.3 `noindex, follow`

`/buscar` (resultado de busca interna é lixo clássico de índice) ·
`/privacidade` · `/legal/*` · `/business/cadastrar` · `/socorro`

```ts
robots: { index: false, follow: true },
```

O `follow: true` importa: o Google não indexa a página, mas continua seguindo os
links dela pro conteúdo bom.

## 2.4 Bloquear no `robots.ts`

`/me/` · `/api/` · `/og/` · `/wp-data` · `/login` · `/register` ·
`/recuperar-senha` · `/verificar-email`

Manter `allow: '/'` e manter a declaração do sitemap.

## 2.5 A regra que costuma ser feita errado

**Nunca coloque em `disallow` uma página que tem `noindex`.**

`Disallow` bloqueia o *rastreamento*. Mas o Google precisa entrar na página pra
ler a tag `noindex`. Se o rastreamento está bloqueado, ele nunca lê — e pode
listar a URL mesmo assim, sem descrição, só o endereço.

Bloqueio e noindex se anulam. Use um ou outro por página, nunca os dois.

## 2.6 `sitemap.ts`

Remover de `STATIC_PAGES`: `/planos`, `/sobre`, `/como-funciona`, `/faq`,
`/privacidade`. Sitemap só lista o que se quer indexado — anunciar página com
`noindex` confunde o rastreador.

Manter e priorizar as entradas dinâmicas (rotas, waypoints, perfis, tags,
anúncios). São elas que fazem o índice crescer sozinho.

## 2.7 Não criar `hreflang` entre webapp e landing

A landing tem pt/en/es, o webapp é pt-BR, e os conteúdos são diferentes.
Declarar alternância entre eles gera sinal errado.

---

# Parte 3 — Preparar a virada de domínio

Quando `beta.` virar `app.`, tudo que estiver indexado precisa de **301 caminho a
caminho**. Não é opcional: em 90 dias o índice será real.

Pra isso sair barato:

- Toda URL absoluta sai de `NEXT_PUBLIC_SITE_URL`, nunca escrita à mão
- Nenhum `beta.` cravado em código
- No dia: muda a variável, sobe, e configura 301 de `beta.*` pra `app.*` no
  Caddy preservando o caminho
- Manter `beta.` respondendo com o 301 por vários meses

⚠️ Lembrete do próprio `CLAUDE.md` de vocês: o `Caddyfile.azure` da `main` já
está escrito para depois da virada. Subir aquele arquivo hoje derruba o site.

---

# Checklist

- [ ] `/sobre`, `/como-funciona`, `/faq` removidas; links internos apontando pra landing
- [ ] Fluxo `subscribeLab` removido (ou `GTO_LAB_SUBSCRIPTIONS=off` no ambiente)
- [ ] `/me/assinatura` em modo leitura, lendo a régua, com caminho pras lojas
- [ ] `metadataBase` no `layout.tsx`
- [ ] Canônico absoluto nas páginas indexáveis
- [ ] `noindex, follow` nas páginas da lista 2.3
- [ ] `robots.ts` com os `disallow` da lista 2.4 — e nenhuma página com noindex ali
- [ ] `sitemap.ts` sem as páginas de marketing
- [ ] Estado de `/help` decidido
- [ ] Nenhum `beta.` cravado em código

Quando isso estiver fechado, avisa: a landing religa o botão "Acessar pelo
computador" trocando uma flag.
