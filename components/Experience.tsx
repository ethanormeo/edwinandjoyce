import Reveal from "./anim/Reveal";
import { copy } from "@/lib/site";

export default function Experience() {
  return (
    <section className="relative bg-paper py-[clamp(4rem,11vh,8rem)] border-t border-[var(--line)]">
      <div className="shell">
        <Reveal className="max-w-3xl mb-[clamp(2.5rem,6vh,4.5rem)]">
          <span className="eyebrow">The experience</span>
          <h2 className="display fluid-h2 text-ink mt-4">From hello to heirloom</h2>
        </Reveal>

        <Reveal stagger={0.1} className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-[var(--line)]">
          {copy.process.map((p, i) => (
            <div
              key={p.step}
              className={`py-8 lg:px-7 flex flex-col min-h-[14rem] ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-[var(--line)] sm:pl-7 lg:pl-7" : ""} first:lg:pl-0 ${i === 2 ? "sm:border-l-0 lg:border-l border-t sm:border-t" : ""}`}
            >
              <span className="label tnum text-accent mb-6">{p.step}</span>
              <h3 className="display text-ink mb-3" style={{ fontSize: "clamp(1.3rem,2vw,1.7rem)", fontStretch: "100%", fontWeight: 700 }}>
                {p.title}
              </h3>
              <p className="text-ink-soft text-[0.92rem] leading-relaxed">{p.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
