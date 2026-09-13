'use client';
import { useState } from 'react';
import { Field, Input, Select } from '@/components/ui';
import { Code } from '@/components/site/doc-parts';
import { controlSizes, type ControlSize } from '@/lib/control';
import { destinationOptions } from '@/lib/control';
const sizeOptions = controlSizes.map((s) => ({ value: s, label: s }));
const stateOptions = [
  { value: 'default', label: 'default' },
  { value: 'error', label: 'error' },
  { value: 'readonly', label: 'readonly' },
  { value: 'disabled', label: 'disabled' },
] as const;

export function FieldPlayground({ kind }: { kind: 'input' | 'select' }) {
  const [size, setSize] = useState<ControlSize>('md');
  const [state, setState] = useState('default');
  const [value, setValue] = useState('');
  const invalid = state === 'error';
  const label = kind === 'input' ? '이름' : '여행지';
  const description =
    kind === 'input'
      ? '예약에 사용할 이름을 입력하세요.'
      : '여행할 도시 한 곳을 선택해 주세요.';
  const fieldAttributes = `label="${label}" size="${size}"${state === 'disabled' ? ' disabled' : ''}${state === 'readonly' ? ' readOnly' : ''}${invalid ? ' invalid' : ' invalid={false}'}`;
  const controlExample =
    kind === 'input'
      ? '<Input placeholder="이름을 입력하세요" />'
      : '<Select options={destinationOptions} placeholder="여행지를 선택하세요" />';
  const example = `<Field ${fieldAttributes}\n  description="${description}"\n  errorMessage="입력한 값을 확인해 주세요."\n>\n  ${controlExample}\n</Field>`;
  return (
    <>
      <div className="playground">
        <div className="preview-label">
          <span>LIVE PREVIEW</span>
          <span>키보드로도 조작할 수 있어요</span>
        </div>
        <div className="preview-stage">
          <div className="field-demo">
            <Field
              label={label}
              size={size}
              disabled={state === 'disabled'}
              readOnly={state === 'readonly'}
              invalid={invalid}
              description={description}
              errorMessage="입력한 값을 확인해 주세요."
            >
              {kind === 'input' ? (
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="이름을 입력하세요"
                />
              ) : (
                <Select
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  options={destinationOptions}
                  placeholder="여행지를 선택하세요"
                />
              )}
            </Field>
            <p className="field-help" role="status">
              현재 값: {value || '없음'}
            </p>
          </div>
        </div>
        <div className="playground-controls">
          <label>
            Size
            <Select
              size="sm"
              value={size}
              options={sizeOptions}
              onChange={(e) => setSize(e.target.value as ControlSize)}
            />
          </label>
          <label>
            State
            <Select
              size="sm"
              value={state}
              options={stateOptions}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
        </div>
      </div>
      <Code>{example}</Code>
    </>
  );
}
