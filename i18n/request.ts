import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

/**
 * Carrega as mensagens (traduções) do locale ativo a cada request.
 * Fallback pro defaultLocale (pt) se o locale for inválido.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
