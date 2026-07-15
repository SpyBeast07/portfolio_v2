# Kushagra Gupta — Personal Portfolio

> **Live at:** [kushagragupta.co.in](https://kushagragupta.co.in)

A fast, animated personal portfolio built with **SvelteKit 5**, **Tailwind CSS v4**, and **TypeScript**. It showcases my work, writing, experience, and story as a Developer & AI Enthusiast.

---

## ✨ Highlights

- **Animated hero** — scroll-driven name transform, logo fade, and parallax sidebar powered by `svelte-motion`
- **Smooth scrolling** — powered by `lenis` for a silky page feel
- **Dark / Light theme** — CSS variable-based theming with auto system preference detection
- **PDF Resume viewer** — rendered in-browser via `pdfjs-dist`
- **Responsive** — Fully optimized for mobile and desktop with a fixed sidebar layout on wider screens
- **Page sections** — Home (Now + Blogs), About, Work/Projects, Blogs listing, Resume
- **SEO-ready** — Open Graph and Twitter Card meta tags on every page

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [SvelteKit](https://kit.svelte.dev/) v2 (Svelte 5) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 via `@tailwindcss/vite` |
| Language | TypeScript |
| Build | Vite 7 |
| Animations | `svelte-motion`, CSS transitions |
| Scroll | `lenis` |
| PDF | `pdfjs-dist` |
| Linting | ESLint 9 + Prettier |
| Adapter | `@sveltejs/adapter-auto` |

---

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── home/       # HeroTitle, HeroLogo, NowSection, BlogsSection
│   │   ├── layout/     # Navbar, Footer, VerticalEmail
│   │   ├── shared/     # SocialPill, reusable UI
│   │   └── ui/         # PageLoader, icons, etc.
│   ├── data/
│   │   ├── index.ts    # Nav, identity, social links, resume — shared constants
│   │   ├── about.ts    # Bio, experiences, education, skills
│   │   ├── work.ts     # Projects list and categories
│   │   ├── now.ts      # "Now" section content
│   │   └── blogs.ts    # Blog posts
│   └── stores/
└── routes/
    ├── +page.svelte    # Home (animated hero, Now, Blogs)
    ├── about/          # About page
    ├── work/           # Projects page
    ├── blogs/          # Blogs listing
    ├── blog/           # Individual blog post
    └── resume/         # PDF resume viewer
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm (or pnpm / yarn)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/SpyBeast07/portfolio_v2.git
cd portfolio_v2

# Install dependencies
npm install

# Start the development server
npm run dev
# or open directly in browser
npm run dev -- --open
```

### Build for Production

```bash
npm run build

# Preview the production build locally
npm run preview
```

---

## 🗂 Content Management

All site content is co-located in `src/lib/data/`. No CMS required — just edit the TypeScript files:

| File | What to edit |
|---|---|
| `index.ts` | Name, role, email, quote, resume URL, social links, nav items |
| `about.ts` | Bio paragraphs, work experience, education, skills |
| `work.ts` | Projects (title, description, tags, GitHub/demo links, category) |
| `now.ts` | "What I'm doing right now" section |
| `blogs.ts` | Blog posts |

---

## 🎯 Featured Projects

| Project | Category | Stack |
|---|---|---|
| SME AI Agent | AI | RAG, LangChain, Elasticsearch, FastAPI, Docker |
| Legal Redline Sandbox | AI | Python, FastAPI, React, Google Cloud, Gemini API |
| Multilingual Language Model | AI | PyTorch, LoRA, SentencePiece |
| Byte-Latent Transformer | Research | PyTorch, NLP, Transformers |
| ALPR System | AI | Computer Vision, PyTorch, EasyOCR, CNN |
| Malware Detection AI | Research | ML, Wireshark, Docker |
| Spardha Website | Web | HTML, CSS, JavaScript |

---

## 🧑‍💼 About Me

I'm **Kushagra Gupta** — a Developer & AI Enthusiast currently working as a Software Development Intern at **Eurobliz**. I've done internships at Dobby Ads (MERN + Cypress + Prometheus/Grafana) and Vedic Bodhi (Android/Kotlin/Firebase), and I've had semester exchanges at **IIT Gandhinagar** and **IIIT Hyderabad**.

- 📧 [kggupta.work@gmail.com](mailto:kggupta.work@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/spybeast07/)
- 🐙 [GitHub](https://github.com/SpyBeast07)
- 🌐 [kushagragupta.co.in](https://kushagragupta.co.in)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
