# Shared month-first parser misreads day-first tenant dates: 379 reports from #4471

## Scope and count

379 unique reports in the 2026-10-04 export belong to the `parser` group according to the supplied `src/lib/kb/causes.ts`, using tenant locale and booking-form configuration. They span 11 tenants, first received 2026-04-01 and last received 2026-10-04.

The export contains 427 rows and 412 unique report IDs. Deduplicate by ID before filtering `mergedInto === 4471` and grouping. Intake tags are not the cause: this group contains 356 reports tagged `parser` and 23 tagged `hint`.

## Expected and observed behavior

Day-first tenant dates should retain their intended day and month. The shared parser reads dates month-first, swapping the meaning of ambiguous dates. R-41200 reports an intended 7 April appearing as 4 July; R-41201 reports the reverse. The export contains classification logic and report evidence, not the product parser implementation, so these are reported reproductions rather than a live product test.

## Separate problem

33 form-channel reports from day-first tenants using booking-v3 belong to the separate hint problem. Correcting the shared parser alone does not correct the MM/DD/YYYY hint on that form.

## Unresolved evidence

Five reports counted in this group were separately noted by the desk: R-41202, R-41209, R-41236, R-41344 and R-41620. Their bodies describe one-day differences, timing anomalies or disagreement across locations. The supplied classifier files them under `parser` based on tenant and channel. That classification does not prove their symptoms share the parser's root cause. Preserve their IDs and investigate; do not silently subtract them or claim a confirmed timezone defect.

## Proposed acceptance checks

- Verify an unambiguous date contract for each input path; ambiguous day-first dates must retain their intended value.
- Cover the day-first tenant locales in the export and test month-first locales as controls.
- Reconcile all 379 assigned reports and retain the five anomalies for explicit follow-up.
- Keep the booking-v3 hint issue separate; do not close it solely because the shared parser changes.

## Evidence

- `src/lib/data/reports-4471.json`
- `src/lib/data/tenants/*.json`
- `src/lib/data/desk-notes.json`
- `src/lib/kb/causes.ts`, `locales.ts`, `CauseTable.svelte`

Counts describe the downloaded export, not an independently verified live desk state.
