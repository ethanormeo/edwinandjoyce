"use client";

import { useRef, useEffect, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  start?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
};

/* Line-by-line masked reveal for editorial display headings. */
export default function SplitHeading({
  as: Tag = "h2",
  children,
  className,
  start = "top 82%",
  stagger = 0.1,
  delay = 0,
  duration = 1.1,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let split: SplitText | null = null;
    let ctx: gsap.Context | null = null;
    let done = false;

    const reveal = () => {
      done = true;
      el.style.visibility = "visible";
      gsap.set(el, { autoAlpha: 1 });
    };

    const run = () => {
      try {
        split = new SplitText(el, { type: "lines", mask: "lines", linesClass: "sl" });
        gsap.set(split.lines, { yPercent: 115 });
        reveal();
        ctx = gsap.context(() => {
          gsap.to(split!.lines, {
            yPercent: 0,
            duration,
            ease: "power4.out",
            stagger,
            delay,
            scrollTrigger: { trigger: el, start, once: true },
          });
        });
      } catch {
        reveal(); // SplitText failed — show the heading plainly
      }
    };

    el.style.visibility = "hidden";
    if (document.fonts?.ready) document.fonts.ready.then(run);
    else run();

    // hard fallback: never leave a heading hidden
    const safety = window.setTimeout(() => {
      if (!done) reveal();
    }, 2500);

    return () => {
      clearTimeout(safety);
      el.style.visibility = "visible"; // unmount before fonts.ready must not strand it
      ctx?.revert();
      split?.revert();
    };
  }, [start, stagger, delay, duration]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
