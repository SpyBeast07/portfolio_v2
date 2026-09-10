<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, tick } from 'svelte';
	import { siteData } from '$lib/stores/site-data';
	import { moreMenuItems } from '$lib/data';

	// Props
	let { mode = 'floating' }: { mode?: 'floating' | 'sidebar' } = $props();

	let activeSection = $state('');
	let activeElement = $state<HTMLElement | null>(null);
	let elements: HTMLElement[] = $state([]);
	let indicatorStyle = $state({ left: '0px', width: '0px', opacity: 0 });

	// Derived state for pathname
	let pathname = $derived($page.url.pathname);

	// Floating Mode: Active based on current route
	let navItemsWithActive = $derived(
		$siteData.navItems.map((item) => ({
			...item,
			active: pathname === item.href,
			isMore: false
		}))
	);

	// "More" is active on any of its dropdown routes
	let moreActive = $derived(moreMenuItems.some((item) => pathname === item.href));

	// Full floating nav: regular items plus the trailing "More" button
	let floatingItems = $derived([
		...navItemsWithActive,
		{ name: 'More', href: '#', active: moreActive, isMore: true }
	]);

	// Sidebar Mode: Active based on scroll position (Spy)
	// Logic remains same, just mapping over sideNavItems
	let sideNavItemsWithActive = $derived(
		$siteData.sideNavItems.map((item) => ({
			...item,
			active:
				(activeSection === '' && item.href === '#') || activeSection === item.href.replace('#', '')
		}))
	);

	function updateIndicator() {
		const activeIndex = floatingItems.findIndex((item) => item.active);
		if (activeIndex !== -1 && elements[activeIndex]) {
			const activeEl = elements[activeIndex];
			const { offsetLeft, offsetWidth } = activeEl;
			indicatorStyle = {
				left: `${offsetLeft}px`,
				width: `${offsetWidth}px`,
				opacity: 1
			};
		} else {
			indicatorStyle = { ...indicatorStyle, opacity: 0 };
		}
	}

	$effect(() => {
		// Dependency on pathname to trigger update
		pathname;
		// Wait for DOM update then update indicator
		tick().then(updateIndicator);
	});

	onMount(() => {
		if (mode !== 'sidebar') {
			// Initial update for floating mode
			// We need a small delay or tick to ensure elements are rendered and sized
			setTimeout(updateIndicator, 50);
			window.addEventListener('resize', updateIndicator);
			return () => window.removeEventListener('resize', updateIndicator);
		}

		const sections = document.querySelectorAll('section[id]');
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{
				rootMargin: '-20% 0px -70% 0px', // Trigger when section is near top/center
				threshold: 0
			}
		);

		sections.forEach((section) => observer.observe(section));

		// Handle "Home" being active when near top
		const handleScroll = () => {
			if (window.scrollY < 100) activeSection = ''; // Empty string maps to Home in our logic below
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			sections.forEach((section) => observer.unobserve(section));
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function handleLinkClick(e: MouseEvent, item: { href: string }) {
		if (item.href === pathname) {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}
		if (item.href.startsWith('#')) {
			e.preventDefault();
			const id = item.href.replace('#', '');
			if (id === '') window.scrollTo({ top: 0, behavior: 'smooth' });
			else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function handleSidebarMouseEnter(e: MouseEvent, active: boolean) {
		if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--foreground)';
	}

	function handleSidebarMouseLeave(e: MouseEvent, active: boolean) {
		if (!active)
			(e.currentTarget as HTMLElement).style.color =
				'color-mix(in oklab, var(--foreground) 55%, transparent)';
	}

	function handleFloatingMouseEnter(e: MouseEvent, active: boolean) {
		if (!active) {
			(e.currentTarget as HTMLElement).style.color = 'var(--foreground)';
		}
	}

	function handleFloatingMouseLeave(e: MouseEvent, active: boolean) {
		if (!active) {
			(e.currentTarget as HTMLElement).style.color =
				'color-mix(in oklab, var(--foreground) 60%, transparent)';
		}
	}
</script>

{#if mode === 'sidebar'}
	<nav class="flex flex-col items-start gap-6">
		{#each sideNavItemsWithActive as item (item.name)}
			<a
				href={item.href}
				onclick={(e) => handleLinkClick(e, item)}
				class="group flex items-center gap-5 text-base font-medium tracking-widest uppercase transition-colors duration-300"
				style="color: {item.active
					? 'var(--foreground)'
					: 'color-mix(in oklab, var(--foreground) 560%, transparent)'};"
				onmouseenter={(e) => handleSidebarMouseEnter(e, item.active)}
				onmouseleave={(e) => handleSidebarMouseLeave(e, item.active)}
			>
				<span
					class={`block h-[1px] transition-all duration-300 ${item.active ? 'w-8' : 'w-0 group-hover:w-4'}`}
					style="background-color: var(--foreground);"
				></span>
				{item.name}
			</a>
		{/each}
	</nav>
{:else}
	<div class="max-w-[calc(100vw-2rem)]">
		<nav
			class="relative flex items-center gap-0.5 rounded-full p-1 shadow-lg ring-1 ring-black/5 backdrop-blur-md sm:gap-1"
			style="background-color: color-mix(in oklab, var(--background) 70%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
		>
			<!-- Sliding Background Indicator -->
			<div
				class="absolute top-1 bottom-1 rounded-full bg-foreground transition-all duration-300 ease-out"
				style={`left: ${indicatorStyle.left}; width: ${indicatorStyle.width}; opacity: ${indicatorStyle.opacity};`}
			></div>

			{#each floatingItems as item, i (item.name)}
				{#if item.isMore}
					<div class="group relative" bind:this={elements[i]}>
						<button
							type="button"
							aria-haspopup="menu"
							class={`relative z-10 flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium transition-colors duration-300 sm:px-3 sm:py-2 sm:text-sm md:px-6 md:py-2.5`}
							style={`
					            color: ${item.active ? 'var(--background)' : 'color-mix(in oklab, var(--foreground) 60%, transparent)'};
					          `}
							onmouseenter={(e) => handleFloatingMouseEnter(e, item.active)}
							onmouseleave={(e) => handleFloatingMouseLeave(e, item.active)}
						>
							{item.name}
							<svg
								class="h-3 w-3 transition-transform duration-300 group-hover:rotate-180"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="m6 9 6 6 6-6"></path>
							</svg>
						</button>

						<!-- Dropdown -->
						<div
							class="absolute top-full left-1/2 z-50 hidden -translate-x-1/2 pt-2 group-focus-within:block group-hover:block"
						>
							<div
								class="min-w-44 rounded-2xl p-1.5 shadow-lg ring-1 ring-black/5"
								style="background-color: var(--background); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
								role="menu"
							>
								{#each moreMenuItems as m (m.href)}
									{@const active = pathname === m.href}
									<a
										href={m.href}
										onclick={(e) => handleLinkClick(e, m)}
										role="menuitem"
										class={`flex items-center justify-between rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300 ${active ? 'bg-foreground text-background' : ''}`}
										style={active
											? ''
											: 'color: color-mix(in oklab, var(--foreground) 70%, transparent)'}
										onmouseenter={(e) => {
											if (!active)
												(e.currentTarget as HTMLElement).style.color = 'var(--foreground)';
										}}
										onmouseleave={(e) => {
											if (!active)
												(e.currentTarget as HTMLElement).style.color =
													'color-mix(in oklab, var(--foreground) 70%, transparent)';
										}}
									>
										{m.name}
									</a>
								{/each}
							</div>
						</div>
					</div>
				{:else}
					<a
						href={item.href}
						bind:this={elements[i]}
						onclick={(e) => handleLinkClick(e, item)}
						class={`relative z-10 rounded-full px-2 py-1.5 text-xs font-medium transition-colors duration-300 sm:px-3 sm:py-2 sm:text-sm md:px-6 md:py-2.5`}
						style={`
			            color: ${item.active ? 'var(--background)' : 'color-mix(in oklab, var(--foreground) 60%, transparent)'};
			          `}
						onmouseenter={(e) => handleFloatingMouseEnter(e, item.active)}
						onmouseleave={(e) => handleFloatingMouseLeave(e, item.active)}
					>
						{item.name}
					</a>
				{/if}
			{/each}
		</nav>
	</div>
{/if}
