import galleryData from "@/data/gallery.json";
import brand from "@/data/brand.json";

export type Shot = {
  src: string;
  w: number;
  h: number;
  orient: "portrait" | "landscape" | "square";
  blur: string;
  title: string;
  cat: string;
};

export type Gallery = {
  heroes: Shot[];
  sections: Record<string, Shot[]>;
  marquee: { src: string; w: number; h: number; blur: string }[];
};

// next/image does not prefix basePath onto string srcs, so do it here
// (covers every image on the site — they all flow through this manifest).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const withBase = (s: string) => (BASE && s.startsWith("/") ? BASE + s : s);

const rawGallery = galleryData as unknown as Gallery;
export const gallery: Gallery = {
  heroes: rawGallery.heroes.map((h) => ({ ...h, src: withBase(h.src) })),
  sections: Object.fromEntries(
    Object.entries(rawGallery.sections).map(([k, v]) => [k, v.map((s) => ({ ...s, src: withBase(s.src) }))])
  ),
  marquee: rawGallery.marquee.map((m) => ({ ...m, src: withBase(m.src) })),
};

// single source of truth for "nearly two decades" (~since 2007)
export const yearsActive = 19;

// real environmental portrait of Edwin & Joyce (the actual photographers)
export const studioPortrait = {
  src: withBase("/img/studio/edwin-and-joyce.webp"),
  w: 799,
  h: 1200,
  blur:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjslISt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCG8uFivGit0EpmRQoA4z64pkFokN1Ol0DGcAr8uMjLf4VDaxs1xbyMGDpINjdMgc1sXUaSXkkkrNkqFACjGBn396hopC3dqiXUO0sAFzipCoZix6k0UVoiWf/Z",
};

export const contact = {
  name: "Edwin & Joyce Ormeo",
  studio: "Edwin & Joyce Ormeo Photography",
  email: "edwinormeo@gmail.com",
  phone: "904-305-2732",
  phoneHref: "tel:+19043052732",
  instagram: "https://www.instagram.com/ejophotographyog",
  instagramHandle: "@ejophotographyog",
  facebook: "https://www.facebook.com/edwinandjoycephotography",
  location: "Austin, Texas",
  region: "Austin & the Texas Hill Country",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export type Category = { key: string; label: string; index: string; blurb: string };

export const categories: Category[] = [
  { key: "weddings", label: "Weddings", index: "01", blurb: brand.blurbs.weddings },
  { key: "couples", label: "Couples & Engagements", index: "02", blurb: brand.blurbs.couples },
  { key: "family", label: "Families", index: "03", blurb: brand.blurbs.family },
  { key: "seniors", label: "Seniors", index: "04", blurb: brand.blurbs.seniors },
  { key: "portraits", label: "Portraits & Branding", index: "05", blurb: brand.blurbs.portraits },
];

export const copy = {
  hero: {
    eyebrow: "Austin, Texas · The Hill Country",
    headline: brand.hero.headline, // contains "\n"
    subhead: brand.hero.subhead,
    rotating: brand.hero.rotating as string[],
  },
  manifesto: brand.about.lead,
  studio: {
    title: "The two\nbehind the lens",
    lead: brand.about.lead,
    body: brand.about.body as string[],
    philosophy: brand.about.philosophy,
    signature: brand.about.signature,
  },
  process: brand.extras.process as { step: string; title: string; text: string }[],
  faq: brand.extras.faq as { q: string; a: string }[],
  stats: [
    { value: yearsActive, suffix: "+", label: "Years behind the lens" },
    { value: 7, suffix: "", label: "Ways we tell your story" },
    { value: 2, suffix: "", label: "Photographers, one vision" },
  ],
  statsCaption: brand.extras.statsCaption,
  philosophyQuote: brand.about.philosophy,
  bigQuote:
    "There are two of us reading the room — anticipating the glance, the laugh, the quiet hand-squeeze you didn’t know we saw.",
  cta: {
    headline: brand.extras.cta.headline,
    sub: brand.extras.cta.sub,
    button: brand.extras.cta.button,
  },
  footerLine: brand.extras.footerLine,
};

export const seo = brand.seo;
