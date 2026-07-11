# Guia de Tradução — GT Overlander

## Adicionar um idioma novo (ex: Italiano)

**1. Criar a tradução**
```powershell
cd "C:\Claude\Projects\GT Overlander\site"
npx tsx scripts/translate.ts it
```
Isso cria `messages/it.json` completo a partir do PT via DeepL.

**2. Registrar o locale no roteador**
Arquivo: `i18n/routing.ts`
```ts
locales: ['pt', 'en', 'es', 'it'],  // adicionar 'it'
```

**3. Adicionar label no seletor**
Arquivo: `components/locale-switcher.tsx`
```ts
it: { short: 'IT', label: 'Italiano' },
```

**4. Build e push**
```powershell
npm run build
git add .
git commit -m "feat(i18n): add Italian locale"
git push origin feat/i18n
```

O seletor já vai mostrar o novo idioma automaticamente. ✅

---

## Corrigir ou atualizar textos em PT

**1. Editar o arquivo fonte**
Abrir `messages/pt.json` e fazer as alterações desejadas.

**2. Propagar para os outros idiomas**
```powershell
cd "C:\Claude\Projects\GT Overlander\site"
npx tsx scripts/translate.ts
```
O script detecta só as chaves que mudaram e retraduz apenas elas.
EN e ES são atualizados por padrão. Para incluir outros idiomas:
```powershell
npx tsx scripts/translate.ts en es it de
```

**3. Revisar as traduções geradas**
Abrir os arquivos `messages/en.json`, `messages/es.json` etc. e confirmar que ficou ok.

**4. Build e push**
```powershell
npm run build
git add .
git commit -m "fix(i18n): update translations"
git push origin feat/i18n
```

---

## Resumo rápido

| Situação | Comando |
|----------|---------|
| Novo idioma | `npx tsx scripts/translate.ts it` + 2 linhas de código |
| Texto PT mudou | `npx tsx scripts/translate.ts` |
| Só um idioma específico | `npx tsx scripts/translate.ts en` |
| Vários idiomas | `npx tsx scripts/translate.ts en es it de` |

---

## Observações importantes

- **PT é sempre a fonte da verdade** — nunca edite EN/ES/IT diretamente, edite PT e rode o script
- **Preços e valores em R$** não são traduzidos pelo script (ignorados automaticamente)
- **Blog não entra aqui** — posts do blog são escritos nativamente em cada idioma no Sanity, não traduzidos
- **A chave DeepL** fica em `.env.local` e nunca é commitada
- **500k caracteres/mês grátis** no plano Free — o site inteiro cabe várias vezes nesse limite
