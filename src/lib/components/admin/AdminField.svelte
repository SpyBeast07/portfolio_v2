<script lang="ts">
	import type { Snippet } from 'svelte';

	let { label, hint, children }: { label: string; hint?: string; children: Snippet } = $props();
</script>

<div class="mb-3">
	<span class="mb-1 block text-xs font-medium">{label}</span>
	{@render children()}
	{#if hint}
		<p class="mt-1 text-xs opacity-50">{hint}</p>
	{/if}
</div>