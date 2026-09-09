<script lang="ts">
	import { inputClass, primaryButtonClass, iconButtonClass } from './style';

	let {
		label,
		hint,
		items,
		placeholder = '…',
		emptyText = 'No items yet.',
		savedItems = null,
		onItemsChange
	}: {
		label: string;
		hint?: string;
		items: string[];
		placeholder?: string;
		emptyText?: string;
		savedItems?: string[] | null;
		onItemsChange: (items: string[]) => void;
	} = $props();

	function addItem() {
		onItemsChange([...items, '']);
	}

	function removeItem(index: number) {
		onItemsChange(items.filter((_, i) => i !== index));
	}

	function moveItem(index: number, dir: -1 | 1) {
		const target = index + dir;
		if (target < 0 || target >= items.length) return;
		const next = [...items];
		[next[index], next[target]] = [next[target], next[index]];
		onItemsChange(next);
	}
</script>

<div class="rounded-xl p-6" style="background-color: color-mix(in oklab, var(--foreground) 4%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);">
	<div class="mb-4 flex flex-wrap items-center justify-between gap-3">
		<div>
			<h2 class="font-playfair text-xl font-bold">{label}</h2>
			{#if hint}
				<p class="mt-1 text-sm opacity-60">{hint}</p>
			{/if}
		</div>
		<button
			type="button"
			onclick={addItem}
			class={primaryButtonClass}
			style="color: var(--background); background-color: var(--foreground);"
		>
			Add paragraph
		</button>
	</div>

	{#if items.length === 0}
		<p
			class="rounded-lg border border-dashed px-4 py-6 text-center text-sm opacity-50"
			style="border-color: color-mix(in oklab, var(--foreground) 20%, transparent);"
		>
			{emptyText}
		</p>
	{:else}
		<div class="grid grid-cols-1 gap-4">
			{#each items as value, index}
				{@const newItem = savedItems !== null && index >= savedItems.length}
				<div
					class="rounded-xl border p-5{newItem ? ' ide-item' : ''}"
					style="background-color: color-mix(in oklab, var(--foreground) 3%, transparent); border-color: color-mix(in oklab, var(--foreground) 10%, transparent);"
				>
					<div class="mb-3 flex items-center justify-between">
						<span class="text-sm font-semibold">{index + 1}.</span>
						<div class="flex items-center gap-1">
							<button
								type="button"
								onclick={() => moveItem(index, -1)}
								disabled={index === 0}
								class={iconButtonClass}
								aria-label="Move up"
							>
								↑
							</button>
							<button
								type="button"
								onclick={() => moveItem(index, 1)}
								disabled={index === items.length - 1}
								class={iconButtonClass}
								aria-label="Move down"
							>
								↓
							</button>
							<button
								type="button"
								onclick={() => removeItem(index)}
								class="{iconButtonClass} hover:!text-red-500"
								aria-label="Remove"
							>
								×
							</button>
						</div>
					</div>
					<textarea
						value={value}
						rows={4}
						placeholder={placeholder}
						class="{inputClass} break-words{savedItems !== null && value !== savedItems[index] ? ' ide-dirty' : ''}"
						data-lenis-prevent
						oninput={(e) => (items[index] = e.currentTarget.value)}
					></textarea>
				</div>
			{/each}
		</div>
	{/if}
</div>