<script lang="ts">
	import { primaryButtonClass, ghostButtonClass } from './style';

	type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

	let {
		title,
		hint,
		status,
		dirty,
		saving,
		errorMessage,
		onSave,
		onReset
	}: {
		title: string;
		hint?: string;
		status: SaveStatus;
		dirty: boolean;
		saving: boolean;
		errorMessage: string;
		onSave: () => void;
		onReset: () => void;
	} = $props();
</script>

<div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
	<div>
		<h1 class="font-playfair text-3xl font-bold">{title}</h1>
		{#if hint}
			<p class="mt-2 max-w-xl text-sm opacity-70">{hint}</p>
		{/if}
		<p class="mt-3 text-sm">
			{#if status === 'saving'}
				<span class="opacity-70">Saving…</span>
			{:else if status === 'saved'}
				<span class="text-green-500">Saved — changes are live on the site.</span>
			{:else if status === 'error'}
				<span class="text-red-500" role="alert">{errorMessage || 'Save failed. Please try again.'}</span>
			{:else if dirty}
				<span class="opacity-60">Unsaved changes</span>
			{:else}
				<span class="opacity-40">All changes saved.</span>
			{/if}
		</p>
	</div>
	<div class="flex shrink-0 items-center gap-3">
		<button
			type="button"
			onclick={onReset}
			disabled={saving}
			class={ghostButtonClass}
			style="border-color: color-mix(in oklab, var(--foreground) 20%, transparent);"
		>
			Reset
		</button>
		<button
			type="button"
			onclick={onSave}
			disabled={saving || !dirty}
			class={primaryButtonClass}
			style="color: var(--background); background-color: var(--foreground);"
		>
			{saving ? 'Saving…' : 'Save changes'}
		</button>
	</div>
</div>