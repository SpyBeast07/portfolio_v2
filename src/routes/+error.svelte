<script lang="ts">
	import { page } from '$app/stores';
	import { Motion } from 'svelte-motion';
	import ThemeBulb from '$lib/components/ui/ThemeBulb.svelte';
	import CustomButton from '$lib/components/ui/CustomButton.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';

	const status = $derived($page.status);
	const message = $derived($page.error?.message || 'An unexpected error occurred');
</script>

<svelte:head>
	<title>{status} - Error | Kushagra Gupta</title>
</svelte:head>

<main
	class="bg-background text-foreground relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden transition-colors duration-300 selection:bg-yellow-500/30"
>
	<!-- Background Effects -->
	<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-40"></div>
	<div
		class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
	></div>

	<!-- Theme Bulb -->
	<ThemeBulb />

	<!-- Navbar (Floating) -->
	<div class="fixed top-8 left-1/2 z-50 -translate-x-1/2">
		<Navbar mode="floating" />
	</div>

	<!-- Content -->
	<div class="relative z-10 mx-auto max-w-4xl px-6 text-center">
		<!-- Giant Background 404 -->
		<Motion
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 0.1, scale: 1 }}
			transition={{ duration: 1.5, ease: 'easeOut' }}
			let:motion
		>
			<h1
				use:motion
				class="font-playfair text-foreground pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[40vw] leading-none font-bold tracking-tighter"
			>
				{status}
			</h1>
		</Motion>

		<!-- Main Content -->
		<Motion
			initial={{ y: 30, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.8, delay: 0.2 }}
			let:motion
		>
			<div use:motion class="relative">
				<h2 class="font-playfair text-foreground mb-6 text-4xl font-bold md:text-6xl">
					{#if status === 404}
						Lost in the <span class="font-great-vibes font-normal text-yellow-500">Void?</span>
					{:else}
						Something Went <span class="font-great-vibes font-normal text-yellow-500"
							>Wrong</span
						>
					{/if}
				</h2>
				<p
					class="font-outfit text-foreground/70 mx-auto mb-10 max-w-lg text-lg leading-relaxed md:text-xl"
				>
					{#if status === 404}
						The page you are looking for seems to have drifted away into deep space. Let's get
						you back on track.
					{:else}
						{message}
					{/if}
				</p>

				<Motion
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					let:motion
				>
					<div use:motion class="inline-block">
						<CustomButton href="/">Return to Home</CustomButton>
					</div>
				</Motion>
			</div>
		</Motion>
	</div>
</main>
