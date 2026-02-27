<script lang="ts">
  import { email } from '$lib/data';

  let name = $state('');
  let userEmail = $state('');
  let message = $state('');
  let sent = $state(false);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Blog response from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${userEmail}\n\n${message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    sent = true;
    setTimeout(() => {
      sent = false;
      name = '';
      userEmail = '';
      message = '';
    }, 3000);
  }

  function handleInputFocus(e: FocusEvent) {
    const el = e.currentTarget as HTMLElement;
    el.style.borderColor = 'color-mix(in oklab, var(--foreground) 35%, transparent)';
  }

  function handleInputBlur(e: FocusEvent) {
    const el = e.currentTarget as HTMLElement;
    el.style.borderColor = 'color-mix(in oklab, var(--foreground) 12%, transparent)';
  }
</script>

<section class="footer-contact" aria-label="Contact section">
  <div class="contact-inner">
    <div class="contact-heading-wrap">
      <h2 class="contact-heading font-playfair">Want to share your thoughts?</h2>
      <p class="contact-subhead">
        Send me a message — I read everything and reply when I can.
      </p>
    </div>

    {#if sent}
      <div class="sent-notice" role="status" aria-live="polite">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Opening your email client…
      </div>
    {:else}
      <form class="contact-form" onsubmit={handleSubmit} novalidate>
        <div class="form-row">
          <div class="form-group">
            <label for="blog-contact-name" class="form-label">Name</label>
            <input
              id="blog-contact-name"
              type="text"
              bind:value={name}
              placeholder="Your name"
              required
              class="form-input"
              style="border-color: color-mix(in oklab, var(--foreground) 12%, transparent);"
              onfocus={handleInputFocus}
              onblur={handleInputBlur}
              autocomplete="name"
            />
          </div>
          <div class="form-group">
            <label for="blog-contact-email" class="form-label">Email</label>
            <input
              id="blog-contact-email"
              type="email"
              bind:value={userEmail}
              placeholder="your@email.com"
              required
              class="form-input"
              style="border-color: color-mix(in oklab, var(--foreground) 12%, transparent);"
              onfocus={handleInputFocus}
              onblur={handleInputBlur}
              autocomplete="email"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="blog-contact-message" class="form-label">Message</label>
          <textarea
            id="blog-contact-message"
            bind:value={message}
            placeholder="Your thoughts, questions, feedback…"
            rows={4}
            required
            class="form-input form-textarea"
            style="border-color: color-mix(in oklab, var(--foreground) 12%, transparent);"
            onfocus={handleInputFocus}
            onblur={handleInputBlur}
          ></textarea>
        </div>

        <button
          type="submit"
          class="submit-btn"
          disabled={!name || !userEmail || !message}
          style="
            background-color: var(--foreground);
            color: var(--background);
          "
        >
          Send Message
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    {/if}
  </div>
</section>

<style>
  .footer-contact {
    width: 100%;
    margin-top: 3rem;
  }

  .contact-inner {
    max-width: 640px;
    margin: 0 auto;
    padding: 2.5rem;
    border-radius: 1.25rem;
    border: 1px solid color-mix(in oklab, var(--foreground) 8%, transparent);
    background-color: color-mix(in oklab, var(--foreground) 3%, transparent);
    backdrop-filter: blur(12px);
  }

  .contact-heading-wrap {
    margin-bottom: 1.75rem;
  }

  .contact-heading {
    font-size: clamp(1.3rem, 3vw, 1.75rem);
    font-weight: 700;
    color: var(--foreground);
    margin: 0 0 0.5rem;
    line-height: 1.25;
  }

  .contact-subhead {
    font-family: var(--font-outfit), sans-serif;
    font-size: 0.875rem;
    color: color-mix(in oklab, var(--foreground) 55%, transparent);
    margin: 0;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.875rem;
  }

  @media (max-width: 500px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .form-label {
    font-family: var(--font-outfit), sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--foreground) 50%, transparent);
  }

  .form-input {
    font-family: var(--font-outfit), sans-serif;
    font-size: 0.9rem;
    padding: 0.6rem 0.875rem;
    border-radius: 0.6rem;
    border: 1px solid;
    background-color: color-mix(in oklab, var(--background) 90%, transparent);
    color: var(--foreground);
    outline: none;
    transition: border-color 0.2s, background-color 0.2s;
    width: 100%;
    box-sizing: border-box;
  }

  .form-input::placeholder {
    color: color-mix(in oklab, var(--foreground) 30%, transparent);
  }

  .form-textarea {
    resize: vertical;
    min-height: 100px;
    line-height: 1.6;
  }

  .submit-btn {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1.4rem;
    border-radius: 9999px;
    font-family: var(--font-outfit), sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
    letter-spacing: 0.01em;
  }

  .submit-btn:hover:not(:disabled) {
    opacity: 0.88;
    transform: scale(1.03);
  }

  .submit-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .sent-notice {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    background-color: color-mix(in oklab, var(--foreground) 6%, transparent);
    color: var(--foreground);
    font-family: var(--font-outfit), sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
  }
</style>
