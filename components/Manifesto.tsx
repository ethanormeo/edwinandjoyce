import SplitHeading from "./anim/SplitHeading";
import Reveal from "./anim/Reveal";
import { copy } from "@/lib/site";

export default function Manifesto() {
  return (
    <section id="intro" className="relative bg-paper py-[clamp(6rem,16vh,12rem)]">
      <div className="shell grid md:grid-cols-12 gap-y-10 gap-x-8 items-start">
        <Reveal className="md:col-span-3 flex items-center gap-4 md:pt-6" >
          <span className="eyebrow">Our craft</span>
          <span className="hidden md:block w-16 h-px bg-[var(--line-strong)]" />
        </Reveal>
        <div className="md:col-span-9">
          <SplitHeading
            as="p"
            className="display fluid-h3 text-ink max-w-[24ch]"
            stagger={0.09}
          >
            {copy.manifesto}
          </SplitHeading>
          <Reveal className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-soft" delay={0.1}>
            <span className="text-[0.8rem] uppercase tracking-[0.2em]">Weddings</span>
            <Dot /> <span className="text-[0.8rem] uppercase tracking-[0.2em]">Families</span>
            <Dot /> <span className="text-[0.8rem] uppercase tracking-[0.2em]">Seniors</span>
            <Dot /> <span className="text-[0.8rem] uppercase tracking-[0.2em]">Couples</span>
            <Dot /> <span className="text-[0.8rem] uppercase tracking-[0.2em]">Portraits</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="w-1 h-1 rounded-full bg-gold inline-block" />;
}
