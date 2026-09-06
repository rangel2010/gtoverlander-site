# Identidade visual do GT Overlander

**Extraído do código real do `gtoverlander-site` em 04/09/2026.**
Fonte: `tailwind.config.ts`, `app/globals.css`, `components/ui/button.tsx`.

Para a aba que trabalha no `gtoverlander-app`. Não é uma proposta de design — é o
que já está no ar em gtoverlander.com.br. Se o app seguir isto, os dois produtos
passam a parecer a mesma empresa.

---

## O princípio: duas famílias de cor

Esta é a decisão estrutural que faz o resto funcionar. As cores do GT se dividem
em dois grupos com regras diferentes:

**Cores fixas da marca** não mudam com o tema. Verde, laranja e marrom são os
mesmos no claro e no escuro. É o que garante que o header, o rodapé e os botões
sejam reconhecíveis em qualquer contexto.

**Cores temáticas** mudam entre claro e escuro. Fundo, cartão, borda e texto
existem como variável e assumem valores diferentes por tema.

Consequência prática: **nunca escreva um hex de fundo ou de texto direto no
componente.** Use o token. O único lugar onde hex aparece cru é na definição do
tema.

---

## Cores fixas da marca

| Token | Hex | Onde usa |
|---|---|---|
| `gt-green` | `#122e1f` | Verde âncora. Header e rodapé, sempre, nos dois temas |
| `gt-bg-elevated` | `#163725` | Verde levemente mais claro. Fundo de hero, sempre verde |
| `gt-orange` | `#c04d18` | CTA: fundo de botão primário, bordas de destaque, badges |
| `gt-brown` | `#904e22` | Apoio, uso pontual |
| `gt-cream` | `#f8f5ee` | Legado, poucos lugares |

### ⚠️ O laranja tem duas versões, e confundir as duas quebra acessibilidade

Este é o erro mais fácil de cometer. **`gt-orange` (`#c04d18`) é para FUNDO.
Nunca use como cor de texto sobre fundo claro ou escuro.**

O laranja original da marca era `#e06226`. Ele reprova no WCAG AA como texto nos
dois temas: dá 3,24:1 sobre o creme e 4,14:1 sobre o verde, quando o mínimo é
4,5:1. Por isso existem dois tokens separados:

- **`gt-orange` `#c04d18`** — fundo de botão com texto branco por cima. Dá 4,87:1.
- **`gt-orange-text`** — cor de texto (links, labels, ícones inline). É temático:
  escurece no claro, clareia no escuro. Valores na tabela abaixo.

---

## Tema claro

| Token | Hex | Papel |
|---|---|---|
| `gt-bg` | `#f8f5ee` | Fundo da página (cream GT) |
| `gt-card` | `#ffffff` | Cartão, superfície elevada |
| `gt-card-hover` | `#f4f1e3` | Hover de cartão |
| `gt-border` | `#e0dcce` | Borda sutil |
| `gt-border-strong` | `#c0baa9` | Borda visível |
| `gt-text` | `#122e1f` | Texto principal (verde GT) |
| `gt-text-muted` | `#4a5c52` | Texto secundário |
| `gt-text-dim` | `#6b7a72` | Texto terciário |
| `gt-orange-text` | `#b84916` | Laranja para texto (4,82:1 no cream, 5,25:1 no branco) |

## Tema escuro

**O escuro é o padrão do produto** — `defaultTheme="dark"` no provider. Na
primeira visita a pessoa vê o tema escuro.

| Token | Hex | Papel |
|---|---|---|
| `gt-bg` | `#122e1f` | Fundo da página (verde GT) |
| `gt-card` | `#1a3d29` | Cartão |
| `gt-card-hover` | `#234d33` | Hover de cartão |
| `gt-border` | `#2a4a35` | Borda sutil |
| `gt-border-strong` | `#3a5a44` | Borda visível |
| `gt-text` | `#e8e8e8` | Texto principal (branco suave, não `#ffffff`) |
| `gt-text-muted` | `#a6a6a6` | Texto secundário |
| `gt-text-dim` | `#737373` | Texto terciário |
| `gt-orange-text` | `#ee8a55` | Laranja para texto (5,85:1 no bg, 4,82:1 no card) |

Repare que o texto principal do escuro é `#e8e8e8`, não branco puro. São ~5% menos
brilho, e a diferença aparece em leitura longa.

---

## Regiões sempre escuras

Header, rodapé e heroes recebem a classe `dark` **forçada**, independente do tema
que a pessoa escolheu. Eles são verdes o tempo todo. É o que dá a moldura de marca
em volta do conteúdo.

Isso significa que dentro dessas regiões você usa os tokens do tema escuro
normalmente — eles resolvem para os valores escuros mesmo com o site no claro.

**Armadilha conhecida:** dentro do hero verde, `gt-text-dim` (`#737373`) dá 2,76:1
e reprova. Sobre verde escuro, use `gt-text-muted` (5,37:1) como o tom mais fraco
disponível. Já causou correção em produção.

---

## Tipografia

Duas famílias, carregadas via `next/font/google`.

**Anton** — display. Condensada, pesada, só existe em weight 400 (mas parece
bold). Usada em `h1`, `h2`, `h3`, sempre em **caixa alta** e com
`letter-spacing: 0.01em`. É o que dá a cara de expedição.

**Inter** — todo o resto. Corpo, navegação, cartões, botões, `h4`–`h6`. Os
subtítulos (`h4`–`h6`) usam weight 500 e `letter-spacing: -0.01em`.

Regra global aplicada no CSS base:

```css
h1, h2, h3 { font-family: Anton; text-transform: uppercase; letter-spacing: 0.01em; font-weight: 400; }
h4, h5, h6 { font-family: Inter; font-weight: 500; letter-spacing: -0.01em; }
body       { font-family: Inter; }
```

### Escala que o site realmente usa

Não é uma escala teórica — é a contagem de uso real no código:

| Papel | Classe | Aproximado |
|---|---|---|
| Título de hero | `text-5xl md:text-6xl` | 48 → 60 px |
| Título de seção | `text-3xl md:text-4xl` | 30 → 36 px |
| Subtítulo de seção | `text-2xl md:text-3xl` | 24 → 30 px |
| Título de cartão | `text-xl` / `text-lg` | 20 / 18 px |
| Corpo destacado | `text-base md:text-lg` | 16 → 18 px |
| Corpo padrão | `text-sm` | 14 px |
| Label, kicker, nota | `text-xs` | 12 px |

Títulos de hero levam `leading-[0.95]` — a Anton em caixa alta pede entrelinha
apertada para não parecer solta.

**Kicker** é um padrão recorrente: texto pequeno em caixa alta acima do título,
com espaçamento de letra largo. `text-xs uppercase tracking-[0.18em]` na cor
`gt-text-muted`.

---

## Botões

Cantos `rounded-md`, peso 500, transição só de cor, e anel de foco em
`gt-orange/50`.

| Variante | Composição |
|---|---|
| `primary` | fundo `gt-orange`, texto branco, hover `gt-orange/90` |
| `secondary` | fundo `gt-card`, texto `gt-text`, borda `gt-border-strong`, hover `gt-card-hover` |
| `outline` | transparente, borda `gt-text/30`, hover `gt-text/10` |
| `ghost` | transparente, hover `gt-card` |

Tamanhos: `sm` = 16/8 px de padding e 14 px de texto · `md` = 24/12 px e 14 px ·
`lg` = 32/16 px e 16 px.

---

## Superfícies e layout

**Cartão padrão:** fundo `gt-card`, borda de 1px em `gt-border`, `rounded-lg`,
padding de 24 a 28 px. Quando é destaque, troca por borda de 2px em `gt-orange`.

**Alternância de seções:** a home alterna `gt-bg` e `gt-card` a cada seção, com
`border-t border-gt-border` entre elas. Dá ritmo vertical sem precisar de sombra.

**Larguras:** conteúdo de leitura usa 720 px (`container-narrow`); seções largas
usam `max-w-7xl` (1280 px). Padding lateral de 24 px nos dois.

**Respiro vertical:** seções usam `py-16 md:py-20`, e as mais importantes
`py-20 md:py-28`.

**Sombra quase não existe.** A separação vem de borda e de contraste de fundo. A
única sombra relevante é a do mockup do app no hero.

---

## Movimento

Um padrão só, chamado `reveal`: o elemento entra com opacidade 0 e 28 px abaixo,
e sobe para a posição em 0,65 s com `ease`. Aplicado por `IntersectionObserver`
quando entra na viewport. Cartões em grade entram escalonados, com 80 ms de atraso
entre eles.

`prefers-reduced-motion: reduce` desliga tudo — sem opacidade, sem deslocamento,
sem transição. Se o app tiver animação de entrada, respeite o mesmo.

---

## Checklist de acessibilidade que já nos mordeu

Três coisas que descobrimos corrigindo o site em produção, e que valem para o app:

1. **Nunca use `gt-orange` como cor de texto.** Só como fundo. Para texto laranja
   existe `gt-orange-text`, que é temático.
2. **Dentro de área verde escura, o tom mais fraco permitido é `gt-text-muted`.**
   O `gt-text-dim` reprova no WCAG AA.
3. **Todo par de cor nova passa por verificação de contraste antes de subir.**
   Mínimo 4,5:1 para texto normal, 3:1 para texto grande.

---

## Onde estão os arquivos originais

- Tokens de cor e fonte: `tailwind.config.ts`
- Variáveis de tema claro/escuro: `app/globals.css`
- Botões: `components/ui/button.tsx`
- Logos vetorizados: `C:\Users\range\Desktop\Identidade Visual\Logos vetorizadas`
