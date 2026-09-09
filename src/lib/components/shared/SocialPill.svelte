<script lang="ts">
  import { siteData } from '$lib/stores/site-data';
  import { GithubIcon, LinkedinIcon, MediumIcon, GmailIcon } from '$lib/components/ui/icons';

  const hoverColors: Record<string, string> = {
    GitHub: '#2ea043',
    LinkedIn: '#0a66c2',
    Medium: 'var(--foreground)',
  };

  const getIcon = (label: string) => {
    switch (label) {
      case "GitHub": return GithubIcon;
      case "LinkedIn": return LinkedinIcon;
      case "Medium": return MediumIcon;
      default: return null;
    }
  };

  function handleMouseEnter(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    const label = target.getAttribute('aria-label') ?? '';
    if (label in hoverColors) {
      target.style.color = hoverColors[label];
    }
    target.style.transform = "scale(1.1)";
  }

  function handleMouseLeave(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    target.style.color = "color-mix(in oklab, var(--foreground) 60%, transparent)";
    target.style.transform = "scale(1)";
  }
</script>

<div
  class="flex w-fit items-center gap-8 px-8 py-4 rounded-full backdrop-blur-md shadow-lg transition-colors duration-300"
  style="background-color: color-mix(in oklab, var(--background) 70%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 30%, transparent);"
>
  {#each $siteData.socialLinks as link}
    <a
      href={link.href}
      aria-label={link.label}
      target="_blank"
      rel="noopener noreferrer"
      class="group transition-transform duration-200"
      style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
      onmouseenter={handleMouseEnter}
      onmouseleave={handleMouseLeave}
    >
      {#if link.label === 'Email'}
        <span class="grayscale group-hover:grayscale-0 transition-filter duration-200">
          <GmailIcon />
        </span>
      {:else}
        {@const Icon = getIcon(link.label)}
        {#if Icon}
          <Icon />
        {/if}
      {/if}
    </a>
  {/each}
</div>