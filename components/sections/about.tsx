"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/data/site";
import { Reveal, WordReveal } from "@/components/ui/motion-kit";

const highlights = [
  ["3+ years", "direct-response video editing"],
  ["AI + editing", "one workflow, from prompt to final cut"],
  ["Meta · TikTok", "paid-social formats and hooks"],
  ["Philippines", "working with international brands"],
] as const;

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);

  return (
    <section id="about" ref={ref} className="relative border-t border-line px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="label mb-6">About</p>
          <h2 className="display text-[clamp(2.6rem,7vw,7.6rem)] lg:sticky lg:top-32">
            <WordReveal text={"The mind\nbehind the\n[edits.]"} />
          </h2>
        </div>

        <div className="grid gap-12 lg:col-span-5 lg:pt-24">
          <motion.div style={{ y }} className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
            {site.hasPortrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/images/portrait.jpg" alt={`Portrait of ${site.name}`} className="aspect-[4/5] w-full rounded-[2rem] border border-line object-cover grayscale transition-all duration-700 hover:grayscale-0" />
            ) : (
              <div className="relative grid aspect-[4/5] w-full place-items-center overflow-hidden rounded-[2rem] border border-dashed border-lime/50 bg-panel">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 14px, rgba(185,255,102,0.06) 14px 15px)" }} />
                <div className="relative p-8 text-center">
                  <p className="label !text-lime">Portrait placeholder</p>
                  <p className="mt-3 text-sm leading-relaxed text-mute">
                    Add your photo at <code className="font-mono text-ink">/public/images/portrait.jpg</code>
                    <br />
                    then set <code className="font-mono text-ink">hasPortrait: true</code> in <code className="font-mono text-ink">data/site.ts</code>.
                  </p>
                </div>
              </div>
            )}
            <span className="label absolute -bottom-4 left-6 rounded-full border border-line bg-bg px-4 py-2">{site.name} · {site.location}</span>
          </motion.div>

          <div className="space-y-6 text-base leading-relaxed text-mute md:text-lg">
            <Reveal>
              <p className="text-ink">
                I&apos;m Reign Krista Garcia, a video editor and AI creative specialist with over three years of experience in direct-response advertising.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>I work at the intersection of AI technology, storytelling, and performance marketing — creating advertisements that feel authentic, look exceptional, and communicate a clear message.</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>I believe the strongest creatives combine great storytelling with smart execution. That&apos;s what I aim to bring to every project.</p>
            </Reveal>
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {highlights.map(([k, v]) => (
              <div key={k} className="bg-bg p-5">
                <dt className="display text-xl text-lime md:text-2xl">{k}</dt>
                <dd className="mt-2 text-sm leading-snug text-mute">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
