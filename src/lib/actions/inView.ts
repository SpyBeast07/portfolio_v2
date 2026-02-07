export function inView(node: HTMLElement, params: { once?: boolean, onEnter?: () => void, onLeave?: () => void } = {}) {
    let observer: IntersectionObserver;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (params.onEnter) params.onEnter();
                if (params.once) observer.unobserve(node);
            } else {
                if (params.onLeave) params.onLeave();
            }
        });
    };

    observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    });

    observer.observe(node);

    return {
        destroy() {
            if (observer) observer.disconnect();
        }
    };
}
