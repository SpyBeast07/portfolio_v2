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
	let updatedOpen = $state(true);
	let sectionsOpen = $state(true);

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
		const payload = { now: $state.snapshot(now) };
		const snapshot = $state.snapshot(now);
		try {
			const writePromise = patchDoc('now', payload);
			const timeoutPromise = new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Save timed out')), 8000)
			);
			await Promise.race([writePromise, timeoutPromise]);
			lastSaved = snapshot;
			status = 'saved';
			setTimeout(() => {
				if (status === 'saved') status = 'idle';
			}, 2500);
		} catch (err) {
			if (err instanceof Error && err.message === 'Save timed out') {
				lastSaved = snapshot;
				status = 'saved';
				setTimeout(() => {
					if (status === 'saved') status = 'idle';
				}, 2500);
				return;
			}
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

	<div class="grid grid-cols-1 gap-2">
		<div class="rounded-lg" style={cardStyle}>
			<button
				type="button"
				class="flex w-full items-center justify-between px-3 py-2 text-left"
				onclick={() => (updatedOpen = !updatedOpen)}
			>
				<div>
					<span class="text-xs font-semibold">Last updated</span>
				</div>
				<span class="text-xs opacity-50">{updatedOpen ? '▾' : '▸'}</span>
			</button>
			{#if updatedOpen}
				<div class="px-3 pb-3 pt-1">
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
			{/if}
		</div>

		<div class="rounded-lg" style={cardStyle}>
			<button
				type="button"
				class="flex w-full items-center justify-between px-3 py-2 text-left"
				onclick={() => (sectionsOpen = !sectionsOpen)}
			>
				<div>
					<span class="text-xs font-semibold">Sections</span>
					<span class="ml-2 text-xs opacity-50">({now.sections.length})</span>
				</div>
				<span class="text-xs opacity-50">{sectionsOpen ? '▾' : '▸'}</span>
			</button>
			{#if sectionsOpen}
				<div class="p-2 pt-0">
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
			{/if}
		</div>
	</div>
</div>