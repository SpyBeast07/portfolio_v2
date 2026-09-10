<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { signInWithGoogle, signOutUser, isAdmin, updateUserProfile } from '$lib/auth';
	import { user, authReady, initAuth } from '$lib/stores/auth';
	import {
		addGuestbookEntry,
		deleteGuestbookEntry,
		togglePinGuestbookEntry,
		subscribeGuestbook,
		getGuestbookProfile,
		saveGuestbookProfile,
		type UserGuestbookProfile
	} from '$lib/firestore';
	import type { GuestbookEntry } from '$lib/data/guestbook';

	let entries = $state<GuestbookEntry[]>([]);
	let message = $state('');
	let submitting = $state(false);
	let signingIn = $state(false);
	let error = $state('');
	let deleting = $state<string | null>(null);
	let pinning = $state<string | null>(null);
	let unsubscribe: (() => void) | null = null;

	// Profile Setup State (Only Display Name, Google Photo used automatically)
	let userProfile = $state<UserGuestbookProfile | null>(null);
	let profileChecked = $state(false);
	let showProfileModal = $state(false);
	let modalStep = $state<1 | 2>(1);
	let tempDisplayName = $state('');
	let savingProfile = $state(false);
	let modalError = $state('');

	const MAX_MESSAGE_LENGTH = 500;

	const isUserAdmin = $derived(isAdmin($user));

	// Active display name and photo (always Google account photo)
	const currentDisplayName = $derived(
		userProfile?.displayName || $user?.displayName || 'Friend'
	);
	const currentPhotoURL = $derived($user?.photoURL || '');

	onMount(() => {
		initAuth();
		unsubscribe = subscribeGuestbook(
			(data) => {
				// Sort: pinned entries first, then newest first
				entries = [...data].sort((a, b) => {
					if (a.isPinned && !b.isPinned) return -1;
					if (!a.isPinned && b.isPinned) return 1;
					return b.createdAt - a.createdAt;
				});
			},
			(err) => {
				console.warn('[guestbook] Firestore error:', err);
			}
		);
	});

	onDestroy(() => {
		unsubscribe?.();
	});

	// Check if the signed-in user has completed their display name setup
	async function checkUserProfile(uid: string) {
		// 1. Instant LocalStorage Check
		const cacheKey = `guestbook_profile_${uid}`;
		const cached = localStorage.getItem(cacheKey);

		if (cached) {
			try {
				const parsed = JSON.parse(cached) as UserGuestbookProfile;
				// Strict truthy check on completed and non-empty displayName
				if (Boolean(parsed?.completed) && Boolean(parsed?.displayName?.trim())) {
					userProfile = parsed;
					showProfileModal = false;
					profileChecked = true;
					return; // Stop here, cached profile is valid!
				}
			} catch (e) {
				console.warn('[guestbook] LocalStorage parse error:', e);
				localStorage.removeItem(cacheKey);
			}
		}

		// 2. Firestore Check (Fallback)
		try {
			const remoteProfile = await getGuestbookProfile(uid);
			if (remoteProfile && Boolean(remoteProfile.completed) && Boolean(remoteProfile.displayName?.trim())) {
				userProfile = remoteProfile;
				localStorage.setItem(cacheKey, JSON.stringify(remoteProfile));
				showProfileModal = false;
			} else {
				// Profile truly incomplete: Show modal
				tempDisplayName = $user?.displayName || '';
				modalStep = 1;
				showProfileModal = true;
			}
		} catch (err) {
			console.warn('[guestbook] Error fetching remote profile:', err);
			// If fetch fails but we already have a display name from Google, don't block the user
			if ($user?.displayName) {
				const fallbackProfile: UserGuestbookProfile = {
					displayName: $user.displayName,
					completed: true,
					updatedAt: Date.now()
				};
				userProfile = fallbackProfile;
				localStorage.setItem(cacheKey, JSON.stringify(fallbackProfile));
				showProfileModal = false;
			} else {
				tempDisplayName = '';
				modalStep = 1;
				showProfileModal = true;
			}
		} finally {
			profileChecked = true;
		}
	}

	// 1. Compute authLoading reactively from $authReady
	const authLoading = $derived(!$authReady);

	let lastCheckedUid = $state<string | null>(null);
		
	// 2. Trigger profile check whenever user auth state resolves
	$effect(() => {
		// Wait until Firebase auth is ready before running any checks
		if (!$authReady) return;

		const currentUid = $user?.uid;
		
		if (currentUid) {
			// Only trigger check if the user ID actually changed
			if (lastCheckedUid !== currentUid) {
				lastCheckedUid = currentUid;
				checkUserProfile(currentUid);
			}
		} else {
			lastCheckedUid = null;
			userProfile = null;
			showProfileModal = false;
			profileChecked = true;
		}
	});


	async function handleGoogleSignIn() {
		error = '';
		signingIn = true;
		try {
			const loggedInUser = await signInWithGoogle();
			if (loggedInUser) {
				await checkUserProfile(loggedInUser.uid);
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Unable to sign in with Google.';
		} finally {
			signingIn = false;
		}
	}

	async function handleSignOut() {
		if ($user?.uid) {
			localStorage.removeItem(`guestbook_profile_${$user.uid}`);
		}
		lastCheckedUid = null;
		userProfile = null;
		showProfileModal = false;
		await signOutUser();
	}

	function proceedToStep2() {
		if (!tempDisplayName.trim()) {
			modalError = 'Please enter your display name.';
			return;
		}
		modalError = '';
		modalStep = 2;
	}

	// Final Step: Launch Profile (Stores only display name in Firestore)
	async function handleLaunchProfile() {
		if (!$user?.uid) return;
		savingProfile = true;
		modalError = '';
		try {
			const finalName = tempDisplayName.trim();

			const profileData: UserGuestbookProfile = {
				displayName: finalName,
				completed: true,
				updatedAt: Date.now()
			};

			// Save in Firestore guestbook collection (only display name & completion status)
			await saveGuestbookProfile($user.uid, profileData);

			// Also update Firebase Auth display name
			try {
				await updateUserProfile(finalName);
			} catch (authErr) {
				console.warn('[guestbook] Note: Auth update profile skipped/soft failed:', authErr);
			}

			// Save to local cache
			localStorage.setItem(`guestbook_profile_${$user.uid}`, JSON.stringify(profileData));

			userProfile = profileData;
			showProfileModal = false;
		} catch (err) {
			modalError = err instanceof Error ? err.message : 'Failed to launch profile. Please try again.';
		} finally {
			savingProfile = false;
		}
	}

	async function handleSubmit() {
		const trimmed = message.trim();
		if (!trimmed || !$user) return;
		if (trimmed.length > MAX_MESSAGE_LENGTH) {
			error = `Message must be ${MAX_MESSAGE_LENGTH} characters or less.`;
			return;
		}

		// Ensure profile display name is completed first
		if (!userProfile?.completed) {
			showProfileModal = true;
			return;
		}

		error = '';
		submitting = true;
		try {
			const entry: GuestbookEntry = {
				id: crypto.randomUUID(),
				name: currentDisplayName,
				email: $user.email ?? '',
				photoURL: currentPhotoURL, // Always Google account image
				message: trimmed,
				createdAt: Date.now(),
				isPinned: false
			};
			await addGuestbookEntry(entry);
			message = '';
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to post. Please try again.';
		} finally {
			submitting = false;
		}
	}

	async function handleDelete(entryId: string) {
		if (!isUserAdmin) return;
		if (!confirm('Are you sure you want to delete this signature?')) return;
		deleting = entryId;
		try {
			await deleteGuestbookEntry(entryId);
		} catch (err) {
			console.error('[guestbook] Delete error:', err);
		} finally {
			deleting = null;
		}
	}

	async function handleTogglePin(entryId: string, currentPinStatus: boolean = false) {
		if (!isUserAdmin) return;
		pinning = entryId;
		try {
			await togglePinGuestbookEntry(entryId, !currentPinStatus);
		} catch (err) {
			console.error('[guestbook] Pin toggle error:', err);
		} finally {
			pinning = null;
		}
	}

	function formatDate(timestamp: number): string {
		const d = new Date(timestamp);
		const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
		const day = d.getDate();
		return `${month} ${day}`;
	}
</script>

<svelte:head>
	<title>Guestbook | Kushagra Gupta</title>
	<meta
		name="description"
		content="Leave your signature on Kushagra Gupta's portfolio. Sign in to leave your mark, customize your profile, and connect with other visitors."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Guestbook | Kushagra Gupta" />
	<meta
		property="og:description"
		content="Leave your signature on Kushagra Gupta's portfolio. Sign in to leave your mark, customize your profile, and connect with other visitors."
	/>
	<meta property="og:image" content="{$page.url.origin}/logo.webp" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$page.url.href} />
	<meta property="twitter:title" content="Guestbook | Kushagra Gupta" />
	<meta
		property="twitter:description"
		content="Leave your signature on Kushagra Gupta's portfolio. Sign in to leave your mark, customize your profile, and connect with other visitors."
	/>
	<meta property="twitter:image" content="{$page.url.origin}/logo.webp" />
</svelte:head>

<div class="bg-background text-foreground relative min-h-screen selection:bg-yellow-500/30">
	<!-- Background Effects -->
	<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-30"></div>
	<div
		class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
	></div>

	<!-- Main Page Container: pt-32 md:pt-[16vh] matching About/Work/Blogs gap from navbar -->
	<main class="relative z-20 mx-auto top-5 max-w-7xl px-4 pt-32 pb-40 sm:px-6 md:pt-[16vh] lg:px-8">
		<!-- Top Section: Header & Sign-in / Welcome Tablet Pill -->
		<div
			class={`mb-12 flex flex-col justify-between gap-8 md:flex-row ${
				$user ? 'md:items-center' : 'md:items-start'
			}`}
		>
			<!-- Left: Title & description matching About, Work, Blogs style -->
			<div class="flex flex-col">
				<h1
					class="font-playfair mb-1 text-5xl font-bold tracking-tighter select-none md:text-5xl"
					style="color: var(--foreground);"
				>
					Guest book
				</h1>
				<div class="mt-4 flex flex-col text-xl leading-tight font-medium" style="color: color-mix(in oklab, var(--foreground) 45%, transparent);">
					<h2>Leave Your</h2>
					<h2
						class="text-xl font-medium transition-colors duration-300"
						style="color: var(--foreground)"
					>
						Signature
					</h2>
				</div>
			</div>

						<!-- Right: Signed-in Tablet Box OR Sign-in Card OR Loading Skeleton -->
			<div class="flex justify-start md:items-center">
				{#if authLoading}
					<!-- Loading Skeleton: Shown briefly on reload while checking auth -->
					<div
					class="h-14 w-64 animate-pulse rounded-full"
					style="border: 1px solid color-mix(in oklab, var(--foreground) 15%, transparent); background-color: color-mix(in oklab, var(--foreground) 5%, var(--background));"
				></div>
				{:else if $user}
					<!-- Tablet Pill Box: Styled as capsule tablet with white circular ring around avatar -->
					<div
						class="flex items-center gap-3.5 rounded-full px-5 py-2.5 shadow-2xl transition-all"
						style="border: 1px solid color-mix(in oklab, var(--foreground) 15%, transparent); background-color: color-mix(in oklab, var(--foreground) 5%, var(--background));"
					>
						<!-- Google avatar with crisp solid white circular ring border -->
						<div
							class="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-white"
						>
							{#if currentPhotoURL}
								<img
									src={currentPhotoURL}
									alt={currentDisplayName}
									class="h-full w-full object-cover"
									referrerpolicy="no-referrer"
								/>
							{:else}
								<div
									class="flex h-full w-full items-center justify-center text-sm font-bold"
									style="background-color: color-mix(in oklab, var(--foreground) 15%, var(--background)); color: var(--foreground);"
								>
									{currentDisplayName.charAt(0).toUpperCase()}
								</div>
							{/if}
						</div>

						<!-- Hello <name>! in bold white -->
						<span
							class="font-outfit text-base font-bold tracking-tight select-none sm:text-lg"
							style="color: var(--foreground);"
						>
							Hello {currentDisplayName}!
						</span>

						<!-- Subtle Sign out button -->
						<button
							onclick={handleSignOut}
							class="ml-1 rounded-full p-1.5 text-foreground/40 transition hover:bg-foreground/10 hover:text-foreground"
							title="Sign out"
						>
							<svg
								class="h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
						</button>
					</div>
				{:else}
					<!-- Sign-in Card (Google only) -->
					<div
						class="w-full max-w-sm rounded-3xl p-6 shadow-2xl sm:p-7"
						style="border: 1px solid color-mix(in oklab, var(--foreground) 12%, transparent); background-color: color-mix(in oklab, var(--foreground) 5%, var(--background));"
					>
						<h2 class="font-outfit text-2xl font-bold tracking-tight sm:text-3xl" style="color: var(--foreground);">
							Leave your <span class="font-playfair font-normal italic" style="color: color-mix(in oklab, var(--foreground) 70%, transparent);">Signature!</span>
						</h2>
						<p class="mt-2.5 mb-6 text-xs leading-relaxed sm:text-sm" style="color: color-mix(in oklab, var(--foreground) 40%, transparent);">
							Sign in to leave your mark, customize your profile, and connect with other visitors.
						</p>

						<!-- Google Button -->
						<button
							onclick={handleGoogleSignIn}
							disabled={signingIn}
							class="flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow transition hover:bg-neutral-100 disabled:opacity-50"
						>
							<svg class="h-4 w-4" viewBox="0 0 24 24">
								<path
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
									fill="#4285F4"
								/>
								<path
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									fill="#34A853"
								/>
								<path
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									fill="#FBBC05"
								/>
								<path
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									fill="#EA4335"
								/>
							</svg>
							<span>{signingIn ? 'Signing in…' : 'Google'}</span>
						</button>

						<p class="mt-4 text-center text-[11px]" style="color: color-mix(in oklab, var(--foreground) 35%, transparent);">
							By joining, you agree to our Terms of Service.
						</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- If Signed In: Compose Message Card (Horizontally smaller & clean) -->
		{#if $user}
			<div
				class="mb-14 mx-auto w-full max-w-2xl rounded-2xl p-5 shadow-2xl"
				style="border: 1px solid color-mix(in oklab, var(--foreground) 12%, transparent); background-color: color-mix(in oklab, var(--foreground) 5%, var(--background));"
			>
				<div class="flex items-start gap-4">
					{#if currentPhotoURL}
						<img
							src={currentPhotoURL}
							alt={currentDisplayName}
							class="mt-1 h-9 w-9 flex-shrink-0 rounded-full object-cover"
							style="border: 1px solid color-mix(in oklab, var(--foreground) 15%, transparent);"
							referrerpolicy="no-referrer"
						/>
					{:else}
						<div
							class="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
							style="background-color: color-mix(in oklab, var(--foreground) 10%, var(--background)); color: var(--foreground);"
						>
							{currentDisplayName.charAt(0).toUpperCase()}
						</div>
					{/if}
					<textarea
						bind:value={message}
						placeholder="Leave a message for Kushagra, @spybeast07..."
						maxlength={MAX_MESSAGE_LENGTH}
						rows={3}
						class="font-outfit w-full resize-none border-0 bg-transparent text-sm leading-relaxed placeholder:text-foreground/45 focus:outline-none focus:ring-0"
						style="caret-color: var(--foreground); color: var(--foreground);"
					></textarea>
				</div>
				<div class="mt-4 flex items-center justify-between pt-3" style="border-top: 1px solid color-mix(in oklab, var(--foreground) 8%, transparent);">
					<span class="font-mono text-xs" style="color: color-mix(in oklab, var(--foreground) 45%, transparent);">
						{message.trim().length}/{MAX_MESSAGE_LENGTH}
					</span>
					<button
						type="button"
						onclick={handleSubmit}
						disabled={submitting || !message.trim()}
						class="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition-all hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
						style="border: 1px solid color-mix(in oklab, var(--foreground) 15%, transparent); background-color: color-mix(in oklab, var(--foreground) 10%, var(--background)); color: var(--foreground);"
					>
						<span>{submitting ? 'Signing…' : 'Sign Guestbook'}</span>
						<svg
							class="h-3.5 w-3.5 -rotate-45 fill-current"
							viewBox="0 0 24 24"
						>
							<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
						</svg>
					</button>
				</div>
			</div>
		{/if}

		{#if error}
			<div class="mb-8 mx-auto max-w-2xl rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs text-red-400">
				{error}
			</div>
		{/if}

		<!-- Divider with Glowing Center: RECENT SIGNATURES -->
		<div class="relative my-14 flex items-center justify-center">
			<div class="absolute inset-0 flex items-center">
				<div
					class="h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/15 to-transparent"
				></div>
			</div>
			<!-- Center Glow Flare -->
<div
					class="absolute h-[2px] w-64 blur-[1px] bg-gradient-to-r from-transparent via-foreground/60 to-transparent"
				></div>
<div
					class="relative bg-background px-6 py-1 text-[11px] font-semibold tracking-[0.25em] uppercase"
					style="color: color-mix(in oklab, var(--foreground) 50%, transparent);"
				>
					Recent Signatures
				</div>
		</div>

		<!-- Signatures Grid (4 columns, Matching Cards in Image 1 & Image 2) -->
		{#if entries.length > 0}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
				{#each entries as entry (entry.id)}
					<article
						class={`relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-300 ${
							entry.isPinned
								? 'border border-blue-500/40 ring-1 ring-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.12)]'
								: 'border border-foreground/10 hover:border-foreground/20'
						}`}
						style="background-color: color-mix(in oklab, var(--foreground) 7%, var(--background));"
					>
						<!-- Top Right Pin Badge if Pinned (Matching Image 1) -->
						{#if entry.isPinned}
							<div
								class="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/50"
								title="Pinned signature"
							>
								<!-- Pushpin icon -->
								<svg class="h-3.5 w-3.5 -rotate-45 fill-current" viewBox="0 0 24 24">
									<path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
								</svg>
							</div>
						{/if}

						<div>
							<!-- Top Row: Avatar + Name/Date + Double Quotes -->
							<div class="flex items-start justify-between gap-2">
								<div class="flex items-center gap-3">
									{#if entry.photoURL}
										<img
											src={entry.photoURL}
											alt={entry.name}
											class="h-10 w-10 rounded-full object-cover"
											style="border: 1px solid color-mix(in oklab, var(--foreground) 15%, transparent);"
											referrerpolicy="no-referrer"
										/>
									{:else}
										<div
											class="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold"
											style="background-color: color-mix(in oklab, var(--foreground) 10%, var(--background)); color: var(--foreground);"
										>
											{entry.name.charAt(0).toUpperCase()}
										</div>
									{/if}
									<div class="flex flex-col">
										<div class="flex items-center gap-1.5">
											<span class="font-outfit text-sm font-bold" style="color: var(--foreground);">
												{entry.name}
											</span>
											<!-- Verified Badge for Admin / Kushagra or verified accounts -->
											{#if entry.email === 'kushagra7503@gmail.com' || entry.name.toLowerCase().includes('parth sharma')}
												<span title="Verified visitor" class="inline-flex items-center">
													<svg
														class="h-4 w-4 flex-shrink-0 fill-current text-blue-500"
														viewBox="0 0 24 24"
													>
														<path
															d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
														/>
													</svg>
												</span>
											{/if}
										</div>
										<span
											class="text-[11px] font-semibold tracking-wider uppercase"
											style="color: color-mix(in oklab, var(--foreground) 45%, transparent);"
										>
											{formatDate(entry.createdAt)}
										</span>
									</div>
								</div>

								<!-- Stylized Quotation Mark SVG (Matching Image 1) -->
								<div class="flex-shrink-0 select-none" style="color: color-mix(in oklab, var(--foreground) 20%, transparent);">
									<svg class="h-9 w-9 fill-current" viewBox="0 0 24 24">
										<path
											d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
										/>
									</svg>
								</div>
							</div>

							<!-- Message Body -->
							<p
								class="font-outfit my-4 min-h-[40px] text-sm leading-relaxed whitespace-pre-line"
								style="color: color-mix(in oklab, var(--foreground) 85%, transparent);"
							>
								{entry.message}
							</p>
						</div>

						<!-- Bottom Row: Signature Line & Admin Controls -->
						<div>
							<div class="flex items-center justify-between">
								<p
									class="font-sacramento text-2xl select-none"
									style="font-family: 'Sacramento', 'Dancing Script', cursive; color: color-mix(in oklab, var(--foreground) 55%, transparent);"
								>
									— {entry.name}
								</p>

								<!-- Admin Only Controls: Pin & Delete Buttons -->
								{#if isUserAdmin}
									<div class="flex items-center gap-1.5">
										<!-- Pin Button -->
										<button
											onclick={() => handleTogglePin(entry.id, entry.isPinned)}
											disabled={pinning === entry.id}
											class={`rounded-lg p-1.5 text-xs transition ${
												entry.isPinned
													? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
													: 'text-foreground/45 hover:bg-foreground/10 hover:text-foreground'
											}`}
											title={entry.isPinned ? 'Unpin message' : 'Pin message'}
										>
											<svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
												<path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
											</svg>
										</button>

										<!-- Delete Button -->
										<button
											onclick={() => handleDelete(entry.id)}
											disabled={deleting === entry.id}
											class="rounded-lg p-1.5 text-xs text-red-400 transition hover:bg-red-500/20"
											title="Delete message"
										>
											<svg
												class="h-3.5 w-3.5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												stroke-width="2"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</button>
									</div>
								{/if}
							</div>

							<!-- Pinned Bottom Label (Matching Image 1) -->
							{#if entry.isPinned}
								<div
									class="mt-3 flex items-center gap-1.5 border-t border-foreground/10 pt-2.5 text-xs font-medium text-blue-400"
								>
									<svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
										<path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
									</svg>
									<span>Pinned</span>
								</div>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<div class="py-20 text-center">
				<p class="text-sm" style="color: color-mix(in oklab, var(--foreground) 50%, transparent);">
					No signatures yet. Be the first to leave your mark!
				</p>
			</div>
		{/if}
	</main>

	<!-- 2-Step Profile Setup Pop-up Dialog Modal (Display Name Only, Google Account Picture used) -->
	{#if showProfileModal}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
			style="background-color: rgba(0, 0, 0, 0.75);"
		>
<div
					class="relative w-full max-w-md rounded-3xl p-7 shadow-2xl transition-all sm:p-8"
					style="border: 1px solid color-mix(in oklab, var(--foreground) 15%, transparent); background-color: color-mix(in oklab, var(--foreground) 5%, var(--background));"
				>
				<!-- Steps Indicator Bar -->
				<div class="mb-6 flex items-center justify-between">
					<div class="flex items-center gap-2">
						<span
							class={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
								modalStep === 1 ? 'bg-white text-black' : 'bg-blue-500 text-white'
							}`}
						>
							1
						</span>
						<span
							class="h-0.5 w-8 rounded-full transition-colors"
							style={`background-color: ${modalStep === 2 ? '#3b82f6' : 'color-mix(in oklab, var(--foreground) 15%, transparent)'};`}
						></span>
						<span
							class={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
								modalStep === 2 ? 'bg-white text-black' : 'bg-foreground/10 text-foreground/40'
							}`}
						>
							2
						</span>
					</div>
					<span class="text-xs font-semibold tracking-wider uppercase" style="color: color-mix(in oklab, var(--foreground) 45%, transparent);">
						Step {modalStep} of 2
					</span>
				</div>

				{#if modalStep === 1}
					<!-- Step 1: Display Name Setup (Google photo used automatically) -->
					<div>
						<h3 class="font-outfit text-2xl font-bold tracking-tight" style="color: var(--foreground);">
							Set Your Display Name
						</h3>
						<p class="mt-1 mb-6 text-xs leading-relaxed sm:text-sm" style="color: color-mix(in oklab, var(--foreground) 45%, transparent);">
							Choose the name that appears on your signatures and tablet badge.
						</p>

						<!-- Google Avatar Notice with crisp white ring -->
						<div class="mb-6 flex items-center gap-4 rounded-2xl p-4" style="border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent); background-color: color-mix(in oklab, var(--foreground) 3%, var(--background));">
							<div class="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white">
								{#if currentPhotoURL}
									<img
										src={currentPhotoURL}
										alt="Google avatar"
										class="h-full w-full object-cover"
										referrerpolicy="no-referrer"
									/>
								{:else}
									<div class="flex h-full w-full items-center justify-center text-sm font-bold" style="background-color: color-mix(in oklab, var(--foreground) 15%, var(--background)); color: var(--foreground);">
										{($user?.displayName ?? 'U').charAt(0).toUpperCase()}
									</div>
								{/if}
							</div>
							<div>
								<p class="text-xs font-semibold" style="color: var(--foreground);">Google Profile Picture</p>
								<p class="text-[11px]" style="color: color-mix(in oklab, var(--foreground) 45%, transparent);">
									Using your Google account photo for your profile.
								</p>
							</div>
						</div>

						<!-- Display Name Input -->
						<div class="mb-6">
							<label for="display-name-input" class="mb-2 block text-xs font-semibold uppercase tracking-wider" style="color: color-mix(in oklab, var(--foreground) 70%, transparent);">
								Display Name <span class="text-red-400">*</span>
							</label>
							<input
								id="display-name-input"
								type="text"
								bind:value={tempDisplayName}
								placeholder="e.g. Parth Sharma"
								maxlength={40}
								required
								class="font-outfit w-full rounded-xl px-4 py-3 text-sm placeholder:text-foreground/45 focus:outline-none focus:ring-1 focus:ring-foreground/40"
								style="border: 1px solid color-mix(in oklab, var(--foreground) 15%, transparent); background-color: color-mix(in oklab, var(--foreground) 5%, var(--background)); color: var(--foreground); caret-color: var(--foreground);"
							/>
						</div>

						{#if modalError}
							<p class="mb-4 text-xs text-red-400">{modalError}</p>
						{/if}

						<div class="flex items-center justify-between border-t border-foreground/10 pt-5">
							<button
								type="button"
								onclick={handleSignOut}
								class="text-xs text-foreground/45 transition hover:text-foreground"
							>
								Cancel & Sign out
							</button>
							<button
								type="button"
								onclick={proceedToStep2}
								disabled={!tempDisplayName.trim()}
								class="rounded-full bg-white px-6 py-2.5 text-xs font-bold text-black transition hover:bg-neutral-200 disabled:opacity-40"
							>
								Next: Launch Profile →
							</button>
						</div>
					</div>
				{:else}
					<!-- Step 2: Confirmation & Launch Profile -->
					<div>
						<h3 class="font-outfit text-2xl font-bold tracking-tight" style="color: var(--foreground);">
							Ready to Launch!
						</h3>
						<p class="mt-1 mb-6 text-xs leading-relaxed sm:text-sm" style="color: color-mix(in oklab, var(--foreground) 45%, transparent);">
							Preview how your tablet badge and signature will appear to visitors.
						</p>

						<!-- Tablet Card Preview (Matching User Image) -->
						<div class="mb-6 rounded-2xl p-5" style="border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent); background-color: color-mix(in oklab, var(--foreground) 4%, var(--background));">
							<p class="mb-3 text-[11px] font-semibold uppercase tracking-wider" style="color: color-mix(in oklab, var(--foreground) 45%, transparent);">
								Your Tablet Card Preview
							</p>
							<div class="flex items-center justify-center py-3">
								<div
									class="flex items-center gap-3.5 rounded-full px-5 py-2.5 shadow-xl"
									style="border: 1px solid color-mix(in oklab, var(--foreground) 15%, transparent); background-color: color-mix(in oklab, var(--foreground) 5%, var(--background));"
								>
									<div
										class="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-white"
									>
										{#if currentPhotoURL}
											<img src={currentPhotoURL} alt={tempDisplayName} class="h-full w-full object-cover" />

											{:else}
											<div class="flex h-full w-full items-center justify-center text-sm font-bold" style="background-color: color-mix(in oklab, var(--foreground) 15%, var(--background)); color: var(--foreground);">
												{tempDisplayName.charAt(0).toUpperCase()}
											</div>
										{/if}
									</div>
									<span class="font-outfit text-base font-bold tracking-tight sm:text-lg" style="color: var(--foreground);">
										Hello {tempDisplayName}!
									</span>
								</div>
							</div>
						</div>

						<!-- Signature Preview -->
						<div class="mb-6 rounded-2xl p-4" style="border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent); background-color: color-mix(in oklab, var(--foreground) 4%, var(--background));">
							<p class="mb-2 text-[11px] font-semibold uppercase tracking-wider" style="color: color-mix(in oklab, var(--foreground) 45%, transparent);">
								Your Signature Preview
							</p>
							<p
								class="font-sacramento text-2xl"
								style="font-family: 'Sacramento', 'Dancing Script', cursive; color: color-mix(in oklab, var(--foreground) 75%, transparent);"
							>
								— {tempDisplayName}
							</p>
						</div>

						{#if modalError}
							<p class="mb-4 text-xs text-red-400">{modalError}</p>
						{/if}

						<div class="flex items-center justify-between border-t border-foreground/10 pt-5">
							<button
								type="button"
								onclick={() => (modalStep = 1)}
								disabled={savingProfile}
								class="text-xs font-semibold text-foreground/45 transition hover:text-foreground"
							>
								← Back
							</button>
							<button
								type="button"
								onclick={handleLaunchProfile}
								disabled={savingProfile}
								class="flex items-center gap-2 rounded-full bg-white px-7 py-2.5 text-xs font-bold text-black transition hover:bg-neutral-200 disabled:opacity-50"
							>
								<span>{savingProfile ? 'Launching…' : 'Launch Profile'}</span>
								<svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
									<path d="M12 2.5a.75.75 0 01.75.75v10.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3.25a.75.75 0 01.75-.75z" />
									<path d="M3.75 18a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
								</svg>
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
