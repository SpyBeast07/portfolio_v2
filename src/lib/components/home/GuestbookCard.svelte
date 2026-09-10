<script lang="ts">
	import { onMount } from 'svelte';
	import CustomButton from '$lib/components/ui/CustomButton.svelte';
	import { subscribeGuestbook } from '$lib/firestore';
	import type { GuestbookEntry } from '$lib/data/guestbook';

	const MAX_AVATARS = 3;
	const OWNER_PHOTO = '/about.webp';

	let entries = $state<GuestbookEntry[]>([]);
	let unsubscribe: (() => void) | undefined;

	const avatars = $derived.by(() => {
		const withPhoto = entries
			.filter((e) => e.photoURL)
			.slice(0, MAX_AVATARS);

		const remaining = MAX_AVATARS - withPhoto.length;

		const result = withPhoto.map((e) => ({ src: e.photoURL, alt: e.name }));

		if (remaining > 0) {
			for (let i = 0; i < remaining; i++) {
				result.push({ src: OWNER_PHOTO, alt: 'Kushagra' });
			}
		}

		return result;
	});

	const totalSigners = $derived(entries.length);
	const hasSigners = $derived(totalSigners > 0);

	onMount(() => {
		unsubscribe = subscribeGuestbook((data) => {
			entries = data;
		});

		return () => {
			unsubscribe?.();
		};
	});
</script>

<section class="mb-24 scroll-mt-24 lg:mb-40">
	<div
		class="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10"
		style="border: 1px solid color-mix(in oklab, var(--foreground) 12%, transparent); background-color: color-mix(in oklab, var(--background) 85%, transparent);"
	>
		<div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
			<div class="space-y-2">
				<h3
					class="font-playfair text-xl font-bold sm:text-2xl md:text-3xl"
					style="color: var(--foreground);"
				>
					Leave your Signature
				</h3>
				<p
					class="font-outfit text-xs sm:text-sm"
					style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
				>
					Let me know you were here
				</p>
			</div>

			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
				<div class="flex items-center">
					{#each avatars as avatar, i}
						<div
							class="relative h-9 w-9 overflow-hidden rounded-full border-2 sm:h-10 sm:w-10"
							style="
								border-color: var(--background);
								margin-left: {i > 0 ? '-10px' : '0'};
								z-index: {MAX_AVATARS - i};
							"
						>
							<img
								src={avatar.src}
								alt={avatar.alt}
								class="h-full w-full object-cover"
								referrerpolicy="no-referrer"
								style="background-color: color-mix(in oklab, var(--foreground) 15%, transparent);"
							/>
						</div>
					{/each}
					<span
						class="font-outfit ml-3 text-xs font-medium sm:text-sm"
						style="color: color-mix(in oklab, var(--foreground) 60%, transparent);"
					>
						{#if hasSigners}
							Join Others
						{:else}
							Be the first
						{/if}
					</span>
				</div>

				<CustomButton href="/guestbook">Sign Guestbook</CustomButton>
			</div>
		</div>
	</div>
</section>
