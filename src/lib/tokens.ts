import spec from '@/tokens/core-tokens.json';
export { spec };
export type TokenMode = 'base' | 'tablet' | 'desktop';
export function tokenMap(mode: TokenMode = 'base'): Record<string, string> {
  return {
    ...spec.primitive.base,
    ...spec.semantic.base,
    ...(mode !== 'base' ? spec.semantic.tablet : {}),
    ...(mode === 'desktop' ? spec.semantic.desktop : {}),
    ...spec.component.base,
  };
}
export function resolveToken(
  name: string,
  mode: TokenMode = 'base',
  seen = new Set<string>(),
): string {
  const value = tokenMap(mode)[name];
  if (!value || seen.has(name)) return name;
  return value.replace(/var\((--[\w-]+)\)/g, (_, ref: string) =>
    resolveToken(ref, mode, new Set([...seen, name])),
  );
}
export const primitiveNames = Object.keys(spec.primitive.base);
export const semanticNames = Object.keys(spec.semantic.base);
export const typographyNames = semanticNames.filter((name) =>
  /^--guide-(tit|txt|nav|price|badge-tag|card-compact|tab-item|form-label)/.test(
    name,
  ),
);
