import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge classNames condicionais com tailwind-merge pra resolver conflitos.
 * Exemplo: cn('px-4', isLarge && 'px-6') → 'px-6'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
