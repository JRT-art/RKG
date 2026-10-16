import { Marquee, Reveal, WordReveal } from "@/components/ui/motion-kit";

/** Typographic wordmarks only — no third-party logos are used. */
const groups = [
  { title: "AI video generation", tools: ["Kling AI", "Google Veo", "Seedance", "Runway", "Sora", "Higgsfield"] },
  { title: "AI production", tools: ["ElevenLabs", "HeyGen", "AI image generation"] },
  { title: "Editing software", tools: ["Adobe Premiere Pro", "DaVinci Resolve", "CapCut"] },
] as const;

const all = groups.flatMap((g) => g.tools);

export function Toolkit() {
  return (
    <section className="relative border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <p className="label mb-6">Creative toolkit</p>
        <h2 className="display text-[clamp(2.2rem,5.8vw,6rem)]">
          <WordReveal text={"Powerful tools.\n[Intentional] creative."} />
        </h2>
      </div>

      <div className="my-16 border-y border-line py-6 md:my-24">
        <Marquee>
          {all.map((t) => (
            <span key={t} className="display mx-7 flex items-center gap-14 text-4xl text-white/80 md:text-6xl">
              {t}
              <span className="size-2.5 rotate-45 bg-lime" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08} className="rounded-3xl border border-line bg-panel/50 p-7 md:p-9">
              <p className="label !text-lime">{g.title}</p>
              <ul className="mt-7 space-y-3">
                {g.tools.map((t) => (
                  <li key={t} className="flex items-center justify-between border-b border-line pb-3 font-display text-xl font-medium md:text-2xl">
                    {t}
                    <span className="label !text-dim">●</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
