"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { projects } from "@/data/projects";
import { Reveal, WordReveal } from "@/components/ui/motion-kit";
import { cn } from "@/lib/utils";

const items = [
  { n: "01", title: "AI UGC Production", body: "Realistic AI-generated characters, talking-head advertisements, natural expressions, and authentic social media-style videos.", ref: "p6" },
  { n: "02", title: "Direct-Response Video Editing", body: "Performance-focused advertising with compelling hooks, effective pacing, clear product messaging, and strong visual storytelling.", ref: "p4" },
  { n: "03", title: "Video Sales Letters", body: "Longer-form advertisements structured to maintain attention and communicate persuasive narratives.", ref: "p8" },
  { n: "04", title: "AI Cinematic Production", body: "Creative visual concepts, AI-generated environments, character continuity, cinematic compositions, and advanced prompting.", ref: "p5" },
  { n: "05", title: "Performance Creative Variations", body: "Multiple hook treatments, visual angles, edits, and creative variations to support testing.", ref: "p10" },
] as const;

export function Expertise() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section id="expertise" className="relative border-t border-line px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <p className="label mb-6">Expertise</p>
        <h2 className="display text-[clamp(2.4rem,6.4vw,6.6rem)]">
          <WordReveal text={"What I bring\nto the [table.]"} />
        </h2>

        <ol className="mt-16 border-t border-line md:mt-24">
          {items.map((it, i) => {
            const poster = projects.find((p) => p.id === it.ref)?.poster;
            const on = hover === i;
            return (
              <Reveal as="li" key={it.n} delay={i * 0.05} className="border-b border-line">
                <div
                  className="group relative grid cursor-default gap-4 py-8 transition-[padding] duration-500 md:grid-cols-[6rem_1.4fr_1fr_8rem] md:items-center md:gap-8 md:py-12 md:hover:pl-4"
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                  data-cursor
                >
                  <span className="label !text-lime">{it.n}</span>
                  <h3 className={cn("display text-[clamp(1.7rem,3.8vw,3.9rem)] transition-colors duration-500", on ? "text-lime" : "text-ink")}>{it.title}</h3>
                  <p className="max-w-md text-base leading-relaxed text-mute">{it.body}</p>
                  <div className="relative hidden h-24 md:block">
                    <motion.div
                      initial={false}
                      animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.8, rotate: on ? -4 : 0, x: on ? 0 : -20 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/15"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={poster} alt="" loading="lazy" className="h-28 w-auto object-cover" />
                    </motion.div>
                    <ArrowUpRight className={cn("absolute right-0 top-1/2 size-8 -translate-y-1/2 text-dim transition-opacity", on && "opacity-0")} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
