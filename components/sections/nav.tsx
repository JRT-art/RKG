"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "contact", label: "Contact" },
] as const;

export function Nav() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    // the active link is the last tracked section whose top has passed the middle of the viewport
    const update = () => {
      const mid = window.innerHeight * 0.4;
      let cur = els[0]?.id ?? "home";
      for (const el of els) if (el.getBoundingClientRect().top <= mid) cur = el.id;
      setActive(cur);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-5"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex max-w-[1500px] items-center justify-between rounded-full border px-4 py-2.5 transition-colors duration-500 md:px-6",
            scrolled ? "border-line bg-bg/70 backdrop-blur-xl" : "border-transparent bg-transparent",
          )}
        >
          <a href="#home" className="display text-[1.35rem] leading-none md:text-2xl" aria-label="Reign — home">
            REIGN<span className="text-lime">.</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "page" : undefined}
                  className={cn(
                    "label relative isolate rounded-full px-4 py-2 transition-colors hover:text-ink",
                    active === l.id && "text-ink",
                  )}
                >
                  {active === l.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-panel-2" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              Let&apos;s talk
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-line bg-panel lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-6 pb-10 pt-28"
          >
            <ul className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.6 }}>
                  <a href={`#${l.id}`} onClick={() => setOpen(false)} className="display flex items-baseline gap-4 py-2 text-[3.4rem] leading-none">
                    <span className="label text-lime">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-4 font-mono text-sm font-semibold uppercase tracking-[0.14em] text-black">
              Let&apos;s talk <ArrowUpRight className="size-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
