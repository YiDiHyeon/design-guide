'use client';

import { useState } from 'react';
import {
  Badge,
  badgeVariantsList,
  badgeAppearancesList,
  type BadgeVariant,
  type BadgeAppearance,
  Select,
  Input,
} from '@/components/ui';
import { Code } from '@/components/site/doc-parts';
import { Sparkles, ArrowRight } from 'lucide-react';

const variantOptions = badgeVariantsList.map((v) => ({ value: v, label: v }));
const appearanceOptions = badgeAppearancesList.map((a) => ({
  value: a,
  label: a,
}));

const iconOptions = [
  { value: 'none', label: 'None' },
  { value: 'start', label: 'Start Icon' },
  { value: 'end', label: 'End Icon' },
  { value: 'both', label: 'Both Icons' },
] as const;

export function BadgePlayground() {
  const [variant, setVariant] = useState<BadgeVariant>('default');
  const [appearance, setAppearance] = useState<BadgeAppearance>('solid');
  const [iconMode, setIconMode] = useState<'none' | 'start' | 'end' | 'both'>(
    'none',
  );
  const [text, setText] = useState('PROMO');

  const startIcon =
    iconMode === 'start' || iconMode === 'both' ? <Sparkles /> : undefined;
  const endIcon =
    iconMode === 'end' || iconMode === 'both' ? <ArrowRight /> : undefined;

  const codeSnippet = `<Badge
  variant="${variant}"
  appearance="${appearance}"${startIcon ? '\n  startIcon={<Sparkles />}' : ''}${endIcon ? '\n  endIcon={<ArrowRight />}' : ''}
>
  ${text || 'Badge'}
</Badge>`;

  return (
    <>
      <div className="playground">
        <div className="preview-label">
          <span>LIVE PREVIEW</span>
          <span>8가지 컬러와 Solid/Line 스타일을 조합해 보세요</span>
        </div>
        <div
          className="preview-stage"
          style={{
            minHeight: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Badge
              variant={variant}
              appearance={appearance}
              startIcon={startIcon}
              endIcon={endIcon}
            >
              {text || 'Badge'}
            </Badge>
          </div>
        </div>

        <div className="playground-controls">
          <label>
            Variant
            <Select
              size="sm"
              value={variant}
              options={variantOptions}
              onChange={(e) => setVariant(e.target.value as BadgeVariant)}
            />
          </label>
          <label>
            Appearance
            <Select
              size="sm"
              value={appearance}
              options={appearanceOptions}
              onChange={(e) => setAppearance(e.target.value as BadgeAppearance)}
            />
          </label>
          <label>
            Icons
            <Select
              size="sm"
              value={iconMode}
              options={iconOptions}
              onChange={(e) =>
                setIconMode(e.target.value as 'none' | 'start' | 'end' | 'both')
              }
            />
          </label>
          <label>
            Label Text
            <Input
              size="sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="텍스트 입력"
            />
          </label>
        </div>
      </div>
      <Code>{codeSnippet}</Code>
    </>
  );
}
