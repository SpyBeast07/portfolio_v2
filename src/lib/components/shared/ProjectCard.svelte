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
  class="group relative rounded-3xl transition-all overflow-hidden flex flex-col h-full"
  style="background-color: color-mix(in oklab, var(--background) 85%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 30%, transparent);"
>
  <!-- Project Image -->
  {#if image}
    <div class="w-full p-4 pb-0 flex items-center justify-center">
      <div class="relative w-full h-36 md:h-44 rounded-2xl overflow-hidden">
        <img
          src={image}
          alt={title}
          class="object-contain transition-transform duration-500 hover:scale-105 absolute inset-0 w-full h-full"
        />
        <div class="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1.5">
          {#each tags as tag}
            <span
              class="px-2 py-0.5 text-xs rounded-full backdrop-blur-sm"
              style="color: var(--foreground); background-color: color-mix(in oklab, var(--background) 70%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
            >
              {tag}
            </span>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <div class="p-4 flex flex-col flex-1">
    <h3
      class="text-lg font-bold font-playfair mb-1.5"
      style="color: var(--foreground);"
    >
      {title}
    </h3>
    <p
      class="text-sm leading-relaxed mb-3 flex-1"
      style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
    >
      {description}
    </p>

    {#if !image}
      <div class="flex flex-wrap gap-1.5 mb-3">
        {#each tags as tag}
          <span
            class="px-2 py-0.5 text-xs rounded-full"
            style="color: color-mix(in oklab, var(--foreground) 70%, transparent); background-color: color-mix(in oklab, var(--foreground) 5%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
          >
            {tag}
          </span>
        {/each}
      </div>
    {/if}

    <!-- Action Buttons -->
    <div
      class="flex items-center gap-3 mt-auto pt-3"
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
