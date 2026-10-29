import { build } from 'vite';
import { readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises';

await rm('rendered', { recursive: true, force: true });
await build({ build: { outDir: 'rendered', emptyOutDir: true } });
await build({ build: { ssr: 'src/entry-server.js', outDir: '.build/server', emptyOutDir: true } });
const { routes, renderRoute } = await import('../.build/server/entry-server.js');
const template = await readFile('rendered/index.html', 'utf8');
for (const route of routes) {
  const { head, body } = renderRoute(route);
  const dir = `rendered${route}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, template.replace('<!--ssr-head-->', head).replace('<!--ssr-body-->', body));
}
await writeFile('rendered/index.html', '<!doctype html><html lang="en"><meta charset="utf-8"><title>Support knowledge base</title><meta http-equiv="refresh" content="0;url=/kb/"><a href="/kb/">Open the knowledge base</a></html>');
await cp('issue-drafts', 'rendered/issue-drafts', { recursive: true });
console.log(`Rendered ${routes.length} KB pages with client assets.`);
