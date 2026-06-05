import Image from "next/image";
import { gallery } from "@/lib/site";

const items = [...gallery.marquee, ...gallery.marquee];

export default function Marquee() {
  return (
    <section className="relative bg-night py-10 overflow-hidden" aria-hidden>
      <div className="ej-marquee flex gap-4 w-max">
        {items.map((m, i) => (
          <div
            key={`${m.src}-${i}`}
            className="frame relative h-[clamp(8rem,22vh,15rem)] w-[clamp(12rem,30vw,22rem)] shrink-0 rounded-[2px] overflow-hidden"
          >
            <Image
              src={m.src}
              alt=""
              fill
              sizes="352px"
              loading="lazy"
              placeholder="blur"
              blurDataURL={m.blur}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <style>{`
        .ej-marquee { animation: ejmar 48s linear infinite; }
        @keyframes ejmar { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ej-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .ej-marquee { animation: none; transform: translateX(0); } }
      `}</style>
    </section>
  );
}
