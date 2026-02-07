<script lang="ts">
	import { email } from '$lib/data';

	let copied = $state(false);

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(email);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}
</script>

<div
	class="fixed bottom-0 left-8 z-50 flex flex-col items-center gap-6 after:h-24 after:min-h-[100px] after:w-[1px] after:bg-neutral-500 after:content-[''] dark:after:bg-neutral-500"
>
	<button
		onclick={handleCopy}
		class="vertical-text relative font-mono text-sm tracking-widest transition-all duration-300 hover:-translate-y-1 hover:text-white"
		style="writing-mode: vertical-rl; color: var(--icon-color);"
	>
		{#if copied}
			<span class="font-bold text-green-400">Copied!!</span>
		{:else}
			{email}
		{/if}
	</button>
</div>
