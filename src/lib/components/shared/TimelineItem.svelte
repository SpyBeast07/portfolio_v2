<script lang="ts">
	import { BriefcaseIcon, MapPinIcon } from '$lib/components/ui/icons';
	import type { Education } from '$lib/data';
	import ExpandableStory from './ExpandableStory.svelte';

	interface TimelineItemProps {
		title: string;
		subtitle: string;
		date: string;
		description: string;
		tags?: string[];
		location?: string;
		type?: string;
		cgpa?: string;
		related?: Education[];
		logo?: string;
		story?: string;
	}

	let {
		title,
		subtitle,
		date,
		description,
		tags,
		location,
		type,
		cgpa,
		related,
		logo,
		story
	}: TimelineItemProps = $props();
</script>

<div
	class="relative pb-12 pl-8 last:pb-0"
	style="border-left: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
>
	<div
		class="ring-opacity-20 absolute top-0 left-[-5px] h-2.5 w-2.5 rounded-full bg-yellow-500/50 ring-4 ring-neutral-900 dark:ring-neutral-900"
		style="box-shadow: 0 0 0 4px var(--background);"
	></div>

	<!-- Header with Logo -->
	<div class="mb-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
		<div class="flex items-start gap-4">
			{#if logo}
				<img
					src={logo}
					alt={`${subtitle} logo`}
					class="h-12 w-12 rounded-full border object-cover"
					style="border-color: color-mix(in oklab, var(--foreground) 10%, transparent);"
				/>
			{/if}
			<div class="flex-1">
				<h3 class="font-playfair text-lg font-bold" style="color: var(--foreground);">
					{title}
				</h3>
				<div class="mb-1 text-sm font-medium text-purple-400">{subtitle}</div>
			</div>
		</div>

		<span
			class="mt-1 flex-shrink-0 font-mono text-xs tracking-widest uppercase sm:text-right"
			style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
		>
			{date}
		</span>
	</div>

	<!-- Meta Info: Location, Type, CGPA -->
	<div
		class="mb-3 flex flex-wrap gap-4 text-xs"
		style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
	>
		{#if location}
			<div class="flex items-center gap-1">
				<MapPinIcon width={14} height={14} />
				{location}
			</div>
		{/if}
		{#if type}
			<div class="flex items-center gap-1">
				<BriefcaseIcon width={14} height={14} />
				{type}
			</div>
		{/if}
		{#if cgpa}
			<div class="flex items-center gap-1 font-mono">
				<span class="font-bold">GPA:</span>
				{cgpa}
			</div>
		{/if}
	</div>

	<ExpandableStory
		{description}
		{story}
		className="text-base leading-relaxed max-w-2xl whitespace-pre-line"
	/>

	{#if tags}
		<div class="flex flex-wrap gap-2">
			{#each tags as tag}
				<span
					class="rounded-full px-3 py-1 text-xs"
					style="color: color-mix(in oklab, var(--foreground) 70%, transparent); background-color: color-mix(in oklab, var(--foreground) 5%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
				>
					{tag}
				</span>
			{/each}
		</div>
	{/if}

	<!-- Nested Related Items -->
	{#if related}
		<div class="mt-8 space-y-8">
			{#each related as item}
				<div
					class="relative border-l border-dashed pl-6"
					style="border-color: color-mix(in oklab, var(--foreground) 20%, transparent);"
				>
					<div
						class="absolute top-1.5 left-[-5px] h-2.5 w-2.5 rounded-full"
						style="background-color: color-mix(in oklab, var(--foreground) 30%, transparent);"
					></div>

					<div class="mb-1 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div class="flex items-start gap-3">
							{#if item.logo}
								<img
									src={item.logo}
									alt={`${item.subtitle} logo`}
									class="h-10 w-10 rounded-full border object-cover"
									style="border-color: color-mix(in oklab, var(--foreground) 10%, transparent);"
								/>
							{/if}
							<div>
								<h4 class="text-md font-playfair font-bold" style="color: var(--foreground);">
									{item.title}
								</h4>
								<div class="mb-2 text-sm font-medium text-purple-400">{item.subtitle}</div>
							</div>
						</div>
						<span
							class="mt-1 flex-shrink-0 font-mono text-xs tracking-widest uppercase sm:text-right"
							style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
						>
							{item.date}
						</span>
					</div>

					{#if item.cgpa}
						<div
							class="mb-2 font-mono text-xs"
							style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
						>
							<span class="font-bold">GPA:</span>
							{item.cgpa}
						</div>
					{/if}

					<ExpandableStory
						description={item.description}
						story={item.story}
						className="text-base max-w-3xl leading-relaxed whitespace-pre-line"
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>
