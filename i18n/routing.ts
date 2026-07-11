import { defineRouting } from 'next-intl/routing';

/**
 * Configuração de roteamento i18n do GT Overlander.
 * - pt: idioma padrão, SEM prefixo na URL (gtoverlander.com.br/recursos continua igual)
 * - en/es: com prefixo (/en/recursos, /es/recursos)
 * localePrefix 'as-needed' preserva as URLs PT atuais — zero quebra de SEO.
 */
export const routing = defineRouting({
  locales: ['pt', 'en', 'es'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
