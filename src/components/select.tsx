'use client';
import { useState, type ComponentProps } from 'react';
import type { ControlSize } from '@/lib/control';
export type SelectOption = { value: string; label: string; disabled?: boolean };
export type SelectProps = Omit<
  ComponentProps<'select'>,
  'size' | 'multiple' | 'children' | 'value' | 'defaultValue' | 'ref'
> & {
  size?: ControlSize;
  options: readonly SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  readOnly?: boolean;
};
export function Select({
  size = 'md',
  options,
  value,
  defaultValue,
  placeholder,
  readOnly = false,
  disabled,
  className = '',
  onChange,
  'aria-invalid': invalid,
  ...props
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ??
      (placeholder
        ? ''
        : (options.find((option) => !option.disabled)?.value ?? '')),
  );
  const selectedValue = value ?? internalValue;
  const state = disabled
    ? 'disabled'
    : readOnly
      ? 'readonly'
      : invalid && invalid !== 'false'
        ? 'error'
        : 'default';
  return (
    <div
      className={`ds-field ds-select ${className}`}
      data-size={size}
      data-state={state}
      data-placeholder={selectedValue === '' || undefined}
    >
      {readOnly && !disabled ? (
        <>
          <input
            id={props.id}
            type="text"
            readOnly
            value={
              options.find((option) => option.value === selectedValue)?.label ??
              placeholder ??
              ''
            }
            aria-label={props['aria-label']}
            aria-labelledby={props['aria-labelledby']}
            aria-describedby={props['aria-describedby']}
            aria-invalid={invalid}
            tabIndex={props.tabIndex}
          />
          <input
            type="hidden"
            name={props.name}
            value={selectedValue}
            form={props.form}
          />
        </>
      ) : (
        <select
          {...props}
          value={selectedValue}
          disabled={disabled}
          aria-invalid={invalid}
          onChange={(event) => {
            setInternalValue(event.target.value);
            onChange?.(event);
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      )}
      <span className="field-icon select-indicator" aria-hidden="true">
        ⌄
      </span>
    </div>
  );
}
