<script lang="ts">
	import { page } from '$app/stores';
	import { siteData } from '$lib/stores/site-data';
	import type { SocialLink } from '$lib/data';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import SocialPill from '$lib/components/shared/SocialPill.svelte';
	import VerticalEmail from '$lib/components/layout/VerticalEmail.svelte';
	import { GithubIcon, LinkedinIcon, MediumIcon, GmailIcon } from '$lib/components/ui/icons';

	const brandColors: Record<string, string> = {
		GitHub: '#2ea043',
		LinkedIn: '#0a66c2',
		Email: '#ea4335',
		Medium: 'var(--foreground)'
	};

	const getIcon = (label: string) => {
		switch (label) {
			case 'GitHub':
				return GithubIcon;
			case 'LinkedIn':
				return LinkedinIcon;
			case 'Medium':
				return MediumIcon;
			default:
				return null;
		}
	};

	const getHandle = (link: SocialLink) => {
		if (link.href.startsWith('mailto:')) return link.href.replace('mailto:', '');
		return link.href.replace(/^https?:\/\//, '').replace(/\/+$/, '');
	};
</script>

<svelte:head>
	<title>Links | Kushagra Gupta</title>
	<meta
		name="description"
		content="My Digital Presence - all my links in one place by Kushagra Gupta."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Links | Kushagra Gupta" />
	<meta
		property="og:description"
		content="My Digital Presence - all my links in one place by Kushagra Gupta."
	/>
	<meta property="og:image" content="{$page.url.origin}/logo.webp" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$page.url.href} />
	<meta property="twitter:title" content="Links | Kushagra Gupta" />
	<meta
		property="twitter:description"
		content="My Digital Presence - all my links in one place by Kushagra Gupta."
	/>
	<meta property="twitter:image" content="{$page.url.origin}/logo.webp" />
</svelte:head>

<div class="relative min-h-screen bg-background text-foreground selection:bg-yellow-500/30">
	<!-- Background Effects -->
	<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-40"></div>
	<div
		class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
	></div>

	<!-- Vertical Email -->
	<div class="hidden md:block">
		<VerticalEmail />
	</div>

	<!-- Desktop Left Panel: matches About/Work/Blogs sidebar -->
	<aside class="hidden md:block">
		<div
			class="pointer-events-none fixed top-5 left-0 z-40 flex h-screen w-[40%] flex-col pt-[16vh] pl-32"
		>
			<h1
				class="pointer-events-auto mb-1 font-playfair text-5xl leading-none font-bold tracking-tighter select-none"
				style="color: var(--foreground);"
			>
				Links
			</h1>

			<div class="pointer-events-auto mt-4 flex flex-col items-start gap-10">
				<div class="items-left flex flex-col text-xl leading-tight font-medium text-neutral-400">
					<h2>My Digital</h2>
					<h2
						class="text-xl font-medium transition-colors duration-300"
						style="color: var(--icon-color)"
					>
						Presence
					</h2>
				</div>
			</div>
		</div>

		<!-- Social Icon Chips: fixed bottom-left like Home -->
		<div class="pointer-events-auto fixed bottom-16 left-32 z-[60]">
			<SocialPill />
		</div>
	</aside>

	<!-- Right Panel: Content -->
	<main class="relative z-20 px-6 pt-28 pb-24 md:ml-[40%] md:w-[60%] md:px-16 md:pt-24 lg:pr-32">
		<section class="scroll-mt-28 pt-4 md:pt-16 lg:pt-24">
			<SectionHeading class="mb-12 text-4xl lg:text-5xl">Connnect / Follow / Chat</SectionHeading>

			<div class="flex flex-col gap-4">
				{#each $siteData.socialLinks as link (link.href)}
					{@const Icon = getIcon(link.label)}
					{@const brand = brandColors[link.label] ?? 'var(--foreground)'}
					<a
						href={link.href}
						aria-label={link.label}
						target="_blank"
						rel="noopener noreferrer"
						class="group relative flex items-center gap-5 overflow-hidden rounded-2xl border px-6 py-5 transition-all duration-300 group-hover:-translate-y-1 sm:gap-7 sm:px-8 sm:py-6"
						style="background-color: color-mix(in oklab, var(--background) 70%, transparent); border-color: color-mix(in oklab, var(--foreground) 15%, transparent); backdrop-filter: blur(12px); --brand: {brand};"
					>
						<!-- Bottom-to-top wash -->
						<span
							aria-hidden="true"
							class="pointer-events-none absolute inset-0 translate-y-[101%] transition-transform duration-500 ease-out group-hover:translate-y-0"
							style="background: linear-gradient(to top, color-mix(in oklab, var(--foreground) 9%, transparent), color-mix(in oklab, var(--foreground) 9%, transparent) 55%, transparent);"
						></span>

						<!-- Content -->
						<div class="relative z-10 flex w-full items-center gap-5 sm:gap-7">
							<!-- Icon -->
							<span
								class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-(--idle) transition-colors duration-300 group-hover:text-(--brand) sm:h-14 sm:w-14"
								style="--idle: color-mix(in oklab, var(--foreground) 60%, transparent);"
							>
								{#if link.label === 'Email'}
									<span class="grayscale transition duration-300 group-hover:grayscale-0">
										<GmailIcon width={28} height={28} />
									</span>
								{:else if Icon}
									<Icon width={28} height={28} />
								{/if}
							</span>

							<!-- Label + Handle -->
							<div class="min-w-0 flex-1">
								<h3
									class="text-lg leading-tight font-semibold text-(--idle-label) transition-colors duration-300 group-hover:text-(--brand) sm:text-xl"
									style="--idle-label: var(--foreground);"
								>
									{link.label}
								</h3>
								<p
									class="mt-1 truncate font-mono text-xs tracking-wide text-(--idle) transition-colors duration-300 group-hover:text-(--brand) sm:text-sm"
									style="--idle: color-mix(in oklab, var(--foreground) 50%, transparent);"
								>
									{getHandle(link)}
								</p>
							</div>

							<!-- Visit + Arrow Circle -->
							<div class="flex flex-shrink-0 items-center gap-3">
								<span
									class="-translate-x-2 text-xs font-semibold tracking-widest text-(--idle) uppercase opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-(--brand) group-hover:opacity-100"
									style="--idle: color-mix(in oklab, var(--foreground) 50%, transparent);"
								>
									Visit
								</span>
								<span
									class="flex h-11 w-11 items-center justify-center rounded-full border border-(--idle-border) text-(--idle) transition-colors duration-300 group-hover:border-(--brand)/50 group-hover:bg-(--brand)/10 group-hover:text-(--brand) sm:h-12 sm:w-12"
									style="--idle: color-mix(in oklab, var(--foreground) 50%, transparent); --idle-border: color-mix(in oklab, var(--foreground) 20%, transparent);"
								>
									<svg
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
									>
										<path d="M5 12h14"></path>
										<path d="m12 5 7 7-7 7"></path>
									</svg>
								</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>
	</main>
</div>
