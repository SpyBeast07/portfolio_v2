<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import PageHeading from '$lib/components/shared/PageHeading.svelte';
	import { pageHeadings, projects, skills, projectCategories } from '$lib/data';
	import ProjectCard from '$lib/components/shared/ProjectCard.svelte';
	import AnimatedCounter from '$lib/components/ui/AnimatedCounter.svelte';
	import GithubStats from '$lib/components/shared/GithubStats.svelte';
	import { theme } from '$lib/stores/theme'; // If needed for colors, but variables use CSS

	let activeCategory = $state('All');

	let filteredProjects = $derived(
		projects.filter((project) => {
			if (activeCategory === 'All') return true;
			return project.category === activeCategory;
		})
	);
</script>

<svelte:head>
	<title>Work | Kushagra</title>
	<meta name="description" content="A collection of projects and work by Kushagra." />
</svelte:head>

<div class="bg-background text-foreground relative min-h-screen selection:bg-yellow-500/30">
	<!-- Background Effects -->
	<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-40"></div>
	<div
		class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
	></div>

	<div class="relative z-10 container mx-auto max-w-4xl px-6 py-24">
		<div class="mb-12">
			<div class="fixed top-8 left-1/2 z-50 -translate-x-1/2">
				<Navbar mode="floating" />
			</div>
			<div class="mt-24">
				<PageHeading
					title={pageHeadings.work.title}
					description={// Svelte snippet or just HTML in description
					// PageHeading accepts description as string or snippet.
					// We can pass a snippet if we refactored PageHeading to accept one,
					// which we did! ({ title, description }: { title: string, description: string | Snippet })
					// So we can pass a snippet.
					// But implementing snippet inline in prop is not straightforward in template syntax yet?
					// Actually, we can create a snippet block.
					descriptionSnippet}
				/>
			</div>
		</div>

		{#snippet descriptionSnippet()}
			<p class="font-playfair text-4xl font-bold" style="color: var(--foreground);">
				<span class="inline-flex"><AnimatedCounter value={projects.length} />+</span>{' '}
				<span
					class="font-sans text-2xl font-normal"
					style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
				>
					projects and counting...
				</span>
			</p>
		{/snippet}

		<!-- Category Filter -->
		<div
			class="scrollbar-none mb-12 flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4"
		>
			{#each projectCategories as category}
				<button
					onclick={() => (activeCategory = category)}
					class={`flex-shrink-0 snap-center rounded-full border px-6 py-2 text-sm font-medium transition-all duration-300 ${
						activeCategory === category
							? 'bg-foreground text-background border-foreground'
							: 'text-foreground/70 border-foreground/10 hover:border-foreground/30 hover:text-foreground bg-transparent'
					}`}
				>
					{category}
				</button>
			{/each}
		</div>

		<!-- Projects Grid -->
		<div class="grid grid-cols-1 gap-12">
			{#each filteredProjects as project (project.title)}
				<ProjectCard {...project} />
			{/each}
		</div>

		<!-- Skills Section -->
		<div class="mt-24 mb-24">
			<PageHeading
				title="My Technical Playground"
				description="Things I’ve built with and experimented on."
			/>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				{#each Object.entries(skills) as [category, items]}
					<div>
						<h5 class="mb-4 text-xl font-medium capitalize" style="color: var(--foreground);">
							{category.replace(/([A-Z])/g, ' $1').trim()}
						</h5>
						<div class="flex flex-wrap gap-2">
							{#each items as skill}
								<span
									class="rounded-full border px-3 py-1 text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
									style="color: color-mix(in oklab, var(--foreground) 80%, transparent); border-color: color-mix(in oklab, var(--foreground) 10%, transparent);"
								>
									{skill}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- GitHub Contribution Chart -->
		<h2 class="font-playfair mt-24 mb-12 text-5xl font-bold" style="color: var(--foreground);">
			Github Stats
		</h2>
		<GithubStats />
	</div>
</div>
