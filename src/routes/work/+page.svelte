<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { pageHeadings, projects, skills, projectCategories } from '$lib/data';
	import ProjectCard from '$lib/components/shared/ProjectCard.svelte';
	import AnimatedCounter from '$lib/components/ui/AnimatedCounter.svelte';
	import GithubStats from '$lib/components/shared/GithubStats.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import SocialPill from '$lib/components/shared/SocialPill.svelte';
	import VerticalEmail from '$lib/components/layout/VerticalEmail.svelte';

	const sections = [
		{ id: 'projects', name: 'Projects' },
		{ id: 'skills', name: 'Skills' },
		{ id: 'github', name: 'GitHub' }
	];

	let activeCategory = $state('All');
	let activeSection = $state('projects');

	const [introLine1, ...introRest] = pageHeadings.work.description.split(' built ');
	const introLine2 = introRest.join(' built ');

	let filteredProjects = $derived(
		projects.filter((project) => {
			if (activeCategory === 'All') return true;
			return project.category === activeCategory;
		})
	);

	onMount(() => {
		const sectionEls = document.querySelectorAll('section[id]');
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{
				rootMargin: '-20% 0px -70% 0px',
				threshold: 0
			}
		);

		sectionEls.forEach((section) => observer.observe(section));

		return () => {
			sectionEls.forEach((section) => observer.unobserve(section));
		};
	});

	function handleNavClick(e: MouseEvent, id: string) {
		e.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	function handleNavMouseEnter(e: MouseEvent, active: boolean) {
		if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--foreground)';
	}

	function handleNavMouseLeave(e: MouseEvent, active: boolean) {
		if (!active)
			(e.currentTarget as HTMLElement).style.color =
				'color-mix(in oklab, var(--foreground) 560%, transparent)';
	}
</script>

<svelte:head>
	<title>Work & Projects | Kushagra Gupta</title>
	<meta name="description" content="A collection of projects and work by Kushagra Gupta - Developer & AI Enthusiast." />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Work & Projects | Kushagra Gupta" />
	<meta property="og:description" content="A collection of projects and work by Kushagra Gupta - Developer & AI Enthusiast." />
	<meta property="og:image" content="{$page.url.origin}/logo.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$page.url.href} />
	<meta property="twitter:title" content="Work & Projects | Kushagra Gupta" />
	<meta property="twitter:description" content="A collection of projects and work by Kushagra Gupta - Developer & AI Enthusiast." />
	<meta property="twitter:image" content="{$page.url.origin}/logo.png" />
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

	<!-- Desktop Left Panel: matches Home page sidebar -->
	<aside class="hidden md:block">
		<div
			class="pointer-events-none fixed top-5 left-0 z-40 flex h-screen w-[40%] flex-col pt-[16vh] pl-32"
		>
			<h1
				class="font-playfair pointer-events-auto mb-1 text-5xl leading-none font-bold tracking-tighter select-none"
				style="color: var(--foreground);"
			>
				Work
			</h1>

			<div class="pointer-events-auto mt-4 flex flex-col items-start gap-10">
				<div
					class="flex flex-col items-left text-xl leading-tight font-medium text-neutral-400"
				>
					<h2>{introLine1}</h2>
					<h2
						class="text-xl font-medium transition-colors duration-300"
						style="color: var(--icon-color)"
					>
						{introLine2}
					</h2>
				</div>

				<!-- Vertical Section Navigation -->
				<nav class="flex w-full flex-col items-start gap-6">
					{#each sections as section (section.id)}
						{@const isActive = activeSection === section.id}
						<a
							href="#{section.id}"
							onclick={(e) => handleNavClick(e, section.id)}
							class="group flex items-center gap-5 text-base font-medium tracking-widest uppercase transition-colors duration-300"
							style="color: {isActive
								? 'var(--foreground)'
								: 'color-mix(in oklab, var(--foreground) 560%, transparent)'};"
							onmouseenter={(e) => handleNavMouseEnter(e, isActive)}
							onmouseleave={(e) => handleNavMouseLeave(e, isActive)}
						>
							<span
								class={`block h-[1px] transition-all duration-300 ${isActive ? 'w-8' : 'w-0 group-hover:w-4'}`}
								style="background-color: var(--foreground);"
							></span>
							{section.name}
						</a>
					{/each}
				</nav>
			</div>
		</div>

		<!-- Social Icon Chips: fixed bottom-left like Home -->
		<div class="pointer-events-auto fixed bottom-16 left-32 z-[60]">
			<SocialPill />
		</div>
	</aside>

	<!-- Right Panel: Content Sections -->
	<main class="relative z-20 px-6 pt-28 pb-24 md:ml-[40%] md:w-[60%] md:px-16 md:pt-24 lg:pr-32">
		<!-- Projects -->
		<section id="projects" class="mb-24 scroll-mt-28 pt-4 md:pt-16 lg:pt-24 lg:mb-40">
			<p
				class="font-playfair mb-12 text-4xl font-bold"
				style="color: var(--foreground);"
			>
				<span class="inline-flex"><AnimatedCounter value={projects.length} />+</span>{' '}
				<span
					class="font-sans text-2xl font-normal"
					style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
				>
					projects and counting...
				</span>
			</p>

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
		</section>

		<!-- Skills -->
		<section id="skills" class="mb-24 scroll-mt-28 lg:mb-40">
			<SectionHeading class="mb-12 text-4xl lg:text-5xl">My Technical Playground</SectionHeading>
			<p
				class="font-outfit mb-12 -mt-6 max-w-2xl text-lg leading-relaxed"
				style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
			>
				Things I’ve built with and experimented on.
			</p>
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
		</section>

		<!-- GitHub Stats -->
		<section id="github" class="scroll-mt-28">
			<SectionHeading class="mb-12 text-4xl lg:text-5xl">Github Stats</SectionHeading>
			<GithubStats />
		</section>
	</main>
</div>
