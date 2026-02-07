<script lang="ts">
	let { class: className = '', spanClassName = '' }: { class?: string; spanClassName?: string } =
		$props();
</script>

<h1
	class={`font-playfair text-foreground/90 inline-flex items-baseline pb-10 leading-none font-bold tracking-tighter whitespace-nowrap select-none ${className}`}
>
	Kushagra<span
		class={`font-great-vibes absolute rotate-[-10deg] tracking-wider text-yellow-500 opacity-90 ${spanClassName}`}
	>
		Gupta
	</span>
</h1>
