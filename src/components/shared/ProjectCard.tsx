
// Next imports removed
import { ExternalLinkIcon, GithubIcon } from "@/components/ui/Icons";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    githubLink?: string;
    demoLink?: string;
}

export const ProjectCard = ({ title, description, tags, image, githubLink, demoLink }: ProjectCardProps) => (
    <div
        className="group relative rounded-3xl transition-all overflow-hidden flex flex-col md:flex-row-reverse h-full"
        style={{
            backgroundColor: "color-mix(in oklab, var(--background) 85%, transparent)",
            border: "1px solid color-mix(in oklab, var(--foreground) 30%, transparent)",
        }}
    >
        {/* Project Image */}
        {image && (
            <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
                <div className="relative w-full h-48 md:h-full min-h-[200px] rounded-3xl overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </div>
        )}

        <div className="p-6 flex flex-col flex-1">
            <h3
                className="text-xl font-bold font-playfair mb-2"
                style={{ color: "var(--foreground)" }}
            >
                {title}
            </h3>
            <p
                className="text-sm leading-relaxed mb-4 flex-1"
                style={{ color: "color-mix(in oklab, var(--foreground) 70%, transparent)" }}
            >
                {description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
                {tags.map(tag => (
                    <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full"
                        style={{
                            color: "color-mix(in oklab, var(--foreground) 70%, transparent)",
                            backgroundColor: "color-mix(in oklab, var(--foreground) 5%, transparent)",
                            border: "1px solid color-mix(in oklab, var(--foreground) 10%, transparent)"
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Action Buttons */}
            <div
                className="flex items-center gap-4 mt-auto pt-4"
                style={{
                    borderTop: "1px solid color-mix(in oklab, var(--foreground) 10%, transparent)"
                }}
            >
                {githubLink && (
                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
                        style={{
                            color: "var(--foreground)",
                            backgroundColor: "color-mix(in oklab, var(--foreground) 5%, transparent)",
                            border: "1px solid color-mix(in oklab, var(--foreground) 10%, transparent)"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "color-mix(in oklab, var(--foreground) 10%, transparent)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "color-mix(in oklab, var(--foreground) 5%, transparent)";
                        }}
                    >
                        <GithubIcon width={14} height={14} />
                        GitHub
                    </a>
                )}
                {demoLink && (
                    <a
                        href={demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
                        style={{
                            color: "var(--background)",
                            backgroundColor: "var(--foreground)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = "0.9";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = "1";
                        }}
                    >
                        Live Demo
                        <ExternalLinkIcon width={14} height={14} />
                    </a>
                )}
            </div>
        </div>
    </div>
);
