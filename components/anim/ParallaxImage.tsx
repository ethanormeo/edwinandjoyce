"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  src: string;
  alt: string;
  blur?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  speed?: number; // fraction of frame height to travel
  scale?: number;
};

export default function ParallaxImage({
  src,
  alt,
  blur,
  className,
  sizes = "100vw",
  priority,
  speed = 0.16,
  scale = 1.18,
}: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = frame.current;
    const w = wrap.current;
    if (!f || !w) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        w,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: "none",
          scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={frame} className={`frame ${className ?? ""}`}>
      <div ref={wrap} className="absolute inset-[-10%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          placeholder={blur ? "blur" : "empty"}
          blurDataURL={blur}
          priority={priority}
          className="object-cover"
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}
