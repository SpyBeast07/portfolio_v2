<script lang="ts">
  import type { Snippet } from 'svelte';

  let { title, description }: { title: string, description: string | Snippet } = $props();
</script>

<div class="mb-12">
  <h1
    class="font-playfair text-5xl font-bold mb-6"
    style="color: var(--foreground);"
  >
    {title}
  </h1>
  <div
    class="max-w-2xl text-lg font-outfit leading-relaxed"
    style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
  >
    {#if typeof description === 'string'}
      {description}
    {:else}
      {@render description()}
    {/if}
  </div>
</div>
