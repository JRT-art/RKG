import { Reveal, WordReveal } from "@/components/ui/motion-kit";

const reasons = [
  ["Creative understanding", "I understand how visuals, pacing, and storytelling contribute to advertising effectiveness."],
  ["AI-driven production", "I use modern AI tools to generate creative scenes, talking heads, and product demonstrations."],
  ["Realistic output", "I focus on natural expressions, believable characters, convincing environments, and consistent visuals."],
  ["Attention to detail", "I care about visual continuity, professional sound design, timing, and editing polish."],
  ["Flexible execution", "I can work across different creative styles, formats, audiences, and advertisement concepts."],
] as const;

export function WhyMe() {
  return (
    <section className="relative border-t border-line bg-panel/30 px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <div>
          <p className="label mb-6">Why work with me</p>
          <h2 className="display text-[clamp(2.4rem,5.6vw,5.8rem)] lg:sticky lg:top-32">
            <WordReveal text={"More than\nan editor.\nA [creative] [partner.]"} />
          </h2>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {reasons.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 0.05} className="group grid gap-3 py-8 md:grid-cols-[4rem_1fr] md:gap-6 md:py-10">
              <span className="label !text-lime">0{i + 1}</span>
              <div>
                <h3 className="display text-[1.7rem] leading-none transition-colors duration-500 group-hover:text-lime md:text-[2.4rem]">{t}</h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-mute">{d}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
