import Reveal from "./anim/Reveal";
import SplitHeading from "./anim/SplitHeading";
import { copy } from "@/lib/site";

export default function Experience() {
  return (
    <section id="experience" className="relative bg-paper-deep py-[clamp(5rem,12vh,9rem)] scroll-mt-20">
      <div className="shell">
        <div className="max-w-3xl mb-[clamp(3rem,7vh,5rem)]">
          <Reveal>
            <span className="eyebrow">The experience</span>
          </Reveal>
          <SplitHeading as="h2" className="display fluid-h2 text-ink mt-4">
            From hello to heirloom
          </SplitHeading>
        </div>

        <Reveal stagger={0.12} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] rounded-[3px] overflow-hidden">
          {copy.process.map((p) => (
            <div key={p.step} className="bg-paper p-7 md:p-8 flex flex-col min-h-[15rem] group">
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-display italic text-gold text-3xl">{p.step}</span>
                <span className="w-8 h-px bg-[var(--line-strong)] group-hover:w-14 transition-[width] duration-700" />
              </div>
              <h3 className="font-display text-2xl text-ink mb-3">{p.title}</h3>
              <p className="text-ink-soft text-[0.92rem] leading-relaxed">{p.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
