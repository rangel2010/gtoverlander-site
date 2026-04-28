import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cores de marca (mantidas)
        'gt-green': '#122e1f',
        'gt-orange': '#e06226',
        'gt-brown': '#904e22',

        // Dark mode universal — harmonizado com app.gtoverlander.com.br
        'gt-bg': '#0f0f0f',          // background principal do site
        'gt-card': '#1c1c1c',         // cards e áreas elevadas
        'gt-card-hover': '#262626',   // hover de cards
        'gt-border': '#2a2a2a',       // bordas sutis
        'gt-border-strong': '#3a3a3a', // bordas mais visíveis

        // Texto sobre dark
        'gt-text': '#f5f5f5',
        'gt-text-muted': '#a6a6a6',
        'gt-text-dim': '#737373',

        // Cor cream legada (mantida só pra elementos que ainda usam fundo claro)
        'gt-cream': '#f8f5ee',
        'gt-gray-dark': '#333333',
        'gt-gray-mid': '#666666',
        'gt-gray-light': '#a6a6a6',
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
