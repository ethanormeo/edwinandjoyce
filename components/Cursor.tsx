"use client";

import { useEffect, useRef } from "react";

/* A subtle gold trailing dot + ring. Disabled on touch / reduced-motion. */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let raf = 0;
    let hovering = false;
    let labelText = "";

    const bail = () => {
      // any failure → restore the native pointer, stop the loop
      document.documentElement.classList.remove("has-cursor");
      cancelAnimationFrame(raf);
    };

    const onMove = (e: MouseEvent) => {
      try {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px)`;
      } catch {
        bail();
      }
    };

    const tick = () => {
      try {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${
          hovering ? 1.9 : 1
        })`;
        raf = requestAnimationFrame(tick);
      } catch {
        bail();
      }
    };

    const onOver = (e: MouseEvent) => {
      try {
        const t = (e.target as HTMLElement).closest(
          'a, button, [data-cursor], [role="button"]'
        ) as HTMLElement | null;
        hovering = !!t;
        const lbl = t?.getAttribute("data-cursor-label") || "";
        if (lbl !== labelText) {
          labelText = lbl;
          ring.setAttribute("data-label", lbl);
        }
        ring.classList.toggle("is-hover", hovering);
      } catch {
        bail();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("has-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="ej-dot" aria-hidden style={{ transform: "translate(-100px, -100px)" }} />
      <div ref={ringRef} className="ej-ring" aria-hidden style={{ transform: "translate(-100px, -100px)" }} />
      <style>{`
        .has-cursor { cursor: none; }
        /* keep a real caret/pointer on interactive form fields */
        .has-cursor *:not(input):not(textarea):not(select) { cursor: none; }
        .has-cursor input, .has-cursor textarea, .has-cursor select { cursor: auto; }
        .ej-dot, .ej-ring { position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none; will-change: transform; }
        .ej-dot {
          width: 6px; height: 6px; margin: -3px 0 0 -3px; border-radius: 50%;
          background: var(--color-gold-bright);
          mix-blend-mode: normal;
        }
        .ej-ring {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid color-mix(in srgb, var(--color-ink) 45%, transparent);
          transition: width .4s var(--ease-out-expo), height .4s var(--ease-out-expo), border-color .4s, background .4s;
          display: grid; place-items: center;
        }
        .ej-ring.is-hover { border-color: var(--color-gold); background: color-mix(in srgb, var(--color-gold) 10%, transparent); }
        .ej-ring[data-label]:not([data-label=""])::after {
          content: attr(data-label);
          font-family: var(--font-inter), sans-serif;
          font-size: 9px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--color-ink); white-space: nowrap;
        }
        @media (pointer: coarse) { .ej-dot, .ej-ring { display: none; } }
      `}</style>
    </>
  );
}
