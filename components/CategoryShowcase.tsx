import { categories, gallery } from "@/lib/site";
import ParallaxImage from "./anim/ParallaxImage";
import Reveal from "./anim/Reveal";
import Image from "next/image";

export default function CategoryShowcase() {
  return (
    <section id="work" className="relative bg-paper py-[clamp(4rem,10vh,8rem)] border-t border-[var(--line)]">
      <div className="shell">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[clamp(2.5rem,6vh,4.5rem)]">
          <Reveal>
            <span className="eyebrow">Selected work</span>
            <h2 className="display fluid-h2 text-ink mt-4">What we make</h2>
          </Reveal>
          <Reveal className="max-w-[34ch] lede text-[0.98rem]" delay={0.05}>
            Five ways we tell a story — each shot warm, unhurried, and in the last good light of the day.
          </Reveal>
        </div>

        <div className="border-t border-[var(--line)]">
          {categories.map((cat, i) => {
            const shots = gallery.sections[cat.key] || [];
            const main = shots[0];
            if (!main) return null;
            const thumbs = shots.slice(1, 3);
            const flip = i % 2 === 1;
            return (
              <div
                key={cat.key}
                className="grid md:grid-cols-12 gap-6 md:gap-10 items-center py-[clamp(2.5rem,6vh,5rem)] border-b border-[var(--line)]"
              >
                {/* image */}
                <div className={`md:col-span-7 ${flip ? "md:order-2" : "md:order-1"}`}>
                  <Reveal y={36}>
                    <a href="#contact" className="group block frame relative overflow-hidden">
                      <ParallaxImage
                        src={main.src}
                        alt={`${cat.label} — Edwin & Joyce Ormeo Photography`}
                        blur={main.blur}
                        sizes="(max-width:768px) 100vw, 58vw"
                        speed={0.08}
                        className={`relative transition-transform duration-700 group-hover:scale-[1.03] ${main.orient === "portrait" ? "aspect-[4/5]" : "aspect-[16/10]"}`}
                      />
                    </a>
                  </Reveal>
                </div>

                {/* text */}
                <div className={`md:col-span-5 ${flip ? "md:order-1 md:pr-6" : "md:order-2 md:pl-6"}`}>
                  <Reveal>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="label tnum text-accent">{cat.index}</span>
                      <span className="h-px flex-1 bg-[var(--line)]" />
                      <span className="label text-ink-soft">{`0${categories.length}`}</span>
                    </div>
                    <h3 className="display fluid-h3 text-ink mb-4" style={{ fontStretch: "100%", fontWeight: 700 }}>
                      {cat.label}
                    </h3>
                    <p className="text-ink-soft leading-relaxed max-w-[40ch] text-[0.98rem]">{cat.blurb}</p>

                    <div className="mt-7 flex items-center gap-4">
                      {thumbs.map((t) => (
                        <div key={t.src} className="frame relative w-20 h-24 sm:w-24 sm:h-28 overflow-hidden">
                          <Image src={t.src} alt={t.title} fill sizes="120px" placeholder="blur" blurDataURL={t.blur} className="object-cover" />
                        </div>
                      ))}
                      <a href="#contact" className="arrow-link link-underline ml-1">
                        Inquire <span className="arw">&rarr;</span>
                      </a>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
