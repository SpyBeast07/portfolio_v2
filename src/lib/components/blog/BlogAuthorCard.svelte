<div class="author-card" aria-label="Author information">
  <div class="author-avatar-wrap">
    <img
      src="/about.webp"
      alt="Kushagra Gupta"
      class="author-avatar"
      loading="lazy"
    />
  </div>
  <div class="author-info">
    <p class="author-name font-playfair">Kushagra Gupta</p>
    <p class="author-bio">Developer &amp; AI Enthusiast.<br>Building things at the edge of software and intelligence.</p>
  </div>
</div>

<style>
  .author-card {
    display: flex;
    flex-direction: column; /* Stack vertically for a stronger presence like home page */
    align-items: flex-start;
    gap: 1.25rem;
  }

  .author-avatar-wrap {
    flex-shrink: 0;
    width: 6rem; /* Increased significantly from 3rem */
    height: 6rem;
    border-radius: 9999px;
    overflow: hidden;
    border: 3px solid color-mix(in oklab, var(--foreground) 12%, transparent);
    box-shadow: 0 4px 20px -5px rgba(0,0,0,0.3);
  }

  .author-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .author-info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    min-width: 0;
  }

  .author-name {
    font-size: 1.35rem; /* Increased */
    font-weight: 700;
    color: var(--foreground);
    margin: 0;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .author-bio {
    font-family: var(--font-outfit), sans-serif;
    font-size: 0.85rem; /* Increased */
    line-height: 1.6;
    color: color-mix(in oklab, var(--foreground) 65%, transparent);
    margin: 0;
  }
</style>
