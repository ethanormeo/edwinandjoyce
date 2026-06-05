import Reveal from "./anim/Reveal";
import { copy } from "@/lib/site";

export default function Manifesto() {
  return (
    <section id="intro" className="relative bg-paper py-[clamp(5rem,14vh,11rem)] border-t border-[var(--line)]">
      <div className="shell grid md:grid-cols-12 gap-y-10 gap-x-8 items-start">
        <Reveal className="md:col-span-3">
          <span className="eyebrow">The studio</span>
        </Reveal>
        <div className="md:col-span-9">
          <Reveal
            as="p"
            className="display text-ink"
            y={28}
          >
            <span className="block" style={{ fontSize: "clamp(1.7rem,4vw,3.4rem)", fontStretch: "112%", lineHeight: 1.04 }}>
              {copy.manifesto}
            </span>
          </Reveal>
          <Reveal className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-ink-soft" delay={0.05}>
            {["Weddings", "Couples", "Families", "Seniors", "Portraits"].map((g) => (
              <span key={g} className="label">{g}</span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
