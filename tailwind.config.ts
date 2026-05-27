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
        'gt-bg': 'var(--gt-bg)',
        'gt-card': 'var(--gt-card)',
        'gt-card-hover': 'var(--gt-card-hover)',
        'gt-border': 'var(--gt-border)',
        'gt-border-strong': 'var(--gt-border-strong)',
        'gt-text': 'var(--gt-text)',
        'gt-text-muted': 'var(--gt-text-muted)',
        'gt-text-dim': 'var(--gt-text-dim)',
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
