import { motion } from "framer-motion";
import CustomButton from "@/components/ui/CustomButton";
import Navbar from "@/components/layout/Navbar";

export default function NotFoundContent() {
    return (
        <main className="min-h-screen bg-background text-foreground relative selection:bg-yellow-500/30 overflow-hidden flex flex-col items-center justify-center">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none bg-grid-pattern z-0 opacity-40" />
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)] z-0" />

            {/* Navbar (Floating) */}
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
                <Navbar mode="floating" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none whitespace-nowrap"
                >
                    <h1 className="text-[40vw] font-bold font-playfair text-foreground leading-none tracking-tighter">
                        404
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <h2 className="text-4xl md:text-6xl font-bold font-playfair mb-6 text-foreground">
                        Lost in the <span className="text-yellow-500 font-great-vibes font-normal">Void?</span>
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-400 font-outfit mb-10 max-w-lg mx-auto leading-relaxed">
                        The page you are looking for seems to have drifted away into deep space.
                        Let's get you back on track.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <CustomButton href="/">
                            Return to Home
                        </CustomButton>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
