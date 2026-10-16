"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, WordReveal } from "@/components/ui/motion-kit";

const steps = [
  ["Understand", "Study the brief, product, target audience, visual direction, and creative objective."],
  ["Create", "Plan scenes, develop AI prompts, select references, and establish visual consistency."],
  ["Edit", "Combine generated footage, voiceovers, music, captions when appropriate, and professional editing techniques."],
  ["Refine", "Improve pacing, audio, realism, visual transitions, and the final delivery."],
] as const;

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const grow = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

  return (
    <section className="relative border-t border-line px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <p className="label mb-6">Creative process</p>
        <h2 className="display max-w-5xl text-[clamp(2.2rem,5.6vw,5.8rem)]">
          <WordReveal text={"From an idea to\nan ad worth [watching.]"} />
        </h2>

        <div ref={ref} className="relative mt-20 md:mt-28">
          {/* progress rails */}
          <div aria-hidden className="absolute left-[0.45rem] top-2 h-[calc(100%-1rem)] w-px bg-line md:hidden">
            <motion.div style={{ scaleY: grow }} className="h-full origin-top bg-lime" />
          </div>
          <div aria-hidden className="absolute left-0 top-[0.45rem] hidden h-px w-full bg-line md:block">
            <motion.div style={{ scaleX: grow }} className="h-full origin-left bg-lime" />
          </div>

          <ol className="grid gap-12 pl-9 md:grid-cols-4 md:gap-8 md:pl-0 md:pt-14">
            {steps.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.12} className="relative">
                <span aria-hidden className="absolute -left-9 top-1 size-3.5 rounded-full border-2 border-lime bg-bg md:-top-[3.45rem] md:left-0" />
                <p className="label !text-lime">Step 0{i + 1}</p>
                <h3 className="display mt-4 text-[2.6rem] leading-none md:text-[3.2rem]">{t}</h3>
                <p className="mt-5 max-w-xs text-base leading-relaxed text-mute">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
