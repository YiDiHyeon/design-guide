'use client';

import { useState } from 'react';
import { Field, Select, Textarea, type TextareaResize } from '@/components/ui';
import { Code } from '@/components/site/doc-parts';
import { controlSizes, type ControlSize } from '@/lib/control';

const sizeOptions = controlSizes.map((value) => ({ value, label: value }));
const stateOptions = [
  { value: 'default', label: 'default' },
  { value: 'error', label: 'error' },
  { value: 'readonly', label: 'readonly' },
  { value: 'disabled', label: 'disabled' },
] as const;
const resizeOptions = [
  { value: 'vertical', label: 'vertical' },
  { value: 'none', label: 'none' },
] as const;

export function TextareaPlayground() {
  const [size, setSize] = useState<ControlSize>('md');
  const [state, setState] = useState('default');
  const [resize, setResize] = useState<TextareaResize>('none');
  const [value, setValue] = useState('');
  const invalid = state === 'error';
  const maxLength = 200;

  const example = `<Field label="의견" size="${size}"${state === 'disabled' ? ' disabled' : ''}${state === 'readonly' ? ' readOnly' : ''} invalid={${invalid}}\n  description="개인정보는 입력하지 마세요."\n  errorMessage="의견을 10자 이상 입력해 주세요."\n  count={{ current: value.length, max: 200 }}\n>\n  <Textarea resize="${resize}" rows={4} maxLength={200}\n    value={value} onChange={(event) => setValue(event.target.value)}\n    placeholder="서비스에 대한 의견을 입력해 주세요" />\n</Field>`;

  return (
    <>
      <div className="playground">
        <div className="preview-label">
          <span>LIVE PREVIEW</span>
          <span>여러 줄을 입력하거나 크기를 조절해 보세요</span>
        </div>
        <div className="preview-stage">
          <div className="field-demo">
            <Field
              label="의견"
              size={size}
              disabled={state === 'disabled'}
              readOnly={state === 'readonly'}
              invalid={invalid}
              description="개인정보는 입력하지 마세요."
              errorMessage="의견을 10자 이상 입력해 주세요."
              count={{ current: value.length, max: maxLength }}
            >
              <Textarea
                resize={resize}
                rows={4}
                maxLength={maxLength}
                value={value}
                placeholder="서비스에 대한 의견을 입력해 주세요"
                onChange={(event) => setValue(event.target.value)}
              />
            </Field>
          </div>
        </div>
        <div className="playground-controls">
          <label>
            Size
            <Select
              size="sm"
              value={size}
              options={sizeOptions}
              onChange={(event) => setSize(event.target.value as ControlSize)}
            />
          </label>
          <label>
            State
            <Select
              size="sm"
              value={state}
              options={stateOptions}
              onChange={(event) => setState(event.target.value)}
            />
          </label>
          <label>
            Resize
            <Select
              size="sm"
              value={resize}
              options={resizeOptions}
              onChange={(event) =>
                setResize(event.target.value as TextareaResize)
              }
            />
          </label>
        </div>
      </div>
      <Code>{example}</Code>
    </>
  );
}
