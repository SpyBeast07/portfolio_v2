<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as pdfjsLib from 'pdfjs-dist';

	// Set worker source
	// In SvelteKit/Vite, we usually need to import the worker script URL
	// We'll try to use the CDN version for simplicity as local worker setup can be tricky with Vite
	// Or better, let's try to import it if possible.

	// NOTE: For production, you should ideally bundle the worker.
	// Using unpkg for now to ensure it works without complex vite config changes for worker.
	pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

	let { pdfUrl }: { pdfUrl: string } = $props();

	let pdfDoc: pdfjsLib.PDFDocumentProxy | null = null;
	let numPages = $state(0);
	let containerWidth = $state(0);
	let container: HTMLDivElement;
	let loading = $state(true);
	let error = $state(false);

	onMount(() => {
		(async () => {
			try {
				loading = true;
				const loadingTask = pdfjsLib.getDocument(pdfUrl);
				pdfDoc = await loadingTask.promise;
				numPages = pdfDoc.numPages;
				loading = false;
			} catch (e) {
				console.error('Error loading PDF:', e);
				error = true;
				loading = false;
			}
		})();

		const resizeObserver = new ResizeObserver((entries) => {
			if (entries[0]) {
				containerWidth = entries[0].contentRect.width;
			}
		});

		if (container) {
			resizeObserver.observe(container);
		}

		return () => {
			resizeObserver.disconnect();
		};
	});

	onDestroy(() => {
		if (pdfDoc) {
			pdfDoc.destroy();
		}
	});

	async function renderPage(pageNumber: number, canvas: HTMLCanvasElement) {
		if (!pdfDoc || !canvas) return;

		try {
			const page = await pdfDoc.getPage(pageNumber);

			// Calculate scale to fit width
			// We need a viewport to know original size
			const unscaledViewport = page.getViewport({ scale: 1 });
			const scale = containerWidth ? containerWidth / unscaledViewport.width : 1.5;

			const viewport = page.getViewport({ scale });

			// Support high DPI
			const outputScale = window.devicePixelRatio || 1;

			canvas.width = Math.floor(viewport.width * outputScale);
			canvas.height = Math.floor(viewport.height * outputScale);
			canvas.style.width = Math.floor(viewport.width) + 'px';
			canvas.style.height = Math.floor(viewport.height) + 'px';

			const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

			const renderContext = {
				canvasContext: canvas.getContext('2d')!,
				transform,
				viewport
			};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await page.render(renderContext as any).promise;
		} catch (e) {
			console.error(`Error rendering page ${pageNumber}`, e);
		}
	}

	// Action to render canvas when mounted
	function renderCanvas(node: HTMLCanvasElement, pageNumber: number) {
		// We need to re-render if width changes
		// But action parameters are generally static unless we use an update function
		// For simplicity, we can just use an effect key block in the template
		renderPage(pageNumber, node);

		return {
			update(newPageNumber: number) {
				renderPage(newPageNumber, node);
			}
		};
	}
</script>

<div class="flex h-full w-full flex-col items-center gap-4">
	<div
		bind:this={container}
		class="flex min-h-[500px] w-full flex-1 flex-col items-center overflow-hidden rounded-xl"
		style="background-color: transparent;"
	>
		{#if loading}
			<div class="flex animate-pulse items-center justify-center p-8 text-center text-sm">
				Loading PDF...
			</div>
		{:else if error}
			<div class="flex flex-col items-center justify-center p-8 text-center text-red-400">
				<p class="mb-2">Unable to load PDF.</p>
			</div>
		{:else}
			{#each Array(numPages) as _, i}
				{#key containerWidth}
					<!-- Re-render when container width changes significantly -->
					<canvas use:renderCanvas={i + 1} class="mb-8 rounded-sm shadow-2xl"></canvas>
				{/key}
			{/each}
		{/if}
	</div>
</div>
