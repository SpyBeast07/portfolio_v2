<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '../../stores/theme';

	let mounted = $state(false);
	let transitioning = $state(false);

	let isDark = $derived($theme === 'dark');

	onMount(() => {
		mounted = true;
	});

	const toggleTheme = () => {
		const bulbButton = document.querySelector('[aria-label="Toggle Theme"]') as HTMLElement | null;
		const pageWrapper = document.getElementById('page-wrapper');
		const body = document.body;

		// Animate the pull rope
		const rope = document.getElementById('bulb-rope');
		if (rope) {
			rope.animate(
				[
					{ transform: 'translateY(0)' },
					{ transform: 'translateY(10px)' },
					{ transform: 'translateY(0)' }
				],
				{ duration: 300, easing: 'ease-in-out' }
			);
		}

		if (!bulbButton || !pageWrapper) {
			theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
			return;
		}

		transitioning = true;

		// Disable body CSS transition so theme change is instant
		const prevBodyTransition = body.style.transition;
		body.style.transition = 'none';

		// Toggle the theme — new colors apply immediately
		theme.update((current) => (current === 'dark' ? 'light' : 'dark'));

		// Get bulb center position relative to the viewport
		const rect = bulbButton.getBoundingClientRect();
		const x = Math.round(rect.left + rect.width / 2);
		const y = Math.round(rect.top + rect.height / 2);

		// Animate clip-path circle expanding from bulb center
		const animation = pageWrapper.animate(
			[
				{ clipPath: `circle(0% at ${x}px ${y}px)` },
				{ clipPath: `circle(150% at ${x}px ${y}px)` }
			],
			{ duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
		);

		animation.onfinish = () => {
			pageWrapper.style.clipPath = '';
			body.style.transition = prevBodyTransition;
			transitioning = false;
		};
	};
</script>

{#if mounted}
	<div
		class="fixed top-0 right-4 z-[100] flex origin-top-right scale-75 flex-col items-center md:right-12 md:scale-100"
	>
		<!-- Rope -->
		<div
			id="bulb-rope"
			class="pointer-events-none flex origin-top flex-col items-center transition-transform hover:translate-y-1"
		>
			<!-- Rope Line -->
			<div class="relative h-30 w-[1px] bg-neutral-700 md:h-20 dark:bg-neutral-500">
				<!-- Rope Texture (Simulated with dashes) -->
				<div
					class="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(0,0,0,0.5)_50%,transparent_55%)] bg-[length:4px_4px]"
				></div>
			</div>

			<!-- Socket -->
			<div
				class="-mt-0.5 h-6 w-4 rounded-sm border border-b-0 border-neutral-700 bg-black shadow-sm dark:bg-neutral-800"
			></div>

			<!-- Bulb -->
			<button
				onclick={toggleTheme}
				aria-label="Toggle Theme"
				class={`
          pointer-events-auto -mt-1 h-12 w-8 cursor-pointer rounded-t-[40%] rounded-b-[50%] border border-black/20 shadow-lg transition-all duration-300 dark:border-white/10
          ${isDark ? 'bg-neutral-800 shadow-none' : 'animate-pulse bg-yellow-300 shadow-[0_0_30px_rgba(253,224,71,0.6)]'}
        `}
			>
				<!-- Filament (visible in on state or off state slightly) -->
				<div class="pointer-events-none relative h-full w-full opacity-50">
					<div class="absolute top-2 left-1/2 h-6 w-[1px] -translate-x-1/2 bg-neutral-900/50"></div>
					<div class="absolute top-8 left-1/2 h-[1px] w-4 -translate-x-1/2 bg-neutral-900/50"></div>
				</div>
			</button>
		</div>
	</div>
{/if}
