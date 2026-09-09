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
			case 'GitHub':
				return GithubIcon;
			case 'LinkedIn':
				return LinkedinIcon;
			case 'Medium':
				return MediumIcon;
			default:
				return null;
		}
	};

	function handleMouseEnter(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		const label = target.getAttribute('aria-label') ?? '';
		if (label in hoverColors) {
			target.style.color = hoverColors[label];
		}
		target.style.transform = 'scale(1.1)';
	}

	function handleMouseLeave(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.color = 'color-mix(in oklab, var(--foreground) 60%, transparent)';
		target.style.transform = 'scale(1)';
	}
</script>

<footer
	class="font-outfit max-w-md pb-24 text-sm leading-relaxed"
	style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
>
	<div class="mb-8 flex gap-6 md:hidden">
		{#each $siteData.socialLinks as { href, label }}
			<a
				{href}
				aria-label={label}
				target="_blank"
				rel="noopener noreferrer"
				class="group transition-transform duration-200"
				style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
			>
				{#if label === 'Email'}
					<span class="grayscale group-hover:grayscale-0 transition-filter duration-200">
						<GmailIcon width={20} height={20} />
					</span>
				{:else}
					{@const Icon = getIcon(label)}
					{#if Icon}
						<Icon width={20} height={20} />
					{/if}
				{/if}
			</a>
		{/each}
	</div>

	<p>
		Coded in Visual Studio Code by yours truly. Built with SvelteKit and Tailwind CSS, deployed
		with Vercel.
		<br />
		Interested in working together? Feel free to reach out on LinkedIn or email.
	</p>
</footer>