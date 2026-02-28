<script lang="ts">
  import BlogMeta from './BlogMeta.svelte';

  let {
    title,
    date,
    readTime,
    excerpt,
    content
  }: {
    title: string;
    date: string;
    readTime: string;
    excerpt: string;
    content: string;
  } = $props();
</script>

<article class="blog-content-area" aria-label="Blog article">
  <!-- Mobile Meta (Hidden on Desktop) -->
  <div class="block md:hidden mb-6 text-xs font-medium tracking-wide uppercase"
       style="color: color-mix(in oklab, var(--foreground) 60%, transparent);">
    <BlogMeta {date} {readTime} />
  </div>

  <!-- Title -->
  <h1 class="blog-title font-playfair">{title}</h1>

  <!-- Excerpt -->
  <p class="blog-excerpt font-playfair">{excerpt}</p>

  <!-- Divider -->
  <hr class="blog-divider" aria-hidden="true" />

  <!-- Main HTML Content -->
  <div class="prose" aria-label="Article body">
    {@html content}
  </div>
</article>

<style>
  .blog-content-area {
    width: 100%;
  }

  .blog-title {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 800;
    line-height: 1.15;
    color: var(--foreground);
    margin: 0 0 1rem 0;
    letter-spacing: -0.02em;
  }

  .blog-excerpt {
    font-size: 1.125rem;
    font-style: italic;
    line-height: 1.65;
    color: color-mix(in oklab, var(--foreground) 65%, transparent);
    margin: 0 0 2rem 0;
  }

  .blog-divider {
    border: none;
    border-top: 1px solid color-mix(in oklab, var(--foreground) 12%, transparent);
    margin: 0 0 2.5rem 0;
  }

  /* ─── Prose Styles ─────────────────────────────────────── */
  .prose :global(h2) {
    font-family: var(--font-playfair), serif;
    font-size: clamp(1.3rem, 2.5vw, 1.7rem);
    font-weight: 700;
    color: var(--foreground);
    margin: 2.5rem 0 0.85rem;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .prose :global(h3) {
    font-family: var(--font-playfair), serif;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    font-weight: 600;
    color: var(--foreground);
    margin: 2rem 0 0.65rem;
    line-height: 1.35;
  }

  .prose :global(p) {
    font-family: var(--font-outfit), sans-serif;
    font-size: 1rem;
    line-height: 1.85;
    color: color-mix(in oklab, var(--foreground) 80%, transparent);
    margin: 0 0 1.35rem;
  }

  .prose :global(strong) {
    color: var(--foreground);
    font-weight: 600;
  }

  .prose :global(em) {
    font-style: italic;
    color: color-mix(in oklab, var(--foreground) 85%, transparent);
  }

  .prose :global(a) {
    color: var(--foreground);
    text-decoration: underline;
    text-decoration-color: color-mix(in oklab, var(--foreground) 30%, transparent);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s;
  }

  .prose :global(a:hover) {
    text-decoration-color: var(--foreground);
  }

  .prose :global(ul),
  .prose :global(ol) {
    font-family: var(--font-outfit), sans-serif;
    font-size: 1rem;
    line-height: 1.8;
    color: color-mix(in oklab, var(--foreground) 80%, transparent);
    margin: 0 0 1.35rem 1.5rem;
    padding: 0;
  }

  .prose :global(li) {
    margin-bottom: 0.4rem;
  }

  .prose :global(li::marker) {
    color: color-mix(in oklab, var(--foreground) 40%, transparent);
  }

  .prose :global(blockquote) {
    border-left: 3px solid color-mix(in oklab, var(--foreground) 25%, transparent);
    margin: 1.75rem 0;
    padding: 0.75rem 1.25rem;
    background-color: color-mix(in oklab, var(--foreground) 4%, transparent);
    border-radius: 0 0.5rem 0.5rem 0;
  }

  .prose :global(blockquote p) {
    font-style: italic;
    color: color-mix(in oklab, var(--foreground) 70%, transparent);
    margin: 0;
    font-size: 1.05rem;
  }

  .prose :global(code) {
    font-family: 'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace;
    font-size: 0.85em;
    background-color: color-mix(in oklab, var(--foreground) 8%, transparent);
    color: color-mix(in oklab, var(--foreground) 90%, transparent);
    padding: 0.15em 0.4em;
    border-radius: 0.3rem;
    border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);
  }

  .prose :global(pre) {
    background-color: color-mix(in oklab, var(--foreground) 6%, transparent);
    border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);
    border-radius: 0.75rem;
    padding: 1.25rem 1.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
    scrollbar-width: thin;
  }

  .prose :global(pre code) {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.875rem;
    line-height: 1.75;
    color: color-mix(in oklab, var(--foreground) 88%, transparent);
  }

  .prose :global(hr) {
    border: none;
    border-top: 1px solid color-mix(in oklab, var(--foreground) 12%, transparent);
    margin: 2.5rem 0;
  }

  .prose :global(img) {
    width: 100%;
    height: auto;
    border-radius: 0.75rem;
    margin: 1.5rem 0;
    border: 1px solid color-mix(in oklab, var(--foreground) 10%, transparent);
  }

  .prose :global(.table-wrapper) {
    width: 100%;
    overflow-x: auto;
    margin: 1.5rem 0;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .prose :global(table) {
    width: 100%;
    min-width: 600px; /* Forces scrolling on small screens instead of squishing */
    border-collapse: collapse;
    font-family: var(--font-outfit), sans-serif;
    font-size: 0.925rem;
    margin: 0;
  }

  .prose :global(th) {
    font-weight: 600;
    color: var(--foreground);
    text-align: left;
    padding: 0.6rem 0.75rem;
    border-bottom: 2px solid color-mix(in oklab, var(--foreground) 15%, transparent);
  }

  .prose :global(td) {
    padding: 0.6rem 0.75rem;
    color: color-mix(in oklab, var(--foreground) 75%, transparent);
    border-bottom: 1px solid color-mix(in oklab, var(--foreground) 8%, transparent);
  }

  .prose :global(tr:hover td) {
    background-color: color-mix(in oklab, var(--foreground) 3%, transparent);
  }
</style>
