
import { BriefcaseIcon, MapPinIcon } from "@/components/ui/Icons";
import type { Education } from "@/data";
import { useState } from "react";

interface TimelineItemProps {
    title: string;
    subtitle: string;
    date: string;
    description: string;
    tags?: string[];
    location?: string;
    type?: string;
    cgpa?: string;
    related?: Education[];
    logo?: string;
    story?: string;
}

const ExpandableStory = ({ description, story, className }: { description: string, story?: string, className?: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col items-start mb-4">
            <div
                className={className}
                style={{ color: "color-mix(in oklab, var(--foreground) 70%, transparent)" }}
                dangerouslySetInnerHTML={{ __html: description }}
            />
            {story && (
                <>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 mb-2 mt-2"

                    >
                        Read story <span className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>↓</span>
                    </button>
                    {isExpanded && (
                        <div
                            className={className}
                            style={{ color: "color-mix(in oklab, var(--foreground) 70%, transparent)" }}
                            dangerouslySetInnerHTML={{ __html: story }}
                        />
                    )}
                </>
            )}
        </div>
    );
};

// eslint-disable-next-line @next/next/no-img-element
export const TimelineItem = ({ title, subtitle, date, description, tags, location, type, cgpa, related, logo, story }: TimelineItemProps) => (
    <div
        className="relative pl-8 pb-12 last:pb-0"
        style={{
            borderLeft: "1px solid color-mix(in oklab, var(--foreground) 10%, transparent)",
        }}
    >
        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-yellow-500/50 ring-4 ring-neutral-900 dark:ring-neutral-900 ring-opacity-20" style={{ boxShadow: "0 0 0 4px var(--background)" }} />

        {/* Header with Logo */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-4">
            <div className="flex items-start gap-4">
                {logo && (
                    <img
                        src={logo}
                        alt={`${subtitle} logo`}
                        className="w-12 h-12 rounded-full object-cover border"
                        style={{
                            borderColor: "color-mix(in oklab, var(--foreground) 10%, transparent)"
                        }}
                    />
                )}
                <div className="flex-1">
                    <h3
                        className="text-lg font-bold font-playfair"
                        style={{ color: "var(--foreground)" }}
                    >
                        {title}
                    </h3>
                    <div className="text-sm font-medium text-purple-400 mb-1">{subtitle}</div>
                </div>
            </div>

            <span
                className="text-xs font-mono uppercase tracking-widest sm:text-right flex-shrink-0 mt-1"
                style={{ color: "color-mix(in oklab, var(--foreground) 60%, transparent)" }}
            >
                {date}
            </span>
        </div>

        {/* Meta Info: Location, Type, CGPA */}
        <div className="flex flex-wrap gap-4 mb-3 text-xs" style={{ color: "color-mix(in oklab, var(--foreground) 60%, transparent)" }}>
            {location && (
                <div className="flex items-center gap-1">
                    <MapPinIcon width={14} height={14} />
                    {location}
                </div>
            )}
            {type && (
                <div className="flex items-center gap-1">
                    <BriefcaseIcon width={14} height={14} />
                    {type}
                </div>
            )}
            {cgpa && (
                <div className="flex items-center gap-1 font-mono">
                    <span className="font-bold">GPA:</span> {cgpa}
                </div>
            )}
        </div>

        <ExpandableStory
            description={description}
            story={story}
            className="text-base leading-relaxed max-w-2xl whitespace-pre-line"
        />

        {tags && (
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full"
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
        )}

        {/* Nested Related Items */}
        {related && (
            <div className="mt-8 space-y-8">
                {related.map((item) => (
                    <div key={item.subtitle} className="relative pl-6 border-l border-dashed" style={{ borderColor: "color-mix(in oklab, var(--foreground) 20%, transparent)" }}>
                        <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "color-mix(in oklab, var(--foreground) 30%, transparent)" }} />

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-4">
                            <div className="flex items-start gap-3">
                                {item.logo && (
                                    <img
                                        src={item.logo}
                                        alt={`${item.subtitle} logo`}
                                        className="w-10 h-10 rounded-full object-cover border"
                                        style={{
                                            borderColor: "color-mix(in oklab, var(--foreground) 10%, transparent)"
                                        }}
                                    />
                                )}
                                <div>
                                    <h4 className="text-md font-bold font-playfair" style={{ color: "var(--foreground)" }}>
                                        {item.title}
                                    </h4>
                                    <div className="text-sm font-medium text-purple-400 mb-2">{item.subtitle}</div>
                                </div>
                            </div>
                            <span className="text-xs font-mono uppercase tracking-widest sm:text-right flex-shrink-0 mt-1" style={{ color: "color-mix(in oklab, var(--foreground) 60%, transparent)" }}>
                                {item.date}
                            </span>
                        </div>

                        {item.cgpa && (
                            <div className="text-xs font-mono mb-2" style={{ color: "color-mix(in oklab, var(--foreground) 60%, transparent)" }}>
                                <span className="font-bold">GPA:</span> {item.cgpa}
                            </div>
                        )}

                        <ExpandableStory
                            description={item.description}
                            story={item.story}
                            className="text-base max-w-3xl leading-relaxed whitespace-pre-line"
                        />
                    </div>
                ))}
            </div>
        )}
    </div>
);
