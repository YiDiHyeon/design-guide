'use client';

import { useState } from 'react';
import {
  Radio,
  RadioGroup,
  type RadioDirection,
  type RadioSize,
  Select,
} from '@/components/ui';
import { Code } from '@/components/site/doc-parts';

const sizeOptions = [
  { value: 'sm', label: 'sm (16px)' },
  { value: 'md', label: 'md (20px)' },
  { value: 'lg', label: 'lg (24px)' },
] as const;

const directionOptions = [
  { value: 'vertical', label: 'Vertical (수직)' },
  { value: 'horizontal', label: 'Horizontal (수평)' },
] as const;

const stateOptions = [
  { value: 'default', label: 'default' },
  { value: 'error', label: 'error' },
  { value: 'disabled', label: 'disabled' },
] as const;

export function RadioPlayground() {
  const [size, setSize] = useState<RadioSize>('md');
  const [direction, setDirection] = useState<RadioDirection>('vertical');
  const [stateOption, setStateOption] = useState('default');
  const [selectedValue, setSelectedValue] = useState('card');

  const isDisabled = stateOption === 'disabled';
  const isError = stateOption === 'error';

  const codeSnippet = `<RadioGroup
  name="payment-method"
  size="${size}"
  direction="${direction}"${isError ? '\n  error={true}' : ''}${isDisabled ? '\n  disabled={true}' : ''}
  value="${selectedValue}"
  onChange={(val) => setSelectedValue(val)}
>
  <Radio
    value="card"
    label="신용/체크카드"
    description="국내외 모든 카드사 무이자 할부 지원"
  />
  <Radio
    value="pay"
    label="간편결제"
    description="카카오페이, 네이버페이, 토스페이"
  />
  <Radio
    value="transfer"
    label="실시간 계좌이체"
    description="이체 수수료 무료"
  />
</RadioGroup>`;

  return (
    <>
      <div className="playground">
        <div className="preview-label">
          <span>LIVE PREVIEW</span>
          <span>마우스 클릭 또는 키보드 방향키(↑/↓/←/→)로 선택해 보세요</span>
        </div>
        <div className="preview-stage" style={{ minHeight: '200px' }}>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <RadioGroup
              name="playground-payment"
              size={size}
              direction={direction}
              error={isError}
              disabled={isDisabled}
              value={selectedValue}
              onChange={(val) => setSelectedValue(val)}
            >
              <Radio
                value="card"
                label="신용/체크카드"
                description={
                  direction === 'vertical'
                    ? '국내외 모든 카드사 무이자 할부 지원'
                    : undefined
                }
              />
              <Radio
                value="pay"
                label="간편결제"
                description={
                  direction === 'vertical'
                    ? '카카오페이, 네이버페이, 토스페이'
                    : undefined
                }
              />
              <Radio
                value="transfer"
                label="실시간 계좌이체"
                description={
                  direction === 'vertical' ? '이체 수수료 무료' : undefined
                }
              />
            </RadioGroup>

            <p
              className="field-help"
              style={{ marginTop: '20px' }}
              role="status"
            >
              선택된 결제 수단: <strong>{selectedValue}</strong>
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
              onChange={(e) => setSize(e.target.value as RadioSize)}
            />
          </label>
          <label>
            Direction
            <Select
              size="sm"
              value={direction}
              options={directionOptions}
              onChange={(e) => setDirection(e.target.value as RadioDirection)}
            />
          </label>
          <label>
            State Preset
            <Select
              size="sm"
              value={stateOption}
              options={stateOptions}
              onChange={(e) => setStateOption(e.target.value)}
            />
          </label>
        </div>
      </div>
      <Code>{codeSnippet}</Code>
    </>
  );
}
