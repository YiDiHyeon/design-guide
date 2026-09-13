import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import test, { after } from 'node:test';
import { createElement as h, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

// Compile the real TSX components for Node without adding a test runtime.
// Keeping temporary output under node_modules preserves dependency resolution.
const output = mkdtempSync(
  fileURLToPath(new URL('../node_modules/.field-test-', import.meta.url)),
);
after(() => rmSync(output, { recursive: true, force: true }));
for (const name of ['field-context', 'field', 'input', 'textarea', 'select']) {
  const source = readFileSync(
    new URL(`../src/components/ui/${name}.tsx`, import.meta.url),
    'utf8',
  );
  writeFileSync(
    `${output}/${name}.js`,
    ts.transpileModule(source, {
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.CommonJS,
      },
    }).outputText,
  );
}
const require = createRequire(import.meta.url);
const { Field } = require(`${output}/field.js`);
const { Input } = require(`${output}/input.js`);
const { Textarea } = require(`${output}/textarea.js`);
const { Select } = require(`${output}/select.js`);
const options = [{ value: 'seoul', label: '서울' }];
const controls = [
  [Input, {}],
  [Textarea, {}],
  [Select, { options }],
];
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const controlTag = (html) =>
  html.match(/<(?:input|textarea|select)\b[^>]*>/)[0];
const render = (field, Component = Input, props = {}) =>
  renderToStaticMarkup(
    h(Field, { label: '이름', ...field }, h(Component, props)),
  );

for (const [Component, defaults] of controls) {
  test(`${Component.name}: label and visible description connect during SSR`, () => {
    const html = render(
      { description: '도움말', required: true, size: 'lg' },
      Component,
      defaults,
    );
    const control = controlTag(html);
    assert.equal(
      attr(html.match(/<label\b[^>]*>/)[0], 'for'),
      attr(control, 'id'),
    );
    assert.equal(
      attr(control, 'aria-describedby'),
      attr(html.match(/<p\b[^>]*>/)[0], 'id'),
    );
    assert.match(control, /\srequired=""/);
    assert.match(html, /data-size="lg"/);
  });

  test(`${Component.name}: explicit props override Field without breaking its label`, () => {
    const html = render(
      {
        controlId: 'parent-id',
        size: 'lg',
        disabled: true,
        readOnly: true,
        required: true,
        invalid: true,
        errorMessage: '오류',
        description: '도움말',
      },
      Component,
      {
        ...defaults,
        id: 'custom-id',
        size: 'sm',
        disabled: false,
        readOnly: false,
        required: false,
        'aria-invalid': 'false',
      },
    );
    const control = controlTag(html);
    assert.equal(attr(control, 'id'), 'custom-id');
    assert.match(html, /<label[^>]*for="custom-id"/);
    assert.match(html, /data-size="sm"/);
    assert.match(html, /data-state="default"/);
    assert.doesNotMatch(control, /\s(?:disabled|readOnly|required)=""/);
    assert.doesNotMatch(html, /ds-field-indicator|>오류</);
    assert.match(html, />도움말</);
  });

  test(`${Component.name}: standalone native props and defaults still work`, () => {
    const html = renderToStaticMarkup(
      h(Component, {
        ...defaults,
        id: 'standalone',
        name: 'entry',
        'aria-describedby': 'outside',
        disabled: true,
      }),
    );
    assert.equal(attr(controlTag(html), 'aria-describedby'), 'outside');
    assert.equal(attr(controlTag(html), 'name'), 'entry');
    assert.match(html, /data-size="md"/);
    assert.match(html, /data-state="disabled"/);
  });
}

test('error replaces description and only existing message/count IDs are referenced', () => {
  const html = render(
    {
      description: '도움말',
      errorMessage: '수정해 주세요.',
      count: { current: 3, max: 2 },
    },
    Input,
    { 'aria-describedby': 'outside outside' },
  );
  const ids = attr(controlTag(html), 'aria-describedby').split(' ');
  assert.equal(ids.filter((id) => id === 'outside').length, 1);
  for (const id of ids.filter((id) => id !== 'outside'))
    assert.ok(html.includes(`id="${id}"`));
  assert.match(ids[1], /-error$/);
  assert.match(ids[2], /-count$/);
  assert.doesNotMatch(html, />도움말</);
  assert.match(controlTag(html), /aria-invalid="true"/);
  assert.match(html, /data-exceeded="true"/);
  assert.equal((html.match(/aria-live=/g) ?? []).length, 1);
});

test('invalid=false preserves help when an error is prepared in advance', () => {
  const html = render({
    invalid: false,
    description: '도움말',
    errorMessage: '오류',
  });
  assert.match(attr(controlTag(html), 'aria-describedby'), /-description$/);
  assert.doesNotMatch(html, />오류</);
});

test('missing help and error leave no dangling description reference', () => {
  assert.equal(
    attr(controlTag(render({ invalid: true })), 'aria-describedby'),
    undefined,
  );
});

test('generated IDs are unique across multiple fields, including error and count', () => {
  const html = renderToStaticMarkup(
    h(
      Fragment,
      null,
      ...[1, 2, 3].map((key) =>
        h(
          Field,
          {
            key,
            label: '이름',
            errorMessage: '오류',
            count: { current: 0, max: 10 },
          },
          h(Input),
        ),
      ),
    ),
  );
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, 9);
  assert.equal(new Set(ids).size, ids.length);
});

test('root id and controlId are distinct, and suffix stays outside label and control context', () => {
  const html = render({
    id: 'field-root',
    controlId: 'field-control',
    suffix: h('button', { type: 'button' }, '확인'),
  });
  assert.match(html, /^<div id="field-root"/);
  assert.equal(attr(controlTag(html), 'id'), 'field-control');
  assert.doesNotMatch(html.match(/<label\b.*?<\/label>/)[0], /<button/);
  assert.match(html, /<button type="button">확인<\/button>/);
});

test('readOnly Select links its visible control and retains the submitted value', () => {
  const html = render(
    { controlId: 'destination', readOnly: true, description: '도시' },
    Select,
    { options, name: 'destination', defaultValue: 'seoul' },
  );
  const control = controlTag(html);
  assert.equal(attr(control, 'id'), 'destination');
  assert.equal(attr(control, 'value'), '서울');
  assert.match(attr(control, 'aria-describedby'), /-description$/);
  assert.match(
    html,
    /<input type="hidden"[^>]*name="destination"[^>]*value="seoul"/,
  );
});

test('indicator presentation never changes native required semantics', () => {
  assert.match(
    controlTag(render({ required: true, indicator: 'none' })),
    /required=""/,
  );
  assert.doesNotMatch(
    render({ required: true, indicator: 'none' }),
    /ds-field-indicator/,
  );
  assert.match(render({ indicator: 'optional' }), /\(선택\)/);
  assert.doesNotMatch(
    render({ required: true, indicator: 'optional' }),
    /\(선택\)/,
  );
});

test('Field resolves a lazy child received through a Server Component boundary', () => {
  // Flight can deliver an element as a lazy React node, rather than a plain element.
  const streamedChild = {
    $$typeof: Symbol.for('react.lazy'),
    _payload: h(Input, { id: 'streamed-control', required: true }),
    _init: (payload) => payload,
  };
  const html = renderToStaticMarkup(
    h(Field, { label: '이름', description: '도움말' }, streamedChild),
  );
  assert.equal(attr(controlTag(html), 'id'), 'streamed-control');
  assert.match(html, /<label[^>]*for="streamed-control"/);
  assert.match(controlTag(html), /required=""/);
  assert.match(attr(controlTag(html), 'aria-describedby'), /-description$/);
});

test('Field still rejects multiple controls instead of sharing one ID between them', () => {
  assert.throws(() =>
    renderToStaticMarkup(
      h(Field, { label: '이름' }, [
        h(Input, { key: 'a' }),
        h(Input, { key: 'b' }),
      ]),
    ),
  );
});
