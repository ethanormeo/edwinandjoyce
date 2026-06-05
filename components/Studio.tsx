import Reveal from "./anim/Reveal";
import { copy, contact } from "@/lib/site";

const facts = [
  ["Team", "Husband & wife"],
  ["Experience", "~19 years"],
  ["Based in", "Austin, Texas"],
  ["Booking", "By appointment"],
];

export default function Studio() {
  return (
    <section id="studio" className="relative bg-night text-paper py-[clamp(5rem,14vh,11rem)] scroll-mt-20">
      <div className="shell">
        <Reveal className="max-w-4xl">
          <span className="eyebrow !text-[var(--color-night-soft)]">The studio</span>
          <h2 className="display fluid-h2 text-paper mt-5">The two behind the lens</h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-12 gap-x-10 gap-y-10">
          <Reveal className="md:col-span-5">
            <p className="lede fluid-lede !text-paper/90 max-w-[34ch]">{copy.studio.lead}</p>
            <ul className="mt-10 border-t border-white/12">
              {facts.map(([k, v]) => (
                <li key={k} className="flex items-center justify-between py-3.5 border-b border-white/12">
                  <span className="label text-[var(--color-night-soft)]">{k}</span>
                  <span className="text-paper text-[0.98rem]">{v}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal stagger={0.1} className="md:col-span-6 md:col-start-7 space-y-5 text-[var(--color-night-soft)] leading-relaxed max-w-[60ch]">
            {copy.studio.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-[clamp(3rem,8vh,6rem)] pt-10 border-t border-white/12 grid md:grid-cols-12 gap-8 items-end">
          <p className="md:col-span-8 display text-paper" style={{ fontSize: "clamp(1.6rem,3.4vw,2.8rem)", fontStretch: "108%", fontWeight: 700, lineHeight: 1.08 }}>
            Honor the people, honor the light — <span className="text-accent">the rest takes care of itself.</span>
          </p>
          <div className="md:col-span-4 md:text-right">
            <p className="text-paper text-lg">{copy.studio.signature}</p>
            <p className="label text-[var(--color-night-soft)] mt-1">{contact.location}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
