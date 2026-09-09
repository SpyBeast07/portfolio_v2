<script lang="ts">
	import { page } from '$app/stores';
	import { siteData } from '$lib/stores/site-data';
	import { slugify } from '$lib/slug';
	import { GithubIcon, ExternalLinkIcon } from '$lib/components/ui/icons';
	import VerticalEmail from '$lib/components/layout/VerticalEmail.svelte';

	function projectSlug(p: { slug?: string; title: string }): string {
		return p.slug || slugify(p.title);
	}

	const project = $derived($siteData.projects.find((p) => projectSlug(p) === $page.params.slug));

	const tags = $derived(project?.tags ?? []);
	const timeline = $derived(project?.timeline?.trim() ?? '');

	const highlights = $derived(project?.highlights ?? []);
	const screenshots = $derived(project?.screenshots ?? []);
	const loading = $derived($siteData.projects.length === 0);
	const notFound = $derived($siteData.projects.length > 0 && !project);

	const metaDescription = $derived(project?.about || project?.description || '');

	function handleGithubMouseEnter(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.backgroundColor = 'color-mix(in oklab, var(--foreground) 10%, transparent)';
	}

	function handleGithubMouseLeave(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.backgroundColor = 'color-mix(in oklab, var(--foreground) 5%, transparent)';
	}

	function handleDemoMouseEnter(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.opacity = '0.9';
	}

	function handleDemoMouseLeave(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.opacity = '1';
	}
</script>

<svelte:head>
	<title>{project?.title ?? 'Project'} | Kushagra Gupta</title>
	<meta name="description" content={metaDescription} />
</svelte:head>

<div class="bg-background text-foreground relative min-h-screen selection:bg-yellow-500/30">
	<!-- Background Effects -->
	<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-40"></div>
	<div
		class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
	></div>

	<!-- Vertical Email -->
	<div class="hidden md:block">
		<VerticalEmail />
	</div>

	<!-- Content -->
	<main class="relative z-20 mx-auto max-w-[950px] px-6 pt-28 pb-32 md:pt-36">
		{#if loading}
			<span
				class="text-sm"
				style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
			>
				Loading…
			</span>
		{:else if notFound}
			<section>
				<p
					class="font-playfair text-2xl font-bold"
					style="color: var(--foreground);"
				>
					Project not found
				</p>
				<a
					href="/work"
					class="mt-6 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
					style="color: color-mix(in oklab, var(--foreground) 85%, transparent);"
				>
					<span aria-hidden="true">←</span> Back to Projects
				</a>
			</section>
		{:else if project}
			<a
				href="/work"
				class="mb-10 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
				style="color: color-mix(in oklab, var(--foreground) 85%, transparent);"
			>
				<span aria-hidden="true">←</span> Projects
			</a>

			<!-- Project Name + Cover image -->
			<div class="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
				<div>
					<h1
						class="font-playfair text-3xl leading-tight font-bold tracking-tight md:text-4xl"
						style="color: var(--foreground);"
					>
						{project.title}
					</h1>

					<!-- One-line description -->
					{#if project.description}
						<p
							class="font-outfit mt-5 text-lg leading-relaxed"
							style="color: color-mix(in oklab, var(--foreground) 85%, transparent);"
						>
							{project.description}
						</p>
					{/if}

					<!-- Timeline / Built with -->
					{#if timeline || tags.length > 0}
						<div class="mt-5 space-y-3 text-sm">
							{#if timeline}
								<p>
									<span
										class="font-semibold"
										style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
									>
										Time:
									</span>{' '}
									<span style="color: color-mix(in oklab, var(--foreground) 90%, transparent);">
										{timeline}
									</span>
								</p>
							{/if}
							{#if tags.length > 0}
								<div>
									<span
										class="font-semibold"
										style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
									>
										Built with:
									</span>
									<div class="mt-2 flex flex-wrap gap-2">
										{#each tags as tag (tag)}
											<span
												class="rounded-full px-3 py-1 text-xs"
												style="color: color-mix(in oklab, var(--foreground) 85%, transparent); background-color: color-mix(in oklab, var(--foreground) 5%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 12%, transparent);"
											>
												{tag}
											</span>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{/if}

					<!-- Live Demo / GitHub -->
					{#if project.demoLink || project.githubLink}
						<div class="mt-8 flex flex-wrap items-center gap-3">
							{#if project.githubLink}
								<a
									href={project.githubLink}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold tracking-wider uppercase transition-colors"
									style="color: var(--foreground); background-color: color-mix(in oklab, var(--foreground) 5%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
									onmouseenter={handleGithubMouseEnter}
									onmouseleave={handleGithubMouseLeave}
								>
									<GithubIcon width={16} height={16} />
									GitHub
								</a>
							{/if}
							{#if project.demoLink}
								<a
									href={project.demoLink}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-opacity"
									style="color: var(--background); background-color: var(--foreground);"
									onmouseenter={handleDemoMouseEnter}
									onmouseleave={handleDemoMouseLeave}
								>
									Live Demo
									<ExternalLinkIcon width={16} height={16} />
								</a>
							{/if}
						</div>
					{/if}
				</div>

				{#if project.image}
					<div class="mx-auto w-full max-w-md md:sticky md:top-28 md:mx-0">
						<div
							class="overflow-hidden rounded-2xl"
							style="border: 1px solid color-mix(in oklab, var(--foreground) 12%, transparent);"
						>
							<img
								src={project.image}
								alt={`${project.title} cover`}
								class="h-full w-full object-cover"
							/>
						</div>
					</div>
				{/if}
			</div>

			<hr
				class="my-12"
				style="border-color: color-mix(in oklab, var(--foreground) 10%, transparent);"
			/>

			<!-- Key Highlights -->
			{#if highlights.length > 0}
				<section class="mb-14">
					<h2
						class="font-playfair mb-6 text-2xl font-bold"
						style="color: var(--foreground);"
					>
						Key Highlights
					</h2>
					<ul class="space-y-3">
						{#each highlights as highlight (highlight)}
							<li
								class="flex gap-3 text-base leading-relaxed"
								style="color: color-mix(in oklab, var(--foreground) 90%, transparent);"
							>
								<span
									class="mt-[0.6em] h-1.5 w-1.5 flex-shrink-0 rounded-full"
									style="background-color: color-mix(in oklab, var(--foreground) 40%, transparent);"
								></span>
								<span>{highlight}</span>
							</li>
						{/each}
					</ul>
				</section>
			{/if}

			<!-- About -->
			{#if project.about}
				<section class="mb-14">
					<h2
						class="font-playfair mb-6 text-2xl font-bold"
						style="color: var(--foreground);"
					>
						About
					</h2>
					<p
						class="font-outfit text-base leading-relaxed"
						style="color: color-mix(in oklab, var(--foreground) 85%, transparent);"
					>
						{project.about}
					</p>
				</section>
			{/if}

			<!-- Screenshots -->
			{#if screenshots.length > 0}
				<section>
					<h2
						class="font-playfair mb-8 text-2xl font-bold"
						style="color: var(--foreground);"
					>
						Screenshots
					</h2>
					<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
						{#each screenshots as screenshot (screenshot)}
							<div
								class="overflow-hidden rounded-2xl"
								style="border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
							>
								<img
									src={screenshot}
									alt={`${project.title} screenshot`}
									loading="lazy"
									class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
								/>
							</div>
						{/each}
					</div>
				</section>
			{/if}
		{/if}
	</main>
</div>