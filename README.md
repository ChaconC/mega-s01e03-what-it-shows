# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.


## Findings added for #4471

The review page is `src/routes/kb/incidents/4471-findings/+page.svx`. It reuses
the exported components and records two distinct cause groups, report-ID
deduplication, intake-tag disagreement and the unresolved timing anomalies.
The accepted decision 0001 and original exported source files are preserved.

- Parser issue draft: [issue-drafts/parser-issue.md](issue-drafts/parser-issue.md)
- Form-hint issue draft: [issue-drafts/hint-issue.md](issue-drafts/hint-issue.md)
- Rendered findings: [rendered/kb/incidents/4471-findings/index.html](rendered/kb/incidents/4471-findings/index.html)

## Build and view

Requires Node 22.12 or newer, npm, and Python 3 for the preview command. The
validated toolchain uses Node 26.13.0. Dependencies are pinned in package-lock.json.

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run preview
```

Open http://127.0.0.1:4173/kb/incidents/4471-findings/ in a browser. The complete
KB starts at http://127.0.0.1:4173/kb/. Serve `rendered/` as the web root; opening
the HTML directly with file:// does not resolve its root-relative assets.

The build produces real Svelte server-rendered HTML plus CSS and browser
hydration for the interactive dedupe explorer. Counts are computed from the
export at render time. This is a snapshot, not a connection to a live support desk.
The source frontmatter contains the course-required signature; the visible
page derives its desk reference using the supplied RenderStamp component.

Rendering references: [Vite SSR](https://vite.dev/guide/ssr.html),
[Svelte server rendering](https://svelte.dev/docs/svelte/svelte-server).

Private session logs, start responses and the local runtime are kept outside
this directory and are not part of the deliverable.
