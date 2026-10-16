"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";
import { useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { cn, fmtDuration, pad2 } from "@/lib/utils";

export function VideoCard({
  p,
  n,
  onOpen,
  className,
  big,
}: {
  p: Project;
  n: number;
  onOpen: () => void;
  className?: string;
  big?: boolean;
}) {
  const vref = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);
  const [ready, setReady] = useState(false);

  const start = () => {
    const v = vref.current;
    if (!v) return;
    setHover(true);
    if (!v.getAttribute("src")) {
      v.src = p.preview;
      v.load();
    }
    v.play().catch(() => {});
  };
  const stop = () => {
    const v = vref.current;
    setHover(false);
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <motion.button
      type="button"
      layout
      data-cursor="video"
      onClick={onOpen}
      onPointerEnter={(e) => e.pointerType === "mouse" && start()}
      onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
      onFocus={start}
      onBlur={stop}
      aria-label={`Play ${p.title} — ${p.category}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn("group relative block w-full text-left", className)}
    >
      <div
        className="relative overflow-hidden rounded-[1.4rem] border border-line bg-panel transition-[border-color,transform,box-shadow] duration-500 group-hover:-translate-y-1.5 group-hover:border-lime/60 group-hover:shadow-[0_30px_80px_-30px_rgba(185,255,102,0.35)]"
        style={{ aspectRatio: String(p.aspect) }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.poster}
          alt=""
          loading="lazy"
          decoding="async"
          className={cn("absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]", hover && ready && "opacity-0")}
        />
        <video
          ref={vref}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setReady(true)}
          className={cn("absolute inset-0 size-full object-cover transition-opacity duration-500", hover && ready ? "opacity-100" : "opacity-0")}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="label rounded-full bg-black/55 px-3 py-1.5 !text-[0.62rem] text-ink backdrop-blur">{pad2(n)}</span>
          <span className="label hidden rounded-full bg-black/55 px-3 py-1.5 !text-[0.62rem] text-ink backdrop-blur sm:inline">{fmtDuration(p.duration)}</span>
        </div>

        <span className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-lime text-black opacity-0 scale-75 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 max-md:opacity-100 max-md:scale-90">
          <Play className="ml-0.5 size-5 fill-black" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <p className="label mb-2 !text-lime">{p.category}</p>
          <h3 className={cn("display leading-[0.98]", big ? "text-3xl md:text-4xl" : "text-[1.15rem] md:text-[1.5rem]")}>{p.title}</h3>
        </div>
      </div>
    </motion.button>
  );
}
