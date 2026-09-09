<script lang="ts">
	import AdminField from '$lib/components/admin/AdminField.svelte';
	import EditorHeader from '$lib/components/admin/EditorHeader.svelte';
	import ItemListEditor from '$lib/components/admin/ItemListEditor.svelte';
	import TagInput from '$lib/components/admin/TagInput.svelte';
	import { inputClass, inputStyle, cardStyle } from '$lib/components/admin/style';
	import type { AdminFieldDef } from '$lib/components/admin/types';
	import { siteData } from '$lib/stores/site-data';
	import type { SiteData } from '$lib/stores/site-data';
	import { patchDoc } from '$lib/firestore';

	let categories = $state<string[]>([]);
	let projects = $state<SiteData['projects']>([]);
	let headings = $state<SiteData['pageHeadings']>({
		work: { title: '', description: '' },
		blogs: { title: '', description: '' }
	});
	let lastSaved = $state<Partial<SiteData> | null>(null);
	let synced = $state(false);
	let status = $state<'idle' | 'saving' | 'saved' | 'error'>('idle');
	let errorMessage = $state('');

	function buildPayload(): Pick<SiteData, 'projectCategories' | 'projects' | 'pageHeadings'> {
		return {
			projectCategories: $state.snapshot(categories),
			projects: $state.snapshot(projects),
			pageHeadings: $state.snapshot(headings)
		};
	}

	// Pre-fill the form from the live Firestore data (via siteData).
	$effect(() => {
		if (!synced && ($siteData.projects.length > 0 || $siteData.projectCategories.length > 0)) {
			categories = $state.snapshot($siteData.projectCategories);
			projects = $state.snapshot($siteData.projects);
			headings = $state.snapshot($siteData.pageHeadings);
			lastSaved = $state.snapshot(buildPayload());
			synced = true;
		}
	});

	const dirty = $derived(lastSaved !== null && JSON.stringify(buildPayload()) !== JSON.stringify(lastSaved));

	const projectSchema = $derived<AdminFieldDef[]>([
		{ key: 'title', label: 'Title' },
		{ key: 'description', label: 'Description', type: 'textarea', rows: 4 },
		{ key: 'tags', label: 'Tags', type: 'tags' },
		{ key: 'category', label: 'Category', type: 'select', options: categories },
		{ key: 'image', label: 'Cover image', placeholder: '/my-image.webp' },
		{ key: 'githubLink', label: 'GitHub link', placeholder: 'https://github.com/…' },
		{ key: 'demoLink', label: 'Demo link', placeholder: 'https://…' }
	]);

	async function handleSave() {
		status = 'saving';
		errorMessage = '';
		try {
			await patchDoc('work', buildPayload());
			lastSaved = $state.snapshot(buildPayload());
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
		categories = $state.snapshot($siteData.projectCategories);
		projects = $state.snapshot($siteData.projects);
		headings = $state.snapshot($siteData.pageHeadings);
		lastSaved = $state.snapshot(buildPayload());
		status = 'idle';
	}
</script>

<div>
	<EditorHeader
		title="Work"
		hint="Projects, category filter, and the Work / Blogs page headings."
		status={status}
		dirty={dirty}
		saving={status === 'saving'}
		errorMessage={errorMessage}
		onSave={handleSave}
		onReset={handleReset}
	/>

<div class="grid grid-cols-1 gap-6">
			<div class="rounded-xl p-6" style={cardStyle}>
				<h2 class="font-playfair mb-4 text-xl font-bold">Page headings</h2>
				<div class="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
				<div>
					<AdminField label="Work page title">
						<input
							type="text"
							bind:value={headings.work.title}
							class={inputClass}
							style={inputStyle}
						/>
					</AdminField>
					<AdminField label="Work page description">
						<textarea
							bind:value={headings.work.description}
							rows={2}
							class={inputClass}
							style={inputStyle}
						></textarea>
					</AdminField>
				</div>
				<div>
					<AdminField label="Blogs page title">
						<input
							type="text"
							bind:value={headings.blogs.title}
							class={inputClass}
							style={inputStyle}
						/>
					</AdminField>
					<AdminField label="Blogs page description">
						<textarea
							bind:value={headings.blogs.description}
							rows={2}
							class={inputClass}
							style={inputStyle}
						></textarea>
					</AdminField>
				</div>
			</div>
			<div class="border-t pt-4" style="border-color: color-mix(in oklab, var(--foreground) 10%, transparent);">
				<AdminField label="Filter categories" hint="Used by the category filter on the Work page. Keep 'All' as the first item.">
					<TagInput tags={categories} onTagsChange={(v) => (categories = v)} placeholder="Add category…" />
				</AdminField>
			</div>
		</div>

		<ItemListEditor
			label="Projects"
			hint="Shown on the Work page, filtered by category."
			items={projects}
			schema={projectSchema}
			onItemsChange={(v) => (projects = v)}
			addLabel="Add project"
			emptyText="No projects yet."
		/>
	</div>
</div>