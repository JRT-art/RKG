"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { WordReveal } from "@/components/ui/motion-kit";

/** Renders nothing until real testimonials are added in data/testimonials.ts */
export function Testimonials() {
  const [i, setI] = useState(0);
  if (testimonials.length === 0) return null;
  const t = testimonials[i];
  const go = (d: number) => setI((i + d + testimonials.length) % testimonials.length);
  return (
    <section className="relative border-t border-line px-5 py-28 md:px-10 md:py-40" aria-label="Testimonials">
      <div className="mx-auto max-w-[1100px]">
        <p className="label mb-6">Social proof</p>
        <h2 className="display text-[clamp(2.2rem,5.4vw,5.4rem)]">
          <WordReveal text={"Good work\nbuilds [trust.]"} />
        </h2>
        <figure className="mt-16 min-h-[16rem]">
          <Quote className="size-10 text-lime" />
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
              <blockquote className="mt-6 font-display text-[clamp(1.5rem,3vw,2.7rem)] font-medium leading-tight tracking-tight">{t.quote}</blockquote>
              <figcaption className="label mt-8">
                <span className="text-ink">{t.name}</span> · {t.role}
                {t.company ? ` · ${t.company}` : ""}
              </figcaption>
            </motion.div>
          </AnimatePresence>
        </figure>
        {testimonials.length > 1 && (
          <div className="mt-10 flex gap-2">
            <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid size-12 place-items-center rounded-full border border-line hover:border-lime hover:text-lime">
              <ChevronLeft className="size-5" />
            </button>
            <button onClick={() => go(1)} aria-label="Next testimonial" className="grid size-12 place-items-center rounded-full border border-line hover:border-lime hover:text-lime">
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
