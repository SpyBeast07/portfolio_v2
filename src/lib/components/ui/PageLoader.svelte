<script lang="ts">
	import { onMount } from 'svelte';

	let { isVisible = true }: { isVisible: boolean } = $props();
	let progress = $state(0);
	let opacity = $state(1);

	onMount(() => {
		// Simulate loading progress
		const interval = setInterval(() => {
			progress = Math.min(progress + Math.random() * 15, 95);
			if (progress >= 95) {
				clearInterval(interval);
			}
		}, 100);

		return () => clearInterval(interval);
	});

	// Watch for isVisible changes to trigger fade out
	$effect(() => {
		if (!isVisible) {
			progress = 100;
			// Trigger fade out
			setTimeout(() => {
				opacity = 0;
			}, 100);
		}
	});
</script>

{#if isVisible || opacity > 0}
	<div
		class="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500"
		style="opacity: {opacity}; background-color: var(--background);"
	>
		<!-- Background Effects - Matching Homepage -->
		<div class="bg-grid-pattern pointer-events-none absolute inset-0 z-0 opacity-40"></div>
		<div
			class="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
		></div>

		<!-- Loading Content -->
		<div class="relative z-10 flex flex-col items-center gap-8">
			<!-- Animated Logo -->
			<div class="relative">
				<!-- Pulsing Ring -->
				<div
					class="absolute inset-0 -m-4 animate-ping rounded-full opacity-20"
					style="background-color: var(--foreground);"
				></div>

				<!-- Logo Container -->
				<div
					class="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border shadow-2xl ring-2 transition-transform duration-1000 md:h-40 md:w-40"
					style="border-color: color-mix(in oklab, var(--foreground) 10%, transparent); 
                   background-color: color-mix(in oklab, var(--foreground) 5%, transparent);
                   ring-color: color-mix(in oklab, var(--foreground) 5%, transparent);
                   animation: logoScale 2s ease-in-out infinite;"
				>
					<img
						src="/logo.webp"
						alt="Loading"
						class="h-full w-full object-cover opacity-90"
						style="animation: logoFade 2s ease-in-out infinite;"
					/>
				</div>
			</div>

			<!-- Progress Indicator -->
			<div class="flex flex-col items-center gap-4">
				<!-- Progress Bar -->
				<div
					class="h-1 w-48 overflow-hidden rounded-full md:w-64"
					style="background-color: color-mix(in oklab, var(--foreground) 10%, transparent);"
				>
					<div
						class="h-full rounded-full transition-all duration-300 ease-out"
						style="width: {progress}%; background-color: var(--foreground);"
					></div>
				</div>

				<!-- Percentage Text -->
				<div class="flex items-center gap-2">
					<span
						class="font-outfit text-sm font-medium tracking-wider"
						style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
					>
						{Math.round(progress)}%
					</span>
				</div>

				<!-- Loading Text -->
				<p
					class="font-outfit text-xs tracking-[0.3em] uppercase"
					style="color: color-mix(in oklab, var(--foreground) 40%, transparent);"
				>
					Loading Experience
				</p>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes logoScale {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	@keyframes logoFade {
		0%,
		100% {
			opacity: 0.9;
		}
		50% {
			opacity: 1;
		}
	}

	/* Ensure ping animation works */
	@keyframes ping {
		75%,
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	.animate-ping {
		animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
	}
</style>
