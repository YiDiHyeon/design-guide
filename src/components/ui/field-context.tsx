'use client';

import { createContext, useContext, type AriaAttributes } from 'react';
import type { ControlSize } from '@/lib/control';

export type FieldControlProps = {
  id?: string;
  size?: ControlSize;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  'aria-describedby'?: string;
};

export const FieldContext = createContext<FieldControlProps | undefined>(
  undefined,
);

export function useFieldControl(props: FieldControlProps) {
  const field = useContext(FieldContext);
  const describedBy =
    [
      ...new Set(
        [props['aria-describedby'], field?.['aria-describedby']]
          .filter(Boolean)
          .flatMap((ids) => ids!.trim().split(/\s+/))
          .filter(Boolean),
      ),
    ].join(' ') || undefined;

  return {
    id: props.id ?? field?.id,
    size: props.size ?? field?.size ?? 'md',
    disabled: props.disabled ?? field?.disabled,
    readOnly: props.readOnly ?? field?.readOnly,
    required: props.required ?? field?.required,
    'aria-invalid': props['aria-invalid'] ?? field?.['aria-invalid'],
    'aria-describedby': describedBy,
  };
}
