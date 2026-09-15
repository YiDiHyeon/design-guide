import { spec, resolveToken } from '@/lib/tokens';
import { Table } from './doc-parts';
import { TokenValue } from './token-value';

function isColorToken(name: string, value?: string): boolean {
  if (
    /^--guide-(text-|bg-|line-|brand-|color-|overlay-|icon-.*-color|badge-.*-(bg|line|color)|button-.*-(bg|border|text))/.test(
      name,
    )
  ) {
    return true;
  }
  if (
    name.includes('color') ||
    name.includes('tint') ||
    name.includes('scrim')
  ) {
    return true;
  }
  if (
    value &&
    (/^#[\da-fA-F]{3,8}$/.test(value) || /^(rgb|hsl|color)/.test(value))
  ) {
    return true;
  }
  return false;
}

function isRadiusToken(name: string): boolean {
  return /^--guide-radius-/.test(name);
}

export function TokenCatalog({
  names,
  responsive = false,
}: {
  names: string[];
  responsive?: boolean;
}) {
  const all: Record<string, string> = {
    ...spec.primitive.base,
    ...spec.semantic.base,
    ...spec.component.base,
  };
  return (
    <div className="token-catalog">
      <Table
        headings={
          responsive
            ? ['Token', 'Mobile', 'Tablet ≥768', 'Desktop ≥1280', '현재 값']
            : ['Token', '정의 / 매핑', '현재 값']
        }
        rows={names.map((name) => {
          const isColor = isColorToken(name, all[name]);
          const isRadius = isRadiusToken(name);
          return [
            <div key="name" className="inline-flex items-center gap-2">
              {isColor && (
                <span
                  aria-hidden="true"
                  className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/15 dark:border-white/20 shadow-xs"
                  style={{ backgroundColor: `var(${name})` }}
                />
              )}
              {isRadius && (
                <span
                  aria-hidden="true"
                  className="w-3.5 h-3.5 shrink-0 border border-[var(--guide-color-olive)] bg-surface-warm shadow-xs"
                  style={{ borderRadius: `var(${name})` }}
                />
              )}
              <code>{name}</code>
            </div>,
            ...(responsive
              ? (['base', 'tablet', 'desktop'] as const).map((mode) => (
                  <code key={mode}>{resolveToken(name, mode)}</code>
                ))
              : [<code key="mapping">{all[name]}</code>]),
            <div key="value" className="inline-flex items-center gap-2">
              {isColor && (
                <span
                  aria-hidden="true"
                  className="w-3 h-3 rounded-full shrink-0 border border-black/15 dark:border-white/20 shadow-xs"
                  style={{ backgroundColor: `var(${name})` }}
                />
              )}
              {isRadius && (
                <span
                  aria-hidden="true"
                  className="w-3 h-3 shrink-0 border border-[var(--guide-color-olive)] bg-surface-warm shadow-xs"
                  style={{ borderRadius: `var(${name})` }}
                />
              )}
              <TokenValue name={name} />
            </div>,
          ];
        })}
      />
    </div>
  );
}
