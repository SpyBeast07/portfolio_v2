<script lang="ts">
	import { socialLinks } from '$lib/data';
	import { EmailIcon, GithubIcon, LinkedinIcon } from '$lib/components/ui/icons';

	const getIcon = (label: string) => {
		switch (label) {
			case 'GitHub':
				return GithubIcon;
			case 'LinkedIn':
				return LinkedinIcon;
			case 'Email':
				return EmailIcon;
			default:
				return null;
		}
	};

	function handleMouseEnter(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.color = 'var(--foreground)';
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
		{#each socialLinks as { href, label }}
			{@const Icon = getIcon(label)}
			<a
				{href}
				aria-label={label}
				target="_blank"
				rel="noopener noreferrer"
				class="transition-transform duration-200"
				style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
			>
				{#if Icon}
					<Icon width={20} height={20} />
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
