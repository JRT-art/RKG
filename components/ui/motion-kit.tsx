"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, animate, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** fade + rise when scrolled into view */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "p";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** masked, staggered word reveal for big headlines. Lines are split on a newline; wrap words in [brackets] for lime accent */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word = {
    hidden: { y: "112%", rotate: 2 },
    show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE } },
  };
  return (
    <motion.span
      className={cn("block", className)}
      aria-label={text.replace(/[[\]]/g, "").replace(/\n/g, " ")}
      variants={container}
      initial={reduce ? "show" : "hidden"}
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } })}
    >
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(" ").map((raw, wi) => {
            const accent = raw.includes("[") || raw.includes("]");
            return (
              <span key={wi} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom -mb-[0.08em]">
                <motion.span className={cn("inline-block", accent && "text-lime")} variants={word}>
                  {raw.replace(/[[\]]/g, "")}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </motion.span>
  );
}

/** counts up when visible; text fallback when reduced motion */
export function Counter({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}

/** button/link that leans toward the cursor on desktop */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return <motion.div aria-hidden className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-lime" style={{ scaleX }} />;
}

/** custom cursor: desktop pointers only */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 38, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 520, damping: 38, mass: 0.35 });
  const [mode, setMode] = useState<"default" | "link" | "video">("default");
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-cursor='video']")) setMode("video");
      else if (t?.closest("a,button,[data-cursor]")) setMode("link");
      else setMode("default");
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);
  if (!enabled) return null;
  const size = mode === "video" ? 92 : mode === "link" ? 46 : 12;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full bg-lime text-[10px] font-semibold uppercase tracking-widest text-black mix-blend-normal"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: size, height: size, opacity: mode === "default" ? 0.95 : 0.92 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
    >
      {mode === "video" ? "Play" : null}
    </motion.div>
  );
}

/** infinite horizontal marquee; pauses for reduced motion via CSS */
export function Marquee({ children, className, slow }: { children: ReactNode; className?: string; slow?: boolean }) {
  return (
    <div className={cn("flex w-full overflow-hidden", className)} aria-hidden>
      <div className={cn("flex shrink-0 min-w-full items-center", slow ? "animate-marquee-slow" : "animate-marquee")}>
        {children}
        {children}
      </div>
    </div>
  );
}

/** play a looping muted video only while it is on screen */
export function useVisiblePlay(ref: React.RefObject<HTMLVideoElement | null>, active = true) {
  useEffect(() => {
    const v = ref.current;
    if (!v || !active) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [ref, active]);
}
