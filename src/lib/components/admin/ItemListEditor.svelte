<script lang="ts">
	import AdminField from './AdminField.svelte';
	import TagInput from './TagInput.svelte';
	import ItemListEditor from './ItemListEditor.svelte';
	import { inputClass, inputStyle, primaryButtonClass, iconButtonClass } from './style';
	import type { AdminFieldDef, EditorItem, EditorItems } from './types';

	let {
		label,
		hint,
		items,
		schema,
		addLabel = 'Add item',
		emptyText = 'No items yet.',
		onItemsChange
	}: {
		label: string;
		hint?: string;
		items: EditorItems;
		schema: AdminFieldDef[];
		addLabel?: string;
		emptyText?: string;
		onItemsChange: (items: EditorItems) => void;
	} = $props();

	function emptyItem(): EditorItem {
		const item: EditorItem = {};
		for (const field of schema) {
			if (field.type === 'tags' || field.type === 'children') item[field.key] = [];
		}
		return item;
	}

	function addItem() {
		onItemsChange([...items, emptyItem()]);
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

	function headerTitle(item: EditorItem): string | null {
		const key = schema[0]?.key;
		if (!key) return null;
		const value = item[key];
		if (typeof value !== 'string' || value.trim() === '') return null;
		return value;
	}

	function raw(item: EditorItem, key: string): string {
		const value = item[key];
		return typeof value === 'string' ? value : '';
	}

	function list(item: EditorItem, key: string): EditorItems {
		return Array.isArray(item[key]) ? item[key] : [];
	}

	function isFull(field: AdminFieldDef): boolean {
		return field.full ?? (field.type === 'textarea' || field.type === 'tags' || field.type === 'children');
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
			{addLabel}
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
			{#each items as item, index}
				<div
					class="rounded-xl border p-5"
					style="background-color: color-mix(in oklab, var(--foreground) 3%, transparent); border-color: color-mix(in oklab, var(--foreground) 10%, transparent);"
				>
					<div class="mb-4 flex items-center justify-between gap-3">
						<span class="truncate text-sm font-semibold">{index + 1}. {headerTitle(item) ?? 'New item'}</span>
						<div class="flex shrink-0 items-center gap-1">
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
								aria-label="Remove item"
							>
								×
							</button>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
						{#each schema as field}
							{@const full = isFull(field)}
							<div class="min-w-0 {full ? 'sm:col-span-2 sm:break-words' : ''}">
								<AdminField label={field.label} hint={field.hint}>
									{#if field.type === 'textarea'}
										<textarea
											value={raw(item, field.key)}
											rows={field.rows ?? 5}
											placeholder={field.placeholder}
											class="{inputClass} break-words"
											style={inputStyle}
											oninput={(e) => (item[field.key] = e.currentTarget.value)}
										></textarea>
									{:else if field.type === 'tags'}
										<TagInput
											tags={list(item, field.key)}
											placeholder={field.placeholder ?? 'Add…'}
											onTagsChange={(v) => (item[field.key] = v)}
										/>
									{:else if field.type === 'children'}
										<ItemListEditor
											label={field.label}
											hint={field.hint}
											items={list(item, field.key)}
											schema={field.childrenSchema ?? []}
											onItemsChange={(v) => (item[field.key] = v)}
										/>
									{:else if field.type === 'select'}
										<select
											value={raw(item, field.key)}
											class={inputClass}
											style={inputStyle}
											onchange={(e) => (item[field.key] = e.currentTarget.value)}
										>
											<option value="">—</option>
											{#each field.options ?? [] as option}
												<option value={option}>{option}</option>
											{/each}
										</select>
									{:else}
										<input
											type="text"
											value={raw(item, field.key)}
											placeholder={field.placeholder}
											class={inputClass}
											style={inputStyle}
											oninput={(e) => (item[field.key] = e.currentTarget.value)}
										/>
									{/if}
								</AdminField>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>