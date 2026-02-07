<script lang="ts">
	import { useMotionValue, useTransform, animate, Motion } from 'svelte-motion';
	import { onMount } from 'svelte';

	let { value } = $props();

	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));

	$effect(() => {
		const controls = animate(count, value, { duration: 1, ease: 'easeOut' });
		return () => controls.stop();
	});
</script>

<Motion let:motion>
	<span use:motion>{$rounded}</span>
</Motion>
