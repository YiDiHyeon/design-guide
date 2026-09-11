'use client';

import type { ComponentProps, ReactNode } from 'react';

export const badgeVariantsList = [
  'default',
  'point',
  'accent',
  'pink',
  'orange',
  'blue',
  'cyan',
  'red',
] as const;

export type BadgeVariant = (typeof badgeVariantsList)[number];

export const badgeAppearancesList = ['solid', 'line'] as const;

export type BadgeAppearance = (typeof badgeAppearancesList)[number];

export function badgeVariants({
  variant = 'default',
  appearance = 'solid',
  className = '',
}: {
  variant?: BadgeVariant;
  appearance?: BadgeAppearance;
  className?: string;
} = {}) {
  return `ds-badge ds-badge--${variant} ds-badge--${appearance} ${className}`.trim();
}

export type BadgeProps = ComponentProps<'span'> & {
  variant?: BadgeVariant;
  appearance?: BadgeAppearance;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export function Badge({
  variant = 'default',
  appearance = 'solid',
  startIcon,
  endIcon,
  children,
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      data-appearance={appearance}
      className={badgeVariants({ variant, appearance, className })}
      {...props}
    >
      {startIcon && (
        <span data-slot="badge-start-icon" className="inline-flex shrink-0">
          {startIcon}
        </span>
      )}
      {children}
      {endIcon && (
        <span data-slot="badge-end-icon" className="inline-flex shrink-0">
          {endIcon}
        </span>
      )}
    </span>
  );
}
