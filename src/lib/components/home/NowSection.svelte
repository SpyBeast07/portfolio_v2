<script lang="ts">
	import { Motion } from 'svelte-motion';
	import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
	import { now } from '$lib/data';
	import NowSectionItem from './NowSectionItem.svelte';
	import { inView } from '$lib/actions/inView';

	// Types
	interface Link {
		label: string;
		url: string;
	}

	interface Item {
		text: string;
		links?: Link[];
	}

	interface Section {
		title: string;
		items: Item[];
	}

	// State to track intersection for each item
	// We'll use a map or array. Since we iterate, we can just create a component for the item
	// or use an action that sets a local state variable in an each block?
	// Easier to extract the Item into a sub-component to handle its own state.
</script>

<section id="now" class="mb-24 lg:mb-32">
	<SectionHeading class="mb-8">{"What I'm Doing Now"}</SectionHeading>

	<p class="font-outfit mb-12 text-neutral-500">
		Last updated: {now.lastUpdated}
	</p>

	<div class="space-y-12">
		{#each now.sections as section, index}
			<NowSectionItem {section} {index} />
		{/each}
	</div>
</section>
