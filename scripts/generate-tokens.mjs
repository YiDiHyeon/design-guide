import { readFileSync, writeFileSync } from 'node:fs';
const spec = JSON.parse(
  readFileSync(
    new URL('../src/tokens/site-spec.json', import.meta.url),
    'utf8',
  ),
);
const header =
  '/* Generated from src/tokens/site-spec.json. Run npm run tokens:generate. */\n';
for (const layer of ['primitive', 'semantic', 'component']) {
  let css = header;
  for (const [mode, values] of Object.entries(spec[layer])) {
    const rule = `:root {\n${Object.entries(values)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n')}\n}\n`;
    css +=
      mode === 'base'
        ? rule
        : `@media (min-width: ${mode === 'tablet' ? 768 : 1280}px) {\n${rule}}\n`;
  }
  writeFileSync(
    new URL(`../src/styles/tokens/${layer}.css`, import.meta.url),
    css,
  );
}
let recipes = header;
for (const [name, values] of Object.entries(spec.typography)) {
  recipes += `.${name} {\n${Object.entries(values)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join('\n')}\n}\n`;
}
writeFileSync(
  new URL('../src/styles/typography.css', import.meta.url),
  recipes,
);

let utilities = header;
for (const name of Object.keys(spec.semantic.base)) {
  const groups = [
    ['--site-text-', 'text-', 'color'],
    ['--site-bg-', 'bg-', 'background-color'],
    ['--site-line-', 'border-', 'border-color'],
  ];
  for (const [prefix, utility, property] of groups) {
    if (name.startsWith(prefix))
      utilities += `@utility ${utility}${name.slice(prefix.length)} { ${property}: var(${name}); }\n`;
  }
  if (name.startsWith('--site-gap-')) {
    const suffix = name.slice('--site-gap-'.length);
    for (const [axis, property] of [
      ['', 'gap'],
      ['x-', 'column-gap'],
      ['y-', 'row-gap'],
    ])
      utilities += `@utility gap-${axis}${suffix} { ${property}: var(${name}); }\n`;
  }
}
writeFileSync(
  new URL('../src/styles/utilities.css', import.meta.url),
  utilities,
);
