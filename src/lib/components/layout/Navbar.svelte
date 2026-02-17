<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, tick } from 'svelte';
	import { navItems, sideNavItems } from '$lib/data';

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
		navItems.map((item) => ({
			...item,
			active: pathname === item.href
		}))
	);

	// Sidebar Mode: Active based on scroll position (Spy)
	// Logic remains same, just mapping over sideNavItems
	let sideNavItemsWithActive = $derived(
		sideNavItems.map((item) => ({
			...item,
			active:
				(activeSection === '' && item.href === '#') || activeSection === item.href.replace('#', '')
		}))
	);

	function updateIndicator() {
		const activeIndex = navItemsWithActive.findIndex(item => item.active);
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
	<div class="fixed left-1/2 z-50 -translate-x-1/2">
		<nav
			class="relative flex items-center gap-1 rounded-full p-1 shadow-lg ring-1 ring-black/5 backdrop-blur-md"
			style="background-color: color-mix(in oklab, var(--background) 70%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
		>
			<!-- Sliding Background Indicator -->
			<div
				class="absolute top-1 bottom-1 rounded-full bg-foreground transition-all duration-300 ease-out"
				style={`left: ${indicatorStyle.left}; width: ${indicatorStyle.width}; opacity: ${indicatorStyle.opacity};`}
			></div>

			{#each navItemsWithActive as item, i (item.name)}
				<a
					href={item.href}
					bind:this={elements[i]}
					onclick={(e) => handleLinkClick(e, item)}
					class={`relative z-10 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 min-[375px]:px-6 min-[375px]:py-2.5`}
					style={`
            color: ${item.active ? 'var(--background)' : 'color-mix(in oklab, var(--foreground) 60%, transparent)'};
          `}
					onmouseenter={(e) => handleFloatingMouseEnter(e, item.active)}
					onmouseleave={(e) => handleFloatingMouseLeave(e, item.active)}
				>
					{item.name}
				</a>
			{/each}
		</nav>
	</div>
{/if}
