import type { ReactNode } from "react";

interface PageHeadingProps {
    title: string;
    description: ReactNode;
}

export default function PageHeading({ title, description }: PageHeadingProps) {
    return (
        <div className="mb-12">
            <h1
                className="font-playfair text-5xl font-bold mb-6"
                style={{ color: "var(--foreground)" }}
            >
                {title}
            </h1>
            <div
                className="max-w-2xl text-lg font-outfit leading-relaxed"
                style={{ color: "color-mix(in oklab, var(--foreground) 70%, transparent)" }}
            >
                {description}
            </div>
        </div>
    );
}
