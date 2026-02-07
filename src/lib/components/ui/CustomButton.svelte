<script lang="ts">
  import type { Snippet } from 'svelte';

  let { href, children, class: className = "" }: { href: string, children: Snippet, class?: string } = $props();

  function handleMouseEnter(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    target.style.backgroundColor = "color-mix(in oklab, var(--foreground) 8%, var(--background))";
    target.style.transform = "scale(1.05)";
  }

  function handleMouseLeave(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    target.style.backgroundColor = "color-mix(in oklab, var(--background) 85%, transparent)";
    target.style.transform = "scale(1)";
  }
</script>

<a
  {href}
  class={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${className}`}
  style="color: var(--foreground); border: 1px solid color-mix(in oklab, var(--foreground) 15%, transparent); background-color: color-mix(in oklab, var(--background) 85%, transparent);"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  {@render children()}
</a>
