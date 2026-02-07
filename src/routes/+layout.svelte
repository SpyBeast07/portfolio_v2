<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import ThemeBulb from '$lib/components/ui/ThemeBulb.svelte';
	import Lenis from 'lenis';

	onMount(() => {
		const lenis = new Lenis();

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Great+Vibes&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Sacramento&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="text-foreground bg-background min-h-screen antialiased">
	<ThemeBulb />
	<slot />
</div>
