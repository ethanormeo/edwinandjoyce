import Reveal from "./anim/Reveal";
import { copy } from "@/lib/site";

export default function Quote() {
  return (
    <section className="relative bg-paper py-[clamp(5rem,14vh,11rem)] border-t border-[var(--line)]">
      <div className="shell">
        <Reveal className="max-w-5xl">
          <span className="label text-accent">In our words</span>
          <blockquote
            className="display text-ink mt-6"
            style={{ fontSize: "clamp(1.7rem,4.6vw,3.8rem)", fontStretch: "110%", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            {copy.bigQuote}
          </blockquote>
          <p className="label text-ink-soft mt-8">Edwin &amp; Joyce — Austin, Texas</p>
        </Reveal>
      </div>
    </section>
  );
}
