"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { Magnetic, Marquee, Reveal, WordReveal } from "@/components/ui/motion-kit";

export function Contact() {
  const c = site.contact;
  const cta = c.email ? `mailto:${c.email}?subject=Project%20inquiry` : "";

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line pt-28 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[60rem] -translate-x-1/2 rounded-full bg-lime/[0.06] blur-[160px]" />
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <p className="label mb-6">Contact</p>
        <h2 className="display text-[clamp(2.8rem,8.4vw,9.4rem)]">
          <WordReveal text={"Let's make\nsomething [people]\ncan't [scroll] past."} />
        </h2>

        <div className="mt-16 grid gap-14 md:mt-24 lg:gap-24">
          <div>
            <Reveal>
              <p className="max-w-lg text-lg leading-relaxed text-mute md:text-xl">
                Looking for an AI video editor who understands both creative production and direct-response advertising? Let&apos;s talk about your next project.
              </p>
            </Reveal>

            {cta && (
              <Reveal delay={0.1} className="mt-10">
                <Magnetic>
                  <a href={cta} {...(cta.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group inline-flex items-center gap-4 rounded-full bg-lime px-10 py-6 font-mono text-sm font-semibold uppercase tracking-[0.14em] text-black">
                    Let&apos;s work together
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </Magnetic>
              </Reveal>
            )}

            <Reveal delay={0.15} className="mt-12">
              <dl className="grid gap-5">
                {c.email && (
                  <div>
                    <dt className="label mb-1">Email</dt>
                    <dd><a href={`mailto:${c.email}`} className="display text-2xl normal-case transition-colors hover:text-lime md:text-3xl">{c.email}</a></dd>
                  </div>
                )}
                {c.phone && (
                  <div>
                    <dt className="label mb-1">Phone</dt>
                    <dd><a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`} className="display text-2xl normal-case transition-colors hover:text-lime md:text-3xl">{c.phone}</a></dd>
                  </div>
                )}
              </dl>
            </Reveal>

          </div>

        </div>
      </div>

      <div className="mt-28 border-y border-line py-6 md:mt-40">
        <Marquee slow>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="display mx-8 flex items-center gap-8 text-[clamp(3rem,9vw,9rem)] text-white/[0.08]">
              Impossible to ignore
              <motion.span className="size-4 rounded-full bg-lime" />
            </span>
          ))}
        </Marquee>
      </div>

      <footer className="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-10">
        <p className="display text-2xl">
          REIGN<span className="text-lime">.</span>
        </p>
        <p className="label">
          © {new Date().getFullYear()} {site.name} · AI Video Editor · {site.location}
        </p>
        <a href="#home" className="label transition-colors hover:text-lime">Back to top ↑</a>
      </footer>
    </section>
  );
}
