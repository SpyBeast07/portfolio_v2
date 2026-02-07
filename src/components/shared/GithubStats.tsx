
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function GithubStats() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div
                className="mt-12 rounded-lg p-6 overflow-hidden min-h-[180px] animate-pulse"
                style={{
                    backgroundColor: "color-mix(in oklab, var(--background) 85%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--foreground) 30%, transparent)",
                }}
            />
        );
    }

    return (
        <div
            className="mt-12 rounded-lg p-6 overflow-hidden"
            style={{
                backgroundColor:
                    "color-mix(in oklab, var(--background) 85%, transparent)",
                border:
                    "1px solid color-mix(in oklab, var(--foreground) 30%, transparent)",
            }}
        >
            <div className="flex justify-between items-center mb-6">
                <h4
                    className="text-sm font-bold"
                    style={{
                        color: "color-mix(in oklab, var(--foreground) 70%, transparent)",
                    }}
                >
                    GitHub Contributions
                </h4>
                <a
                    href="https://github.com/SpyBeast07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs hover:underline"
                    style={{
                        color: "color-mix(in oklab, var(--foreground) 50%, transparent)",
                    }}
                >
                    @SpyBeast07
                </a>
            </div>

            <div className="flex justify-center w-full overflow-x-auto">
                <GitHubCalendar
                    username="SpyBeast07"
                    colorScheme={theme === "dark" ? "dark" : "light"}
                    fontSize={12}
                    blockSize={12}
                    blockMargin={4}
                    style={{
                        color: "var(--foreground)",
                    }}
                    theme={{
                        light: ["#f0f0f0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                        dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                    }}
                />
            </div>
        </div>
    );
}
