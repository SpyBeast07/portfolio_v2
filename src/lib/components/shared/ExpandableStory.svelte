<script lang="ts">
  import { slide } from 'svelte/transition';

  let { description, story, className = "" }: { description: string, story?: string, className?: string } = $props();
  let isExpanded = $state(false);

  function toggleExpanded() {
    isExpanded = !isExpanded;
  }
</script>

<div class="flex flex-col items-start mb-4">
  <div
    class={className}
    style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
  >
    {@html description}
  </div>
  {#if story}
    <div class="flex flex-col items-start w-full">
      <button
        onclick={toggleExpanded}
        class="text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 mb-2 mt-2"
      >
        Read story <span class={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>↓</span>
      </button>
      
      {#if isExpanded}
        <div
          transition:slide
          class={className}
          style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
        >
          {@html story}
        </div>
      {/if}
    </div>
  {/if}
</div>
