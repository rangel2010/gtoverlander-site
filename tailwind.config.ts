import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── CORES FIXAS DA MARCA (não respondem ao tema) ──
        'gt-green': '#122e1f',           // verde GT âncora — Header/Footer sempre
        'gt-bg-elevated': '#163725',     // verde GT levemente claro — Hero sempre verde
        'gt-orange': '#e06226',          // CTA
        'gt-brown': '#904e22',
        'gt-cream': '#f8f5ee',           // legado, usado em poucos lugares
        // Deprecated — soft tones que não estamos usando hoje
        'gt-bg-base': '#131715',
        'gt-bg-soft': '#181c19',
        'gt-gray-dark': '#333333',
        'gt-gray-mid': '#666666',
        'gt-gray-light': '#a6a6a6',

        // ── CORES TEMÁTICAS (respondem ao tema via CSS variables) ──
        // Valores definidos em app/globals.css: :root (light) e .dark (dark)
        // Formato R G B (triplet) pra Tailwind conseguir aplicar opacidade (/95, /50 etc)
        'gt-bg': 'rgb(var(--gt-bg) / <alpha-value>)',
        'gt-card': 'rgb(var(--gt-card) / <alpha-value>)',
        'gt-card-hover': 'rgb(var(--gt-card-hover) / <alpha-value>)',
        'gt-border': 'rgb(var(--gt-border) / <alpha-value>)',
        'gt-border-strong': 'rgb(var(--gt-border-strong) / <alpha-value>)',
        'gt-text': 'rgb(var(--gt-text) / <alpha-value>)',
        'gt-text-muted': 'rgb(var(--gt-text-muted) / <alpha-value>)',
        'gt-text-dim': 'rgb(var(--gt-text-dim) / <alpha-value>)',
        // Laranja usado como COR DE TEXTO (links, labels, ícones inline).
        // Existe separado de 'gt-orange' porque o laranja de CTA (#e06226)
        // não atinge contraste 4,5:1 nem sobre o creme claro (3,24:1) nem
        // sobre o verde escuro (4,14:1) — reprova no WCAG AA nos dois temas.
        // Aqui ele escurece no tema claro e clareia no escuro. Fundo de botão
        // continua usando 'gt-orange' puro, a marca não muda.
        'gt-orange-text': 'rgb(var(--gt-orange-text) / <alpha-value>)',
      },
      fontFamily: {
        // Display: Anton — condensada bold pra headlines impactantes (estilo app web GT)
        display: ['var(--font-anton)', 'Impact', 'system-ui', 'sans-serif'],
        // Sans: Inter — body, navegação, cards
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '720px',
      },
      letterSpacing: {
        tightish: '-0.01em',
        display: '0.01em',
      },
    },
  },
  plugins: [],
};

export default config;
