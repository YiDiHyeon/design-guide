'use client';

import { forwardRef, useId, type ComponentProps, type ReactNode } from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';

export type SwitchProps = Omit<ComponentProps<'input'>, 'size' | 'type'> & {
  size?: SwitchSize;
  error?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  wrapperClassName?: string;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    size = 'md',
    error = false,
    disabled = false,
    label,
    description,
    wrapperClassName = '',
    className = '',
    id: customId,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const id = customId ?? generatedId;
  const descId = `${id}-desc`;
  const state = disabled ? 'disabled' : error ? 'error' : 'default';
  const computedDescribedBy =
    [description ? descId : undefined, ariaDescribedBy]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <label
      htmlFor={id}
      className={`ds-switch-wrapper ${wrapperClassName}`}
      data-size={size}
      data-state={state}
    >
      <input
        {...props}
        ref={ref}
        id={id}
        type="checkbox"
        role="switch"
        disabled={disabled}
        aria-invalid={error || ariaInvalid ? 'true' : undefined}
        aria-describedby={computedDescribedBy}
        className={`ds-switch-input ${className}`}
      />
      <span className="ds-switch-track" aria-hidden="true">
        <span className="ds-switch-thumb" />
      </span>
      {(label || description) && (
        <span className="ds-switch-content">
          {label && <span className="ds-switch-label">{label}</span>}
          {description && (
            <span id={descId} className="ds-switch-desc">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});
