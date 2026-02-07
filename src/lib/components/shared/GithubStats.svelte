<script lang="ts">
	import { theme } from '$lib/stores/theme';

	// Using ghchart for contribution graph visualization
	// This is an image-based fallback for the React component
	// It matches the visual of the contribution graph

	let isDark = $state(false);

	theme.subscribe((val) => {
		isDark = val === 'dark';
	});

	let chartUrl = $derived(`https://ghchart.rshah.org/${isDark ? '006d32' : '216e39'}/SpyBeast07`);
</script>

<div
	class="mt-12 overflow-hidden rounded-lg p-6"
	style="background-color: color-mix(in oklab, var(--background) 85%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 30%, transparent);"
>
	<div class="mb-6 flex items-center justify-between">
		<h4
			class="text-sm font-bold"
			style="color: color-mix(in oklab, var(--foreground) 70%, transparent);"
		>
			GitHub Contributions
		</h4>
		<a
			href="https://github.com/SpyBeast07"
			target="_blank"
			rel="noopener noreferrer"
			class="text-xs hover:underline"
			style="color: color-mix(in oklab, var(--foreground) 50%, transparent);"
		>
			@SpyBeast07
		</a>
	</div>

	<div class="flex w-full justify-center overflow-x-auto">
		<img src={chartUrl} alt="SpyBeast07's Github Chart" class="w-full min-w-[600px]" />
	</div>
</div>
