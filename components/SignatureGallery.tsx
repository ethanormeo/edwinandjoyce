import Image from "next/image";
import Reveal from "./anim/Reveal";
import { gallery } from "@/lib/site";

const s = gallery.sections;
const SELECTION = [
  s.seniors[0],
  s.weddings[2],
  s.family[0],
  s.couples[0],
  s.seniors[7],
  s.weddings[1],
  s.seniors[2],
  s.family[1],
  s.weddings[3],
  s.seniors[9],
  s.couples[4],
  s.family[3],
].filter(Boolean);

export default function SignatureGallery() {
  return (
    <section className="relative bg-night text-paper py-[clamp(4rem,11vh,8rem)]">
      <div className="shell">
        <div className="flex items-end justify-between mb-[clamp(2rem,5vh,3.5rem)]">
          <div>
            <span className="eyebrow !text-[var(--color-night-soft)]">A recent selection</span>
            <h2 className="display fluid-h2 text-paper mt-4">The work itself</h2>
          </div>
          <span className="label text-[var(--color-night-soft)] hidden sm:block">Austin · TX</span>
        </div>

        <Reveal stagger={0.06} className="[column-count:2] md:[column-count:3] lg:[column-count:4] [column-gap:clamp(0.5rem,1.4vw,1.1rem)]">
          {SELECTION.map((shot, i) => (
            <figure key={shot.src + i} className="mb-[clamp(0.5rem,1.4vw,1.1rem)] break-inside-avoid frame relative overflow-hidden group">
              <Image
                src={shot.src}
                alt={`${shot.cat} — Edwin & Joyce Ormeo Photography, Austin`}
                width={shot.w}
                height={shot.h}
                sizes="(max-width:768px) 50vw, 25vw"
                placeholder="blur"
                blurDataURL={shot.blur}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
