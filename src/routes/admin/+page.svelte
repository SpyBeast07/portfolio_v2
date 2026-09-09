<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { signOutUser } from '$lib/auth';
	import { user, authReady, initAuth } from '$lib/stores/auth';

	const sections: { title: string; doc: string; hint: string }[] = [
		{ title: 'Now', doc: 'data/now', hint: "Your current 'focus' section" },
		{ title: 'About', doc: 'data/about', hint: 'Bio, experiences, education & skills' },
		{ title: 'Work', doc: 'data/work', hint: 'Projects, categories & page headings' },
		{ title: 'Blogs', doc: 'data/blogs', hint: 'Posts, excerpts & content' }
	];

	onMount(() => {
		initAuth();
	});

	// Signed out? Bounce to /login.
	$effect(() => {
		if ($authReady && !$user) {
			goto('/login');
		}
	});

	async function handleSignOut() {
		await signOutUser();
		// user becomes null → the $effect above redirects to /login.
	}
</script>

<svelte:head>
	<title>Admin | Kushagra Gupta</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="bg-background text-foreground relative min-h-screen">
	<!-- Background Effects -->
	<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-40"></div>
	<div
		class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
	></div>

	<div class="relative z-10 container mx-auto max-w-4xl px-4 py-24 md:px-6">
		{#if !$authReady}
			<div class="flex min-h-[50vh] items-center justify-center">
				<p class="text-sm opacity-60">Checking session…</p>
			</div>
		{:else if $user}
			<div class="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
				<div>
					<h1 class="font-playfair text-3xl font-bold md:text-4xl">Admin</h1>
					<p class="mt-2 text-sm opacity-70">Signed in as {$user.email}</p>
				</div>
				<div class="flex items-center gap-3">
					<a
						href="/"
						class="rounded-full border px-5 py-2 text-sm font-medium transition-opacity hover:opacity-70"
						style="border-color: color-mix(in oklab, var(--foreground) 20%, transparent);"
					>
						View site
					</a>
					<button
						onclick={handleSignOut}
						class="rounded-full px-5 py-2 text-sm font-medium transition-transform hover:scale-105"
						style="color: var(--background); background-color: var(--foreground);"
					>
						Sign out
					</button>
				</div>
			</div>

			<p class="mb-8 max-w-2xl text-sm leading-relaxed opacity-70">
				Everything here is stored in Firestore and your changes go live on the site immediately.
				Editors for each section are coming next.
			</p>

			<div class="grid gap-4 sm:grid-cols-2">
				{#each sections as item}
					<div
						class="rounded-xl p-6"
						style="background-color: color-mix(in oklab, var(--foreground) 5%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
					>
						<h2 class="font-playfair text-xl font-bold">{item.title}</h2>
						<p class="mt-1 font-mono text-xs opacity-50">{item.doc}</p>
						<p class="mt-3 text-sm opacity-70">{item.hint}</p>
						<span
							class="mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium"
							style="background-color: color-mix(in oklab, var(--foreground) 10%, transparent);"
						>
							Editor coming soon
						</span>
					</div>
				{/each}
			</div>

			<div
				class="mt-6 rounded-xl p-6 text-sm leading-relaxed opacity-70"
				style="background-color: color-mix(in oklab, var(--foreground) 3%, transparent); border: 1px dashed color-mix(in oklab, var(--foreground) 15%, transparent);"
			>
				<strong class="text-foreground">Not here:</strong> nav, social links, and identity are
				always read from <code class="font-mono text-xs">src/lib/data/index.ts</code> in the
				codebase, so they can't be changed from this portal.
			</div>
		{:else}
			<div class="flex min-h-[50vh] items-center justify-center">
				<p class="text-sm opacity-60">Redirecting to login…</p>
			</div>
		{/if}
	</div>
</div>