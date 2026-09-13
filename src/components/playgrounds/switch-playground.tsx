'use client';

import { useState } from 'react';
import { Select, Switch, type SwitchSize } from '@/components/ui';
import { Code } from '@/components/site/doc-parts';

export function SwitchPlayground() {
  const [size, setSize] = useState<SwitchSize>('md');
  const [checked, setChecked] = useState(true);
  const [state, setState] = useState('default');

  const code = `<Switch\n  size="${size}"\n  checked={${checked}}${state === 'error' ? '\n  error' : ''}${state === 'disabled' ? '\n  disabled' : ''}\n  label="알림 받기"\n  description="새로운 활동을 푸시 알림으로 알려드려요."\n  onChange={(event) => setEnabled(event.target.checked)}\n/>`;

  return (
    <>
      <div className="playground">
        <div className="preview-label">
          <span>LIVE PREVIEW</span>
          <span>클릭하거나 스페이스바로 전환해 보세요</span>
        </div>
        <div className="preview-stage" style={{ minHeight: '160px' }}>
          <Switch
            size={size}
            checked={checked}
            error={state === 'error'}
            disabled={state === 'disabled'}
            label="알림 받기"
            description="새로운 활동을 푸시 알림으로 알려드려요."
            onChange={(event) => setChecked(event.target.checked)}
          />
        </div>
        <div className="playground-controls">
          <label>
            Size
            <Select
              size="sm"
              value={size}
              options={[
                { value: 'sm', label: 'sm (32×20)' },
                { value: 'md', label: 'md (40×24)' },
                { value: 'lg', label: 'lg (48×28)' },
              ]}
              onChange={(event) => setSize(event.target.value as SwitchSize)}
            />
          </label>
          <label>
            State
            <Select
              size="sm"
              value={state}
              options={[
                { value: 'default', label: 'default' },
                { value: 'error', label: 'error' },
                { value: 'disabled', label: 'disabled' },
              ]}
              onChange={(event) => setState(event.target.value)}
            />
          </label>
        </div>
      </div>
      <Code>{code}</Code>
    </>
  );
}
