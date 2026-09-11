'use client';

import { useId, useState } from 'react';
import { Checkbox, type CheckboxSize, Select } from '@/components/ui';
import { Code } from '@/components/site/doc-parts';

const sizeOptions = [
  { value: 'sm', label: 'sm (16px)' },
  { value: 'md', label: 'md (20px)' },
  { value: 'lg', label: 'lg (24px)' },
] as const;

const stateOptions = [
  { value: 'default', label: 'default' },
  { value: 'checked', label: 'checked' },
  { value: 'indeterminate', label: 'indeterminate' },
  { value: 'error', label: 'error' },
  { value: 'disabled', label: 'disabled' },
] as const;

const contentOptions = [
  { value: 'both', label: 'Label + Description' },
  { value: 'label', label: 'Label Only' },
  { value: 'none', label: 'No Label (Standalone)' },
] as const;

export function CheckboxPlayground() {
  const id = useId();
  const [size, setSize] = useState<CheckboxSize>('md');
  const [stateOption, setStateOption] = useState('default');
  const [contentMode, setContentMode] = useState('both');
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  // Sync state option with visual states
  const isDisabled = stateOption === 'disabled';
  const isError = stateOption === 'error';
  const effectiveChecked =
    stateOption === 'checked'
      ? true
      : stateOption === 'indeterminate'
        ? false
        : checked;
  const effectiveIndeterminate =
    stateOption === 'indeterminate'
      ? true
      : stateOption === 'checked'
        ? false
        : indeterminate;

  const labelText =
    contentMode !== 'none' ? '마케팅 정보 수신 동의 (선택)' : undefined;
  const descText =
    contentMode === 'both'
      ? '다양한 혜택 및 이벤트 소식을 이메일과 SMS로 받아보실 수 있습니다.'
      : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (stateOption === 'checked' || stateOption === 'indeterminate') {
      setStateOption('default');
    }
    setIndeterminate(false);
    setChecked(e.target.checked);
  };

  const codeSnippet = `<Checkbox
  size="${size}"${effectiveChecked ? '\n  checked={true}' : ''}${effectiveIndeterminate ? '\n  indeterminate={true}' : ''}${isError ? '\n  error={true}' : ''}${isDisabled ? '\n  disabled={true}' : ''}${labelText ? `\n  label="${labelText}"` : ''}${descText ? `\n  description="${descText}"` : ''}
  onChange={(e) => setChecked(e.target.checked)}
/>`;

  return (
    <>
      <div className="playground">
        <div className="preview-label">
          <span>LIVE PREVIEW</span>
          <span>직접 클릭하거나 스페이스바로 토글해 보세요</span>
        </div>
        <div className="preview-stage" style={{ minHeight: '160px' }}>
          <div style={{ maxWidth: '440px', width: '100%' }}>
            <Checkbox
              id={id}
              size={size}
              checked={effectiveChecked}
              indeterminate={effectiveIndeterminate}
              error={isError}
              disabled={isDisabled}
              label={labelText}
              description={descText}
              aria-label={!labelText ? '마케팅 정보 수신 동의' : undefined}
              onChange={handleChange}
            />
            <p
              className="field-help"
              style={{ marginTop: '16px' }}
              role="status"
            >
              상태:{' '}
              <strong>
                {effectiveIndeterminate
                  ? 'Indeterminate (일부 선택)'
                  : effectiveChecked
                    ? 'Checked (선택됨)'
                    : 'Unchecked (미선택)'}
              </strong>
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
              onChange={(e) => setSize(e.target.value as CheckboxSize)}
            />
          </label>
          <label>
            State Preset
            <Select
              size="sm"
              value={stateOption}
              options={stateOptions}
              onChange={(e) => {
                const val = e.target.value;
                setStateOption(val);
                if (val === 'checked') {
                  setChecked(true);
                  setIndeterminate(false);
                } else if (val === 'indeterminate') {
                  setChecked(false);
                  setIndeterminate(true);
                } else if (val === 'default') {
                  setChecked(false);
                  setIndeterminate(false);
                }
              }}
            />
          </label>
          <label>
            Content
            <Select
              size="sm"
              value={contentMode}
              options={contentOptions}
              onChange={(e) => setContentMode(e.target.value)}
            />
          </label>
        </div>
      </div>
      <Code>{codeSnippet}</Code>
    </>
  );
}
