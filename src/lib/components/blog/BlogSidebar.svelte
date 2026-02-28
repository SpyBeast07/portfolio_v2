<script lang="ts">
  import BlogAuthorCard from './BlogAuthorCard.svelte';
  import BlogMeta from './BlogMeta.svelte';
  import SocialPill from '../shared/SocialPill.svelte';
  import type { TocItem } from '../../../routes/blog/[slug]/+page';
  import { onMount } from 'svelte';

  let {
    date,
    readTime,
    title,
    slug,
    toc
  }: {
    date: string;
    readTime: string;
    title: string;
    slug: string;
    toc?: TocItem[];
  } = $props();

  let activeId = $state('');
  let tocWrapper: HTMLDivElement | undefined = $state();

  $effect(() => {
    if (activeId && tocWrapper) {
      // Find the active <li> wrapper to get correct offset relative to tocWrapper
      const activeLink = tocWrapper.querySelector(`a[href="#${activeId}"]`);
      const activeLi = activeLink?.closest('li') as HTMLElement;
      
      if (activeLi) {
        const wrapperTop = tocWrapper.scrollTop;
        const wrapperHeight = tocWrapper.clientHeight;
        const wrapperBottom = wrapperTop + wrapperHeight;
        
        const elTop = activeLi.offsetTop;
        const elHeight = activeLi.clientHeight;
        const elBottom = elTop + elHeight;
        
        // Check if the element is outside the visible scroll area
        if (elTop < wrapperTop || elBottom > wrapperBottom) {
          tocWrapper.scrollTo({
            top: elTop - wrapperHeight / 2 + elHeight / 2,
            behavior: 'smooth'
          });
        }
      }
    }
  });

  onMount(() => {
    if (!toc || toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId = entry.target.id;
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0
      }
    );

    toc.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });

  function handleScrollTo(e: MouseEvent, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setTimeout(() => { activeId = id; }, 100);
    }
  }
</script>

<aside class="blog-sidebar flex flex-1 min-h-0 h-full flex-col overflow-hidden" aria-label="Article sidebar">
  <!-- Top: About & Meta -->
  <div class="flex-none pb-4">
    <div class="mb-5">
      <BlogAuthorCard />
    </div>
    
    <div class="meta-container text-xs font-medium tracking-wide uppercase transition-colors duration-300"
         style="color: color-mix(in oklab, var(--foreground) 60%, transparent);">
      <BlogMeta {date} {readTime} />
    </div>
  </div>

  <!-- Middle: Scrollable TOC -->
  {#if toc && toc.length > 0}
    <div bind:this={tocWrapper} class="toc-wrapper flex-1 min-h-0 overflow-y-auto pb-4 pt-2 my-2 relative overscroll-contain no-scrollbar">
      <ul class="flex flex-col items-start gap-4">
        {#each toc as item}
          <li style="padding-left: {(item.level - 2) * 1}rem;" class="w-full min-w-0">
            <a 
              href="#{item.id}" 
              class="group flex items-center gap-4 text-[0.85rem] font-medium tracking-wide transition-colors duration-300 w-full min-w-0"
              style="color: {activeId === item.id ? 'var(--foreground)' : 'color-mix(in oklab, var(--foreground) 50%, transparent)'};"
              onclick={(e) => handleScrollTo(e, item.id)}
            >
              <span
                class={`block h-[1px] transition-all duration-300 flex-shrink-0 ${activeId === item.id ? 'w-6' : 'w-0 group-hover:w-3'}`}
                style="background-color: var(--foreground);"
              ></span>
              <span class="truncate flex-1 min-w-0">{item.text}</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {:else}
    <div class="flex-1 min-h-0"></div> <!-- spacer if no toc -->
  {/if}

  <!-- Bottom: Social Pill -->
  <div class="flex-none pt-2 pb-6 pointer-events-auto z-10">
    <SocialPill />
    
    <div class="mt-6">
      <a href="/blogs" class="text-[0.7rem] tracking-widest uppercase flex items-center gap-2 hover:opacity-100 transition-opacity"
         style="color: color-mix(in oklab, var(--foreground) 40%, transparent);">
        ← Back to Blogs
      </a>
    </div>
  </div>
</aside>

<style>
  /* Base flex layout for the sidebar */
  .blog-sidebar {
    height: 100%;
    /* Let the parent container's h-[calc(100vh-...)] dictate the height */
  }

  /* Fade mask for smooth scrolling TOC ends */
  .mask-edges {
    mask-image: linear-gradient(
      to bottom,
      transparent,
      black 3%,
      black 97%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent,
      black 3%,
      black 97%,
      transparent
    );
  }

  /* Hide scrollbar completely while maintaining scroll functionality */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>
