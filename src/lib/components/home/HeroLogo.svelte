<script lang="ts">
	// Image handling in SvelteKit usually uses enhanced:img or standard img tag
	// We'll use standard img for now as configured in previous steps
</script>

<!-- User's Exact Logo Structure -->
<div
	class="group pointer-events-auto relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-neutral-900 shadow-2xl ring-2 ring-white/5 transition-transform duration-500 hover:scale-105"
>
	<img
		src="/logo.webp"
		alt="Logo"
		width="160"
		height="160"
		class="object-cover opacity-90 transition-opacity group-hover:opacity-100"
	/>
</div>
<!-- Handle - Below Circle -->
<div class="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
	<span class="text-sm font-medium tracking-[0.2em] text-neutral-500 uppercase"> @SpyBeast07 </span>
</div>
