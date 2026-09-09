<script lang="ts">
	const sections: { title: string; doc: string; hint: string; href: string }[] = [
		{ title: 'Now', doc: 'data/now', href: '/admin/now', hint: "Your current 'focus' section" },
		{ title: 'About', doc: 'data/about', href: '/admin/about', hint: 'Bio, experiences, education & skills' },
		{ title: 'Work', doc: 'data/work', href: '/admin/work', hint: 'Projects, categories & page headings' },
		{ title: 'Blogs', doc: 'data/blogs', href: '/admin/blogs', hint: 'Posts, excerpts & content' }
	];
</script>

<p class="mb-8 max-w-2xl text-sm leading-relaxed opacity-70">
	Everything here is stored in Firestore. Pick a section to open its editor — your changes go live on
	the site immediately after saving.
</p>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
	{#each sections as item}
		<a
			href={item.href}
			class="rounded-xl p-6 transition-transform hover:scale-[1.02]"
			style="background-color: color-mix(in oklab, var(--foreground) 4%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
		>
			<h2 class="font-playfair text-xl font-bold">{item.title}</h2>
			<p class="mt-1 font-mono text-xs opacity-50">{item.doc}</p>
			<p class="mt-3 text-sm opacity-70">{item.hint}</p>
			<span
				class="mt-4 inline-block text-sm font-medium underline decoration-yellow-500/60 underline-offset-4"
			>
				Open editor →
			</span>
		</a>
	{/each}
</div>

<div
	class="mt-6 rounded-xl p-6 text-sm leading-relaxed opacity-70"
	style="background-color: color-mix(in oklab, var(--foreground) 3%, transparent); border: 1px dashed color-mix(in oklab, var(--foreground) 15%, transparent);"
>
	<strong class="text-foreground">Not editable here:</strong> nav, social links, and identity are always
	read from <code class="font-mono text-xs">src/lib/data/index.ts</code> in the codebase, so they can't
	be changed from this portal. To seed or re-seed Firestore from the local data files, run
	<code class="font-mono text-xs">npm run seed:firebase</code> locally.
</div>