<script lang="ts">
	import { page } from '$app/stores';
	import TimelineItem from '$lib/components/shared/TimelineItem.svelte';
	import { about, education, experiences, socialLinks } from '$lib/data';
	import PageHeading from '$lib/components/shared/PageHeading.svelte';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import { EmailIcon, FileTextIcon, GithubIcon, LinkedinIcon } from '$lib/components/ui/icons';

	const getIcon = (label: string) => {
		switch (label) {
			case 'GitHub':
				return GithubIcon;
			case 'LinkedIn':
				return LinkedinIcon;
			case 'Email':
				return EmailIcon;
			default:
				return null;
		}
	};

	function handleSocialMouseEnter(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.color = 'var(--foreground)';
		target.style.transform = 'scale(1.1)';
	}

	function handleSocialMouseLeave(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.color = 'color-mix(in oklab, var(--foreground) 60%, transparent)';
		target.style.transform = 'scale(1)';
	}

	function handleResumeMouseEnter(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.opacity = '0.9';
		target.style.transform = 'scale(1.05)';
	}

	function handleResumeMouseLeave(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.opacity = '1';
		target.style.transform = 'scale(1)';
	}
</script>

<svelte:head>
	<title>About | Kushagra Gupta</title>
	<meta name="description" content="Learn more about Kushagra Gupta, a Developer and AI Enthusiast." />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="About | Kushagra Gupta" />
	<meta property="og:description" content="Learn more about Kushagra Gupta, a Developer and AI Enthusiast." />
	<meta property="og:image" content="{$page.url.origin}/logo.png" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$page.url.href} />
	<meta property="twitter:title" content="About | Kushagra Gupta" />
	<meta property="twitter:description" content="Learn more about Kushagra Gupta, a Developer and AI Enthusiast." />
	<meta property="twitter:image" content="{$page.url.origin}/logo.png" />
</svelte:head>

<div class="bg-background text-foreground relative min-h-screen selection:bg-yellow-500/30">
	<!-- Background Effects -->
	<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-40"></div>
	<div
		class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
	></div>

	<div class="relative z-10 container mx-auto max-w-4xl px-6 py-24">
		<div class="mb-12">
			<!-- Navbar removed - in layout -->
			<div class="mt-24">
				<h1 class="font-playfair mb-12 text-5xl font-bold" style="color: var(--foreground);">
					{about.headline}
				</h1>

				<div
					class="font-outfit block space-y-6 text-lg leading-relaxed whitespace-pre-line"
					style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
				>
					<!-- Photo -->
					{#if about.photo}
						<div
							class="mb-8 flex w-full justify-center md:float-right md:mt-2 md:mb-4 md:ml-12 md:block md:w-auto"
						>
							<div class="relative h-48 w-48 md:h-64 md:w-64">
								<img
									src={about.photo}
									alt="Kushagra"
									class="h-full w-full rounded-2xl object-cover shadow-sm transition-all duration-500"
									style="border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
								/>
								<!-- Offset Background decoration -->
								<div
									class="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-2xl"
									style="background-color: color-mix(in oklab, var(--foreground) 5%, transparent);"
								></div>
							</div>
						</div>
					{/if}

					<!-- Text Content -->
					{#each about.long as paragraph, index}
						<p class={index === about.long.length - 1 ? 'text-foreground/80 font-medium' : ''}>
							{paragraph}
						</p>
					{/each}
				</div>
			</div>

			<!-- Social Icons -->
			<div class="mt-10 mb-10 flex gap-6">
				{#each socialLinks as { href, label }}
					{@const Icon = getIcon(label)}
					<a
						{href}
						aria-label={label}
						target="_blank"
						rel="noopener noreferrer"
						class="transition-transform duration-200"
						style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
						onmouseenter={handleSocialMouseEnter}
						onmouseleave={handleSocialMouseLeave}
					>
						{#if Icon}
							<Icon width={20} height={20} />
						{/if}
					</a>
				{/each}
			</div>

			<!-- Resume Button -->
			<div class="mb-24 lg:mb-32">
				<a
					href="/resume"
					class="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform"
					style="color: var(--background); background-color: var(--foreground);"
					onmouseenter={handleResumeMouseEnter}
					onmouseleave={handleResumeMouseLeave}
				>
					<FileTextIcon width={16} height={16} />
					View Resume
				</a>
			</div>

			<div class="space-y-4">
				<!-- Experience -->
				<div class="mb-24 lg:mb-32">
					<SectionHeading class="mb-12 text-5xl">Where I Worked</SectionHeading>
					{#each experiences as exp}
						<TimelineItem {...exp} />
					{/each}
				</div>

				<!-- Education -->
				<div class="mb-24 lg:mb-32">
					<SectionHeading class="mb-12 text-5xl">Where I Studied</SectionHeading>
					{#each education as edu}
						<TimelineItem {...edu} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
