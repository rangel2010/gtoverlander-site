# Os planos do GT Overlander — a definição única

**Decidido em 04/09/2026 com o Rangel. Este documento substitui tudo.**

> ⚠️ **Leia isto antes de qualquer coisa:** qualquer descrição de plano que
> exista hoje no site, no app, em texto de marketing ou em documento antigo
> **não vale mais**. Exportações de rota, Radar por dia, "IA avançada",
> "chamadas de IA por mês", "rotas salvas" — nada disso existe. O que está
> escrito aqui é a régua inteira, e ela é a mesma que o servidor usa pra cobrar.

A fonte viva é `GET /backend/public/planos` (ver `CONTRATO_REGUA_PLANOS_API.md`,
nesta pasta). **Nunca escreva um número destes à mão numa página.**

---

## Free

**Preço:** grátis, para sempre.

**O que entrega:**

- **3 viagens por nossa conta** — feitas com o copiloto de IA **ou** adotadas da
  comunidade. Você escolhe de onde vêm.
- **O mapa e os pontos do seu país, offline, para sempre** — baixa uma vez e
  funciona sem internet, na estrada toda.
- **Radar completo e ilimitado** — encontrar o que está perto de você agora,
  quantas vezes quiser, sempre.
- **Validar e cadastrar pontos, sem limite** — e ganhar viagens por isso.
- **Publicar suas rotas** para a comunidade.
- **1 aparelho** conectado.

**O que o Free não faz:**

- Não leva **outros países** offline.
- Não **adota** rota pública depois de gastar as 3 viagens (ver e "namorar" a
  rota continua liberado).
- Não **anuncia** no Desapega (ver os anúncios dos outros, sim).

### ⚠️ Três coisas sobre o Free que o texto TEM que dizer

**1. As 3 viagens não renovam.** Não é "3 por mês". São 3 na vida da conta.

**2. Apagar não devolve a viagem.** Se a pessoa usou 2 de 3 e apaga uma,
continuam sendo 2 de 3 — só que sem a rota. Isso precisa estar escrito onde ela
possa ler *antes* de apagar, senão vira reclamação com razão.

**3. Depois de 30 dias, a rota congela — mas continua funcionando.** Ela abre,
navega e vale offline **para sempre**. O que acaba é a permissão de *editar*.
Nunca diga "você perde a rota": ela não some, ela para de aceitar mudança.

---

## Plus — R$ 19,90/mês ou R$ 199,90/ano

Tudo do Free, mais:

- **15 rotas ativas** ao mesmo tempo (aqui apagar **libera** vaga).
- **Edição sem prazo** — enquanto a assinatura estiver ativa, edita quando quiser.
- **+2 países offline** além do seu, trocáveis quando quiser.
- **Adotar rotas públicas** da comunidade, sem gastar viagem.
- **1 anúncio** no Desapega por vez.
- **2 aparelhos** conectados.

---

## Pro — R$ 29,90/mês ou R$ 299,90/ano

Tudo do Plus, mais:

- **Rotas ilimitadas** — nunca precisar escolher qual apagar para criar outra.
  *(É isto que o Pro vende: não perder histórico.)*
- **+5 países offline** além do seu.
- **3 anúncios** no Desapega ao mesmo tempo.
- **4 aparelhos** conectados.

---

## Ganhe viagens contribuindo — vale para qualquer plano

Quem ajuda a base ganha viagem. Dois caminhos, **cada um vale por si** (não se
somam):

- **5 pontos seus aprovados pela comunidade = 1 viagem**
- **5 validações feitas no local (com GPS) = 1 viagem**

Validar um lugar que você conhece sem estar lá **continua valendo** para a
comunidade e para o XP — só não conta como moeda.

> Isto é argumento de venda, não letra miúda. É o que faz o Free parecer
> generoso em vez de mesquinho: quem quer mais **paga ou trabalha**.

---

## O selo dos pontos

- **Verificado** — 1 pessoa da comunidade validou.
- **Verificado no local** — alguém confirmou **estando lá** (GPS a até 200 m).
  Fica por cima do normal e vale **12 meses**; sem nova confirmação presencial,
  volta a ser só "verificado".
- **Fechado** — precisa de **3 votos**, porque apagar informação de alguém pede
  consenso.

---

## O que é igual para todos, e não deve virar diferencial

- **O motor de IA é o mesmo em todos os planos.** Ninguém recebe uma IA pior por
  ser gratuito. *(Decisão do Rangel: dar o motor bom ao gratuito faz ele sentir a
  qualidade e querer usar mais; limitar a qualidade faria ele achar o produto
  ruim e ir embora.)*
- **Radar e validação são livres e ilimitados em todos os planos**, para sempre.
- **O pacote offline do país de origem é grátis em todos os planos**, para
  sempre. O país de origem é escolhido uma vez e não muda.
- **Publicar rota** é liberado para todos.

---

## ❌ O que NÃO existe mais — apagar do site e dos textos

Se aparecer em qualquer lugar, está errado:

- ~~Exportar rota para navegação (1 a cada 90 dias / 2 por mês / ilimitado)~~
- ~~Radar 1× por dia / 5× por dia / ilimitado~~
- ~~"IA avançada" como diferencial de plano~~
- ~~"Chamadas de IA por mês" (10 / 100 / 500)~~
- ~~"Rotas salvas" como número separado de rotas ativas~~
- ~~"Rotas premium"~~
- ~~"Ajuda em tempo real"~~ *(a feature está desligada)*
- ~~"Copiar rotas públicas" como item do Plus~~ *(virou "adotar", e o Free
  também adota — gastando uma das 3 viagens)*

---

## Duas coisas ainda em aberto — não anuncie como se estivessem prontas

**Teste grátis de Pro por 7 dias na instalação.** Decidido, ainda não
configurado na Google Play nem no RevenueCat.

**O desconto do site.** A estratégia é loja no preço cheio e site com desconto,
mas o desconto **não existe como dado** em lugar nenhum ainda. Enquanto isso, o
endpoint entrega o preço de tabela.
