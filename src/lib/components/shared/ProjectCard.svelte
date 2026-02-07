<script lang="ts">
  import { ExternalLinkIcon, GithubIcon } from '$lib/components/ui/icons';

  let { title, description, tags, image, githubLink, demoLink }: {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    githubLink?: string;
    demoLink?: string;
  } = $props();

  function handleGithubMouseEnter(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    target.style.backgroundColor = "color-mix(in oklab, var(--foreground) 10%, transparent)";
  }

  function handleGithubMouseLeave(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    target.style.backgroundColor = "color-mix(in oklab, var(--foreground) 5%, transparent)";
  }

  function handleDemoMouseEnter(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "0.9";
  }

  function handleDemoMouseLeave(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "1";
  }
</script>

<div
  class="group relative rounded-3xl transition-all overflow-hidden flex flex-col md:flex-row-reverse h-full"
  style="background-color: color-mix(in oklab, var(--background) 85%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 30%, transparent);"
>
  <!-- Project Image -->
  {#if image}
    <div class="w-full md:w-1/2 p-6 flex items-center justify-center">
      <div class="relative w-full h-48 md:h-full min-h-[200px] rounded-3xl overflow-hidden">
        <img
          src={image}
          alt={title}
          class="object-contain transition-transform duration-500 hover:scale-105 absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  {/if}

  <div class="p-6 flex flex-col flex-1">
    <h3
      class="text-xl font-bold font-playfair mb-2"
      style="color: var(--foreground);"
    >
      {title}
    </h3>
    <p
      class="text-sm leading-relaxed mb-4 flex-1"
      style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
    >
      {description}
    </p>
    <div class="flex flex-wrap gap-2 mb-6">
      {#each tags as tag}
        <span
          class="px-2 py-0.5 text-xs rounded-full"
          style="color: color-mix(in oklab, var(--foreground) 70%, transparent); background-color: color-mix(in oklab, var(--foreground) 5%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
        >
          {tag}
        </span>
      {/each}
    </div>

    <!-- Action Buttons -->
    <div
      class="flex items-center gap-4 mt-auto pt-4"
      style="border-top: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
    >
      {#if githubLink}
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
          style="color: var(--foreground); background-color: color-mix(in oklab, var(--foreground) 5%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
          onmouseenter={handleGithubMouseEnter}
          onmouseleave={handleGithubMouseLeave}
        >
          <GithubIcon width={14} height={14} />
          GitHub
        </a>
      {/if}
      {#if demoLink}
        <a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
          style="color: var(--background); background-color: var(--foreground);"
          onmouseenter={handleDemoMouseEnter}
          onmouseleave={handleDemoMouseLeave}
        >
          Live Demo
          <ExternalLinkIcon width={14} height={14} />
        </a>
      {/if}
    </div>
  </div>
</div>
