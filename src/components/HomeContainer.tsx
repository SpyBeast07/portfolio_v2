
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
// Keep imports synchronous to ensure IntersectionObserver works for Navbar
import BlogsSection from "@/components/home/BlogsSection";
import NowSection from "@/components/home/NowSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import VerticalEmail from "@/components/layout/VerticalEmail";
import SocialPill from "@/components/shared/SocialPill";
import HeroTitle from "@/components/home/HeroTitle";
import HeroLogo from "@/components/home/HeroLogo";
import { role, quote } from "@/data";
import { StackIcon } from "@/components/ui/Icons";

export default function HomeContainer() {
  const { scrollY } = useScroll();

  // --- Animations ---
  const logoOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const logoScale = useTransform(scrollY, [0, 200], [1, 0.8]);
  const heroOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const pointerEventsHero = useTransform(scrollY, (v) => v > 150 ? "none" : "auto");
  const sidebarOpacity = useTransform(scrollY, [400, 600], [0, 1]);
  const sidebarY = useTransform(scrollY, [400, 600], [20, 0]);

  // Name Animation
  const t = useTransform(scrollY, [0, 600], [0, 1]);
  const nameScale = useTransform(t, [0, 1], [1, 0.25]);
  const nameX = useTransform(t, [0, 1], ["-50%", "0%"]);
  const nameLeft = useTransform(t, (v) => `calc(50% * ${1 - v} + 8rem * ${v})`);
  const nameTop = useTransform(t, [0, 1], ["22vh", "20vh"]);

  // Content Animation (Fast scroll then normal)
  const contentY = useTransform(scrollY, [0, 120], ["0vh", "-45vh"]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-yellow-500/30">

      {/* --- Global Background --- */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern z-0 opacity-40" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)] z-0" />

      {/* --- Fixed Elements --- */}
      <div className="hidden md:block">
        <VerticalEmail />
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <motion.div style={{ opacity: heroOpacity, pointerEvents: pointerEventsHero as any }} className="block md:hidden">
        <VerticalEmail />
      </motion.div>

      {/* --- Hero Section --- */}

      {/* Desktop Name (Animates to Sidebar) */}
      <div className="fixed inset-0 z-10 pointer-events-none hidden md:block">
        <motion.div
          className="absolute pointer-events-auto"
          style={{
            top: nameTop,
            left: nameLeft,
            x: nameX,
            scale: nameScale,
            transformOrigin: "left top",
            zIndex: 40,
          }}
        >
          <HeroTitle
            className="text-[14vw]"
            spanClassName="left-[77%] top-[45%] translate-y-[2vw] text-[7vw]"
          />
        </motion.div>
      </div>

      {/* Mobile Name (Static Fade Out) */}
      <div className="fixed inset-0 z-10 pointer-events-none block md:hidden">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
          style={{ top: "25vh", opacity: heroOpacity }}
        >
          <HeroTitle
            className="text-[18vw] pb-8"
            spanClassName="left-[75%] top-[35%] translate-y-[4vw] text-[10vw]"
          />
        </motion.div>
      </div>

      {/* Center Logo */}
      <motion.div
        style={{ opacity: logoOpacity, scale: logoScale }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
      >
        <HeroLogo />
      </motion.div>

      {/* --- Sidebar Content (Fade In) --- */}
      <div className="fixed top-0 left-0 w-[40%] h-screen z-30 hidden md:flex flex-col pl-32 pt-[25vh] pointer-events-none">
        <motion.div style={{ opacity: sidebarOpacity, y: sidebarY, pointerEvents: 'auto' }} className="flex flex-col gap-10 items-start mt-4">
          <div className="flex flex-col text-neutral-400 font-medium text-xl leading-tight items-center">
            <h2>{role.line1}</h2>
            <h2 className="text-xl font-medium transition-colors duration-300" style={{ color: 'var(--icon-color)' }}>{role.line2}</h2>
          </div>
          <div className="w-full">
            <Navbar mode="sidebar" />
          </div>
        </motion.div>
      </div>

      {/* --- Floating Elements --- */}

      {/* Navbar */}
      <div className="hidden md:block fixed top-0 left-0 w-full h-full z-30 pointer-events-none">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-auto">
          <Navbar mode="floating" />
        </div>
      </div>

      <div className="block md:hidden fixed top-0 left-0 w-full h-full z-30 pointer-events-none">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-auto">
          <Navbar mode="floating" />
        </div>
      </div>

      {/* Hero Role (Bottom Right) */}
      <motion.div style={{ opacity: heroOpacity }} className="fixed bottom-16 right-16 z-20 hidden md:flex flex-col items-center gap-2 text-center">
        <StackIcon width={32} height={32} className="opacity-90 transition-colors duration-300" style={{ color: 'var(--icon-color)' }} />
        <div className="flex flex-col text-neutral-400 font-medium text-xl leading-tight items-center">
          <span>{role.line1}</span>
          <span style={{ color: 'var(--icon-color)' }} className="transition-colors duration-300">{role.line2}</span>
        </div>
      </motion.div>

      {/* Social Pills */}
      <div className="fixed bottom-16 left-32 z-[60] hidden md:block pointer-events-auto">
        <SocialPill />
      </div>
      <motion.div
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style={{ opacity: logoOpacity, pointerEvents: pointerEventsHero as any }}
        className="fixed top-[82%] left-1/2 -translate-x-1/2 z-[60] md:hidden pointer-events-auto origin-center scale-85"
      >
        <SocialPill />
      </motion.div>

      {/* --- Main Content Area --- */}
      <motion.div style={{ y: isMobile ? contentY : 0 }} className="relative w-full z-20">
        <div style={{ height: "100vh" }} />
        <main className="md:w-[60%] md:ml-[40%] px-6 md:px-16 pt-24 pb-24">

          {/* Quote Section */}
          <section className="mb-24 lg:mb-40 pt-10">
            <h2
              className="text-2xl md:text-3xl font-bold font-playfair leading-snug"
              style={{ color: "var(--foreground)" }}
            >
              “{quote}”
            </h2>
          </section>

          <NowSection />
          <BlogsSection />
          <Footer />
        </main>
      </motion.div>
    </div>
  );
}
