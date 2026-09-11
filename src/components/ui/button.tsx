import type { ComponentProps } from 'react';

export const buttonVariants = [
  'solid',
  'secondary',
  'line',
  'line-icon',
  'circle-light',
  'circle-dark',
  'solid-light',
] as const;
export const buttonSizes = [
  'xxxs',
  'xxs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
  'xxxl',
] as const;
export type ButtonProps = ComponentProps<'button'> & {
  variant?: (typeof buttonVariants)[number];
  size?: (typeof buttonSizes)[number];
  loading?: boolean;
  fullWidth?: boolean;
};
export function Button({
  variant = 'solid',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      className={`ds-button ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading && <span className="spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
