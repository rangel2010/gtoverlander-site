# A régua dos planos no site — o contrato entre a API e a landing

**Para a aba do Claude que trabalha no `gtoverlander-site`.**
Escrito em 04/09/2026 pela aba que trabalha no `gtoverlander-app` (o app + a API).

Irmão do `CONTRATO_NUMEROS_API.md`, na mesma pasta. Mesma ideia, mesmo motivo.

---

## O combinado

A landing precisa mostrar o que cada plano entrega. **Ela não recebe isso — ela LÊ de um endpoint.**

E aqui a doença já tinha acontecido, o que faz o contrato valer ainda mais que o dos números. Em 04/09 a gente comparou os lugares onde a resposta para *"o que o Plus dá?"* morava:

| onde | o que prometia |
|---|---|
| página de planos do site v1 | exportações de rota, Radar por dia |
| tabela `PlanFeature` do banco | chamadas de IA, rotas salvas, países |
| tela de assinatura do app | uma terceira variação |
| **o código que cobrava** | **quase nada — só a cota de países** |

Quatro versões da mesma resposta, e a que valia era a que ninguém tinha escrito. Quem assinava Pro recebia exatamente uma coisa a mais que o gratuito.

Hoje existe **uma régua só** (`packages/waypoints/src/regua-dos-planos.ts`), e é ela que o servidor usa pra cobrar. Enquanto a landing ler daqui, o que ela promete é literalmente o que o servidor aplica — mesma linha de código.

---

## O endpoint

```
GET  https://beta.gtoverlander.com.br/backend/public/planos
```

Público, sem autenticação, sem chave. **Já está no ar.**

**Resposta (valores reais de 04/09/2026):**

```json
{
  "planos": [
    {
      "code": "free",
      "nome": "Free",
      "preco": { "mensalCentavos": 0, "anualCentavos": 0 },
      "rotasAtivas": 3,
      "diasParaEditar": 30,
      "paisesEstrangeiros": 0,
      "anunciosSimultaneos": 0,
      "aparelhos": 1,
      "viagensSaoGastas": true
    },
    {
      "code": "plus",
      "nome": "Plus",
      "preco": { "mensalCentavos": 1990, "anualCentavos": 19990 },
      "rotasAtivas": 15,
      "diasParaEditar": null,
      "paisesEstrangeiros": 2,
      "anunciosSimultaneos": 1,
      "aparelhos": 2,
      "viagensSaoGastas": false
    },
    {
      "code": "pro",
      "nome": "Pro",
      "preco": { "mensalCentavos": 2990, "anualCentavos": 29990 },
      "rotasAtivas": null,
      "diasParaEditar": null,
      "paisesEstrangeiros": 5,
      "anunciosSimultaneos": 3,
      "aparelhos": 4,
      "viagensSaoGastas": false
    }
  ],
  "contribuicao": {
    "PONTOS_APROVADOS_POR_VIAGEM": 5,
    "VALIDACOES_NO_LOCAL_POR_VIAGEM": 5
  },
  "selo": {
    "VOTOS_PARA_VERIFICADO": 1,
    "CONFIRMACOES_NO_LOCAL": 1,
    "MESES_DE_VALIDADE_NO_LOCAL": 12,
    "VOTOS_PARA_FECHADO": 3,
    "RAIO_NO_LOCAL_METROS": 200
  },
  "apuradoEm": "2026-09-04T20:05:00.000Z"
}
```

### Como ler cada campo

| campo | o que é | ⚠️ cuidado |
|---|---|---|
| `rotasAtivas` | quantas rotas a pessoa pode ter vivas | **`null` = ilimitado.** Não é zero. |
| `diasParaEditar` | prazo pra editar uma rota criada | **`null` = enquanto pagar.** No Free são 30 dias. |
| `paisesEstrangeiros` | países offline **ALÉM** do de origem | O país de origem é grátis em **todo** plano, inclusive o Free. Zero aqui não significa "nenhum mapa". |
| `anunciosSimultaneos` | anúncios no Desapega ao mesmo tempo | Zero = só olha, não anuncia. |
| `aparelhos` | sessões simultâneas | celular + tablet + o do parceiro de viagem. |
| `viagensSaoGastas` | **só o Free é `true`** | No Free as 3 viagens são **gastas, não ocupadas**: apagar não devolve. Se a landing falar do limite, ela precisa dizer isso — ver abaixo. |

**Cache:** a API guarda 1 hora, e manda `Cache-Control: max-age=3600`.

---

## ⚠️ Três coisas que a landing precisa acertar no texto

### 1. "3 rotas" é meia-verdade — são **3 viagens por nossa conta, na vida**

Não é "3 por mês" nem "3 guardadas". O contador é vitalício e **apagar não devolve**. Se a página disser só "3 rotas", a pessoa entende "3 de cada vez", tenta apagar pra fazer outra, e fica com razão de ficar brava.

Sugestão de texto: **"3 viagens por nossa conta"** — e, no detalhe, *"feitas pela IA ou adotadas da comunidade; não renovam"*.

### 2. Dá pra **ganhar** mais viagem, e isso é argumento de venda

`contribuicao` diz o preço: **5 pontos seus aprovados pela comunidade = 1 viagem**, e **5 validações feitas no local = 1 viagem** (separadas, não somadas).

Vale aparecer na página. É o que faz o Free parecer generoso em vez de mesquinho — quem quer mais **paga ou trabalha**.

### 3. O preço que sai daqui é o **de tabela**, não o promocional

A estratégia é **loja no cheio, site com desconto**: a Google Play cobra R$ 19,90 e o site cobra menos (o v1 mostra R$ 14,90).

**O desconto não está modelado em lugar nenhum ainda.** Este endpoint devolve o preço cheio do banco.

Então, hoje, a landing tem duas saídas honestas:

- mostrar o preço de tabela que vem daqui, sem promoção; **ou**
- ter o desconto numa variável de ambiente do site (ex.: `NEXT_PUBLIC_DESCONTO_SITE=25`) e calcular em cima do valor da API — **nunca escrever o preço final à mão.**

Se a segunda for escolhida, avisem a aba do app: o certo é o desconto virar campo da API também, e aí o site passa a ler os dois números.

---

## Como implementar no site

Mesmo desenho do `lib/stats.ts`: **no servidor, não no navegador.** Sem CORS, os valores saem no HTML e não tem "pisca".

```ts
// lib/planos.ts
// A régua dos planos, lida da API. Nunca escreva limite à mão numa página.

export interface PlanoDaLanding {
  code: 'free' | 'plus' | 'pro';
  nome: string;
  preco: { mensalCentavos: number; anualCentavos: number };
  rotasAtivas: number | null;
  diasParaEditar: number | null;
  paisesEstrangeiros: number;
  anunciosSimultaneos: number;
  aparelhos: number;
  viagensSaoGastas: boolean;
}

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'https://beta.gtoverlander.com.br/backend';

// Rede de segurança: se a API não responder, a página mostra ISTO em vez de
// sumir com a tabela de preços. Confira contra a API de vez em quando — este é
// o chão, não a fonte.
const PISO: PlanoDaLanding[] = [
  { code: 'free', nome: 'Free',  preco: { mensalCentavos: 0,    anualCentavos: 0 },     rotasAtivas: 3,    diasParaEditar: 30,   paisesEstrangeiros: 0, anunciosSimultaneos: 0, aparelhos: 1, viagensSaoGastas: true },
  { code: 'plus', nome: 'Plus',  preco: { mensalCentavos: 1990, anualCentavos: 19990 }, rotasAtivas: 15,   diasParaEditar: null, paisesEstrangeiros: 2, anunciosSimultaneos: 1, aparelhos: 2, viagensSaoGastas: false },
  { code: 'pro',  nome: 'Pro',   preco: { mensalCentavos: 2990, anualCentavos: 29990 }, rotasAtivas: null, diasParaEditar: null, paisesEstrangeiros: 5, anunciosSimultaneos: 3, aparelhos: 4, viagensSaoGastas: false },
];

export async function getPlanos(): Promise<PlanoDaLanding[]> {
  try {
    const r = await fetch(`${BASE}/public/planos`, { next: { revalidate: 3600 } });
    if (!r.ok) return PISO;
    const d = (await r.json()) as { planos?: PlanoDaLanding[] };
    return d.planos?.length ? d.planos : PISO;
  } catch {
    return PISO;
  }
}

/** `null` vira "ilimitado" — nunca deixe `null` virar "0" na tela. */
export function limite(n: number | null, singular: string, plural: string): string {
  if (n === null) return 'Ilimitado';
  return `${n} ${n === 1 ? singular : plural}`;
}

/** 1990 → "R$ 19,90" */
export function reais(centavos: number, locale = 'pt-BR'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' }).format(centavos / 100);
}
```

---

## Checklist pra aba do site

- [ ] `lib/planos.ts` criado, com o piso conferido contra a API.
- [ ] **Varrer a landing atrás de limite escrito à mão** — "5 rotas", "2 países", "100 chamadas de IA", "ilimitado" e parentes. Todos passam a vir de `getPlanos()`. É este passo que faz o trabalho valer.
- [ ] `null` desenhado como **"Ilimitado"**, nunca como zero ou vazio.
- [ ] O texto do Free diz **"3 viagens por nossa conta"** e explica que não renovam.
- [ ] A contribuição aparece como caminho alternativo ("ganhe mais viagens contribuindo").
- [ ] Placeholders nas mensagens do next-intl, em todos os idiomas — número nunca escrito dentro da tradução.
- [ ] Conferir a página com a API fora do ar: tem que mostrar o piso, não erro e não tabela vazia.

## O que a aba do app ainda deve

- O **desconto do site** não existe como dado em lugar nenhum. Enquanto não existir, o endpoint só dá o preço de tabela.
- A régua cobra hoje **criar rota** e **editar rota congelada**. Anúncios simultâneos, aparelhos e a moeda de contribuição estão escritos mas ainda não aplicados — a landing pode anunciá-los, sabendo que a cobrança chega em seguida.
- O endereço `beta.gtoverlander.com.br` **vira `app.gtoverlander.com.br`** na virada de domínio. Mesma regra do contrato dos números: **use variável de ambiente, não crave `beta.` no código.**
