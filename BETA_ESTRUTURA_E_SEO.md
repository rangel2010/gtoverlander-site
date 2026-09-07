# beta.gtoverlander.com.br — estrutura e SEO

**Para a aba que trabalha no monorepo.**
Escrito em 06/09/2026 pela aba da landing. Revisado no mesmo dia com as correções
do `ALINHAMENTO_WEBAPP.md`, resposta da outra aba.

Irmão do `CONTRATO_NUMEROS_API.md` e do `CONTRATO_REGUA_PLANOS_API.md`, na mesma pasta.

> **Vocabulário.** Não existem "dois repositórios de site". Existe **a landing**
> (`gtoverlander.com.br`, repositório próprio) e o **monorepo**, onde vivem o app,
> a API e o webapp — este último é `apps/web`, não um repo separado. Os contratos
> de números e da régua descrevem endpoints de `apps/api`, dentro do monorepo.

> ### ✅ Estado em 06/09/2026: o webapp já saiu da busca
> Toda página carrega `noindex, follow`, o `robots.txt` segue autorizando o
> rastreamento (só bloqueia `/api/`, `/wp-data`, `/og/`, que não são página) e o
> sitemap responde vazio. Religa com `WEBAPP_INDEXAVEL=on` no ambiente, sem build.
> O porquê está em `apps/web/src/lib/indexacao.ts`.
>
> **O motivo foi mais grave que SEO.** O sitemap entregava 5.899 endereços ao
> Google, dos quais **5.001 eram perfis de pessoas** — e a URL de cada perfil é
> montada com o pedaço do e-mail antes do arroba, com o perfil nascendo público
> por padrão. Isso é LGPD, não otimização, e por isso não esperou a lapidação.

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

~~⚠️ A trava tem padrão LIGADO~~ — **corrigido em 06/09**, junto com um pacote
de segurança. O padrão passou de `'on'` para `'off'`, então o risco descrito aqui
(pessoa preenche, tenta pagar, leva erro de gateway) não existe mais. A leitura
que gerou este documento foi feita antes do conserto.

Deixou de ser urgência e virou faxina: a página veio do zip do protótipo, nunca
teve chave do Asaas ligada de verdade, e a cobrança é só pelas lojas. **Remover o
fluxo continua sendo mais limpo que mantê-lo desligado por variável**, e no lugar
fica um caminho pra loja.

⚠️ Registrado: **o Asaas volta lá na frente, e só no B2B da Conta Business.**
Para usuário final, nunca.

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

O `metadataBase` no `layout.tsx` **já existe** — este item do checklist estava
errado e já nasce feito.

O que não existe é o canônico por página: de **68 páginas, uma** tem canônico
próprio. Esse é o item real e segue aberto.

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

Manter e priorizar as entradas dinâmicas — **com uma correção importante na
lista original deste documento.**

Rotas, waypoints, tags e anúncios: sim. **Perfis: só filtrados.** No banco há
9.322 perfis públicos e apenas **5 pessoas com alguma rota pública** — o resto são
contas migradas da v1 que nunca entraram no app novo. Cinco mil páginas vazias não
são cauda longa, são conteúdo fino, que é a categoria que o Google usa pra decidir
que um site inteiro vale pouco.

Quando religar, o perfil entra no sitemap **só se tiver rota, waypoint ou anúncio
público**. Hoje seriam 5 pessoas; cresce sozinho.

**Contexto que evita alarme falso:** existem 766 rotas e 7 são públicas. Rota
nasce privada de propósito, e as 766 vêm da migração da v1. O poço da cauda longa
está quase seco porque o app acabou de chegar à loja — é o esperado, não um
defeito. Decisão do Rangel: deixar crescer naturalmente.

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

⚠️ Sobre o `Caddyfile.azure`: o aviso vale, mas o `CLAUDE.md` do monorepo dizia
`main` — e `main` está velho. O branch de trabalho é **`migracao-sdk`**. O ponto
em si continua: aquele arquivo está escrito pro estado depois da virada, e subir
hoje derruba o site, porque o DNS de `app.` ainda não existe.

**Ficou mais barato:** com o webapp fora do índice desde 06/09, não haverá nada de
`beta.` catalogado pra redirecionar depois. Cada dia escondido é dívida que não se
cria.

---

# Checklist

- [ ] `/sobre`, `/como-funciona`, `/faq` removidas; links internos apontando pra landing
- [ ] Fluxo `subscribeLab` removido (a trava já está em `off`; falta a faxina)
- [ ] `/me/assinatura` em modo leitura, lendo a régua, com caminho pras lojas
- [x] ~~`metadataBase` no `layout.tsx`~~ — já existia
- [ ] Canônico absoluto nas páginas indexáveis (hoje: 1 de 68)
- [ ] Perfis no sitemap apenas se tiverem conteúdo público
- [ ] `noindex, follow` nas páginas da lista 2.3
- [ ] `robots.ts` com os `disallow` da lista 2.4 — e nenhuma página com noindex ali
- [ ] `sitemap.ts` sem as páginas de marketing
- [ ] Estado de `/help` decidido
- [ ] Nenhum `beta.` cravado em código

Quando isso estiver fechado, avisa: a landing religa o botão "Acessar pelo
computador" trocando uma flag.
