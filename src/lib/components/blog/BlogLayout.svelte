<script lang="ts">
  import { Motion, useViewportScroll, useTransform } from 'svelte-motion';
  import BlogCoverImage from './BlogCoverImage.svelte';
  import BlogSidebar from './BlogSidebar.svelte';
  import BlogContent from './BlogContent.svelte';
  import type { TocItem } from '../../../routes/blog/[slug]/+page';
  import type { Blog } from '$lib/data';

  let { 
    blog,
    parsedContent,
    toc
  }: { 
    blog: Blog;
    parsedContent: string;
    toc: TocItem[];
  } = $props();

  // Scroll animations for sidebar fade-in
  const { scrollY } = useViewportScroll();
  const sidebarOpacity = useTransform(scrollY, [150, 350], [0, 1]);
  const sidebarY = useTransform(scrollY, [150, 350], [20, 0]);
</script>

<div class="blog-layout-wrapper w-full">
  
  <!-- Full-Width Native Scrolling Cover Image -->
  {#if blog.image}
    <div class="w-full relative z-10">
      <div class="h-[60vh] min-h-[500px] w-full lg:h-[75vh]">
        <img 
          src={blog.image} 
          alt={blog.title} 
          class="h-full w-full object-cover" 
          loading="lazy" 
        />
        <!-- Subtle gradient overlay to blend into background -->
        <div class="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90"></div>
      </div>
    </div>
  {/if}

  <!-- Main Content Grid -->
  <div class="relative z-20 mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-16 pb-24 -mt-32 md:-mt-48">
    <div class="flex flex-col md:flex-row gap-8 lg:gap-16">
      
      <!-- Sticky Sidebar (approx 20%) - Hidden on mobile -->
      <aside class="hidden md:block min-w-0 w-full md:w-[35%] lg:w-[20%]">
        <!-- Add a wrapper that is sticky and takes up screen height minus header -->
        <div class="sticky top-28 h-[calc(100vh-8rem)] max-h-[calc(100vh-8rem)] w-full flex flex-col min-h-0 overflow-hidden">
          <BlogSidebar
            date={blog.date}
            readTime={blog.readTime}
            title={blog.title}
            slug={blog.slug}
            toc={toc}
          />
        </div>
      </aside>

      <!-- Scrolling Content (approx 80%) -->
      <main class="min-w-0 w-full md:w-[65%] lg:w-[80%] pt-8 md:pt-0">
        <!-- Detached Content Card -->
        <div 
          class="blog-content-card rounded-[2rem] p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-xl md:p-12 mb-16"
          style="
            background-color: color-mix(in oklab, var(--background) 70%, transparent);
            border: 1px solid color-mix(in oklab, var(--foreground) 8%, transparent);
          "
        >
          <BlogContent
            title={blog.title}
            date={blog.date}
            readTime={blog.readTime}
            excerpt={blog.excerpt}
            content={parsedContent}
          />
        </div>
      </main>

    </div>
  </div>
</div>
