<script lang="ts">
  let { date, readTime }: { date: string; readTime: string } = $props();
</script>

<div class="meta-row" aria-label="Article metadata">
  <span class="meta-badge">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
    {date}
  </span>
  <span class="meta-divider" aria-hidden="true">•</span>
  <span class="meta-badge">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
    {readTime}
  </span>
</div>

<style>
  .meta-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-outfit), sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--foreground) 50%, transparent);
  }

  .meta-badge {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .meta-divider {
    opacity: 0.4;
  }
</style>
