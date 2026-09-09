<script lang="ts">
	import EditorHeader from '$lib/components/admin/EditorHeader.svelte';
	import ItemListEditor from '$lib/components/admin/ItemListEditor.svelte';
	import type { AdminFieldDef } from '$lib/components/admin/types';
	import { siteData } from '$lib/stores/site-data';
	import type { SiteData } from '$lib/stores/site-data';
	import { patchDoc } from '$lib/firestore';

	let blogPosts = $state<SiteData['blogs']>([]);
	let lastSaved = $state<SiteData['blogs'] | null>(null);
	let synced = $state(false);
	let status = $state<'idle' | 'saving' | 'saved' | 'error'>('idle');
	let errorMessage = $state('');

	// Pre-fill the form from the live Firestore data (via siteData).
	$effect(() => {
		if (!synced && $siteData.blogs.length > 0) {
			blogPosts = $state.snapshot($siteData.blogs);
			lastSaved = $state.snapshot($siteData.blogs);
			synced = true;
		}
	});

	const dirty = $derived(
		lastSaved !== null && JSON.stringify(blogPosts) !== JSON.stringify(lastSaved)
	);

	const blogSchema: AdminFieldDef[] = [
		{ key: 'title', label: 'Title' },
		{ key: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 2, hint: 'Italic sub-heading shown below the title.' },
		{ key: 'date', label: 'Date', placeholder: 'Feb 28, 2026' },
		{ key: 'readTime', label: 'Read time', placeholder: '5 min read' },
		{ key: 'slug', label: 'Slug', hint: 'URL segment — must be unique, e.g. "my-blog-post".' },
		{ key: 'image', label: 'Cover image', placeholder: '/my-image.webp' },
		{ key: 'content', label: 'Content (HTML)', type: 'textarea', rows: 16, hint: 'Rendered with {@html} — keep the markup valid.' }
	];

	async function handleSave() {
		status = 'saving';
		errorMessage = '';
		try {
			await patchDoc('blogs', { blogs: $state.snapshot(blogPosts) });
			lastSaved = $state.snapshot(blogPosts);
			status = 'saved';
			setTimeout(() => {
				if (status === 'saved') status = 'idle';
			}, 2500);
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Save failed.';
		}
	}

	function handleReset() {
		blogPosts = $state.snapshot($siteData.blogs);
		lastSaved = $state.snapshot($siteData.blogs);
		status = 'idle';
	}
</script>

<div>
	<EditorHeader
		title="Blogs"
		hint="Blog posts and their full HTML content. The slug must be unique — it becomes the post's URL."
		status={status}
		dirty={dirty}
		saving={status === 'saving'}
		errorMessage={errorMessage}
		onSave={handleSave}
		onReset={handleReset}
	/>

	<ItemListEditor
		label="Posts"
		hint="Ordered newest-first on the Blogs page."
		items={blogPosts}
		schema={blogSchema}
		savedItems={lastSaved}
		onItemsChange={(v) => (blogPosts = v)}
		addLabel="Add blog post"
		emptyText="No blog posts yet."
	/>
</div>