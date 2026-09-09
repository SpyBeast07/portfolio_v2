<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { theme } from '../../stores/theme';

	const OFFSET = -20;
	const BOUNCE = 0;
	const RANGE = 32;

	// Color constants
	const COLORS = {
		Black: '#000000',
		Gold: '#FFD700',
		Frost: '#E8F4F8',
		Mountains2: '#8B7355'
	};

	let mounted = $state(false);
	let dragging = $state(false);
	let initialY = $state(0);
	let currentY = $state(0);
	let clicked = $state(false);

	let lightMode = $derived($theme === 'light');

	let buttonEl = $state<HTMLButtonElement | null>(null);

	const pullY = tweened(OFFSET, {
		duration: 250,
		easing: cubicOut
	});

	onMount(() => {
		mounted = true;
	});

	// Update pull animation based on drag state
	$effect(() => {
		if (clicked) {
			pullY.set(BOUNCE, { duration: 250 });
		} else if (dragging) {
			pullY.set(currentY - initialY + OFFSET, { duration: 0 });
		} else {
			pullY.set(OFFSET, { duration: 250 });
		}
	});

	function toggleTheme() {
		if (!browser || !document.startViewTransition) {
			theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
			return;
		}

		const w = window.innerWidth;
		const h = window.innerHeight;
		let x = w - 50;
		let y = 30;
		if (buttonEl) {
			const rect = buttonEl.getBoundingClientRect();
			x = rect.left + rect.width / 2;
			y = rect.top + rect.height * 0.8;
		}

		const transition = document.startViewTransition(() => {
			theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
		});

		// Use percentages so the coordinates can't be misscaled on zoomed or
		// high-DPI displays: circle() percentages resolve against the
		// pseudo-element's own box, unlike px in the snapshot coordinate space
		const xp = (x / w) * 100;
		const yp = (y / h) * 100;
		const maxRadius = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
		const rp = (maxRadius / (Math.hypot(w, h) / Math.SQRT2)) * 100;

		transition.ready.then(() => {
			document.documentElement.animate(
				{
					clipPath: [`circle(0% at ${xp}% ${yp}%)`, `circle(${rp}% at ${xp}% ${yp}%)`]
				},
				{
					duration: 500,
					easing: 'ease-in',
					pseudoElement: '::view-transition-new(root)'
				}
			);
		});
	}

	function handleMouseDown(event: MouseEvent) {
		dragging = true;
		initialY = event.clientY;
		currentY = event.clientY;
	}

	function handleMouseMove(event: MouseEvent) {
		if (dragging) {
			currentY = event.clientY < initialY ? initialY : Math.min(event.clientY, initialY + RANGE);
		}
	}

	function handleMouseOut() {
		if (dragging) {
			document.addEventListener('mouseup', handleMouseUp);
		}
	}

	function handleBlur() {
		dragging = false;
		document.removeEventListener('mouseup', handleMouseUp);
	}

	function handleMouseUp() {
		if (!dragging) return;
		dragging = false;

		toggleTheme();

		if (currentY === initialY && currentY !== 0) {
			clicked = true;
			setTimeout(() => (clicked = false), 250);
		} else {
			currentY = 0;
			initialY = 0;
		}

		document.removeEventListener('mouseup', handleMouseUp);
	}

	function handleTouchStart(event: TouchEvent) {
		// Prevent pull-to-refresh behavior on mobile
		document.documentElement.style.overscrollBehavior = 'none';
		document.addEventListener('touchend', handleTouchEnd);

		dragging = true;
		initialY = event.touches[0].clientY;
		currentY = event.touches[0].clientY;
	}

	function handleTouchMove(event: TouchEvent) {
		if (dragging) {
			currentY =
				event.touches[0].clientY < initialY
					? initialY
					: Math.min(event.touches[0].clientY, initialY + RANGE);
		}
	}

	function handleTouchEnd() {
		if (!dragging) return;
		dragging = false;

		toggleTheme();
		currentY = 0;
		initialY = 0;

		// Re-enable pull-to-refresh behavior on mobile
		document.documentElement.style.overscrollBehavior = 'auto';
		document.removeEventListener('touchend', handleTouchEnd);
	}

	function handleTouchCancel() {
		dragging = false;
		currentY = 0;
		initialY = 0;
		document.documentElement.style.overscrollBehavior = 'auto';
		document.removeEventListener('touchend', handleTouchEnd);
	}

	function handleKeyUp(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleTheme();
			clicked = true;
			setTimeout(() => (clicked = false), 250);
		}
	}
</script>

{#if mounted}
	<div
		class="fixed top-0 right-4 z-[100] flex origin-top-right scale-75 flex-col items-center md:right-12 md:scale-100"
	>
		<div class="flex origin-top flex-col items-center" style="transform: translateY({$pullY}px)">
			<!-- Bulb / Pull Cord -->
			<button
				bind:this={buttonEl}
				aria-label="Toggle Theme"
				tabindex="0"
				class="pointer-events-auto cursor-grab touch-none select-none border-none bg-transparent p-0 active:cursor-grabbing"
				onmousedown={(e) => handleMouseDown(e)}
				onmousemove={(e) => handleMouseMove(e)}
				onmouseup={() => handleMouseUp()}
				onmouseout={() => handleMouseOut()}
				onblur={() => handleBlur()}
				ontouchstart={(e) => handleTouchStart(e)}
				ontouchmove={(e) => handleTouchMove(e)}
				ontouchend={() => handleTouchEnd()}
				ontouchcancel={() => handleTouchCancel()}
				onkeyup={(e) => handleKeyUp(e)}
			>
				<svg
					width="24"
					height="112"
					viewBox="0 0 24 112"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<!-- Rope -->
					<path
						d="M9.88232 1V55.4865H14.1176V1H9.88232Z"
						fill={lightMode ? COLORS.Frost : COLORS.Mountains2}
						stroke={COLORS.Black}
						class="transition-all duration-300"
					/>
					<path
						d="M9.88232 55.6177V55.3361C9.88232 54.5688 10.1246 53.8212 10.5747 53.1997V53.1997C10.8172 52.8649 11.115 52.5737 11.4553 52.3388L12.5447 51.5867C12.8849 51.3518 13.1827 51.0607 13.4252 50.7258V50.7258C13.8753 50.1044 14.1176 49.3567 14.1176 48.5894V48.3079"
						stroke={COLORS.Black}
					/>
					<path
						d="M9.88232 49.7698V49.4882C9.88232 48.7209 10.1246 47.9733 10.5747 47.3518V47.3518C10.8172 47.017 11.115 46.7258 11.4553 46.4909L12.5447 45.7388C12.8849 45.5039 13.1827 45.2128 13.4252 44.8779V44.8779C13.8753 44.2565 14.1176 43.5088 14.1176 42.7415V42.46"
						stroke={COLORS.Black}
					/>
					<path
						d="M9.88232 43.9219V43.6403C9.88232 42.873 10.1246 42.1254 10.5747 41.5039V41.5039C10.8172 41.1691 11.115 40.8779 11.4553 40.643L12.5447 39.8909C12.8849 39.656 13.1827 39.3649 13.4252 39.03V39.03C13.8753 38.4086 14.1176 37.6609 14.1176 36.8936V36.6121"
						stroke={COLORS.Black}
					/>
					<path
						d="M9.88232 38.0741V37.7925C9.88232 37.0253 10.1246 36.2776 10.5747 35.6562V35.6562C10.8172 35.3213 11.115 35.0302 11.4553 34.7953L12.5447 34.0432C12.8849 33.8082 13.1827 33.5171 13.4252 33.1823V33.1823C13.8753 32.5608 14.1176 31.8131 14.1176 31.0459V30.7643"
						stroke={COLORS.Black}
					/>
					<path
						d="M9.88232 32.2262V31.9446C9.88232 31.1774 10.1246 30.4297 10.5747 29.8083V29.8083C10.8172 29.4734 11.115 29.1823 11.4553 28.9474L12.5447 28.1953C12.8849 27.9603 13.1827 27.6692 13.4252 27.3343V27.3343C13.8753 26.7129 14.1176 25.9652 14.1176 25.198V24.9164"
						stroke={COLORS.Black}
					/>
					<path
						d="M9.88232 26.3783V26.0967C9.88232 25.3295 10.1246 24.5818 10.5747 23.9604V23.9604C10.8172 23.6255 11.115 23.3344 11.4553 23.0995L12.5447 22.3474C12.8849 22.1124 13.1827 21.8213 13.4252 21.4864V21.4864C13.8753 20.865 14.1176 20.1173 14.1176 19.3501V19.0685"
						stroke={COLORS.Black}
					/>
					<path
						d="M9.88232 20.5304V20.2488C9.88232 19.4816 10.1246 18.7339 10.5747 18.1125V18.1125C10.8172 17.7776 11.115 17.4865 11.4553 17.2516L12.5447 16.4995C12.8849 16.2645 13.1827 15.9734 13.4252 15.6385V15.6385C13.8753 15.0171 14.1176 14.2694 14.1176 13.5022V13.2206"
						stroke={COLORS.Black}
					/>
					<path
						d="M9.88232 14.6825V14.4009C9.88232 13.6337 10.1246 12.886 10.5747 12.2646V12.2646C10.8172 11.9297 11.115 11.6386 11.4553 11.4037L12.5447 10.6516C12.8849 10.4166 13.1827 10.1255 13.4252 9.79065V9.79065C13.8753 9.16923 14.1176 8.42154 14.1176 7.65426V7.37268"
						stroke={COLORS.Black}
					/>
					<path
						d="M9.88232 8.83463V8.55305C9.88232 7.78577 10.1246 7.03808 10.5747 6.41666V6.41666C10.8172 6.08179 11.115 5.79066 11.4553 5.55576L12.5447 4.80365C12.8849 4.56875 13.1827 4.27762 13.4252 3.94275V3.94275C13.8753 3.32133 14.1176 2.57364 14.1176 1.80636V1.52478"
						stroke={COLORS.Black}
					/>

					<!-- Socket -->
					<path
						d="M4.94116 70.4304V56.8867C4.94116 55.7821 5.83659 54.8867 6.94116 54.8867H17.0588C18.1634 54.8867 19.0588 55.7821 19.0588 56.8867V70.4304C19.0588 71.5349 18.1634 72.4304 17.0588 72.4304H6.94116C5.83659 72.4304 4.94116 71.5349 4.94116 70.4304Z"
						fill={COLORS.Black}
					/>

					<!-- Bulb -->
					<path
						d="M8.21141 108.329L6.70588 107.883C2.77306 106.168 0.528975 101.981 1.27918 97.7563L5.4609 74.2097C5.57824 73.5489 5.99655 72.9804 6.5925 72.6719C6.8989 72.5132 7.23891 72.4304 7.58395 72.4304H16.416C16.7611 72.4304 17.1011 72.5132 17.4075 72.6719C18.0035 72.9804 18.4218 73.5489 18.5391 74.2097L22.7208 97.7563C23.471 101.981 21.2269 106.168 17.2941 107.883L15.7886 108.329C15.166 108.513 14.6302 108.914 14.2788 109.46C13.2117 111.118 10.7883 111.118 9.72125 109.46C9.36979 108.914 8.83401 108.513 8.21141 108.329Z"
						fill={lightMode ? COLORS.Frost : COLORS.Gold}
						stroke={COLORS.Black}
						class="transition-all duration-300"
					/>

					<!-- Filament -->
					<path
						d="M11.2941 72.4304V83.9389C11.2941 84.2183 11.2356 84.4946 11.1223 84.75L10.8595 85.3423C10.6943 85.7147 10.7618 86.1492 11.0322 86.4539V86.4539C11.2009 86.6441 11.2941 86.8896 11.2941 87.1438V96.6957C11.2941 96.95 11.2009 97.1954 11.0322 97.3857V97.3857C10.7618 97.6903 10.6943 98.1249 10.8595 98.4972L11.0079 98.8316C11.1819 99.224 11.5708 99.4769 12 99.4769V99.4769C12.4292 99.4769 12.8181 99.224 12.9922 98.8316L13.1406 98.4972C13.3058 98.1249 13.2383 97.6903 12.9679 97.3857V97.3857C12.7991 97.1954 12.7059 96.95 12.7059 96.6957V87.1438C12.7059 86.8896 12.7991 86.6441 12.9679 86.4539V86.4539C13.2383 86.1492 13.3058 85.7147 13.1406 85.3423L12.8778 84.75C12.7644 84.4946 12.7059 84.2183 12.7059 83.9389V72.4304"
						stroke={COLORS.Black}
					/>
				</svg>
			</button>
		</div>
	</div>
{/if}