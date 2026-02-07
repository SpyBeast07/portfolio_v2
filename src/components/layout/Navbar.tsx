
import { useEffect, useState } from "react";
import {
    // ... icons
} from "@/components/ui/Icons";

import { navItems, sideNavItems } from "@/data";

export default function Navbar({ mode = "floating" }: { mode?: "floating" | "sidebar" }) {
    const [pathname, setPathname] = useState("");

    useEffect(() => {
        // Set initial path
        setPathname(window.location.pathname);

        // Listen for View Transition (Astro) navigation updates
        const handleNavigation = () => {
            setPathname(window.location.pathname);
        };

        document.addEventListener("astro:page-load", handleNavigation);
        window.addEventListener("popstate", handleNavigation);

        return () => {
            document.removeEventListener("astro:page-load", handleNavigation);
            window.removeEventListener("popstate", handleNavigation);
        };
    }, []);

    const [activeSection, setActiveSection] = useState("");

    // --- Active State Logic ---

    // Floating Mode: Active based on current route
    const navItemsWithActive = navItems.map(item => {
        const normalize = (path: string) => path === "/" ? "/" : path.replace(/\/+$/, "");
        const currentPath = normalize(pathname);
        const itemPath = normalize(item.href);

        return {
            ...item,
            active: pathname !== "" && (currentPath === itemPath)
        };
    });

    // Sidebar Mode: Active based on scroll position (Spy)
    useEffect(() => {
        if (mode !== "sidebar") return;

        // Small delay to ensure DOM is fully populated despite sync imports
        const timeoutId = setTimeout(() => {
            const sections = document.querySelectorAll("section[id]");
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(entry.target.id);
                        }
                    });
                },
                {
                    rootMargin: "-20% 0px -70% 0px", // Trigger when section is near top/center
                    threshold: 0,
                }
            );

            sections.forEach((section) => observer.observe(section));

            return () => {
                sections.forEach((section) => observer.unobserve(section));
            };
        }, 100);

        // Handle "Home" being active when near top
        const handleScroll = () => {
            if (window.scrollY < 100) setActiveSection("");
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [mode]);

    const sideNavItemsWithActive = sideNavItems.map(item => ({
        ...item,
        active: (activeSection === "" && item.href === "#") || activeSection === item.href.replace("#", "")
    }));

    /* --- Sidebar Mode (Vertical List) --- */
    if (mode === "sidebar") {
        return (
            <nav className="flex flex-col items-start gap-6">
                {sideNavItemsWithActive.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                            if (item.href === pathname) {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                return;
                            }
                            if (item.href.startsWith('#')) {
                                e.preventDefault();
                                const id = item.href.replace('#', '');
                                if (id === "") window.scrollTo({ top: 0, behavior: "smooth" });
                                else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                        className="group flex items-center gap-5 text-base font-medium tracking-widest uppercase transition-colors duration-300"
                        style={{
                            color: item.active ? "var(--foreground)" : "color-mix(in oklab, var(--foreground) 560%, transparent)",
                        }}
                        onMouseEnter={(e) => {
                            if (!item.active) e.currentTarget.style.color = "var(--foreground)";
                        }}
                        onMouseLeave={(e) => {
                            if (!item.active) e.currentTarget.style.color = "color-mix(in oklab, var(--foreground) 55%, transparent)";
                        }}
                    >
                        <span
                            className={`block h-[1px] transition-all duration-300 ${item.active ? "w-8" : "w-0 group-hover:w-4"}`}
                            style={{
                                backgroundColor: "var(--foreground)",
                            }}
                        />
                        {item.name}
                    </a>
                ))}
            </nav>
        );
    }

    /* --- Floating Mode (Pill) --- */
    return (
        <div className="fixed left-1/2 -translate-x-1/2 z-50">
            <nav
                className="flex items-center gap-1 p-1 rounded-full backdrop-blur-md shadow-lg ring-1 ring-black/5"
                style={{
                    backgroundColor: "color-mix(in oklab, var(--background) 70%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--foreground) 10%, transparent)",
                }}
            >
                {navItemsWithActive.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                            if (item.href === pathname) {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                return;
                            }
                            if (item.href.startsWith('#')) {
                                e.preventDefault();
                                const id = item.href.replace('#', '');
                                if (id === "") window.scrollTo({ top: 0, behavior: "smooth" });
                                else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                        className={`
                                    relative px-3 py-2 min-[375px]:px-6 min-[375px]:py-2.5 rounded-full text-sm font-medium transition-all duration-300
                                    ${item.active ? "shadow-sm" : ""}
                                `}
                        style={{
                            color: item.active
                                ? "var(--background)"
                                : "color-mix(in oklab, var(--foreground) 60%, transparent)",
                            backgroundColor: item.active
                                ? "var(--foreground)"
                                : "transparent",
                        }}
                        onMouseEnter={(e) => {
                            if (!item.active) {
                                e.currentTarget.style.backgroundColor =
                                    "color-mix(in oklab, var(--foreground) 8%, transparent)";
                                e.currentTarget.style.color = "var(--foreground)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!item.active) {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color =
                                    "color-mix(in oklab, var(--foreground) 60%, transparent)";
                            }
                        }}
                    >
                        {item.name}
                    </a>
                ))}
            </nav>
        </div>
    );
}
