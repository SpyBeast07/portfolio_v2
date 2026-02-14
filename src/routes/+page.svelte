<script lang="ts" module>
	let visitCount = 0;
</script>

<script lang="ts">
	import { Motion, useViewportScroll, useTransform } from 'svelte-motion';
	import { onMount } from 'svelte';

	import VerticalEmail from '$lib/components/layout/VerticalEmail.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import BlogsSection from '$lib/components/home/BlogsSection.svelte';
	import NowSection from '$lib/components/home/NowSection.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import SocialPill from '$lib/components/shared/SocialPill.svelte';
	import HeroTitle from '$lib/components/home/HeroTitle.svelte';
	import HeroLogo from '$lib/components/home/HeroLogo.svelte';
	import PageLoader from '$lib/components/ui/PageLoader.svelte';
	import { role, quote } from '$lib/data';
	import { StackIcon } from '$lib/components/ui/icons';

	let isMobile = $state(false);
	let isLoading = $state(visitCount++ === 0);

	const { scrollY } = useViewportScroll();

	/* --- Animations --- */
	const logoOpacity = useTransform(scrollY, [0, 200], [1, 0]);
	const logoScale = useTransform(scrollY, [0, 200], [1, 0.8]);
	const heroOpacity = useTransform(scrollY, [0, 150], [1, 0]);
	const pointerEventsHero = useTransform(scrollY, (v) => (v > 150 ? 'none' : 'auto'));
	const sidebarOpacity = useTransform(scrollY, [400, 600], [0, 1]);
	const sidebarY = useTransform(scrollY, [400, 600], [20, 0]);

	/* Name animation */
	const t = useTransform(scrollY, [0, 600], [0, 1]);
	const nameScale = useTransform(t, [0, 1], [1, 0.25]);
	const nameX = useTransform(t, [0, 1], ['-50%', '-37%']);
	const nameLeft = useTransform(t, (v) => `calc(50% * ${1 - v} + 8rem * ${v})`);
	const nameTop = useTransform(t, [0, 1], ['35vh', '22vh']);

	/* Content animation */
	const spacerHeight = useTransform(scrollY, [0, 120], ['100vh', '55vh']);

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		if (isLoading) {
			Promise.all([
				new Promise((resolve) => setTimeout(resolve, 900)),
				document.readyState === 'complete'
					? Promise.resolve()
					: new Promise((resolve) => window.addEventListener('load', resolve))
			]).then(() => {
				isLoading = false;
			});
		}

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	});
</script>

<svelte:head>
	<title>Kushagra Gupta | Developer & AI Enthusiast</title>
	<meta name="description" content="Portfolio of Kushagra Gupta - Developer & AI Enthusiast. Explore my work, projects, and journey in software development and artificial intelligence." />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://kushagra.dev/" />
	<meta property="og:title" content="Kushagra Gupta | Developer & AI Enthusiast" />
	<meta property="og:description" content="Portfolio of Kushagra Gupta - Developer & AI Enthusiast. Explore my work, projects, and journey in software development and artificial intelligence." />
	<meta property="og:image" content="https://kushagra.dev/logo.png" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://kushagra.dev/" />
	<meta property="twitter:title" content="Kushagra Gupta | Developer & AI Enthusiast" />
	<meta property="twitter:description" content="Portfolio of Kushagra Gupta - Developer & AI Enthusiast. Explore my work, projects, and journey in software development and artificial intelligence." />
	<meta property="twitter:image" content="https://kushagra.dev/logo.png" />
</svelte:head>

<!-- Loading Screen - Only visible while loading -->
<PageLoader isVisible={isLoading} />

<div
	class="bg-background text-foreground relative min-h-screen w-full transition-colors duration-300 selection:bg-yellow-500/30"
>
	<!-- Global Background -->
	<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-40"></div>
	<div
		class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
	></div>

	<!-- Fixed Elements -->
	<div class="hidden md:block">
		<VerticalEmail />
	</div>

	<Motion style={{ opacity: heroOpacity, pointerEvents: pointerEventsHero }} let:motion>
		<div use:motion class="block md:hidden">
			<VerticalEmail />
		</div>
	</Motion>

	<!-- Desktop Name -->
	<div class="pointer-events-none fixed inset-0 z-10 hidden md:block">
		<Motion
			style={{
				top: nameTop,
				left: nameLeft,
				scale: nameScale,
				x: nameX,
				transformOrigin: 'left top',
				zIndex: 40
			}}
			let:motion
		>
			<div use:motion class="pointer-events-auto absolute -translate-y-[8vw]">
				<HeroTitle
					class="text-[14vw]"
					spanClassName="left-[77%] top-[48%] translate-y-[2vw] text-[7vw]"
				/>
			</div>
		</Motion>
	</div>

	<!-- Mobile Name -->
	<div class="pointer-events-none fixed inset-0 z-10 block md:hidden">
		<Motion style={{ top: '25vh', opacity: heroOpacity }} let:motion>
			<div use:motion class="pointer-events-auto absolute top-[28%] left-1/2 -translate-x-1/2">
				<HeroTitle
					class="pb-8 text-[18vw]"
					spanClassName="left-[75%] top-[35%] translate-y-[4vw] text-[10vw]"
				/>
			</div>
		</Motion>
	</div>

	<!-- Center Logo -->
	<Motion style={{ opacity: logoOpacity, scale: logoScale }} let:motion>
		<div
			use:motion
			class="pointer-events-none fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
		>
			<HeroLogo />
		</div>
	</Motion>

	<!-- Sidebar -->
	<div
		class="pointer-events-none fixed top-0 left-0 z-40 hidden h-screen w-[40%] flex-col pt-[25vh] pl-32 md:flex"
	>
		<Motion style={{ opacity: sidebarOpacity, y: sidebarY, pointerEvents: 'auto' }} let:motion>
			<div use:motion class="pointer-events-auto mt-4 flex flex-col items-start gap-10">
				<div class="flex flex-col items-center text-xl leading-tight font-medium text-neutral-400">
					<h2>{role.line1}</h2>
					<h2
						class="text-xl font-medium transition-colors duration-300"
						style="color: var(--icon-color)"
					>
						{role.line2}
					</h2>
				</div>

				<div class="w-full">
					<Navbar mode="sidebar" />
				</div>
			</div>
		</Motion>
	</div>

	<!-- Floating Navbar -->
	<div class="pointer-events-none fixed top-0 left-0 z-30 h-full w-full">
		<div class="pointer-events-auto absolute top-8 left-1/2 -translate-x-1/2">
			<Navbar mode="floating" />
		</div>
	</div>

	<!-- Hero Role -->
	<Motion style={{ opacity: heroOpacity }} let:motion>
		<div
			use:motion
			class="fixed right-16 bottom-16 z-20 hidden flex-col items-center gap-2 text-center md:flex"
		>
			<StackIcon
				width={32}
				height={32}
				class="opacity-90 transition-colors duration-300"
				style="color: var(--icon-color)"
			/>
			<div class="flex flex-col items-center text-xl leading-tight font-medium text-neutral-400">
				<span>{role.line1}</span>
				<span class="transition-colors duration-300" style="color: var(--icon-color)">
					{role.line2}
				</span>
			</div>
		</div>
	</Motion>

	<!-- Social Pills -->
	<div class="pointer-events-auto fixed bottom-16 left-32 z-[60] hidden md:block">
		<SocialPill />
	</div>

	<Motion style={{ opacity: logoOpacity, pointerEvents: pointerEventsHero }} let:motion>
		<div
			use:motion
			class="pointer-events-auto fixed top-[82%] left-1/2 z-[60] origin-center -translate-x-1/2 scale-85 md:hidden"
		>
			<SocialPill />
		</div>
	</Motion>

	<!-- Main Content -->
	<div class="relative z-20 w-full">
		{#if isMobile}
			<Motion style={{ height: spacerHeight }} let:motion>
				<div use:motion></div>
			</Motion>
		{:else}
			<div style="height: 100vh"></div>
		{/if}
			<main class="px-6 pt-24 pb-24 md:ml-[40%] md:w-[60%] md:px-16">
				<section class="mb-24 pt-10 lg:mb-40">
					<h2
						class="font-playfair text-2xl leading-snug font-bold md:text-3xl"
						style="color: var(--foreground)"
					>
						“{quote}”
					</h2>
				</section>

				<NowSection />
				<BlogsSection />
				<Footer />
			</main>
		</div>

</div>
