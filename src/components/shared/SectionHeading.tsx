import type { ReactNode } from "react";

interface SectionHeadingProps {
    children: ReactNode;
    className?: string;
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
    return (
        <h2
            className={`font-playfair text-3xl font-bold mb-8 ${className}`}
            style={{ color: "var(--foreground)" }}
        >
            {children}
        </h2>
    );
}
