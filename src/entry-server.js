import { render } from 'svelte/server';
import App from './App.svelte';

const pages = import.meta.glob('/src/routes/kb/**/+page.svx', { eager: true });
export const routes = Object.keys(pages).map(path => path.replace('/src/routes', '').replace('/+page.svx', ''));
export function renderRoute(path) {
  if (!routes.includes(path)) throw new Error(`Unknown KB route: ${path}`);
  return render(App, { props: { path } });
}
