// ─── Common / Shared Data ─────────────────────────────────────────────────────
// This file holds site-wide constants shared across all pages (nav, socials,
// identity, resume link). Page-specific data lives in its own file:
//
//   now.ts    → "Now" section on the home page
//   about.ts  → About page (bio, experiences, education, skills)
//   work.ts   → Work page (projects, categories, pageHeadings)
//   blogs.ts  → Blog posts (add new posts here)
//
// All existing imports like `import { blogs } from '$lib/data'` still work
// because every domain export is re-exported at the bottom of this file.

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Blogs", href: "/blogs" },
];

export const sideNavItems = [
    { name: "Home", href: "#" },
    { name: "Now", href: "#now" },
    { name: "Blogs", href: "#blogs" },
];

// ─── Identity ─────────────────────────────────────────────────────────────────

export const role = {
    line1: "Developer &",
    line2: "AI Enthusiast",
};

export const email = "kggupta.work@gmail.com";

export const quote = "Experiences are what that makes you, You.";

export const resume = {
    url: "/Kushagra_Gupta_updated_Resume.pdf",
    filename: "Kushagra_Gupta_Resume.pdf",
};

// ─── Social Links ─────────────────────────────────────────────────────────────

export interface SocialLink {
    label: string;
    href: string;
}

export const socialLinks: SocialLink[] = [
    {
        label: "GitHub",
        href: "https://github.com/SpyBeast07",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/spybeast07/",
    },
    {
        label: "Email",
        href: "mailto:kggupta.work@gmail.com",
    },
];

// ─── Re-exports ───────────────────────────────────────────────────────────────

export * from './now';
export * from './about';
export * from './work';
export * from './blogs';
