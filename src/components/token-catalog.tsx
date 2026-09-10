import { spec, resolveToken } from '@/lib/tokens';
import { Table } from './doc-parts';
import { TokenValue } from './token-value';
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
        rows={names.map((name) => [
          <code key="name">{name}</code>,
          ...(responsive
            ? (['base', 'tablet', 'desktop'] as const).map((mode) => (
                <code key={mode}>{resolveToken(name, mode)}</code>
              ))
            : [<code key="mapping">{all[name]}</code>]),
          <TokenValue key="value" name={name} />,
        ])}
      />
    </div>
  );
}
