"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallery } from "@/lib/site";

const s = gallery.sections;
const SIGNATURE = [
  { ...s.seniors[0], tag: "Seniors" },
  { ...s.weddings[2], tag: "Weddings" },
  { ...s.seniors[1], tag: "Seniors" },
  { ...s.family[0], tag: "Families" },
  { ...s.couples[0], tag: "Couples" },
  { ...s.seniors[7], tag: "Seniors" },
  { ...s.weddings[1], tag: "Weddings" },
  { ...s.seniors[11], tag: "Seniors" },
  { ...s.family[1], tag: "Families" },
  { ...s.weddings[3], tag: "Weddings" },
  { ...s.seniors[2], tag: "Seniors" },
].filter((x) => x && x.src);

export default function SignatureGallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    gsap.registerPlugin(ScrollTrigger);

    // matchMedia auto-(de)activates the pin across the 768px breakpoint
    // and reverts the inline styles when leaving it.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      sec.style.minHeight = "100svh";
      sec.style.display = "flex";
      sec.style.flexDirection = "column";
      sec.style.justifyContent = "center";

      const getScrollLen = () => Math.max(0, tr.scrollWidth - window.innerWidth + 64);
      const tween = gsap.to(tr, {
        x: () => -getScrollLen(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => "+=" + getScrollLen(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".sig-img").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest(".sig-card"),
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      // recalc once fonts settle (line heights shift scrollWidth)
      document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

      return () => {
        sec.style.minHeight = "";
        sec.style.display = "";
        sec.style.flexDirection = "";
        sec.style.justifyContent = "";
        gsap.set(tr, { clearProps: "transform" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="relative bg-night text-paper-soft overflow-hidden py-[clamp(4rem,9vh,7rem)]">
      {/* heading row */}
      <div className="shell flex items-end justify-between mb-10">
        <h2 className="display fluid-h2 text-paper-soft">
          Signature<span className="text-gold-grad"> frames</span>
        </h2>
        <span className="text-[0.62rem] md:text-[0.7rem] uppercase tracking-[0.24em] md:tracking-[0.28em] text-[var(--color-night-soft)]/75 whitespace-nowrap pb-1">
          <span className="hidden md:inline">Scroll to wander →</span>
          <span className="md:hidden">Swipe →</span>
        </span>
      </div>

      {/* track */}
      <div
        ref={track}
        className="flex gap-5 md:gap-8 px-[var(--gutter)] md:pr-16 overflow-x-auto md:overflow-visible no-bar snap-x md:snap-none"
        style={{ width: "max-content" }}
      >
        {SIGNATURE.map((shot, i) => {
          const portrait = shot.orient === "portrait";
          return (
            <figure
              key={shot.src + i}
              className="sig-card relative shrink-0 snap-center group"
              style={{
                width: portrait ? "clamp(15rem,42vw,23rem)" : "clamp(20rem,54vw,38rem)",
                height: portrait ? "clamp(22rem,60vh,32rem)" : "clamp(15rem,44vh,25rem)",
              }}
              data-cursor
            >
              <div className="absolute inset-0 overflow-hidden rounded-[2px]">
                <Image
                  src={shot.src}
                  alt={`${shot.tag} session in warm natural light — ${shot.title}`}
                  fill
                  sizes="(max-width:768px) 70vw, 40vw"
                  placeholder="blur"
                  blurDataURL={shot.blur}
                  className="sig-img object-cover"
                  style={{ transform: "scale(1.12)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-700" />
              </div>
              <figcaption className="absolute left-4 bottom-4 z-10 flex items-center gap-3">
                <span className="text-[0.6rem] uppercase tracking-[0.28em] text-paper-soft/85 bg-black/25 backdrop-blur-sm px-2 py-1 rounded-full">
                  {shot.tag}
                </span>
                <span className="font-display italic text-paper-soft text-lg drop-shadow">{shot.title}</span>
              </figcaption>
              <span className="absolute top-3 right-4 text-[0.65rem] tabular-nums text-paper-soft/55">
                {String(i + 1).padStart(2, "0")}
              </span>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
