
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

const usePathname = () => {
    const [pathname, setPathname] = useState("");
    useEffect(() => {
        setPathname(window.location.pathname);
    }, []);
    return pathname;
};

export default function SmoothScroll() {
    const pathname = usePathname();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // ... (Lenis init code remains same) ...
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Handle Astro View Transitions
        const handlePageLoad = () => {
            if (lenisRef.current) {
                lenisRef.current.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo(0, 0);
            }
        };

        document.addEventListener('astro:page-load', handlePageLoad);

        return () => {
            document.removeEventListener('astro:page-load', handlePageLoad);
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return null;
}
