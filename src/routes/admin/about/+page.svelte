<script lang="ts">
	import AdminField from '$lib/components/admin/AdminField.svelte';
	import EditorHeader from '$lib/components/admin/EditorHeader.svelte';
	import ItemListEditor from '$lib/components/admin/ItemListEditor.svelte';
	import StringListEditor from '$lib/components/admin/StringListEditor.svelte';
	import { inputClass, cardStyle } from '$lib/components/admin/style';
	import type { AdminFieldDef } from '$lib/components/admin/types';
	import { siteData } from '$lib/stores/site-data';
	import type { SiteData } from '$lib/stores/site-data';
	import { patchDoc } from '$lib/firestore';

	let aboutState = $state<SiteData['about']>({ headline: '', photo: '', long: [] });
	let experiences = $state<SiteData['experiences']>([]);
	let educationItems = $state<SiteData['education']>([]);
	let skillsEntries = $state<{ category: string; tags: string[] }[]>([]);
	let lastSaved = $state<AboutPayload | null>(null);
	let synced = $state(false);
	let status = $state<'idle' | 'saving' | 'saved' | 'error'>('idle');
	let errorMessage = $state('');

	type AboutPayload = {
		about: SiteData['about'];
		experiences: SiteData['experiences'];
		education: SiteData['education'];
		skills: Record<string, string[]>;
	};

	function buildPayload(): AboutPayload {
		return {
			about: $state.snapshot(aboutState),
			experiences: $state.snapshot(experiences),
			education: $state.snapshot(educationItems),
			skills: Object.fromEntries(skillsEntries.map((e) => [e.category, e.tags]))
		};
	}

	// Pre-fill the form from the live Firestore data (via siteData).
	$effect(() => {
		if (
			!synced &&
			($siteData.about.headline ||
				$siteData.about.long.length > 0 ||
				$siteData.experiences.length > 0 ||
				$siteData.education.length > 0 ||
				Object.keys($siteData.skills).length > 0)
		) {
			aboutState = $state.snapshot($siteData.about);
			experiences = $state.snapshot($siteData.experiences);
			educationItems = $state.snapshot($siteData.education);
			const skills = $state.snapshot($siteData.skills);
			skillsEntries = Object.entries(skills).map(([category, tags]) => ({ category, tags }));
			lastSaved = $state.snapshot(buildPayload());
			synced = true;
		}
	});

	const dirty = $derived(lastSaved !== null && JSON.stringify(buildPayload()) !== JSON.stringify(lastSaved));

	const experienceSchema: AdminFieldDef[] = [
		{ key: 'title', label: 'Title' },
		{ key: 'subtitle', label: 'Company / org' },
		{ key: 'date', label: 'Dates', placeholder: 'Jan 2026 — Current' },
		{ key: 'location', label: 'Location', placeholder: 'Remote' },
		{ key: 'type', label: 'Type', placeholder: 'Internship' },
		{ key: 'description', label: 'Short description', type: 'textarea', rows: 3 },
		{ key: 'story', label: 'Full story', type: 'textarea', rows: 10 },
		{ key: 'tags', label: 'Tags', type: 'tags' }
	];

	const educationBasicFields: AdminFieldDef[] = [
		{ key: 'title', label: 'Title' },
		{ key: 'subtitle', label: 'Institute' },
		{ key: 'date', label: 'Dates' },
		{ key: 'cgpa', label: 'CGPA', placeholder: '7.6/10' },
		{ key: 'logo', label: 'Logo', placeholder: '/jklu.webp' },
		{ key: 'description', label: 'Description', type: 'textarea', rows: 4 },
		{ key: 'story', label: 'Full story', type: 'textarea', rows: 12 }
	];

	const educationEntryFields: AdminFieldDef[] = [
		...educationBasicFields.slice(0, 6),
		{
			key: 'related',
			label: 'Related entries',
			type: 'children',
			childrenSchema: educationBasicFields
		},
		...educationBasicFields.slice(6)
	];

	const skillsSchema: AdminFieldDef[] = [
		{ key: 'category', label: 'Category name', placeholder: 'Frontend' },
		{ key: 'tags', label: 'Skills', type: 'tags' }
	];

	async function handleSave() {
		status = 'saving';
		errorMessage = '';
		try {
			await patchDoc('about', buildPayload());
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
		aboutState = $state.snapshot($siteData.about);
		experiences = $state.snapshot($siteData.experiences);
		educationItems = $state.snapshot($siteData.education);
		const skills = $state.snapshot($siteData.skills);
		skillsEntries = Object.entries(skills).map(([category, tags]) => ({ category, tags }));
		lastSaved = $state.snapshot(buildPayload());
		status = 'idle';
	}
</script>

<div>
	<EditorHeader
		title="About"
		hint="Bio, experiences, education, and skills. Save to push changes live."
		status={status}
		dirty={dirty}
		saving={status === 'saving'}
		errorMessage={errorMessage}
		onSave={handleSave}
		onReset={handleReset}
	/>

	<div class="grid grid-cols-1 gap-6">
		<div class="rounded-xl p-6" style={cardStyle}>
			<div class="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
				<AdminField label="Headline" hint="The one-liner shown at the top of the About page.">
					<textarea
						bind:value={aboutState.headline}
						rows={3}
						placeholder="Get to know more about who I am."
						class="{inputClass}{lastSaved !== null && aboutState.headline !== lastSaved.about.headline ? ' ide-dirty' : ''}"
						data-lenis-prevent
					></textarea>
				</AdminField>
				<AdminField label="Photo" hint="Path or URL to your portrait, e.g. /about.webp.">
					<input
						type="text"
						bind:value={aboutState.photo}
						placeholder="/about.webp"
						class="{inputClass}{lastSaved !== null && aboutState.photo !== lastSaved.about.photo ? ' ide-dirty' : ''}"
						data-lenis-prevent
					/>
				</AdminField>
			</div>
			<StringListEditor
				label="Bio paragraphs"
				hint="Each item is one paragraph. Empty paragraphs are shown as visual breaks on the page."
				items={aboutState.long}
				placeholder="A paragraph about you…"
				savedItems={lastSaved ? lastSaved.about.long : null}
				onItemsChange={(v) => (aboutState.long = v)}
			/>
		</div>

		<ItemListEditor
			label="Experiences"
			hint="Work history cards — ordered oldest to newest on the page."
			items={experiences}
			schema={experienceSchema}
			savedItems={lastSaved ? lastSaved.experiences : null}
			onItemsChange={(v) => (experiences = v)}
			addLabel="Add experience"
			emptyText="No experiences yet."
		/>

		<ItemListEditor
			label="Education"
			hint="Degrees and exchange programs. Use 'Related entries' to nest entries like the IIT/IIIT exchanges."
			items={educationItems}
			schema={educationEntryFields}
			savedItems={lastSaved ? lastSaved.education : null}
			onItemsChange={(v) => (educationItems = v)}
			addLabel="Add education"
			emptyText="No education entries yet."
		/>

		<ItemListEditor
			label="Skills"
			hint="Each entry is a category with its list of skills."
			items={skillsEntries}
			schema={skillsSchema}
			savedItems={lastSaved ? Object.entries(lastSaved.skills).map(([category, tags]) => ({ category, tags })) : null}
			onItemsChange={(v) => (skillsEntries = v)}
			addLabel="Add category"
			emptyText="No skills yet."
		/>
	</div>
</div>