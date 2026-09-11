import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import postcss from 'postcss';
const spec = JSON.parse(
  readFileSync(
    new URL('../src/tokens/core-tokens.json', import.meta.url),
    'utf8',
  ),
);
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const modes = ['base', 'tablet', 'desktop'];
function values(mode) {
  return {
    ...spec.primitive.base,
    ...spec.semantic.base,
    ...(mode !== 'base' ? spec.semantic.tablet : {}),
    ...(mode === 'desktop' ? spec.semantic.desktop : {}),
    ...spec.component.base,
    '--font-pretendard': 'Pretendard',
  };
}
function resolve(name, mode = 'base', seen = new Set()) {
  const value = values(mode)[name];
  assert.ok(value, `Missing ${name}`);
  assert.ok(!seen.has(name), `Cycle ${name}`);
  return value.replace(/var\((--[\w-]+)\)/g, (_, ref) =>
    resolve(ref, mode, new Set([...seen, name])),
  );
}
test('all token references resolve in mobile, tablet and desktop', () => {
  for (const mode of modes)
    for (const name of Object.keys(values(mode))) resolve(name, mode);
});
test('generated CSS preserves every name, value and breakpoint in the specification', () => {
  for (const layer of ['primitive', 'semantic', 'component']) {
    const actual = {};
    postcss
      .parse(read(`../src/styles/tokens/${layer}.css`))
      .walkDecls((decl) => {
        let parent = decl.parent;
        while (parent && parent.type !== 'atrule') parent = parent.parent;
        const mode = !parent
          ? 'base'
          : parent.params.includes('768')
            ? 'tablet'
            : 'desktop';
        (actual[mode] ??= {})[decl.prop] = decl.value
          .replace(/\s+/g, ' ')
          .trim();
      });
    assert.deepEqual(actual, spec[layer]);
  }
});
test('core token namespace is independent and consistent', () => {
  for (const layer of ['primitive', 'semantic', 'component'])
    for (const group of Object.values(spec[layer]))
      for (const name of Object.keys(group))
        assert.ok(name.startsWith('--guide-'), `Unexpected namespace: ${name}`);
});
test('responsive type and stable spacing follow the core policy', () => {
  assert.deepEqual(
    modes.map((m) => resolve('--guide-tit-display-hero', m)),
    ['36px', '40px', '40px'],
  );
  assert.deepEqual(
    modes.map((m) => resolve('--guide-sp-md', m)),
    ['16px', '16px', '16px'],
  );
  assert.deepEqual(
    modes.map((m) => resolve('--guide-gap-md', m)),
    ['12px', '12px', '12px'],
  );
});
test('Button uses four purposeful sizes and role-first colors', () => {
  const sizes = ['sm', 'md', 'lg', 'xl'];
  assert.deepEqual(
    sizes.map((s) => resolve(`--guide-component-${s}-height`)),
    ['32px', '40px', '48px', '56px'],
  );
  assert.equal(resolve('--guide-radius-button'), '8px');
  assert.equal(resolve('--guide-button-primary-default-bg'), '#38471d');
  assert.equal(resolve('--guide-button-secondary-default-bg'), '#475569');
});
test('document and component CSS contain no undefined variables', () => {
  const css = [
    '../src/app/globals.css',
    '../src/styles/button.css',
    '../src/styles/fields.css',
    '../src/styles/checkbox.css',
    '../src/styles/radio.css',
    '../src/styles/badge.css',
    '../src/styles/landing.css',
    '../src/styles/typography.css',
  ]
    .map(read)
    .join('\n');
  const local = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
  for (const [, name] of css.matchAll(/var\((--[\w-]+)\)/g))
    assert.ok(
      name in values('desktop') || local.has(name),
      `Undefined ${name}`,
    );
});

test('Input and Select expose the shared state contract', () => {
  for (const kind of ['input', 'select']) {
    const names = Object.keys(spec.component.base).filter((name) =>
      name.startsWith(`--guide-${kind}-`),
    );
    assert.equal(names.length, 17);
    for (const state of ['default', 'focus', 'error', 'readonly', 'disabled']) {
      assert.ok(names.includes(`--guide-${kind}-${state}-border`));
    }
    assert.equal(resolve(`--guide-${kind}-error-border`), '#ef4444');
    assert.equal(resolve(`--guide-${kind}-focus-border`), '#38471d');
    assert.equal(resolve(`--guide-${kind}-disabled-bg`), '#cbd5e1');
  }
});

test('core brand colors match the palette specification', () => {
  const expected = {
    '--guide-color-olive': '#38471d',
    '--guide-color-fresh-olive': '#7f9445',
    '--guide-color-butter-yellow': '#f5ca45',
    '--guide-color-cream': '#fff8e5',
    '--guide-color-deep-ink': '#23281d',
    '--guide-color-tomato-coral': '#e66f4f',
  };
  for (const [name, value] of Object.entries(expected))
    assert.equal(resolve(name), value);
});
