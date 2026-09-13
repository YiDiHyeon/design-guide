'use client';

import type { ComponentProps } from 'react';
import type { ControlSize } from '@/lib/control';
import { useFieldControl } from './field-context';

export type TextareaResize = 'vertical' | 'none';

export type TextareaProps = Omit<ComponentProps<'textarea'>, 'size'> & {
  size?: ControlSize;
  resize?: TextareaResize;
  wrapperClassName?: string;
};

export function Textarea({
  size: ownSize,
  resize = 'none',
  wrapperClassName = '',
  className = '',
  disabled: ownDisabled,
  readOnly: ownReadOnly,
  rows = 4,
  'aria-invalid': ownInvalid,
  ...props
}: TextareaProps) {
  const {
    size,
    disabled,
    readOnly,
    'aria-invalid': invalid,
    ...fieldProps
  } = useFieldControl({
    ...props,
    size: ownSize,
    disabled: ownDisabled,
    readOnly: ownReadOnly,
    'aria-invalid': ownInvalid,
  });

  const state = disabled
    ? 'disabled'
    : readOnly
      ? 'readonly'
      : invalid && invalid !== 'false'
        ? 'error'
        : 'default';

  return (
    <div
      className={`ds-field ds-input ds-textarea ${wrapperClassName}`}
      data-size={size}
      data-state={state}
      data-resize={resize}
    >
      <textarea
        {...props}
        {...fieldProps}
        rows={rows}
        className={className}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={invalid}
      />
    </div>
  );
}
