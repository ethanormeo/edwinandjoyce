import Image from "next/image";
import SplitHeading from "./anim/SplitHeading";
import Reveal from "./anim/Reveal";
import { copy, gallery, contact } from "@/lib/site";

/* NOTE: swap `portrait` below for a real photo of Edwin & Joyce when available
   (drop it in /public/img/studio/edwin-and-joyce.webp). For now we show a
   warm glimpse of their work, honestly captioned. */
const glimpse = [
  gallery.sections.couples.find((s) => s.orient === "portrait") || gallery.sections.seniors[1],
  gallery.sections.family[0],
  gallery.sections.weddings[0],
].filter(Boolean);

export default function Studio() {
  if (!glimpse[0]) return null;
  return (
    <section id="studio" className="relative bg-night text-[var(--color-night-soft)] py-[clamp(6rem,15vh,11rem)] overflow-hidden scroll-mt-20">
      <div className="shell grid md:grid-cols-12 gap-x-10 gap-y-14 items-center">
        {/* image cluster */}
        <div className="md:col-span-5 relative">
          <Reveal y={50}>
            <div className="frame relative aspect-[4/5] rounded-[2px] overflow-hidden">
              <Image
                src={glimpse[0].src}
                alt={glimpse[0].title}
                fill
                sizes="(max-width:768px) 80vw, 40vw"
                placeholder="blur"
                blurDataURL={glimpse[0].blur}
                className="object-cover"
              />
            </div>
          </Reveal>
          {/* floating secondary */}
          {glimpse[1] && (
            <Reveal y={40} delay={0.12} className="absolute -bottom-10 -right-4 w-[42%] hidden sm:block">
              <div className="frame relative aspect-[3/4] rounded-[2px] overflow-hidden ring-1 ring-black/20 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
                <Image
                  src={glimpse[1].src}
                  alt={glimpse[1].title}
                  fill
                  sizes="200px"
                  placeholder="blur"
                  blurDataURL={glimpse[1].blur}
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}
          <span className="block mt-6 text-[0.66rem] uppercase tracking-[0.26em] text-[var(--color-night-soft)]/55">
            A glimpse — recent sessions
          </span>
        </div>

        {/* story */}
        <div className="md:col-span-7 md:pl-6">
          <Reveal>
            <span className="eyebrow !text-[var(--color-gold-bright)]">The studio</span>
          </Reveal>
          <SplitHeading as="h2" className="display fluid-h2 text-paper-soft mt-5 mb-8">
            The two behind the lens
          </SplitHeading>
          <Reveal className="lede fluid-lede text-paper-soft/90 max-w-[40ch] mb-8">
            {copy.studio.lead}
          </Reveal>
          <Reveal stagger={0.12} className="space-y-5 text-[var(--color-night-soft)]/80 leading-relaxed max-w-[58ch]">
            {copy.studio.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <Reveal className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="font-display italic text-gold-grad text-2xl max-w-[22ch] leading-snug">
              “{copy.studio.philosophy}”
            </p>
            <div className="sm:ml-auto text-right">
              <p className="font-display text-paper-soft text-xl">{copy.studio.signature}</p>
              <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-night-soft)]/55 mt-1">
                {contact.location}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
