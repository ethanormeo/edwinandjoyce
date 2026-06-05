"use client";

import { useEffect, useRef, useState } from "react";
import ParallaxImage from "./anim/ParallaxImage";
import { copy, gallery } from "@/lib/site";

// a warm, golden-hour landscape for the band (guarded fallbacks)
const bg = gallery.heroes[2] ?? gallery.heroes[0];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          const dur = 1600;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export default function StatsBand() {
  if (!bg) return null;
  return (
    <section className="relative h-[80svh] min-h-[520px] overflow-hidden flex items-center justify-center text-paper-soft">
      <ParallaxImage
        src={bg.src}
        alt={bg.title}
        blur={bg.blur}
        sizes="100vw"
        speed={0.22}
        scale={1.22}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-[rgba(15,12,10,0.5)]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,12,10,0.5), rgba(15,12,10,0.2) 40%, rgba(15,12,10,0.65))" }} />

      <div className="relative z-10 shell text-center">
        <p className="eyebrow !text-gold-bright mb-10">{copy.statsCaption}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 max-w-4xl mx-auto">
          {copy.stats.map((s) => (
            <div key={s.label}>
              <div className="display text-[clamp(3.2rem,8vw,6rem)] leading-none text-paper-soft">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-[0.72rem] uppercase tracking-[0.24em] text-paper-soft/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
