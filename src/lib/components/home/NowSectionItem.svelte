<script lang="ts">
	let { section } = $props();
</script>

<div>
	<div class="transition-opacity">
		<h3 class="font-playfair text-foreground/90 mb-6 text-2xl font-bold">
			{section.title}
		</h3>
		<ul class="space-y-4">
			{#each section.items as item, i}
				<li class="font-outfit text-lg leading-relaxed whitespace-pre-line text-neutral-400">
					<span class="mb-1 block">{item.text}</span>
					{#if item.links}
						<div class="mt-1 ml-4 flex flex-col gap-1">
							{#each item.links as link, j}
								<a
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									class="text-base text-yellow-500/80 transition-colors hover:text-yellow-500"
								>
									{link.label}
								</a>
							{/each}
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>
