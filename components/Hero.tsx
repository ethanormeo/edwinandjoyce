"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { gallery } from "@/lib/site";

// opening image — Tiffany & Kenny, golden-hour couple (faces centered, crops well)
const heroShot =
  gallery.sections.weddings.find((s) => s.src.includes("tiffanyandkenny")) ||
  gallery.sections.weddings[1] ||
  gallery.heroes[0];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-name-inner", { yPercent: 115, duration: 0.95, delay: 0.15 })
        .from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.7 }, 0.25)
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.7 }, "-=0.45")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.7 }, "-=0.5")
        .from(".hero-tick", { opacity: 0, duration: 0.6 }, "-=0.3");

      // very gentle photo parallax
      gsap.to(photo.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative min-h-[100svh] grid grid-cols-1 md:grid-cols-[46fr_54fr] bg-paper"
    >
      {/* TYPE PANEL */}
      <div className="order-2 md:order-1 relative flex flex-col justify-center md:border-r border-[var(--line-strong)] px-[var(--gutter)] py-16 md:py-0">
        <span className="hero-eyebrow eyebrow block mb-7 md:mb-9 pb-4 border-b border-[var(--line)] max-w-[34ch]">
          Weddings · Couples · Families · Portraits — Austin, TX
        </span>

        <h1
          className="display text-ink overflow-hidden"
          style={{ fontSize: "clamp(2.9rem, 8.5vw, 7.2rem)", lineHeight: 0.92 }}
        >
          <span className="hero-name-inner block">Edwin &amp; Joyce</span>
        </h1>

        <p className="hero-sub lede fluid-lede mt-7 max-w-[34ch]">
          A husband-and-wife studio chasing the last warm light of the day — across Austin &amp; the Texas Hill Country.
        </p>

        <div className="hero-cta mt-10">
          <a href="#work" className="arrow-link link-underline">
            View work <span className="arw">&rarr;</span>
          </a>
        </div>

        <a href="#intro" className="hero-tick absolute bottom-7 left-[var(--gutter)] label text-ink-soft hidden md:block">
          Scroll ↓
        </a>
      </div>

      {/* PHOTO */}
      <div className="order-1 md:order-2 relative h-[72svh] md:h-auto overflow-hidden">
        <div ref={photo} className="absolute inset-[-4%]">
          <Image
            src={heroShot.src}
            alt={`Natural-light portrait — Edwin & Joyce Ormeo Photography, Austin`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 54vw"
            placeholder="blur"
            blurDataURL={heroShot.blur}
            className="object-cover object-center"
          />
        </div>
        <span className="absolute right-3 bottom-5 z-10 label text-paper/80 [writing-mode:vertical-rl] rotate-180 tracking-[0.22em] hidden md:block">
          Austin · TX
        </span>
      </div>
    </section>
  );
}
