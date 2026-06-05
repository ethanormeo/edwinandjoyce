"use client";

import { useEffect, useRef, useState } from "react";
import { copy } from "@/lib/site";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(value); return; }
    let raf = 0, started = false;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        const dur = 1500, t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref} className="tnum">{n}{suffix}</span>;
}

export default function StatsBand() {
  return (
    <section id="experience" className="relative bg-paper-alt py-[clamp(4rem,11vh,8rem)] border-t border-[var(--line)] scroll-mt-20">
      <div className="shell">
        <p className="eyebrow mb-12 max-w-[44ch]">{copy.statsCaption}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--line)]">
          {copy.stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 sm:py-10 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-[var(--line)]" : ""} sm:px-8 first:sm:pl-0`}
            >
              <div className="display fluid-stat text-ink leading-none" style={{ fontStretch: "118%" }}>
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="label text-ink-soft mt-4">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
