// ─── Work / Projects Page ─────────────────────────────────────────────────────
// Edit this file to add, remove, or update projects on the Work page.

export interface Project {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    githubLink?: string;
    demoLink?: string;
    category: "Artificial Intelligence" | "Web Development" | "Research";
}

export const projectCategories = ["All", "Artificial Intelligence", "Web Development", "Research"];

export const projects: Project[] = [
    {
        title: "SME AI Agent",
        description: "Production-grade RAG system with 95%+ retrieval consistency using Elasticsearch and FAISS. Designed a FastAPI-based server with async pipelines achieving <800ms latency.",
        tags: ["RAG", "LangChain", "Elasticsearch", "Docker", "FastAPI"],
        image: "",
        githubLink: "https://github.com/SpyBeast07/sme-rag-agent",
        category: "Artificial Intelligence",
    },
    {
        title: "Legal Redline Sandbox",
        description: "Advanced to the Top 90 teams globally in a GenAI hackathon. Spearheaded Google Cloud infrastructure (CloudSQL, Docker) and implemented an async notification system for real-time contract analysis.",
        tags: ["Python", "FastAPI", "React.js", "Google Cloud", "Gemini API"],
        image: "",
        githubLink: "https://github.com/IshitaAgarwal05/Legal_Redline_Sandbox",
        demoLink: "https://legal-redline-ai.vercel.app",
        category: "Artificial Intelligence",
    },
    {
        title: "Multilingual Language Model",
        description: "Trained an 18.5M parameter transformer on 400M tokens. Implemented SentencePiece tokenizer and Fine-tuned Gemma-270M with LoRA. Built custom data pipelines for cleaning and segmentation.",
        tags: ["PyTorch", "LoRA", "Multilingual", "LLMs"],
        image: "",
        githubLink: "https://github.com/SpyBeast07/Multilingual-LM",
        category: "Artificial Intelligence",
    },
    {
        title: "Byte-Latent Transformer",
        description: "Developed a novel BLT model in PyTorch matching character-level baselines but with a 91% reduction in sequence length. Analyzed performance trade-offs vs standard tokenization.",
        tags: ["PyTorch", "NLP", "Transformers", "Research"],
        image: "",
        githubLink: "https://github.com/SpyBeast07/BLT_vs_traditional",
        category: "Research",
    },
    {
        title: "ALPR System",
        description: "End-to-end ALPR pipeline using a custom 5-layer CNN (71.48% IoU) and EasyOCR. Optimized for real-time inference with TTA. Trained on a curated dataset of ~9,600 images.",
        tags: ["Computer Vision", "PyTorch", "EasyOCR", "CNN"],
        image: "",
        githubLink: "https://github.com/SpyBeast07/ALPR-CNN-EasyOCR",
        category: "Artificial Intelligence",
    },
    {
        title: "E-Waste Management Analysis",
        description: "Analyzed 15+ datasets on e-waste from emerging and developed economies using Python and statistical methods. Proposed scalable, data-driven waste reduction strategies.",
        tags: ["Python", "Statistical Analysis", "Research"],
        image: "",
        githubLink: "https://github.com/SpyBeast07/E-waste_research_paper_analysis",
        category: "Research",
    },
    {
        title: "Malware Detection AI",
        description: "Engineered a machine learning-based malware classifier achieving over 90% detection accuracy. Utilized Wireshark and Docker to analyze network packets for malicious patterns.",
        tags: ["AI", "Machine Learning", "Wireshark", "Docker"],
        image: "",
        githubLink: "https://github.com/SpyBeast07/ML-Based-Intrusion-Detection",
        category: "Research",
    },
    {
        title: "Spardha Website",
        description: "Collaborated to develop the official Spardha website. Built responsive UI with 5+ interactive features; deployed via Vercel with optimized load time under 2s.",
        tags: ["HTML", "CSS", "JavaScript", "Frontend"],
        image: "",
        githubLink: "https://github.com/SpyBeast07/Spardha_Website_25",
        demoLink: "https://spardha-jklu.vercel.app",
        category: "Web Development",
    },
    {
        title: "LILCO STEM Augmented Reality Studio",
        description: "Streaming platform and repository for STEM Education resources with browser-based WebAR experience. Features real-time camera-based image tracking powered by MindAR and Three.js, curriculum-aligned STEM modules, interactive 2D video & 3D GLTF model overlays, and Capacitor 7 native mobile wrapper for Android/iOS.",
        tags: ["React 18", "Vite 5", "MindAR", "Three.js", "Capacitor 7", "WebGL", "WebAR", "GLTFLoader"],
        image: "",
        githubLink: "https://github.com/SpyBeast07/lilco-ar",
        demoLink: "https://lilco-ar.vercel.app",
        category: "Web Development",
    },
    {
        title: "Tarkify Platform",
        description: "Full-stack business automation platform with production-grade checkout and entitlement delivery for digital products using Razorpay. Built SvelteKit frontend on Vercel, Hono/Bun backend with PostgreSQL in Docker, Cloudflare Tunnel for secure VPS deployment, and automated migrations. Marketing site for an experimental business venture — didn't achieve commercial traction but delivered a robust, production-ready system with secure payment flows, entitlement management, and zero-touch deployments.",
        tags: ["SvelteKit 5", "Hono", "Bun", "PostgreSQL", "Docker", "Razorpay", "Cloudflare Tunnel", "Vercel", "Tailwind CSS v4"],
        image: "",
        githubLink: "https://github.com/SpyBeast07/tarkify",
        demoLink: "https://tarkify.qzz.io",
        category: "Web Development",
    },
    {
        title: "DueDesk",
        description: "Premium financial tracking and automated reminder system for treasury and asset management — first commercial client project. Tracks Bank Guarantees, Fixed Deposits, Treasury Securities, and Insurance Policies with unified document management, occurrence-based Email/WhatsApp alerts, and bank limit monitoring. Built with Svelte 5 (Runes), Supabase Edge Functions (Deno), PostgreSQL with strict Row Level Security, and private Supabase Storage. Zero direct database access from client — all operations proxied via secure Edge Functions.",
        tags: ["Svelte 5", "Supabase", "Edge Functions", "Deno", "PostgreSQL", "Row Level Security", "TailwindCSS", "WhatsApp API"],
        image: "",
        demoLink: "https://due-desk.vercel.app",
        category: "Web Development",
    },
];

// ─── Page Headings ────────────────────────────────────────────────────────────
// Used by the /work and /blogs listing pages. Lives here so projects.length
// is available without any cross-file imports.

export const pageHeadings = {
    work: {
        title: "Projects",
        description: `${projects.length}+ projects built across web, AI, and tooling`,
    },
    blogs: {
        title: "Writing",
        description: "Thoughts on software engineering, design systems, and the future of AI.",
    },
};

