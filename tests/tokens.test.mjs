import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import postcss from 'postcss';
const spec = JSON.parse(
  readFileSync(
    new URL('../src/tokens/site-spec.json', import.meta.url),
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
test('source inventories remain complete', () => {
  assert.equal(Object.keys(spec.primitive.base).length, 110);
  assert.equal(Object.keys(spec.semantic.base).length, 153);
  assert.equal(Object.keys(spec.semantic.tablet).length, 26);
  assert.equal(Object.keys(spec.semantic.desktop).length, 15);
  assert.equal(Object.keys(spec.component.base).length, 91);
});
test('source responsive typography and separate sp / gap mappings are retained', () => {
  assert.deepEqual(
    modes.map((m) => resolve('--site-tit-display-hero', m)),
    ['30px', '36px', '40px'],
  );
  assert.deepEqual(
    modes.map((m) => resolve('--site-sp-md', m)),
    ['16px', '18px', '20px'],
  );
  assert.deepEqual(
    modes.map((m) => resolve('--site-gap-md', m)),
    ['12px', '12px', '12px'],
  );
});
test('source Button dimensions, radius and colors are retained', () => {
  const sizes = ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];
  assert.deepEqual(
    sizes.map((s) => resolve(`--site-component-${s}-height`)),
    ['24px', '28px', '32px', '36px', '40px', '44px', '48px', '52px', '56px'],
  );
  assert.equal(resolve('--site-radius-button'), '4px');
  assert.equal(resolve('--site-button-solid-default-bg'), '#212121');
  assert.equal(resolve('--site-button-secondary-default-bg'), '#757575');
});
test('document and component CSS contain no undefined variables', () => {
  const css = [
    '../src/app/globals.css',
    '../src/styles/button.css',
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
