import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import test, { after } from 'node:test';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const output = mkdtempSync(
  fileURLToPath(new URL('../node_modules/.select-test-', import.meta.url)),
);
after(() => rmSync(output, { recursive: true, force: true }));

for (const name of ['field-context', 'field', 'select']) {
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
const { Select } = require(`${output}/select.js`);

const options = [
  { value: 'seoul', label: '서울', description: '대한민국의 수도', group: '국내' },
  { value: 'busan', label: '부산', description: '해양 관광 도시', group: '국내' },
  { value: 'paris', label: '파리', description: '예술의 수도', group: '해외' },
  { value: 'tokyo', label: '도쿄', description: '메트로폴리스', group: '해외', disabled: true },
];

test('Select: renders visual combobox trigger and hidden native select', () => {
  const html = renderToStaticMarkup(
    h(Select, {
      options,
      value: 'seoul',
      placeholder: '도시 선택',
    }),
  );

  assert.match(html, /role="combobox"/);
  assert.match(html, /<select\b[^>]*class="[^"]*ds-select-native-hidden[^"]*"/);
  assert.match(html, />서울<\/span>/);
  assert.match(html, /data-state="default"/);
});

test('Select: multi-select tags mode renders chips for selected items', () => {
  const html = renderToStaticMarkup(
    h(Select, {
      options,
      multiple: true,
      displayMode: 'tags',
      value: ['seoul', 'busan'],
    }),
  );

  assert.match(html, /class="[^"]*ds-select-tag[^"]*"/);
  assert.match(html, />서울<\/span>/);
  assert.match(html, />부산<\/span>/);
  assert.match(html, /aria-label="제거: 서울"/);
  assert.match(html, /aria-label="제거: 부산"/);
});

test('Select: multi-select summary mode renders formatted summary text', () => {
  const html = renderToStaticMarkup(
    h(Select, {
      options,
      multiple: true,
      displayMode: 'summary',
      value: ['seoul', 'busan', 'paris'],
    }),
  );

  assert.match(html, /class="[^"]*ds-select-summary-text[^"]*"/);
  assert.match(html, /서울 외 2개/);
});

test('Select: clearable renders clear button when value exists', () => {
  const html = renderToStaticMarkup(
    h(Select, {
      options,
      value: 'seoul',
      clearable: true,
    }),
  );

  assert.match(html, /class="[^"]*ds-select-clear-btn[^"]*"/);
  assert.match(html, /aria-label="선택 초기화"/);
});

test('Select: error and disabled states propagate properly to container and trigger', () => {
  const errorHtml = renderToStaticMarkup(
    h(Select, {
      options,
      'aria-invalid': 'true',
    }),
  );
  assert.match(errorHtml, /data-state="error"/);

  const disabledHtml = renderToStaticMarkup(
    h(Select, {
      options,
      disabled: true,
    }),
  );
  assert.match(disabledHtml, /data-state="disabled"/);
  assert.match(disabledHtml, /aria-disabled="true"/);
});
