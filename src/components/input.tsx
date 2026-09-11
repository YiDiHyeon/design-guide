import type { ComponentProps, ReactNode } from 'react';
import type { ControlSize } from '@/lib/control';
export type InputProps = Omit<ComponentProps<'input'>, 'size'> & {
  size?: ControlSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  wrapperClassName?: string;
};
export function Input({
  size = 'md',
  startIcon,
  endIcon,
  wrapperClassName = '',
  className = '',
  disabled,
  readOnly,
  'aria-invalid': invalid,
  ...props
}: InputProps) {
  const state = disabled
    ? 'disabled'
    : readOnly
      ? 'readonly'
      : invalid && invalid !== 'false'
        ? 'error'
        : 'default';
  return (
    <div
      className={`ds-field ds-input ${wrapperClassName}`}
      data-size={size}
      data-state={state}
    >
      {startIcon && (
        <span className="field-icon" aria-hidden="true">
          {startIcon}
        </span>
      )}
      <input
        {...props}
        className={className}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={invalid}
      />
      {endIcon && (
        <span className="field-icon" aria-hidden="true">
          {endIcon}
        </span>
      )}
    </div>
  );
}
