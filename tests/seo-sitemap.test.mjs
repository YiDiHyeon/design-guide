import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const output = mkdtempSync(
  fileURLToPath(new URL('../node_modules/.seo-test-', import.meta.url)),
);
after(() => rmSync(output, { recursive: true, force: true }));

const transpile = (relPath, outName) => {
  const source = readFileSync(new URL(relPath, import.meta.url), 'utf8');
  writeFileSync(
    `${output}/${outName}.js`,
    ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
  );
};

transpile('../src/lib/docs.ts', 'docs');
transpile('../src/app/sitemap.ts', 'sitemap');
transpile('../src/app/robots.ts', 'robots');

// Mock @/lib/docs resolution for sitemap in CommonJS
const origLoad = require('node:module')._load;
require('node:module')._load = function (request, ...rest) {
  if (request === '@/lib/docs') {
    return require(`${output}/docs.js`);
  }
  return origLoad.apply(this, [request, ...rest]);
};

const { documents } = require(`${output}/docs.js`);
const sitemapFn = require(`${output}/sitemap.js`).default;
const robotsFn = require(`${output}/robots.js`).default;

test('Sitemap generates entries for root and all documentation pages', async () => {
  const routes = await sitemapFn();

  assert.ok(Array.isArray(routes), 'sitemap should return an array');

  // Must include root route
  const rootRoute = routes.find(
    (r) =>
      r.url === 'https://cabinet-design.vercel.app' ||
      r.url.endsWith('cabinet-design.vercel.app/'),
  );
  assert.ok(rootRoute, 'Root URL must be in sitemap');
  assert.equal(rootRoute.priority, 1.0);
  assert.equal(rootRoute.changeFrequency, 'daily');

  // Must include getting-started
  const gettingStartedRoute = routes.find((r) =>
    r.url.includes('/overview/getting-started'),
  );
  assert.ok(
    gettingStartedRoute,
    'Getting Started route must be in sitemap with high priority',
  );
  assert.equal(gettingStartedRoute.priority, 0.9);

  // Must include every doc defined in documents
  for (const doc of documents) {
    const docUrl = `/${doc.category}/${doc.slug}`;
    const found = routes.some((r) => r.url.endsWith(docUrl));
    assert.ok(found, `Doc ${docUrl} must be present in sitemap`);
  }

  assert.equal(
    routes.length,
    documents.length + 1,
    `Total routes should equal documents count (${documents.length}) + 1 (root)`,
  );
});

test('Robots.txt allows all crawlers and points to valid sitemap', async () => {
  const robots = await robotsFn();

  assert.ok(robots, 'robots config should be returned');
  assert.ok(robots.rules, 'robots rules must exist');
  assert.ok(
    robots.sitemap.endsWith('/sitemap.xml'),
    'robots must specify sitemap.xml location',
  );
});
