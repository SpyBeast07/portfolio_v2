<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { signIn, isAdmin, ADMIN_EMAIL, signOutUser } from '$lib/auth';
	import { user, authReady, initAuth } from '$lib/stores/auth';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let submitting = $state(false);
	let redirecting = $state(false);

	onMount(() => {
		initAuth();
	});

	// Already signed in as admin? Go straight to the admin dashboard.
	$effect(() => {
		if ($authReady && $user && isAdmin($user) && !submitting && !redirecting) {
			redirecting = true;
			goto('/admin');
		}
	});

	async function handleSubmit() {
		error = '';
		submitting = true;
		try {
			if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
				throw new Error('Access denied. Only the administrator can sign in here.');
			}
			const signedInUser = await signIn(email, password);
			if (!isAdmin(signedInUser)) {
				await signOutUser();
				throw new Error('Access denied. Administrator privileges required.');
			}
			redirecting = true;
			await goto('/admin');
		} catch (err) {
			error = err instanceof Error ? err.message : 'Unable to sign in. Please try again.';
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Login | Kushagra Gupta</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="bg-background text-foreground relative flex min-h-screen items-center justify-center px-4 py-28">
	<!-- Background Effects -->
	<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-40"></div>
	<div
		class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
	></div>

	<form
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}
		class="relative z-10 w-full max-w-md rounded-2xl p-8 shadow-2xl"
		style="background-color: color-mix(in oklab, var(--foreground) 5%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
	>
		<h1 class="font-playfair mb-1 text-3xl font-bold">Admin Login</h1>
		<p class="mb-8 text-sm opacity-70">Sign in to manage your site content.</p>

		<label class="mb-4 block">
			<span class="mb-2 block text-sm font-medium">Email</span>
			<input
				type="email"
				bind:value={email}
				autocomplete="email"
				placeholder="you@example.com"
				required
				class="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:opacity-40 focus:ring-2 focus:ring-yellow-500/40"
				style="background-color: transparent;"
			/>
		</label>

		<label class="mb-6 block">
			<span class="mb-2 block text-sm font-medium">Password</span>
			<input
				type="password"
				bind:value={password}
				autocomplete="current-password"
				placeholder="••••••••"
				required
				class="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:opacity-40 focus:ring-2 focus:ring-yellow-500/40"
				style="background-color: transparent;"
			/>
		</label>

		{#if error}
			<p role="alert" class="mb-4 text-sm text-red-500">{error}</p>
		{/if}

		<button
			type="submit"
			disabled={submitting}
			class="w-full rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
			style="color: var(--background); background-color: var(--foreground);"
		>
			{submitting ? 'Signing in…' : 'Sign in'}
		</button>

		<a href="/" class="mt-6 block text-center text-sm opacity-60 underline-offset-4 hover:underline">
			← Back to site
		</a>
	</form>
</div>