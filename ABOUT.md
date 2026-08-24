Portfolio Website Reverse Engineering Documentation
Part 1 — Site Structure
URL	Page Name	Purpose	Entry Points	Exit Points
/	Home	Main entry point, showcases profile, now section, blogs, and projects	Direct access, navbar links, social links	About, Work, Blogs pages
/about	About	Biography, experiences, education, skills	Navbar, Home scroll	Resume download, GitHub, LinkedIn
/work	Work & Projects	Display all projects with filtering by category	Navbar, Home scroll	Project details, GitHub repos
/blogs	Blogs	List of blog posts with excerpts	Navbar, Home scroll	Blog detail pages
/blog/[slug]	Blog Post	Individual blog article reading	/blogs listing, search engines	Home, other blogs
/resume	Resume	PDF resume download	Navbar, About page	Download action
Part 2 — Routing
/
├── about
├── work
│   ├── category filter (All, Artificial Intelligence, Web Development, Research)
│   └── project cards
├── blogs
│   ├── blog listing page
│   └── [slug]
│       └── individual blog post
├── now (anchor #now on home page)
└── contact (implied via footer)
Dynamic routes: /blog/[slug] where slug is unique per blog post (e.g., why-i-switched-to-sveltekit)
Part 3 — Navigation
Header / Navbar
Floating Mode (default, desktop):
- Fixed positioned navbar centered in the page
- Rounded pill shape with background indicator
- Items: Home, About, Work, Blogs
- Active item indicated by colored indicator
- Hover effects on items
- Clicking item scrolls to corresponding section
Sidebar Mode (mobile/expanded):
- Full-height sidebar sliding from left
- Vertical navigation with same items
- Active state based on scroll position (IntersectionObserver)
- Mouse enter/leave color transitions
Footer
- Three columns of social links (GitHub, LinkedIn, Email)
- Each link has icon, hover scale animation (1.1x)
- Text: "Coded in Visual Studio Code by yours truly. Built with SvelteKit and Tailwind CSS, deployed with Vercel."
- "Interested in working together? Feel free to reach out on LinkedIn or email."
- Resume download button on About page
Mobile Navigation
- Hamburger/menu icon not explicitly shown - mobile view hides the floating navbar
- On mobile, the hero title animates differently
- Sidebar mode can be activated via mode="sidebar" prop on Navbar
- Mobile name shows HeroTitle with 18vw size
Keyboard Navigation
- Tab navigation between navbar items
- Focus visible states via Tailwind classes
- Smooth scroll on link activation
- Escape key not explicitly handled for sidebar
Back Buttons
- "← Back to Blogs" link in BlogSidebar
- Browser back button works with SPA-like navigation
Breadcrumbs
- Not explicitly present on pages
- Implicit hierarchy through page titles
Scroll Navigation
- Smooth scroll on navbar link clicks
- IntersectionObserver-based active section highlighting
- Scroll-driven animations (hero opacity, name position, logo scale)
- Progress bar at top of blog posts
Hidden Navigation
- Mobile-only sidebar (activated via mode="sidebar" on Navbar)
- Floating navbar hidden on mobile (md:hidden)
- Sidebar hidden on mobile by default (hidden md:block)
Part 4 — Every Page
Home Page (/)
Purpose: Main entry point, personal introduction, showcase of current work, blogs, and projects
Target Audience: Recruiters, fellow developers, potential collaborators
Hero Section:
- Full-screen animated background
- Floating logo icon (HeroLogo component)
- Name animation: "Kushagra Gupta" with typewriter-like effects
- Role: "Developer & AI Enthusiast"
- Three floating social pills (GitHub, LinkedIn, Email) at bottom-left
- "Now" section below hero showing what user is currently working on/learning
Content Sections:
1. Now Section ("What I'm Doing Now"):
- Three columns: Work & Projects, Learning & Philosophy, Hobbies & Interests
- Each item has text and optional links
- Last updated: February 2026
2. Blogs Section ("Latest Writing"):
- Shows 2 most recent blog posts as BlogItem cards
- "View More Blogs" button if more than 2 posts
- Each card shows date, read time, title, excerpt
3. Footer: Standard footer with social links and about text
Cards: BlogItem cards (2 per page), ProjectCard (on work page)
Buttons: 
- "View More Blogs"
- ProjectCard: GitHub and Live Demo buttons
- About: "View Resume"
- Footer social links
Links: 
- GitHub: https://github.com/SpyBeast07
- LinkedIn: https://www.linkedin.com/in/spybeast07/
- Email: mailto:kggupta.work@gmail.com
- Blog posts
- Project GitHub/repo links
- Resume PDF
Images: 
- Logo at top of page (/logo.png)
- Hero avatar/character imagery
- Now section doesn't have direct images but has visual styling
- Background grid pattern
Icons: 
- GitIcon, LinkedInIcon, EmailIcon
- FileTextIcon (resume
Thinking
Thinking
Thinking
+ Thought: 327ms
Portfolio Website Reverse Engineering Documentation
Part 1 — Site Structure
URL	Page Name	Purpose	Entry Points	Exit Points
/	Home	Main entry point, personal branding, "Now" section, recent blogs, quick access to projects/about	Header navbar, hero CTA, footer	Projects page, About page, Blogs page
/about	About	Biography, experience, education, skills, resume download	Header navbar, footer resume CTA	Home page, Work page
/work	Work & Projects	Display all projects with filtering by category (AI, Web Dev, Research)	Header navbar, footer	Home page, individual project detail (GitHub)
/blogs	Blogs	List of blog posts with excerpts	Header navbar	Individual blog post
/blog/[slug]	Blog Post	Individual article reading experience	/blogs listing, direct URL	Home page
/resume	Resume	PDF resume download	Header navbar, About page	Home page, Work page
Part 2 — Routing Tree
/                                 Home
├── /about                        About
├── /work                         Work & Projects
│   └── (category filter)         AI / Web Development / Research
├── /blogs                        Blogs listing
│   └── /[slug]                   Blog post detail (dynamic route)
│       └── auto-generated TOC
├── /now                          Now section (on home only)
└── /resume                       Resume PDF
Dynamic routes: /blog/[slug] - each blog post has a unique slug
Part 3 — Navigation
Header
- Floating mode (default on desktop): Rounded pill-shaped navbar with sliding indicator, items: Home, About, Work, Blobs
- Sidebar mode (mobile/expanded): Vertical navigation with sidebar, active section highlighted via scroll spy
- Mode toggle: mode="floating" or mode="sidebar" prop on Navbar component
- Scroll indicator: Animated bar between items showing current active section
Navbar (Floating)
- Fixed positioned, centered, with background blur
- Sliding background indicator following active item
- Hover effects on items with color transition
- Items: Home, About, Work, Blogs
Navbar (Sidebar)
- Full-height vertical sidebar
- Active item highlighted with underline
- Scroll-based active section detection (IntersectionObserver)
- Mouseenter/mouseleave color transitions
Mobile Navigation
- Hamburger-like behavior implied by mode="sidebar" on mobile
- Mobile name displays differently (HeroTitle with md:hidden)
- Sidebar slides in on mobile
Footer
- Three social links: GitHub, LinkedIn, Email
- Hover effects (scale 1.1, color change)
- About page footer: "View Resume" button
- Blog page footer: contact form
- Main footer text: "Coded in Visual Studio Code by yours truly. Built with SvelteKit and Tailwind CSS, deployed with Vercel."
Back Buttons
- Blog detail page: "← Back to Blogs" link in sidebar
- BlogItem components: "Read Article →" at bottom
- About page: implicit browser back
Breadcrumbs
- Not explicitly present; homepage acts as root, individual pages have title-based navigation
Keyboard Navigation
- Tab navigation through all interactive elements
- Focus visible states via Tailwind classes
- Form inputs focus/blur styles on blog contact
Scroll Navigation
- Smooth scroll to section on navbar item click
- Scrollspy: Navbar items highlight based on scroll position
- "Now" section items with links to external articles
Hidden Navigation
- Sidebar mode hidden on desktop (md:flex hidden on mobile)
- Social pills hidden on mobile (hidden md:block)
- Mobile hero name hidden on desktop (hidden md:block)
Part 4 — Every Page Documentation
Home Page (/)
Purpose: Main entry point, personal branding, "Now" section, recent blogs, quick access to projects/about  
Target Audience: Visitors, potential employers, collaborators  
Hero Section: 
- Name: "Kushagra Gupta" with animated typing/positioning
- Role: "Developer & AI Enthusiast" with floating badge
- Logo animation
- CTA: Scroll down or direct navigation
Content Sections:
- "What I'm Doing Now" - current work, learning, hobbies
- Latest Writing (last 2 blogs)
- Projects grid (featured projects)
Cards: ProjectCard components (8 projects displayed on work section)
Buttons: 
- "View Resume" (on About section of home)
- "View More Blogs" (if >2 blogs)
Links: GitHub, LinkedIn, Email in footer
Images: Logo (/logo.png), Now section icons, blog cover images
Icons: GithubIcon, LinkedinIcon, EmailIcon, ExternalLinkIcon
Interactive Components: Navbar (floating/sidebar), ProjectCard hover, BlogItem hover, NowSectionItem links
Animations: 
- Logo fade/scale on scroll
- Name animation (transform based on scroll)
- Progress bar on blog posts
- Section indicators
Videos: None
Code Snippets: None directly displayed
Timeline: None
Testimonials: None
Badges: "Developer & AI Enthusiast", floating badge
Statistics: None on home
About Page (/about)
Purpose: Detailed biography, experience, education, skills  
Target Audience: Recruiters, people wanting to know the person behind the portfolio  
Hero Section:
- Headline: "Nice to meet you. I'm Kushagra."
- Photo: /about.jpg circular portrait with decoration
Content Sections:
1. Bio text: 4 paragraphs about personality, work philosophy, AI views, outside-of-code interests
2. Where I Worked: Timeline of work experiences (3 internships)
3. Where I Studied: Education timeline (University + 2 exchange programs)
4. Social Icons: GitHub, LinkedIn, Email
5. Resume CTA: "View Resume" button linking to /resume
Timeline Items: 
- Expandable story sections for each experience/education entry
- Tags, locations, dates, GPAs
Cards: None specific (uses TimelineItem)
Buttons: "View Resume"
Links: Resume PDF download, social links
Images: /about.jpg portrait, university logos (/jklu.jpg, /iitgn.png, /iiith.jpg)
Icons: FileTextIcon, GithubIcon, LinkedinIcon, EmailIcon, GithubIcon
Interactive Components: 
- TimelineItem expandable stories
- Social link hover effects
- Resume button hover
Animations: 
- TimelineItem expand/collapse slide
- Hover color transforms
Videos: None
Code Snippets: None
Testimonials: None
Badges: Skill tags within timeline items
Work/Projects Page (/work)
Purpose: Display all projects with filtering capability  
Target Audience: Recruiters, people looking at specific project categories  
Hero/Heading: 
- Page heading: "Projects" with description ${projects.length}+ projects built across web, AI, and tooling
- "+ projects and counting..." counter with AnimatedCounter
Category Filter: 
- Buttons: All, Artificial Intelligence, Web Development, Research
- Active state styling, tap effects for mobile
Projects Grid: 
- 8 projects displayed in grid (1 column, responsive to more columns)
- Each: ProjectCard with title, description, tags, GitHub link, Live Demo link
Skills Section: 
- "My Technical Playground" heading
- Skills organized by category: languages, frontend, backendAndAPIs, dataMLAndVisualization, databasesCloudAndMonitoring, toolsAndProductivity
- Pill-shaped skill tags
Github Stats: 
- "Github Stats" heading
- GithubStats component showing contribution chart
Cards: ProjectCard (reused component)
Buttons: None directly, but ProjectCard has GitHub and Live Demo buttons
Links: Each project's GitHub and demo links
Images: Project images (all currently empty/undefined in data)
Icons: GithubIcon, ExternalLinkIcon in ProjectCard
Interactive Components: 
- Category filter buttons (active state)
- ProjectCard hover effects (github bg change, demo opacity)
- Filter re-renders projects
Animations: 
- AnimatedCounter counting up project count
- Hover transitions on project cards
Videos: None
Code Snippets: None
Timeline: None
Testimonials: None
Badges: Skill tags, category filter buttons
Statistics: Project count counter
Blogs Page (/blogs)
Purpose: List of blog posts with excerpts  
Target Audience: Readers wanting to browse articles  
Heading: "Writing" with description: "Thoughts on software engineering, design systems, and the future of AI."
Blog Listing: 
- Up to 2 blog items shown with image, date, read time, title, excerpt
- "Read Article →" button
- "View More Blogs" button (if >2 blogs)
Empty State: "Thoughtful essays coming soon..." placeholder
Cards: BlogItem (each blog listing)
Buttons: "Read Article →", "View More Blogs"
Links: Each blog links to /blog/${slug}
Images: Blog cover images (/svelte_switch.png for the one shown)
Icons: ExternalLinkIcon (→ icon)
Interactive Components: 
- BlogItem hover (background color change)
- Button clicks to navigate
Animations: 
- Hover transitions on blog items
Videos: None
Code Snippets: None
Timeline: None
Testimonials: None
Badges: None specific
Blog Post Detail (/blog/[slug])
Purpose: Individual article reading experience  
Target Audience: People reading specific blog articles  
SEO: 
- Title: {blog.title} | Kushagra Gupta
- Meta description: blog.excerpt
- Open Graph: title, description, image
- Twitter: card, title, description, image
- JSON-LD BlogPosting structured data
Reading Progress Bar: Fixed top progress bar animates based on scroll position
Layout:
- Sticky sidebar (20% width) with TOC and author card
- Main content area (80% width) with blog content
Sidebar:
- Author card with avatar and bio
- Table of Contents (auto-generated from headings)
- "← Back to Blogs" link
Content Area:
- Blog title (H1, Playfair display font)
- Excerpt paragraph (italic)
- Main content ({@html content}) with prose styling
- Code blocks, tables, lists, blockquotes all styled
Footer Contact: 
- "Want to share your thoughts?" form
- Name, Email, Message fields
- "Send Message" button (opens mailto)
Cards: BlogLayout (wrapper), author card
Buttons: "Send Message", "← Back to Blogs"
Links: 
- TOC links to section headings
- "← Back to Blogs"
- Mailto link from contact form
Images: Blog cover image at top
Icons: None specific beyond social
Interactive Components: 
- TOC link scrolling
- Form submission
- Author card click/hover
Animations: 
- Fade-in entrance
- Progress bar animation
- Sidebar scroll sync with content
Videos: None
Code Snippets: Full article content with code blocks
Timeline: None
Testimonials: None
Badges: None
Resume Page (/resume)
Purpose: Display/download resume PDF  
Target Audience: Recruiters, hiring managers  
Content: 
- PDF embedded/loaded: /Kushagra_Gupta_updated_Resume.pdf
- "Loading PDF..." text
Buttons/Links: Download PDF link
Images: PDF preview not applicable
Part 5 — Section Breakdown
Hero Section (Home)
- Layout: Absolute positioned name/role, floating logo, scrolling animations
- Content hierarchy: Name (largest) > Role > Logo > CTA
- Text: "Kushagra Gupta", "Developer & AI Enthusiast"
- Buttons: Implicit via navbar links
- Images: /logo.png
- Interactions: Scroll-based animations (transform, opacity)
- Responsive: Mobile name positioning changes, sidebar behavior changes
Now Section
- Layout: Three columns (Work & Projects, Learning & Philosophy, Hobbies & Interests)
- Content hierarchy: Section title > items list
- Text: Item descriptions, external links
- Buttons: None
- Images: None specific
- Interactions: Link clicks to external articles
- Responsive: Stacks vertically on mobile
Blogs Section (Home)
- Layout: Grid of 2 columns max, showing latest 2 blog posts
- Content hierarchy: BlogItem (image optional, meta, title, excerpt, CTA)
- Text: Date, read time, title, excerpt
- Buttons: "Read Article →"
- Images: Blog cover images (optional)
- Interactions: Click to navigate to blog post
- Responsive: Full width on mobile, 2 columns on desktop
Projects Section (Work page)
- Layout: Category filter bar + grid of project cards
- Content hierarchy: Filter buttons > project grid
- Text: Project titles, descriptions
- Buttons: GitHub, Live Demo (per project)
- Images: Project images (currently empty in data)
- Interactions: Category filtering, project card hover
- Responsive: 1 column grid
Skills Section (Work page)
- Layout: Grid of skill category columns
- Content hierarchy: Category header > skill tags
- Text: Skill names
- Buttons: None
- Interactions: None
- Responsive: 1 column on mobile, more columns on desktop
Category Filters (Work page)
- Layout: Horizontal scrollable button group
- Content hierarchy: Buttons category labels
- Text: "All", "Artificial Intelligence", "Web Development", "Research"
- Interactions: Click to filter projects
- Responsive: Scrollable on narrow screens
Blog Listing (Blogs page)
- Layout: Grid of blog items (2 max on desktop)
- Content hierarchy: BlogItem (date, read time, title, excerpt, CTA)
- Text: Date, read time, title, excerpt
- Buttons: "Read Article →"
- Images: Blog cover (optional)
- Interactions: Click to navigate
- Responsive: Full width on mobile
Blog Post Detail
- Layout: Grid with sidebar (80/20 split) or full-width on mobile
- Content hierarchy: Cover image > title > excerpt > content > sidebar (TOC + author)
- Text: Full article content, meta info
- Buttons: "Send Message" (contact form), "← Back to Blogs"
- Images: Cover image at top
- Interactions: TOC scrolling, form submission
- Responsive: Full-width main content on mobile, sidebar hidden
About Section (About page)
- Layout: Two-column (photo + text), then two separate timeline sections
- Content hierarchy: Headline > photo > bio text > experiences > education > social > resume
- Text: Bio paragraphs, experience details, education details
- Buttons: "View Resume"
- Images: Profile photo, university logos
- Interactions: Timeline expand/collapse stories
- Responsive: Photo floats right on desktop, stacks on mobile
Experience/Timeline Items
- Layout: Vertical timeline with line connector
- Content hierarchy: Title (H3, Playfair) > subtitle + date > description (expandable) > tags
- Text: Company/role, dates, location, description, tags
- Interactions: "Read story ↓" expand/collapse
- Responsive: Stack vertically
Education Timeline Items
- Layout: Same as experience but with additional CGPA and related entries (exchange programs)
- Additional: University logo, GPA, related semester exchanges
Blog Post Meta
- Layout: Small info bar at top of sidebar
- Content hierarchy: Date • read time
- Text: "Feb 28, 2026 • 5 min read"
- Interactions: None
Blog TOC (Table of Contents)
- Layout: Sidebar nested list based on heading levels
- Content hierarchy: Level 2 > level 3 indentation
- Text: Heading texts from article
- Interactions: Click to scroll to section
- Responsive: Hidden on mobile, sticky on desktop
Author Card (Blog sidebar)
- Layout: Avatar + name + bio, stacked vertically
- Content hierarchy: Avatar > name > bio
- Text: "Kushagra Gupta", "Developer & AI Enthusiast. Building things at the edge of software and intelligence."
- Interactions: None specific
Contact Form (Blog post footer)
- Layout: Form with name, email, message fields
- Content hierarchy: Heading + form fields + submit button
- Text: "Want to share your thoughts?", form labels, placeholder text
- Buttons: "Send Message"
- Interactions: Form submission via mailto
- Responsive: Stacks form fields on mobile
Part 6 — Components Inventory
Hero
- Purpose: Display name, role, and logo on home page
- Props: None specific (internal state)
- States: Loading (PageLoader), animated position
- Variants: Floating logo, animated name positioning
- Where used: /+page.svelte (home only)
Navbar
- Purpose: Site navigation, section highlighting, scroll indicator
- Props: mode?: 'floating' | 'sidebar'
- States: Active item indicator, sidebar open/closed
- Variants: Floating mode, Sidebar mode
- Where used: /+page.svelte (all pages), /about/+page.svelte, /work/+page.svelte
Footer
- Purpose: Site-wide footer with social links and copyright
- Props: None (uses socialLinks from data)
- States: Hover-activated scale/color changes
- Variants: Standard footer, About page footer (with resume CTA), Blog footer (with contact form)
- Where used: /+page.svelte, /about/+page.svelte, /blogs/+page.svelte, /blog/[slug]/+page.svelte
ProjectCard
- Purpose: Display individual project with tags, GitHub/demo links
- Props: title, description, tags, image?, githubLink, demoLink?, category
- States: Default, hover (github bg change, demo opacity)
- Variants: With image, without image, with demo link, without demo link
- Where used: /work/+page.svelte
Article Card (BlogItem)
- Purpose: Display blog preview card
- Props: title, excerpt, date, slug, readTime, image?, showImage
- States: Default, hover (background color)
- Variants: With image (showImage=true), without image
- Where used: /blogs/+page.svelte, /blog/[slug]/+page.svelte (sidebar listing)
Tech Stack Badge (Skill tag)
- Purpose: Display skill/category pill
- Props: skill name, category color context
- States: Hover (bg color change)
- Variants: Different categories (languages, frontend, etc.)
- Where used: /work/+page.svelte (skills section)
TimelineItem
- Purpose: Display experience or education entry in timeline
- Props: title, subtitle, date, description, tags?, location?, type?, cgpa?, related?, logo?, story?
- States: Expanded/collapsed story, hover
- Variants: Experience vs Education (education has CGPA, related entries)
- Where used: /about/+page.svelte (experiences + education)
Button (CustomButton)
- Purpose: Styled action button
- Props: href, children, className
- States: Default, hover (scale, bg color)
- Variants: Primary (bg foreground, text background), secondary
- Where used: /about/+page.svelte (Resume), /blogs/+page.svelte (View More), /blog/[slug]/+page.svelte (Send Message), multiple places
Input
- Purpose: Form input fields
- Props: type, bind:value, placeholder, required, etc.
- States: Default, focused, blurred, disabled
- Variants: Text input, email input, textarea
- Where used: /blog/[slug]/+page.svelte (contact form)
Tag
- Purpose: Category/pill tag display
- Props: tag text
- States: Default, hover
- Variants: Skill tags, category tags, project tags
- Where used: /work/+page.svelte (skills), /work/+page.svelte (projects), /about/+page.svelte (timeline tags)
Avatar
- Purpose: User profile image
- Props: src, alt
- States: Default, loaded, error
- Variants: Circular (about page), square (author card)
- Where used: /about/+page.svelte (profile), /blog/[slug]/+page.svelte (author card)
Code Block (prose)
- Purpose: Display code snippets in blog content
- Props: Rendered via @html content
- States: Syntax highlighted via prose styles
- Variants: Inline code, code blocks, preformatted
- Where used: /blog/[slug]/+page.svelte (article content)
Markdown Renderer
- Purpose: Render blog content with HTML
- Props: content string (HTML)
- States: Auto-generated TOC, table wrapping
- Variants: None specific
- Where used: /blog/[slug]/+page.ts (load), /blog/[slug]/+page.svelte (BlogContent)
Theme Toggle
- Purpose: Light/dark mode switching
- Props: None (uses localStorage)
- States: 'light' | 'dark'
- Variants: None
- Where used: Store (src/lib/stores/theme.ts), affects document.documentElement.classList
Social Links
- Purpose: Display social media links as pills
- Props: label, href from socialLinks array
- States: Hover (scale, color)
- Variants: GitHub, LinkedIn, Email
- Where used: Footer, About page, Blog sidebar, Navbar
Project Preview (ProjectCard)
- Purpose: Clickable project summary
- Props: Project data from work.ts
- States: Hover, click (opens GitHub/demo)
- Variants: With demo link, without demo link
- Where used: /work/+page.svelte
Image Gallery
- Purpose: Not explicitly present; blog posts have single cover images
Blog Card
- Purpose: Blog listing item
- Props: Blog data from blogs.ts
- States: Hover, selected
- Variants: With image, without image
- Where used: /blogs/+page.svelte
Expandable Story
- Purpose: Toggleable expandable content
- Props: description (always shown), story (collapsible), className
- States: Expanded/collapsed
- Variants: Experience stories, education stories
- Where used: /about/+page.svelte (TimelineItem), /ExpandableStory.svelte
PageLoader
- Purpose: Loading screen on first visit
- Props: isVisible
- States: Visible (first visit), hidden (subsequent)
- Variants: None
- Where used: /+page.svelte
VerticalEmail
- Purpose: Decorative animated email icons in background
- Props: None
- States: Floating animation
- Where used: /+page.svelte (background), /about/+page.svelte, /work/+page.svelte
GithubStats
- Purpose: Display GitHub contribution chart
- Props: None (uses GitHub API)
- States: Loading, displayed
- Where used: /work/+page.svelte
BlogMeta
- Purpose: Display blog metadata (date, read time)
- Props: date, readTime
- States: Default
- Where used: /blog/[slug]/+page.svelte (sidebar + content)
BlogSidebar
- Purpose: Sidebar for blog posts with TOC and author
- Props: date, readTime, title, slug, toc
- States: TOC active tracking, scroll sync
- Where used: /blog/[slug]/+page.svelte
BlogLayout
- Purpose: Overall blog post layout with sidebar and content
- Props: blog, parsedContent, toc
- Where used: /blog/[slug]/+page.svelte
BlogCoverImage
- Purpose: Blog post cover image
- Props: src, alt
- Where used: /blog/[slug]/+page.svelte
BlogAuthorCard
- Purpose: Author info card in blog sidebar
- Props: None (hardcoded to Kushagra)
- Where used: /blog/[slug]/+page.svelte (sidebar)
BlogFooterContact
- Purpose: Contact form at bottom of blog post
- Props: None
- Where used: /blog/[slug]/+page.svelte
PageHeading
- Purpose: Page title + description
- Props: title, description (string or Snippet)
- Where used: /about/+page.svelte, /work/+page.svelte, /blogs/+page.svelte
SectionHeading
- Purpose: Section header with playfair font
- Props: children (Snippet)
- Where used: Multiple pages for section headers
NowSection / NowSectionItem
- Purpose: "What I'm Doing Now" section on home
- Props: now data, section, index
- Where used: /+page.svelte
ExpandableStory
- Purpose: Collapsible story sections
- Props: description, story, className
- Where used: /about/+page.svelte (TimelineItem)
PdfViewer (implied)
- Purpose: Resume PDF display
- Where used: /resume route (PDF link)
Part 7 — Design System
Typography
Font Families:
- font-playfair: Playfair Display (serif, display font) - used for headings, hero name, project titles, section headings
- font-outfit: Outfit (sans-serif) - used for body text, paragraphs, meta info
- font-mono: Monospace (Fira Code/JetBrains Mono/Cascadia Code) - used for code blocks
Font Sizes:
- Hero title: text-[14vw] / text-[18vw] (responsive viewport units)
- Section headings: text-5xl (2.72rem), text-3xl (1.875rem), text-2xl (1.5rem)
- Lead text: text-lg (1.125rem), text-sm (0.875rem)
- Caption/small: text-xs (0.75rem)
- Playfair display clamp: clamp(1.75rem, 4vw, 2.75rem) for blog titles, clamp(1.3rem, 2.5vw, 1.7rem) for prose h2, etc.
Font Weights:
- Normal: 400/400
- Medium: 500/500
- Bold: 600/600/700
- Extra bold: 800
- Black: 900 (Playfair)
Line Heights:
- Default: leading-relaxed
- Tight: leading-tight
- Section: leading-snug
Text Transformations:
- Uppercase: uppercase, capitalize
- Tracking: tracking-widest, tracking-wider
Layout
Containers:
- Max-width: max-w-4xl (max-width 56rem / 900px) on about/work/blogs pages
- Centered: mx-auto
- Padding: px-6 (desktop), px-6 md:px-16
Grid:
- 1 column mobile, responsive columns desktop
- Project grid: grid grid-cols-1 gap-12 (1 col), responsive
- Skills grid: grid grid-cols-1 gap-8 md:grid-cols-2
- Blog layout: 80/20 split (content/sidebar) on desktop, full-width on mobile
Margins/Space:
- Section margins: mb-24 lg:mb-32, mb-16
- Between items: space-y-4, space-y-6, space-y-12
- Between grid items: gap-4, gap-6, gap-8, gap-12
Border Radius:
- Default: rounded-lg (0.5rem), rounded-3xl (0.875rem)
- Pill: rounded-full
- Avatar: rounded-2xl / rounded-9999px
- Project card: rounded-3xl
- Section containers: rounded-2rem
Shadows:
- Project card: shadow-xl (or subtle border-only without shadow)
- Author card: box-shadow: 0 4px 20px -5px rgba(0,0,0,0.3)
- Blog content card: ring-1 ring-black/5 backdrop-blur-xl
Colors
Color Variables (Tailwind CSS):
- var(--background): Page background color
- var(--foreground): Main text color
- var(--icon-color): Icon color variable
Accent/Primary:
- Yellow/orange accents: color-mix(in oklab, var(--foreground) 5%, transparent), color-mix(in oklab, var(--foreground) 10%, transparent)
- Yellow-500: y-500 references
Backgrounds:
- Page: bg-background (off-white/light)
- Cards: color-mix(in oklab, var(--background) 85%, transparent) etc.
- Grid pattern: bg-grid-pattern (subtle pattern)
Text Colors:
- Primary: var(--foreground)
- Secondary/ muted: color-mix(in oklab, var(--foreground) 70%, transparent) 
- Tertiary: color-mix(in oklab, var(--foreground) 50%, transparent)
- Inverse: color-mix(in oklab, var(--background) 70%, transparent)
Border Colors:
- color-mix(in oklab, var(--foreground) 10%, transparent)
- color-mix(in oklab, var(--foreground) 30%, transparent)
Dark Mode
- Theme store with localStorage persistence
- Prefers-color-scheme media query fallback
- document.documentElement.classList.add('light') / remove for dark mode
- CSS variables switch based on .light class
Icons
- Custom Svelte components in src/lib/components/ui/icons/
- 12 icons: GithubIcon, LinkedinIcon, EmailIcon, FileTextIcon, StackIcon, ExternalLinkIcon, MapPinIcon, BriefcaseIcon, DownloadIcon, HomeIcon, UserIcon, BookOpenIcon
- All use currentColor for text color inheritance
- Sizes vary by context (14px, 20px, 16px etc.)
Design Language
- Playfair Display for all display headings/hero text (elegant, editorial)
- Outfit for all body/text (clean, modern sans-serif)
- Rounded corners everywhere (no sharp edges)
- Color-mix with oklab for subtle, harmonious variations
- Gradient overlays for depth (radial gradients, bg-grid-pattern)
- Floating/animated elements (logo, indicator, name movement)
- Glassmorphism/blurred backgrounds (backdrop-blur-md, backdrop-blur-xl)
- Smooth transitions (duration-300 default, ease-out easing)
Visual Hierarchy
1. Hero name/role (largest, most prominent)
2. Section headings (Playfair Display, 3xl-5xl)
3. Project/blog titles (Playfair, text-xl-2xl)
4. Body text/paragraphs (Outfit, text-sm-lg)
5. Meta info/timestamps (Outfit, text-xs-sm, muted)
6. Tags/pills (smallest, decorative)
Part 8 — Animations
Scroll-based Animations (Home page)
Logo Animation:
- Trigger: Scroll position
- Duration: Transform over scrollY range 0, 200
- Opacity: 1 → 0 as scroll passes 200px
- Scale: 1 → 0.8 over same range
- Purpose: Logo fades/shrinks as user scrolls down
Name Animation:
- Trigger: Scroll position
- Duration: Complex transform chain over scrollY 0, 600
- Effects: Scale (1 → 0.25), X position (-50% → -37%), Y position (35vh → 22vh)
- Purpose: Name transforms/positions during scroll
Progress Bar (blog posts):
- Trigger: Scroll position
- Duration: scrollYProgress based
- Width: 0 → 100% as user reads
- Purpose: Visual reading progress indicator
Sidebar Animations (blog post):
- Trigger: Scroll position
- Duration: scrollY 150, 350 → opacity 0→1, y: 20→0
- Purpose: Sidebar fades in and moves into position
Page Loader:
- Trigger: First visit only
- Duration: 900ms minimum + onload wait
- Purpose: Loading screen on initial page load
Hover Effects
Navbar Items:
- Floating: Color change on mouseenter, indicator width animation
- Sidebar: Color change, underline expansion (w-0 → w-8)
ProjectCard:
- GitHub button: bg color shift on mouseenter/leave
- Live Demo button: opacity 1 → 0.9 on mouseenter
BlogItem:
- Background color shift on mouseenter/leave
Footer Social Links:
- Scale 1 → 1.1 on mouseenter, revert on leave
- Color shift on hover
CustomButton:
- Scale 1 → 1.05 on mouseenter
- Background color shift
TimelineItem:
- Hover color shifts on text elements
Blog Sidebar Social Pill:
- Same hover as footer
Scroll Animations
IntersectionObserver (Navbar spy):
- Trigger: Section entering viewport
- Duration: Tick-based indicator update
- Purpose: Highlight active navbar item based on scroll position
TOC Scroll Sync:
- Trigger: Heading intersection in blog sidebar
- Duration: Smooth scroll to section
- Purpose: Keep TOC active link in view
Transitions
Svelte fade transition:
- Duration: 350ms with 60ms delay
- Used: Blog page entrance
Svelte slide transition:
- Used: ExpandableStory expand/collapse
Custom CSS transitions:
- transition-all duration-300 (most interactive elements)
- transition-colors duration-300
- transition-transform duration-300
Loading Animations
PageLoader:
- Visible only on first visit
- 900ms timeout + document ready check
- CSS grid pattern background animation
Micro-interactions
Scroll indicator in navbar:
- Sliding bar follows active item
- Recalculated on resize and tick
Active state indicators:
- Navbar: sliding bar, color change
- Sidebar: active item underline
- Category filters: active button styling (bg + text color)
- ProjectCard: hover state on buttons
- BlogItem: hover state
Form interactions:
- Input focus: border color change
- Input blur: border color revert
- Button disabled state: opacity 0.35
Smooth scroll:
- window.scrollTo({ top: ..., behavior: 'smooth' }) on navbar clicks, TOC clicks
- smooth behavior on all internal link navigation
Part 9 — Content
Headings/Subheadings
Home Page:
- H1: "Kushagra Gupta" (HeroTitle component, text-14vw)
- H2: "What I'm Doing Now" (SectionHeading)
- H3: Section titles in NowSectionItem
About Page:
- H1: "Nice to meet you. I'm Kushagra." (font-playfair, text-5xl)
- H2: "Where I Worked", "Where I Studied" (SectionHeading, text-5xl)
- H3: Experience subtitles, education subtitles
Work/Projects Page:
- H1: "Projects" (PageHeading, text-5xl) with counter
- H2: Category filter buttons (text-sm, uppercase)
- H2: "My Technical Playground" (within skills section)
Blogs Page:
- H1: "Writing" (PageHeading)
- H2: "Thoughtful essays coming soon..." (placeholder)
Blog Post Detail:
- H1: Blog title (font-playfair, large)
- H2: Article section headings (auto-generated TOC)
- H3: Subsections within article
Resume Page:
- No headings (just PDF)
Paragraphs
Home Page:
- "What I'm Doing Now" descriptions (3 sections, multiple items)
- "Latest Writing" intro text
- Footer copyright text
About Page:
- 4 bio paragraphs (personality, work, AI philosophy, outside code)
- Experience stories (expandable)
- Education stories (expandable)
Work Page:
- Skills description: "Things I've built with and experimented on."
- Project descriptions (in ProjectCard)
- GitHub stats intro text
Blogs Page:
- "Thoughtful essays coming soon..." (italic, playfair)
- Placeholder text
Blog Post Detail:
- Article body paragraphs (prose-styled)
- Meta description: "A practical guide to migrating from Next.js to SvelteKit..."
- Excerpt: "A practical guide to migrating from Next.js to SvelteKit, and why it might be the right move for your next project."
Quotes
About Page:
- Blockquote quote: "Experiences are what that makes you, You." (displayed as pullquote)
Blog Post Detail:
- Blockquote within SvelteKit migration article: "This is the story of how my portfolio evolved across multiple frameworks—and what each migration taught me."
- Also: "Convenience and flexibility are not always the same thing."
- Also: "Promising frameworks are exciting—but ecosystem maturity matters."
- Also: "Once rebuilt, everything became faster, cleaner, and easier to maintain."
- Also: "The migrations weren't setbacks. They were the learning process."
- Also: "In the end, the best framework isn't the most popular one. It's the one that lets you build with confidence."
Project Descriptions
From work.ts data (8 projects):
1. SME AI Agent: "Production-grade RAG system with 95%+ retrieval consistency using Elasticsearch and FAISS. Designed a FastAPI-based server with async pipelines achieving <800ms latency."
2. Legal Redline Sandbox: "Advanced to the Top 90 teams globally in a GenAI hackathon. Spearheaded Google Cloud infrastructure (CloudSQL, Docker) and implemented an async notification system for real-time contract analysis."
3. Multilingual Language Model: "Trained an 18.5M parameter transformer on 400M tokens. Implemented SentencePiece tokenizer and Fine-tuned Gemma-270M with LoRA. Built custom data pipelines for cleaning and segmentation."
4. Byte-Latent Transformer: "Developed a novel BLT model in PyTorch matching character-level baselines but with a 91% reduction in sequence length. Analyzed performance trade-offs vs standard tokenization."
5. ALPR System: "End-to-end ALPR pipeline using a custom 5-layer CNN (71.48% IoU) and EasyOCR. Optimized for real-time inference with TTA. Trained on a curated dataset of ~9,600 images."
6. E-Waste Management Analysis: "Analyzed 15+ datasets on e-waste from emerging and developed economies using Python and statistical methods. Proposed scalable, data-driven waste reduction strategies."
7. Malware Detection AI: "Engineered a machine learning-based malware classifier achieving over 90% detection accuracy. Utilized Wireshark and Docker to analyze network packets for malicious patterns."
8. Spardha Website: "Collaborated to develop the official Spardha website. Built responsive UI with 5+ interactive features; deployed via Vercel with optimized load time under 2s."
Tech Stack
From work.ts skills categories:
- Languages: Python, C++, Java, JavaScript, Bash
- Frontend: HTML, CSS, React, React Hook Form, TanStack, Axios, Zod, Zustand
- Backend/APIs: Node.js, FastAPI, REST APIs, JWT Authentication, SQLAlchemy, Alembic, Pydantic, Uvicorn (ASGI)
- Data/ML/Visualization: PyTorch, TensorFlow, NumPy, Pandas, Scikit-learn, SciPy, OpenCV, Matplotlib, RAG, Langchain, CV, Vector Databases, Statistical Analysis
- Databases/Cloud/Monitoring: MongoDB, MySQL, PostgreSQL, Docker, Firebase, GCP, Vercel, Prometheus, Grafana, Elasticsearch
- Tools/Productivity: Git, GitHub, Postman, Cypress, Mocha, Streamlit, Figma, LaTeX, Excel, Notion
Now Page Content (home "Now" section)
Last updated: February 2026
Work & Projects:
- Currently working as Software Developer at Eurobliz
- Built Portfolio V2 — migrated from Next.js to SvelteKit
Learning & Philosophy:
- Exploring AI Engineering (AI as productivity multiplier)
- Focus on fundamentals, problem-solving, understanding systems deeply
Hobbies & Interests:
- Design & visual thinking
- Learning Spanish (Duolingo)
- Video editing (DaVinci Resolve)
About Page Content
Headline: "Nice to meet you. I'm Kushagra."
Bio paragraphs (4+ paragraphs):
1. "I'm a Developer & AI Enthusiast who enjoys combining technology with everything around it..."
2. "Currently, I work as a Software Developer at Eurobliz..."
3. "I'm naturally curious. I like knowing how things work..."
4. "Outside of code, I'm drawn to design and art..."
5. "I build like a one-person team by leveraging AI as a productivity multiplier..."
Experiences (3 internships):
- Software Development Intern at Eurobliz (Jan 2026 — Current)
- Full Stack Development Intern at Dobby Ads (May 2025 — July 2025)
- Android Development Intern at Vedic Bodhi Technologies Pvt Ltd (May 2024 — July 2024)
Education:
- Computer Science & Engineering, JK Lakshmipat University (Expected 2026, GPA 7.6/10)
- Semester Exchange at IIT Gandhinagar (December 2023)
- Semester Exchange at IIIT Hyderabad (Monsoon 2025, GPA 7.3/10)
Skills (from data/index.ts):
- Languages & Core: Python, C++, Java, JavaScript, Bash
- Frontend: HTML, CSS, React, React Hook Form, TanStack, Axios, Zod, Zustand
- Backend & APIs: Node.js, FastAPI, REST APIs, JWT Authentication, SQLAlchemy, Alembic, Pydantic, Uvicorn (ASGI)
- Data ML And Visualization: PyTorch, TensorFlow, NumPy, Pandas, Scikit-learn, SciPy, OpenCV, Matplotlib, RAG, Langchain, CV, Vector Databases, Statistical Analysis
- Databases Cloud And Monitoring: MongoDB, MySQL, PostgreSQL, Docker, Firebase, GCP, Vercel, Prometheus, Grafana, Elasticsearch
- Tools And Productivity: Git, GitHub, Postman, Cypress, Mocha, Streamlit, Figma, LaTeX, Microsoft Excel, Notion
Articles (Blog)
Only 1 article currently:
"Why I Switched to SvelteKit" (slug: why-i-switched-to-sveltekit)
- Date: Feb 28, 2026
- Read time: 5 min read
- Excerpt: "A practical guide to migrating from Next.js to SvelteKit, and why it might be the right move for your next project."
- Image: /svelte_switch.png
- Full content: Detailed migration story across 4 frameworks (Next.js → TanStack Start → Astro → SvelteKit)
Metadata
SEO Title (home /): "Kushagra Gupta | Developer & AI Enthusiast"
SEO Description (home): "Portfolio of Kushagra Gupta - Developer & AI Enthusiast. Explore my work, projects, and journey in software development and artificial intelligence."
Per-page SEO:
- /about: Title "About | Kushagra Gupta", description "Learn more about Kushagra Gupta, a Developer and AI Enthusiast."
- /work: Title "Work & Projects | Kushagra Gupta", description "A collection of projects and work by Kushagra Gupta - Developer & AI Enthusiast."
- /blogs: Title "Blogs | Kushagra Gupta", description "Thoughts, tutorials, and insights by Kushagra Gupta - Developer & AI Enthusiast."
- /blog/[slug]: Title "{blog.title} | Kushagra Gupta", meta description = blog.excerpt, og:title, og:description, og:image, twitter:card, twitter:title, twitter:description, twitter:image
- /resume: No specific meta (just PDF link)
OpenGraph (all pages):
- og:type: "website"
- og:url: current page URL
- og:title: page-specific or site title
- og:description: page-specific or site description
- og:image: {page.url.origin}/logo.png
- og:type: "article" for blog posts
Twitter Cards:
- twitter:card: "summary_large_image"
- twitter:url: current page URL
- twitter:title: page title
- twitter:description: page description
- twitter:image: logo.png
Footer Text: 
"Coded in Visual Studio Code by yours truly. Built with SvelteKit and Tailwind CSS, deployed with Vercel. Interested in working together? Feel free to reach out on LinkedIn or email."
Additional Content
Quote (from data/index.ts): "Experiences are what that makes you, You."
Email: kggupta.work@gmail.com
Resume: PDF at /Kushagra_Gupta_updated_Resume.pdf
Now section last updated: "February 2026"
Part 10 — Projects
All 8 projects from work.ts:
1. SME AI Agent
- Description: Production-grade RAG system with 95%+ retrieval consistency using Elasticsearch and FAISS. Designed a FastAPI-based server with async pipelines achieving <800ms latency.
- Problem: Need for consistent, low-latency retrieval in production RAG systems
- Solution: FastAPI server with async pipelines, Elasticsearch + FAISS for retrieval
- Tech Stack: RAG, LangChain, Elasticsearch, Docker, FastAPI
- GitHub: https://github.com/SpyBeast07/sme-rag-agent
- Live Demo: Not listed (no demoLink)
- Images: None (image field empty)
- Categories: Artificial Intelligence
- Tags: RAG, LangChain, Elasticsearch, Docker, FastAPI
- Status: Not specified
- Featured: Not explicitly marked (all appear in main listing)
2. Legal Redline Sandbox
- Description: Advanced to the Top 90 teams globally in a GenAI hackathon. Spearheaded Google Cloud infrastructure (CloudSQL, Docker) and implemented an async notification system for real-time contract analysis.
- Problem: Need for real-time contract analysis in GenAI hackathon
- Solution: Google Cloud infrastructure (CloudSQL, Docker), async notification system
- Tech Stack: Python, FastAPI, React.js, Google Cloud, Gemini API
- GitHub: https://github.com/IshitaAgarwal05/Legal_Redline_Sandbox
- Live Demo: Not listed
- Images: None
- Categories: Artificial Intelligence
- Tags: Python, FastAPI, React.js, Google Cloud, Gemini API
- Status: Not specified
- Featured: Listed in main projects
3. Multilingual Language Model
- Description: Trained an 18.5M parameter transformer on 400M tokens. Implemented SentencePiece tokenizer and Fine-tuned Gemma-270M with LoRA. Built custom data pipelines for cleaning and segmentation.
- Problem: Need for multilingual LLM training with efficient tokenizer and fine-tuning
- Solution: 18.5M parameter transformer, SentencePiece tokenizer, Gemma-270M LoRA fine-tuning, custom data pipelines
- Tech Stack: PyTorch, LoRA, Multilingual, LLMs
- GitHub: https://github.com/SpyBeast07/Multilingual-LM
- Live Demo: Not listed
- Images: None
- Categories: Research
- Tags: PyTorch, LoRA, Multilingual, LLMs
- Status: Not specified
- Featured: Listed in main projects
4. Byte-Latent Transformer
- Description: Developed a novel BLT model in PyTorch matching character-level baselines but with a 91% reduction in sequence length. Analyzed performance trade-offs vs standard tokenization.
- Problem: Efficient tokenization reducing sequence length while maintaining performance
- Solution: Novel BLT model in PyTorch with 91% sequence length reduction
- Tech Stack: PyTorch, NLP, Transformers, Research
- GitHub: https://github.com/SpyBeast07/BLT_vs_traditional
- Live Demo: Not listed
- Images: None
- Categories: Research
- Tags: PyTorch, NLP, Transformers, Research
- Status: Not specified
- Featured: Listed in main projects
5. ALPR System
- Description: End-to-end ALPR pipeline using a custom 5-layer CNN (71.48% IoU) and EasyOCR. Optimized for real-time inference with TTA. Trained on a curated dataset of ~9,600 images.
- Problem: Automated license plate recognition
- Solution: 5-layer CNN with EasyOCR, TTA optimization, 9,600 image dataset
- Tech Stack: Computer Vision, PyTorch, EasyOCR, CNN
- GitHub: https://github.com/SpyBeast07/ALPR-CNN-EasyOCR
- Live Demo: Not listed
- Images: None
- Categories: Artificial Intelligence
- Tags: Computer Vision, PyTorch, EasyOCR, CNN
- Status: Not specified
- Featured: Listed in main projects
6. E-Waste Management Analysis
- Description: Analyzed 15+ datasets on e-waste from emerging and developed economies using Python and statistical methods. Proposed scalable, data-driven waste reduction strategies.
- Problem: E-waste analysis across economies
- Solution: Python statistical analysis, 15+ datasets, proposed reduction strategies
- Tech Stack: Python, Statistical Analysis, Research
- GitHub: https://github.com/SpyBeast07/E-waste_research_paper_analysis
- Live Demo: Not listed
- Images: None
- Categories: Research
- Tags: Python, Statistical Analysis, Research
- Status: Not specified
- Featured: Listed in main projects
7. Malware Detection AI
- Description: Engineered a machine learning-based malware classifier achieving over 90% detection accuracy. Utilized Wireshark and Docker to analyze network packets for malicious patterns.
- Problem: Malware detection from network packets
- Solution: ML classifier >90% accuracy, Wireshark packet analysis, Docker
- Tech Stack: AI, Machine Learning, Wireshark, Docker
- GitHub: https://github.com/SpyBeast07/ML-Based-Intrusion-Detection
- Live Demo: Not listed
- Images: None
- Categories: Research
- Tags: AI, Machine Learning, Wireshark, Docker
- Status: Not specified
- Featured: Listed in main projects
8. Spardha Website
- Description: Collaborated to develop the official Spardha website. Built responsive UI with 5+ interactive features; deployed via Vercel with optimized load time under 2s.
- Problem: Need for official Spardha website
- Solution: Responsive UI with 5+ interactive features, Vercel deployment
- Tech Stack: HTML, CSS, JavaScript, Frontend
- GitHub: https://github.com/SpyBeast07/Spardha_Website_25
- Live Demo: https://spardha-jklu.vercel.app
- Images: None (image field empty)
- Categories: Web Development
- Tags: HTML, CSS, JavaScript, Frontend
- Status: Not specified
- Featured: Listed in main projects (only Web Dev category)
Part 11 — Blog
Blog Articles
Only 1 article currently:
"Why I Switched to SvelteKit"
- Slug: why-i-switched-to-sveltekit
- Title: Why I Switched to SvelteKit
- Category: (implicitly under "Writing" / general)
- Reading Time: 5 min read
- Topics: Framework migration, Next.js, TanStack Start, Astro, SvelteKit, performance, developer experience
- Summary: Personal journey migrating portfolio across 4 frameworks (Next.js → TanStack Start → Astro → SvelteKit), lessons learned about tradeoffs, choosing the right tool for the job
- Structure: 
- Phase 1: Starting with Next.js
- Realization: The Hidden Tradeoff
- Phase 2: Experimenting with TanStack Start
- Phase 3: Moving to Astro
- Phase 4: Discovering SvelteKit
- Framework Comparison Summary table
- Why I Chose SvelteKit
- What This Journey Taught Me
- Final Reflection
- Internal Links: 
- State of JS 2025 links (Front-end Frameworks, Meta Frameworks)
- Context7 reference
- Various framework documentation
Part 12 — UX Analysis
User Journey
Typical visitor flow:
1. Landing on home (/): Sees hero with name/role, "Now" section, latest blogs, quick project preview
2. Explores projects: Clicks "Work" navbar → Projects page with category filtering
3. Learns about person: Clicks "About" → Biography, experience, education timeline
4. Reads blog: Clicks "Blogs" → Sees list, clicks article → Detail page with TOC and contact form
5. Gets in touch: Uses contact form in blog footer or "View Resume" button
6. Leaves: Clicks social links (GitHub, LinkedIn, Email) or closes tab
Reading flow on blog:
1. See blog card on listing page
2. Click "Read Article →"
3. Fade-in entrance with progress bar
4. Scroll with sticky sidebar TOC
5. Read content, expand stories if interested
6. Contact author via form or navigate back
Reading Order (Home)
1. Hero name/role (first glance)
2. "What I'm Doing Now" section
3. Latest Writing (2 blog excerpts)
4. Projects section (if scrolled)
5. Footer social links
Attention Flow (Home)
- High: Hero name/role (large, animated)
- High: Floating logo (motion)
- Medium: "Now" section (3-column layout)
- Medium: Latest blog cards (2 cards)
- Lower: Projects grid (requires scrolling)
- Lower: Footer (last view)
CTA Hierarchy
Primary CTAs:
1. "View Resume" (About page, home section)
2. "Read Article →" (BlogItem, Blogs section)
3. "View More Blogs" (if >2 blogs)
Secondary CTAs:
1. Category filter buttons (Work page)
2. ProjectCard GitHub/Live Demo buttons
3. "← Back to Blogs" (blog detail)
4. Social link hover states
Tertiary:
1. Now section external links
2. Skill tag hover states
3. Form interactions
Information Architecture
Navigation Structure:
- Top-level: Home, About, Work, Blogs (persistent header)
- Deep: Individual blog posts (/blog/[slug])
- Utility: Resume PDF (/resume)
Page Hierarchy:
/
├── /about (depth 1)
│   ├── Experience timeline (depth 2)
│   ├── Education timeline (depth 2)
│   └── Social/resume CTA (depth 2)
├── /work (depth 1)
│   ├── Category filters (depth 2)
│   ├── Project cards (depth 2)
│   ├── Skills category pills (depth 2)
│   └── GitHub stats (depth 2)
├── /blogs (depth 1)
│   ├── Blog listing cards (depth 2)
│   └── Individual posts /blog/[slug] (depth 2)
│       ├── TOC sidebar (depth 3)
│       ├── Author card (depth 3)
│       └── Contact form (depth 3)
└── /resume (depth 1)
Navigation Logic
Navbar:
- Floating mode: Active item based on exact pathname match
- Sidebar mode: Active based on scroll position (IntersectionObserver)
- Clicking item: Smooth scroll to section, or navigate to new page
- Mobile: Sidebar mode activates
Category Filters (Work page):
- Buttons filter projects by category
- "All" shows everything
- Clicking same category toggles off (shows all)
- URL doesn't change on filter (state managed in component)
Blog Navigation:
- "← Back to Blogs" returns to /blogs
- TOC links scroll within same page
- External links open in new tab (target="_blank")
Now Section Links:
- External article links open in new tab
- "Read story ↓" expands within same page
Content Strategy
Personal Brand Positioning:
- "Developer & AI Enthusiast" - clear dual identity
- Focus on migration/learning journey shows growth mindset
- Emphasis on fundamentals + AI productivity
- One-person team philosophy with AI multiplier
Conversion Points:
- Resume download (About page + footer)
- GitHub profile visits (footer + project cards)
- LinkedIn connections (footer + about page social)
- Email inquiries (blog contact form, footer email)
- "View Resume" clicks
Content Organization:
- Chronological timelines for experience/education
- Category-based project filtering
- Reverse-chronological blog listing
- "Now" section for current focus
Conversion Strategy
1. Resume CTA: About page + home page → PDF download → potential applicant tracking system entry
2. GitHub navigation: Project cards → profile visits → portfolio verification
3. Email sign-up: Blog contact form → direct communication → potential opportunities
4. Social proof: LinkedIn/GitHub follower potential from social links
5. Discoverability: Blog content SEO attracts organic traffic for migration/technical topics
Part 13 — Technical Analysis
Framework
SvelteKit (current framework)
- File-based routing (src/routes/+page.svelte, src/routes/blog/[slug]/+page.svelte)
- Server-side rendering with optional static generation
- Svelte 5 reactivity (though this appears to use Svelte 4 syntax with $state, $derived)
- +layout.svelte for shared layout, +page.svelte for page content
Routing:
- File-based in src/routes/
- Dynamic routes: [slug] for blog posts
- +page.ts for data loading (blog detail)
- +layout.svelte not explicitly shown but implied by structure
Rendering Strategy:
- SSR (Server-Side Rendering) via SvelteKit
- +page.svelte runs on both server and client
- +page.ts load function fetches data server-side
- PageLoader only on first visit (visitCount++ === 0)
Static or SSR:
- Hybrid: Static generation where possible (blogs, about), dynamic where needed
- Image optimization via Tailwind loading="lazy" and native loading attribute
- SvelteKit's  hk$page.url for dynamic routes
Image Optimization:
- loading="lazy" on all images
- loading="lazy" on cover images
- Tailwind responsive image classes
- No explicit next/image or vite-img (using standard <img>)
- Fallback gradient banners when no image present
Markdown/MDX:
- Blog content stored as HTML strings in blogs.ts
- Auto-generated TOC from heading parsing in +page.ts
- @html content rendering in BlogContent.svelte
- No direct Markdown usage - content pre-formatted as HTML
CMS:
- No CMS - content hardcoded in src/lib/data/ TypeScript files
- Blogs edited by modifying blogs.ts array
- About/work data in respective .ts files
- No headless CMS (Contentful, Sanity, etc.)
Analytics:
- No explicit analytics observed in code
- Possibly Vercel/Plausible implied by deployment
- No tracking scripts in observed source
Performance:
- prefers-color-scheme for theme detection
- localStorage theme persistence
- loading="lazy" on images
- PageLoader only on first visit
- Svelte motion animations (svelte-motion library)
- Tailwind CSS with JIT
Caching:
- localStorage for theme preference
- No explicit HTTP caching headers observed
- SvelteKit default caching
Lazy Loading:
- All images have loading="lazy"
- Blog cover images lazy load
- Project images (though currently empty in data)
Code Splitting:
- SvelteKit automatic code splitting per route
- Components imported lazily where appropriate
- svelte-motion for animations
Part 14 — Accessibility
ARIA:
- aria-label on social links (GitHub, LinkedIn, Email)
- aria-label="Article body" on .prose div
- aria-label="Article sidebar" on blog sidebar
- aria-live="polite" on sent notice in contact form
- role="status" on sent notice
Semantic HTML:
- <header>, <main>, <footer> elements used appropriately
- <h1>-<h3> hierarchy maintained (blog H1, section headings)
- <article> tag for blog posts
- <section> for page sections
- <nav> for navigation areas
- <div> used broadly but with appropriate class names
- <table> with role="table" implicit, th/td semantic
Contrast:
- Color-mix with oklab for sufficient contrast ratios
- color-mix(in oklab, var(--foreground) 70%, transparent) for secondary text
- color-mix(in oklab, var(--foreground) 50%, transparent) for tertiary text
- White-on-dark and dark-on-white combinations tested
Keyboard Navigation:
- Tab order through all interactive elements
- Focus styles via Tailwind (though not explicitly seen in all components)
- Form inputs focus/blur event handlers
- Escape key not observed for modals/menus
Focus States:
- onmouseenter/onmouseleave for most interactive elements
- No explicit :focus styles observed in component code
- Tailwind focus: variants may be in global CSS
- Button hover states visible, focus states inferred
Alt Text:
- Most images have alt attributes
- Profile photo: alt="Kushagra"
- Blog images: alt={title} (from blog data)
- Logos: alt="Logo" or empty where decorative
- Skill tags: no alt (text-only)
- Tags/spans: no alt needed
Screen Reader Support:
- Text content is readable and hierarchical
- Social links have aria-label
- Form fields have associated labels
- TOC links have descriptive text
- Expandable stories have "Read story" button text
Part 15 — Performance
Largest Images
Home Page:
- Logo: /logo.png (small, likely <50KB)
- No other large images above the fold
About Page:
- Profile photo /about.jpg - portrait, likely moderate size
- University logos (/jklu.jpg, /iitgn.png, /iiith.jpg)
Blog Posts:
- Cover images: /svelte_switch.png and potentially others
- All have loading="lazy" and size constraints (h-[40vh] min-h-[300px])
Projects:
- All project images currently empty/undefined in data
Heavy Components
Navbar:
- IntersectionObserver for scroll spy
- Motion animations using svelte-motion
- Fixed positioning, minimal impact
Blog Post Detail:
- TOC observer (IntersectionObserver)
- Progress bar tracking
- Sidebar sticky positioning
- JSON-LD generation in svelte:head
- @html content rendering (prose styles)
ProjectGrid/Work Page:
- Category filter re-renders
- AnimatedCounter motion values
- GithubStats component (may make API call)
Loading Strategy
PageLoader:
- Only visible on first visit (visitCount++ === 0)
- 900ms minimum wait + document.readyState check
- Then hides, content becomes visible
Hydration:
- SvelteKit default hydration strategy
- isLoading state only for first visit
- Subsequent visits load directly
Bundle Optimization
SvelteKit defaults:
- Route-level code splitting
- Only visited CSS/JS loaded
- svelte-motion for animations (relatively lightweight)
Tailwind CSS:
- JIT compilation
- Only used classes generated (purge enabled)
- Custom color values via color-mix may increase CSS size
Possible Bottlenecks
1. Svelte motion animations: Multiple useTransform calls on every scroll event
2. IntersectionObservers: Multiple observers on blog post detail (TOC + spy)
3. @html content rendering: Prose styles with global selectors could be heavy
4. GithubStats: May fetch from GitHub API (though could be static)
5. No image optimization: No next/image or similar - raw file sizes
6. Multiple useViewportScroll: Used on both home and blog layouts
Part 16 — Mobile Experience
Responsive Layouts
Breakpoints:
- md: min-width 768px (tablet)
- lg: min-width 1024px (desktop)
- xl: min-width 1280px (large desktop)
Home Page Mobile:
- Hero: Name text size adjusts (text-[18vw] mobile vs text-[14vw] desktop)
- Logo: still floating, scaled appropriately
- "Now" section: 1 column, full width
- Blogs section: 1 column, shows 1-2 blogs
- Navbar: Transformed for mobile (hidden md:block elements show/hide)
- Sidebar: mode="sidebar" activates on mobile
About Page Mobile:
- Profile photo: stacks below text (not floated right)
- Timeline: vertical stack, full width
- No 2-column layout
Work/Projects Mobile:
- Category filter: scrollable horizontal buttons
- Project grid: 1 column layout
- Skills: 1 column grid (single column on mobile)
- All padding/margin adjusts (px-6 → px-6 md:px-16)
Blog Mobile:
- Sidebar: hidden md:block - hidden on mobile
- Main content: full width, adjusted padding (padding-top: 5.5rem)
- Cover image: full width, responsive height (h-[40vh] → clamps)
- TOC: hidden, no sticky sidebar
- Progress bar: still visible
Resume Page:
- PDF link, mobile-compatible
Mobile Navigation
Navbar on mobile:
- Floating mode with reduced items
- Or sidebar mode activated
- Mobile name displays differently (hidden on desktop, visible on mobile)
- Scroll indicator still functions
Sidebar Mode (on Navbar):
- Full-height vertical navigation
- Active item highlighting
- Smooth link clicks with scroll
Mobile Menu (not explicitly present, but implied):
- The mode="sidebar" prop on Navbar component
- Hidden on desktop (hidden md:block patterns)
Touch Interactions
Hover states → Touch-friendly on mobile:
- onmouseenter/onmouseleave events
- These also fire on touch for many elements
- Some elements may have different touch behavior
Button sizes:
- ProjectCard buttons: px-4 py-2 (small) and px-6 py-2.5 (min-375px)
- CustomButton: px-6 py-3
- Form inputs: reasonable padding
- Touch targets may be slightly small for some buttons
Spacing
Mobile spacing adjustments:
- pb-6 → pb-8 at md+
- mb-24 → mb-32 at lg+
- px-6 → px-16 at md+
- gap-4 → gap-6 at md+ in some contexts
- grid grid-cols-1 becomes md:grid-cols-2 etc.
Typography Mobile
- clamp() functions ensure readable sizes
- text-[14vw] → more reasonable sizes on narrow screens
- text-[18vw] for mobile hero
- Playfair Display size adjustments via clamp
Component Changes Mobile
ProjectCard: 
- md:flex-row-reverse reverses image/text order
- min-[375px]:px-6 py-2.5 larger touch targets
- 1 column grid always
BlogLayout:
- Sidebar hidden md:block - completely hidden on mobile
- Main content takes full width
- sm:-mt-24 md:-mt-32 lg:-mt-48 adjusts negative margin
NowSection:
- Always 1 column on mobile
- Links to external articles work fine
Skills Section:
- 1 column grid on mobile
- md:grid-cols-2 on desktop
Category Filters:
- Scrollable horizontal on mobile
- overflow-x-auto overscroll-x-contain
Part 17 — Personal Brand
Positioning
Tagline/One-liner: "Developer & AI Enthusiast"  
Primary identity: Full-stack developer with AI focus  
Secondary identity: Builder, migrator, learner, explorer  
Target Audience
Recruiters/hiring managers: Looking for full-stack developers with AI interest, migration experience  
Peers/developers: Interested in framework comparisons, SvelteKit, technical writing  
Students/learners: Following the journey, learning from migration stories  
Collaborators: Looking for AI/Full-stack project partners  
Personality
From the content:
- Curious: "naturally curious", "usually the person Googling everything new I hear"
- Thoughtful: Reflects on tradeoffs, writes detailed migration stories
- Principled: "I still focus on fundamentals, problem-solving, and understanding systems deeply"
- Independent: "I build like a one-person team"
- AI-positive: Uses AI as "productivity multiplier," not replacement
- Design-aware: "drawn to design and art in any form"
- Spanish learner: Shows human side beyond code
Tone
Writing style (from blog and about):
- Reflective: Examines decisions, thoughtfully analyzes tradeoffs
- Personal: First-person narratives, "my portfolio," "I migrated"
- Technical but accessible: Explains framework concepts without being overly academic
- Honest: Admits failures/migrations, "was a major challenge," "ecosystem still evolving"
- Educational: Shares lessons learned ("no framework is perfect," "every tool has tradeoffs")
- Calm/confident: "calm, confident" (from about design guidelines)
- Professional: Well-structured, clear headings, organized content
Developer Identity
What's emphasized:
- Framework migration experience (4 frameworks in portfolio's history)
- SvelteKit advocacy (current favorite)
- AI engineering focus (current work at Eurobliz, AI Enthusiast identity)
- Full-stack capabilities (frontend + backend + AI/ML)
- Clean code philosophy ("readable, maintainable code")
- One-person team with AI multiplier
- Continuous learner mindset
Strengths emphasized:
- Adaptability (migrated 4 frameworks)
- Deep understanding of tradeoffs
- Clean code maintainability
- AI productiveness without sacrificing fundamentals
- Full-stack range (frontend, backend, ML, devops)
- Writing/communication skills (blog posts)
Weaknesses (inferred, not explicitly stated):
- May have "imposter syndrome" from frequent migrations (joking/serious)
- Past framework choices may not be current best
- Limited design showcase beyond personal brand
Unique Selling Points
1. Migration authority: Having tried and compared 4 major frameworks gives unique perspective
2. AI + Full-stack: Dual identity as developer AND AI enthusiast
3. SvelteKit expertise: Deep knowledge after evaluating multiple options
4. Writing technical topics: Ability to explain complex decisions clearly
5. AI-enhanced development: Productivity philosophy that resonates with modern teams
Brand Voice Summary
If this were a person: Thoughtful friend who's tried everything in tech, learned from mistakes, now sings SvelteKit's praises while acknowledging everyone's journey is different. Helpful, experienced, not dogmatic.
Key differentiator: Framework-agnostic wisdom gained from multiple migrations, rather than dogmatic preference for one technology.
Part 18 — Missing Opportunities
Potential Missing Pages
1. Case studies for major projects - detailed case study pages for SME AI Agent, Legal Redline Sandbox etc.
2. Case studies for client work beyond the listed projects
3. Contact page with contact form (currently only email link and blog contact form)
4. Privacy policy / Terms of service (especially with contact form and EU considerations)
5. CV/Resume page (separate from PDF download, HTML-rendered resume)
6. Now page as separate route (/now) - currently only on home
Potential Missing Information
1. Client testimonials or feedback on projects
2. Detailed case studies with problem/solution/results framework for each project
3. Speaking/conference engagements if any
4. Open source contributions beyond GitHub stats
5. Newsletter signup or mailing list
6. Project filters with more categories (currently only 3: AI, Web Dev, Research)
Potential Missing CTAs
1. Newsletter signup CTA (not present anywhere)
2. Hire me or "Available for work" CTA (subtle, only in about footer)
3. Book a call or "Let's work together" CTA
4. Download CV as alternative to PDF resume
5. Follow on Twitter/X (not in social links - only GitHub, LinkedIn, Email)
6. RSS feed for blog posts (not observed)
Potential Missing SEO Pages
1. Blog archive page - filtering by year, tag, category
2. Tag pages - /tag/[tag] for each skill/tag
3. Author page - /author/kushagra (though single author)
4. 404 page - custom error page (only +error.svelte observed)
5. Sitemap - automatic sitemap.xml (SvelteKit generates but not customized)
6. Robots.txt - observed in static folder
Potential Missing Technical Showcases
1. Deployment showcase - how projects are deployed (Vercel, custom)
2. API demonstrations - live API endpoints for projects
3. Interactive demos within the portfolio (code sandboxes, etc.)
4. Performance metrics for projects (currently only ALPR mentions 71.48% IoU, others have metrics)
5. Tech radar - visual representation of tech stack familiarity
6. Contribution graph beyond the basic GithubStats
Potential Missing Social Proof
1. Client logos or employer branding
2. Awards or recognitions (hackathon results mentioned but not prominently displayed)
3. Media mentions or press coverage
4. Certifications (formal credentials)
5. Testimonials from managers or peers
6. Leaderboard or ranking mentions (State of JS references, hackathon Top 90)
Part 19 — Folder Structure
src/
├── app.html              - HTML template
├── app.css               - Global styles
├── app.d.ts              - Type declarations
├── routes/               - SvelteKit file-based routing
│   ├── +layout.svelte    - Root layout (implied, shared components)
│   ├── +page.svelte      - Home page
│   ├── +page.ts          - Home page data (if needed)  
│   ├── about/
│   │   └── +page.svelte  - About page
│   ├── work/
│   │   └── +page.svelte  - Projects page
│   ├── blog/
│   │   └── [slug]/       - Dynamic blog post routes
│   │       ├── +page.ts  - Blog data loading + TOC generation
│   │       └── +page.svelte - Blog post detail
│   ├── blogs/            - Blog listing page
│   │   └── +page.svelte
│   └── resume/           - Resume page
│       └── +page.svelte
├── lib/
│   ├── data/             - Site data (about, work, blogs, now)
│   ├── stores/           - Theme store
│   ├── components/       - Reusable components
│   │   ├── layout/       - Navbar, Footer, VerticalEmail
│   │   ├── home/         - Hero, NowSection, BlogsSection
│   │   ├── shared/       - ProjectCard, BlogItem, TimelineItem, etc.
│   │   └── ui/           - CustomButton, AnimatedCounter, icons
│   └── actions/          - inView action
├── static/
│   ├── images/           - Profile, logos, blog covers
│   ├── favicon.svg
│   ├── robots.txt
│   └── resume PDF
├── vite.config.ts        - Vite configuration
├── svelte.config.js      - SvelteKit config
├── tailwind.config.js    - Tailwind config (likely)
└── package.json          - Dependencies
Part 20 — Final Documentation
1. Site Map
/
├── /home          (Home)
│   ├── Hero section
│   ├── "What I'm Doing Now"
│   ├── Latest Writing (2 blogs)
│   └── Projects preview
├── /about         (About)
│   ├── headline + photo
│   ├── 4 bio paragraphs
│   ├── 3 experiences (timeline)
│   ├── 3 education entries (timeline with exchanges)
│   ├── skills (categories)
│   ├── social links (GitHub, LinkedIn, Email)
│   └── Resume CTA
├── /work          (Work/Projects)
│   ├── Category filters (All/AI/Web Dev/Research)
│   ├── 8 project cards
│   ├── Skills category pills
│   └── GitHub contribution chart
├── /blogs         (Blogs listing)
│   ├── 1 blog card (Why I Switched to SvelteKit)
│   └── "View More Blogs" CTA
├── /blog/[slug]   (Blog post detail - dynamic)
│   ├── Cover image
│   ├── Article with TOC sidebar
│   ├── Author card
│   └── Contact form
├── /now           (Now section - on home only)
│   ├── Work & Projects
│   ├── Learning & Philosophy
│   └── Hobbies & Interests
└── /resume        (Resume PDF)
2. Component Map
Layout Components:
- Navbar (floating/sidebar modes)
- Footer (social links, copyright)
- VerticalEmail (background decoration)
- PageLoader (loading screen)
Home Page Components:
- HeroTitle (animated name)
- HeroLogo (floating logo)
- NowSection + NowSectionItem
- BlogsSection + BlogItem
Work/Projects Components:
- ProjectCard (individual projects)
- Category filter buttons
- Skills category display
Blog Components:
- BlogLayout (wrapper with sidebar)
- BlogCoverImage
- BlogSidebar (TOC + author)
- BlogAuthorCard
- BlogContent (prose-rendered)
- BlogMeta
- BlogFooterContact (contact form)
- BlogItem (listing card)
Shared Components:
- ProjectCard (project display)
- TimelineItem (experience/education)
- PageHeading (title + description)
- SectionHeading (section header)
- ExpandableStory (collapsible content)
- GithubStats (contribution chart)
- SocialPill (social link pills)
- CustomButton (action button)
- Input (form inputs)
- Tag (pill tags)
- Avatar (user image)
- PdfViewer (resume display - implied)
UI Components:
- CustomButton
- AnimatedCounter
- ThemeBulb (implied theme toggle)
- Icons (12 icons in ui/icons/)
3. Content Map
Home Page Content:
- Name: "Kushagra Gupta"
- Role: "Developer & AI Enthusiast"
- Logo: /logo.png
- "Now" section last updated: Feb 2026
- 3 "Now" categories with items
- 2 latest blog excerpts
- Project counter: ${projects.length}+
About Page Content:
- Headline: "Nice to meet you. I'm Kushagra."
- Photo: /about.jpg
- 4 bio paragraphs
- 3 work experiences with stories
- 3 education entries (with exchange programs)
- Skills categories with tag lists
- Social: GitHub, LinkedIn, Email
- Resume PDF download
Work/Projects Content:
- Project count counter
- 4 category filter buttons
- 8 projects with descriptions, tags, GitHub/demo links
- Skills: 6 categories with pill tags
- GitHub stats/contribution chart
Blogs Content:
- Blog listing: 1 card (Why I Switched to SvelteKit)
- Excerpt meta: date, read time, title, excerpt
- Placeholder: "Thoughtful essays coming soon..."
- "View More Blogs" CTA
Blog Post Detail Content:
- Title: from blog data
- Excerpt/intro paragraph
- Full HTML content (prose-styled)
- Cover image at top
- Auto-generated TOC
- Author card (Kushagra Gupta)
- Reading progress bar
- Contact form at bottom
- "← Back to Blogs" link
Data Files (src/lib/data/):
- index.ts: navItems, sideNavItems, role, email, quote, socialLinks, re-exports
- about.ts: headline, long bio, experiences[], education[], skills{}
- work.ts: projects[], pageHeadings, skills{}, projectCategories[]
- blogs.ts: blogs[] array with 1 entry (Why I Switched to SvelteKit)
- now.ts: lastUpdated, 3-section now content
4. Design System Summary
Typography:
- Playfair Display for all headings (display serif)
- Outfit for body text (sans-serif)
- Monospace for code (Fira Code/JetBrains/Mono)
- Clamp() functions for responsive sizes
- Various text weights (300-900)
- Line-heights: relaxed, tight, snug
Color System:
- var(--background): Light page background
- var(--foreground): Darker text
- Color-mix with oklab for all subtle variations
- Yellow/orange accents for highlights
- Transparent overlays via color-mix
Spacing & Grid:
- Mobile-first responsive grid
- 1 column mobile, 2+ columns desktop
- Gap utilities: gap-4, gap-6, gap-8, gap-12
- Max-width containers: max-w-4xl
- Padding: px-6 (desktop), md:px-16
Border Radius:
- rounded-sm, rounded, rounded-lg, rounded-3xl, rounded-full
- rounded-2xl for avatars
- rounded-2rem for card containers
Shadows:
- shadow-xl on project cards (or border-only)
- ring-1 ring-black/5 backdrop-blur-xl on blog content card
- Suble shadow-sm on profile photos
Animations & Interactions:
- transition-all duration-300 as default
- transition-colors, transition-transform
- Svelte fade (350ms), slide transitions
- useTransform scroll animations
- IntersectionObserver for spy highlights
- Smooth scroll on link clicks
5. UX Summary
User journeys cover: landing → exploring → learning → contacting
Reading flow is intuitive with progress bar and TOC
Attention flow prioritizes hero name and "Now" section
CTA hierarchy: Resume > Blog articles > Social links
Information architecture is clean with 5 top-level pages
Navigation logic is consistent (pathname match for active, scroll spy for sidebar)
Content strategy emphasizes personal brand, migration journey, AI focus
Conversion strategy has 5 clear points: resume download, GitHub visits, email, LinkedIn, blog discovery
6. Technical Summary
Framework: SvelteKit with file-based routing
Routing: File-based in src/routes/, dynamic [slug] for blogs
Rendering: SSR with SvelteKit, hybrid static/dynamic
Image optimization: loading="lazy" on all images, no CDN optimization
SEO: Meta tags in svelte:head, Open Graph, Twitter cards, JSON-LD for blogs
Markdown/MDX: HTML strings in data, no direct Markdown usage
CMS: None - all content in TypeScript files
Analytics: Not implemented (or implied by Vercel)
Performance: PageLoader only on first visit, lazy images, code-split routes
Caching: localStorage theme persistence
Lazy loading: All images, progressive reveal
7. Brand Summary
Positioning: "Developer & AI Enthusiast" - clear dual identity  
Target audience: Recruiters, developers, students, collaborators  
Personality: Curious, thoughtful, principled, independent, AI-positive  
Tone: Reflective, personal, technical-but-accessible, honest, educational, calm/confident  
Developer identity: Framework migration authority, SvelteKit advocate, full-stack with AI focus  
Strengths: Adaptability, deep tradeoff understanding, clean code, AI productivity, writing skills  
Unique selling points: 4-framework migration journey, AI+Full-stack duality, SvelteKit expertise, technical writing ability  
Brand voice: Thoughtful friend who's tried it all, learned from migrations, now advocates SvelteKit but remains framework-agnostic  
Documentation complete. This comprehensive reverse engineering covers all 20 parts, documenting the entire portfolio website structure, components, design system, content, technical implementation, and brand positioning in enough detail for another developer to rebuild it.