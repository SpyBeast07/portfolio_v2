<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import BlogItem from '$lib/components/shared/BlogItem.svelte';
	import { blogs, pageHeadings } from '$lib/data';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import SocialPill from '$lib/components/shared/SocialPill.svelte';
	import VerticalEmail from '$lib/components/layout/VerticalEmail.svelte';

	const sections = blogs.map((blog) => ({ id: blog.slug, name: blog.title }));

	let activeSection = $state(blogs[0]?.slug ?? '');

	const [introLine1, introLine2] = pageHeadings.blogs.description.split(', ');

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
	<title>Blogs | Kushagra Gupta</title>
	<meta name="description" content="Thoughts, tutorials, and insights by Kushagra Gupta - Developer & AI Enthusiast." />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Blogs | Kushagra Gupta" />
	<meta property="og:description" content="Thoughts, tutorials, and insights by Kushagra Gupta - Developer & AI Enthusiast." />
	<meta property="og:image" content="{$page.url.origin}/logo.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$page.url.href} />
	<meta property="twitter:title" content="Blogs | Kushagra Gupta" />
	<meta property="twitter:description" content="Thoughts, tutorials, and insights by Kushagra Gupta - Developer & AI Enthusiast." />
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
				Blogs
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
		<!-- Blogs -->
		<section id="blogs" class="scroll-mt-28 pt-4 md:pt-16 lg:pt-24">
			<SectionHeading class="mb-12 text-4xl lg:text-5xl">Writing</SectionHeading>

			<div class="space-y-4">
				{#if blogs.length > 0}
					{#each blogs as blog (blog.title)}
						<div id={blog.slug} class="scroll-mt-28">
							<BlogItem {...blog} />
						</div>
					{/each}
				{:else}
					<!-- Coming Soon Placeholder -->
					<div
						class="rounded-lg border-dashed py-12 text-center"
						style="border-color: color-mix(in oklab, var(--foreground) 30%, transparent); background-color: color-mix(in oklab, var(--background) 85%, transparent); border-width: 1px;"
					>
						<p
							class="font-playfair text-lg italic"
							style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
						>
							Thoughtful essays coming soon...
						</p>
					</div>
				{/if}
			</div>
		</section>
	</main>
</div>
