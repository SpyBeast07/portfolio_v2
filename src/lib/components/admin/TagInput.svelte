<script lang="ts">
	let { tags, placeholder = 'Add…', dirty = false, onTagsChange }: {
		tags: string[];
		placeholder?: string;
		dirty?: boolean;
		onTagsChange: (tags: string[]) => void;
	} = $props();

	let draft = $state('');

	function add() {
		const value = draft.trim();
		if (value && !tags.includes(value)) {
			onTagsChange([...tags, value]);
		}
		draft = '';
	}

	function remove(index: number) {
		onTagsChange(tags.filter((_, i) => i !== index));
	}
</script>

<div
	class="admin-box flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2.5{dirty ? ' ide-dirty' : ''}"
	style="background-color: transparent;"
	data-lenis-prevent
>
	{#each tags as tag, i}
		<span
			class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
			style="background-color: color-mix(in oklab, var(--foreground) 12%, transparent);"
		>
			{tag}
			<button
				type="button"
				onclick={() => remove(i)}
				class="opacity-60 transition-opacity hover:opacity-100"
				aria-label={`Remove ${tag}`}
			>
				×
			</button>
		</span>
	{:else}
		<span class="text-xs opacity-40">No items — press Enter to add.</span>
	{/each}
	<input
		type="text"
		bind:value={draft}
		placeholder={placeholder}
		autocomplete="off"
		class="min-w-[10rem] flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
		onkeydown={(e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				add();
			}
		}}
		onblur={() => {
			const value = draft.trim();
			if (value) add();
			else draft = '';
		}}
	/>
</div>