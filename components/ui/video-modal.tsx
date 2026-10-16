"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { fmtDuration, pad2 } from "@/lib/utils";

export function VideoModal({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: Project[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  const p = open ? items[index] : null;
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const step = useCallback(
    (d: number) => {
      if (index === null) return;
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  // lock scroll + restore focus
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      lastFocus.current?.focus?.();
    };
  }, [open]);

  // keyboard: esc, arrows, focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button,a[href],video[controls]");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, step]);

  // load/unload the video with the project; free it when closed
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !p) return;
    setLoading(true);
    setFailed(false);
    v.src = p.video;
    v.load();
    v.play().catch(() => {});
    return () => {
      v.pause();
      v.removeAttribute("src");
      v.load();
    };
  }, [p]);

  return (
    <AnimatePresence>
      {open && p && (
        <motion.div
          key="modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${p.title} — video`}
          ref={dialogRef}
          tabIndex={-1}
          className="fixed inset-0 z-[90] flex items-center justify-center outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} aria-hidden />

          <motion.div
            className="relative z-10 flex h-full w-full max-w-[1200px] flex-col gap-6 overflow-y-auto p-4 md:h-auto md:max-h-[94svh] md:flex-row md:items-center md:gap-12 md:overflow-visible md:p-8"
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative mx-auto w-full max-w-[min(100%,calc((94svh-5rem)*var(--ar)))] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-black md:mx-0 md:w-[min(46vw,calc((90svh)*var(--ar)))]"
              style={{ ["--ar" as string]: String(p.aspect), aspectRatio: String(p.aspect) }}
            >
              <video
                ref={videoRef}
                poster={p.poster}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 size-full object-contain"
                onCanPlay={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setFailed(true);
                }}
              >
                <track kind="captions" />
              </video>
              {loading && !failed && (
                <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/40">
                  <Loader2 className="size-8 animate-spin text-lime" />
                </div>
              )}
              {failed && (
                <div className="absolute inset-0 grid place-items-center bg-black/80 p-6 text-center text-sm text-mute">
                  This video couldn&apos;t be loaded. Try the full version on Drive →
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between gap-8 pb-6 md:pb-0">
              <div>
                <p className="label mb-4 flex items-center gap-3">
                  <span className="text-lime">{pad2((index ?? 0) + 1)}</span>/ {pad2(items.length)} · {p.category}
                </p>
                <h3 className="display text-[clamp(1.9rem,3.6vw,3.6rem)]">{p.title}</h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-mute">{p.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t} className="label rounded-full border border-line px-3 py-1.5 !text-[0.65rem]">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="label mt-6 !text-dim">
                  Showing the first {fmtDuration(p.excerpt)} · full edit {fmtDuration(p.duration)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={p.fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black"
                >
                  Watch the full edit
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <div className="ml-auto flex gap-2">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous project" className="grid size-12 place-items-center rounded-full border border-line transition-colors hover:border-lime hover:text-lime">
                    <ChevronLeft className="size-5" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next project" className="grid size-12 place-items-center rounded-full border border-line transition-colors hover:border-lime hover:text-lime">
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute right-4 top-4 z-20 grid size-12 place-items-center rounded-full border border-white/15 bg-black/60 backdrop-blur transition-colors hover:border-lime hover:text-lime md:right-8 md:top-8"
          >
            <X className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
