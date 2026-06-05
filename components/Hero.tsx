"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { gallery, copy, contact, yearsActive } from "@/lib/site";

const SLIDES = gallery.heroes.slice(0, 3); // family · senior · couple — range up front

export default function Hero() {
  const [active, setActive] = useState(0);
  const [extraReady, setExtraReady] = useState(false); // mount slides 1-2 after first paint
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const headline = copy.hero.headline.replace(/\\n/g, "\n").split(/\r?\n/);

  // defer non-LCP slides so they don't compete with the hero's first paint
  useEffect(() => {
    const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number };
    const schedule = w.requestIdleCallback || ((cb: () => void) => window.setTimeout(cb, 1200));
    const id = schedule(() => setExtraReady(true));
    return () => {};
  }, []);

  // slideshow
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !extraReady) return;
    const t = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 6200);
    return () => clearInterval(t);
  }, [extraReady]);

  // load reveal + parallax
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-line > span", { yPercent: 115, duration: 1.25, stagger: 0.12, delay: 0.25 })
        .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.9 }, 0.4)
        .from(".hero-sub", { opacity: 0, y: 20, duration: 1 }, "-=0.7")
        .from(".hero-meta", { opacity: 0, y: 20, duration: 1 }, "-=0.8")
        .from(".hero-cue", { opacity: 0, duration: 1 }, "-=0.5");

      // parallax drift on scroll
      gsap.to(bg.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-copy", {
        yPercent: -12,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative h-[100svh] min-h-[min(640px,100svh)] overflow-hidden bg-night">
      {/* background crossfade + parallax */}
      <div ref={bg} className="absolute inset-[-6%]">
        {SLIDES.map((s, i) => {
          if (i > 0 && !extraReady) return null; // only the LCP slide on first paint
          return (
            <div
              key={s.src}
              className="absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <div className={i === active ? "kenburns absolute inset-0" : "absolute inset-0"}>
                <Image
                  src={s.src}
                  alt={s.title}
                  fill
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={s.blur}
                  className="object-cover object-center"
                />
              </div>
            </div>
          );
        })}
        {/* legibility gradient (stronger top + bottom bands for text over bright slides) */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,12,10,0.55) 0%, rgba(15,12,10,0.05) 26%, rgba(15,12,10,0.12) 52%, rgba(15,12,10,0.86) 100%)" }} />
      </div>

      {/* copy */}
      <div className="hero-copy relative z-10 h-full shell flex flex-col justify-end pb-[clamp(2.5rem,7vh,6rem)]">
        <span className="hero-eyebrow hero-shadow eyebrow !text-[var(--color-gold-bright)] mb-6 sm:mb-6 block">
          {copy.hero.eyebrow}
        </span>
        <h1 className="display fluid-hero text-paper-soft max-w-[16ch] hero-shadow">
          {headline.map((line, i) => (
            <span key={i} className="hero-line block overflow-hidden">
              <span className="block">{line}</span>
            </span>
          ))}
        </h1>
        <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="hero-sub hero-shadow max-w-[42ch] text-paper-soft/90 text-[1.05rem] leading-relaxed font-sans">
            {copy.hero.subhead}
          </p>
          <div className="hero-meta hero-shadow flex items-center gap-5 text-paper-soft/85 text-[0.72rem] uppercase tracking-[0.22em]">
            <span>{contact.region}</span>
            <span className="w-10 h-px bg-paper-soft/40" />
            <span>{yearsActive}+ years</span>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a href="#intro" className="hero-cue absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-paper-soft/70" data-cursor>
        <span className="text-[0.62rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="scroll-line" />
      </a>

      <style>{`
        .kenburns { animation: kb 7s ease-out forwards; transform-origin: 60% 40%; }
        @keyframes kb { from { transform: scale(1.04); } to { transform: scale(1.13); } }
        .hero-shadow { text-shadow: 0 1px 16px rgba(10,8,6,0.55), 0 1px 3px rgba(10,8,6,0.4); }
        .scroll-line { width: 1px; height: 46px; background: linear-gradient(var(--color-gold-bright), transparent); position: relative; overflow: hidden; }
        .scroll-line::after { content:""; position:absolute; inset:0; background: var(--color-paper-soft); animation: cue 2.2s var(--ease-in-out-soft) infinite; }
        @keyframes cue { 0%{ transform: translateY(-100%);} 60%,100%{ transform: translateY(100%);} }
        @media (prefers-reduced-motion: reduce){ .kenburns{ animation:none; } .scroll-line::after{ animation:none; } }
      `}</style>
    </section>
  );
}
