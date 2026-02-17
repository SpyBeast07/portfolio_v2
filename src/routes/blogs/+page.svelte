<script lang="ts">
	import PageHeading from '$lib/components/shared/PageHeading.svelte';
	import BlogItem from '$lib/components/shared/BlogItem.svelte';
	import { blogs, pageHeadings } from '$lib/data';
</script>

<svelte:head>
	<title>Blogs | Kushagra Gupta</title>
	<meta name="description" content="Thoughts, tutorials, and insights by Kushagra Gupta - Developer & AI Enthusiast." />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://kushagra.dev/blogs" />
	<meta property="og:title" content="Blogs | Kushagra Gupta" />
	<meta property="og:description" content="Thoughts, tutorials, and insights by Kushagra Gupta - Developer & AI Enthusiast." />
	<meta property="og:image" content="https://kushagra.dev/logo.png" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://kushagra.dev/blogs" />
	<meta property="twitter:title" content="Blogs | Kushagra Gupta" />
	<meta property="twitter:description" content="Thoughts, tutorials, and insights by Kushagra Gupta - Developer & AI Enthusiast." />
	<meta property="twitter:image" content="https://kushagra.dev/logo.png" />
</svelte:head>

<div class="bg-background text-foreground relative min-h-screen selection:bg-yellow-500/30">
	<!-- Background Effects -->
	<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-40"></div>
	<div
		class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
	></div>

	<div class="relative z-10 container mx-auto max-w-4xl px-6 py-24">
		<div class="mb-12">
			<!-- Navbar removed - in layout -->
			<div class="mt-24">
				<PageHeading
					title={pageHeadings.blogs.title}
					description={pageHeadings.blogs.description}
				/>
			</div>
		</div>

		<div class="space-y-4">
			{#if blogs.length > 0}
				{#each blogs as blog (blog.title)}
					<BlogItem {...blog} />
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
	</div>
</div>
