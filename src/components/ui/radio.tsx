'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ChangeEvent,
  type ComponentProps,
  type ReactNode,
} from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioDirection = 'vertical' | 'horizontal';

type RadioGroupContextValue = {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: RadioSize;
  disabled?: boolean;
  error?: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export type RadioGroupProps = {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: RadioSize;
  direction?: RadioDirection;
  disabled?: boolean;
  error?: boolean;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

export function RadioGroup({
  name: customName,
  value,
  defaultValue,
  onChange,
  size = 'md',
  direction = 'vertical',
  disabled = false,
  error = false,
  children,
  className = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: RadioGroupProps) {
  const generatedName = useId();
  const name = customName ?? generatedName;

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value: value ?? defaultValue,
        onChange,
        size,
        disabled,
        error,
      }}
    >
      <div
        role="radiogroup"
        data-direction={direction}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={error ? 'true' : undefined}
        className={`ds-radio-group ${className}`}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export type RadioProps = Omit<ComponentProps<'input'>, 'size' | 'type'> & {
  size?: RadioSize;
  error?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  wrapperClassName?: string;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    size: individualSize,
    error: individualError,
    disabled: individualDisabled,
    readOnly,
    label,
    description,
    wrapperClassName = '',
    className = '',
    id: customId,
    name: individualName,
    value,
    checked: individualChecked,
    defaultChecked,
    onChange: individualOnChange,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const id = customId ?? generatedId;
  const descId = `${id}-desc`;

  const group = useContext(RadioGroupContext);

  const size = individualSize ?? group?.size ?? 'md';
  const disabled = individualDisabled ?? group?.disabled ?? false;
  const error = individualError ?? group?.error ?? false;
  const name = individualName ?? group?.name;

  const isChecked =
    group?.value !== undefined && value !== undefined
      ? group.value === value
      : individualChecked;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    individualOnChange?.(e);
    if (group?.onChange && value !== undefined) {
      group.onChange(String(value));
    }
  };

  const state = disabled ? 'disabled' : error ? 'error' : 'default';
  const isReadOnly =
    readOnly !== undefined
      ? readOnly
      : isChecked !== undefined && !individualOnChange && !group?.onChange;

  const computedDescribedBy =
    [description ? descId : undefined, ariaDescribedBy]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <label
      htmlFor={id}
      className={`ds-radio-wrapper ${wrapperClassName}`}
      data-size={size}
      data-state={state}
    >
      <input
        {...props}
        ref={ref}
        id={id}
        type="radio"
        name={name}
        value={value}
        disabled={disabled}
        readOnly={isReadOnly}
        checked={isChecked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        aria-describedby={computedDescribedBy}
        className={`ds-radio-input ${className}`}
      />
      <span
        className="ds-radio-circle"
        data-checked={isChecked || defaultChecked || undefined}
        aria-hidden="true"
      >
        <span className="ds-radio-dot" />
      </span>
      {(label || description) && (
        <span className="ds-radio-content">
          {label && <span className="ds-radio-label">{label}</span>}
          {description && (
            <span id={descId} className="ds-radio-desc">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});
