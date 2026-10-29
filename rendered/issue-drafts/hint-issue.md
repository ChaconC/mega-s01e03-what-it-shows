# booking-v3 date hint conflicts with day-first parsing: 33 reports from #4471

## Scope and count

33 unique reports in the 2026-10-04 export belong to the `hint` group according to the supplied `src/lib/kb/causes.ts`. All arrive through the form channel for day-first tenants using booking-v3: alder.physio, copper.studio and pale.harbour. First received 2026-04-17; last received 2026-09-22.

Deduplicate the export by report ID, select `mergedInto === 4471`, then classify using tenant locale, form version and report channel. The group includes 18 intake-tagged `hint` reports and 15 intake-tagged `parser` reports. Browser locale and intake tags do not determine the cause.

## Expected and observed behavior

The displayed date hint should agree with the date order the form accepts for that tenant. booking-v3 prints MM/DD/YYYY while the day-first tenant's form reads dates in tenant order. Following the hint therefore produces swapped dates.

Reported examples: R-41230 describes 6 January becoming 1 June; R-41241 describes 6 August becoming 8 June; R-41251 describes 7 January becoming 1 July. The export establishes the classification rule and reported behavior, not a tested production reproduction.

## Why this needs its own issue

The shared month-first parser problem is a distinct input path. A day-first booking-v3 tenant's app report belongs to the parser group, while its form report belongs here. Matching subject text does not establish a duplicate. These reports were merged into #4471 and lacked a ticket of their own in the exported KB.

## Proposed acceptance checks

- Align the displayed hint and accepted input format for each tenant locale.
- Verify ambiguous dates through booking-v3 for all three affected tenants.
- Include booking-v2 and month-first tenants as controls.
- Reconcile the 33 report IDs separately from the parser issue and stop deduplicating on subject alone.

## Evidence

- `src/lib/data/reports-4471.json`
- `src/lib/data/tenants/alder.physio.json`, `copper.studio.json`, `pale.harbour.json`
- `src/lib/kb/causes.ts`, `locales.ts`, `DedupeExplorer.svelte`

Counts describe the downloaded export, not an independently verified live desk state.

## Engineering disposition, 5 October

The course engineering update reports #4471 closed on 5 October and the hint issue WON'T FIX because booking-v3 was retired. This ticket closes as not planned, not as a corrected hint.

Source: https://hq.mega.dev/challenges/what-it-shows (engineering update). The export counts remain historical impact evidence. No live product reproduction was available for independent deployment verification.
