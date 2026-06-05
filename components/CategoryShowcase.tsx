import { categories, gallery } from "@/lib/site";
import ParallaxImage from "./anim/ParallaxImage";
import Reveal from "./anim/Reveal";
import Image from "next/image";

export default function CategoryShowcase() {
  return (
    <section id="work" className="relative bg-paper py-[clamp(5rem,12vh,9rem)] scroll-mt-20">
      <div className="shell">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[clamp(3rem,7vh,6rem)]">
          <Reveal>
            <span className="eyebrow">Selected work</span>
            <h2 className="display fluid-h2 text-ink mt-4">
              What we<span className="text-gold-grad"> make</span>
            </h2>
          </Reveal>
          <Reveal className="max-w-[32ch] text-ink-soft leading-relaxed" delay={0.1}>
            Five ways we tell a story — each one warm, unhurried, and shot in the last good light of the day.
          </Reveal>
        </div>

        <div className="flex flex-col gap-[clamp(4rem,10vh,9rem)]">
          {categories.map((cat, i) => {
            const shots = gallery.sections[cat.key] || [];
            const main = shots[0];
            if (!main) return null;
            const thumbs = shots.slice(1, 3);
            const flip = i % 2 === 1;
            return (
              <div
                key={cat.key}
                className={`grid md:grid-cols-12 gap-6 md:gap-10 items-center ${flip ? "" : ""}`}
              >
                {/* main image */}
                <div className={`md:col-span-7 ${flip ? "md:order-2" : "md:order-1"}`}>
                  <Reveal y={56}>
                    <a href="#contact" data-cursor data-cursor-label="Inquire" className="block">
                      <ParallaxImage
                        src={main.src}
                        alt={`${cat.label} — ${main.title}`}
                        blur={main.blur}
                        sizes="(max-width:768px) 100vw, 58vw"
                        speed={0.12}
                        className={`relative ${main.orient === "portrait" ? "aspect-[4/5]" : "aspect-[16/10]"}`}
                      />
                    </a>
                  </Reveal>
                </div>

                {/* text + thumbs */}
                <div className={`md:col-span-5 ${flip ? "md:order-1 md:pr-6" : "md:order-2 md:pl-6"}`}>
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className="font-display italic text-gold text-2xl">{cat.index}</span>
                      <span className="h-px flex-1 bg-[var(--line)]" />
                    </div>
                    <h3 className="display fluid-h3 text-ink mt-4 mb-4">{cat.label}</h3>
                    <p className="text-ink-soft leading-relaxed max-w-[40ch]">{cat.blurb}</p>

                    <div className="mt-7 flex items-center gap-4">
                      {thumbs.map((t) => (
                        <div key={t.src} className="frame relative w-24 h-28 sm:w-28 sm:h-32 rounded-[2px] overflow-hidden">
                          <Image
                            src={t.src}
                            alt={t.title}
                            fill
                            sizes="120px"
                            placeholder="blur"
                            blurDataURL={t.blur}
                            className="object-cover"
                          />
                        </div>
                      ))}
                      <a
                        href="#contact"
                        className="link-underline text-[0.78rem] uppercase tracking-[0.2em] text-ink ml-1"
                      >
                        Inquire →
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
