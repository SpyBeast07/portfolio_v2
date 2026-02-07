
// Next imports removed

interface BlogItemProps {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    readTime: string;
    image?: string;
    showImage?: boolean;
}

export const BlogItem = ({ title, excerpt, date, slug, readTime, image, showImage = true }: BlogItemProps) => (
    <a
        href={slug}
        className="group flex flex-col md:flex-row-reverse gap-6 mb-12 items-center cursor-pointer p-4 rounded-xl transition-colors -mx-4"
        onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "color-mix(in oklab, var(--foreground) 5%, transparent)";
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
        }}
    >
        {/* Blog Image */}
        {showImage && image && (
            <div
                className="w-full md:w-48 h-32 relative flex-shrink-0 overflow-hidden rounded-lg"
                style={{
                    backgroundColor: "color-mix(in oklab, var(--foreground) 5%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--foreground) 10%, transparent)",
                }}
            >
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
            <div
                className="flex items-center gap-3 text-xs font-mono mb-2 uppercase tracking-wide"
                style={{ color: "color-mix(in oklab, var(--foreground) 50%, transparent)" }}
            >
                <span>{date}</span>
                <span>•</span>
                <span>{readTime}</span>
            </div>

            <h3
                className="text-xl font-bold transition-colors font-playfair mb-3 leading-tight"
                style={{ color: "var(--foreground)" }}
            >
                {title}
            </h3>

            <p
                className="text-sm leading-relaxed mb-4 line-clamp-3"
                style={{ color: "color-mix(in oklab, var(--foreground) 70%, transparent)" }}
            >
                {excerpt}
            </p>

            <div
                className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
                style={{ color: "var(--foreground)" }}
            >
                Read Article <span className="text-yellow-600 dark:text-yellow-500">→</span>
            </div>
        </div>
    </a>
);
