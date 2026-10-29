<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import { uniqueById, type Report } from '#lib/kb/causes';
  const unique = uniqueById(reports as Report[]);
  const merged = unique.filter(r => r.mergedInto === 4471);
  const overlap = reports.length - unique.length;
  const julyBatch = merged.filter(r => r.mergedAt?.slice(0, 10) === '2026-07-02');
</script>

<p>
  The export contains <strong>{reports.length}</strong> rows and <strong>{unique.length}</strong> unique report IDs.
  Its <strong>{overlap}</strong> repeated rows are pagination overlap, not additional reports.
  <strong>{merged.length}</strong> unique reports are assigned to #4471.
</p>
<p>
  <strong>{julyBatch.length}</strong> reports were merged on 2 July. That is a filing event, not evidence
  that all those reports arrived that day. Compare the received and merged bars below.
</p>
