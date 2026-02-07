
import { useState } from "react";
import PageHeading from "@/components/shared/PageHeading";
import { pageHeadings, projects, skills, projectCategories } from "@/data";
import Navbar from "@/components/layout/Navbar";
import { ProjectCard } from "@/components/shared/ProjectCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GithubStats from "@/components/shared/GithubStats";

export default function WorkContent() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = projects.filter((project) => {
        if (activeCategory === "All") return true;
        return project.category === activeCategory;
    });

    return (
        <main className="min-h-screen bg-background text-foreground relative selection:bg-yellow-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none bg-grid-pattern z-0 opacity-40" />
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)] z-0" />

            <div className="relative z-10 container mx-auto px-6 py-24 max-w-4xl">
                <div className="mb-12">
                    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
                        <Navbar mode="floating" />
                    </div>
                    <div className="mt-24">
                        <PageHeading
                            title={pageHeadings.work.title}
                            description={
                                <p
                                    className="text-4xl font-bold font-playfair"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    <AnimatedCounter value={projects.length} />+{" "}
                                    <span
                                        className="text-2xl font-normal font-sans"
                                        style={{
                                            color: "color-mix(in oklab, var(--foreground) 60%, transparent)",
                                        }}
                                    >
                                        projects and counting...
                                    </span>
                                </p>
                            }
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex overflow-x-auto pb-4 gap-4 mb-12 scrollbar-none snap-x snap-mandatory touch-pan-x overscroll-x-contain">
                    {projectCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex-shrink-0 snap-center ${activeCategory === category
                                ? "bg-foreground text-background border-foreground"
                                : "bg-transparent text-foreground/70 border-foreground/10 hover:border-foreground/30 hover:text-foreground"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.title}
                            {...project}
                        />
                    ))}
                </div>

                {/* Skills Section */}
                <div className="mb-24 mt-24">
                    <PageHeading
                        title="My Technical Playground"
                        description={<p>Things I’ve built with and experimented on.</p>}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries(skills).map(([category, items]) => (
                            <div key={category}>
                                <h5 className="text-xl font-medium mb-4 capitalize" style={{ color: "var(--foreground)" }}>
                                    {category.replace(/([A-Z])/g, " $1").trim()}
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 rounded-full text-sm border transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                            style={{
                                                color: "color-mix(in oklab, var(--foreground) 80%, transparent)",
                                                borderColor: "color-mix(in oklab, var(--foreground) 10%, transparent)",
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* GitHub Contribution Chart */}
                <h2
                    className="font-playfair text-5xl font-bold mb-12 mt-24"
                    style={{ color: "var(--foreground)" }}
                >
                    Github Stats
                </h2>
                <GithubStats />
            </div>
        </main>
    );
}
