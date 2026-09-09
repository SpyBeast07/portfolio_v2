<script lang="ts">
  import { ExternalLinkIcon, GithubIcon } from '$lib/components/ui/icons';
  import { slugify } from '$lib/slug';

  let { title, description, tags, image, githubLink, demoLink, slug }: {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    githubLink?: string;
    demoLink?: string;
    slug?: string;
  } = $props();

  const href = $derived(`/work/${slug || slugify(title)}`);

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
  class="group relative rounded-3xl border border-foreground/30 transition-all duration-500 ease-out overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:border-yellow-500/60"
  style="background-color: color-mix(in oklab, var(--background) 85%, transparent);"
>
  <!-- Link to the dedicated project page -->
  <a href={href} class="absolute inset-0 z-10" aria-label="View {title} details"></a>

  <!-- Whole-card secondary tint on hover -->
  <div
    class="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-yellow-500/15 via-yellow-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
  ></div>

  <!-- Project Image -->
  {#if image}
    <div class="w-full p-4 pb-0 flex items-center justify-center">
      <div
        class="relative w-full h-36 md:h-44 rounded-2xl overflow-hidden transition-[background-color] duration-500 group-hover:bg-yellow-500/5"
      >
        <img
          src={image}
          alt={title}
          class="object-contain absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
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

  <div
    class="p-4 flex flex-col flex-1 transition-transform duration-500 ease-out origin-bottom group-hover:scale-[1.035]"
  >
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
      class="relative z-20 flex items-center gap-3 mt-auto pt-3"
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
