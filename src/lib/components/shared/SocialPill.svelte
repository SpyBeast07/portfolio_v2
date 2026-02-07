<script lang="ts">
  import { socialLinks } from '$lib/data';
  import { EmailIcon, GithubIcon, LinkedinIcon } from '$lib/components/ui/icons';

  const getIcon = (label: string) => {
    switch (label) {
      case "GitHub": return GithubIcon;
      case "LinkedIn": return LinkedinIcon;
      case "Email": return EmailIcon;
      default: return null;
    }
  };

  function handleMouseEnter(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    target.style.color = "var(--foreground)";
    target.style.transform = "scale(1.1)";
  }

  function handleMouseLeave(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement;
    target.style.color = "color-mix(in oklab, var(--foreground) 60%, transparent)";
    target.style.transform = "scale(1)";
  }
</script>

<div
  class="flex items-center gap-8 px-8 py-4 rounded-full backdrop-blur-md shadow-lg transition-colors duration-300"
  style="background-color: color-mix(in oklab, var(--background) 70%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 30%, transparent);"
>
  {#each socialLinks as link}
    {@const Icon = getIcon(link.label)}
    <a
      href={link.href}
      aria-label={link.label}
      target="_blank"
      rel="noopener noreferrer"
      class="transition-transform duration-200"
      style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
      onmouseenter={handleMouseEnter}
      onmouseleave={handleMouseLeave}
    >
      {#if Icon}
        <Icon />
      {/if}
    </a>
  {/each}
</div>
