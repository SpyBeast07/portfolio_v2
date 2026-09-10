<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Links | Kushagra Gupta</title>
	<meta name="description" content="All my links in one place - Kushagra Gupta." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Links | Kushagra Gupta" />
	<meta property="og:description" content="All my links in one place - Kushagra Gupta." />
	<meta property="og:image" content="{$page.url.origin}/logo.webp" />
	<meta property="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="relative min-h-screen bg-background text-foreground selection:bg-yellow-500/30">
	<!-- Background Effects -->
	<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-30"></div>
	<div
		class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
	></div>

	<!-- Main Page Container: matches About/Work/Blogs gap from navbar -->
	<main class="relative top-5 z-20 mx-auto max-w-7xl px-4 pt-32 pb-40 sm:px-6 md:pt-[16vh] lg:px-8">
		<div class="flex flex-col">
			<h1
				class="mb-1 font-playfair text-5xl font-bold tracking-tighter select-none md:text-5xl"
				style="color: var(--foreground);"
			>
				Links
			</h1>
			<div class="mt-4 flex flex-col text-xl leading-tight font-medium text-neutral-400">
				<h2>Coming</h2>
				<h2
					class="text-xl font-medium transition-colors duration-300"
					style="color: var(--foreground)"
				>
					Soon
				</h2>
			</div>
		</div>
	</main>
</div>
