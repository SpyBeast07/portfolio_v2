<script lang="ts">
  import { page } from '$app/stores';

  let { title }: { title: string } = $props();

  let isCopied = $state(false);
  // Full canonical URL we want to share
  let fullUrl = $derived($page.url.href);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out: ${title}`,
          url: fullUrl
        });
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    }
    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(fullUrl);
      isCopied = true;
      setTimeout(() => {
        isCopied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  }
</script>

<button
    class="share-button"
    onclick={handleShare}
    aria-label="Share this article"
    title="Copy link to clipboard"
  >
    {#if isCopied}
      <!-- Check Icon -->
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Copied
    {:else}
      <!-- Share Icon (Link) -->
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
      Share
    {/if}
  </button>

<style>
  .share-button {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.9rem;
    border-radius: 9999px;
    font-family: var(--font-outfit), sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s, transform 0.2s;
    width: 100%;
    justify-content: center;
    color: color-mix(in oklab, var(--foreground) 70%, transparent);
    background-color: color-mix(in oklab, var(--foreground) 5%, transparent);
    border: 1px solid color-mix(in oklab, var(--foreground) 12%, transparent);
  }

  .share-button:hover {
    background-color: color-mix(in oklab, var(--foreground) 10%, transparent) !important;
    color: var(--foreground) !important;
    transform: scale(1.02);
  }
</style>
