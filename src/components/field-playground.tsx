'use client';
import { useId, useState } from 'react';
import { Input } from './input';
import { Select } from './select';
import { Code } from './doc-parts';
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
  const id = useId();
  const [size, setSize] = useState<ControlSize>('md');
  const [state, setState] = useState('default');
  const [value, setValue] = useState('');
  const invalid = state === 'error';
  const common = {
    id,
    size,
    disabled: state === 'disabled',
    readOnly: state === 'readonly',
    'aria-invalid': invalid,
    'aria-describedby': `${id}-help`,
  };
  const example =
    kind === 'input'
      ? `<label htmlFor="name">이름</label>\n<Input id="name" size="${size}" placeholder="이름을 입력하세요"${common.disabled ? ' disabled' : ''}${common.readOnly ? ' readOnly' : ''}${invalid ? ' aria-invalid="true"' : ''} aria-describedby="name-help" />\n<p id="name-help">${invalid ? '이름을 확인해 주세요.' : '예약에 사용할 이름을 입력하세요.'}</p>`
      : `<label htmlFor="destination">여행지</label>\n<Select id="destination" size="${size}"\n  options={[{ value: 'seoul', label: '서울' }, { value: 'busan', label: '부산' }]}\n  placeholder="여행지를 선택하세요"${common.disabled ? '\n  disabled' : ''}${common.readOnly ? '\n  readOnly' : ''}${invalid ? '\n  aria-invalid="true"' : ''}\n  aria-describedby="destination-help"\n/>\n<p id="destination-help">${invalid ? '여행지를 확인해 주세요.' : '한 곳을 선택해 주세요.'}</p>`;
  return (
    <>
      <div className="playground">
        <div className="preview-label">
          <span>LIVE PREVIEW</span>
          <span>키보드로도 조작할 수 있어요</span>
        </div>
        <div className="preview-stage">
          <div className="field-demo">
            <label className="field-label" htmlFor={id}>
              {kind === 'input' ? '이름' : '여행지'}
            </label>
            {kind === 'input' ? (
              <Input
                {...common}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="이름을 입력하세요"
              />
            ) : (
              <Select
                {...common}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                options={destinationOptions}
                placeholder="여행지를 선택하세요"
              />
            )}
            <p
              id={`${id}-help`}
              className={`field-help ${invalid ? 'field-error' : ''}`}
            >
              {invalid
                ? '입력한 값을 확인해 주세요.'
                : kind === 'input'
                  ? '예약에 사용할 이름을 입력하세요.'
                  : '여행할 도시 한 곳을 선택해 주세요.'}
            </p>
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
