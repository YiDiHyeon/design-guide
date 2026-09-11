import type { ComponentProps } from 'react';

export const buttonVariants = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'danger',
] as const;
export const buttonSizes = ['sm', 'md', 'lg', 'xl'] as const;
export type ButtonProps = ComponentProps<'button'> & {
  variant?: (typeof buttonVariants)[number];
  size?: (typeof buttonSizes)[number];
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
};
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  iconOnly = false,
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
      data-icon-only={iconOnly || undefined}
      className={`ds-button ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading && <span className="spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
