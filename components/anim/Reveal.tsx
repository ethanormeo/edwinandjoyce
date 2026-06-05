"use client";

import { useRef, useEffect, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  stagger?: number; // if set, animates direct children with this stagger
  start?: string;
  id?: string;
};

export default function Reveal({
  as: Tag = "div",
  children,
  className,
  y = 38,
  delay = 0,
  duration = 1.1,
  stagger,
  start = "top 84%",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    el.style.setProperty("--ry", `${y}px`);
    const isStagger = stagger != null;
    const targets = isStagger ? (Array.from(el.children) as HTMLElement[]) : el;
    const arr: HTMLElement[] = Array.isArray(targets) ? targets : [targets];
    arr.forEach((t) => (t.style.willChange = "transform, opacity"));

    let played = false;
    const clearWC = () => arr.forEach((t) => (t.style.willChange = "auto"));

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start, once: true },
        onComplete: () => {
          played = true;
          clearWC();
        },
      });
    });

    // safety net: if the trigger never fires (blocked GSAP, layout race),
    // force-reveal so content can't be stranded invisible
    const safety = window.setTimeout(() => {
      if (!played) {
        gsap.set(targets, { opacity: 1, y: 0, clearProps: "opacity,transform" });
        clearWC();
      }
    }, 2600);

    return () => {
      clearTimeout(safety);
      clearWC();
      ctx.revert();
    };
  }, [y, delay, duration, stagger, start]);

  const attr = stagger != null ? { "data-reveal-children": "" } : { "data-reveal": "" };

  return (
    <Tag ref={ref} className={className} id={id} {...attr}>
      {children}
    </Tag>
  );
}
