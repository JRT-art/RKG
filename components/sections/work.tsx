"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { categories, projects, type Category } from "@/data/projects";
import { Reveal, WordReveal } from "@/components/ui/motion-kit";
import { VideoCard } from "@/components/ui/video-card";
import { VideoModal } from "@/components/ui/video-modal";
import { cn, fmtDuration } from "@/lib/utils";

export function Work() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.category === filter)), [filter]);
  const [lead, ...rest] = items;
  const close = useCallback(() => setOpen(null), []);

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: projects.length };
    projects.forEach((p) => (m[p.category] = (m[p.category] ?? 0) + 1));
    return m;
  }, []);

  return (
    <section id="work" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label mb-6">Selected work · {String(projects.length).padStart(2, "0")} edits</p>
            <h2 className="display text-[clamp(2.4rem,6.4vw,6.6rem)]">
              <WordReveal text={"Work that\n[speaks] for itself."} />
            </h2>
          </div>
          <Reveal delay={0.2} className="max-w-sm">
            <p className="text-base leading-relaxed text-mute md:text-lg">
              A collection of AI-powered advertisements, direct-response creatives, and visual storytelling projects.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div role="tablist" aria-label="Filter projects" className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
            {categories.map((c) => {
              const on = filter === c;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(c)}
                  className={cn(
                    "label relative isolate shrink-0 rounded-full border px-5 py-3 transition-colors",
                    on ? "border-lime text-black" : "border-line hover:border-white/30 hover:text-ink",
                  )}
                >
                  {on && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-lime" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <span className={on ? "!text-black" : ""}>{c}</span>
                  <sup className={cn("ml-1.5 text-[0.6rem]", on ? "text-black/60" : "text-lime")}>{counts[c]}</sup>
                </button>
              );
            })}
          </div>
        </Reveal>

        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {lead && (
              <motion.article
                key={`lead-${lead.id}`}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 grid items-center gap-8 rounded-[2rem] border border-line bg-panel/60 p-4 md:mt-16 md:grid-cols-[minmax(0,25rem)_1fr] md:gap-16 md:p-8"
              >
                <VideoCard p={lead} n={1} big onOpen={() => setOpen(0)} className="mx-auto max-w-[24rem]" />
                <div className="flex flex-col gap-6 p-2 md:p-0">
                  <p className="label !text-lime">Featured · {lead.category}</p>
                  <h3 className="display text-[clamp(2rem,4.6vw,4.8rem)]">{lead.title}</h3>
                  <p className="max-w-xl text-base leading-relaxed text-mute md:text-lg">{lead.blurb}</p>
                  <ul className="flex flex-wrap gap-2">
                    {lead.tags.map((t) => (
                      <li key={t} className="label rounded-full border border-line px-3 py-1.5 !text-[0.65rem]">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <button onClick={() => setOpen(0)} className="group inline-flex items-center gap-3 rounded-full bg-lime px-7 py-4 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-black">
                      <Play className="size-4 fill-black" /> Watch now
                    </button>
                    <a href={lead.fullUrl} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-2 transition-colors hover:text-lime">
                      Full edit · {fmtDuration(lead.duration)} <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>

          <motion.div layout className="mt-6 grid grid-cols-2 gap-3 pb-0 md:mt-10 md:gap-6 lg:grid-cols-4 lg:pb-20">
            <AnimatePresence mode="popLayout">
              {rest.map((p, i) => (
                <VideoCard
                  key={p.id}
                  p={p}
                  n={i + 2}
                  onOpen={() => setOpen(i + 1)}
                  className={cn(i % 2 === 1 && "lg:translate-y-16", i % 4 === 2 && "lg:translate-y-8", i % 4 === 3 && "lg:translate-y-24")}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {items.length === 0 && <p className="label mt-16 text-center">No projects in this category yet.</p>}
      </div>

      <VideoModal items={items} index={open} onClose={close} onIndex={setOpen} />
    </section>
  );
}
