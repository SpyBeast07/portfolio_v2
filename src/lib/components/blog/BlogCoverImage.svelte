<script lang="ts">
  let { src, alt }: { src: string; alt: string } = $props();
</script>

<div class="blog-cover-image-wrapper">
  {#if src}
    <img
      {src}
      {alt}
      loading="lazy"
      class="cover-img"
    />
  {:else}
    <!-- Fallback gradient banner when no image -->
    <div class="cover-fallback" aria-hidden="true">
      <span class="cover-fallback-text font-playfair">{alt}</span>
    </div>
  {/if}
</div>

<style>
  .blog-cover-image-wrapper {
    width: 100%;
    height: clamp(220px, 38vw, 480px);
    overflow: hidden;
    border-radius: 1.25rem 1.25rem 0 0;
    flex-shrink: 0;
  }

  .cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }

  .cover-img:hover {
    transform: scale(1.02);
  }

  .cover-fallback {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      color-mix(in oklab, var(--foreground) 8%, transparent) 0%,
      color-mix(in oklab, var(--foreground) 3%, transparent) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cover-fallback-text {
    font-size: clamp(1.5rem, 4vw, 3rem);
    font-style: italic;
    opacity: 0.2;
    color: var(--foreground);
  }
</style>
