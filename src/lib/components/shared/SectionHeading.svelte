<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children, class: className = "" }: { children: Snippet, class?: string } = $props();
</script>

<h2
  class={`font-playfair text-3xl font-bold mb-8 ${className}`}
  style="color: var(--foreground);"
>
  {@render children()}
</h2>
