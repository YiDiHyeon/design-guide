'use client';
import { useState } from 'react';
import { Plus, ArrowUpRight, Check } from 'lucide-react';
import {
  Button,
  buttonVariants,
  buttonSizes,
  type ButtonProps,
} from './button';
import { Select } from './select';

const variantOptions = buttonVariants.map((value) => ({
  value,
  label: value,
}));

const sizeOptions = buttonSizes.map((value) => ({
  value,
  label: value,
}));

export function ButtonPlayground() {
  const [variant, setVariant] =
    useState<NonNullable<ButtonProps['variant']>>('solid');
  const [size, setSize] = useState<NonNullable<ButtonProps['size']>>('md');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const iconOnly = variant === 'line-icon' || variant.startsWith('circle-');
  const snippet = `<Button variant="${variant}" size="${size}"${iconOnly ? ' aria-label="추가"' : ''}${disabled ? ' disabled' : ''}${loading ? ' loading' : ''}>\n  ${iconOnly ? '<Plus size={16} aria-hidden="true" />' : loading ? '저장 중' : '시작하기'}\n</Button>`;
  return (
    <div className="playground">
      <div className="preview-label">
        <span>
          <span className="green-dot" />
          LIVE PREVIEW
        </span>
        <span>
          직접 눌러보세요{' '}
          <ArrowUpRight
            size={12}
            aria-hidden="true"
            style={{ display: 'inline', verticalAlign: '-1px' }}
          />
        </span>
      </div>
      <div className="preview-stage">
        <Button
          aria-label={iconOnly ? (loading ? '추가 중' : '추가') : undefined}
          variant={variant}
          size={size}
          disabled={disabled}
          loading={loading}
          onClick={() => setClicks((n) => n + 1)}
        >
          {iconOnly
            ? !loading && <Plus size={16} aria-hidden="true" />
            : loading
              ? '저장 중'
              : '시작하기'}
          {!loading && !iconOnly && (
            <ArrowUpRight size={15} aria-hidden="true" />
          )}
        </Button>
        <span className="preview-feedback" role="status">
          {clicks
            ? `${clicks}번 실행했어요`
            : '하나의 명확한 행동을 안내하세요.'}
        </span>
      </div>
      <div className="playground-controls">
        <label>
          Variant
          <Select
            size="sm"
            value={variant}
            options={variantOptions}
            onChange={(e) => {
              setVariant(e.target.value as typeof variant);
              setCopied(false);
            }}
          />
        </label>
        <label>
          Size
          <Select
            size="sm"
            value={size}
            options={sizeOptions}
            onChange={(e) => {
              setSize(e.target.value as typeof size);
              setCopied(false);
            }}
          />
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => {
              setDisabled(e.target.checked);
              setCopied(false);
            }}
          />
          Disabled
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={loading}
            onChange={(e) => {
              setLoading(e.target.checked);
              setCopied(false);
            }}
          />
          Loading
        </label>
      </div>
      <div className="preview-code">
        <pre>
          <code>{snippet}</code>
        </pre>
        <button
          type="button"
          onClick={async () => {
            setCopyError(false);
            try {
              await navigator.clipboard.writeText(snippet);
              setCopied(true);
            } catch {
              setCopied(false);
              setCopyError(true);
            }
          }}
          aria-label="예제 코드 복사"
        >
          {copied ? (
            <>
              <Check
                size={12}
                aria-hidden="true"
                style={{
                  display: 'inline',
                  verticalAlign: '-1px',
                  marginRight: '3px',
                }}
              />
              복사됨
            </>
          ) : (
            '복사'
          )}
        </button>
        <span className="sr-only" role="status">
          {copied ? '코드를 복사했습니다.' : ''}
        </span>
      </div>
      {copyError && (
        <p role="alert" className="copy-error">
          복사하지 못했습니다. 위 코드를 직접 선택해 복사해 주세요.
        </p>
      )}
    </div>
  );
}
