<script lang="ts">
	import AdminField from '$lib/components/admin/AdminField.svelte';
	import EditorHeader from '$lib/components/admin/EditorHeader.svelte';
	import ItemListEditor from '$lib/components/admin/ItemListEditor.svelte';
	import { inputClass, cardStyle } from '$lib/components/admin/style';
	import type { AdminFieldDef } from '$lib/components/admin/types';
	import { siteData } from '$lib/stores/site-data';
	import type { SiteData } from '$lib/stores/site-data';
	import { patchDoc } from '$lib/firestore';

	type NowData = SiteData['now'];

	let now = $state<NowData>({ lastUpdated: '', sections: [] });
	let lastSaved = $state<NowData | null>(null);
	let synced = $state(false);
	let status = $state<'idle' | 'saving' | 'saved' | 'error'>('idle');
	let errorMessage = $state('');

	// Pre-fill the form from the live Firestore data (via siteData).
	$effect(() => {
		if (!synced && ($siteData.now.lastUpdated || $siteData.now.sections.length > 0)) {
			now = $state.snapshot($siteData.now);
			lastSaved = $state.snapshot($siteData.now);
			synced = true;
		}
	});

	const dirty = $derived(lastSaved !== null && JSON.stringify(now) !== JSON.stringify(lastSaved));

	const sectionSchema: AdminFieldDef[] = [
		{ key: 'title', label: 'Section title' },
		{
			key: 'items',
			label: 'Items',
			type: 'children',
			childrenSchema: [
				{ key: 'text', label: 'Text', type: 'textarea', rows: 3 },
				{
					key: 'links',
					label: 'Links',
					type: 'children',
					addLabel: 'Add link',
					childrenSchema: [
						{ key: 'label', label: 'Label' },
						{ key: 'url', label: 'URL' }
					]
				}
			]
		}
	];

	async function handleSave() {
		status = 'saving';
		errorMessage = '';
		try {
			await patchDoc('now', { now: $state.snapshot(now) });
			lastSaved = $state.snapshot(now);
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
		now = $state.snapshot($siteData.now);
		lastSaved = $state.snapshot($siteData.now);
		status = 'idle';
	}
</script>

<div>
	<EditorHeader
		title="Now"
		hint="The 'Now' section on your home page — what you're focusing on right now."
		status={status}
		dirty={dirty}
		saving={status === 'saving'}
		errorMessage={errorMessage}
		onSave={handleSave}
		onReset={handleReset}
	/>

	<div class="grid grid-cols-1 gap-6">
		<div class="rounded-xl p-4" style={cardStyle}>
			<AdminField label="Last updated" hint='e.g. "February 2026".'>
				<input
					type="text"
					bind:value={now.lastUpdated}
					placeholder="February 2026"
					class="{inputClass}{lastSaved !== null && now.lastUpdated !== lastSaved.lastUpdated ? ' ide-dirty' : ''}"
					data-lenis-prevent
				/>
			</AdminField>
		</div>

		<ItemListEditor
			label="Sections"
			hint="Each section groups a title with its bullet items (items can carry optional links)."
			items={now.sections}
			schema={sectionSchema}
			savedItems={lastSaved ? lastSaved.sections : null}
			onItemsChange={(v) => (now.sections = v)}
			addLabel="Add section"
			emptyText="No sections yet — add one to get started."
		/>
	</div>
</div>