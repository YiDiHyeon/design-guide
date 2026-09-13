'use client';

import {
  Children,
  isValidElement,
  useId,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from 'react';
import { FieldContext, type FieldControlProps } from './field-context';

export type FieldProps = Omit<ComponentProps<'div'>, 'children'> & {
  /** One direct Input, Textarea, or Select. Put auxiliary actions in suffix. */
  children: ReactElement<FieldControlProps>;
  label: ReactNode;
  labelWeight?: 'medium' | 'bold';
  controlId?: string;
  size?: FieldControlProps['size'];
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  indicator?: 'auto' | 'optional' | 'none';
  description?: ReactNode;
  errorMessage?: ReactNode;
  suffix?: ReactNode;
  /** Display only. The caller owns the value, counting rule, and input limit. */
  count?: { current: number; max: number };
};

export function Field({
  children,
  label,
  labelWeight = 'medium',
  controlId,
  size,
  disabled,
  readOnly,
  required,
  invalid,
  indicator = 'auto',
  description,
  errorMessage,
  suffix,
  count,
  className = '',
  ...props
}: FieldProps) {
  const generatedId = useId();
  // Server Component boundaries may deliver a lazy node. React's child
  // traversal resolves it before we inspect the control's explicit props.
  const controls = Children.toArray(children);
  const child = controls[0];
  if (controls.length !== 1 || !isValidElement<FieldControlProps>(child)) {
    throw new Error(
      'Field requires exactly one Input, Textarea, or Select child.',
    );
  }
  const id = child.props.id ?? controlId ?? `${generatedId}-control`;
  const ariaInvalid =
    child.props['aria-invalid'] ?? invalid ?? Boolean(errorMessage);
  const isInvalid = Boolean(ariaInvalid && ariaInvalid !== 'false');
  const isRequired = child.props.required ?? required;
  const showError = isInvalid && Boolean(errorMessage);
  const message = showError ? errorMessage : description;
  const messageId = message
    ? `${generatedId}-${showError ? 'error' : 'description'}`
    : undefined;
  const countId = count ? `${generatedId}-count` : undefined;
  const context: FieldControlProps = {
    id,
    size,
    disabled,
    readOnly,
    required: isRequired,
    'aria-invalid': ariaInvalid,
    'aria-describedby':
      [messageId, countId].filter(Boolean).join(' ') || undefined,
  };

  return (
    <div
      {...props}
      className={`ds-field-layout ${className}`}
      data-invalid={isInvalid || undefined}
    >
      <div className="ds-field-header">
        <label
          className="ds-field-label"
          data-weight={labelWeight}
          htmlFor={id}
        >
          {label}
          {indicator !== 'none' &&
            (isRequired ? (
              <span className="ds-field-indicator" aria-hidden="true">
                *
              </span>
            ) : indicator === 'optional' ? (
              <span className="ds-field-optional">(선택)</span>
            ) : null)}
        </label>
        {suffix && <div className="ds-field-suffix">{suffix}</div>}
      </div>
      <FieldContext.Provider value={context}>{child}</FieldContext.Provider>
      <div
        className="ds-field-footer"
        data-has-content={Boolean(message || count) || undefined}
      >
        <div className="ds-field-message" aria-live="polite" aria-atomic="true">
          {message && (
            <p
              id={messageId}
              className={showError ? 'ds-field-error' : 'ds-field-description'}
            >
              {message}
            </p>
          )}
        </div>
        {count && (
          <span
            id={countId}
            className="ds-field-count"
            data-exceeded={count.current > count.max || undefined}
          >
            <span aria-hidden="true">
              {count.current}/{count.max}
            </span>
            <span className="ds-field-sr-only">
              최대 {count.max}자 중 {count.current}자 입력
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
