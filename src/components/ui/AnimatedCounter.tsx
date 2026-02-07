
import { useEffect } from "react";
import { useMotionValue, useTransform, animate, motion } from "framer-motion";

export default function AnimatedCounter({ value }: { value: number }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, value, { duration: 1, ease: "easeOut" });
        return () => controls.stop();
    }, [value, count]);

    return <motion.span>{rounded}</motion.span>;
}
