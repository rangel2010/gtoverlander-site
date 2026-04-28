# GT Overlander — Site Marketing & Blog

Site institucional público de `gtoverlander.com.br`. Marketing, captura de download e blog SEO.

## Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Estilização**: Tailwind CSS
- **CMS do blog**: Sanity
- **E-mail forms**: Resend
- **Monitoramento**: Sentry
- **Analytics**: Plausible
- **Deploy**: Vercel via GitHub

## Setup local

```bash
npm install
cp .env.local.example .env.local
# preencha as chaves em .env.local
npm run dev
```

Site abre em http://localhost:3000

## Scripts

```bash
npm run dev          # desenvolvimento (hot reload)
npm run build        # build de produção
npm start            # serve build de produção
npm run lint         # linting
npm run type-check   # checagem de tipos sem build
```

## Deploy

Push pra branch `main` dispara deploy automático no Vercel.

URL temporária de preview: `gtoverlander-site.vercel.app`
URL produção (após DNS swap): `gtoverlander.com.br`

## Variáveis de ambiente

Veja `.env.local.example` pra lista completa. Todas as chaves devem ser configuradas no painel da Vercel também (Settings → Environment Variables).

## Estrutura

```
app/                  Rotas do site (App Router)
  layout.tsx           Layout root (header/footer/meta)
  page.tsx             Homepage
  recursos/            4 páginas de feature
  planos/              Comparativo Free/Plus/Pro
  blog/                Hub + pillars + posts (Sanity)
  sobre/               História + tese
  faq/                 Perguntas frequentes
  empresas/            Conta Business — em breve
  contato/             Form de contato
  suporte/             Help center light
  api/                 Endpoints serverless (forms)
components/           UI components reutilizáveis
  ui/                   Button, Card, Container
  sections/             Hero, FeatureCard, CTA
  header.tsx
  footer.tsx
content/              Markdown legacy (migra pra Sanity)
lib/                  Utilities + clients
  sanity/               Client + queries
  seo.ts                Helpers de meta tags
  utils.ts
public/               Static assets (logos, favicon)
```

## Especificação completa do produto

`Features/To do/Spec_Site_Marketing_Blog_2026-04-27.md` no workspace do plano de produto.

## Identidade visual

Paleta GT (em `tailwind.config.ts` como classes utilities):

- `gt-green` `#122e1f` — primária
- `gt-orange` `#e06226` — CTA
- `gt-brown` `#904e22` — apoio
- `gt-cream` `#f8f5ee` — fundo claro

Logos vetorizados em `C:\Users\range\OneDrive\Desktop\Identidade Visual\Logos vetorizadas\`
