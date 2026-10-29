<script>
  import './site.css';
  const pages = import.meta.glob('/src/routes/kb/**/+page.svx', { eager: true });
  let { path } = $props();
  const Page = $derived(pages[`/src/routes${path.replace(/\/$/, '')}/+page.svx`]?.default);
</script>

{#if Page}
  <Page />
{:else}
  <main><h1>Page not found</h1><a href="/kb/">Open the knowledge base</a></main>
{/if}
