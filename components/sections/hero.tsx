"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { projects, heroReel } from "@/data/projects";
import { Magnetic, WordReveal, useVisiblePlay } from "@/components/ui/motion-kit";
import { cn } from "@/lib/utils";

function Frame({
  id,
  className,
  depth,
  mx,
  my,
  delay,
  tilt,
}: {
  id: string;
  className: string;
  depth: number;
  mx: ReturnType<typeof useSpring>;
  my: ReturnType<typeof useSpring>;
  delay: number;
  tilt: number;
}) {
  const p = projects.find((x) => x.id === id)!;
  const ref = useRef<HTMLVideoElement>(null);
  useVisiblePlay(ref);
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div
      className={cn("absolute", className)}
      style={{ x, y, rotate: tilt }}
      initial={{ opacity: 0, scale: 0.9, y: 60 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="animate-float-y overflow-hidden rounded-[1.6rem] border border-white/10 bg-panel shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ring-1 ring-black/60" style={{ animationDelay: `${delay * -3}s` }}>
        <video
          ref={ref}
          src={p.preview}
          poster={p.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${p.title} preview`}
          className="block aspect-[9/16] w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-10">
          <span className="label !text-[0.6rem] text-ink">{p.category}</span>
          <span className="size-1.5 rounded-full bg-lime shadow-[0_0_12px_2px_#b9ff66]" />
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const reelY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 20 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 20 });

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-24 pt-32 md:px-10 md:pt-36"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mxRaw.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        myRaw.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
    >
      {/* atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/4 size-[46rem] rounded-full bg-lime/[0.07] blur-[140px]" />
        <div className="absolute -right-32 -top-20 size-[38rem] rounded-full bg-lime/[0.05] blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage: "radial-gradient(ellipse at 30% 40%, black 10%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, black 10%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <motion.div style={{ y: titleY }} className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="label mb-7 flex items-center gap-3">
            <span className="size-2 rounded-full bg-lime shadow-[0_0_14px_2px_#b9ff66]" />
            AI Video Editor · Direct-Response Creative
          </motion.p>

          <h1 className="display text-[clamp(2.7rem,6.1vw,7.4rem)]">
            <WordReveal text={"I don't just edit ads."} immediate delay={0.35} />
            <span className="mt-3 block">
              <WordReveal text={"I make them [impossible] to [ignore.]"} immediate delay={0.75} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.9 }}
            className="mt-9 max-w-xl text-base leading-relaxed text-mute md:text-lg"
          >
            Hey, I&apos;m <span className="text-ink">Reign</span> — an AI Video Editor specializing in scroll-stopping creatives, realistic AI-generated content, and direct-response advertisements built to turn attention into action.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.9 }} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#work" className="group inline-flex items-center gap-3 rounded-full bg-lime px-8 py-4 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-black">
                Explore my work
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="inline-flex items-center gap-3 rounded-full border border-line px-8 py-4 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-lime hover:text-lime">
                Let&apos;s work together
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* floating reel */}
        <motion.div style={{ y: reelY }} className="relative mx-auto h-[34rem] w-full max-w-[34rem] sm:h-[40rem] lg:h-[44rem]" aria-label="Selected work preview">
          <Frame id={heroReel[0]} className="left-[4%] top-[8%] w-[46%]" depth={-22} mx={mx} my={my} delay={0.5} tilt={-4} />
          <Frame id={heroReel[1]} className="right-[2%] top-[0%] w-[44%]" depth={30} mx={mx} my={my} delay={0.8} tilt={5} />
          <Frame id={heroReel[2]} className="left-[26%] top-[46%] w-[42%]" depth={-40} mx={mx} my={my} delay={1.05} tilt={-1.5} />
          <div aria-hidden className="absolute right-[6%] top-[58%] hidden size-28 sm:block">
            <svg viewBox="0 0 100 100" className="animate-spin-slow size-full">
              <defs>
                <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-ink" style={{ fontFamily: "var(--font-jb)", fontSize: 8.4, letterSpacing: "0.22em" }}>
                <textPath href="#circ">REAL WORK · REAL EDITS · REAL ADS ·</textPath>
              </text>
            </svg>
          </div>
        </motion.div>
      </div>

      <a href="#credibility" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" aria-label="Scroll to explore">
        <span className="label">Scroll to explore</span>
        <ArrowDown className="animate-nudge size-4 text-lime" />
      </a>
    </section>
  );
}
