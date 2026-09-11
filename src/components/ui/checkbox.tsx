'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { Check, Minus } from 'lucide-react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export type CheckboxProps = Omit<ComponentProps<'input'>, 'size' | 'type'> & {
  size?: CheckboxSize;
  indeterminate?: boolean;
  error?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  wrapperClassName?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      size = 'md',
      indeterminate = false,
      error = false,
      disabled = false,
      readOnly,
      label,
      description,
      wrapperClassName = '',
      className = '',
      id: customId,
      checked,
      defaultChecked,
      onChange,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const id = customId ?? generatedId;
    const descId = `${id}-desc`;

    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current!);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const state = disabled ? 'disabled' : error ? 'error' : 'default';
    const isReadOnly =
      readOnly !== undefined ? readOnly : checked !== undefined && !onChange;

    // Described by mapping
    const computedDescribedBy =
      [description ? descId : undefined, ariaDescribedBy]
        .filter(Boolean)
        .join(' ') || undefined;

    return (
      <label
        htmlFor={id}
        className={`ds-checkbox-wrapper ${wrapperClassName}`}
        data-size={size}
        data-state={state}
      >
        <input
          {...props}
          ref={innerRef}
          id={id}
          type="checkbox"
          disabled={disabled}
          readOnly={isReadOnly}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          aria-checked={indeterminate ? 'mixed' : undefined}
          aria-invalid={error || ariaInvalid ? 'true' : undefined}
          aria-describedby={computedDescribedBy}
          className={`ds-checkbox-input ${className}`}
        />
        <span
          className="ds-checkbox-box"
          data-checked={checked || defaultChecked || undefined}
          data-indeterminate={indeterminate || undefined}
          aria-hidden="true"
        >
          {indeterminate ? (
            <Minus className="ds-checkbox-icon" />
          ) : checked || defaultChecked ? (
            <Check className="ds-checkbox-icon" />
          ) : null}
        </span>
        {(label || description) && (
          <span className="ds-checkbox-content">
            {label && <span className="ds-checkbox-label">{label}</span>}
            {description && (
              <span id={descId} className="ds-checkbox-desc">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  },
);
