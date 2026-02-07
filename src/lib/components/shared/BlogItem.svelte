<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		excerpt,
		date,
		slug,
		readTime,
		image = undefined,
		showImage = true
	}: {
		title: string;
		excerpt: string;
		date: string;
		slug: string;
		readTime: string;
		image?: string;
		showImage?: boolean;
	} = $props();

	function handleMouseEnter(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.backgroundColor = 'color-mix(in oklab, var(--foreground) 5%, transparent)';
	}

	function handleMouseLeave(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.backgroundColor = 'transparent';
	}
</script>

<a
	href={slug}
	class="group -mx-4 mb-12 flex cursor-pointer flex-col items-center gap-6 rounded-xl p-4 transition-colors md:flex-row-reverse"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	<!-- Blog Image -->
	{#if showImage && image}
		<div
			class="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-lg md:w-48"
			style="background-color: color-mix(in oklab, var(--foreground) 5%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
		>
			<img
				src={image}
				alt={title}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
		</div>
	{/if}

	<!-- Content -->
	<div class="min-w-0 flex-1">
		<div
			class="mb-2 flex items-center gap-3 font-mono text-xs tracking-wide uppercase"
			style="color: color-mix(in oklab, var(--foreground) 50%, transparent);"
		>
			<span>{date}</span>
			<span>•</span>
			<span>{readTime}</span>
		</div>

		<h3
			class="font-playfair mb-3 text-xl leading-tight font-bold transition-colors"
			style="color: var(--foreground);"
		>
			{title}
		</h3>

		<p
			class="mb-4 line-clamp-3 text-sm leading-relaxed"
			style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
		>
			{excerpt}
		</p>

		<div
			class="flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all group-hover:gap-3"
			style="color: var(--foreground);"
		>
			Read Article <span class="text-yellow-600 dark:text-yellow-500">→</span>
		</div>
	</div>
</a>
