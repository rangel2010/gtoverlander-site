/**
 * Navegação localizada — exporta Link, usePathname, useRouter e redirect
 * já configurados com os locales do projeto.
 *
 * IMPORTANTE: importe sempre daqui, nunca de 'next/link' ou 'next/navigation'
 * quando o destino for uma rota interna do site — assim o prefixo de locale
 * (/en, /es) é adicionado automaticamente.
 */
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
