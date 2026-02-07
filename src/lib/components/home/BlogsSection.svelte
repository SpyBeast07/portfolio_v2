<script lang="ts">
	import BlogItem from '$lib/components/shared/BlogItem.svelte';
	import { blogs } from '$lib/data';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import CustomButton from '$lib/components/ui/CustomButton.svelte';
</script>

<section id="blogs" class="mb-24 scroll-mt-24 lg:mb-40">
	<SectionHeading>Latest Writing</SectionHeading>

	<div class="space-y-2">
		{#if blogs.length > 0}
			{#each blogs.slice(0, 2) as blog}
				<BlogItem {...blog} showImage={false} />
			{/each}
		{:else}
			<!-- Coming Soon Placeholder -->
			<div
				class="rounded-lg border-dashed py-12 text-center"
				style="border-color: color-mix(in oklab, var(--foreground) 30%, transparent); background-color: color-mix(in oklab, var(--background) 85%, transparent); border-width: 1px;"
			>
				<p
					class="font-playfair text-lg italic"
					style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
				>
					Thoughtful essays coming soon...
				</p>
			</div>
		{/if}
	</div>

	{#if blogs.length > 2}
		<div class="mt-4">
			<CustomButton href="/blogs">View More Blogs</CustomButton>
		</div>
	{/if}
</section>
