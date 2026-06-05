import SplitHeading from "./anim/SplitHeading";
import Reveal from "./anim/Reveal";
import { copy } from "@/lib/site";

export default function Quote() {
  return (
    <section className="relative bg-paper py-[clamp(6rem,16vh,12rem)]">
      <div className="shell text-center max-w-5xl mx-auto">
        <Reveal>
          <span className="font-display italic text-gold text-5xl leading-none select-none">“</span>
        </Reveal>
        <SplitHeading
          as="blockquote"
          className="display text-[clamp(1.8rem,4.4vw,3.6rem)] leading-[1.12] text-ink mt-2"
          stagger={0.09}
        >
          {copy.bigQuote}
        </SplitHeading>
        <Reveal className="mt-10 flex items-center justify-center gap-4 text-ink-soft">
          <span className="w-10 h-px bg-[var(--line-strong)]" />
          <span className="text-[0.72rem] uppercase tracking-[0.26em]">Edwin & Joyce</span>
          <span className="w-10 h-px bg-[var(--line-strong)]" />
        </Reveal>
      </div>
    </section>
  );
}
