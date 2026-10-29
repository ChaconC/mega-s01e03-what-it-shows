import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const findings = 'rendered/kb/incidents/4471-findings/index.html';
const clean = (html) => html.replace(/<!--[^]*?-->/g, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

test('findings render both tenant-derived causes after report-ID deduplication', () => {
  assert.ok(existsSync(findings), 'The findings page must be rendered from its .svx source');
  const html = readFileSync(findings, 'utf8');
  const text = clean(html);
  assert.match(text, /412 reports merged into #4471/);
  assert.match(text, /2 causes/);
  assert.match(text, /parser 379 parser ×356 · hint ×23 11/);
  assert.match(text, /hint 33 hint ×18 · parser ×15 3/);
  assert.match(text, /5 reports read as a one-day move/);
  assert.match(text, /desk ref DR-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}/);
});

test('all KB pages render real HTML and locally available styling and hydration assets', () => {
  for (const route of ['kb', 'kb/incidents/4471', 'kb/incidents/4471-findings', 'kb/triage/dedupe', 'kb/decisions/0001-dedupe-by-subject']) {
    const file = `rendered/${route}/index.html`;
    assert.ok(existsSync(file), `Missing ${route}`);
    const html = readFileSync(file, 'utf8');
    assert.match(html, /<h1[\s>]/);
    if (!route.includes('/decisions/')) assert.match(html, /<table/);
    const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)].map(m => m[1]);
    assert.ok(assets.some(p => p.endsWith('.js')), 'Hydration script missing');
    assert.ok(assets.some(p => p.endsWith('.css')), 'Styles missing');
    for (const asset of assets) assert.ok(existsSync(`rendered${asset}`), `Missing ${asset}`);
  }
});

test('findings evidence links resolve within the rendered deliverable', () => {
  const html = readFileSync(findings, 'utf8');
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    const url = new URL(href, 'http://localhost/kb/incidents/4471-findings/');
    if (url.origin !== 'http://localhost') continue;
    const file = `rendered${url.pathname}`;
    assert.ok(existsSync(file) || existsSync(`${file}/index.html`), `Broken local link: ${href}`);
  }
});
