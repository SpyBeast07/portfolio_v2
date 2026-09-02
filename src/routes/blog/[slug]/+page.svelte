<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Motion, useViewportScroll } from 'svelte-motion';
	import { page } from '$app/stores';
	import BlogLayout from '$lib/components/blog/BlogLayout.svelte';
	import BlogFooterContact from '$lib/components/blog/BlogFooterContact.svelte';
	import { siteData } from '$lib/stores/site-data';
	import type { TocItem } from './+page';

	const { scrollYProgress } = useViewportScroll();

	const blog = $derived($siteData.blogs.find((b) => b.slug === $page.params.slug));

	function buildParsedContent(content: string): { parsedContent: string; toc: TocItem[] } {
		const toc: TocItem[] = [];

		// Replace h2/h3 tags and capture content to build TOC
		let parsedContent = content.replace(/<h([23])>(.*?)<\/h\1>/g, (match, levelChar, text) => {
			// Create a URL-friendly ID from the heading text
			const id = text
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)+/g, '');

			toc.push({
				id,
				text: text.replace(/<\/?[^>]+(>|$)/g, ''), // Strip any inner HTML tags (e.g. <em>)
				level: parseInt(levelChar, 10)
			});

			return `<h${levelChar} id="${id}">${text}</h${levelChar}>`;
		});

		// Wrap tables in a responsive scrolling container
		parsedContent = parsedContent.replace(
			/<table[\s\S]*?<\/table>/g,
			(match) => `<div class="table-wrapper">${match}</div>`
		);

		return { parsedContent, toc };
	}

	const parsed = $derived(
		blog ? buildParsedContent(blog.content) : { parsedContent: '', toc: [] as TocItem[] }
	);

	// Create JSON-LD for SEO Structured Data
	const jsonLd = $derived(
		blog
			? JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'BlogPosting',
					headline: blog.title,
					image: blog.image ? [`${$page.url.origin}${blog.image}`] : [],
					datePublished: blog.date,
					author: {
						'@type': 'Person',
						name: 'Kushagra Gupta',
						url: $page.url.origin
					}
				})
			: 'null'
	);
</script>

<svelte:head>
	<title>{blog ? `${blog.title} | Kushagra Gupta` : 'Blog not found | Kushagra Gupta'}</title>
	<meta name="description" content={blog?.excerpt ?? ''} />

	{#if blog}
		<!-- Open Graph -->
		<meta property="og:type" content="article" />
		<meta property="og:url" content={$page.url.href} />
		<meta property="og:title" content={`${blog.title} | Kushagra Gupta`} />
		<meta property="og:description" content={blog.excerpt} />
		{#if blog.image}
			<meta property="og:image" content={`${$page.url.origin}${blog.image}`} />
		{/if}

		<!-- Twitter -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={`${blog.title} | Kushagra Gupta`} />
		<meta name="twitter:description" content={blog.excerpt} />
		{#if blog.image}
			<meta name="twitter:image" content={`${$page.url.origin}${blog.image}`} />
		{/if}

		<!-- JSON-LD Structured Data -->
		{@html '<sc' + 'ript type="application/ld+json">' + jsonLd + '</sc' + 'ript>'}
	{/if}
</svelte:head>

{#if blog}
	<div class="blog-page-root" in:fade={{ duration: 350, delay: 60 }}>
		<!-- Background effects matching the rest of the site -->
		<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-40"></div>
		<div
			class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
		></div>

		<!-- Reading Progress Bar -->
		<Motion style={{ scaleX: scrollYProgress, transformOrigin: 'left' }} let:motion>
			<div use:motion class="progress-bar"></div>
		</Motion>

		<!-- Main page content -->
		<div class="page-content">
			<!-- Blog card -->
			<BlogLayout {blog} parsedContent={parsed.parsedContent} toc={parsed.toc} />

			<!-- Footer contact form -->
			<div class="footer-wrap">
				<BlogFooterContact />
			</div>
		</div>
	</div>
{:else}
	<div class="blog-page-root" in:fade={{ duration: 350, delay: 60 }}>
		<div class="page-content">
			<div class="not-found">
				<p class="font-playfair text-2xl font-bold">Blog not found</p>
				<a href="/blogs" class="text-neutral-400 hover:text-foreground">← Back to all blogs</a>
			</div>
		</div>
	</div>
{/if}

<style>
	.blog-page-root {
		position: relative;
		min-height: 100vh;
		background-color: var(--background);
		color: var(--foreground);
	}

	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background-color: var(--foreground);
		z-index: 1000;
	}

	.page-content {
		position: relative;
		z-index: 10;
		padding-top: 7rem; /* clears the fixed floating navbar */
		padding-bottom: 5rem;
	}

	.not-found {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 4rem 1rem;
		text-align: center;
	}

	.footer-wrap {
		width: 91%;
		margin: 0 auto;
		margin-top: 1rem;
	}

	/* Mobile */
	@media (max-width: 767px) {
		.page-content {
			padding-top: 5.5rem;
		}

		.footer-wrap {
			width: 100%;
			padding: 0 1.25rem;
			box-sizing: border-box;
		}
	}
</style>