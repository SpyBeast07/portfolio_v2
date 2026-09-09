<script lang="ts">
	import type { Snippet } from 'svelte';

	let { label, hint, children }: { label: string; hint?: string; children: Snippet } = $props();
</script>

<div class="mb-5">
	<span class="mb-2 block text-sm font-medium">{label}</span>
	{@render children()}
	{#if hint}
		<p class="mt-1.5 text-xs opacity-50">{hint}</p>
	{/if}
</div>