<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { signOutUser, isAdmin } from '$lib/auth';
	import { user, authReady, initAuth } from '$lib/stores/auth';
	import '$lib/components/admin/admin.css';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		initAuth();
	});

	// Signed out or not admin? Bounce to /login.
	$effect(() => {
		if ($authReady && (!$user || !isAdmin($user))) {
			goto('/login');
		}
	});

	const current = $derived($page.url.pathname);

	const viewSiteHref = $derived(
		current === '/admin/about'
			? '/about'
			: current === '/admin/work'
				? '/work'
				: current === '/admin/blogs'
					? '/blogs'
					: '/'
	);

	const tabs = [
		{ href: '/admin', label: 'Dashboard' },
		{ href: '/admin/now', label: 'Now' },
		{ href: '/admin/about', label: 'About' },
		{ href: '/admin/work', label: 'Work' },
		{ href: '/admin/blogs', label: 'Blogs' }
	];

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

	<div class="relative z-10 container mx-auto max-w-4xl px-4 pb-20 pt-24 md:px-6">
		{#if !$authReady}
			<div class="flex min-h-[50vh] items-center justify-center">
				<p class="text-sm opacity-60">Checking session…</p>
			</div>
		{:else if $user && isAdmin($user)}
			<div class="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
				<div>
					<h1 class="font-playfair text-3xl font-bold md:text-4xl">Admin</h1>
					<p class="mt-2 text-sm opacity-70">Signed in as {$user.email}</p>
				</div>
				<div class="flex items-center gap-3">
					<a
						href={viewSiteHref}
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

			<nav class="mb-10 flex flex-wrap gap-2">
				{#each tabs as tab}
					<a
						href={tab.href}
						class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
						style={current === tab.href
							? 'color: var(--background); background-color: var(--foreground); border: 1px solid var(--foreground);'
							: 'color: var(--foreground); background-color: transparent; border: 1px solid color-mix(in oklab, var(--foreground) 20%, transparent);'}
					>
						{tab.label}
					</a>
				{/each}
			</nav>

			{@render children()}
		{:else}
			<div class="flex min-h-[50vh] items-center justify-center">
				<p class="text-sm opacity-60">Redirecting to login…</p>
			</div>
		{/if}
	</div>
</div>