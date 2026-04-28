import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gt-orange/50 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary: 'bg-gt-orange text-white hover:bg-gt-orange/90',
  secondary:
    'bg-gt-card text-gt-text border border-gt-border-strong hover:bg-gt-card-hover',
  outline:
    'bg-transparent text-gt-text border border-gt-text/30 hover:bg-gt-text/10',
  ghost: 'bg-transparent text-gt-text hover:bg-gt-card',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

interface BaseProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  external?: boolean;
}

interface ActionButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: never;
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if ('href' in rest && rest.href) {
    if (rest.external) {
      return (
        <a
          href={rest.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={rest.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {children}
    </button>
  );
}
