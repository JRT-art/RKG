import { stats } from "@/data/site";
import { Counter, Marquee, Reveal, WordReveal } from "@/components/ui/motion-kit";

const ticker = ["AI UGC", "Direct-Response", "VSLs", "Meta Ads", "TikTok Ads", "AI Cinematic", "Hooks", "Creative Testing"];

export function Credibility() {
  return (
    <section id="credibility" className="relative border-y border-line bg-panel/40">
      <div className="border-b border-line py-5">
        <Marquee slow>
          {ticker.map((t) => (
            <span key={t} className="display mx-8 flex items-center gap-8 text-3xl text-white/15 md:text-5xl">
              {t}
              <span className="size-2 rounded-full bg-lime" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-32">
        <p className="label mb-6">Credibility</p>
        <h2 className="display max-w-5xl text-[clamp(2.2rem,5.6vw,5.8rem)]">
          <WordReveal text={"Creative thinking.\n[Performance-focused] execution."} />
        </h2>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:mt-24 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="group relative bg-bg p-8 transition-colors duration-500 hover:bg-panel md:p-12">
              <p className="display text-[clamp(3.6rem,7.5vw,7.6rem)] text-lime">
                {s.counter ? <Counter to={s.value} suffix={s.suffix} /> : s.text}
              </p>
              <p className="mt-5 max-w-[16rem] text-sm leading-relaxed text-mute md:text-base">{s.label}</p>
              <span className="label absolute right-6 top-6 !text-dim">0{i + 1}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
