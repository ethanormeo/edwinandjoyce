"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-mast", { yPercent: 112, duration: 1, delay: 0.15 })
        .from(".hero-descriptor", { opacity: 0, y: 14, duration: 0.7 }, "-=0.45")
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.7 }, "-=0.45")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.7 }, "-=0.5")
        .from(".hero-corner", { opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.5");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative min-h-[100svh] bg-paper flex flex-col justify-between overflow-hidden"
    >
      {/* top row */}
      <div className="shell pt-[calc(var(--nav-h)+clamp(1.5rem,5vh,3rem))] flex items-start justify-between gap-6">
        <span className="hero-corner eyebrow max-w-[42ch]">
          Weddings · Couples · Families · Seniors · Portraits
        </span>
        <span className="hero-corner eyebrow hidden sm:block">Austin, Texas</span>
      </div>

      {/* center masthead */}
      <div className="shell flex-1 flex flex-col justify-center py-10">
        <h1 className="display text-ink" style={{ fontSize: "clamp(2.7rem, 10.5vw, 9.5rem)", lineHeight: 0.9, letterSpacing: "-0.035em", fontStretch: "108%" }}>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="hero-mast block">
              Edwin &amp; Joyce<br />Photography
            </span>
          </span>
        </h1>

        <div className="hero-descriptor mt-8 flex items-center gap-5 flex-wrap">
          <span className="label text-ink-soft">Austin &amp; the Texas Hill Country</span>
          <span className="hidden sm:block h-px w-16 bg-[var(--line-strong)]" />
          <span className="label text-accent">Natural light · Est. ~2007</span>
        </div>

        <p className="hero-sub lede fluid-lede mt-8 max-w-[46ch]">
          A husband-and-wife studio chasing the last warm light of the day — weddings, families, seniors &amp; portraits, made to feel exactly like the moment did.
        </p>

        <div className="hero-cta mt-10 flex items-center gap-8">
          <a href="#work" className="btn">View the work</a>
          <a href="#contact" className="arrow-link link-underline">Inquire <span className="arw">&rarr;</span></a>
        </div>
      </div>

      {/* bottom row */}
      <div className="shell pb-7 flex items-end justify-between border-t border-[var(--line)] pt-5">
        <a href="#intro" className="hero-corner label text-ink-soft">Scroll ↓</a>
        <span className="hero-corner label text-ink-soft hidden sm:block">Edwin &amp; Joyce Ormeo</span>
      </div>
    </section>
  );
}
