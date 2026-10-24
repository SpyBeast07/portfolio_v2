<script lang="ts">
	import AdminField from './AdminField.svelte';
	import TagInput from './TagInput.svelte';
	import ItemListEditor from './ItemListEditor.svelte';
	import { inputClass, primaryButtonClass, iconButtonClass } from './style';
	import { jsonEqual } from './utils';
	import type { AdminFieldDef, EditorItem, EditorItems } from './types';

	let {
		label,
		hint,
		items,
		schema,
		addLabel = 'Add item',
		emptyText = 'No items yet.',
		compact = false,
		savedItems = null,
		onItemsChange
	}: {
		label: string;
		hint?: string;
		items: EditorItems;
		schema: AdminFieldDef[];
		addLabel?: string;
		emptyText?: string;
		compact?: boolean;
		savedItems?: EditorItems | null;
		onItemsChange: (items: EditorItems) => void;
	} = $props();

	let collapsed = $state(new Set<number>());
	$effect(() => {
		const all = new Set<number>();
		for (let i = 0; i < items.length; i++) all.add(i);
		collapsed = all;
	});
	function toggleItem(index: number) {
		const next = new Set(collapsed);
		if (next.has(index)) next.delete(index);
		else next.add(index);
		collapsed = next;
	}
	function isCollapsed(index: number) {
		return collapsed.has(index);
	}

	function emptyItem(childSchema: AdminFieldDef[] = schema): EditorItem {
		const item: EditorItem = {};
		for (const field of childSchema) {
			if (field.type === 'tags' || field.type === 'children') item[field.key] = [];
		}
		return item;
	}

	function addItem() {
		const newItems = [...items, emptyItem()];
		onItemsChange(newItems);
		const next = new Set(collapsed);
		next.add(newItems.length - 1);
		collapsed = next;
	}

	function removeItem(index: number) {
		const next = new Set(collapsed);
		next.delete(index);
		collapsed = next;
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

	function savedChildList(savedItem: EditorItem | undefined, key: string): EditorItems {
		return savedItem && Array.isArray(savedItem[key]) ? savedItem[key] : [];
	}

	function isFull(field: AdminFieldDef): boolean {
		return field.full ?? (field.type === 'textarea' || field.type === 'tags' || field.type === 'children');
	}
</script>

<div
	class="rounded-lg {compact ? 'p-3' : 'p-4'}"
	style="background-color: color-mix(in oklab, var(--foreground) 4%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
>
	<div class="mb-3 flex flex-wrap items-center justify-between gap-2">
		<div>
			<h2 class="font-playfair {compact ? 'text-base' : 'text-lg'} font-bold">{label}</h2>
			{#if hint}
				<p class="mt-0.5 text-xs opacity-60">{hint}</p>
			{/if}
		</div>
		<button
			type="button"
			onclick={addItem}
			class="{primaryButtonClass} {compact ? 'px-3' : ''}"
			style="color: var(--background); background-color: var(--foreground);"
		>
			+ {addLabel}
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
		<div class="grid grid-cols-1 gap-2">
			{#each items as item, index}
				{@const savedItem = savedItems !== null ? savedItems?.[index] : undefined}
				{@const itemDirty = savedItems !== null && savedItem === undefined}
				<div
					class="rounded-lg border {itemDirty ? ' ide-item' : ''}"
					style="background-color: color-mix(in oklab, var(--foreground) 3%, transparent); border-color: color-mix(in oklab, var(--foreground) 10%, transparent);"
				>
					<div class="flex w-full items-center justify-between px-2.5 py-1">
						<button
							type="button"
							class="flex-1 truncate text-left text-xs font-semibold"
							onclick={() => toggleItem(index)}
						>
							<span class="mr-1 opacity-50">{isCollapsed(index) ? '▸' : '▾'}</span>{index + 1}. {headerTitle(item) ?? 'New item'}
						</button>
						<div class="flex shrink-0 items-center gap-0.5">
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

					<div class="grid grid-cols-1 gap-x-4 px-2.5 pb-2.5 pt-1 sm:grid-cols-2 {isCollapsed(index) ? 'hidden' : ''}">
						{#each schema as field}
							{@const full = isFull(field)}
							{@const savedVal = field.type === 'children' || field.type === 'tags' ? savedChildList(savedItem, field.key) : savedItem?.[field.key]}
							{@const dirty = savedItems !== null && !jsonEqual(item[field.key], savedVal)}
							<div class="min-w-0 {full ? 'sm:col-span-2 sm:break-words' : ''}">
								<AdminField label={field.label} hint={field.hint}>
									{#if field.type === 'textarea'}
										<textarea
											value={raw(item, field.key)}
											rows={field.rows ?? 5}
											placeholder={field.placeholder}
											class="{inputClass} break-words{dirty ? ' ide-dirty' : ''}"
											data-lenis-prevent
											oninput={(e) => (item[field.key] = e.currentTarget.value)}
										></textarea>
									{:else if field.type === 'tags'}
										<TagInput
											tags={list(item, field.key)}
											placeholder={field.placeholder ?? 'Add…'}
											dirty={dirty}
											onTagsChange={(v) => (item[field.key] = v)}
										/>
									{:else if field.type === 'children'}
										{#if list(item, field.key).length === 0}
											<div
												class="admin-box flex items-center justify-between gap-2 rounded-lg border px-2 py-1{dirty ? ' ide-dirty' : ''}"
												style="background-color: color-mix(in oklab, var(--foreground) 3%, transparent);"
											>
												<span class="text-xs font-medium">{field.label}</span>
												<button
													type="button"
													onclick={() => (item[field.key] = [emptyItem(field.childrenSchema ?? [])])}
													class="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-transform hover:scale-105"
													style="color: var(--background); background-color: var(--foreground);"
												>
													+ {field.addLabel ?? 'Add item'}
												</button>
											</div>
										{:else}
											<ItemListEditor
												label={field.label}
												hint={field.hint}
												items={list(item, field.key)}
												schema={field.childrenSchema ?? []}
												addLabel={field.addLabel ?? 'Add item'}
												compact
												savedItems={savedChildList(savedItem, field.key)}
												onItemsChange={(v) => (item[field.key] = v)}
											/>
										{/if}
									{:else if field.type === 'select'}
										<select
											value={raw(item, field.key)}
											class="{inputClass}{dirty ? ' ide-dirty' : ''}"
											data-lenis-prevent
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
											class="{inputClass}{dirty ? ' ide-dirty' : ''}"
											data-lenis-prevent
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