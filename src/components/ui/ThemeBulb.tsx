
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeBulb() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // After mounting, we have access to the theme
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return null; // or a placeholder to avoid hydration mismatch
    }

    const isDark = resolvedTheme === "dark";

    const toggleTheme = () => {
        // Animate the pull
        const rope = document.getElementById("bulb-rope");
        if (rope) {
            rope.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateY(10px)' },
                { transform: 'translateY(0)' }
            ], {
                duration: 300,
                easing: 'ease-in-out'
            });
        }

        setTheme(isDark ? "light" : "dark");
    };

    return (
        <div className="fixed top-0 right-4 md:right-12 z-50 flex flex-col items-center scale-75 md:scale-100 origin-top-right">
            {/* Rope */}
            <div
                id="bulb-rope"
                className="flex flex-col items-center pointer-events-none transition-transform origin-top hover:translate-y-1"
            >
                {/* Rope Line */}
                <div className="w-[1px] h-30 md:h-20 bg-neutral-700 dark:bg-neutral-500 relative">
                    {/* Rope Texture (Simulated with dashes) */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(0,0,0,0.5)_50%,transparent_55%)] bg-[length:4px_4px]" />
                </div>

                {/* Socket */}
                <div className="w-4 h-6 bg-black dark:bg-neutral-800 rounded-sm -mt-0.5 shadow-sm border border-neutral-700 border-b-0" />

                {/* Bulb */}
                <div
                    onClick={toggleTheme}
                    className={`
                w-8 h-12 rounded-b-[50%] rounded-t-[40%] -mt-1 border border-black/20 dark:border-white/10 shadow-lg transition-all duration-300 cursor-pointer pointer-events-auto
                ${isDark ? 'bg-neutral-800 shadow-none' : 'bg-yellow-300 shadow-[0_0_30px_rgba(253,224,71,0.6)] animate-pulse'}
            `}
                >
                    {/* Filament (visible in on state or off state slightly) */}
                    <div className="w-full h-full relative opacity-50">
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-neutral-900/50" />
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-neutral-900/50" />
                    </div>
                </div>
            </div>
        </div>
    );
}
