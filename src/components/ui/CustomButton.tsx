
// Next imports removed
import type { ReactNode } from "react";

interface CustomButtonProps {
    href: string;
    children: ReactNode;
    className?: string;
}

export default function CustomButton({ href, children, className = "" }: CustomButtonProps) {
    return (
        <a
            href={href}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${className}`}
            style={{
                color: "var(--foreground)",
                border: "1px solid color-mix(in oklab, var(--foreground) 15%, transparent)",
                backgroundColor: "color-mix(in oklab, var(--background) 85%, transparent)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "color-mix(in oklab, var(--foreground) 8%, var(--background))";
                e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "color-mix(in oklab, var(--background) 85%, transparent)";
                e.currentTarget.style.transform = "scale(1)";
            }}
        >
            {children}
        </a>
    );
}
