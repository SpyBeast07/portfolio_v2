// ─── Blogs ────────────────────────────────────────────────────────────────────
// Add new blog posts here. Each entry needs:
//   - title:    displayed as the H1 on the detail page
//   - excerpt:  italic sub-heading shown below the title
//   - date:     e.g. "Feb 2026"
//   - readTime: e.g. "5 min read"
//   - slug:     URL segment — must be unique, e.g. "my-blog-post"
//   - image:    optional, path relative to /static, e.g. "/my-image.png"
//   - content:  full article as an HTML string (rendered with {@html})
//
// To add a new post, copy the object below, fill in all fields, and append it
// to the blogs array. Place the cover image in /static and reference it here.

export interface Blog {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    slug: string;
    image?: string;
    content: string; // HTML string
}

export const blogs: Blog[] = [
    {
        title: "Why I Switched to SvelteKit",
        excerpt: "A practical guide to migrating from Next.js to SvelteKit, and why it might be the right move for your next project.",
        date: "Feb 28, 2026",
        readTime: "5 min read",
        slug: "why-i-switched-to-sveltekit",
        image: "/svelte_switch.webp",
        content: `
  <p>
    Choosing a tech stack feels easy at first. You pick what’s popular, what everyone recommends, and what trends suggest is “the best.” But real understanding only comes after building, breaking, migrating, and rebuilding again.
  </p>

  <blockquote>
    This is the story of how my portfolio evolved across multiple frameworks—and what each migration taught me.
  </blockquote>

  <hr />

  <h2>Phase 1 — Starting with Next.js (The Obvious Choice)</h2>

  <p>
    When I began building my portfolio, I chose <strong>Next.js with React</strong>. The decision felt obvious because everything pointed toward it.
  </p>

  <ul>
    <li>GPT strongly recommended it as the best modern stack</li>
    <li>Developers widely trusted it</li>
    <li>It had built-in routing, SSR, static generation, and optimization</li>
    <li>It provided excellent SEO capabilities</li>
    <li>It dominated industry trend reports like:</li>
  </ul>

  <ul>
    <li>
      <a href="https://2025.stateofjs.com/en-US/libraries/front-end-frameworks/#front_end_frameworks_ratios" target="_blank" style="color:#facc15;">
        State of JS 2025 — Front-end Frameworks
      </a>
    </li>
    <li>
      <a href="https://2025.stateofjs.com/en-US/libraries/meta-frameworks/#meta_frameworks_ratios" target="_blank" style="color:#facc15;">
        State of JS 2025 — Meta Frameworks
      </a>
    </li>
  </ul>

  <p>
    It seemed like the safest and smartest decision.
  </p>

  <blockquote>
    When both AI and industry trends agree, it feels impossible to go wrong.
  </blockquote>

  <p>
    And initially, it worked perfectly.
  </p>

  <hr />

  <h2>Realization — The Hidden Tradeoff</h2>

  <p>
    As I gained more experience, I started noticing something important.
  </p>

  <ul>
    <li>Many advanced features were optimized specifically for Vercel</li>
    <li>Some functionality required extra setup outside the Vercel ecosystem</li>
    <li>Platform independence became an important factor</li>
  </ul>

  <p>
    Next.js was powerful—but it made me realize something deeper:
  </p>

  <blockquote>
    Convenience and flexibility are not always the same thing.
  </blockquote>

  <p>
    That realization pushed me to explore other rising frameworks.
  </p>

  <hr />

  <h2>Phase 2 — Experimenting with TanStack Start</h2>

  <p>
    I was already using:
  </p>

  <ul>
    <li>TanStack Query</li>
    <li>TanStack Router</li>
  </ul>

  <p>
    Their design philosophy impressed me. They were:
  </p>

  <ul>
    <li>Simple</li>
    <li>Explicit</li>
    <li>Flexible</li>
    <li>Developer-focused</li>
  </ul>

  <p>
    So I migrated my portfolio to <strong>TanStack Start</strong>.
  </p>

  <p>
    Using Context7 files, I provided structured context to AI and migrated most of the project successfully.
  </p>

  <p>
    But deployment became a major challenge:
  </p>

  <ul>
    <li>Complex setup and configuration</li>
    <li>Deployment instability</li>
    <li>Ecosystem still evolving</li>
    <li>Time spent fixing infrastructure instead of building features</li>
  </ul>

  <blockquote>
    Promising frameworks are exciting—but ecosystem maturity matters.
  </blockquote>

  <p>
    I had invested too much progress to risk losing it.
  </p>

  <hr />

  <h2>Phase 3 — Moving to Astro (Performance-Focused)</h2>

  <p>
    Astro looked extremely promising, especially for performance and content.
  </p>

  <p><strong>What worked well:</strong></p>

  <ul>
    <li>Clean and structured architecture</li>
    <li>Excellent content rendering</li>
    <li>Minimal JavaScript by default</li>
    <li>Great developer experience</li>
  </ul>

  <p>
    But my portfolio wasn’t just content—it was animation-heavy.
  </p>

  <p><strong>Problems I encountered:</strong></p>

  <ul>
    <li>Animations didn’t feel smooth</li>
    <li>Interactions felt slower than expected</li>
    <li>Required extra setup for dynamic behavior</li>
  </ul>

  <blockquote>
    Astro excels at content—but my portfolio needed interaction.
  </blockquote>

  <p>
    Astro was great—but not the right fit for my specific use case.
  </p>

  <hr />

  <h2>Phase 4 — Discovering SvelteKit (The Turning Point)</h2>

  <p>
    That’s when I discovered <strong>SvelteKit</strong>.
  </p>

  <p>
    Immediately, several things stood out:
  </p>

  <ul>
    <li>Clean and intuitive file-based routing</li>
    <li>Minimal boilerplate</li>
    <li>Excellent performance</li>
    <li>Simple and readable architecture</li>
    <li>Strong flexibility and independence</li>
  </ul>

  <p>
    I migrated my portfolio again.
  </p>

  <p>
    The only challenge was animations.
  </p>

  <ul>
    <li>Svelte uses its own animation system</li>
    <li>Framer Motion wasn’t directly compatible</li>
    <li>I had to rebuild animations using Svelte motion libraries</li>
  </ul>

  <p>
    It required effort—but the results were worth it.
  </p>

  <blockquote>
    Once rebuilt, everything became faster, cleaner, and easier to maintain.
  </blockquote>

  <hr />

  <h2>Framework Comparison Summary</h2>

  <table>
    <thead>
      <tr>
        <th>Framework</th>
        <th>Strength</th>
        <th>Challenge</th>
        <th>Key Lesson</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Next.js</td>
        <td>Powerful, popular, SEO friendly</td>
        <td>Platform optimization dependency</td>
        <td>Popularity ≠ perfect fit</td>
      </tr>
      <tr>
        <td>TanStack Start</td>
        <td>Flexible, modern architecture</td>
        <td>Ecosystem maturity, deployment issues</td>
        <td>Maturity matters</td>
      </tr>
      <tr>
        <td>Astro</td>
        <td>Excellent for static content</td>
        <td>Not ideal for heavy interaction</td>
        <td>Use tools for the right purpose</td>
      </tr>
      <tr>
        <td>SvelteKit</td>
        <td>Fast, clean, flexible, stable</td>
        <td>Rebuilding animations required effort</td>
        <td>Simplicity improves long-term productivity</td>
      </tr>
    </tbody>
  </table>

  <hr />

  <h2>Why I Chose SvelteKit</h2>

  <p>
    SvelteKit gave me something that other frameworks didn’t fully provide:
  </p>

  <ul>
    <li>Clean architecture</li>
    <li>Excellent performance</li>
    <li>Platform independence</li>
    <li>Minimal maintenance overhead</li>
    <li>Long-term stability</li>
  </ul>

  <blockquote>
    It allowed me to focus on building—not maintaining the framework.
  </blockquote>

  <hr />

  <h2>What This Journey Taught Me</h2>

  <p>
    This journey was frustrating at times.
  </p>

  <p>
    Migrating multiple times meant:
  </p>

  <ul>
    <li>Rewriting code</li>
    <li>Fixing deployment issues</li>
    <li>Rebuilding animations</li>
    <li>Learning new architectures</li>
  </ul>

  <p>
    But it also taught me lessons that no tutorial could:
  </p>

  <ul>
    <li>No framework is perfect</li>
    <li>Every tool has tradeoffs</li>
    <li>Trends should guide—not decide—your choices</li>
    <li>Real learning comes from experience</li>
  </ul>

  <blockquote>
    The migrations weren’t setbacks. They were the learning process.
  </blockquote>

  <hr />

  <h2>Final Reflection</h2>

  <p>
    Looking back, each framework taught me something valuable:
  </p>

  <ul>
    <li>Next.js taught me modern architecture</li>
    <li>TanStack taught me flexibility</li>
    <li>Astro taught me performance design</li>
    <li>SvelteKit taught me simplicity and control</li>
  </ul>

  <p>
    Frameworks evolve. Trends change.
  </p>

  <p>
    But the experience gained from building, migrating, and understanding systems—that stays forever.
  </p>

  <blockquote>
    In the end, the best framework isn’t the most popular one.
    It’s the one that lets you build with confidence.
  </blockquote>
`,
    },
];
