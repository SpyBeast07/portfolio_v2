<script lang="ts">
	import PdfViewer from '$lib/components/shared/PdfViewer.svelte';
	import { resume } from '$lib/data';
	import { DownloadIcon } from '$lib/components/ui/icons';

	// The resume object from $lib/data has { url: string, filename: string }
</script>

<svelte:head>
	<title>Resume | Kushagra Gupta</title>
	<meta name="description" content="Resume of Kushagra Gupta - Developer & AI Enthusiast." />
</svelte:head>

<div class="bg-background text-foreground relative min-h-screen selection:bg-yellow-500/30">
	<!-- Background Effects -->
	<div class="bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-40"></div>
	<div
		class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)]"
	></div>

	<div class="relative z-10 container mx-auto max-w-4xl px-4 py-24 md:px-6">
		<div class="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
			<h1 class="font-playfair text-3xl font-bold md:text-4xl" style="color: var(--foreground);">
				Resume
			</h1>
			<a
				href={resume.url}
				download={resume.filename}
				class="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-transform hover:scale-105"
				style="color: var(--background); background-color: var(--foreground);"
			>
				<DownloadIcon width={16} height={16} />
				Download PDF
			</a>
		</div>

		<div
			class="overflow-hidden rounded-xl shadow-2xl"
			style="background-color: color-mix(in oklab, var(--foreground) 5%, transparent); border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);"
		>
			<PdfViewer pdfUrl={resume.url} />
		</div>
	</div>
</div>
