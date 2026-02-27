// ─── About Page ───────────────────────────────────────────────────────────────
// Edit this file to update the About page content:
//   - about:       bio paragraphs and headline
//   - experiences: work history cards
//   - education:   degree and semester exchange entries
//   - skills:      skill category lists

// About Section
// A. One-liner identity (calm, confident)
// B. What you work on right now
// C. How you think & build
// D. Curiosity & learning style
// E. Outside-of-code personality (short)
// F. Your AI philosophy line (keep this!)

export const about = {
    headline: "Nice to meet you. I'm Kushagra.",
    photo: "/about.jpg",
    long: [
        "I'm a Developer & AI Enthusiast who enjoys combining technology with everything around it. I'm curious about how modern problems can be solved using today's tools — sometimes inspired by ideas and transitions that happened long before our time, when new technologies reshaped the world in similar ways.",
        "Currently, I work as a Software Developer at Eurobliz, where I focus on full-stack development and integrating AI into production systems. I care deeply about writing clean, readable, and maintainable code — the kind that still makes sense when someone else reads it months later. I believe good systems should last, not just work.",
        `I'm naturally curious. I like knowing how things work, and I'm usually the person Googling everything new I hear. That said, I'm also aware of how easy it is to become lazy in the age of AI — doing things faster without fully understanding them, or skipping the "why" altogether. I try to stay conscious of that and keep learning intentionally, even when shortcuts are tempting.`,
        "Outside of code, I'm drawn to design and art in any form — paintings, sculptures, photography, anything that reflects structure or expression. I enjoy learning from different cultures and experiences; recently, that even meant trying to learn Spanish, just out of curiosity. I also love traveling, exploring new ideas, and collecting experiences — because in the end, experiences are what shape who you become.",
        // Star line!! Do not remove it.
        "I build like a one-person team by leveraging AI as a productivity multiplier.\nAI doesn't replace learning for me — it reduces manual overhead, just as calculators enhanced mathematics rather than ending it.\nI still focus on fundamentals, problem-solving, and understanding systems deeply."
    ],
};

export interface Experience {
    title: string;
    subtitle: string;
    date: string;
    location: string;
    type: string;
    description: string;
    story?: string;
    tags: string[];
}

export const experiences: Experience[] = [
    {
        title: "Software Development Intern",
        subtitle: "Eurobliz",
        date: "Jan 2026 — Current",
        location: "Remote",
        type: "Internship",
        description: "Learning to build production-grade systems with scalability, structure, and long-term maintainability in mind.",
        story: `Working at Eurobliz has been a deep dive into building scalable, production-ready web applications. My focus here has been on writing clean, maintainable code while understanding how different parts of a system interact — frontend, backend, APIs, and infrastructure.\n\nThis role is helping me shift from a "feature-first" mindset to a "system-first" mindset — thinking about scalability, performance, and long-term maintainability from the start. Being part of an evolving codebase has taught me how real-world software grows and adapts over time.`,
        tags: ["Frontend", "Backend", "API"],
    },
    {
        title: "Full Stack Development Intern",
        subtitle: "Dobby Ads",
        date: "May 2025 — July 2025",
        location: "Remote",
        type: "Internship",
        description: "My first end-to-end industry experience shipping, testing, and monitoring real production systems.",
        story: `At Dobby Ads, I worked as a Full Stack Development Intern where I built and deployed two complete MERN-based applications used internally. I was involved in designing scalable architecture, integrating APIs, and ensuring smooth data flow across the system.\n\nOne of the most impactful parts of this role was automated testing. I wrote and maintained 30+ Cypress test cases, which significantly reduced post-release bugs and improved confidence during deployments. I also implemented Prometheus and Grafana dashboards to monitor API performance in real time.\n\nThis internship taught me what "production-ready" truly means — writing code that is testable, observable, and reliable. It was my first exposure to real ownership in an industry environment.`,
        tags: ["MERN", "MongoDB", "Cypress", "Prometheus", "Grafana"],
    },
    {
        title: "Android Development Intern",
        subtitle: "Vedic Bodhi Technologies Pvt Ltd",
        date: "May 2024 — July 2024",
        location: "Remote",
        type: "Internship",
        description: "My introduction to production app development, APIs, and performance-focused mobile engineering.",
        story: "During my Android Development internship at Vedic Bodhi, I worked on implementing secure authentication using Firebase and integrating REST APIs for real-time data updates. I focused on optimizing API calls and improving UI responsiveness to enhance overall app performance.\n\nThis experience helped me understand mobile-specific challenges such as performance constraints, user experience, and handling real devices — not just emulators. It laid the foundation for how I think about frontend performance today, even outside mobile development.",
        tags: ["Android", "Kotlin", "Firebase", "REST APIs"],
    },
];

export interface Education {
    title: string;
    subtitle: string;
    date: string;
    cgpa?: string;
    description: string;
    related?: Education[];
    logo?: string;
    story?: string;
}

export const education: Education[] = [
    {
        title: "Computer Science & Engineering",
        subtitle: "JK Lakshmipat University, Jaipur",
        date: "Expected 2026",
        cgpa: "7.6/10",
        logo: "/jklu.jpg",
        description: "Where I built my foundations through hands-on learning, projects, and curiosity-driven exploration.",
        story: "I began my Computer Science journey at JK Lakshmipat University with a strong curiosity about how systems work under the hood. And yes — I chose B.Tech by my own choice…!!\n\nAfter not performing well in JEE, I found myself confused and unsure while searching for colleges. During that time, I came across JKLU, and what immediately caught my attention was its practical-first approach — learning through projects in almost every subject rather than just theory.\n\nAnother major factor that excited me was the semester exchange programs with IITs and IIITs. The idea that I could study at such institutes during my degree felt unreal at the time — honestly, like a dream. Along with that, the campus and the people felt welcoming, and I knew this was a place where I could grow, both academically and personally.\n\nI wasn't a hosteller, but it often felt like I was one. Whenever I could, I'd end up in a friend's room, and that's where some of the best memories were made. College events were fun on their own — but when they blended into hostel nights, the real magic happened. The fun didn't stop with the event; it carried on for days.\n\nCollege life has been amazing, and I'm grateful to have experienced it with such great friends — friendships that I still value and carry with me today.",
        related: [
            {
                title: "Semester Exchange Student",
                subtitle: "IIT, Gandhinagar",
                date: "December 2023",
                logo: "/iitgn.png",
                description: "Where learning felt alive — A semester that taught me freedom, exploration, and how vibrant campus life shapes learning beyond classrooms.",
                story: `Studying at IIT Gandhinagar was a completely new experience — the culture felt very different from anything I had seen before. I still remember my first day there and my reaction was simply "wowwwww". The campus was unbelievably beautiful — thoughtfully planned, well-made, and full of life.\n\nWhat stood out to me immediately was the freedom students had. There were no unnecessary restrictions and everyone seemed good at everything — academics, sports, fun, and just living life well. The academic load was definitely higher, but somehow the environment never felt dull. It always felt lively.\n\nThe professors there were exceptional — supportive, deeply knowledgeable, and amazing at teaching. Their style and clarity were on another level. I still remember attending lectures in classrooms as big as a theatre, with the professor teaching from a stage, looking almost tiny.\n\nOutside academics, sports became the highlight of my time there. The sports complex had facilities for almost every sport you could imagine. I tried rock climbing for the first time and even learned swimming in an Olympic-sized swimming pool. One of my closest friends there taught me how to swim — and watching him get frustrated every time I messed up was honestly part of the fun.\n\nThere was a building on campus where, from the top, you could see the entire campus, the Sabarmati river, and the stars at night. I loved going there. It was the perfect place to sit quietly, feel the breeze, and just pause for a moment. Getting to the top itself was a bit dangerous and a lot of effort — but that only made the view more rewarding.\n\nThe friend circle I found there made everything even better. Night cycle rides, learning to play the ukulele, roaming around the entire campus, randomly heading to Ahmedabad at 1 AM, playing sports, running around, laughing during lectures, attending events, celebrating festivals together, stealing each other's ice cream in the mess — all the classic college moments packed into a single semester.\n\nIt was an amazing experience — intense, fun, and unforgettable — even though it lasted for just one semester.`,
            },
            {
                title: "Semester Exchange Student",
                subtitle: "IIIT, Hyderabad",
                date: "Monsoon 2025",
                cgpa: "7.3/10",
                logo: "/iiith.jpg",
                description: "An academically intense environment that reshaped how I think about AI, learning, and long-term ambition.",
                story: "My semester at IIIT Hyderabad was a deliberate step outside my comfort zone. Known for its rigorous academic culture, IIIT-H challenged me to think deeper, move faster, and reason more precisely. Courses like Language Models and Agents, Information Retrieval, and Digital Image Processing reshaped how I think about AI — not as buzzwords, but as systems grounded in strong mathematical and computational foundations.\n\nThis experience refined the way I learn. I became more comfortable learning independently, questioning assumptions, and engaging with complex ideas at depth. For the first time, I began to understand how research actually works — how problems are framed, explored, and broken down, rather than just solved for marks.\n\nBeyond academics, this was also a phase of personal growth. I became more confident in communication, more aware of how important it is to build a strong profile, and more intentional about preparing for the industry. Being surrounded by students who were exceptionally strong academically — many of them top JEE rankers — set a new benchmark for me. The academic environment there is intense, and for good reason.\n\nEveryone says that passing at IIIT Hyderabad is hard — and it truly is. Balancing demanding coursework while exploring campus life wasn't easy, but I managed to get through it while still attending events, exploring the campus culture, and pushing myself beyond academics. This was also where I started going to the gym regularly for the first time — a small habit, but one that added structure and discipline to my daily routine.\n\nOne of the biggest realizations I took away from IIIT-H was how much strong fundamentals matter. I saw firsthand how deep knowledge of DSA, combined with early focused effort, opens doors to top opportunities — especially in large tech companies. It reinforced a lesson that stayed with me: dedication compounds. The effort you put in early shapes the ease of your path later.\n\nThis experience deeply motivated me. It showed me what consistent effort, clarity of goals, and the right environment can do. IIIT Hyderabad didn't just teach me subjects — it reshaped my mindset toward learning, growth, and long-term ambition.",
            },
        ]
    },
];

export const skills = {
    languagesAndCore: ["Python", "C++", "Java", "JavaScript", "Bash"],
    frontend: ["HTML", "CSS", "React", "React Hook Form", "TanStack", "Axios", "Zod", "Zustand"],
    backendAndAPIs: ["Node.js", "FastAPI", "REST APIs", "JWT Authentication", "SQLAlchemy", "Alembic", "Pydantic", "Uvicorn (ASGI)"],
    dataMLAndVisualization: ["PyTorch", "TensorFlow", "NumPy", "Pandas", "Scikit-learn", "SciPy", "OpenCV", "Matplotlib", "Retrieval-Augmented Generation (RAG)", "Langchain", "Computer Vision (CV)", "Vector Databases", "Statistical Analysis"],
    databasesCloudAndMonitoring: ["MongoDB", "MySQL", "PostgreSQL", "Docker", "Firebase", "Google Cloud Platform (GCP)", "Vercel", "Prometheus", "Grafana", "Elasticsearch"],
    toolsAndProductivity: ["Git", "GitHub", "Postman", "Cypress", "Mocha", "Streamlit", "Figma", "LaTeX", "Microsoft Excel", "Notion"],
};
